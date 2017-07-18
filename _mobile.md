
# native 

Safari 由 WebKit 和 JavaScriptCore 组成。
WebKit是个渲染引擎，简单来说负责页面的布局，绘制以及层的合成，
javascript 引擎是 JavaScriptCore (JSC) 它包括了2部分：解释器和简单方法JIT, 解释器即解释执行 js 文件；
JIT在java虚拟机中应用比较多，针对执行较多次的热点方法进行编译为本地方法，执行效率更高，JSC中的JIT同理。

iOS 或 android 上能够运行的JavaScript 引擎有4个： JavaScriptCore, SpiderMonkey, V8 and Rhino. 支持程度见表：

|      | iOS      |    Android | 
| ---- | :-------- | --------:|
| JavaScriptCore | Interpreter only  |  Interpreter and JIT |
| SpiderMonkey  |  Interpreter only  |  Interpreter and JIT |
| V8  |  JIT only for jailbroken devices  |  JIT |
| Rhino  |  Unsupported  |  Interpreter |

Chrome for iOS 使用 UIWebView 由于 UIWebView 的能力限制，它只能使用移动版 Safari 的渲染层，JavaScriptCore(without JIT)（而不是V8）和单进程模式。
Android Browser 使用 V8. 

### iOS
添加 APP 图标时，2x 3x 的图标大小「不能一样」，否则会一直报错：The app icon set named “AppIcon” did not have any applicable content


# hybrid app 

