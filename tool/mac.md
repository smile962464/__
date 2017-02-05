# mac

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

# 在桌面生成软连接（快捷方式）
ln -s /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app ~/Desktop

单词自动补全：在内置的文本编辑器里，输入几个字母后，点击 Escape 键，OS X 就会提示多个单词。

# dock 上增加最近打开程序的选项：
defaults write com.apple.dock persistent-others -array-add '{ "tile-data" = { "list-type" = 1; }; "tile-type" = "recents-tile"; }'
killall Dock

```

## 各种

mac的`控制台.app`能查看所有应用的log，方便启动错误时分析

mac 自带的 ftp 功能，对 Android 系统文件是只读的，不能写入，使用 第三方 ftp 客户端可以写入。

jdk6 在 mac 上的缺失：oracle官网从 jdk1.7 开始才有 Mac 版的安装包，需要从其他途径安装jdk1.6，
从苹果提供的[地址](https://support.apple.com/kb/DL1572?locale=zh_CN)安装。（一般，升级系统后需要重新安装）

mysql 启动错误：  
启动 `系统偏好设置 -> MySQL` 时，提示`is not owned by the mysql or _mysql user`。解决：`sudo chown -R  _mysql:wheel  /usr/local/mysql/data`

Idea 一直在`scanning files to index`解决办法：把`node_module`目录设置为`Excluded`。

## 常用软件

- 影音娱乐：Movist、MPlayerX(加速有问题)、vlc(不太方便)
- 工具类：licecap、XtraFinder、Alfred、AppCleaner、ShadowsocksX、BetterZip、iStat-Menus、
[Parallels-Desktop-11.1.2-for-macOS-Sierra](http://www.waitsun.com/parallels-desktop-11-1-2.html)、
androidfiletransfer、ParagonNTFS、Readiris-Corporate-ESD (ocr识别)
- 编程：JD-Gui、idea、atom、sublime、MacDown、zsh、Dash、Gas Mask、charles、[cdto-在ITerm里打开当前Finder路径](https://github.com/jbtule/cdto)、Sequel-pro
- 交互视觉：Axure、ps、Visual_Paradigm、ICOFormat
- 系统：[导出 .scpt 文件成 mac app](http://apple.stackexchange.com/questions/8299/how-do-i-make-an-applescript-file-into-a-mac-app)；QuickLook-plugin：QLMarkdown.qlgenerator、QLStephen.qlgenerator、QuickLookJSON.qlgenerator

vs code 自动识别并转换 gbk 文件编码插件：changeEncode 

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
- [atom-beautify](https://atom.io/packages/atom-beautify)、[highlight-selected](https://atom.io/packages/highlight-selected)、[open-in-browser](https://atom.io/packages/open-in-browser)
- japanese-wrap、line-length-break、indent-guide-improved
- [插件project-ring](https://github.com/vellerefond/project-ring)：
`Make The Current Project The Default At StartUp`


## homebrew

```sh
brew install autojump

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
DocumentRoot "/Users/hua/my"
<Directory "/Users/hua/my">
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

访问：
http://localhost/
http://localhost:9999/

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
