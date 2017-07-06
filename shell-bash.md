
### 常用
> man 查看命令帮助文档。 例如：使用 man ascii 来查看 ASCII 表。

```sh
# 命令行快捷键

crtl + w 删除前一个单词
ctrl + a / e 移动到所在 行首 / 行尾
ctrl + c 退出某进程（不是command键）
Ctrl + r 查找输入过的命令
cammand + k / ctrl + l / clear  #清屏
ctrl + u / k  清除光标到 行首 / 行尾 的内容

esc + b / f 移动到所在单词的 词首 / 词尾 
(为了方便，设置 iterm > Profiles > Keys 里的 ⌥→ / ⌥← Action 为 Send Escape sequence ，b / f )

# 命令

lsof -i:8087   # 查找出占用了某个端口的程序和其对应的PID
kill -9 *pid*  # 强制杀掉进程
chmod u+x test.sh    # 修改权限，脚本可执行

mv ./filename ./filename  # 移动文件/目录，重命名文件
echo textsss > ./mm.txt  # 覆盖文件原内容并重新输入内容，若文件不存在则创建文件
echo textsss >> ./mm.txt  # 向文件追加内容，原内容将保存

cat [-n] filename  # 由第一行开始显示档案内容, n 显示行号
more filename # 一页一页的显示档案内容. less 与 more 类似，而且可以往前翻页
history 10 # 列出最近执行过10条的命令，默认放在 .bash_history 文件中，默认保存1000条(可以修改)
history | more # 逐屏列出所有的历史记录，!99 执行历史清单中的第99条命令

head/tail filename 只看 头/尾 几行(默认10行)
head/tail -n 20 ~/.bashrc 显示头二十行！

dig [IP地址/域名] +short  # 查询DNS包括NS记录，A记录，MX记录等相关信息的工具
nslookup [IP地址/域名]  # 查询一台机器的IP地址和其对应的域名
mtr # 诊断路由节点问题，如丢包、网站访问慢、结合了"traceroute"和"ping"功能。下载地址 http://rudix.org/packages/mtr.html
mtr -r [IP地址/域名]  # 以报告模式显示：从我的主机到目标主机经过的路由节点以及到各节点数据包的丢包率和ping命令的最短/最长时间和标准偏差。 
# mtr 详细：https://meiriyitie.com/2015/05/26/diagnosing-network-issues-with-mtr/

alias # 查看系统里别名
w / who # 列出当前登录的所有用户
whoami # 显示当前正进行操作的用户名
tty # 显示终端或伪终端的名称
last # 查看系统最后登录
date # 显示系统的当前日期和时间
say hello world  # 说话
```

