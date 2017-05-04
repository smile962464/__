

node module version example:  
`1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0`

```sh
npm help install  # 地址：https://docs.npmjs.com/cli/install

npm install tnpm -g --registry="http://registry.npm.alibaba-inc.com"

npm init [-f]  # 用 -f 不弹出选项框、直接生成默认文件
npm install / i <pkg> [-g | -S|--save| -D|--save-dev ]
npm uninstall / rm <pkg> [-g | -S|--save| -D|--save-dev ]

npm view <pkg> version(s)  # 查看模块的版本
npm ls [-g]  # 查看当前安装模块的版本

npm repo / bugs / docs [<pkgname>]  # 浏览器自动打开提交 repo / bug / docs 的地址
npm bin [-g]  # 可执行文件位置
npm root/prefix [-g]  # 全局安装包位置
ls `npm root -g`  # 列出全局安装的模块列表

npm owner add <user> [<@scope>/]<pkg>
npm owner ls [<@scope>/]<pkg>
npm outdated  # 包是否过时
npm cache clean [<pkgname>]

npm dist-tag ls [<pkg>]  # 查看 pkg 的发布版本
npm dist-tag add <pkg>@<version>  # 指定某个版本作为 dist 版本，默认安装

npm link
cd ~/projects/proj1  # go into the dir of your main project
npm link ../proj2     # link the dir of your dependency

# 设置process变量
export NODE_ENV="PRODUCTION"

node hello.js &  # 后台运行程序
ps -ef | grep node  # 找到进程对应的ID
kill 3747(进程id)  # 杀掉后台进程

# 自动安装某npm包的shell命令：
node -e "$(curl -fsSL https://a.alipayobjects.com/u/localhost/js/201406/2u6LQfOLhF.js)"
```

