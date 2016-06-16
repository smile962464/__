

# es6
- [ECMAScript 6入门](http://es6.ruanyifeng.com/#README)
- [ECMAScript compatibility table](http://kangax.github.io/compat-table/es6/)
- [es6特性](http://www.cnblogs.com/Wayou/p/es6_new_features.html)

[迭代器和生成器generators](http://se77en.cc/2014/01/20/iterators-and-generators-translation/)

## es6-modules
参考其他语言，如Python等模块设计。[es6-modules-final](http://www.2ality.com/2014/09/es6-modules-final.html)

- 静态化，支持静态分析，编译时就能确定模块的依赖关系，以及输入和输出的变量。能支持引入宏（macro）和类型检验（type system）。CommonJS和AMD模块，都只能在运行时确定。
- `import`、`export`可以出现在模块的任何位置，但要处于模块顶层，不能放在块级作用域内。
- 一个模块里`export deault`只能使用一次，其他输出可以用`export xx`。
- CommonJS模块输出的是一个值的拷贝（输出后不可变），而ES6模块输出的是值的引用（输出后可变）。
- ES6模块支持“循环依赖”，正常输出。CommonJS模块也支持，但只输出已经执行的部分，还未执行的部分不会输出。


# base

- [你可能不需要jQuery](http://youmightnotneedjquery.com/)、
[你可能不需要jQuery](http://www.cnblogs.com/lhb25/p/you-might-not-need-jquery.html)、
[you-might-not-need-underscore](https://www.reindex.io/blog/you-might-not-need-underscore/)
- [js秘密花园](http://bonsaiden.github.io/JavaScript-Garden/zh/)、[全面基础教程](http://yanhaijing.com/basejs/)
- [js event loop](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)、[视频: JavaScript的诞生与死亡](http://v.youku.com/v_show/id_XODAzOTY1MTM2.html)
- [js内存泄露与处理](http://lostechies.com/derickbailey/2012/03/19/backbone-js-and-javascript-garbage-collection/)、[了解 JavaScript 应用程序中的内存泄漏](http://www.ibm.com/developerworks/cn/web/wa-jsmemory/index.html)、[memory-leaks](http://javascript.info/tutorial/memory-leaks)


- [静态资源版本更新与缓存](http://www.infoq.com/cn/articles/front-end-engineering-and-performance-optimization-part1)
- [使用JavaScript实现“真·函数式编程”](http://jimliu.net/2015/10/21/real-functional-programming-in-javascript-1/)

- 使用`void 0`代替`undefined`、`console.log(void 0 === undefined)`
- 覆盖 Object.toString() 显示对象具体信息，用以调试
- 页面有使用`window.opener.xx()`之类、因为opener可以为任何域，所以存在`跨域`错误。利用`try..catch`捕获
- 模拟三目运算符(ternary operator)：`condition && (answer if true) || (answer if false)`

- call 比 apply 性能好！[参考](http://jsperf.com/apply-vs-call-vs-invoke)。（angular1.0.6：2848行；backbone1.0.0：200行）
- js对象引用操作dom对象后，需要设置为null或delete掉，避免内存泄露

- `eval()`、`window.eval`、`new Function`
    - 第一个不会被GC回收，后两个可以被GC回收。
    - 每次使用他们时都会调用脚本引擎将源代码转换成可执行代码；因此尽量避免使用。

- 不声明中间变量的值交换: `var a=1,b=2;a=[b,b=a][0];`
- `console.count('被执行的次数：')`

### 基础
- [面向对象与基于对象](http://www.cnblogs.com/sanshi/archive/2009/07/08/1519036.html)
- [事件-自定义事件](http://www.zhangxinxu.com/wordpress/2012/04/js-dom%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6/)
- [void 和 undefined](http://shapeshed.com/the-void-of-undefined-in-javascript/)
- [DOM的attribute和property](http://www.noahlu.com/blog/javascript-note/dom-attribute-property/)
- [Sea.js 源码解析（二）](https://github.com/lifesinger/lifesinger.github.com/issues/171)
- [Sea.js 源码解析（三）](https://github.com/lifesinger/lifesinger.github.com/issues/175)

### 函数
- [匿名函数的多种调用方式](http://www.cnblogs.com/snandy/archive/2011/02/28/1966664.html)
- [立即调用的函数表达式](http://www.cnblogs.com/TomXu/archive/2011/12/31/2289423.html)
- [ECMA-262-3 in detail. Chapter 5. Functions](http://dmitrysoshnikov.com/ecmascript/chapter-5-functions/)

### 日期、时间
- [日期和时间字符串](http://msdn.microsoft.com/zh-cn/library/ie/ff743760(v=vs.94).aspx)
- [计算日期和时间](http://msdn.microsoft.com/zh-cn/library/ie/ee532932(v=vs.94).aspx)

[safari 对时间格式支持的差异](http://stackoverflow.com/questions/4310953/invalid-date-in-safari)，
例如：

    new Date('2010-11-29') // Safari: Invalid Date
    new Date('11-29-2010') // Safari: Invalid Date
    new Date('2010/11/29') // 正确
    new Date('11/29/2010') // 正确
    new Date('2016-06-08T12:18:00+0800') // Safari: Invalid Date
    new Date('2016-06-08T12:18:00+08:00') // 正确

### 分号问题
- 只在行首字符是`+、-、[、(、/`这5种情况下，加前置分号即可。其他不用加分号。
- [Semicolons in JavaScript are optional](http://mislav.uniqpath.com/2010/05/semicolons/)
- [JavaScript 语句后应该加分号么？](http://www.zhihu.com/question/20298345/answer/14670020)

### 正则表达式
- [学习](http://www.cnblogs.com/rubylouvre/archive/2010/03/09/1681222.html)
- [学习、练习](http://www.gethifi.com/tools/regex)
- [正则调试工具](https://www.debuggex.com/)

### 设计模式
- [全面：观察者/pub-sub/facade/mvc、mvp、mvvm](http://addyosmani.com/resources/essentialjsdesignpatterns/book/)
- [中介者模式与观察者模式有何不同？](http://www.cnblogs.com/aaronjs/archive/2013/07/18/3199282.html)
- [Five Patterns to Help You Tame Asynchronous JavaScript](http://tech.pro/blog/1402/five-patterns-to-help-you-tame-asynchronous-javascript)
- [JavaScript 设计模式 – 第二部分： 适配器、装饰者和工厂模式](http://www.adobe.com/cn/devnet/html5/articles/javascript-design-patterns-pt2-adapter-decorator-factory.html)


## WebSocket
传统的Web产品通常使用JSONP或者AJAX这样的方式与服务端通信，但在单页Web应用中，有很大一部分采用WebSocket这样的实时通讯方式。
WebSocket与传统基于HTTP的通信机制相比，有很大的优势。它可以让服务端很便利地使用反向推送，前端只响应确实产生业务数据的事件，减少一遍又一遍无意义的AJAX轮询。由于WebSocket只在比较先进的浏览器上被支持，有一些库提供了在不同浏览器中的兼容方案，比如socket.io，它在不支持WebSocket的浏览器上会降级成使用AJAX或JSONP等方式，对业务代码完全透明、兼容。



# 性能

使用 innerHTML 把一大块元素替换掉，因为销毁的元素比较多、绑定着事件，会导致 GC 压力大。再插入新元素，再重新绑定事件。整体性能耗费比较大。


## 性能优化
> [非常好又全面的文章](http://www.smashingmagazine.com/2012/11/05/writing-fast-memory-efficient-javascript/)，内容比较长

- [让我们再聊聊浏览器资源加载优化](http://www.infoq.com/cn/articles/browser-resource-loading-optimization)
- [Minimizing browser reflow](https://developers.google.com/speed/articles/reflow)
- [分析关键渲染路径](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp?hl=zh-cn)
- [Improving Web App Performance With the Chrome DevTools Timeline and Profiles](http://addyosmani.com/blog/performance-optimisation-with-timeline-profiles/)
- [使用Continuous painting mode来分析页面的绘制状态](http://ju.outofmemory.cn/entry/18882)
- [Memory Analysis 101](https://developer.chrome.com/devtools/docs/memory-analysis-101)
- [Secrets of the Browser Developer Tools](http://www.83rdstasis.net/devtoolsecrets/slides/london-web/#1)
- [使用Chrome DevTools的Timeline和Profiles提高Web应用程序的性能](http://www.oschina.net/translate/performance-optimisation-with-timeline-profiles?cmp)

Garbage collection is a form of memory management.

It’s not possible to force garbage collection in JavaScript. You wouldn’t want to do this, because the garbage collection process is controlled by the runtime, and it generally knows best when things should be cleaned up.

Manually de-referencing objects is not necessary in most cases. By simply putting the variables where they need to be (ideally, as local as possible, i.e. inside the function where they are used versus an outer scope), things should just work.  
手动清理对象多数情况是不必要的，应该把对象变量放在本地、例如function里，而不是在外边。

本来Javascrip引擎能检测正在执行中的“热”对象并优化它、让它执行更快速；但delete操作会「严重改变」对象结构，导致引擎不能优化该对象。将不需要的对象属性设置为null也比delete操作好，但这也是不必要的。

如果某个变量引用是对对象的最后一个引用，那么垃圾回收会自动执行。

Globals are cleaned up when you refresh the page, navigate to a different page, close tabs or exit your browser. Function-scoped variables get cleaned up when a variable falls out of scope. When functions have exited and there aren’t any more references to it, the variable gets cleaned up.  
全局变量不会被垃圾回收，除非页面刷新、跳转或关闭。函数作用域里的变量，在函数执行完毕、函数退出、没有引用时会被清理掉。

Ensure that you’re unbinding event listeners where they are no longer required, especially when the DOM objects they’re bound to are about to be removed  
删除dom对象时，及时解除事件监听。

Don’t write enormous functions, as they are more difficult to optimize

Don’t load from uninitialized or deleted elements. This won’t make a difference in output, but it will make things slower.

Create objects using a constructor function. This ensures that all objects created with it have the same hidden class and helps avoid changing these classes. As an added benefit, it’s also slightly faster than Object.create()

There are no restrictions on the number of different object types you can use in your application or on their complexity (within reason: long prototype chains tend to hurt, and objects with only a handful of properties get a special representation that’s a bit faster than bigger objects). For “hot” objects, try to keep the prototype chains short and the field count low.

When you absolutely do need to copy objects in a performance-critical code path (and you can’t get out of this situation), use an array or a custom “copy constructor” function which copies each property explicitly. This is probably the fastest way to do it

It’s never a good idea to mix values of different types (e.g. numbers, strings, undefined or true/false) in the same array (i.e. var arr = [1, “1”, undefined, true, “true”])

be aware that although JavaScript engines continue to get faster, the next real bottleneck is the DOM. Reflows and repaints are just as important to minimize, so remember to only touch the DOM if it’s absolutely required. And do care about networking. HTTP requests are precious, especially on mobile, and you should be using HTTP caching to reduce the size of assets.





# jquery

## 使用

    jQuery里查找元素绑定的事件：
    jQuery._data( elem, "events" ); //elem为HTML Element


    在jQuery下实现锚点的平滑跳转：
    $("html,body").animate({scrollTop: $("#comment").offset().top}, 1000);

    Jquery跳出each循环：
    break -- 用return false;
    continue --用return ture;

### 加载

    $(document).ready(function(
        // 执行语句
    });
    相当于
    $(function(){
        // 执行语句
    });

注意点：

1. 确保在 <body> 元素的onload事件中没有注册函数，否则可能不会触发$(document).ready()事件。
2. 可以在同一个页面中无限次地使用$(document).ready()事件。其中注册的函数会按照（代码中的）先后顺序依次执行。


### jquery判断元素是否存在

    JS：
    obj = document.getElementById("someID");
    if (obj){
        obj.innerText("hi");
    }

    jquery：
    if ( $("#someID").length > 0 ) {
      $("#someID").text("hi");
    }

注意：**判断某个页面元素存在与否在jQuery实际上是没有必要的**，jQuery本身会忽略对一个不存在的元素进行操作，并且不会报错。


### $('xx').data()使用地方
- [jQuery.data](http://www.cnblogs.com/silin6/p/jQuery_data.html)

在实际应用中我们要给我们的DOM添加数据，如果我们给一个DOM添加的数据太多的话，会存在循环引用的风险，例如我们添加的数据恰好引用了这个DOM元素，就会存在内存的泄露。所以jquery使用了数据缓存的机制就解决或者说避免这一问题。

我们想在DOM上添加数据，但是不想引起内存的泄露，也就是我们不想引起循环引用，要尽量减少在DOM上挂数据。  
jquery的思路是这样：使用一个数据缓存对象$.cache,在需要绑定数据的DOM上扩展一个expando属性，这个属性存的是一个id，这里不会存在循环引用的情况了，之后将数据存在$.cache[id]上，当我们取DOM上的数据的时候，我们可以根据DOM上的expando找到id，进而找到存在$.cache[id]上的数据。可以看出jquery只是在DOM上扩展了一个属性expando，数据都存在了$.cache中，利用expando这个属性建立DOM和缓存对象之间的联系。无论我们添加多少的数据都会存储在缓存对象中，而不是直接挂在DOM上。这个唯一id是一个整型值，初始为0，调用data接口时自动加一，唯一id附加在以$.expando命名的属性上，$.expando是动态生成的，类似于一个时间戳，以尽可能的避免与用户变量冲突。从匹配的DOM元素上取到唯一id，在$.cache中找到唯一id对应的对象，再从对应的对象中找到key对应的值



## 插件
### 常用插件
- [ScrollToFixed](https://github.com/bigspotteddog/ScrollToFixed)
- [lazy loading images](https://github.com/tuupola/jquery_lazyload)
- [gridster.js-拖动布局组件](https://github.com/ducksboard/gridster.js)

### 插件开发
- [jQuery插件开发入门](http://www.css88.com/archives/4821)
- [插件开发-Metadata](http://www.cnblogs.com/easirm/p/4176427.html)

    jQuery.fn.xx = function(opts){
      var defaults  = {
        x: xx
      };
      var opts = $.extend(op, opts);
      return $(this).each(function() {
        //...
      });
    }


## 源码分析

### 整体结构

    var $ = jquery = function () {
        return new jquery.fn.init();
    }
    jquery.fn = jquery.prototype = {
        init: function () {
            this.length = 0;
            this.test = function () {
                return this.length;
            }
            return this;
        },
        jquery: "1.3.2",
        length: 1,
        size: function () {
            return this.length;
        }
    }
    jquery.fn.init.prototype = jquery.fn;

    alert($().jquery);
    alert($().test());
    alert($().size());

### prototype.js创建对象

    var Class = {
        create: function () {
            return function () {
                this.initialize.apply(this, arguments);
            }
        }
    };
    var Ctor = Class.create();
    Ctor.prototype={
        initialize:function(v){
            this.value=v;
        },
        showValue:function(){
            alert(this.value);
        }
    }
