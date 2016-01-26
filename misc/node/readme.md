# node

### 各种

    设置process变量：export NODE_ENV="PRODUCTION"

    自动安装某npm包的shell命令：
    node -e "$(curl -fsSL https://a.alipayobjects.com/u/localhost/js/201406/2u6LQfOLhF.js)"

    后台运行程序：node hello.js &
    需关闭时，通过 ps-ef 命令找到进程对应的ID，使用kill命令手动关闭该进程，如：
    ps -ef | grep node
    kill 3747(进程id)

### nvm管理多个node版本
- 手动安装：`git clone git@gitlab.alibaba-inc.com:node/nvm.git ~/.nvm`
- 然后：`cd ~/.nvm`、`source nvm.sh`、`nvm ls`、`nvm install 0.11.12`

## 调试
- [colors](https://github.com/marak/colors.js/) (对比 [debug](https://github.com/visionmedia/debug))
- `node server.js > mylog.log`
- `node server.js > mylog.log 2> error.log`

## 包
- [自动重启工具对比](https://strongloop.com/strongblog/comparison-tools-to-automate-restarting-node-js-server-after-code-changes-forever-nodemon-nodesupervisor-nodedev/)
- [http-server](https://www.npmjs.com/package/http-server)
- [wrench.js](https://github.com/ryanmcgrath/wrench-js/blob/master/lib/wrench.js)：A collection of various utility functions
- [init-skeleton](https://www.npmjs.com/package/init-skeleton)
- [fs-extra](https://www.npmjs.com/package/fs-extra)
- [commander.js](https://github.com/tj/commander.js)
- [nightwatchjs](http://nightwatchjs.org/)
- [cheerio](https://github.com/cheeriojs/cheerio)

## 资料
- [Node.js专业中文社区](https://cnodejs.org/)
- [node.js中文资料导航](https://github.com/youyudehexie/node123)
- [Node入门](http://www.nodebeginner.org/index-zh-cn.html)
- [Node.js 阿里手册](http://node.alibaba-inc.com/env/README.html)
- [阿里 node 手册](http://www.atatech.org/article/detail/13675/37)
- [PayPal从Java切换到JavaScript](http://www.infoq.com/cn/news/2013/12/paypal-java-javascript)



下面这些情况下Node很有用武之地：

创业公司很合适，尤其当创始人之一是熟悉前端的同学的话，用Node实现Web系统很合适，Node和PHP一样具备快速发布的优势，代码copy上去就生效，甚至不需要重启服务器，这一点相比Java有很大的优势。当业务逻辑还没有非常复杂时，JavaScript语言的弱点也没有暴露的那么明显，从系统的维护角度来说，不需要一个工作有两个角色的工程师完成，可以提升开发效率。

重页面交互轻业务逻辑的系统也适合Node来开发，说白了如果Web系统如有一半以上的 工作量都是需要前端同学来完成的话，那还不如把整个系统都交给前端同学来维护。
