

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


### 屏幕尺寸
[「像素」「渲染像素」以及「物理像素」](http://www.zhihu.com/question/27261444/answer/35898885)
[rem 产生的小数像素问题](http://taobaofed.org/blog/2015/11/04/mobile-rem-problem/)

物理像素 / 设备像素 = devicePixelRatio . retina 屏 = 2 (1px = 2 物理像素) 6plus = 3

    console.log(window.devicePixelRatio) // devicePixelRatio
    console.log(window.innerWidth) // device-width
    console.log(document.documentElement.clientWidth) // viewport width
    console.log(Math.sqrt(Math.pow(640, 2) + Math.pow(960, 2)) / 3.5) // iphone 4 ppi

- iPhone 4/4s : 屏宽320. (物理像素 640 * 960. 2x. 对角线 3.5-inch. PPI 326)
- iPhone 5/5s/5c : 屏宽320. (物理像素 640 * 1136. 2x. 对角线 4-inch)
- iPhone 6/6s : 标准模式屏宽375，放大模式屏宽320. (物理像素 750 * 1334. 2x. 对角线 4.7-inch)
- iPhone6/6s Plus : 标准模式屏宽414，放大模式屏宽375. (物理像素 1080 * 1920. 3x. 对角线 5.5-inch)

大部分移动设备默认的 viewport 都是980px，多数情况下要大于 device-width , 我们一般都要在移动端重置 viewport，让width=device-width , 这样可以做到按页面宽度100%充满屏幕，水平不出现滚动条.

设计师按宽度750px（iPhone 6）做设计稿. 375pt下的设计效果适配到414pt和320pt偏差不会太大。假设以414pt为基准做出很优雅的设计，到320pt可能元素之间比例就不是那么回事了，比如图片和文字之间视觉比例可能失调。

## 其他

- transform闪动问题：

    -webkit-backface-visibility : hidden;
    -webkit-transform-style : preserve-3d;
    -webkit-transform : translate3d(0,0,0)；

## 环境
开启 Charles 代理，需要把其他代理软件关掉、像 ShadowSocks 要关掉、浏览器也不能有代理插件如 switchyomega 开着.

### Simulator
- command+v command+shift+v 粘贴
- shift+command+H twice to simulate the double tap of home button
- command + 3 缩小到50%大小
