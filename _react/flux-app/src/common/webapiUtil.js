import request from 'superagent';

const TIMEOUT = 10000;
// const prefix = 'webapi/';
const prefix = 'src/mock/';

const handleError = (/* err, res */) => {
  // console.log(err, res);
};

export default class WebapiUtil {
  constructor(url) {
    this.url = prefix + url;
    this._pendingRequests = {};
  }
  abortPendingRequests(key) {
    const _pendingRequests = this._pendingRequests;
    if (_pendingRequests[key]) {
      _pendingRequests[key]._callback = () => {};
      _pendingRequests[key].abort();
      _pendingRequests[key] = null;
    }
  }
  // http get
  get() {
    return request.get(this.url).timeout(TIMEOUT).query({authtoken: 'xxx'}).on('error', handleError);
  }
  // http post
  save() {
    return request.post(this.url).timeout(TIMEOUT).query({authtoken: 'xxx'}).send({ post: 'data'})
    .on('error', handleError);
  }
  // http delete
  remove() {
    return request.del(this.url).timeout(TIMEOUT).query({authtoken: 'xxx'}).on('error', handleError);
  }
}
