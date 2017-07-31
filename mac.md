# mac (macOS Sierra 10.12)

```sh
pmset noidle  # 阻止电脑睡眠。 同时按住 shift、control、电源键，关闭显示器
Command + h  # 隐藏程序
单词自动补全：在内置的文本编辑器里，输入几个字母后，点击 Escape 键，OS X 就会提示多个单词。

# 在 finder 里
cmd + shift + .  # 切换显示“隐藏文件”
cmd + shift +  # G 跳转 F 最近使用的全部文件 D 桌面 H 用户目录

# 系统截图
command + shift + 3(4)  # 截图保存成文件
control + command + shift + 3(4)  # 截图只是保存在剪贴板里，不保存文件
# 批量设置图片大小
sips -Z 640 *.jpg   # 批量修改图片的 宽或高 为指定值(最大值变为 640)，保持原来宽高比例
sips -z height width [file]   # 修改宽和高为指定值

## Chrome
Command + L  # 光标定位到地址栏，输入搜索词 并按 Alt + Enter 键在 新标签页中
Command + 1/2/3  # 跳到相应标签
Command + Alt + →/←  # 选择 上/下 一个标签
```

## 系统设置

- 点击和手势：“系统偏好设置”，“触控板”，勾选轻点等
- 三指拖移窗口：“系统偏好设置”，“辅助功能”，“鼠标与触控板”，“触控板选项”下勾选“启用拖移”，选择“三指拖移”

- 重启，开机按住`Command + R`，以 Recovery 分区启动，命令行输入`csrutil enable --without debug`关闭调试模式，或者`csrutil disable`关闭 Enforce System Integrity Protection. 输入`csrutil status`查看状态。

- 在启动系统登录后、添加自动打开的程序：System Preferences(系统偏好设置) > Users & Groups(用户与群组) > Login items(登录项) 点击"+"、找到自己写的可执行 bash 文件，加入即可。

- iCloud 目录多出了“Keynote / Pages ...“等空目录，是为了引导你安装相应软件，安装完之后、可以在
”系统偏好设置 -> iCloud -> iCloud Drive -> 选项“里去掉勾选相应项目，文件夹里的空目录自动会消失。

- mac 自带的 ftp 功能，对 Android 系统文件是只读的，不能写入，使用 第三方 ftp 客户端可以写入。


```sh
拖着 app 到 finder 工具栏时，按下`cmd + alt` # 拖动 app 到 finder 工具栏

# http://apple.stackexchange.com/questions/102452/can-i-undo-changes-made-via-defaults-write
defaults read com.apple.screencapture  # 查看系统截图设置
defaults write com.apple.screencapture type jpg  # 将系统截屏后图片保存为 jpg 格式
defaults write com.apple.screencapture location ~/Downloads/  # 修改截屏图片保存路径
defaults delete com.apple.screencapture name  # 撤销修改截图名

# dock 上增加最近打开程序的选项：
defaults write com.apple.dock persistent-others -array-add '{ "tile-data" = { "list-type" = 1; }; "tile-type" = "recents-tile"; }'
killall Dock

# 在桌面生成软连接（快捷方式）
ln -s /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app ~/Desktop
# 或者加入到 zsh/bash 中
alias simulator='open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app'
```

## 软件

> macOS 10.12 “安全性与隐私”里去掉了允许安装”任何来源“的软件设置，可以在终端里运行`sudo spctl --master-disable`打开
> 「xxx.app已损坏,打不开.你应该将它移到废纸篓」，并非你安装的软件已损坏，而是 Mac 系统的安全设置问题，因为这些应用都是破解或者汉化的, 解决方法是改变 Mac 系统安全设置

- HandBrake / Movist / Dash / MacDown / Marp / Color Note / Gas Mask / charles / iStat-Menus / Spectacle / FileZilla / androidfiletransfer / meld / Cakebrew / pyCharm / mindnode lite / Unarchiver / airdroid / Media-Info / Axure / Visual_Paradigm / ParagonNTFS / Readiris-Corporate-ESD (ocr识别) / JD-Gui / Sequel-pro / ngrok

