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
  