### curl
与服务器交互数据的工具，支持 http,https,ftp,ftps,telnet 等多种协议，常被用来抓取网页和监控Web服务器状态。
[命令详解](http://aiezu.com/article/linux_curl_command.html)

```sh
格式：curl [-i带header | -I只输出header ] [URL...] 

curl https://twitter.com/  # 直接打印内容
curl 'https://api.github.com/user/repos?page=2&per_page=100'  # 有特殊字符需要用引号包裹

curl https://www.baidu.com -o xx.html  # 下载页面到 xx.html 里
# 下载文件并显示简单进度条
curl -# -o centos6.8.iso http://mirrors.aliyun.com/centos/6.8/isos/x86_64/CentOS-6.8-x86_64-minimal.iso
# 断点续传：继续完成上次终止的未完成的下载
curl -# -o centos6.8.iso -C - http://mirrors.aliyun.com/centos/6.8/isos/x86_64/CentOS-6.8-x86_64-minimal.iso

curl https://api.github.com?callback=foo   # jsonp
curl -i "https://api.github.com/repos/vmg/redcarpet/issues?state=closed"  # 输出 header + 内容
curl -i https://api.github.com -H "Origin: http://example.com"  # 设置 CORS
```

### grep
grep是根据文件的内容进行查找，会对文件的每一行按照给定的模式(patter)进行匹配查找。  
[介绍](http://www.cnblogs.com/peida/archive/2012/12/17/2821195.html)

格式：grep [-r递归 -n行号 -i忽略大小写 -I忽略二进制文件] 搜索字符串/正则表达式 [filename]

```sh
grep pattern *   # 搜索 当前目录 的所有文件内容
grep pattern *.doc       # 搜索当前目录下doc文档
grep -rn pattern *   # 搜索 当前目录及子目录 的所有文件内容
grep '^[^48]' data.doc      # 不匹配行首是48的行

grep -r --include=\*.{cpp,h} pattern rootdir
grep -ir --include="*.js" pattern *

grep -r --exclude-dir=node_modules pattern /path/to/search
grep -r --exclude-dir=node_modules --exclude-dir=dev pattern /path/to/search
grep -rI --exclude-dir="\.svn" "pattern" *   # 忽略二进制文件和svn隐藏目录

grep -r --color --exclude-dir={custom,lib,scripts} --exclude={*.xml,error_log} "beta" *

cat test.txt | grep ^u   # 找出以u开头的行内容
cat test.txt | grep hat$  # 输出以hat结尾的行内容
cat test.txt | grep -E "ed|at"  # 显示包含ed或者at字符的内容行
cat test.txt | grep -f test2.txt  # 从文件中（test2.txt）读取关键词进行搜索
```

### find
find命令是根据文件的属性进行查找，如文件名，文件大小，所有者，所属组，是否为空，访问时间，修改时间等。

```sh
find / -name httpd.conf　　#在根目录下查找文件httpd.conf，表示在整个硬盘查找
find /etc -name httpd.conf　　#在/etc目录下文件httpd.conf
find . -name '*srm*' 　　#表示当前目录下查找文件名中含有字符串‘srm’的文件

find / -amin -10 　　# 查找在系统中最后10分钟访问的文件(access time)
find / -mmin -5 　　# 查找在系统中最后5分钟里修改过的文件(modify time)
find / -size -1000k 　　#查找出小于1000KB的文件

find . -name '*.DS_Store' -type f -delete   # 删除某目录及子目录下的 .DS_Store 文件
```

### 其他常用命令

```sh
top  # 统计进程状态，和 Mac 的 活动监视器 功能类似
brew install htop  # top 高级版，支持鼠标点击、方向键切换
```

# linux 学习

Unix遵循的原则是KISS（Keep it simple, stupid）。do one thing and do it well。

Linux分为内核版、发行版。比较常用的发行版有 redhat、ubuntu 等。
服务器端大多使用 redhat\centos，没有图形界面，因为图形界面占用更多系统资源，造成不稳定，被攻击的可能性更大。

- Linux严格区分大小写。
- Linux所有内容以文件形式保存，包括硬件。如：键盘 /dev/stdin  显示器 /dev/stdout
- Linux不靠扩展名区分文件类型，靠权限区分。（.gz .tgz .sh等文件扩展名只是为了方便管理员查看）

shell是一个命令行解释器。shell是壳，kernel 是内核。shell把用户敲进去的命令、翻译为 linux 内核能识别的语言。
linux下有些命令是shell自带的，有些命令是别人写好装进来的(如ls)，用 whereis ls 来区别。

- sh : Bourne Shell 的缩写，可以说是目前所有 Shell 的祖先。
- bash : Bourne Again Shell 的缩写，是 sh 的一个进阶版本。

bash 是目前大多数 Linux 发行版和苹果的 Mac OS X 操作系统的默认 Shell。需要重点学习！
[bash-guide](https://github.com/Idnan/bash-guide)

```sh
echo $PATH  # 查看PATH环境变量
echo $SHELL
# 如果输出的是：csh或者是tcsh，那么你用的就是C Shell。
# 如果输出的是：bash，sh，zsh，那么你的用的可能就是Bourne Shell的一个变种。

NODE_ENV='PRODUCTION' gulp build   # 设置并运行
env / printenv JAVA_HOME  # 打印环境变量

>  >>  &>  &>>  2>&1  # 输出重定向
&> 文件    # 正确和错误的输出都保存到同一个文件中
> 文件 2>&1   # 正确和错误的输出都保存到同一个文件中
> 文件1 2>文件2  # 正确的输出放到文件1，错误的输出放到文件2

> file.txt  # 创建一个空文件，比 touch 短
cat error.txt >> acc.txt  # 把 error.txt 文件内容输出到 acc.txt 文件中

# 管道符：
;   # 几个命令并行执行，不管有无报错
&&   # 几个命令依次执行，报错就停止
||   # 前一条命令报错，后一条命令才会执行，否则不执行。 如：ls && echo yes || echo no
|   # 管道符，很重要

# shell 变量声明：
变量名=变量值 (等号前后不能有空格)
echo $变量名
# shell 变量叠加：
x=123
x="$x"456  (或 x=${x}456)
echo $x

$n $* $@ $#    # 位置参数变量
$? $$ $!   # 预定义变量

符号：单引号、双引号、反引号、$()、$、#、\
通配符、正则表达式 是不同的东西。正则是包含匹配，通配符是完全匹配。正则匹配文件内容字符串，通配符匹配文件名。

```

如果文件开头的 shebang 为 `#!/bin/bash` 会使用 bash 执行命令，而不管系统默认的 shell 是否为 bash。
如果你没有写 shebang，那么此脚本文件会被用户当前的 Shell 所执行。
在 zsh 的 terminal 里运行 bash 脚本，可能有兼容问题，需要用 `emulate bash/sh` 切换为仿真模式。

[mac-shell 介绍](http://ntop001.github.io/2015/06/06/mac-shell/)、
[Zsh 和 Bash 的不同](https://xshell.net/shell/bash_zsh.html)

[Execute combine multiple linux commands in one line](http://stackoverflow.com/questions/13077241/execute-combine-multiple-linux-commands-in-one-line)

[SSH原理与运用](http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)、  
[ssh密码登陆](http://superuser.com/questions/655582/how-to-ssh-with-username-and-password-linux)、
[ssh密码登陆1](http://stackoverflow.com/questions/4780893/use-expect-in-bash-script-to-provide-password-to-ssh-command)、  
[expect-inside-a-bash-script](http://stackoverflow.com/questions/15133474/how-to-use-expect-inside-a-bash-script)

挂载就是把目录和盘符连接在一起的过程。挂载命令：mount 。
.tar.gz格式是先打包为.tar格式，再压缩为.gz格式。

### 应用示例

```sh
#! /bin/sh

node -v
npm -v
ping -c 5 taobao.com

echo "进行 xx 操作 \n\r" \
&& cd ~/my/work/project/xx \
&& spm build && spm deploy \

echo "进行 xx 操作 \n\r" \
&& cd ~/my/work/daily/project \
&& svn st  \

echo "登陆服务器，进行 ccupdate 操作" \
# 对引号进行转义
expect -c "spawn ssh admin@partnerprod.d4366aqcn.xx.net
expect \"password:\"
send \"password22\r\"
send \"cd ccbin && ./ccupdate.sh \n\"
interact "
```


# Windows Dos

`.bat`是 dos 下的批处理文件。`.cmd`是nt内核命令行环境的另一种批处理文件。

cmd 里操作技巧：

- 鼠标选择需要复制的部分，右键选中则会自动复制。
- 拖拽文件 到命令提示符中，完整的文件路径也就输入了。

```sh
命令帮助 /? 例如：md /? ，for /?
常用命令: dir / copy

# 读取文件：
type [drive:][path]filename

# 创建文件：
echo ... > A.txt    # 重定向输出，此时创建文本文件A.txt;
echo ... >> A.txt   # 向A.txt文件中追加信息...

# 删除文件：
del [C:][path]filename.ext  
del *.txt # 采用通配符

# 创建 删除 目录
mkdir/md a\b\c  
rmdir/rd /q/s a (/q静默模式，不提示是否删除，可以不要)

@echo off
ping www.taobao.com
ipconfig
pause & exit

# chcp命令
chcp 65001  # 换成UTF-8代码页
chcp 936 # 可以换回默认的GBK

# 环境变量
set  # 查看当前可用的所有环境变量（=系统变量+用户变量）
set PATH  # 查看某个环境变量，如PATH
set xxx=aa  # 添加环境变量，如xxx=aa
set PATH=%PATH%;d:\xxx  # 在某个环境变量（如PATH）后添加新的值（如d:\xxx）

# 有两个环境变量可以跟当前路径有关，一个是%cd%, 一个是%~dp0
echo %cd%  # %cd% 可用在 批处理文件中 或 命令行中，其内容为命令的执行路径或批处理文件的执行路径
%0  # 代指批处理文件自身  
%~d0   # 是指批处理所在的盘符  
%~dp0   # 是盘符加路径，只可以用在批处理文件中，由它所在的批处理文件的目录位置决定
cd %~dp0  # 进入批处理所在目录
```
