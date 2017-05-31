
# github

- 搜索 issue 方法：https://help.github.com/articles/searching-issues/
    - 搜索“某repo”里有“某个评论者”参与的包含的“某个词”的 issue： https://github.com/search?utf8=%E2%9C%93&q=xxxx+commenter%3Awarmhug+repo%3Aant-design%2Fant-design-mobile&type=Issues
    - 搜索“某user”里有“某个评论者”参与的包含的“某个词”的 issue： https://github.com/search?utf8=%E2%9C%93&q=xxxx+commenter%3Awarmhug+user%3Aant-design&type=Issues
    - 搜索“某人”创建的在“body”里包含“某个词”的 issue： https://github.com/search?utf8=%E2%9C%93&q=xx+in%3Abody+author%3Awarmhug&type=Issues

# git

> git-tips: https://github.com/git-tips/tips

```sh
如果你需要将自己开发分支上的某个 commit 快速提供给其他人用，但该分支上的其他 commit 不想 push：

git checkout develop 切换到 dev 分支，也可以新建个 feature 分支
git cherry-pick 62ecb3 将目标 commit pick 到 develop 上
cherry-pick 一般用于将 bugfix commit pick 到不同版本上。

git pull -p
git fetch -p (git fetch origin --prune) remove all your local branches which are remotely deleted.

git remote add origin git@xxx.git        加入服务器
git remote -v  列出现有的远程地址
git remote set-url origin xxx 改变远程地址为xxx

git mv --force myfile MyFile  # Mac 下文件名大小写不敏感，这样改文件名

### 回退恢复：

#### working tree (add之前)
use "git checkout -- <file>..." to discard changes in working directory
git checkout .

git clean -df  Remove untracked directories in addition to untracked files.
git clean -xdf 删除所有 .gitignore 里指定的文件或目录，包括新建文件、node_modules 等
git clean -f  删除untracked files（即远程仓库没有这个文件，新加的文件）
git clean -f -n

#### index内的回滚 (commit之前)
git reset
git reset HEAD <file>...  如果已经用add 命令把文件加入stage了，就先需要从stage中撤销
git reset HEAD^    回退所有内容到上一个版本
git reset HEAD^ a.py    回退a.py这个文件的版本到上一个版本  
git reset 057d    回退到某个版本  

#### commit之后的回滚
git reset [--soft 不修改本地文件 | --hard 本地的文件修改都被丢弃]

git reset --soft HEAD^   撤销commit，重新做
git reset --hard 057d    回退到某个版本，注意：本地的文件修改都被丢弃
git reset --hard origin/master   将本地的状态回退到和远程的一样

git checkout HEAD~1 -- file     运行 git merge xx 后，想撤销其中某个文件的merge

$ git branch topic/wip     (1) 新建分支wip
$ git reset --hard HEAD~3  (2) 原分支上把最近三次提交丢弃
$ git checkout topic/wip   (3) 切换到wip分支，继续工作

git reflog       生成某个串，例如98abc5a  
git reset --hard 98abc5a  

git stash                   # 暂存未提交的修改
git stash pop               # 恢复上次未提交的修改  
git stash list              # 列出各个 stash 版本  
git stash apply stash@{1}   # 恢复到某个stash版本
git stash clear / drop <stash@{n}>     # 清除所有或某个stash版本

### submodule

#### 初始化
git submodule add git@mygithost:billboard lib/billboard
git submodule init  
git submodule update  

#### 操作
带有submodule的某个仓库里，其中自己的分支 branch1 合并来自其他分支 branch2 的修改，
发现两个分支的 submodule 的 HEAD 引用不同：
  要使用 branch1（自己原本的），不进行操作
  要使用 branch2 分支的 submodule，运行：`git submodule update`
  如果这两个分支的submodule 引用可能都不是最新、最稳定的；进入submodule目录，运行`git push origin master`拉取submodule稳定版本。
然后`git add [submodule path]`，再推送上去

[submodules增删改](https://chrisjean.com/git-submodules-adding-using-removing-and-updating/)

### log
git log
git log -p -2 显示最近的两次更新
git log --stat 显示文件更改的统计结果

git diff [version1] [version2]  查看版本差异
gitk              查看仓库的各类信息的gui  
gitk --all

### 分支
git branch    列出分支清单（分支前的 * 字符：表示当前所在的分支）  
git branch -v   查看各个分支最后一个提交对象的信息  
git branch -a/-r   查看所有分支 (git clone只会显示master分支)  

git branch xx     新建分支xx  
git checkout xx   切换到分支xx（HEAD指向此分支）  
git checkout -b xx   新建并直接切换到xx分支

git checkout -b xx origin/xx    新建xx分支，并跟踪远程xx分支
git checkout --track origin/xx   新建xx分支，并跟踪远程xx分支

git branch -d xx     删除分支xx
git push origin :xx  删除远程分支xx
git push origin xx:xx  上传我本地的xx分支到远程仓库中去，仍称它为xx分支  
git push origin xx   推送到xx分支

git merge xx  合并xx分支到某分支（例如：合并到主分支，先切到master 再git merge xx）  
git merge --no-ff xx  不执行"快进式合并"（fast-farward merge）
git merge origin/xx   远程上有xx分支，并且git fetch origin，执行此命令，将合并此分支  

### 操作tag
git tag 0.0.1   # 打轻量标签  
git tag -a 0.0.1 -m 'Release version 0.0.1'  # 打标签
git tag [-l]               # 列出全部的tag清單
git push origin v1.5
git push [origin] --tags    # 推送所有标签到服务器  
git tag -d 0.0.1   # 删除本地标签  
git push origin :refs/tags/0.0.1   # 删除远程标签
git checkout tag_name  # 检出标签

### fork & pull request
[pull request](http://www.worldhello.net/gotgithub/04-work-with-others/010-fork-and-pull.html)

1、点击github上要fork的仓库的fork按钮，本地repo会有一份拷贝  
2、clone一份到本地：git clone git@github.com:[your_username]/xxx.git  
3、跟踪原本的仓库：  

    cd xxx
    git remote add upstream git://github.com/[ori_username]/xxx.git  
    git fetch upstream -- 获取原始代码库的更新

4、推送提交

    git push origin master

5、原本仓库更新，获取更新

    git fetch upstream
    git merge upstream/master


### 配置：
git config                # 配置个人信息  
git config --global alias.st status
git config --global color.ui true
git config --global core.ignorecase false  # Make git case sensitive

生成ssh key: ssh-keygen -t rsa -C "your_email@youremail.com"

#### .gitconfig 文件内容示例

    [user]
      name = hualei.hl
      email = hualei.hl@xxx.com
    [alias]
      st = status
      ci = commit
      br = branch
      co = checkout
      df = diff
    [push]
      default = simple

### rebase操作

git rebase --onto <new base-commit> <current base-commit>

开发分支rebase主分支：
git pull --rebase origin master
git rebase --continue
git rebase --abort
git rebase -i  重写历史

### 存取操作：

git pull origin master              # 接收github仓库数据  
git pull === git fetch + git merge
git pull --rebase === git fetch + git rebase

git push -u origin master           # 第一次推送  
git push

### 提交上传：
git add .               加入新文件  
git add -A              加入new delete modify过的文件  
git commit -m "xxx"     提交  
git commit -a           将modify过的文件提交，自动打开编辑器  
git commit -am "xxx"   将modify过的文件提交并注释，不必再用git add  

```


