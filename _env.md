

# misc

- 注意：mac不区分文件名的大小写，类名及文件名大小写改变后，不会自动刷新。编译时可能抛出“找不到类”的错误，要重新删除相应文件，再下载下来
- [macOS Sierra 安装 opencv 最简单方法](http://www.pyimagesearch.com/2016/12/19/install-opencv-3-on-macos-with-homebrew-the-easy-way/) 


# cpp

mac 安装 xcode 自动安装 c/c++ 编译器。

```sh
gcc file.c file1.c
g++ file.cc file1.cc
```

使用 "Eclipse for c++" IDE + CDT (全称C/C++ Development Toolkit) 
另外搭配 cmake 的方法：http://stackoverflow.com/a/38716337/2190503

> 不建议用 Clion (直接集成了 cmake 工具)，收费、开的时间长有内存泄露问题。


# python

mac 需要安装 xcode (会附带 gcc) ，虽然自带了 Python ，但还是使用 Homebrew 安装 Python 为好。 
Homebrew 会自动安装好 Setuptools 和 pip ，Setuptools提供 easy_install 命令，实现通过网络（通常Internet）下载和安装第三方Python包。

```sh
brew install python python3  # 一起安装 2.7.x 和 3.x

# create some symbolic links
brew linkapps python
brew linkapps python3

# 检测是否生效
which python  # right: /usr/local/bin/python  not: /usr/bin/python
which python3 # right: /usr/local/bin/python3 not: /usr/bin/python3

# sudo easy_install pip  # brew install python 时默认已经安装了？
sudo pip install virtualenv virtualenvwrapper  # 虚拟环境工具
```

#### React Native
- ios: cmd+d 打开菜单, cmd+r 刷新
- Android: cmd+m 打开菜单, rr 刷新

#### iOS Simulator

```sh
command + v  /  command + shift + v  # 粘贴
shift + command + H   # twice to simulate the double tap of home button
command + 3  # 缩小到 50% 大小

xcrun simctl install booted ~/Downloads/AlipayWallet.app   # 安装 app 到 模拟器
```

#### Android emulator

~~如果未设置环境变量, 到 <ANDROID_SDK_root>/tools 目录, 双击 android, 如果设置了环境变量, 命令行运行`android`会打开 
"Android SDK Manager"。~~ （新的 android 模拟器只能通过 Android Studio 打开）再在菜单中选择 Tools -> Manage AVDs (或命令行运行`android avd`), 打开 "Android Virtual Device (AVD) Manager" 会看到虚拟机列表，如果为空, 点击按钮 "Create..." 创建虚拟机。

```sh
adb shell input text 'text'  # 向 avd 里粘贴文字，只有一个虚拟机开着
# 如果有多个,选择一个: 
adb devices
adb -s emulator-5554 shell input text 'my%stext'
# 如果有空格、特殊字符等, 会报错: Error: Invalid arguments for command: text usage: input ... 
# 对这些字符 ( ) < > | ; & * \ ~ " ' 加上反斜杠 \ 转义, 空格用 %s 转义
```

#### Idea / Android Studio 常用快捷键：

```sh
ctrl + j/q   # 显示文档
cmd + click  # 跳到调用
Ctrl + Option + H   # 显示方法调用栈
opt + enter   # 排错
Ctrl + Alt + B   # 跳转到方法实现处
```

## Java / Android 环境安装

首先安装 [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
(mac jdk6 [地址](https://support.apple.com/kb/DL1572?locale=zh_CN))

> 安装 JDK 后，如何确认 mac java 安装路径，并设置`JAVA_HOME`环境变量：http://chessman-126-com.iteye.com/blog/2162466 
> 根据苹果的官方说明，Mac OS X 10.5 及以后的版本应该使用 /usr/libexec/java_home 命令来确定 JAVA_HOME 

安装 [Android Studio 和 Android SDK](https://developer.android.com/studio/index.html)
(安装好 studio 后会提示安装 sdk， Google 已不直接让单独安装 sdk 了！！)

Android NDK 下载：https://developer.android.com/ndk/downloads/index.html

添加环境变量：`export ANDROID_HOME=/../android-sdk` 至 `~/.bashrc` 或 `~/.zshrc` 。

[解决](http://blog.kuoruan.com/24.html) Android SDK Manager 下载慢无法更新：

- 方法一：打开地址：http://ping.chinaz.com/，分别测试 dl.google.com 和 dl-ssl.google.com 的IP地址，将获取到的IP写入hosts文件。
- 方法二：使用国内镜像源`mirrors.neusoft.edu.cn`/`ubuntu.buct.edu.cn`/`mirrors.dormforce.net`
- 方法三: 直接从仓库网站下载再导入,如 [Android SDK | “Android 6.0”](https://afterroot.wordpress.com/2016/01/01/android-sdk-android-6-0-package-direct-links/)。如何导入呢?

    稍微注意能发现: Android AVD Manager 里的每一个安装项目都和 <ANDROID_SDK_root> 目录下的子目录名相对应。
    比如下载了 sysimg_arm-23_r03.zip 文件, 应该将此文件解压到 <ANDROID_SDK_root>/system-images/android-23 目录下,
    再重启 Android AVD Manager 会看到 "Android 6.0 (API 23) 节点下的 "ARM EABI v7a System Image | API 23, rev 3"
    的 status 从 "Not installed" 变为 "Installed" , 导入成功。(注意有些目录比较大、很占空间)

## Maven
[Unable to import Maven project into IntelliJ IDEA](http://stackoverflow.com/questions/12701347/unable-to-import-maven-project-into-intellij-idea)

maven依赖找不到

- 先在用户目录（~/.m2）下的 settings.xml 里，添加内网mvn仓库源。
- 若不行，再把maven安装目录（xx/apache-maven-3.3.3/conf）下的 settings.xml 替换为与用户目录下 settings.xml 一致。
- 若还不行，删掉用户目录（~/.m2/repository）下已下载的所有依赖，在项目目录下`mvn install -DskipTests`重新安装。


## Eclipse

遇到问题，先在项目目录`mvn clean`，再点击eclipse菜单里project菜单项下的`clean...`。
eclipse 配置 jre：preferences --> Java --> Installed JREs --> search .

导入Java工程：

1. 在项目目录下运行：`mvn eclipse:eclipse` 将maven项目转化为eclipse项目（生成两个eclipse导入所需的配置文件）
2. 再eclipse导入
3. 修改代码后执行`mvn compile`或`mvn test`检验

eclipse 不能读取到环境变量`System.out.print(System.getenv("JAVA_HOME"))`返回null，需要从 terminal 中打开
`open /Applications/eclipse/Eclipse.app`。[更多](http://stackoverflow.com/questions/603785/environment-variables-in-mac-os-x?lq=1)
