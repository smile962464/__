/**
 *
 */

function encodeUriQuery(val, pctEncodeSpaces) {
  return encodeURIComponent(val).
      replace(/%40/gi, '@').
      replace(/%3A/gi, ':').
      replace(/%24/g, '$').
      replace(/%2C/gi, ',').
      replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
}

function encodeUriSegment(val) {
  return encodeUriQuery(val, true).
      replace(/%26/gi, '&').
      replace(/%3D/gi, '=').
      replace(/%2B/gi, '+');
}


/**
 * 解析 rest url
 * e.g. /webapi/lists/:id/attrs/:attr/text
 * @param _url
 * @param _params
 */

function setUrlParams(_url, _params, notStripTrailingSlashes) {
  const urlParams = {};
  let url = _url;

  url.split(/\W/).forEach(param => {
    if (param === 'hasOwnProperty') {
      throw new Error('badname, hasOwnProperty is not a valid parameter name.');
    }
    if (!(new RegExp('^\\d+$').test(param)) && param &&
        (new RegExp('(^|[^\\\\]):' + param + '(\\W|$)').test(url))) {
      urlParams[param] = true;
    }
  });

  url = url.replace(/\\:/g, ':');
  const params = _params || {};

  let val;
  let encodedVal;
  const r1 = (match, p1) => {
    return encodedVal + p1;
  };
  const r2 = (match, leadingSlashes, tail) => {
    if (tail.charAt(0) === '/') {
      return tail;
    }
    return leadingSlashes + tail;
  };
  for (const key in urlParams) {
    if (!urlParams.hasOwnProperty(key)) {
      continue;
    }
    val = params.hasOwnProperty(key) ? params[key] : undefined;
    if (val !== undefined && val !== null) {
      encodedVal = encodeUriSegment(val);
      url = url.replace(new RegExp(':' + key + '(\\W|$)', 'g'), r1);
    } else {
      url = url.replace(new RegExp('(\/?):' + key + '(\\W|$)', 'g'), r2);
    }
  }

  if (!notStripTrailingSlashes) {
    url = url.replace(/\/+$/, '') || '/';
  }

  // then replace collapse `/.` if found in the last URL path segment before the query
  // E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`
  url = url.replace(/\/\.(?=\w+($|\?))/, '.');
  // replace escaped `/\.` with `/.`
  url = url.replace(/\/\\\./, '/.');

  return {
    url: url,
    pathParams: urlParams,
  };
}

export default {
  setUrlParams,
};
