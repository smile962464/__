
## util & tools

- [js-repaint-perfs](http://leeluolee.github.io/js-repaint-perfs/#)
- [validator.js](https://github.com/chriso/validator.js)、 [URI.js](https://github.com/medialize/URI.js/)
- [bounce.js](https://github.com/tictail/bounce.js): Create beautiful CSS3 powered animations in no time.
- [codemirror](http://codemirror.net/)，CodeMirror 是一款“Online Source Editor”，实时在线代码高亮显示。[示例](http://codemirror.net/demo/preview.html)
- [nico-静态网站生成器](https://github.com/lepture/nico)
- [hammerjs](https://github.com/hammerjs/hammer.js)
- [CSS与界面动效](http://www.imooc.com/video/6041)、[headroom.js](http://wicky.nillia.ms/headroom.js/)


## component
https://github.com/STRML/react-grid-layout

- [front-end-application-frameworks-component-architectures](http://developer.telerik.com/featured/front-end-application-frameworks-component-architectures/)
- [一个对前端模板技术的全面总结](http://www.html-js.com/article/2313)
- [The State of the Componentised Web](http://www.futureinsights.com/home/the-state-of-the-componentised-web.html)
- [Web Components - building blocks of the future web](https://www.infinum.co/the-capsized-eight/articles/web-components-building-blocks-of-the-future-web)
- [开源前端框架纵横谈](http://www.csdn.net/article/2013-04-15/2814893)


## ui库 & design
- 国内：[fineui](http://fineui.com/)、[amazeui](http://amazeui.org/)、[miniui](http://www.miniui.com/)
- [jQueryUI  VS  Kendo UI](http://jqueryuivskendoui.com/)
- [wijmo angular](http://wijmo.com/angularjs-components-preview/)、[webix](http://webix.com/)
- [semantic-ui](http://semantic-ui.com/)、 [Flat-UI](http://designmodo.github.io/Flat-UI/)
、 [html5-boilerplate](https://github.com/h5bp/html5-boilerplate)
- [amcharts](http://www.amcharts.com/demos/)
- [Javascript-WYSIWYG-editors](https://github.com/cheeaun/mooeditable/wiki/Javascript-WYSIWYG-editors)

- [materialpalette](http://www.materialpalette.com/)
- [bootstrap-material-design](http://fezvrasta.github.io/bootstrap-material-design/bootstrap-elements.html)


## 函数式编程

http://blog.h5jun.com/post/functional-how-far.html

- [函数式编程](http://coolshell.cn/articles/10822.html)
- [函数式编程有哪些优点？](http://www.nowamagic.net/academy/detail/1220540)
- [函数式编程扫盲篇](http://www.cnblogs.com/kym/archive/2011/03/07/1976519.html)
- [函数式编程初探](http://www.ruanyifeng.com/blog/2012/04/functional_programming.html)
- [introduction-functional-javascript](http://www.sitepoint.com/introduction-functional-javascript/)
- [Functional Programming in Javascript === Garbage](http://awardwinningfjords.com/2014/04/21/functional-programming-in-javascript-equals-garbage.html)
    - javascript不适合函数式编程？

对象是面向对象的第一型，那么函数式编程也是一样，函数是函数式编程的第一型。

在纯粹函数式程式语言中，你不是像命令式语言那样命令电脑「要做什么」，而是通过用函数来描述出问题「是什么」。递回在 Haskell 中非常重要。命令式语言要求你提供求解的步骤，Haskell 则倾向于让你提供问题的描述。这便是 Haskell 没有 while 或 for 循环的原因，递回是我们的替代方案。

在面向对象编程中，我们把对象传来传去，那在函数式编程中，我们要做的是把函数传来传去，而这个，说成术语，我们把他叫做 **高阶函数**

在函数式编程中，函数是基本单位，是第一型，他几乎被用作一切，包括最简单的计算，甚至连变量都被计算所取代。在函数式编程中，变量只是一个名称，而不是一个存储单元，这是函数式编程与传统的命令式编程最典型的不同之处。


## Persistent data structure

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


## other
智能：[brain](https://github.com/harthur/brain)、[convnetjs](https://github.com/karpathy/convnetjs)、[synaptic](https://github.com/cazala/synaptic)

[tiny-binary-format](https://github.com/danprince/tiny-binary-format)
------
Memory efficient JS using binary formats instead of objects.
Just remember that once the data has been serialized, it will always be read back out as numbers.
源自一个游戏引擎，被应用与游戏上。数据一旦被序列化，只能再转回为“数值”类型，不能是字符串或对象类型。

These tiles can be stored in [TypedArrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) for further memory efficiency and performance benefits. The size can become as little as ~3% if you fit the format into two bytes, then store it in a [Uint16Array](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array).
数据被存储为TypedArrays后性能得到提升，被存为Uint16Array后、大小是原来的3%左右。

[arraybuffer](http://es6.ruanyifeng.com/#docs/arraybuffer)

[JS中的二进制操作简介](http://jimliu.net/2015/09/26/a-brief-look-at-binary-ops-in-js/)


[Asm.js](http://developer.51cto.com/art/201401/428154_all.htm)
------
[简单介绍](http://www.iteye.com/news/27306)、[介绍](https://software.intel.com/zh-cn/articles/html5-asmjs)

目前一般的Asm.js应用都是从C/C++编译到Javascript的，很显然它们都不会与DOM进行任何交互，而是直接与WebGL打交道。

Asm.js只能处理被挑出的几种不同的数值类型，而没有提供其他的数据类型（包括字符串，布尔型和对象）。这么做以后，结果就是高度优化，并且可以直接从Asm.js语法转换成汇编，而不必像常常要对Javascript做的那样解释它。它有效地削减了使像Javascript之类的的动态语言缓慢的东西：例如需要垃圾收集器和动态类型。

现在几乎所有基于Asm.js的应用都是C/C++应用使用Emscripten编译的。可以肯定的说，在不久的将来，这类即将运行在 Asm.js的应用，将会从可以在浏览器中运行这一可移植性中获益，但是在支持javascript方面有一定复杂度的应用将不可行。

既然asm.js的确扩展了web的基础，潜在的用户群很广。其中一批用户就是那些想得到尽可能多的运算能力的游戏开发者。

现在Asm.js还不能进行与有关DOM和浏览器的操作。创建一个Emscripten到Ams.js版本的DOM（就像DOM.js）如何？创建DOM.js一个动机就是想要看一下纯JS实现的DOM能否击败传统、低效的出入队列式的、跨堆栈的JS堆与相关C++ DOM对象之间的内存管理方法。有了asm.js的支持，DOM.js也许可以在性能上胜过那些高度优化过的数据结构。



[simd-js](http://www.2ality.com/2013/12/simd-js.html)
------
[中文介绍](http://www.oschina.net/translate/introducing-simd-js)、[介绍](http://chinese.vr-zone.com/117601/javascript-boost-intel-google-mozilla-bring-simd-to-javascript-13062014/)

SIMD 是单指令多数据(Single Instruction Multiple Data)的缩写 , 意思是一次对多条数据进行操作. 比如, 一条 SIMD 加法指令能同时对多条数据进行加法运算. SIMD 这种能提高运算速度的技术, 在图形处理, 音频处理, 编码, 物理仿真, 加密等领域中得到广泛应用。

目前Intel 已经提出一些低阶API 可以在JavaScript 直接对SIMD 作Programming，可以透过JavaScript JIT compiler 直接编译，或是透过Mozilla Emscripten 编译器这类透过LLVM 将C++ 转译成JavaScript 的工具来产生SIMD 代码。SIMD.JS 也同样具有架构中立性，在ARM 或是x86 这样不同但都支援SIMD 的平台都能进行支援。
