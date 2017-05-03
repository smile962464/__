
# less

```less
// Parent Selectors ：&
.button {
  &-ok {
    background-image: url("ok.png");
  }
  &-cancel {
    background-image: url("cancel.png");
  }
}
.grand {
  .parent {
    & > & {
      color: red;
    }
    & & {
      color: green;
    }
    && {
      color: blue;
    }
    &, &ish {
      color: cyan;
    }
  }
}

// Loops
.loop(@counter) when (@counter > 0) {
  .loop((@counter - 1));    // next iteration
  width: (10px * @counter); // code for each iteration
}
div {
  .loop(5); // launch the loop
}
```


# markdown 语法

标题（h1~h6）格式为使用相应个数的“#”作前缀

输入代码段用 pre 标签包裹

行末加两个或多个空格才是真正的换行 br 标签。空一行（两个回车）分段生成 p 标签

> 引用的内容. 这个记号直接借鉴的邮件标准

使用“*”“+”“-”来表示无序列表；使用数字加“.”表示有序列表。如：

- hello
* 你好
+ 你好

1. 序列1
2. 序列2

使用 [test](http://example.net "optional title") 来标记普通链接。

使用 ![img](http://gtms01.alicdn.com/tps/i1/T11B6MXXlkXXabMDcr-640-300.jpg_60x60.jpg "optional title") 来标记图片。链接可以使用相对路径。

使用 * 或 _ 包裹文本产生strong效果：__strong__ **strong**

#### 表格
| Item      |    Value | Qty  |
| :-------- | --------:| :--: |
| Computer  | 1600 USD |  5   |
| Phone     |   12 USD |  12  |

### html details

<details>
  <summary>Is this production ready?</summary>
  Next.js has been powering `https://zeit.co` since its inception.
</details>
<details>
  <summary>Is this production ready?</summary>
  Next.js has been powering `https://zeit.co` since its inception.
</details>


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


# dos

`.bat`是dos下的批处理文件。`.cmd`是nt内核命令行环境的另一种批处理文件。

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
