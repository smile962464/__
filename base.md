
# 页面
## 架构
### MVC
- Model
    - model里存放的是「需要持久化的数据」(DO, domain object)，而不是页面显示用的临时数据（VO, view object / ui state）。
    - model里可以包含对Ajax请求参数的组装、处理；如果返回数据也需要统一处理，可以写相应的统一处理函数？
    - 公共model抽取出来放一个地方；不同页面特有的model邻近相应view放置
    - model是否是singleton的？使用时需不需要new ？
- View
    - 页面全部组件化（参考react组件化思路）
        - 抽象出组件的方式尽量简单（react比angular组件简单）
        - 需要复用的代码片段、抽象成组件（哪怕仅是两三行代码，但需要到处复用）-- 小组件
- controller
    - 内容应尽量少，在controller里设置页面显示用的运行时数据（VO, view object / ui state），持久化的数据从model里获取。
    - Any time you need to store information only for the lifetime of this application run, you should store it on a controller.

#### 不同的设计思路：
fat model, skinny controller. the model should do the heavy lifting are:

- Validation in the case of CRUD functionality and post methods.
- Type-conversions and data manipulation.
- Storing data in memory or in HTML5 databases to minimize server hits.

The server-side code mainly does model manipulation and notifications, and so having a fat model/thin controllers makes sense. The controller is essentially the router to the model.

