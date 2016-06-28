

### scroll 事件问题
- ios上scroll事件，只在scroll结束时触发（ios < 8），安卓会一直触发。
- iOS < 8 pauses painting during scrolling.
- 滚动过程中要「fixed标题栏」，在惯性滚动过程中不会触发scroll事件。
- [iOS 与 惯性滚动](https://fe.ele.me/momentum-scrolling-on-ios/)

iScroll：并没有监听`onscroll`事件。



### Touch事件穿透问题研究
click事件在手机浏览器中的触发顺序：touchstart -> touchmove -> touchend -> click

touch事件在手机浏览器中的穿透问题，并不是由冒泡引起的，而是由于click事件延迟触发导致，所以通过阻止事件冒泡的方式解决穿透问题是不可行的。我们在使用touch事件时，需要注意，如果绑定touch事件的dom元素在被点击触发后会隐藏、css3 transfer移走、requestAnimationFrame移走等，而“隐藏、移走”后，它底下同一位置正好有一个dom元素绑定了click的事件、或者有浏览器认为可以被点击有交互反应的dom元素（举例：如input type=text被点击有交互反应是获得焦点并弹起虚拟键盘），则会出现“点透”现象。

通过设置e.preventDefault()，阻止浏览器默认事件可以解决。对于浮层，可以用绑定click事件。使用Fastclick处理click事件（[Fastclick如何解决穿透事件](http://www.cnblogs.com/yexiaochai/p/3442220.html)）。


## 其他

- transform闪动问题：

    -webkit-backface-visibility : hidden;
    -webkit-transform-style : preserve-3d;
    -webkit-transform : translate3d(0,0,0)；
