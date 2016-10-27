# react native

### 组件
ScrollView 只能在横向或纵向两者之一进行滚动：https://github.com/facebook/react-native/issues/2962

### Simulator
- command+v command+shift+v 粘贴
- shift+command+H twice to simulate the double tap of home button
- command + 3 缩小到50%大小

安装本地程序：xcrun simctl install booted ~/Downloads/AlipayWallet.app

### 性能：
Image decoding can take more than a frame-worth of time. 
This is one of the major source of frame drops on the web because decoding is done in the main thread. 
In React Native, image decoding is done in a different thread.

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
