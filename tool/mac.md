# mac (macOS Sierra 10.12)

```sh
sips -Z 640 *.jpg   # 批量修改图片的 宽或高 为指定值，保持原来宽高比例
sips -z height width [file]   # 修改宽和高为指定值

command+shift+3(4)  # 截图保存成文件
control+command+shift+3(4)  # 截图只是保存在剪贴板里，不保存文件
defaults read com.apple.screencapture  # 查看系统截图设置
defaults write com.apple.screencapture type jpg  # 将系统截屏后图片保存为 jpg 格式
defaults write com.apple.screencapture location ~/Downloads/  # 将系统截屏后图片保存为 jpg 格式
defaults delete com.apple.screencapture name  # 撤销修改截图名
http://apple.stackexchange.com/questions/102452/can-i-undo-changes-made-via-defaults-write

pmset noidle  # 阻止电脑睡眠
同时按住shift、control、电源键，关闭显示器

# 在桌面生成软连接（快捷方式）
ln -s /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app ~/Desktop

单词自动补全：在内置的文本编辑器里，输入几个字母后，点击 Escape 键，OS X 就会提示多个单词。

# dock 上增加最近打开程序的选项：
defaults write com.apple.dock persistent-others -array-add '{ "tile-data" = { "list-type" = 1; }; "tile-type" = "recents-tile"; }'
killall Dock

拖动 app 到 finder 工具栏方法：拖着 app 到 finder 工具栏时，按下`cmd + alt`

```

## 各种

mac 磁盘空间变得越来越少，有些软件有内存泄露问题：查看`/private/var/vm`下 swapfile 文件多少（不能删除）, 关闭重启电脑

mac的`控制台.app`能查看所有应用的log，方便启动错误时分析

mac 自带的 ftp 功能，对 Android 系统文件是只读的，不能写入，使用 第三方 ftp 客户端可以写入。