- 系统: AppCleaner / [OmniDiskSweeper](http://newping.cn/322) / Disk Drill / OnyX
- 效率: [git-open](https://github.com/paulirish/git-open) 自动打开 git 远程仓库地址
- 截图、gif录屏: lightshot (Apowersoft截屏王 snip jietu(qq) Skitch) / kap (licecap gifify)
- XnConvert: 免费任务式图像处理软件，替代 photoshop 简单功能，比 Mac 预览工具更强。
- [Enounce MySpeed](http://www.enounce.com/myspeed-mac-download-trial) 加减速网页中 flash 播放速度，
    - 注意其【卸载方式】比较麻烦，[需要下载专门的 RemoveMySpeed 卸载工具](http://www.enounce.com/faqs-myspeed#uninstall)，警告：如果不这样卸载，Safari 浏览器将打不开任何网页、会弹出报错“此网页出现问题，已重新载入”，同样底层使用 Safari 的 App Store 也打开会变成一片空白！


---------

## shadowsocks

[官网](https://portal.shadowsocks.com.hk/) / [mac 客户端](https://github.com/shadowsocks/shadowsocks-iOS/wiki/Shadowsocks-for-OSX-%E5%B8%AE%E5%8A%A9)

> shadowsocks使用的是sockets5代理，一般情况下只有浏览器支持，电脑上的其他软件很多不支持(可以配合proxifier做支持)。  
> shadowsocks代理模式分为「自动代理模式(pac模式)」和「全局模式」，全局模式「并不是电脑上所有的app都走代理」而只是所有浏览器访问的网站都走代理(包括国内外所有网站)。所以一般都使用PAC模式，并且配合 SwitchyOmega 方便添加/删除特定网址到 pac 文件中。「自动代理模式」和「全局模式」切换时，系统的「偏好设置－网络－高级－代理」里会跟着切换。

让 terminal 走代理：

```sh
1. brew install proxychains-ng  # 安装 proxychains-ng (需要 `csrutil disable` 关闭 sip)

2. 修改 /usr/local/etc/proxychains.conf 配置文件“末尾”部分内容，如下：

# add proxy here ...
# meanwile
# defaults set to "tor"
#socks4 	127.0.0.1 9050
socks5  127.0.0.1 1080

3. 测试
proxychains4 curl https://twitter.com/  # 测试是否成功
proxy curl https://twitter.com/  # 方便点、在 .zshrc 里设置 `alias proxy="proxychains4 -q"`

```

---------

## iTerm2 / oh-my-zsh

- [cdto - 在 ITerm 里打开当前 Finder 路径](https://github.com/jbtule/cdto)
- iTerm2 的 Preferences > Keys 里 HotKey 设置为 Command + `
- iTerm2 的 Profiles > Keys 里的 ⌥→ / ⌥← Action 设置为 Send Escape sequence , f / b
- iTerm2 的 Profiles > Window > Style 设置为 Full-Width Top of Screen 使其显示在最顶部

```sh
zsh --version  # Mac 系统自带了 zsh
chsh -s /bin/zsh  # 修改 shell 为 zsh ，系统默认使用 /bin/bash 作为 default shell
# 只在 iTerm2 里修改 shell : `Preferences -> Profiles -> Default -> General -> Command`
```

安装 [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)，它有众多的 Plugins (e.g. [git Plugin](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugin:git)) 和 Themes.

```sh
setopt auto_pushd  # 通过 cd 切换目录时，zsh 会自动将前一个目录加到栈里
brew install autojump  # 安装 autojump, 可以用`j –s`看你的历史路径库。
```

## [homebrew](https://brew.sh/) - macOS 不可或缺的套件管理器

```sh
brew help
brew list / brew info <package name>

# homebrew 国内源
$ cd /usr/local && git remote set-url origin https://git.coding.net/homebrew/homebrew.git
$ cd $home && brew update

# homebrew-cask
# 通常 OS X 下二进制软件是通过 App Store 安装的，homebrew-cask 是一个基于 HomeBrew 的软件安装程序，使用 homebrew-cask 可以在命令行下安装软件包，相对 Mac App Store 安装软件体验一致、简洁、优雅、快速，对常用软件支持更全面。

# homebrew-cask 和 Homebrew 的区别：
# - Homebrew 安装的是源文件包, 下载源文件、编译、安装，比如安装 wget, gnupg, mutt 等。
# - homebrew-cask 安装的是二进制软件包, 比如 QQ，Chrome，evernote 等。
# - homebrew-cask 安装软件时自动创建软连接到 Application 目录，这样在 Launchpad 中也能查看到安装的软件。
brew install caskroom/cask/brew-cask  # 安装 homebrew-cask
brew cask search         # 列出所有可以被安装的软件
brew cask search drop    # 查找所有和drop相关的应用
brew cask info thunder   # 查看迅雷应用的信息
brew cask list           # 查看已安装的软件
brew cask uninstall APP && brew cask install APP  # 软件更新，删除重装
brew cask install / uninstall qq  # 安装 / 卸载QQ
brew cask install thunder mou sublime-text google-chrome  # 一键装机
```

---------

## vs code

```js
// 设置
{
  "editor.fontSize": 13,
  "editor.tabSize": 2,
  "editor.dragAndDrop": true,
  "editor.scrollBeyondLastLine": false,
  "editor.formatOnType": true,
  "editor.renderIndentGuides": true,
  "editor.renderWhitespace": "boundary",
  "editor.tabCompletion": true,
  "editor.wordWrap": "on",
  "window.title": "${activeEditorLong}",
  "files.exclude": {
    "**/.idea": true
  },
  "files.associations": {
    "*.wxml": "xml",
    "*.wxss": "css",
    "*.acss": "css"
  },
  "typescript.check.tscVersion": false,
  "workbench.iconTheme": "vs-seti",
  "emmet.useNewEmmet": true,
  "terminal.external.osxExec": "iTerm.app",
  "terminal.integrated.shell.osx": "/bin/zsh",
  "terminal.enableAppInsights": false
}
// 快捷键
[
  { "key": "cmd+d",   "command": "editor.action.copyLinesDownAction" }
  // { "key": "ctrl+alt+o",            "command": "terminal.open" }, // 安装 Terminal 扩展后
  { "key": "alt+`",                "command": "terminal.open" }
]
// 扩展，安装目录: ~/.vscode/extensions
beautify / Indent 4-to-2 / JSON Tools / Path Intellisense / react-beautify / C/C++
Terminal / filesize / Open HTML in Default Browser / EditorConfig for Visual Studio Code
(changeEncode / GBKtoUTF8 / Active File In Status Bar 内置已支持) 
```

---------

## tmux

```sh
brew install tmux  # 安装 （目前最新版 tmux v2.5 鼠标滚动有问题，建议本地编译安装 v2.3 版本）
# 配合 v2.3 版本 的插件 make mouse scroll smoothly https://github.com/NHDaly/tmux-better-mouse-mode

tmux kill-server  # 配置文件更改后、杀掉重启
tmux clear  # 清除输入历史
exit / prefix + x  # 关掉 session
```

`~/.tmux.conf`配置文件内容:

```sh
#remap default "prefix" from Ctrl-b to Ctrl-a
unbind ^b
set -g prefix C-a

bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# split window
bind | split-window -h
bind - split-window -v

# set shell
set -g default-shell /bin/zsh

# mouse options for selecting pane
set -g mouse on
```

---------

## 虚拟机

- 用 Virtualbox + win xp（注意：win-XP 要下载[官方正版](http://pcriver.com/operating-systems/windows-xp-professional-iso-download/)、不能是国内处理过的 ghost 版本）
- [虚拟机里的 win 键盘是用的 ctrl 键](https://forums.virtualbox.org/viewtopic.php?f=8&t=63567&hilit=keyboard)
- 安装后重启，或点击菜单 Devices -> Insert Guest Additions CD image… 使能访问 host 电脑并自动调整分辨率
- 设置 Shared Folders 

注意：当 virtualBox 运行时，Android 官方安装的虚拟机、开不起来！  
虚拟机里查看 ip 地址可以看到，例如 10.0.2.2 可访问 host 主机的 localhost ，
Genymotion android emulator 相应ip为 10.0.3.2。 

---------

## Apache

[Get Apache, MySQL, PHP and phpMyAdmin working on OSX](https://coolestguidesontheplanet.com/get-apache-mysql-php-phpmyadmin-working-osx-10-10-yosemite/) 、
[apache_virtualhosts](http://lowagie.com/apache_virtualhosts)

```sh
httpd -v  # find the Apache version
sudo apachectl start / stop / restart  # 开关重启
open /etc/apache2/httpd.conf  # 编辑 Apche 的配置文件

找到 "#LoadModule php5_module libexec/apache2/libphp5.so"  去掉前边的`#`号，打开php

改变 localhost 目录指向：

#DocumentRoot "/Library/WebServer/Documents"
# 在 index template 里插入自定义 meta. http://httpd.apache.org/docs/2.4/mod/mod_autoindex.html
IndexHeadInsert "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />"
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

---------

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

---------

## 路由器设置

windows下 ipconfig 查出的 “默认网关” 地址一般就是 “路由器ip” 地址;
对应 mac 上的 “偏好设置－网络－高级－TCP／ip下的路由器”。

> 路由器不需要链接网线到电脑上。遇到问题，先路由器复位

迷你型路由器(跟普通路由器不同)网关IP为 “192.168.1.253”，想要进去，需要把电脑本地连接或无线连接的IP手动修改：

    IP地址：192.168.1.2(x)
    子网掩码：255.255.255.0
    默认网关：192.168.1.253  (mac上是路由器)

之后可输入 “192.168.1.253”，进入路由器设置界面，先添加“无线密码”，再修改路由器登陆口令，防止别人登陆进去。 

---------

## atom

- 标题栏显示完整路径：安装 [custom-title](https://atom.io/packages/custom-title)，设置 `<%= fileName %><% if (projectPath) { %> - <%= filePath %> <% } %>`
- [Sublime-Style-Column-Selection](https://atom.io/packages/Sublime-Style-Column-Selection)
- [atom-beautify](https://atom.io/packages/atom-beautify) / [highlight-selected](https://atom.io/packages/highlight-selected) / [open-in-browser](https://atom.io/packages/open-in-browser)
- japanese-wrap / line-length-break / indent-guide-improved
- [插件project-ring](https://github.com/vellerefond/project-ring)：
`Make The Current Project The Default At StartUp`
