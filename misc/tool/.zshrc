# bin 目录加入环境变量
export PATH=$HOME/bin:/usr/local/bin:$PATH
# 使用 vim
export EDITOR='vim'
#export PS1="\u \w$"

## homebrew 加速
export HOMEBREW_BOTTLE_DOMAIN=http://7xkcej.dl1.z0.glb.clouddn.com

# 以下 zshrc 模板去掉了很多没用到的命令和注释
# 完整模板看这里：https://github.com/robbyrussell/oh-my-zsh/blob/master/templates/zshrc.zsh-template
#
# Path to your oh-my-zsh installation.
export ZSH=$HOME/.oh-my-zsh
# Set name of the theme to load. Look in ~/.oh-my-zsh/themes/
ZSH_THEME="ys"
# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git)
source $ZSH/oh-my-zsh.sh

# 运行 alias 查看所有别名
#alias vi="subl"
alias proxy="proxychains4 -q"  # 翻墙：打开 shadowsocks 翻墙，然后如：proxy npm i xxx

alias sz="subl ~/.zshrc"
alias se="source ~/.zshrc"
alias npmr="open `npm root -g`"

export NVM_DIR="/Users/hua/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

# brew install autojump 后提示需要添加的内容
[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh

# Python 虚拟环境 Virtualenv/VirtualenvWrapper
#source /usr/local/bin/virtualenvwrapper.sh

## java  参考：http://chessman-126-com.iteye.com/blog/2162466
export JAVA_6_HOME=`/usr/libexec/java_home -v 1.6` # Mac默认 JDK 6（Mac默认自带了一个jdk6版本）
#export JAVA_7_HOME=`/usr/libexec/java_home -v 1.7` # 设置 JDK 7
export JAVA_8_HOME=`/usr/libexec/java_home -v 1.8` # 设置 JDK 8
#alias命令动态切换JDK版本
#alias jdk6="export JAVA_HOME=$JAVA_6_HOME"
#alias jdk8="export JAVA_HOME=$JAVA_8_HOME"
export JAVA_HOME=$JAVA_8_HOME #默认JDK
export CLASSPATH=.:$JAVA_HOME/lib:
export PATH=$PATH:$JAVA_HOME/bin

## android sdk
export ANDROID_HOME=/Users/hua/Library/Android/sdk
export ANDROID_SKD=/Users/hua/Library/Android/sdk
export ANDROID_SKD_HOME=/Users/hua/Library/Android/sdk
export PATH=${PATH}:$ANDROID_SKD_HOME/tools
export PATH=${PATH}:$ANDROID_SKD_HOME/platform-tools

## android ndk
export ANDROID_NDK=/Users/hua/Library/Android/android-ndk-r13b
export ANDROID_NDK_HOME=/Users/hua/Library/Android/android-ndk-r13b
export PATH="$ANDROID_NDK:$PATH"

## tomcat
#export PATH=$PATH:/Applications/apache-tomcat-8.0.27/bin

## maven
#export MAVEN_HOME=/usr/share/maven
#export MAVEN_HOME=/Applications/apache-maven-3.3.3
#export PATH=$PATH:$MAVEN_HOME/bin

## gradle
#export GRADLE_HOME=/Applications/gradle-2.7
#export PATH=$PATH:$GRADLE_HOME/bin

## mysql
#export PATH="/usr/local/mysql/bin:$PATH"

## sofa-sdk
#export SOFA_HOME="/Applications/sofa-sdk"
#export PATH="$SOFA_HOME:$PATH"