jdk6 在 mac 上的缺失：oracle官网从 jdk1.7 开始才有 Mac 版的安装包，需要从其他途径安装jdk1.6，
从苹果提供的[地址](https://support.apple.com/kb/DL1572?locale=zh_CN)安装。（一般，升级系统后需要重新安装）

mysql 启动错误：  
启动 `系统偏好设置 -> MySQL` 时，提示`is not owned by the mysql or _mysql user`。解决：`sudo chown -R  _mysql:wheel  /usr/local/mysql/data`

Idea 一直在`scanning files to index`解决办法：把`node_module`目录设置为`Excluded`。

## 常用软件

- 必备: HandBrake / Movist / Dash / MacDown marp / snip jietu(qq) licecap kap / Color Note / Gas Mask / charles / XtraFinder / Alfred / AppCleaner / iStat-Menus / OnyX / Spectacle / FileZilla / androidfiletransfer / meld / Cakebrew / pyCharm / virtualbox / genymotion / xcode / mindnode lite

> 「xxx.app已损坏,打不开.你应该将它移到废纸篓」，并非你安装的软件已损坏，而是Mac系统的安全设置问题，
> 因为这些应用都是破解或者汉化的（例如 Movist 破解版）, 解决方法就是临时改变Mac系统安全设置。
> macOS 10.12 “安全性与隐私”里去掉了允许安装”任何来源“的软件设置，可以在终端里运行`sudo spctl --master-disable`打开

- 其他: Unarchiver / airdroid / Media-Info / vlc(不太方便) / Axure / Visual_Paradigm / ICOFormat / ParagonNTFS / Readiris-Corporate-ESD (ocr识别) / JD-Gui / Sequel-pro

QuickLook-plugin: QLMarkdown.qlgenerator / QLStephen.qlgenerator / QuickLookJSON.qlgenerator

OmniDiskSweeper 磁盘占用分析工具，[使用帮助](http://newping.cn/322)

安装 [git-open](https://github.com/paulirish/git-open) 自动打开 git 远程仓库地址

iCloud 目录多出了“Keynote / Pages ...“等空目录，是为了引导你安装相应软件，安装完之后、可以在
”系统偏好设置 -> iCloud -> iCloud Drive -> 选项“里去掉勾选相应项目，文件夹里的空目录自动会消失。

虚拟机用 Virtualbox + win xp（注意：win-XP 要下载官方正版、不能是国内处理过的 ghost 版本），
虚拟机里的 win 键盘是用的 ctrl 键：https://forums.virtualbox.org/viewtopic.php?f=8&t=63567&hilit=keyboard  
(xp 下载地址: http://pcriver.com/operating-systems/windows-xp-professional-iso-download/)  
注意：当 virtualBox 运行时，Android 官方安装的虚拟机、开不起来！  
虚拟机里查看 ip 地址可以看到，例如 10.0.2.2 可访问 host 主机的 localhost ，
Genymotion android emulator 相应ip为 10.0.3.2。 

- https://www.slant.co/topics/526/~best-window-manager-for-mac
- http://apple.stackexchange.com/questions/144388/always-open-the-finder-in-new-tab

### vs code

```js
// 设置
{
  "editor.fontSize": 13,
  "editor.tabSize": 2,
  "editor.dragAndDrop": true,
  "files.exclude": {
    "**/.idea": true
  },
  "editor.scrollBeyondLastLine": false,
  "editor.formatOnType": true,
  "editor.renderIndentGuides": true,
  "terminal.external.osxExec": "iTerm.app",
  "editor.renderWhitespace": "boundary",
  "editor.tabCompletion": true,
  "typescript.check.tscVersion": false,
  "files.associations": {
    "*.wxml": "xml",
    "*.wxss": "css",
    "*.acss": "css"
  },
  "workbench.iconTheme": "vs-seti"
}
// 快捷键
[
  { "key": "cmd+d",   "command": "editor.action.copyLinesDownAction" }
]
// 扩展
beautify / Indent 4-to-2 / JSON Tools / Path Intellisense / react-beautify / C/C++
changeEncode / GBKtoUTF8 / Active File In Status Bar / EditorConfig for Visual Studio Code
```

### shadowsocks

> shadowsocks使用的是sockets5代理，一般情况下只有浏览器支持，电脑上的其他软件很多不支持(可以配合proxifier做支持)。

shadowsocks代理模式分为「自动代理模式(pac模式)」和「全局模式」，
全局模式「并不是所有的电脑上的app都走代理」而只是所有浏览器访问的网站都走代理(包括国内外所有网站)。
所以一般都使用PAC模式，并且[配合SwitchyOmega](http://www.jianshu.com/p/a6eecc4f66e6) 方便添加/删除特定网址到 pac 文件中。
「自动代理模式」和「全局模式」切换时，系统的「偏好设置－网络－高级－代理」里会跟着切换。

让 terminal 走代理（如curl）：使用 proxychains4。

### atom

- 标题栏显示完整路径：安装 [custom-title](https://atom.io/packages/custom-title)，设置 `<%= fileName %><% if (projectPath) { %> - <%= filePath %> <% } %>`
- [Sublime-Style-Column-Selection](https://atom.io/packages/Sublime-Style-Column-Selection)
- [atom-beautify](https://atom.io/packages/atom-beautify) / [highlight-selected](https://atom.io/packages/highlight-selected) / [open-in-browser](https://atom.io/packages/open-in-browser)
- japanese-wrap / line-length-break / indent-guide-improved
- [插件project-ring](https://github.com/vellerefond/project-ring)：
`Make The Current Project The Default At StartUp`


## iTerm2 / oh-my-zsh

Mac 系统自带了 Zsh，用`zsh --version`命令查看，iTerm2 和系统 terminal 使用`/bin/bash`作为default shell,
可以直接运行`chsh -s /bin/zsh`修改系统默认 shell 为 zsh 。也可以单独修改 iTerm2 在
`Preferences -> Profiles -> Default -> General -> Command`里修改为`/bin/zsh`。

之后安装 [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)，它有众多的 Plugins 和 Themes ,
例如 [git Plugin](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugin:git) 有许多方便操作的 git 命令别名。

运行`setopt auto_pushd`，这样通过 cd 切换目录时，zsh 会自动将前一个目录加到栈里。

再运行`brew install autojump`安装 autojump, 好了可以用`j –s`看你的历史路径库。

[cdto-在ITerm里打开当前Finder路径](https://github.com/jbtule/cdto)

查看某个命令文件所在的路径：比如`which java`，结果如果是`/usr/bin/..`，说明是软连接、再运行 ls -l `which java` 即可。


## [homebrew](https://brew.sh/) - macOS 不可或缺的套件管理器

```sh
# homebrew 国内源
$ cd /usr/local && git remote set-url origin https://git.coding.net/homebrew/homebrew.git
$ cd $home && brew update

# 更新时报错：
cd $(brew --prefix)  或 cd /usr/local
git fetch origin
git reset --hard origin/master
git clean -f
```

### homebrew-cask

```sh
brew install caskroom/cask/brew-cask  # 安装 homebrew-cask
brew cask search  # 列出所有可以被安装的软件
brew cask search drop  # 查找所有和drop相关的应用
brew cask info thunder  # 查看迅雷应用的信息
brew cask list  # 查看已安装的软件
brew cask uninstall qq  # 卸载QQ
brew cask uninstall APP && brew cask install APP  # 软件更新，删除重装

# 一键装机
brew cask install alfred
brew cask install qq
brew cask install thunder mou sublime-text google-chrome
```

通常 OS X 下二进制软件是通过 App Store 安装的，homebrew-cask 是一个基于HomeBrew的软件安装程序，
使用homebrew-cask 可以在命令行下安装软件包，相对Mac App Store，还有一些优势：
安装软件体验一致、简洁、优雅、快速；对常用软件支持更全面。

homebrew-cask 和Homebrew 的区别：
Homebrew 安装的是源文件包, 下载源文件、编译、安装，比如安装wget, gnupg, mutt等。
homebrew-cask 安装的是二进制软件包, 比如QQ，Chrome，evernote等。
homebrew-cask 安装软件时自动创建软连接到 Application 目录，这样在 Launchpad 中也能查看到安装的软件，方便启动软件。


## Apache

[Get Apache, MySQL, PHP and phpMyAdmin working on OSX](https://coolestguidesontheplanet.com/get-apache-mysql-php-phpmyadmin-working-osx-10-10-yosemite/) 、
[apache_virtualhosts](http://lowagie.com/apache_virtualhosts)

```sh
httpd -v  # find the Apache version
sudo apachectl start / stop / restart  # 开关重启
sudo vi /etc/apache2/httpd.conf  # 编辑 Apche 的配置文件

找到 "#LoadModule php5_module libexec/apache2/libphp5.so"  去掉前边的`#`号，打开php

改变 localhost 目录指向：

#DocumentRoot "/Library/WebServer/Documents"
DocumentRoot "/Users/hua/inner"
<Directory "/Users/hua/inner">
    Options Indexes FollowSymLinks MultiViews
    MultiviewsMatch Any
    AllowOverride None
    Require all granted
</Directory>

Listen 9999
<Directory "/Users/hua/Downloads">
    Options Indexes FollowSymLinks MultiViews
    MultiviewsMatch Any
    AllowOverride None
    Require all granted
</Directory>
<VirtualHost *:9999>
    DocumentRoot "/Users/hua/Downloads"
    ServerName me.com
</VirtualHost>

> 如果出现 403 You dont have permission to access 错误，修改目录权限 everyone 为“只读”，再重启 Apache

访问：
http://localhost/
http://localhost:9999/

有些 API 比如 html5 getUserMedia，必须要在 https 环境下生效，参考配置如下：
http://www.jianshu.com/p/bd016015efe7
http://www.cnblogs.com/y500/p/3596473.html
本目录`./other/apache`内`__http`为原始文件，`__https`为相应文件的 https 修改，方便直接替换。(ssl 证书另外自行生成)
```

## nginx

```sh
brew install nginx  
sudo nginx  # 启动
sudo nginx -s stop  # 关闭
sudo nginx -s stop && sudo nginx  # 重启

cd /usr/local/etc/nginx/nginx.conf  # 打开配置文件

# 更改 http → server 区块里的配置如下：

location / {
    #root   html;
    root    /Users/hua/my;
    index  index.html index.htm;
    autoindex on;
}

http://localhost:8080  # 测试
```

## 路由器设置

windows下 ipconfig 查出的 “默认网关” 地址一般就是 “路由器ip” 地址;
对应 mac 上的 “偏好设置－网络－高级－TCP／ip下的路由器”。

> 路由器不需要链接网线到电脑上。遇到问题，先路由器复位

迷你型路由器(跟普通路由器不同)网关IP为 “192.168.1.253”，想要进去，需要把电脑本地连接或无线连接的IP手动修改：

    IP地址：192.168.1.2(x)
    子网掩码：255.255.255.0
    默认网关：192.168.1.253  (mac上是路由器)

之后可输入 “192.168.1.253”，进入路由器设置界面，先添加“无线密码”，再修改路由器登陆口令，防止别人登陆进去。 
