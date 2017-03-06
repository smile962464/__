# 软件、环境
> 注意：mac不区分文件名的大小写，类名及文件名大小写改变后，不会自动刷新。
编译时可能抛出“找不到类”的错误，要重新删除相应文件，再下载下来。


idea / android studio 常用快捷键：

```sh
ctrl + j/q  显示文档
cmd + click  跳到调用
Ctrl + Option + H  显示方法调用栈
opt + enter 排错
Ctrl + Alt + B 跳转到方法实现处
```

## 环境
- 安装 [JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) 、 [Android SDK 和 Android Studio](https://developer.android.com/studio/index.html) 。添加环境变量：`export ANDROID_HOME=/../android-sdk` 至 `~/.bashrc` 或 `~/.zshrc` 。
    - [解决](http://blog.kuoruan.com/24.html) Android SDK Manager 下载慢无法更新：
    - 在使用 Android SDK Manager 的时候，主要会连接到两个地址 dl.google.com 和 dl-ssl.google.com 两个地址都是无法正常访问的.

方法一：

    打开地址：http://ping.chinaz.com/，
    分别测试 dl.google.com 和 dl-ssl.google.com 的IP地址，   
    将获取到的IP写入hosts文件。

方法二：使用国内镜像源 (在『Android SDK Manager – Settings』窗口中，在「HTTP Proxy Server」和「HTTP Proxy Port」输入框内填入mirrors.neusoft.edu.cn和80，并且选中「Force https://… sources to be fetched using http://…」复选框)

    mirrors.neusoft.edu.cn //东软信息学院
    ubuntu.buct.edu.cn //北京化工大学
    mirrors.dormforce.net //（栋力无限）电子科技大学
    
方法三: 直接从仓库网站下载再导入,如 [Android SDK | “Android 6.0” Package Direct Links](https://afterroot.wordpress.com/2016/01/01/android-sdk-android-6-0-package-direct-links/)。如何导入呢?

    稍微注意能发现: Android AVD Manager 里的每一个安装项目都和 <ANDROID_SDK_root> 目录下的子目录名相对应。
    比如下载了 sysimg_arm-23_r03.zip 文件, 应该将此文件解压到 <ANDROID_SDK_root>/system-images/android-23 目录下,
    再重启 Android AVD Manager 会看到 "Android 6.0 (API 23) 节点下的 "ARM EABI v7a System Image | API 23, rev 3"
    的 status 从 "Not installed" 变为 "Installed" , 导入成功。(注意有些目录比较大、很占空间)

#### 打开 Android emulator (Android AVD Manager): 
如果未设置环境变量, 到 <ANDROID_SDK_root>/tools 目录, 双击 android, 如果设置了Android环境变量, 命令行运行`android`会打开 
"Android SDK Manager"。再在菜单中选择 Tools -> Manage AVDs (或命令行运行`android avd`), 
打开 "Android Virtual Device (AVD) Manager" 会看到虚拟机列表。
如果为空, 点击按钮 "Create..." 创建虚拟机, 点击某个虚拟机, 如果右边按钮 "Start..." 不可点?
则点击按钮 "Edit..." 查看编辑框里的 "CPU/ABI" 选项是否有设置, 设置为何虚拟机列表里 "CPU/ABI" 列一样的值, 并把其他选项填写完善。

向 avd 里粘贴文字:

    只有一个虚拟机开着: adb shell input text 'text'
    如果有多个,选择一个: 
        adb devices
        adb -s emulator-5554 shell input text 'my%stext'
    如果有空格、特殊字符等, 会报错: Error: Invalid arguments for command: text usage: input ... 
    对这些字符 ( ) < > | ; & * \ ~ " ' 加上反斜杠 \ 转义, 空格用 %s 转义


## idea
注意host文件里，localhost 只能对应 127.0.0.1 这个ip，不能对应其他ip地址，否则打不开 pom.xml 文件！
[详细解释](http://stackoverflow.com/questions/12701347/unable-to-import-maven-project-into-intellij-idea)

使用idea不需要再`mvn eclipse:eclipse`，直接打开pom.xml文件，能自动导入maven依赖等。


## maven
### maven依赖找不到
- 先在用户目录（~/.m2）下的 settings.xml 里，添加内网mvn仓库源。
- 若不行，再把maven安装目录（xx/apache-maven-3.3.3/conf）下的 settings.xml 替换为与用户目录下 settings.xml 一致。
- 若还不行，删掉用户目录（~/.m2/repository）下已下载的所有依赖，在项目目录下`mvn install -DskipTests`重新安装。


## eclipse
遇到问题，先在项目目录`mvn clean`，再点击eclipse菜单里project菜单项下的`clean...`。

### 导入Java工程：
1. 在项目目录下运行：`mvn eclipse:eclipse` 将maven项目转化为eclipse项目（生成两个eclipse导入所需的配置文件）
2. 再eclipse导入
3. 修改代码后执行mvn compile或mvn test检验


### eclipse配置jre
preferences --> Java --> Installed JREs --> search

### mac中 Eclipse 不能读取到环境变量
- 配置环境出错，并且`System.out.print(System.getenv("JAVA_HOME"))`返回null，
    - 解决：从terminal中打开，`$ open /Applications/eclipse/Eclipse.app`。其他[引申](http://stackoverflow.com/questions/603785/environment-variables-in-mac-os-x?lq=1)