# git实践
### GIT 开发流程及规范

> by 乔花 。感谢

遵循业内比较成熟的 GIT 分支模型，整个概况如下图所示：

![git-model 2x](https://cloud.githubusercontent.com/assets/36899/7315642/015f534c-eaa2-11e4-9882-b7cc7535fb72.png)

图中共有五种分支，这五种分支可分为两大类：

- 只读分支：`master` 和 `develop`，不可直接 commit/push，只能 merge，会长久存在远程仓库中；
- 开发分支：`feature`, `release` 和 `hotfixes`，可以直接 commit/push，不会长久存在远程仓库中。

下面分别介绍这五种分支的使用。

#### master 分支

> 线上部署的分支，是最稳定的，只接受来自 `release` 和 `hotfixes` 的 MR。

#### develop 分支

> 处于开发状态的最新分支，接受来自 `feature` 和 `release` 的 MR。

#### feature 分支

> feature 分支为功能开发分支，一个功能对应一个 feature。

1. 创建 feature 分支：基于最新的 develop 分支创建一个以 `feature-` 为前缀的分支。

    ```
➜ fengdie-web git:(develop) ✗ git pull
Already up-to-date.
➜ fengdie-web git:(develop) ✗ git checkout -b feature-sth
Switched to a new branch 'feature-sth'
```

2. 功能开发过程中，可提交多 commit 。一个 commit 应该是具有原子性的，不要将多个小功能点混杂在一个 commit 中。

3. 开发完成后，需要 rebase 到 develop 的最新状态。

    ```
➜ fengdie-web git:(feature-sth) ✗ git fetch
➜ fengdie-web git:(feature-sth) ✗ git rebase -i origin/develop
```
  - rebase 时，报冲突时需要本地解决好再 push；
  - rebase 时，可对各个 commit 进行合并、调整、修改信息等，具体参考[git-interactive-rebase](https://robots.thoughtbot.com/git-interactive-rebase-squash-amend-rewriting-history)。

4. 保证测试用例全部通过后，提交至远程仓库。

    ```
➜ fengdie-web git:(feature-sth) ✗ git push origin feature-sth
```

5. 在 gitlab 平台上，提 MR 至 develop 分支并 assign 给 CR 者。

  - MR 中，写明功能描述，这样 CR 者就能快速了解这个 feature 做的事情；
  - 关联对应的 issue 及 milestone（如有）；
  - CR 过程中提出的问题修复后，重复上述 2~4 步骤。

6. 待 MR 合并后，删除本地及远程 feature 分支（远程的 feature 分支一般在 MR 时勾选删除）。

    ```
➜ fengdie-web git:(develop) ✗ git branch -d feature-sth
➜ fengdie-web git:(develop) ✗ git push origin :feature-sth
```

#### release 分支

> 当 feature 开发完了，develop 分支代码相对稳定后，需要发布一个版本时，切换到 release 分支。

1. 基于 develop 分支创建一个 `release-` 前缀的分支；
2. 在 release 分支上，可以切一些 `bugfix-` 分支修复一些 bug（最好不要做大改动），改完后提 MR 至对应 release 分支；如果是小改动，可直接在 release 上改完并 push 至远程；
3. 当 release 分支稳定没有问题后，发一个 MR 到 master，并且同时发一个 MR 到 develop 分支；
4. 合并 MR 后，master 可以打一个 tag，标记版本号；
5. 删除 release 分支。

#### hotfixes 分支

> 线上有问题需要紧急修复时，需要在 master 上切分支修复。

1. 基于 master 创建一个 `hotfix-` 前缀的分支；
2. 开发完成并且测试通过后，提一个 MR 到 master，并且同时发一个 MR 到 develop 分支；
3. 合并两个 MR 后，master 可以打一个 tag 做标记；
4. 删除 hotfix 分支。

注意：hotfix 到 develop 分支可能会冲突，需要本地解决，然后提交到远程。

#### 遵循 commit 规范

1. 每个功能点或 bug 务必创建 issue，并在 feature , hotfix 中的 commit 信息中加上 issue 信息，比如：`git commit -m "feat: 支持枚举类型 #210"` 。相关的 MR 描述中，也可以关联 issue，比如 ` closes #214, #215` ，当合并 MR 时，可以自动关闭关联的 issue；

2. commit 信息尽量 `见名知意`，可遵循 [Google 的规范](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit)，比如：

    ```
git commit -m "feat(schema): 支持枚举类型 #210"    <- 表明是属于 schema 模块的功能点
git commit -m "chore(style): 修复文字换行问题 #213" <- 表明是针对样式的修复
git commit -m "fix: closes #222"                 <- 表明是修复 #222 的一个 bug
git commit -m "refactor(activity): ..."          <- 表明是针对活动的一些重构
git commit -m "docs: 说明如何支持枚举类型"           <- 表明是文档相关的 commit
git commit -m "test: remove only"                <- 表明是修复测试用例的 commit
```


### milestone 和 issue 的一些约定

#### milestone

> milestone 分为项目及日常迭代。一个项目或迭代对应一个 milestone。

- 命名格式：``功能特征-版本``
    - 功能特征：一段简明概要的描述，表明这个 milestone 主要完成的目标是什么。
    - 版本信息，一个小约定：
        - 两位版本号为项目发布
        - 三位版本号为日常小迭代和 bugfix 类的发布
    - 比如 ``区块数据-v2.1``，``编辑功能优化-v2.1.1``
- 创建 milestone 时必须明确发布时间。

#### issue

> issue 分为开发任务和非开发任务。

- 开发任务的 issue ，一般都已经明确目标
  - 命名格式：``[功能模块]功能描述`` 功能模块表明这个 issue 是属于哪个模块，比如：``[activity]某个模板开发``
  - 按照 1-2人/日 粒度划分
  - 必须关联一个 milestone
  - 明确 assign 给开发者

- 非开发任务的 issue，比如：需求、讨论、方案、系分
  - 标题应保持一句话，尽量 ``见名知意``
  - 描述中可详细展开说明，适当附图
  - 需要他人一起讨论的，可以 ``cc @翰文`` 指定

- 每个 issue 看情况加上 labels，labels 类型：

    ![Snip20151016_29](http://024028.oss-cn-hangzhou-zmf.aliyuncs.com/uploads/fengdie/fengdie-web/2483775ac8f9f7f113f3611cabe3ffbc/Snip20151016_29.png)

    - ``BUG`` 缺陷
    - ``IMPROVEMENT`` 功能优化点
    - ``TODO`` 待排需求，已明确功能，但还没排期开工
    - ``需求``、``议题`` 待讨论的需求和议题。为避免周会中重复讨论，这两类的 issue 在讨论明确后，删除此标记，下次周会就不需要讨论了
    - ``文档`` 包含使用说明、发布日志、项目系分，后续可以移入 wiki
    - 其他特定主题也可归类，如 ``会议纪要``、``大促``、``双周报``




# svn 常用操作

> `svn checkout xxx`切换分支后、但目录里有上个分支的空文件夹？因为里边有`.DS_Store`文件未被删除，需要将其删除。

* svn checkout/co path（path是服务器上的目录）

* svn status/st path（目录下的文件和子目录的状态，正常状态不显示）
    - "!"：本地执行了删除，但是未执行“svn del”的状态。
    - "?"：本地新加了一个文件，但是未执行“svn add”的状态。
    - "A"：本地新加了一个文件，且执行了“svn add”的状态。
    - "X"：执行了“svn external”的状态。
    - "D"：本地执行了删除，且执行了“svn del”的状态。
    - "M"：本地修改了该文件时的状态。
    - "K"：被锁定
    - "C"表示：冲突状态，是重点关注状态之一。产生的场景：A\B 两个开发修改同一
处代码，其中 A 开发已经提交，B 开发在 svn up 的时候，就会出现 conflict 的提
示，需要在解决冲突后，再 svn resolved 下

* svn log/info path
* svn log main.cpp --limit 4   只显示最近4条log信息

* svn list/ls path 显示path目录下的所有属于版本库的文件和目录
* svn blame file --force
* svn diff [文件]：查看你修改了哪些代码（相对于服务器上分支的最新版本）

* svn add *
* svn add file/*/*.php(添加当前目录下所有的php文件)

* svn update/up 如果后面没有目录，默认将当前目录以及子目录下的所有文件都更新到最新版
* svn delete svn://192.168.1.1/pro/domain/test.php -m “delete test file”
* svn del xxx     删除文件：

* svn commit/ci -m “xxx” file   无file时提交当前目录所有文件

svn merge：合并分支，将老的修改合并到最新拉出的分支。
    - svn log –-stop-on-copy
http://svn.alibaba-inc.com/repos/ali_cn/olps/trading/branches/2010090
7_3591_8
    - svn merge --dry-run -r257834:HEAD
http://svn.alibaba-inc.com/repos/ali_cn/olps/trading/branches/2010082
3_lihongxiao_test


## 代码回滚
### 代码没有被提交（没commit）
* svn revert file   回退某文件
* svn revert -R dir  回退某个目录及其子目录（Recursive,递归）

### 改动已经被提交（commit）
1. svn up -- 拿到最新版本号
2. svn log [something] -- 找到要回滚的版本号
3. svn merge -r 新修订版序号:旧修订版序号 your_file_path  -- 回滚到旧版本代码
4. svn commit -m “恢复到某修订版（某修订版作废）”  -- 提交代码


## 解决冲突（合并别人的修改）

    操作：
    1. svn up/update
    2. 修改文件，解决冲突
    3. svn resolved file

    示例：
    $ svn update
    C  sandwich.txt   //冲突文件
    Updated to revision 2.

    $ ls sandwich.*
    sandwich.txt  sandwich.txt.mine  sandwich.txt.r2  sandwich.txt.r1

    只是希望取消你的修改，你可以仅仅拷贝Subversion为你生成的文件替换你的工作拷贝
    $ cp sandwich.txt.r2 sandwich.txt
    $ svn resolved sandwich.txt

    你决定取消自己的修改并且重新编辑，你可以恢复你的修改
    $ svn revert sandwich.txt
    Reverted 'sandwich.txt'
    $ ls sandwich.*
    sandwich.txt
    当你恢复一个冲突的文件时，不需要再运行svn resolved

[svn忽略文件/文件夹](http://huanyue.iteye.com/blog/750108)
