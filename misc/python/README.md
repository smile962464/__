# python


## Usage

```sh
python -m SimpleHTTPServer 3435  # Python 启动服务器

```

## Install

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

sudo easy_install pip
sudo pip install virtualenv virtualenvwrapper  # 虚拟环境工具
```

## 其他

[macOS Sierra 安装 opencv 最简单方法](http://www.pyimagesearch.com/2016/12/19/install-opencv-3-on-macos-with-homebrew-the-easy-way/) 
