# node

### npm命令：

npm install tnpm -g --registry="http://registry.npm.alibaba-inc.com"

- npm init -f
- npm install/i xx -g (-f)
- npm i --save-dev xx
- npm rm/uninstall xx -g

- npm root/prefix -g  -- 全局安装包位置。
- npm help install/cache
- npm cache clean [模块名]

tnpm view <pkgname> versions

#### npm link
cd ~/projects/proj1  # go into the dir of your main project
npm link ../proj2     # link the dir of your dependency

> proj1 and proj2 are siblings

### nvm管理多个node版本
- 手动安装：`git clone git@gitlab.alibaba-inc.com:node/nvm.git ~/.nvm`
- 然后：`cd ~/.nvm`、`source nvm.sh`、`nvm ls`、`nvm install 0.11.12`

### 各种

    设置process变量：export NODE_ENV="PRODUCTION"

    自动安装某npm包的shell命令：
    node -e "$(curl -fsSL https://a.alipayobjects.com/u/localhost/js/201406/2u6LQfOLhF.js)"

    后台运行程序：node hello.js &
    需关闭时，通过 ps-ef 命令找到进程对应的ID，使用kill命令手动关闭该进程，如：
    ps -ef | grep node
    kill 3747(进程id)