[Apache Cordova - 前身是 PhoneGap](https://cordova.apache.org/) 是移动 hybrid 开发方式先驱，
其他公司内部部署的 bridge 等，大都效仿于它。

# react native
[介绍](https://www.youtube.com/watch?v=KVZ-P-ZI6W4)、[深入介绍](https://www.youtube.com/watch?v=7rDsRXj9-cU)

Image decoding can take more than a frame-worth of time. 
This is one of the major source of frame drops on the web because decoding is done in the main thread. 
In React Native, image decoding is done in a different thread.


# H5

[在做 iOS 和 Android 的 HTML5 开发时，你都掉到过哪些坑里？](https://www.zhihu.com/question/34556725)

### 环境/调试

开启 Charles 代理，需要把其他代理软件关掉、像 ShadowSocks 要关掉、浏览器也不能有代理插件如 switchyomega 开着.
https://github.com/ant-design/ant-design-mobile/issues/614

```sh
# [Weinre](https://people.apache.org/~pmuellr/weinre/docs/latest/Home.html)
npm install -g weinre

ipconfig getifaddr en0  # 获取本机 IP 地址
weinre --boundHost IP  # 执行后、打开地址 IP:8080
在要调试的页面插入 Target Script ，电脑打开 debug client user interface 地址、即可看到要调试的页面。

# [jsconsole](https://jsconsole.com/)
# 如果页面 JS 报错，一般情况下也能在 JSConsole 中进行定位。
```

### 兼容性问题

```html
<label><input type="checkbox" />点击我 input 能被选中</label>
<label><input type="checkbox" /><span>点击我 input 不能被选中，因为有 span 包括</span></label>
此问题出现在包括 iOS 10 在内的大多数手机系统里；另外部分手机会出现点击选中延迟感严重的问题
```

### scroll 事件问题
- ios上scroll事件，只在scroll结束时触发（ios < 8），安卓会一直触发。
- iOS < 8 pauses painting during scrolling.
- 滚动过程中要「fixed标题栏」，在惯性滚动过程中不会触发scroll事件。
- [iOS 与 惯性滚动](https://fe.ele.me/momentum-scrolling-on-ios/)

iScroll：并没有监听`onscroll`事件。

### Touch事件穿透问题 (Ghost Clicks)
click事件在手机浏览器中的触发顺序：touchstart -> touchmove -> touchend -> click

浏览器在 touchend 之后会等待约 300ms 判断用户不是双击（double tap）行为，则触发 click 事件。
通过设置 meta 标签，禁止页面缩放，新浏览器不再需要等待 300ms（ref: https://webkit.org/blog/5610/more-responsive-tapping-on-ios/）。

如果绑定 touch 事件的 dom 元素在被点击触发后会隐藏、css3 transform移走、requestAnimationFrame移走等，
而“隐藏、移走”后，它底下同一位置正好有一个 dom 元素绑定了 click 事件、
或者有浏览器认为可以被点击有交互反应的dom元素（如 input 被点击有交互反应是获得焦点并弹起虚拟键盘），
则会出现“点透”现象。

touch事件在手机浏览器中的穿透问题，并不是由冒泡引起的，而是由于click事件延迟触发导致，
所以通过阻止事件冒泡的方式解决穿透问题是不可行的。（iOS 系统通过在 touchend 事件里设置`e.preventDefault()`
阻止浏览器默认事件可以解决，Android 不可行）

最好使用 Fastclick 处理 click 事件，能同时解决 300ms 延迟和点击穿透问题（[Fastclick如何解决穿透事件](http://www.cnblogs.com/yexiaochai/p/3442220.html)）。

> Fastclick 通过在 touchend 触发时，自己创建一个 click 事件并手动触发，替代了用户的 click 事件。


### Touch 事件兼容问题
- 在 Android 上 Touchmove 只触发一次，解决：阻止默认事件，在start或move时，执行一次 e.preventDefault() 
- 在 Android 上 页面滚动时，PageX/Y 并不包含滚动，需附加 scrollLeft/Top 修正
- 在 Android 上 在 a 标签上，move后不触发 touchend 事件，a 标签的 href 属性从`javascript:void(0)`改为`javascript:;`


### 屏幕尺寸
[「像素」「渲染像素」以及「物理像素」](http://www.zhihu.com/question/27261444/answer/35898885)
[rem 产生的小数像素问题](http://taobaofed.org/blog/2015/11/04/mobile-rem-problem/)

> mm(毫米)=?px(像素) : 两者没有转换关系，一个是绝对量，一个是相对量。比如15吋的显示器，你可以设置成 1024*768 像素，也可以设置成 1280*960 像素，可以有很多种。
> 像素就是CCD/CMOS上光电感应元件的数量，也即把影像放大数倍看到的小方点。作为图像的一种尺寸，只存在于电脑中，如同RGB色彩模式一样只存在于电脑中。
> 像素是相对于显示器“屏幕分辨率”而言的，譬如，WONDOWS的用户所使用的分辨率一般是96像素/英寸。而MAC的用户所使用的分辨率一般是72像素/英寸。
> 屏幕分辨率是指屏幕显示的分辨率，显示分辨率就是屏幕上显示的像素个数，分辨率160×128的意思是水平方向含有像素数为160个，垂直方向像素数128个。屏幕尺寸一样的情况下，分辨率越高，显示效果就越精细和细腻。
> 显示器出厂时一般不标出表征显示器分辨率的 DPI 值，只给出点距，我们根据公式即可算出显示器的分辨率。
> 影像分辨率单位 PPI(Pixel per Inch)，打印(打印机输出)分辨率单位是 DPI(dot per inch). 人眼能分辨出的最大分辨率是300dpi，超过这个分辨率，人的眼睛是无法看出差别的，也就是说300dpi和600dpi在人眼看来是没有差别的，所以现在的冲印设备最大的设计输出分辨率，就是300dpi。

```js
console.log(window.devicePixelRatio) // devicePixelRatio
console.log(window.innerWidth) // device-width
console.log(document.documentElement.clientWidth) // viewport width
console.log(Math.sqrt(Math.pow(640, 2) + Math.pow(960, 2)) / 3.5) // iphone 4 ppi
```
物理像素 / 设备像素 = devicePixelRatio . retina 屏 = 2 (1px = 2 物理像素) 6plus = 3

- iPhone 4/4s : 屏宽320. (物理像素 640 * 960. 2x. 对角线 3.5-inch. PPI 326)
- iPhone 5/5s/5c : 屏宽320. (物理像素 640 * 1136. 2x. 对角线 4-inch)
- iPhone 6/6s/7 : 标准模式屏宽375，放大模式屏宽320. (物理像素 750 * 1334. 2x. 对角线 4.7-inch. PPI 326)
- iPhone 6/6s/7 Plus : 标准模式屏宽414，放大模式屏宽375. (物理像素 1080 * 1920. 3x. 对角线 5.5-inch. PPI 401)

大部分移动设备默认的 viewport 都是 980px (layout viewport) 大于可视宽度(visual viewport)，多数情况下要大于 device-width(即ideal viewport width理想宽度) ,我们一般都要在移动端重置 viewport，让`width=device-width`, 使 layout viewport 变成理想宽度，这样可以做到按页面宽度 100% 充满屏幕，水平不出现滚动条.

设计师按宽度750px（iPhone 6）做设计稿. 375pt下的设计效果适配到414pt和320pt偏差不会太大。假设以414pt为基准做出很优雅的设计，到320pt可能元素之间比例就不是那么回事了，比如图片和文字之间视觉比例可能失调。

使用 rem 的好处：
rem 是一个相对单位，能方便地根据设备的不同分辨率设置 html 的 font-size 来改变使用 rem 的元素的尺寸。
而 px 是绝对单位，不管 html 的 font-size 是多少，它都显示为绝对的大小、不会改变。

Android 上小于 1px 的边线会被显示为 0px ，iOS8 之后支持 0.5px 宽度。

边线不显示问题：
如果设置 html 的 `font-size=100px` 作为 rem base 值， 则`1px == 0.01rem`，
而 0.01rem 宽度的边线、在某些低版本 Android 上以及 pc chrome 手机模拟情况下，
会出现不显示问题(实际计算出的宽度小于 1px)，所以，在代码里把 1px 改写成 1PX ，
如果使用 postcss-pxtorem 工具来把 px 转为 rem，1PX 的写法能避免被转为 0.01rem ，
并且 1PX 是能正常被浏览器渲染的(不区分大小写)。


## 其他

页面横向能拖动问题：注意哪里设置了 width 之和为 100% ，但没设置`box-sizing: border-box;`

```css
/* transform闪动问题：*/
-webkit-backface-visibility : hidden;
-webkit-transform-style : preserve-3d;
-webkit-transform : translate3d(0,0,0)；
```
