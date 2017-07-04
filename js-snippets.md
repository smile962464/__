# snippets

lodash 常用函数: throttle / escape / unescape

## 数组处理

```js
// 生成数组
var numbers = [];
for(var i=1; numbers.push(i++) < 100;);

Array.apply(null, Array(5)).map(function (_, i) {return i;});
Array.apply(null, {length: 10}).map(Number.call, Number);
Array.apply(null, {length: 10}).map(Function.call, Math.random);
Array.from(new Array(20), (x,i) => i);
Array.from(Array(10).keys());
[...Array(10).keys()];
[...Array(10).keys()].map(x => x++);
Array.from({length:10}, (v,i) => i);

new Array(10).join().split(',').map(function(item, index){ return ++index;})
Array(7).join(0).split(0).map(Number.call, Number);
Array(N).fill(0).map((e,i)=>i+1);
```

```js
// 合并数组 -- 类似concat功能、但concat返回值是一个新的数组。
Array.prototype.push.apply(array1, array2);
Array.prototype.unshift.apply(arr1, arr2)
console.log(array1);
```

```js
//将 类数组的对象(如arguments、nodeLists)转换成 数组
Array.prototype.slice.call(arguments);

// 获取一个数字数组中的最大值或最小值
Math.max.apply(Math, numbersArr);

// 排序
var arr = [3,324,5345,6546,134,5654,665];
arr.sort( function(a,b){ return a-b; } );
// 乱序：让比较函数随机传回-1或1（效率不高）
var arr=[1,2,3,4,5,6,7,8,9,10,22,33,55,77,88,99];
arr.sort( function(){ return Math.random() > 0.5 ? -1 : 1; } );
```

```js
// 删除数组元素
var arr = [{done: false, val:1}, {done: true, val:2}, {done: true, val:3}, {done: false, val:4}];

// 方法一：正向查找，删除后 index 减一
// 注意：由于数组长度会变化，不能用 len = arr.length 存下最初数组长度 ！！
for (var i = 0; i < arr.length; i++) {
  var o = arr[i];
  if (o.done) {
    // 删除一个元素，而 i 仍递增，如果不减一，会跨过一个元素
    arr.splice(i--, 1);
  }
}
console.log(arr);

// 方法二：倒序查找删除
var i = arr.length;
while (i--) {
  if (arr[i].done) {
    arr.splice(i, 1);
  }
}
console.log(arr);

// forEach 过程删除元素
var nums = [0, 1, 2, 3, 1, 4, 5, 6];
nums.forEach((i, index, arr) => {
  // console.log(i, index);
  if (i === 1) {
    // nums[index] = false;
    // arr.splice(index, 1) // 删除数组中一个，相当于 index + 1
    // nums.splice(index, 1) // 删除数组中一个，相当于 index + 1
    // console.log(i);
  }
});
// console.log(nums);
```

```js
// 数组去重
// 性能最好
var uniqueArray = function(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    var item = arr[i];
    for(var j = i+1; j < arr.length; j++ ) {
      item === arr[j] && (arr.splice(j, 1), j--);
    }
  }
  return arr;
};
// 性能次之
function unique(arr) {
  var a = {}, b = {}, c = [];
  for (var i = 0; i < arr.length; i++){
    if (!b[a[i]]) {
        c[c.length] = arr[i];
        b[a[i]] = true;
    }
  }
  return c;
}
```

## 字符串

```js
// trim
var trim = function(){
  return this.replace( /(^\s*)|(\s*$)/g , "");
}
var ltrim = function(){
  return this.replace(/(^\s*)/g,"");
}
var rtrim = function() {
  return this.replace(/(\s*$)/g,"");
}
// 获取字符串长度，截取字符串
var getStrSize = function (str) {
  var size = 0;
  for (var i = 0, len = str.length; i < len; i++) {
    if (str.charCodeAt(i) > 255) {
      size += 2;
    } else {
      size++;
    }
  }
  return size;
};
```

```js
// toString(36)
var generateChars = function (length) {
  var chars = '';
  for (var i = 0; i < length; i++) {
    var randomChar = Math.floor(Math.random() * 36);
    chars += randomChar.toString(36);
  }
  return chars;
}
```


## 函数类

