
# misc

- [pwabuilder](http://www.pwabuilder.com/)

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
- Mobile 设计、UI 库：
- https://www.google.com/design/spec/material-design/introduction.html 、 https://github.com/google/material-design-lite
- https://github.com/weui/weui  、 http://weui.github.io/weui/
- http://ionicframework.com/ 、 http://framework7.io/ 、 http://goratchet.com/

- [微软 Edge 浏览器特性 demo](https://github.com/MicrosoftEdge/Demos)


# 性能

- [WebView性能、体验分析与优化](http://tech.meituan.com/WebViewPerf.html)
- [WePY 在小程序性能调优上做出的探究](https://www.madcoder.cn/wepy-performance-research.html)

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
- [js-repaint-perfs](http://mathieuancelin.github.io/js-repaint-perfs/)

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

It’s never a good idea to mix values of different types (e.g. numbers, strings, undefined or true/false) in the same array (i.e. `var arr = [1, “1”, undefined, true, “true”]`)

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
- [es-modules 详解](https://jakearchibald.com/2017/es-modules-in-browsers/)

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

- 页面有使用`window.opener.xx()`之类、因为opener可以为任何域，所以存在`跨域`错误。利用`try..catch`捕获

- call 比 apply 性能好！[参考](http://jsperf.com/apply-vs-call-vs-invoke)。（angular1.0.6：2848行；backbone1.0.0：200行）
- js对象引用操作dom对象后，需要设置为null或delete掉，避免内存泄露

- `eval()`、`window.eval`、`new Function` 第一个不会被GC回收，后两个可以被GC回收。每次使用他们时都会调用脚本引擎将源代码转换成可执行代码；因此尽量避免使用。

- 不声明中间变量的值交换: `var a=1,b=2;a=[b,b=a][0];`
- `console.count('被执行的次数：')`

- [DOM的attribute和property](http://www.noahlu.com/blog/javascript-note/dom-attribute-property/)

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

All elements that are `position: absolute;` are automatically treated as `display: block`, 
since that's the only logical display mode for absolute positioning.

less 语法：Parent Selectors & ; Loops.

- [html5和css3动画排列人物头像演示](http://www.w2bc.com/Article/11916)
- [Scalable and Modular Architecture for CSS](http://smacss.com/book/)
- [Google HTML/CSS Style Guide](http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml)
- [css3generator](http://css3generator.com/)
- [综合](http://demo.doyoe.com/#inline-block-space)：Web前端实验室用于存放CSS探索之旅的实验和测试用例(Demos and Examples)
- [media type与media query](http://www.qianduan.net/media-type-and-media-query.html)
- [CSS Compatibility and IE](https://msdn.microsoft.com/library/cc351024(VS.85).aspx)

### 基于 bootstrap 的可视化页面搭建
- [Form Builder for Bootstrap](http://bootsnipp.com/forms)
- [layoutit](http://www.layoutit.com/build) / [中文](http://layoutit.justjavac.com/) 

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



## 前端 MVC
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

```js
// 如下：注意 $.param 的使用
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

FormData 配合 xhr2 能很方便的处理form表单！[介绍](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Using_FormData_Objects)，


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

```js
$.ajaxSetup({
  headers: { "X-CSRFToken": getCookie("csrftoken") }
});
// 注意：可能需要对Cookie做 encodeURIComponent 处理
```

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

```html
<iframe id="ifr" src="b.com/index.html"></iframe>
<script>
    var ifr = document.getElementById('ifr');
    var targetOrigin = 'http://b.com';  // 若写成'http://b.com/c/proxy.html'效果一样
                                        // 若写成'http://c.com'就不会执行postMessage了
    ifr.contentWindow.postMessage('I was there!', targetOrigin);
</script>
```

b.com/index.html中的代码：

```js
window.addEventListener('message', function(event){
    // 通过origin属性判断消息来源地址
    if (event.origin == 'http://a.com') {
        alert(event.data);    // 弹出"I was there!"
        alert(event.source);  // 对a.com、index.html中window对象的引用
                              // 但由于同源策略，这里event.source不可以访问window对象
    }
}, false);
```

