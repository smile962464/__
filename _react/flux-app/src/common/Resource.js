import request from 'superagent';
import _ from 'lodash';
import assign from 'object-assign';
import { setUrlParams } from './ResourceUtil';

const _pendingRequests = {};

function _parseParams(originalUrl, params) {
  const { url, pathParams } = setUrlParams(originalUrl, params);

  const pathParamsArr = Object.keys(pathParams);
  const queryObj = {};

  if (_.isPlainObject(params)) {
    _.forEach(params, (val, key) => {
      if (pathParamsArr.indexOf(key) === -1) {
        queryObj[key] = val;
      }
    });
  }
  return { url, queryObj };
}

let globalQuery = {};
function setGlobalQuery(fn) {
  globalQuery = assign({}, globalQuery, fn() || {});
}
let globalHeaders = {};
function setGlobalHeaders(fn) {
  globalHeaders = assign({}, globalHeaders, fn() || {});
}
const intercepts = [];
function intercept(cb) {
  if (_.isPlainObject(cb)) {
    intercepts.push(cb);
  }
}
function useIntercept(_req) {
  let req = _req;
  intercepts.forEach(item => {
    req = item.request ? item.request.call(undefined, req) : req;
  });
  const callback = req.callback;
  req.callback = (err, res) => {
    intercepts.forEach(item => {
      item.response && item.response.call(undefined, req, err, res);
    });
    callback.call(req, err, res);
  };
}

/**
 * Resource 使用：
 *
 ```js

 Resource.intercept({
  request: req => {
    return req;
  },
  response: (req, err, res) => {
    if (res.status == 404) {
      window.console.log('404 啦');
    }
  }
});

Resource.intercept({
  response: (req, err, res) => {
    if (res.status == 404) {
      window.console.log('404 啦啦');
    }
  }
});

Resource.setGlobalQuery(() => {
  return {workspaceId: 111};
});

Resource.setGlobalQuery(() => {
  return {workspaceId: 121, zzz: 333};
});

Resource.setGlobalHeaders(() => {
  return {myHeader: 111};
});

Resource.setGlobalHeaders(() => {
  return {myHeader: 121, myHeader1: 333};
});

const appApi = new Resource('/tests/:id/attr/:sub', {id: 0}, {
  actionName: {
    method: 'PUT',
    params: {
      sub: 'sub',
      argExa: true,
    },
  },
}, {
  timeout: 1000,
  headers: {
    jry: 'jin rong yun',
  },
});

appApi.get().then(res => {
  window.console.log('Resource get ', res);
});

// http get
appApi.get({id: '111', other: 'other'}).then(res => {
  window.console.log('Resource get ', res);
});

// http post -> .post()
// http put -> .put()
// http delete -> .delete()
appApi.post({id: '111', other: 'other'}, {postBody: 'body'}).then(res => {
  window.console.log('Resource post ', res);
});

// invoke custom action
appApi.actionName({}, {postBody: 'custom body'}).then(res => {
  window.console.log('Resource actionName ', res);
});

  ```
 *
 */
export default class Resource {
  /**
   * @param url  required
   * @param params
   * @param actions
   * @param config
   */
  constructor(url, params, actions, config) {
    if (!url) {
      throw new Error('need url');
    }
    this.originalUrl = url;
    this.originalParams = params || {};

    if (actions) {
      this._createCustomAction(actions);
    }

    this.headers = globalHeaders;

    if (config) {
      this.timeout = config.timeout;
      this.headers = assign({}, this.headers, config.headers);
    }
  }

  _createCustomAction(actions) {
    _.forEach(actions, (val, key) => {
      const method = val.method.toUpperCase();
      // const hasBody = /^(POST|PUT|PATCH)$/i.test(method);
      this[key] = (params, body) => {
        return this[method.toLowerCase()](assign({}, val.params, params), body);
      };
    });
  }

  /**
   * 使用：
   *    this.abortPendingRequests(`actionName`);
   *    _pendingRequests[`actionName`] = request.get(this.url).end(...);
   *
   * 什么情况下应该 abort 请求？参数 key 应该是什么？
   *    - 不应该为 url（页面不同地方，会请求同一个 url）
   *    - 应该为 actionName（同一个 action 多次发 Ajax 时，应该中止掉上一个未完成的请求）
   *    - actionName 由应用定义并传进来
   * @param key
   */
  abortPendingRequests(key) {
    if (_pendingRequests[key]) {
      _pendingRequests[key]._callback = () => {};
      _pendingRequests[key].abort();
      _pendingRequests[key] = null;
    }
  }

  _promise(req) {
    return new Promise((resolve, reject) => {
      req.end((error, res) => {
        error ? reject(error) : resolve(res);
      });
    });
  }

  _sentReq(method, params, body) {
    const { url, queryObj } = _parseParams(this.originalUrl, assign({}, this.originalParams, params));

    let globalSetting = request[method](url)
        .set(this.headers)
        .timeout(this.timeout)
        .query(globalQuery)
        .query(queryObj)
        .use(useIntercept);

    if (body) {
      globalSetting = globalSetting.send(body || {});
    }

    return this._promise(globalSetting);
  }

  // http get
  get(params) {
    return this._sentReq('get', params);
  }

  // http post
  post(params, body) {
    return this._sentReq('post', params, body);
  }

  // http put
  put(params, body) {
    return this._sentReq('put', params, body);
  }

  // http patch
  patch(params, body) {
    return this._sentReq('patch', params, body);
  }

  // http delete
  delete(params) {
    return this._sentReq('del', params);
  }

  // http head
  head(params) {
    return this._sentReq('head', params);
  }
}

Resource.setGlobalQuery = setGlobalQuery;
Resource.setGlobalHeaders = setGlobalHeaders;
Resource.intercept = intercept;