peerDependencies: 
[npm2-npm3](https://codingwithspike.wordpress.com/2016/01/21/dealing-with-the-deprecation-of-peerdependencies-in-npm-3/)

### nvm管理多个node版本
- 手动安装：`git clone git@gitlab.alibaba-inc.com:node/nvm.git ~/.nvm`
- 然后：`cd ~/.nvm`、`source nvm.sh`、`nvm ls`、`nvm install 0.11.12`

### node 适合场景：
- 创业公司很合适，尤其当创始人之一是熟悉前端的同学的话，用Node实现Web系统很合适。
- 重页面交互、轻业务逻辑的系统也适合Node来开发。

### 调试
- [colors](https://github.com/marak/colors.js/) (对比 [debug](https://github.com/visionmedia/debug))
- `node server.js > mylog.log`
- `node server.js > mylog.log 2> error.log`

### 原理
In order to max out a multi-core server, people often start multiple node.js instances on a single server. That will work fine, but the node.js instances will be independent, and sharing data between them is not possible in plain JavaScript.

And because a node.js instance is single-threaded, it is also important that code written for node.js is non-blocking. Code that blocks while waiting for some I/O operation would block the only available CPU. Using non-blocking I/O operations allows node.js to queue the operation, and execute other code in the meantime, allowing overall progress. This also makes it look like it would be executing multiple actions in parallel, while it is actually executing them sequentially.

### module.exports 和 exports

```js
exports.beep = function (n) { return n }
exports.boop = 555
module.exports.beep = function (n) { return n }
module.exports.boop = 555

// 只导出一个函数或对象
module.exports = function (n) { return n * 1000 }
module.exports = { a: 1, b: 2 }
// 不能这么写，原因见原理
exports = xxx

// 原理： how modules work in the background:
var module = {
  exports: {}
};
(function(module, exports) {
  // 错误、不工作。因为 exports 只是个初始时指向 module.exports 对象的变量，给它设置新值后它就指向了新地方，
  // 而并没有改变 module.exports 这个初始时指向的对象。
  exports = function (n) { return n * 1000 };
}(module, module.exports));
console.log(module.exports); // it's still an empty object 
```

### REPL
> repl是read-eval-print-loop，能像Chrome控制台一样运行js语句。命令行输入 node 就运行了repl。

- 输入：fs = require('fs')，global 等可查看内部对象结构
- 可换行输入多行语句，可复制粘贴，支持上下方向键、tab键自动补全
- 支持保存为文件等其他命令

## node核心库

- node全局对象：global、process、buffer等
- socket 和 stream 模块
- EventEmitter 对象及事件
- [The Basics of Node.js Streams](http://www.sitepoint.com/basics-node-js-streams/)

在网络体系结构中，TCP是运输层而HTTP是应用层。当创建一个HTTP服务器时，我们实际上已经从`net.Server`模块继承了很多功能，而`net.Server`则实现了对Tcp的封装。  
HTTP增加了技术复杂性，是因为它需要支持「分块传输编码」。分块传输编码可以在响应数据未完全生成时进行数据传输，此时还无法确定响应信息的具体大小。如果分块中所包含信息的长度为0，则表示响应信息的结束。

## 控制流、异步模式
- 使用 async.js 模块，使用 generator yield 解决 callback hell 问题
- [co](https://github.com/tj/co) / [co 常见使用场景](https://cnodejs.org/topic/53d230358ed6f4002b3a89e7)

## 代理（proxy）
代理是一种路由请求方式，将不同源的请求通过同一个服务器处理，原因可能有很多：缓存、安全，甚至是故意模糊请求的来源。有转发代理、反向代理等。

反向代理用于控制请求如何被发送到服务器，例如现在有五个服务器，但有四个不希望有用户直接访问。因而将所有的请求转发到第五个服务器，然后再代理给其他服务器。反向代理也被用于平衡负载和通过缓存请求改进系统的整体表现。

在node中，最受欢迎的代理模块为 http-proxy。

## 框架与MVC
有两个node框架比较出色：Express（使用REST风格）和 Geddy（基于MVC），前者更像Sinatra一些，后者更像是Rails。

REST表示表述性状态转移（Representational State Transfer）。RESTful是一个术语，用来描述任何符合HTTP和REST原则的Web应用程序，这些原则包括：目录结构式的URL地址，无状态，数据被包装为某种互联网媒体类型后传送（如JSON），以及HTTP方法的使用（GET，POST，DELETE，PUT）。（但目前的form method不支持DELETE和PUT，使用`<input type="hidden" value="delete/put" name="_method" />`隐藏域来指定delete或put操作）

### 一般的应用程序 转换为 MVC应用程序：
MVC是一个流行的软件架构。可以从Ruby on Rails获得许多有关MVC的基本设计原则，将其引入并支持node的MVC设计。Express已经采用了路由的概念（Rails的基本原则），还需要分离的模型：视图和控制器。接下来，创建controllers、model、views目录等，将现有的每个路由的方法调用转换为单独的函数然后导出，等操作。MVC架构使得代码看起来干净又简单，并且扩展性更好。

## 数据与数据库
说到数据时，会想到关系型数据库及NoSql数据库，在NoSql分类中，有一种基于键值对（key/value pairs）的结构化数据类型，它通常被存储在内存中以支持快速访问。三种最流行的基于内存键值对的存储系统是：Memcached，Cassandra和Redis。

QPS、RT、CPU 性能监控

### what is #!/usr/bin/env node?

It's the unix way to say what interpreter a script should run with: "/usr/bin/env" looks up its next argument in the path and runs it -- so it works whether or not node is in /usr/local/bin or /usr/bin or some obscure place that's in the path, rather than directly hard-coding the path to node, which presumably varies more than the path to env.

So #! to signal interpreter, path to /usr/bin/env because unix demands a full path, then node which is the real interpreter to run.

When you shebang (#!) /usr/bin/env node, you are saying "look for a program called node on my PATH". If doing node -v works, as @Ryan says, the shebang should work fine. Any chance you have a shell alias or shell function named node? That could be giving you the illusion that your PATH is correct even when it is not. But essentially, just make sure the directory where the node binary lives (the bin directory under your node install) is on your PATH environment variable, and things really should work at that point.

