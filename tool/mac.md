# mac (macOS Sierra 10.12)

## 软件

> 「xxx.app已损坏,打不开.你应该将它移到废纸篓」，并非你安装的软件已损坏，而是Mac系统的安全设置问题，
> 因为这些应用都是破解或者汉化的（例如 Movist 破解版）, 解决方法就是临时改变Mac系统安全设置。
> macOS 10.12 “安全性与隐私”里去掉了允许安装”任何来源“的软件设置，可以在终端里运行`sudo spctl --master-disable`打开

- HandBrake / Movist / Dash / MacDown / Marp / Color Note / Gas Mask / charles / iStat-Menus / Spectacle / FileZilla / androidfiletransfer / meld / Cakebrew / pyCharm / mindnode lite / Unarchiver / airdroid / Media-Info / Axure / Visual_Paradigm / ParagonNTFS / Readiris-Corporate-ESD (ocr识别) / JD-Gui / Sequel-pro

- 系统: AppCleaner / [OmniDiskSweeper](http://newping.cn/322) / Disk Drill / OnyX
- 效率: [git-open](https://github.com/paulirish/git-open) 自动打开 git 远程仓库地址
    - QuickLook-plugin: QLMarkdown.qlgenerator / QLStephen.qlgenerator / QuickLookJSON.qlgenerator

- 截图、gif录屏: lightshot (Apowersoft截屏王 snip jietu(qq) Skitch) / kap (licecap gifify)
- XnConvert: 免费任务式图像处理软件，替代 photoshop 简单功能，比 Mac 预览工具更强。

```sh
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

## 各种

```sh
拖动 app 到 finder 工具栏方法：拖着 app 到 finder 工具栏时，按下`cmd + alt`

defaults read com.apple.screencapture  # 查看系统截图设置
defaults write com.apple.screencapture type jpg  # 将系统截屏后图片保存为 jpg 格式
defaults write com.apple.screencapture location ~/Downloads/  # 将系统截屏后图片保存为 jpg 格式
defaults delete com.apple.screencapture name  # 撤销修改截图名
http://apple.stackexchange.com/questions/102452/can-i-undo-changes-made-via-defaults-write

pmset noidle  # 阻止电脑睡眠。 同时按住 shift、control、电源键，关闭显示器
Command + h  # 隐藏程序
单词自动补全：在内置的文本编辑器里，输入几个字母后，点击 Escape 键，OS X 就会提示多个单词。

# dock 上增加最近打开程序的选项：
defaults write com.apple.dock persistent-others -array-add '{ "tile-data" = { "list-type" = 1; }; "tile-type" = "recents-tile"; }'
killall Dock

# 在桌面生成软连接（快捷方式）
ln -s /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app ~/Desktop
# 加入到 zsh/bash 中
alias simulator='open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app'
```

iCloud 目录多出了“Keynote / Pages ...“等空目录，是为了引导你安装相应软件，安装完之后、可以在
”系统偏好设置 -> iCloud -> iCloud Drive -> 选项“里去掉勾选相应项目，文件夹里的空目录自动会消失。

在启动系统登录后、添加自动打开的程序：System Preferences > Users & Groups > Login items
点击"+"、找到自己写的可执行 bash 文件，加入即可。

重启，开机按住`Command + R`，以 Recovery 分区启动，命令行输入
`csrutil enable --without debug`关闭调试模式，`csrutil disable`关闭 Enforce System Integrity Protection. [Mac sip安全机制介绍](https://support.apple.com/en-us/HT204899) / [csrutil status](https://developer.apple.com/library/content/documentation/Security/Conceptual/System_Integrity_Protection_Guide/ConfiguringSystemIntegrityProtection/ConfiguringSystemIntegrityProtection.html#//apple_ref/doc/uid/TP40016462-CH5-SW1)

mac 磁盘空间变得越来越少，有些软件有内存泄露问题：查看`/private/var/vm`下 swapfile 文件多少（不能删除）, 关闭重启电脑

微信客户端收藏的图片位置：`~/Library/Containers/com.tencent.xinWeChat/Data/Library/Application\ Support/`

mac 自带的 ftp 功能，对 Android 系统文件是只读的，不能写入，使用 第三方 ftp 客户端可以写入。

[Enounce MySpeed](http://www.enounce.com/myspeed-mac-download-trial): 
是一个能很方便地【加减速网页中 flash 播放速度】的工具(也包括加速html5视频)，但注意其【卸载方式】比较麻烦，
[需要下载专门的 RemoveMySpeed 卸载工具](http://www.enounce.com/faqs-myspeed#uninstall)，
警告：如果不按这个方式卸载，Safari 浏览器将打不开任何网页、会弹出报错“此网页出现问题，已重新载入”，同样
底层使用 Safari 的 App Store 也打开会变成一片空白！


## 虚拟机

- 用 Virtualbox + win xp（注意：win-XP 要下载[官方正版](http://pcriver.com/operating-systems/windows-xp-professional-iso-download/)、不能是国内处理过的 ghost 版本）
- [虚拟机里的 win 键盘是用的 ctrl 键](https://forums.virtualbox.org/viewtopic.php?f=8&t=63567&hilit=keyboard)
- 安装后重启，或点击菜单 Devices -> Insert Guest Additions CD image… 使能访问 host 电脑并自动调整分辨率
- 设置 Shared Folders 

注意：当 virtualBox 运行时，Android 官方安装的虚拟机、开不起来！  
虚拟机里查看 ip 地址可以看到，例如 10.0.2.2 可访问 host 主机的 localhost ，
Genymotion android emulator 相应ip为 10.0.3.2。 


## 软/硬连接

连接有软连接和硬连接(hard link)之分的，软连接(symbolic link)又叫符号连接。
符号连接相当于Windows下的快捷方式。不可以对文件夹建立硬连接，我们通常用的还是软连接比较多。
（注意：软连接和mac上的制作替身不同）

```sh
# 格式
ln [option] source_file dist_file/dist_dir

#若权限不足加 sudo
ln -s source_file dist        # 建立软连接
ln -s ../source/*.bar .        # 建立软连接，在当前目录

ln source_file dist           # 建立硬连接
rm -rf symbolic_name    # 注意不是rm -rf symbolic_name/
```

软连接可以 跨文件系统，硬连接不可以。软连接可以对一个不存在的文件名进行连接。软连接可以对目录进行连接。
硬链接下修改源文件或者连接文件任何一个的时候，其他的文件都会做同步的修改。


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
brew help
brew list / brew info <package name>

# homebrew 国内源
$ cd /usr/local && git remote set-url origin https://git.coding.net/homebrew/homebrew.git
$ cd $home && brew update

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


## vim

vim 是 vi 的增强版本。相比vi添加了显示颜色等功能。
![vim 键盘图](https://zos.alipayobjects.com/rmsportal/MOPJrAnojdFvAToZkESi.gif)

```sh
# 编辑模式
输入 i 再输入其他字符。 按 esc 退出，切回命令模式

# 命令模式
按：h j k space键 导航方向
ctrl-f  上翻一页
ctrl-b  下翻一页
^     跳至行首
$     跳至行尾
gg    跳至文件的第一行 
G     到文件的最后一行

tail -n10 path/filename 查看文件最后10行

:w   保存
:wq  :x  shift zz 保存修改并退出
:q!  强制退出，放弃修改

u     撤销  
ctrl+r   重做（撤销一个撤销）
.     重复上一个编辑命令
>>     将当前行右移一个单位
<<     将当前行左移一个单位(一个tab符)
==     自动缩进当前行

/pattern     向后搜索字符串pattern  n继续搜索下一个  shift+n
?pattern     向前搜索字符串pattern  #继续搜索上一个
:s/vivian/sky/ 替换当前行第一个 vivian 为 sky
:s/vivian/sky/g 替换当前行所有 vivian 为 sky
:%s/source_pattern/target_pattern/g  全局替换

复制 粘贴（如果粘贴外部内容，在i模式下，直接cmd+v）
dd 删除光标所在行， dw 删除一个字(word) ，D 删除到行末
x 删除当前字符，  X 删除前一个字符
yy 复制一行，此命令前可跟数字，标识复制多行，如6yy，表示从当前行开始复制6行
yw 复制一个字 ， y$ 复制到行末
p 粘贴内容到当前行的下面 ，P 粘贴内容到当前行的上面

# visual模式

按 v 进入可视模式；移动光标键选定内容！w选择单词，y复制(或gy)，p粘贴，x删除，d删除后边

[vi编辑器使用color-scheme](http://alvinalexander.com/linux/vi-vim-editor-color-scheme-colorscheme)
cd /usr/share/vim/vim72/colors
ls -- 找出需要的color名字
然后 in a vi editor session 输入 :colo delek
```


## shadowsocks

> shadowsocks使用的是sockets5代理，一般情况下只有浏览器支持，电脑上的其他软件很多不支持(可以配合proxifier做支持)。

shadowsocks代理模式分为「自动代理模式(pac模式)」和「全局模式」，
全局模式「并不是所有的电脑上的app都走代理」而只是所有浏览器访问的网站都走代理(包括国内外所有网站)。
所以一般都使用PAC模式，并且[配合SwitchyOmega](http://www.jianshu.com/p/a6eecc4f66e6) 方便添加/删除特定网址到 pac 文件中。
「自动代理模式」和「全局模式」切换时，系统的「偏好设置－网络－高级－代理」里会跟着切换。

让 terminal 走代理（如curl）：使用 proxychains4 (需要 csrutil disable 关闭 sip)。
在 zshrc 里设置`alias proxy="proxychains4 -q"`，`brew install wget`安装 wget ，
即可使用如`proxy wget http://xxx.pdf`下载一些被墙的资源


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
]
// 扩展
beautify / Indent 4-to-2 / JSON Tools / Path Intellisense / react-beautify / C/C++
Terminal / filesize / Open HTML in Default Browser / EditorConfig for Visual Studio Code
(changeEncode / GBKtoUTF8 / Active File In Status Bar 内置已支持) 
```

## atom

- 标题栏显示完整路径：安装 [custom-title](https://atom.io/packages/custom-title)，设置 `<%= fileName %><% if (projectPath) { %> - <%= filePath %> <% } %>`
- [Sublime-Style-Column-Selection](https://atom.io/packages/Sublime-Style-Column-Selection)
- [atom-beautify](https://atom.io/packages/atom-beautify) / [highlight-selected](https://atom.io/packages/highlight-selected) / [open-in-browser](https://atom.io/packages/open-in-browser)
- japanese-wrap / line-length-break / indent-guide-improved
- [插件project-ring](https://github.com/vellerefond/project-ring)：
`Make The Current Project The Default At StartUp`


## markdown 语法

- 标题 ( h1~h6 ) 格式为使用相应个数的 “#” 作前缀
- 行末加两个或多个空格才是真正的换行 br 标签。
- 空一行（两个回车）分段生成 p 标签
- 引用 ">" 记号直接借鉴邮件标准
- 使用 “-” “+” “*” 开头、来表示无序列表，使用 数字 + “.” 开头表示有序列表
- 使用 * 或 _ 包裹文本产生 strong 效果：__strong__ **strong**

- 使用 [test](http://example.net "optional title") 来标记普通链接。
- 使用 ![img](https://zos.alipayobjects.com/rmsportal/lcLKYXUWPbqkavfJbMGx.png "optional title") 来标记图片。可以使用相对路径。

#### 表格
| Item      |    Value | Qty  |
| :-------- | --------:| :--: |
| Computer  | 1600 USD |  5   |
| Phone     |   12 USD |  12  |

#### 可折叠内容

<details>
  <summary>Is this production ready?</summary>
  Next.js has been powering `https://zeit.co` since its inception.
</details>
<details>
  <summary>Is this production ready?</summary>
  Next.js has been powering `https://zeit.co` since its inception.
</details>


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