```js
// [function currying](http://en.wikipedia.org/wiki/Currying)
// 参考对比：
// Function.prototype.bind
var bind = function (fn, context) {
  var slice = Array.prototype.slice, args = slice.call(arguments, 2);
  return function () {
    return fn.apply(context, args.concat(slice.call(arguments)));
  }
}
var handler = function (x, y) {
  console.log(x, y);
}
var argh = bind(handler, undefined, 5, 10);
```

```js
var arr = [{ completed: 2, id: 0 }];
var reducer = arr.reduce(function(maxId, todo) {
  return Math.max(todo.id, maxId)
}, -1)
console.log(reducer);
```

```js
// https://remysharp.com/2010/07/21/throttling-function-calls
function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
```

```js
// https://remysharp.com/2010/07/21/throttling-function-calls
function throttle(fn, threshold) {
  threshold = threshold || 200;
  var last, timeout;

  return function() {
    var now = +new Date();
    var args = arguments;
    var trigger = function() {
      last = now;
      fn.apply( this, args );
    }.bind( this );
    if ( last && now < last + threshold ) {
      // hold on to it
      clearTimeout( timeout );
      timeout = setTimeout( trigger, threshold );
    } else {
      trigger();
    }
  };
}
```

## browser & dom

```html
<a href="javascript:;">阻止 a 标签默认事件</a>
<a href="javascript:void(0);">阻止 a 标签默认事件 IE6</a>
```

```js
function loger() {
  if (typeof console !== 'undefined' && console.log) {
    try {
      console.log.apply(null, arguments);
    } catch (error) {
      // on Mobile maybe throw "TypeError: Illegal invocation"
    }
  }
  var args = Array.prototype.slice.call(arguments);
  var ele = document.getElementById('loger');
  ele.style.cssText = "position:fixed;z-index:99999;left:0;top:0;background:rgba(0,0,0,.5);color:#fff;padding:5px";
  ele.innerHTML += '<br /><br />' + args.join(' ');
}
```

```js
// navigator.userAgent  2015-12-02
var ua = {
  edge: "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240",
  IE11: "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; rv:11.0) like Gecko",
  IE10: "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727)",
  IE9: "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727)",
  IE8: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET4.0C; .NET4.0E)",
  chrome_win: "Mozilla/5.0 (Windows NT 5.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36",
  chrome_mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2578.3 Safari/537.36",
};
// 检测浏览器
function browser(ua) {
  var tem;
  var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'IE '+(tem[1] || '');
  }
  if (M[1]=== 'Chrome') {
    tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
    if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
  }
  M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i))!= null) {
    M.splice(1, 1, tem[1]);
  }
  return M.join(' ');
}
// 只检测移动浏览器
var browser = (function (ua) {
  var device = '', version = '', android, ipad, iphone;
  (android = ua.match(/(Android)\s+([\d.]+)/)) && (device = 'android') && (version = android[2]) ||
  (ipad = ua.match(/(iPad).*OS\s([\d_]+)/)) && (device = 'ipad') && (version = ipad[2].replace(/_/g, '.')) ||
  (iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)) && (device = 'iphone') && (version = iphone[2].replace(/_/g, '.'));
  return {
    device: device,
    version: version.split('.'),
    mainVer: version.replace(/^(\d\.\d).*$/, '$1')
  };
})(navigator.userAgent);
//log(browser.device);
//log(browser.version);
//log(browser.mainVer);
```

```js
// 横竖屏状态检测
var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
window.addEventListener(orientationEvent, function () {
  switch (window.orientation) {
    case 0:
      alert('竖屏');
      break;
    case 90:
    case -90:
      alert('横屏');
  }
});
```

```js
function xhr(url) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400) {
      // Success!
      console.log(xhr.responseText);
    } else {
      // We reached our target server, but it returned an error
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
```

```js
// 检测 滚动停止
var delayedExec = function(after, fn) {
  var timer;
  return function() {
    timer && clearTimeout(timer);
    timer = setTimeout(fn, after);
  };
};
var scrollStopper = delayedExec(500, function() {
  console.log('stopped it');
});
// document.getElementById('box').addEventListener('scroll', scrollStopper);
```

```js
// 获取url的查询参数如 '?a=1&b=2'
$.urlParam = function(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// if的条件为空的判断：`null、undefined、\t\n\f、字符串空值`等几种情形
function isBlank(str) {
  if (str == null) str = '';
  return (/^\s*$/).test(str);
}
```