在 react.js 的 flux 等架构中，是不建议使用「fat model」的。[model使用](https://medium.com/swlh/the-case-for-flux-379b7d1982c6)

## SPA
### 注意点
- 页面上发出了Ajax请求，要等比较久时间才返回，返回成败都有弹框，但在返回结果之前「跳走」，页面跳转后弹窗是否还会有？
- 页面的边界测试：如数据量特别大时
- 切换路由后会把上个路由状态生成的html全部销毁掉，再切回来恢复不到原来的样子。问题场景如：列表页由许多查询条件组合查询出来，点击列表里某个条目进入详情，再返回到列表页，就需要手动再查询出列表。更好的是恢复上次查询生成的列表html，再更好要保持原来的滚动条位置，完全恢复现场，不会打断用户继续浏览列表。（切走之前保存查询条件、切回来再重新查询，不是个好办法，不能完全恢复之前状态）

### SPA 实现原理
- 如果浏览器支持 history API，使用 pjax (pushState + Ajax)
    - 点击一个链接，通过 Ajax 获取页面部分区域数据（向服务器发送一个有PJAX标志(设置在header里)的请求，服务器返回一段相应的html片段）
    - 通过 pushState 修改 URL 和 document.title，并把服务器返回的htm片段插入页面。
    - Github上的文件/目录跳转加载，就是采用 pjax 的方式实现的。
- 如果浏览器不支持 history API，使用 hash 如 http://example.com#word
    - 浏览器会把不同的 hash 记录到历史记录中，但需要监听 hash 值的变化。
    - 对于支持 onhashchange 的浏览器，监听此事件；不支持的则要定时去判断hash的变化。

--------


# 组件设计
- [javascript组件化](http://purplebamboo.github.io/2015/03/16/javascript-component/)
    - 设计一个组件类（如 function TreeView(){ } ）
    - 设置组件类的配置项或属性（ function TreeView(config){ this.cfg = extend({}, config) } ）
        - 组件的属性，只能通过方法来访问。
        - 组件的属性value change后组件自动映射变化。
    - 组件类上附加组件方法（ TreeView.prototype.xx = function (){ } ）
    - 为组件添加自定义事件
        - mixin进来带有on/off/fire等方法的事件系统，为组件级别添加事件，屏蔽底层的dom事件，方便组件的使用！
    - 抽出Widget抽象类，作用是为ui组件提供统一的接口名，统一生命周期管理
    - 组件使用方式：new出组件实例使用

- [Backbone View 之间通信的三种方式](http://www.geekplux.com/2015/07/04/communicating-between-views-in-backbone.html)
- [如何实现一个mvvm组件](http://shepherdwind.com/2014/05/17/how-to-reliaze-mvvm--bidi/)
- [框架性能关注点](http://www.zhihu.com/question/31809713/answer/53544875)

## 工程化
组件库，业务库是两个仓库。业务代码里引用“已发布的”组件库cdn地址。
但组件发到CDN上需要时间，业务代码里也需要更改新版本号才生效。这个发布时间可能比较短，但仍然不可接受。
为什么？因为很多组件bug，只能(或很方便)在业务里复现，需要立即修改组件并验证。
这时候再等组件发到cdn这一套流程太久！

## 具体组件
### form及验证
- form要支持只使用“键盘完成”，按enter键要能触发表单提交，使用type="submit"
- 声明式的「验证规则、错误提示」设置
- 动态设定错误提示 （如，Ajax返回后根据错误码手动设置错误提示）
- 可以自定义错误触发条件
    - 如required验证对于文本框默认为空时触发，对于“多选框”验证时，需要验证选择后的数据数组长度是否为零时触发，与文本框不同。
- 参考ng里针对`ng-model="xx"`绑定的xx数据进行验证，校验结果自动反馈到相应dom上。

验证方式：
以js对象的验证为主，把dom上的值附加进来，如[validate.js](https://github.com/ansman/validate.js)

### tabs - tab
- API：selected | on-select | on-deselect
- tab切换后，前一个页面的Ajax请求还没完成，要不要abort掉？

### modal
- 弹出框允许放到某个内层元素里，或者body元素下
- 在body下时，都append到body末尾闭合处，而不是在body标签开始处
- 背景层backdrop/mask，有的直接放在body下和modal框平级，有的放到modal-container里边(感觉更好)

### 其他组件
> [元素定位](https://github.com/HubSpot/tether)

- 弹窗类、展开收起类组件，处于页面底部时，展开后，不能全部出现在可视区域，需要改变滚动条位置。
- Datepicker、timepicker 注意能合到一起使用的情况（最好看起来是无缝整合），也要能分开使用
    - 业务中常见：搜索当天的东西，从00:00:00到23:59:59
- select组件：支持Infinite scroll
- modal等弹窗类组件，必须有`destroy`方法。应用场景：普通按钮，列表
- pagination组件，如图![](https://t.alipayobjects.com/images/rmsweb/T1OIlhXmVcXXXXXXXX.png)
  如果数据总数50万+时，每页显示5个页码，下拉框就会有10万条目，导致页面dom数过大，浏览器崩溃。
- 图表组件，给出`destroy`方法，并测试是否有内存泄露(多操作或刷新几次页面是否卡顿)。
    - 图表纵坐标根据数据自动生成，要满足业务对生成数据的特殊要求，如：不能有负值；只能是整数值(不能是小数)
- upload组件，添加了不允许上传的文件类型，给出错误提示。

## 设计原则：
### 职责清晰
- 组件的每个模块，分别该承担哪些功能？
- 多个组件/模块协同完成一件事情，而不是一个组件替其他组件完成本该它自己完成的事情

### 开放与封闭
- 哪些设置，应该开放？应该封闭？
    - 属性配置等API对外开放；组件内部dom及状态的更改、对外封闭
- 高内聚、低耦合
    - 组件内部通过callback方式直接调用，组件与组件之间通过发布订阅的模式通信

### 其他
- 尽量避免信息冗余
    - 例如：一个东西能被另一个推导出来，就只使用一个
- api 尽量和已知概念保持一致
    - 例如api命名：聚焦常用命名是focusable，而不是canFocus等自己臆想的名字；还有如onDeselect、
    - api的功能要符合常用、遵循单一职责。例如：active表示活动状态、但不能代替表示selected选中状态。

模块间如果有层级关系的话，父类可调用子类，但子类不要去调用父类的方法？是否正确？

--------


# 反模式
- 过早优化
- 分析瘫痪
    - 过度分析会延缓进展，甚至彻底终止进展。在极端情况下，分析的结果到了要做的时候已经过时了，或者更糟的是，项目或许从来走不出分析阶段。
    - 重点在于迭代和改进。伴随着更多有帮助的、有意义的分析得到的数据，每次迭代都会提供更多的反馈。没有新的数据点，更多的分析将变得越来越让人猜疑。
    - 棘手的地方在于要知道什么时候该从计划、需求收集和设计阶段转移到实施和测试阶段。
- 上帝类
    - 上帝类是控制很多其它类，以及有很多依赖类，也就有更大的责任。
    - 上帝类增长到后期就会变成维护人员的地狱——因为它违反了单一责任原则，它们难以单元测试、调试和记录文档。
- 魔法数和字符串
    - 使用未命名的数字或字符串字面量，而不是在代码里命名为常量。



--------

# 函数式编程
- [函数式编程](http://coolshell.cn/articles/10822.html)
- [函数式编程有哪些优点？](http://www.nowamagic.net/academy/detail/1220540)
- [函数式编程扫盲篇](http://www.cnblogs.com/kym/archive/2011/03/07/1976519.html)
- [函数式编程初探](http://www.ruanyifeng.com/blog/2012/04/functional_programming.html)
- [introduction-functional-javascript](http://www.sitepoint.com/introduction-functional-javascript/)
- [Functional Programming in Javascript === Garbage](http://awardwinningfjords.com/2014/04/21/functional-programming-in-javascript-equals-garbage.html)
    - javascript不适合函数式编程？

对象是面向对象的第一型，那么函数式编程也是一样，函数是函数式编程的第一型。

在纯粹函数式程式语言中，你不是像命令式语言那样命令电脑「要做什么」，而是通过用函数来描述出问题「是什么」。递回在 Haskell 中非常重要。命令式语言要求你提供求解的步骤，Haskell 则倾向于让你提供问题的描述。这便是 Haskell 没有 while 或 for 循环的原因，递回是我们的替代方案。

在面向对象编程中，我们把对象传来传去，那在函数式编程中，我们要做的是把函数传来传去，而这个，说成术语，我们把他叫做 **高阶函数**

在函数式编程中，函数是基本单位，是第一型，他几乎被用作一切，包括最简单的计算，甚至连变量都被计算所取代。在函数式编程中，变量只是一个名称，而不是一个存储单元，这是函数式编程与传统的命令式编程最典型的不同之处。


## Persistent data structure

- [Immutability in JavaScript](http://www.sitepoint.com/immutability-javascript/)
- [Persistent_data_structure](https://en.wikipedia.org/wiki/Persistent_data_structure)

> fb出品的[immutable-js](http://facebook.github.io/immutable-js/)提供了Immutable的List, Stack, Map等数据结构，
为了实现不可变性，最直接的做法可能是直接拷贝对象，但因为效率太低不可行，而是利用了structural sharing，
这样就可以最小化的拷贝对象的一部分。拷贝的是哪一部分呢？如图：
![](https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Purely_functional_tree_after.svg/876px-Purely_functional_tree_after.svg.png)，这样嵌套的深层对象，只需拷贝f、g、d这一个链，其他的结构共享，这样创建了一个新对象，
就达到了immutable的目的，而且效率和内存占用都比较合理。但注意一个问题[Circular references](https://github.com/facebook/immutable-js/issues/259)，这个问题在Haskell等语言中在语言层面被解决了，
但在js中似乎难以解决。[详解视频](https://www.youtube.com/watch?v=I7IdS-PbEgI)

> Structural sharing is a powerful concept, and is what enables Clojure persistent data structures to achieve O(log n) performance on operations that would otherwise require full O(n) copies of a data structure.  It turns out that you can also achieve effective structural sharing of mutable data structures if they are structurally immutable. Effectively you get opportunity to realise the same O(log n) performance for operations that produce mutable views.

应用实例：
```html
<list>
  <item></item>
  <item></item>
</list>
```
item由list的数据生成，由于immutable两者之后的state变化互不影响，但变化后两者数据状态需要同步。
同步操作也是产生新的数据，似乎比较乱？
