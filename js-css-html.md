
# misc

- [高性能无尽列表（元素可回收）](https://github.com/bvaughn/react-virtualized)
- [元素定位库](http://github.hubspot.com/tether/)
- [js-repaint-perfs](http://leeluolee.github.io/js-repaint-perfs/#)
- https://github.com/STRML/react-grid-layout

- [front-end-application-frameworks-component-architectures](http://developer.telerik.com/featured/front-end-application-frameworks-component-architectures/)
- [一个对前端模板技术的全面总结](http://www.html-js.com/article/2313)
- [The State of the Componentised Web](http://www.futureinsights.com/home/the-state-of-the-componentised-web.html)
- [Web Components - building blocks of the future web](https://www.infinum.co/the-capsized-eight/articles/web-components-building-blocks-of-the-future-web)
- [开源前端框架纵横谈](http://www.csdn.net/article/2013-04-15/2814893)
- http://x-tag.github.io/

- ui库 & design
- 国内：[fineui](http://fineui.com/)、[amazeui](http://amazeui.org/)、[miniui](http://www.miniui.com/)
- [jQueryUI VS Kendo UI](http://jqueryuivskendoui.com/)
- [wijmo angular](http://wijmo.com/angularjs-components-preview/)、[webix](http://webix.com/)
- [semantic-ui](http://semantic-ui.com/)、 [Flat-UI](http://designmodo.github.io/Flat-UI/)
、 [html5-boilerplate](https://github.com/h5bp/html5-boilerplate)
- [amcharts](http://www.amcharts.com/demos/)
- [Javascript-WYSIWYG-editors](https://github.com/cheeaun/mooeditable/wiki/Javascript-WYSIWYG-editors)
- [materialpalette](http://www.materialpalette.com/)
- [bootstrap-material-design](http://fezvrasta.github.io/bootstrap-material-design/bootstrap-elements.html)

# 性能

使用 innerHTML 把一大块元素替换掉，因为销毁的元素比较多、绑定着事件，会导致 GC 压力大。
再插入新元素，再重新绑定事件。整体性能耗费比较大。

## 性能优化
> [非常好又全面的文章](http://www.smashingmagazine.com/2012/11/05/writing-fast-memory-efficient-javascript/)

- [JavaScript 启动性能瓶颈分析与解决方案](http://mp.weixin.qq.com/s?__biz=MzIwNjQwMzUwMQ==&mid=2247484987&idx=1&sn=7f20da20bc6baed62ca8ff115209942b)
- [让我们再聊聊浏览器资源加载优化](http://www.infoq.com/cn/articles/browser-resource-loading-optimization)
- [Minimizing browser reflow](https://developers.google.com/speed/articles/reflow)
- [分析关键渲染路径](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp?hl=zh-cn)
- [Improving Web App Performance With the Chrome DevTools Timeline and Profiles](http://addyosmani.com/blog/performance-optimisation-with-timeline-profiles/)
- [使用Continuous painting mode来分析页面的绘制状态](http://ju.outofmemory.cn/entry/18882)
- [Memory Analysis 101](https://developer.chrome.com/devtools/docs/memory-analysis-101)
- [Secrets of the Browser Developer Tools](http://www.83rdstasis.net/devtoolsecrets/slides/london-web/#1)
- [使用Chrome DevTools的Timeline和Profiles提高Web应用程序的性能](http://www.oschina.net/translate/performance-optimisation-with-timeline-profiles?cmp)

Garbage collection is a form of memory management.

It’s not possible to force garbage collection in JavaScript. 
You wouldn’t want to do this, because the garbage collection process is controlled by the runtime, 
and it generally knows best when things should be cleaned up.

本来Javascrip引擎能检测正在执行中的“热”对象并优化它、让它执行更快速；
但delete操作会「严重改变」对象结构，导致引擎不能优化该对象。
将不需要的对象属性设置为null也比delete操作好，但这也是不必要的。

如果某个变量引用是对对象的最后一个引用，那么垃圾回收会自动执行。
全局变量不会被垃圾回收，除非页面刷新、跳转或关闭。
函数作用域里的变量，在函数执行完毕、函数退出、没有引用时会被清理掉。
删除dom对象时，及时解除事件监听。
Don’t write enormous functions, as they are more difficult to optimize
Don’t load from uninitialized or deleted elements.

It’s never a good idea to mix values of different types (e.g. numbers, strings, undefined or true/false) 
in the same array (i.e. var arr = [1, “1”, undefined, true, “true”])

be aware that although JavaScript engines continue to get faster, the next real bottleneck is the DOM. 
Reflows and repaints are just as important to minimize, 
so remember to only touch the DOM if it’s absolutely required. 
And do care about networking. HTTP requests are precious, especially on mobile, 
and you should be using HTTP caching to reduce the size of assets.

## dom 优化

dom 对象是很庞大的（上边有很多属性），其创建的开销比较大，已有的 dom 对象上做更新开销并不大，
众多框架都在围绕此做优化，比如用`key`是否变化来判断对 dom 的操作是 “更新” 还是 “销毁重建”。

dom批量更新：dom操作如，1.删除一个元素，2.增加一个元素，3.在增加的元素上改变一个属性。
如果用 dom-api 一步步操作，会导致中间多次的 repaints 和 reflows，这是比较低效耗性能的。
如果放到「虚拟dom」上操作，会把这三个过程最终的结果，一次更新到实际dom树上，只用操作一次实际dom。

react virtual-dom 里一次digest中的diff只需一次，但是会随着ui的复杂度，性能损耗严重，virtual-dom与原dom的对应也更难(如果angular的脏检查的性能取决与watcher的数量，那react则是取决与ui规模)。 virtual-dom的内部结构变化是不可预知的

[真实 DOM 和 react 虚 dom 讨论](http://www.zhihu.com/question/31809713)

[React Virtual DOM vs Incremental DOM vs Ember’s Glimmer: Fight](https://auth0.com/blog/2015/11/20/face-off-virtual-dom-vs-incremental-dom-vs-glimmer/)



# js

## es6
- [ECMAScript compatibility table](http://kangax.github.io/compat-table/es6/)
- [迭代器和生成器generators](http://se77en.cc/2014/01/20/iterators-and-generators-translation/)
- [async await](https://developers.google.com/web/fundamentals/getting-started/primers/async-functions)

### es6-modules
参考其他语言，如Python等模块设计。[es6-modules-final](http://www.2ality.com/2014/09/es6-modules-final.html)

- 静态化，支持静态分析，编译时就能确定模块的依赖关系，以及输入和输出的变量。能支持引入宏（macro）和类型检验（type system）。CommonJS和AMD模块，都只能在运行时确定。
- `import`、`export`可以出现在模块的任何位置，但要处于模块顶层，不能放在块级作用域内。
- 一个模块里`export deault`只能使用一次，其他输出可以用`export xx`。
- CommonJS模块输出的是一个值的拷贝（输出后不可变），而ES6模块输出的是值的引用（输出后可变）。
- ES6模块支持“循环依赖”，正常输出。CommonJS模块也支持，但只输出已经执行的部分，还未执行的部分不会输出。


## base

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

- [匿名函数的多种调用方式](http://www.cnblogs.com/snandy/archive/2011/02/28/1966664.html)
- [立即调用的函数表达式](http://www.cnblogs.com/TomXu/archive/2011/12/31/2289423.html)
- [ECMA-262-3 in detail. Chapter 5. Functions](http://dmitrysoshnikov.com/ecmascript/chapter-5-functions/)

- [void 和 undefined](http://shapeshed.com/the-void-of-undefined-in-javascript/)
- [DOM的attribute和property](http://www.noahlu.com/blog/javascript-note/dom-attribute-property/)

- [日期和时间字符串](http://msdn.microsoft.com/zh-cn/library/ie/ff743760(v=vs.94).aspx)
- [计算日期和时间](http://msdn.microsoft.com/zh-cn/library/ie/ee532932(v=vs.94).aspx)
- [safari 对时间格式支持的差异](http://stackoverflow.com/questions/4310953/invalid-date-in-safari)

    new Date('2010-11-29') // Safari: Invalid Date
    new Date('11-29-2010') // Safari: Invalid Date
    new Date('2010/11/29') // 正确
    new Date('11/29/2010') // 正确
    new Date('2016-06-08T12:18:00+0800') // Safari: Invalid Date
    new Date('2016-06-08T12:18:00+08:00') // 正确

- 只在行首字符是`+、-、[、(、/`这5种情况下，加前置分号即可，其他不用加分号。
- [Semicolons in JavaScript are optional](http://mislav.uniqpath.com/2010/05/semicolons/)
- [JavaScript 语句后应该加分号么？](http://www.zhihu.com/question/20298345/answer/14670020)

- [全面：观察者/pub-sub/facade/mvc、mvp、mvvm](http://addyosmani.com/resources/essentialjsdesignpatterns/book/)
- [中介者模式与观察者模式有何不同？](http://www.cnblogs.com/aaronjs/archive/2013/07/18/3199282.html)
- [Five Patterns to Help You Tame Asynchronous JavaScript](http://tech.pro/blog/1402/five-patterns-to-help-you-tame-asynchronous-javascript)
- [JavaScript 设计模式 – 第二部分： 适配器、装饰者和工厂模式](http://www.adobe.com/cn/devnet/html5/articles/javascript-design-patterns-pt2-adapter-decorator-factory.html)

- [Sea.js 源码解析（二）](https://github.com/lifesinger/lifesinger.github.com/issues/171)
- [Sea.js 源码解析（三）](https://github.com/lifesinger/lifesinger.github.com/issues/175)



# css

当父元素是 横向滚动容器、并且需要禁止子元素(如 display:inline-block)换行时，需要设置`white-space: nowrap;`，
这样子元素里、如文字段落、也都不再换行，需要在段落标签上设置`white-space: normal;`

英文连续字符不会被自动截断、不会换行、需要加`word-break: break-all;`，
注意：下划线`_`和字母一起会被认为是连续的，但中划线`-`和字母一起不是连续的。

[不能根据子元素class改变父元素class]( http://stackoverflow.com/questions/1014861/is-there-a-css-parent-selector)

All elements that are position:absolute; are automatically treated as display:block, 
since that's the only logical display mode for absolute positioning.

- [html5和css3动画排列人物头像演示](http://www.w2bc.com/Article/11916)
- [Scalable and Modular Architecture for CSS](http://smacss.com/book/)
- [Google HTML/CSS Style Guide](http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml)
- [css3generator](http://css3generator.com/)
- [综合](http://demo.doyoe.com/#inline-block-space)：Web前端实验室用于存放CSS探索之旅的实验和测试用例(Demos and Examples)
- [media type与media query](http://www.qianduan.net/media-type-and-media-query.html)

## 组织css
- [BEM命名方式](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
- [css命名、组织方式](http://benfrain.com/enduring-css-writing-style-sheets-rapidly-changing-long-lived-projects/)
- [值得参考的css理论：OOCSS、SMACSS与BEM](http://segmentfault.com/blog/yardtea/1190000000704006)
- css与js完全分离
    - 用 J_ 或 j- 做js钩子， **专用于** js中的样式名或id， **不附加** 任何css样式。达到 js css 完全分离
- class的命名
    - 根据系统名加前缀，例如partnerprod系统，可以叫 pp-xxx 。(bs等第三方库的样式名不限制)

## css写法
- [如何提升 CSS 选择器性能](http://www.jianshu.com/p/268c7f3dd7a6)
- [理解css时间函数](http://www.smashingmagazine.com/2014/04/15/understanding-css-timing-functions/)
    - [贝塞尔曲线](http://cubic-bezier.com/#.42,0,.28,1.03)
- [css浮动](http://paranimage.com/css-float-attribute/)

## icon font
- [icon font介绍、制作](http://www.qianduan.net/css3-icon-font-guide.html)
- [Font-Awesome](http://fortawesome.github.io/Font-Awesome/)
- [livicons](http://livicons.com/)
- [css-gui-icons](http://nicolasgallagher.com/pure-css-gui-icons/)
- [one-div](http://one-div.com/)


# html

[`<head>`里能放什么？](https://github.com/joshbuchea/HEAD)

## 页面编码
- 编码和字符集的区别：gbk、utf-8都是字符集。 http数据传输时的编码和界面显示使用的的字符集的区别。
- `<meta charset="utf-8" />`要置于`<title></title>`之前，能使得浏览器先获得编码设置，来正确解析页面中文本内容。（不然，老IE浏览器可能会有问题）
- [URL 编码，为什么要编码？](http://anjia.github.io/2015/04/15/jsURIEncode/)
- 浏览器在自动选择编码方式的时候不会优先根据html源码中的所展示的`<meta charset="utf-8" />`代码来决定选择什么编码方式，而是优先根据“响应标头-response header”中的键为“Content-Type”的值来自动选择判断。（老IE浏览器相反）

## html标签使用注意点
- [div和span都是作为容器元素](http://www.w3.org/wiki/Generic_containers_-_the_div_and_span_elements)
- p标签里不能有块(block)标签，否则`<p>`标签会提前结束导致解析错误，也会连环导致其他标签解析错误
- `<select>` is inline by default
- span标签里可以放几乎任何标签？
- a标签带href并不为空，按enter键都会触发其上的click事件，否则不会触发！

## 键盘、可访问性

- [键盘聚焦并可点击](http://www.456bereastreet.com/archive/201302/making_elements_keyboard_focusable_and_clickable/)
- [aria](http://www.paciellogroup.com/blog/2010/04/html5-and-the-myth-of-wai-aria-redundance/)
- [WAI-ARIA](http://www.w3.org/TR/wai-aria/usage#managingfocus)
- [aria-hidden and role="presentation"](http://asurkov.blogspot.com/2012/02/aria-hidden-and-rolepresentation.html)

## 浏览器渲染
当浏览器从服务器接收到了HTML文档，并把HTML在内存中转换成DOM树，在转换的过程中如果发现某个节点(node)上引用了CSS或者 IMAGE，就会再发1个request去请求CSS或image，然后继续执行下面的转换，而不需要等待request的返回，当request返回后，只需要把返回的内容放入到DOM树中对应的位置就OK。
但当引用了JS的时候，浏览器发送1个js request就会一直等待该request的返回。因为浏览器需要1个稳定的DOM树结构，而JS中很有可能有代码直接改变了DOM树结构，浏览器为了防止出现JS修改DOM树，需要重新构建DOM树的情况，所以就会阻塞其他的下载和呈现。

结论：在head里面尽量不要引入javascript，如果要引入js 尽量将js内嵌，把内嵌js放在所有css的前面(否则会打断css或图片的并行下载)。

- [浏览器如何渲染文本](http://blog.jjgod.org/2011/04/09/how-do-browsers-render-text/)

## 其他

[等宽字体（Monospaced Font）](http://zh.wikipedia.org/wiki/%E7%AD%89%E5%AE%BD%E5%AD%97%E4%BD%93)

html特殊字符：[HTML特殊字符大全](http://www.qianduan.net/html-special-characters-daquan.html)、
[显示](http://www.sjyhome.com/html/html-special-characters.html)

- 页面拥有ID的元素会自动创建全局变量，会不会导致JS问题？
- 浏览器地址栏输入以下代码：
    - `javascript:alert('hello from address bar :)’);`
    - `data:text/html,<h1>Hello, world!</h1>`
    - `data:text/html, <html contenteditable>`

- repaint：当某元素在不改变布局、发生显示/隐藏的变化时，就会发生repaint。  
- reflow：当DOM以一种影响到布局的方式进行操作时，会触发reflow。  
    - 例如，样式改变影响了布局、className改变、浏览器窗口大小改变、插入一个新元素、改变DOM节点的文本、新增一个元素属性，等等对DOM修改的行为都会触发reflow
    - 通过 getComputedStyle、offsetWidth、scrollWidth、clientWidth等属性获取元素的尺寸或位置，会被强行触发reflow。因此多个style变化可通过设置一次className完成
    - 当元素reflow时，他的子结点和其后的任何元素也会reflow，最后所有元素进行repaint
- 减少reflow的方法：
    - 将多个元素改变都在DOMDocumentFragment中进行，然后用一次操作将元素片段放到DOM中，这样只触发一次reflow
    - 要在元素上做动画应该设置position:absolute或position:fixed,他们只会引发一个repaint而不是全部reflow。
    - 通过scrollTo()进行原生滚动，性能显著，因为没有触发reflow。

- 判断文档是标准模式还是怪异模式：`window.top.document.compatMode`
- 禁止别人以iframe加载你的页面: `if (window.location != window.parent.location) window.parent.location = window.location;`

- [网页渲染过程：Repaint和Reflow](http://frontendbabel.info/articles/webpage-rendering-101/)
- [W3C HTML JSON form submission](http://www.w3.org/TR/2014/WD-html-json-forms-20140529/)

- img script的src、css的href 都不能为空，否则会有个指向本页面的请求
- id、class选择器被标签选择器限制，都是多余的。
- css浏览器私有属性在前面， W3C标准属性在后面，Hack属性在更后面。
- z-index 属性仅在节点的 position 属性为 relative, absolute 或者 fixed 时生效.
- 元素嵌套：
    - ul和ol的子元素不能是别的元素只能是li，不能是别的比如div等（ie6会有问题）。
    - p标签不能嵌套块级元素，button里面不要嵌套a标签。
    - dt标签里面不能嵌套块级元素，只能嵌套内联元素，dd可以。
- Do not use quotation marks in URI values (url()).
- css2.1的counter-increment，详见[使用](http://onwebdev.blogspot.com/2012/02/css-counters-tutorial.html)。  


# other


## 组件设计

- [javascript组件化](http://purplebamboo.github.io/2015/03/16/javascript-component/)
    - 设计一个组件类（如 function TreeView(){ } ）
    - 设置组件类的配置项或属性（ function TreeView(config){ this.cfg = extend({}, config) } ）
        - 组件的属性，只能通过方法来访问。
        - 组件的属性value change后组件自动映射变化。
    - 组件类上附加组件方法（ TreeView.prototype.xx = function (){ } ）
    - 为组件添加自定义事件
        - mixin进来带有on/off/fire等方法的事件系统，为组件级别添加事件，屏蔽底层的dom事件，方便组件的使用！
    - 抽出Widget抽象类，作用是为ui组件提供统一的接口名，统一生命周期管理
    - 组件使用方式：new出组件实例使用

- [Backbone View 之间通信的三种方式](http://www.geekplux.com/2015/07/04/communicating-between-views-in-backbone.html)
- [如何实现一个mvvm组件](http://shepherdwind.com/2014/05/17/how-to-reliaze-mvvm--bidi/)

### 设计原则：
- 职责清晰
    - 组件的每个模块，分别该承担哪些功能？
    - 多个组件/模块协同完成一件事情，而不是一个组件替其他组件完成本该它自己完成的事情
- 开放与封闭
    - 属性配置等API对外开放；组件内部dom及状态的更改、对外封闭
- 高内聚、低耦合
    - 组件内部通过callback方式直接调用，组件与组件之间通过发布订阅的模式通信
- 尽量避免信息冗余
    - 例如：一个东西能被另一个推导出来，就只使用一个
- api 尽量和已知概念保持一致
    - 例如api命名：聚焦常用命名是focusable，而不是canFocus等自己臆想的名字；还有如onDeselect、
    - api的功能要符合常用、遵循单一职责。例如：active表示活动状态、但不能代替表示selected选中状态。

### tree 组件
实现功能：节点展开收起、单选/多选、checkbox、异步加载、右键菜单、节点增删改查、节点拖动。

- 根据用户设置的 checkedKeys（e.g.['key1', 'key2']）遍历所有节点，设置各级节点的「选中/半选/不选」状态。
    - 某节点设置checked，其子节点都要checked。
    - 再根据兄弟节点的check状态，循环设置父级节点的check状态。
- 根据用户设置的 expandedKeys（e.g.['key1', 'key2']）遍历节点，设置节点的 expand 状态。
    - 子节点设置expand，循环设置父节点也要expand。
    - 但点击父节点，子节点expand状态不能变。

### 拖动
- 在touchstart中记录起始位置，并开始监听touchmove和touchend
- 在touchmove中计算当前位置和起始位置之间的offset，并进行拖拽操作
- 在touchend中取消监听touchmove和touchstart，并进行释放操作

### form及验证
- form要支持只使用“键盘完成”，按enter键要能触发表单提交，使用type="submit"
- 声明式的「验证规则、错误提示」设置
- 动态设定错误提示 （如，Ajax返回后根据错误码手动设置错误提示）
- 可以自定义错误触发条件
    - 如required验证对于文本框默认为空时触发，对于“多选框”验证时，需要验证选择后的数据数组长度是否为零时触发，与文本框不同。
- 参考ng里针对`ng-model="xx"`绑定的xx数据进行验证，校验结果自动反馈到相应dom上。

验证方式：
以js对象的验证为主，把dom上的值附加进来，如[validate.js](https://github.com/ansman/validate.js)

### tabs - tab
- API：selected | on-select | on-deselect
- tab切换后，前一个页面的Ajax请求还没完成，要不要abort掉？

### modal
- 弹出框允许放到某个内层元素里，或者body元素下
- 在body下时，都append到body末尾闭合处，而不是在body标签开始处
- 背景层backdrop/mask，有的直接放在body下和modal框平级，有的放到modal-container里边(感觉更好)

### 其他组件
> [元素定位](https://github.com/HubSpot/tether)

- grid 组件与 table 组件区别
    - grid（[datagrid](https://github.com/zippyui/react-datagrid)），使用div不用table/tr/td，支持可变列数、筛选、排序、列宽度拖动改变、单选多选、分页、行列单元格自定义样式。
    - table 组件，使用table/tr/td，用于简单表格展示。
- notify、message 类的组件应该区分成两类。
    - 一类：点击某个按钮，或操作成功失败时，页面某个位置出现的弹出框。（例如顶部或右上角弹出的通知）
    - 二类：页面最顶部固定的一行横通知条。（例如系统维护通知）
- 弹窗类、展开收起类组件，处于页面底部时，展开后，不能全部出现在可视区域，需要改变滚动条位置。
- datepicker、timepicker 注意能合到一起使用的情况（最好看起来是无缝整合），也要能分开使用。
    - timepicker 搜索当天，从00:00:00到23:59:59；限定可以选择的时间范围，最小时间、最大时间(例如最小时间是now，最大时间如果不设置、那默认是多少?)
    - datepicker、timepicker 共用一个时间点时，之间的影响（例如datepicker选完日期，可能会重置时间为00:00，影响timepicker，怎么处理?）
- select组件：支持Infinite scroll
- modal等弹窗类组件，必须有`destroy`方法。应用场景：普通按钮，列表
- pagination组件，如图![](https://t.alipayobjects.com/images/rmsweb/T1OIlhXmVcXXXXXXXX.png)
  如果数据总数50万+时，每页显示5个页码，下拉框就会有10万条目，导致页面dom数过大，浏览器崩溃。
- 图表组件，给出`destroy`方法，并测试是否有内存泄露(多操作或刷新几次页面是否卡顿)。
    - 图表纵坐标根据数据自动生成，要满足业务对生成数据的特殊要求，如：不能有负值；只能是整数值(不能是小数)
- upload组件，添加了不允许上传的文件类型，给出错误提示。
- select / tags-input 组件
    - 特殊需求：在 [tags input select](http://react-component.github.io/select/examples/tags.html) 里，想直接输入一串如 `name1,name2,name3,name4,nam5,....` 这样比较长的内容（预先准备好的人员列表），组件自动根据分隔符(例如这里的逗号)，split 出来，然后分别验证这些条目是否合法（如果分别发Ajax将会很多、不可行），再转换为一个个 tag。 这种需求一般是单独做一个「导入」文件或组的功能来实现，但放到 tags-input 组件或 select 组件里，感觉也有一定合理性。 在 select2 的 [Automatic tokenization](https://select2.github.io/examples.html#tokenizer) example 里输入 `red,blue,green,`  这串特定分割的字符串，会自动根据逗号 split 出三个 tag 出来。select2 这个还能输入更多自动保存到选择list里，也不涉及到发Ajax操作。



## MVC
- Model
    - model 里存放的是「需要持久化的数据」(DO, domain object)，而不是页面显示用的临时数据（VO, view object / ui state）。
    - model 里可以包含对Ajax请求参数的组装、处理；如果返回数据也需要统一处理，可以写相应的统一处理函数？
    - 公共 model 抽取出来放一个地方；不同页面特有的 model 邻近相应 view 放置
    - model 是否是 singleton 的？使用时需不需要 new ？
- View
    - 页面全部组件化（参考react组件化思路）
        - 抽象出组件的方式尽量简单（react比angular组件简单）
        - 需要复用的代码片段、抽象成组件（哪怕仅是两三行代码，但需要到处复用）-- 小组件
- controller
    - 内容应尽量少，在 controller 里设置页面显示用的运行时数据（VO, view object / ui state），持久化的数据从model里获取。
    - Any time you need to store information only for the lifetime of this application run, you should store it on a controller.

### model 不同的设计思路：
- [Backbone.Model](http://backbonejs.org/#Model)
- [ember-models](http://guides.emberjs.com/v1.10.0/models/)、[ember-data-model-maker](http://andycrum.github.io/ember-data-model-maker/)

ember-data 处理方式：

- `DS.Model` 用来创建数据模型。定义了需要呈现给用户的数据的属性和行为。
    - 不同模型之间会有关联关系：一对一，一对多，多对多。与后台数据库模型类似。[原文](http://guides.emberjs.com/v1.10.0/models/defining-models/#toc_defining-relationships)、[翻译](https://m.oschina.net/blog/518608)
    - 模型本身没有任何数据；模型只定义了其实例所具有的属性和行为，而这些实例被称为记录。
    - 记录是模型的实例，包含了从服务器端加载而来的数据。应用本身也可以创建新的记录，以及将新记录保存到服务器端。
- `DS.Store` 中心数据仓库，是应用的所有数据的缓存。一般整个应用只有一个 store 生成，负责创建/删除/查找/过滤/定位 `DS.Model` 的实例。
    - 注意，重申下 Model 只是数据的属性和行为，Model 的实例 record 包含具体的数据，由 store 创建存储管理。
- 利用不同的 Adapter 和不同服务端通信，如：HTTP、Websocket 等。

在 react.js 的 flux 等架构中，是不建议使用「fat model」的。[model使用](https://medium.com/swlh/the-case-for-flux-379b7d1982c6)

fat model, skinny controller. the model should do the heavy lifting are:

- Validation in the case of CRUD functionality and post methods.
- Type-conversions and data manipulation.
- Storing data in memory or in HTML5 databases to minimize server hits.

The server-side code mainly does model manipulation and notifications, and so having a fat model/thin controllers makes sense. The controller is essentially the router to the model.

### 业务场景
#### 文章下边的 “like” ：
- 有一个 “like” 按钮。
- 显示前十个喜欢此文章的用户。（对应一个 API）
- 单独一个模块显示喜欢此文章的全部用户，带有分页。（对应另一个 API）
- 点击 “like” 按钮，以上两个区域的数据改变。

这里对于点击了喜欢的用户，需要有个「 model collection」，但是需要一个 model 或者是 两个 ？

> It would be nice if those two lists corresponded to the same model collection, but this means the same model collection needs to be fed from two different API responses. Turns out, 1:1 correspondence between API responses and model objects doesn’t scale!



## SPA
### 注意点
- 页面上发出了Ajax请求，要等比较久时间才返回，返回成败都有弹框，但在返回结果之前「跳走」，页面跳转后弹窗是否还会有？
- 页面的边界测试：如数据量特别大时
- 切换路由后会把上个路由状态生成的html全部销毁掉，再切回来恢复不到原来的样子。问题场景如：列表页由许多查询条件组合查询出来，点击列表里某个条目进入详情，再返回到列表页，就需要手动再查询出列表。更好的是恢复上次查询生成的列表html，再更好要保持原来的滚动条位置，完全恢复现场，不会打断用户继续浏览列表。（切走之前保存查询条件、切回来再重新查询，不是个好办法，不能完全恢复之前状态）

### SPA 实现原理
- 如果浏览器支持 history API，使用 pjax (pushState + Ajax)
    - 点击一个链接，通过 Ajax 获取页面部分区域数据（向服务器发送一个有PJAX标志(设置在header里)的请求，服务器返回一段相应的html片段）
    - 通过 pushState 修改 URL 和 document.title，并把服务器返回的htm片段插入页面。
    - Github上的文件/目录跳转加载，就是采用 pjax 的方式实现的。
- 如果浏览器不支持 history API，使用 hash 如 http://example.com#word
    - 浏览器会把不同的 hash 记录到历史记录中，但需要监听 hash 值的变化。
    - 对于支持 onhashchange 的浏览器，监听此事件；不支持的则要定时去判断hash的变化。

### spa 基础问题
- [客户端渲染和服务端渲染，哪个快？](http://www.onebigfluke.com/2015/01/experimentally-verified-why-client-side.html)
    - It depends on what you're doing. If you care about first paint time, server-side rendering wins. If your app needs all of the data on the page before it can do anything, client-side rendering wins.
    - Below 1,000 cats worth of complexity, the client- and server-side rendering approaches have essentially the same time to first paint on both desktop and mobile. Above 1,000 cats worth of complexity, server-side rendering will do first paint faster than client-side rendering. But the client-side rendering approach will always win for last paint time above 1,000 cats.
- [Batching HTTP Requests in Angular to Improve Performance](https://github.com/jonsamwell/angular-http-batcher)
    - HTTP Batching is actual fairly simple as a concept. The idea is to group multiple HTTP requests into a single HTTP call. It basically defines a way to represent a complete HTTP request (headers and all) as a section in a single HTTP POST body.



## API 设计
[Apollo Data Stack](http://docs.apollostack.com/)、
[How to build a GraphQL server](https://medium.com/apollo-stack/tutorial-building-a-graphql-server-cddaa023c035#.gdvn0fb8v)

[Swagger 及 API 管理](https://www.linkedin.com/pulse/swagger-%E5%8F%8A-api-%E7%AE%A1%E7%90%86%E7%AE%80%E4%BB%8B-minglei-tu)

There are some important differences between the two though:

- Falcor returns Observables, GraphQL just values. For how Netflix wanted to use Falcor, this makes a lot of sense for them. They make multiple requests and present data as it's ready, but it also means that the client developer has to work with the Observables directly. GraphQL is a request/response model, and returns back JSON, which is trivially easy to then use. Relay adds back in some of the dynamicism that Falcor presents while maintaining only using plain values.
- Type system. GraphQL is defined in terms of a type system, and that's allowed us to built lots of interesting tools like GraphiQL, code generators, error detection, etc. Falcor is much more dynamic, which is valuable in its own right but limits the ability to do this kind of thing.
- Network usage. GraphQL was originally designed for operating Facebook's news feed on low end devices on even lower end networks, so it goes to great lengths to allow you to declare everything you need in a single network request in order to minimize latency. Falcor, on the other hand, often performs multiple round trips to collect additional data. This is really just a tradeoff between the simplicity of the system and the control of the network. For Netflix, they also deal with very low end devices (e.g. Roku stick) but the assumption is the network will be good enough to stream video.

### [Falcor](http://netflix.github.io/falcor/)
- [Demand driven architecture（CQRS/Falcor）](http://www.javacodegeeks.com/2015/10/transcending-rest-and-rpc.html)
- rpc优却点：低延迟，数据量小；不可缓存(手动管理)，紧耦合
- rest优却点：可缓存，松耦合；高延迟，数据量大
- 两者结合:
    - one model everywhere
    - The data is the API
- You can convert any JSON object into a JSON Graph in two steps:
    - Move all objects to a unique location within the JSON object
    - Replace all other occurrences of the object with a Reference to that object’s unique location

- 他希望编写优雅、易读的代码。在用户界面上查找和修改数据要直观，最好是开发者只需要考虑自己的数据模型，而不用关心可用的API端点。
- 他希望可以消除由传统REST API所导致的不必要的请求和响应开销。
- 他还希望用一种更好的方法取代难以维护和改进的传统REST API。

### [GraphQL](https://github.com/facebook/graphql)
GraphQL is Facebook's [graph API](https://developers.facebook.com/docs/graph-api)
（[How to get lots of data from the Facebook Graph API with just one request - Optimizing request queries to the Facebook Graph API](https://www.sammyk.me/optimizing-request-queries-to-the-facebook-graph-api)）。
[基于 GraphQL 的产品](https://www.reindex.io/)。

- [GraphQL is the King. Long Live the King!](https://medium.com/@scbarrus/graphql-is-the-king-long-live-the-king-r-i-p-rest-cf04ce38f6c#.avmpteg2j)
- [Introducing Relay and GraphQL译](http://segmentfault.com/a/1190000002570887)
- [文档](http://graphql.org/docs/getting-started/)、
[graphql-js](https://github.com/graphql/graphql-js)
- [From REST to GraphQL](https://blog.jacobwgillespie.com/from-rest-to-graphql-b4e95e94c26b#.e3re515s5)
- [From REST to GraphQL-](https://news.ycombinator.com/item?id=10365555)

GraphQL is essentially the one [API Gateway](http://microservices.io/patterns/apigateway.html) to rule them all. And then you add Relay on top of it to build up the exact query you want.

- GraphQL Returns Only the Data You Request. 请求什么返回什么
- GraphQL Returns Data in the Same Shape You Requested It. 返回的数据结构和请求结构一致
- GraphQL Sends a Single Request to the API and Returns a Single Response. 把同时发出的多个请求合并为一个，返回一个请求结果集合，并自动拆分到不同的组件里



## 函数式编程

- [函数式编程](http://coolshell.cn/articles/10822.html)
- [函数式编程有哪些优点？](http://www.nowamagic.net/academy/detail/1220540)
- [函数式编程扫盲篇](http://www.cnblogs.com/kym/archive/2011/03/07/1976519.html)
- [函数式编程初探](http://www.ruanyifeng.com/blog/2012/04/functional_programming.html)
- [introduction-functional-javascript](http://www.sitepoint.com/introduction-functional-javascript/)
- [Functional Programming in Javascript === Garbage](http://awardwinningfjords.com/2014/04/21/functional-programming-in-javascript-equals-garbage.html)
    - javascript不适合函数式编程？

对象是面向对象的第一型，那么函数式编程也是一样，函数是函数式编程的第一型。

在纯粹函数式程式语言中，你不是像命令式语言那样命令电脑「要做什么」，而是通过用函数来描述出问题「是什么」。
递回在 Haskell 中非常重要。命令式语言要求你提供求解的步骤，Haskell 则倾向于让你提供问题的描述。
这便是 Haskell 没有 while 或 for 循环的原因，递回是我们的替代方案。

在面向对象编程中，我们把对象传来传去，那在函数式编程中，我们要做的是把函数传来传去，我们把他叫做 **高阶函数**

在函数式编程中，函数是基本单位，是第一型，他几乎被用作一切，包括最简单的计算，甚至连变量都被计算所取代。
在函数式编程中，变量只是一个名称，而不是一个存储单元，这是函数式编程与传统的命令式编程最典型的不同之处。


### Persistent data structure

- [Immutability in JavaScript](http://www.sitepoint.com/immutability-javascript/)
- [Persistent_data_structure](https://en.wikipedia.org/wiki/Persistent_data_structure)

> fb出品的[immutable-js](http://facebook.github.io/immutable-js/)提供了Immutable的List, Stack, Map等数据结构，
为了实现不可变性，最直接的做法可能是直接拷贝对象，但因为效率太低不可行，而是利用了structural sharing，
这样就可以最小化的拷贝对象的一部分。拷贝的是哪一部分呢？如图：
![](https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Purely_functional_tree_after.svg/876px-Purely_functional_tree_after.svg.png)，这样嵌套的深层对象，只需拷贝f、g、d这一个链，其他的结构共享，这样创建了一个新对象，
就达到了immutable的目的，而且效率和内存占用都比较合理。但注意一个问题[Circular references](https://github.com/facebook/immutable-js/issues/259)，这个问题在Haskell等语言中在语言层面被解决了，
但在js中似乎难以解决。[详解视频](https://www.youtube.com/watch?v=I7IdS-PbEgI)

> Structural sharing is a powerful concept, and is what enables Clojure persistent data structures to achieve O(log n) performance on operations that would otherwise require full O(n) copies of a data structure.  It turns out that you can also achieve effective structural sharing of mutable data structures if they are structurally immutable. Effectively you get opportunity to realise the same O(log n) performance for operations that produce mutable views.

应用实例：
```html
<list>
  <item></item>
  <item></item>
</list>
```
item由list的数据生成，由于immutable两者之后的state变化互不影响，但变化后两者数据状态需要同步。
同步操作也是产生新的数据，似乎比较乱？


## form相关：

### get、post区别
- 获取数据用get，get速度快、有长度限制
    - get只能向服务器发送ASCII字符，这是W3C组织规定的，所以任何参数最后都要以ASCII码的形式传递，不能有中文字符。
    - get编码方式是根据当前网页采用选择的编码来编码。所以，当前网页如果是gbk编码，get的参数也会被编码为gbk，用`decodeURI()`或`decodeURIComponent()`(它们都是解utf-8编码的) 解码就会出现js异常抛错。
    - 对于要拼接到uri后面的中文参数进行encodeURIComponent或者encodeURI编码处理，因为encodeURIComponent或者encodeURI就是utf-8的编码方法，后端处理参数的解码方式一般也都是utf-8方式，这样不会出现后端获取中文乱码情况。
    - 浏览器发送数据给服务器时，会把数据进行浏览器编码成字节流

- 提交数据用post，post慢、理论上无长度限制(服务器端可能会规定最大长度)，post相对安全

> 用post做查询，刷新浏览器会弹出 “是否重复提交数据” 的弹框。改用get来做。

### form的method、action、target、enctype
- method 默认值为get
- action 属性表示 向何处发送表单数据 (一般为url)。
    - 如果不设置、或为空，则提交到本页面
    - 如果get方式提交、action url中参数都会被丢弃；post则不会

- target 属性规定在何处打开 action URL
    - 值可为：_self(默认值) | _blank |  _parent |  _top  | framename
    - 当设置为 隐藏的 iframe name 时，能实现假的 表单提交无刷新效果

- enctype 规定在发送表单数据之前如何对其进行编码
    - 设置：application/x-www-form-urlencoded (默认值)，默认对所有字符编码
        - 直接的post提交的数据按照`key1=val1&key2=val2`的方式进行编码，key 和 val 都进行了 URL 转码
        - ajax post提交时， **data 需要用`$.param()`处理成字符串** ，如果某个key对应的val为json，先JSON.stringify(val)，angular下使用angular.toJson能过滤掉$$hashkey。

            ```
            如下：注意 $.param 的使用
            $http({
                method: 'POST',
                url: 'xx.json',
                data: $.param(submitData),  // pass in data as strings
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            }).success(function (data, status, headers, config) {
                console.log(data);
            })
            ```

    - 设置：multipart/form-data ，使用表单上传文件时，必须让 form 的 enctype 等于这个值
    - 设置：application/json ，发送消息为序列化后的 JSON 字符串，AngularJS 中的 Ajax 功能，默认就是提交 JSON 字符串
    - 其他：text/plain

### 使用 FormData() 对象
> 注意：支持IE10+

FormData 配合 xhr2 能很方便的处理form表单！[介绍](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Using_FormData_Objects)，示例如下：

    //在已有的<form>元素上初始化FormData对象
    var fd = new FormData(document.getElementById("myForm"));

    //生成一个 空的formData对象
    var fd = new FormData();

    //添加 key val(string类型，其他类型自动会被转为string)；
    fd.append("CustomField", "This is some extra data");
    //添加 file文件
    fd.append("fileName", fileInputElement.files[0]);
    //添加 blob对象
    var oFileBody = "<a id="a"><b id="b">hey!</b></a>"; // Blob对象包含的文件内容
    fd.append("blobKey", new Blob([oFileBody], { type: "text/xml"}));

    //jQuery发送请求
    $.ajax({
      url: "stash.php",
      type: "POST",
      data: fd,
      processData: false,  // 告诉jQuery不要去处理发送的数据
      contentType: false   // 告诉jQuery不要去设置Content-Type请求头
    });

> 要注意其append的字段中有些需要encodeURIComponent、但有些不需要。


## 安全
- jsonp请求也需要「防止csrf漏洞」，例如可以用jsonp获取通讯录列表
- cors跨域：http头可以伪造，所以跨域的时候记得带上sessionId做身份验证；防止允许跨域的站点被入侵，从而导致源站信息泄露；不要对Access–Control-Allow-Origin使用`*`

### [csrf漏洞](http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)、[wiki](http://en.wikipedia.org/wiki/Cross-site_request_forgery)、[wiki中文](http://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)
XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。

跨站请求攻击，简单地说，是攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并执行一些操作（如发邮件，发消息，甚至财产操作如转帐和购买商品）。由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去执行。这利用了web中用户身份验证的一个漏洞：简单的身份验证只能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的。

When CSRF protection is enabled, all non-GET requests to the Sails server must be accompanied by a special token, identified by either a header or a parameter in the query string or HTTP body.

为防止csrf漏洞，传统表单里默认有生成了随机token的隐藏input，同步提交表单时能自动提交上去，同步提交后刷新页面会再次更新token。

但使用Ajax异步提交时，提交时要从Cookie里(或页面上)获得token值（这里假设攻击者不能获得第三方的Cookie，但用户的Cookie很容易由于网站的XSS漏洞而被盗取），另外要考虑在提交后是否需要手动更新Cookie里(或页面上)的token。

> [ajax里如何更新csrf token](http://www.v2ex.com/t/82751) ，最后的一段评论提到：csrf-token的目的是，让攻击者不能伪造请求（如通过img发起的请求会带上cookie）。因此，csrf-token不需要每个请求都改变，只需要确保对于每个session不一致即可，同一个session内不变没有问题。

#### jQuery、angular中的处理：  
[ jQuery Ajax post提交的csrf token处理 ](https://gist.github.com/alanhamlett/6316427)  
[ jQuery Ajax post提交的csrf token处理1 ](https://coderwall.com/p/cxwg_g)

     $.ajaxSetup({
            headers: { "X-CSRFToken": getCookie("csrftoken") }
      });
     // 注意：可能需要对Cookie做 encodeURIComponent 处理

[ angular csrf token ](http://stackoverflow.com/questions/18156452/django-csrf-token-angularjs)


## 文件操作

### jQuery-File-Upload 组件
- [jquery file upload 后台收到 filename 中文乱码](http://blog.csdn.net/zhouyingge1104/article/details/38322403)
- [在文件对象上如何附加其他input的字段？](https://github.com/blueimp/jQuery-File-Upload/wiki/How-to-submit-additional-Form-Data#adding-additional-form-data-programmatically)

### html5 -- blob、atob、canvas
- [Convert CANVAS data to binary data and then to a filename using a Blob](https://gist.github.com/iwek/7126242)
- 用 new FormData() 或 blob 上传文件时，angular处理的不好，可改用jQuery

### 一些问题：
- base64形式提交处理后图片，图片文件大小怎么计算？
- 上传前先压缩文件？以减少上传文件大小，怎么做？
    - 浏览器端被设计为发送简短http请求，浏览器端请求不用压缩，[见此](http://stackoverflow.com/questions/424917/why-cant-browser-send-gzip-request)。
    - 一种办法：客户端安装applet，并相应简单配置，[见此](http://www.radinks.com/upload/plus/compress.php)。
    - 图片上传前压缩[办法](http://blog-en.openalfa.com/javascript-client-side-compression-of-images/)。

### 下载文件：
注意：Ajax不能下载文件。[解释](http://stackoverflow.com/questions/14682556/why-threre-is-no-way-to-download-file-using-ajax-request)。可以用form表单提交下载，或iframe方式下载。

点击需要下载文件的连接，后端处理：`Content-type: application/octet-stream`、`Content-Disposition: filename=\`

- [单纯使用js下载文件](http://stackoverflow.com/questions/3749231/download-file-using-javascript-jquery)
- [纯前端-生成文件并下载](http://www.alloyteam.com/2014/01/use-js-file-download/)


## 跨域通信
[详细介绍](http://www.cnblogs.com/rainman/archive/2011/02/20/1959325.html)

- xhr1的ajax无论是get或post，都 **不能跨域**
- xhr2有两方面的增强：通信进度通知，跨域通信。它使用[Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS#Simple_requests)，W3C制定的跨站资源分享标准。post前会产生一次options嗅探（称之为preflight，简单请求就不会出现）来确认有否跨域请求的权限；客户端post时会带上Origin头指示来源网站，服务端响应时需带上Access-Control-Allow-Origi头与Origin的值匹配。ie8提供了封装好的XDomainRequest对象，部分实现了该标准；而其它浏览器则提供了XMLHttpRequest（Level 2）对象。
    - cors实例，如下图（options嗅探）：
    - ![cors实例](https://t.alipayobjects.com/images/T1olFfXcpaXXXXXXXX.png)
    - [更多简单使用](http://blog.csdn.net/yuyang7126558/article/details/8229723)

- jsonp跨域：JSONP属于跨域get，其之所以可行是利用了script标签的特性。
    - 实质是script的src里携带向服务器请求的data，返回的data包裹在函数调用里，供数据处理函数使用
    - 只能传4kByte以下的数据？因为ie限制了url的长度为4k ？
- form + iframe(假无刷新)：通过js动态生成不可见表单和iframe，将表单的target设为iframe的name以此通过iframe做post提交。
    - 提交后由于跨域，无法直接读取响应内容。一般的做法是，iframe内通过js改变自身location的fragment，外部则监听iframe的onload事件，读取fragment的内容。
    - iframe的src改变时[事件侦听](http://stackoverflow.com/questions/2429045/iframe-src-change-event-detection)，`<iframe src="zz" onLoad="xx();"></iframe>`
- 设置document.domain，来实现“跨子域”，但有[不好的地方](http://www.cnblogs.com/jkisjk/archive/2013/05/30/change_document_domain.html)
- flash跨域：利用不可见的swf跨域post提交数据，需要部署crossdomain.xml。若用户安装了flash，则以此实现跨域通信。响应数据量较大时优势明显
- [跨域iframe的高度自适应](http://www.cnblogs.com/snandy/p/3900016.html)

### 其他方法
- HTML5 postMessage
- document.domain + iframe的设置
- window.name实现的跨域数据传输
- 利用iframe和location.hash，会导致历史记录的产生，且数据量有限，同时，因为 URL 的内容可视，既不好看也容易泄露信息。
- 用服务端代理？ 虽然算是最“正宗”的完整跨域方案，但太麻烦了点——首先得有代理，如果量大的话，代理的负担会很重，会导致“瓶颈”制约。

### postMessage 跨域详解
> ie8及以上浏览器都支持

#### otherWindow.postMessage(message, targetOrigin);

    otherWindow: 对接收信息页面的window的引用。可以是页面中iframe的contentWindow属性；window.open的返回值；通过name或下标从window.frames取到的值。
    message: 所要发送的数据，string类型。
    targetOrigin: 用于限制otherWindow，“*”表示不作限制

#### 示例：
a.com/index.html中的代码：

    <iframe id="ifr" src="b.com/index.html"></iframe>
    <script>
        var ifr = document.getElementById('ifr');
        var targetOrigin = 'http://b.com';  // 若写成'http://b.com/c/proxy.html'效果一样
                                            // 若写成'http://c.com'就不会执行postMessage了
        ifr.contentWindow.postMessage('I was there!', targetOrigin);
    </script>

b.com/index.html中的代码：

    window.addEventListener('message', function(event){
        // 通过origin属性判断消息来源地址
        if (event.origin == 'http://a.com') {
            alert(event.data);    // 弹出"I was there!"
            alert(event.source);  // 对a.com、index.html中window对象的引用
                                  // 但由于同源策略，这里event.source不可以访问window对象
        }
    }, false);


## WebSocket
传统的Web产品通常使用JSONP或者AJAX这样的方式与服务端通信，但在单页Web应用中，有很大一部分采用WebSocket这样的实时通讯方式。
WebSocket与传统基于HTTP的通信机制相比，有很大的优势。它可以让服务端很便利地使用反向推送，前端只响应确实产生业务数据的事件，
减少一遍又一遍无意义的AJAX轮询。由于WebSocket只在比较先进的浏览器上被支持，有一些库提供了在不同浏览器中的兼容方案，
比如socket.io，它在不支持WebSocket的浏览器上会降级成使用AJAX或JSONP等方式，对业务代码完全透明、兼容。


## [tiny-binary-format](https://github.com/danprince/tiny-binary-format)

Memory efficient JS using binary formats instead of objects.
Just remember that once the data has been serialized, it will always be read back out as numbers.
源自一个游戏引擎，被应用与游戏上。数据一旦被序列化，只能再转回为“数值”类型，不能是字符串或对象类型。

These tiles can be stored in [TypedArrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) 
for further memory efficiency and performance benefits. The size can become as little as ~3% if you fit the format into two bytes, then store it in a [Uint16Array](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array).
数据被存储为TypedArrays后性能得到提升，被存为Uint16Array后、大小是原来的3%左右。

[arraybuffer](http://es6.ruanyifeng.com/#docs/arraybuffer)

[JS中的二进制操作简介](http://jimliu.net/2015/09/26/a-brief-look-at-binary-ops-in-js/)


## [Asm.js](http://developer.51cto.com/art/201401/428154_all.htm)

[简单介绍](http://www.iteye.com/news/27306)、[介绍](https://software.intel.com/zh-cn/articles/html5-asmjs)

目前一般的Asm.js应用都是从C/C++编译到Javascript的，很显然它们都不会与DOM进行任何交互，而是直接与WebGL打交道。

Asm.js只能处理被挑出的几种不同的数值类型，而没有提供其他的数据类型（包括字符串，布尔型和对象）。
这么做以后，结果就是高度优化，并且可以直接从Asm.js语法转换成汇编，而不必像常常要对Javascript做的那样解释它。
它有效地削减了使像Javascript之类的的动态语言缓慢的东西：例如需要垃圾收集器和动态类型。

现在几乎所有基于Asm.js的应用都是C/C++应用使用Emscripten编译的。
可以肯定的说，在不久的将来，这类即将运行在 Asm.js的应用，将会从可以在浏览器中运行这一可移植性中获益，
但是在支持javascript方面有一定复杂度的应用将不可行。

既然asm.js的确扩展了web的基础，潜在的用户群很广。其中一批用户就是那些想得到尽可能多的运算能力的游戏开发者。

现在Asm.js还不能进行与有关DOM和浏览器的操作。创建一个Emscripten到Ams.js版本的DOM（就像DOM.js）如何？
创建DOM.js一个动机就是想要看一下纯JS实现的DOM能否击败传统、低效的出入队列式的、跨堆栈的JS堆与相关C++ DOM对象之间的内存管理方法。
有了asm.js的支持，DOM.js也许可以在性能上胜过那些高度优化过的数据结构。


## [simd-js](http://www.2ality.com/2013/12/simd-js.html)

[中文介绍](http://www.oschina.net/translate/introducing-simd-js)、
[介绍](http://chinese.vr-zone.com/117601/javascript-boost-intel-google-mozilla-bring-simd-to-javascript-13062014/)

SIMD 是单指令多数据(Single Instruction Multiple Data)的缩写, 
意思是一次对多条数据进行操作. 比如, 一条 SIMD 加法指令能同时对多条数据进行加法运算.
SIMD 这种能提高运算速度的技术, 在图形处理, 音频处理, 编码, 物理仿真, 加密等领域中得到广泛应用。

目前Intel 已经提出一些低阶API 可以在JavaScript 直接对SIMD 作Programming，
可以透过JavaScript JIT compiler 直接编译，或是透过Mozilla Emscripten 编译器这类透过LLVM 将C++ 转译成JavaScript 的工具来产生SIMD 代码。
SIMD.JS 也同样具有架构中立性，在ARM 或是x86 这样不同但都支援SIMD 的平台都能进行支援。

