

## API 设计
[Apollo Data Stack](http://docs.apollostack.com/)、
[How to build a GraphQL server](https://medium.com/apollo-stack/tutorial-building-a-graphql-server-cddaa023c035#.gdvn0fb8v)

[Swagger 及 API 管理](https://www.linkedin.com/pulse/swagger-%E5%8F%8A-api-%E7%AE%A1%E7%90%86%E7%AE%80%E4%BB%8B-minglei-tu)

There are some important differences between the two though:

- Falcor returns Observables, GraphQL just values. For how Netflix wanted to use Falcor, this makes a lot of sense for them. They make multiple requests and present data as it's ready, but it also means that the client developer has to work with the Observables directly. GraphQL is a request/response model, and returns back JSON, which is trivially easy to then use. Relay adds back in some of the dynamicism that Falcor presents while maintaining only using plain values.
- Type system. GraphQL is defined in terms of a type system, and that's allowed us to built lots of interesting tools like GraphiQL, code generators, error detection, etc. Falcor is much more dynamic, which is valuable in its own right but limits the ability to do this kind of thing.
- Network usage. GraphQL was originally designed for operating Facebook's news feed on low end devices on even lower end networks, so it goes to great lengths to allow you to declare everything you need in a single network request in order to minimize latency. Falcor, on the other hand, often performs multiple round trips to collect additional data. This is really just a tradeoff between the simplicity of the system and the control of the network. For Netflix, they also deal with very low end devices (e.g. Roku stick) but the assumption is the network will be good enough to stream video.

### [Falcor](http://netflix.github.io/falcor/)
- [Demand driven architecture（CQRS/Falcor）](http://www.javacodegeeks.com/2015/10/transcending-rest-and-rpc.html)
- rpc优却点：低延迟，数据量小；不可缓存(手动管理)，紧耦合
- rest优却点：可缓存，松耦合；高延迟，数据量大
- 两者结合:
    - one model everywhere
    - The data is the API
- You can convert any JSON object into a JSON Graph in two steps:
    - Move all objects to a unique location within the JSON object
    - Replace all other occurrences of the object with a Reference to that object’s unique location

- 他希望编写优雅、易读的代码。在用户界面上查找和修改数据要直观，最好是开发者只需要考虑自己的数据模型，而不用关心可用的API端点。
- 他希望可以消除由传统REST API所导致的不必要的请求和响应开销。
- 他还希望用一种更好的方法取代难以维护和改进的传统REST API。

### [GraphQL](https://github.com/facebook/graphql)
GraphQL is Facebook's [graph API](https://developers.facebook.com/docs/graph-api)
（[How to get lots of data from the Facebook Graph API with just one request - Optimizing request queries to the Facebook Graph API](https://www.sammyk.me/optimizing-request-queries-to-the-facebook-graph-api)）。
[基于 GraphQL 的产品](https://www.reindex.io/)。

- [GraphQL is the King. Long Live the King!](https://medium.com/@scbarrus/graphql-is-the-king-long-live-the-king-r-i-p-rest-cf04ce38f6c#.avmpteg2j)
- [Introducing Relay and GraphQL译](http://segmentfault.com/a/1190000002570887)
- [文档](http://graphql.org/docs/getting-started/)、
[graphql-js](https://github.com/graphql/graphql-js)
- [From REST to GraphQL](https://blog.jacobwgillespie.com/from-rest-to-graphql-b4e95e94c26b#.e3re515s5)
- [From REST to GraphQL-](https://news.ycombinator.com/item?id=10365555)

GraphQL is essentially the one [API Gateway](http://microservices.io/patterns/apigateway.html) to rule them all. And then you add Relay on top of it to build up the exact query you want.

- GraphQL Returns Only the Data You Request. 请求什么返回什么
- GraphQL Returns Data in the Same Shape You Requested It. 返回的数据结构和请求结构一致
- GraphQL Sends a Single Request to the API and Returns a Single Response. 把同时发出的多个请求合并为一个，返回一个请求结果集合，并自动拆分到不同的组件里


------



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

## tree 组件
实现功能：节点展开收起、单选/多选、checkbox、异步加载、右键菜单、节点增删改查、节点拖动。

- 根据用户设置的 checkedKeys（e.g.['key1', 'key2']）遍历所有节点，设置各级节点的「选中/半选/不选」状态。
    - 某节点设置checked，其子节点都要checked。
    - 再根据兄弟节点的check状态，循环设置父级节点的check状态。
- 根据用户设置的 expandedKeys（e.g.['key1', 'key2']）遍历节点，设置节点的 expand 状态。
    - 子节点设置expand，循环设置父节点也要expand。
    - 但点击父节点，子节点expand状态不能变。

### 拖动
- 在touchstart中记录起始位置，并开始监听touchmove和touchend
- 在touchmove中计算当前位置和起始位置之间的offset，并进行拖拽操作
- 在touchend中取消监听touchmove和touchstart，并进行释放操作


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

- grid 组件与 table 组件区别
    - grid（[datagrid](https://github.com/zippyui/react-datagrid)），使用div不用table/tr/td，支持可变列数、筛选、排序、列宽度拖动改变、单选多选、分页、行列单元格自定义样式。
    - table 组件，使用table/tr/td，用于简单表格展示。
- notify、message 类的组件应该区分成两类。
    - 一类：点击某个按钮，或操作成功失败时，页面某个位置出现的弹出框。（例如顶部或右上角弹出的通知）
    - 二类：页面最顶部固定的一行横通知条。（例如系统维护通知）
- 弹窗类、展开收起类组件，处于页面底部时，展开后，不能全部出现在可视区域，需要改变滚动条位置。
- datepicker、timepicker 注意能合到一起使用的情况（最好看起来是无缝整合），也要能分开使用。
    - timepicker 搜索当天，从00:00:00到23:59:59；限定可以选择的时间范围，最小时间、最大时间(例如最小时间是now，最大时间如果不设置、那默认是多少?)
    - datepicker、timepicker 共用一个时间点时，之间的影响（例如datepicker选完日期，可能会重置时间为00:00，影响timepicker，怎么处理?）
- select组件：支持Infinite scroll
- modal等弹窗类组件，必须有`destroy`方法。应用场景：普通按钮，列表
- pagination组件，如图![](https://t.alipayobjects.com/images/rmsweb/T1OIlhXmVcXXXXXXXX.png)
  如果数据总数50万+时，每页显示5个页码，下拉框就会有10万条目，导致页面dom数过大，浏览器崩溃。
- 图表组件，给出`destroy`方法，并测试是否有内存泄露(多操作或刷新几次页面是否卡顿)。
    - 图表纵坐标根据数据自动生成，要满足业务对生成数据的特殊要求，如：不能有负值；只能是整数值(不能是小数)
- upload组件，添加了不允许上传的文件类型，给出错误提示。
- select / tags-input 组件
    - 特殊需求：在 [tags input select](http://react-component.github.io/select/examples/tags.html) 里，想直接输入一串如 `name1,name2,name3,name4,nam5,....` 这样比较长的内容（预先准备好的人员列表），组件自动根据分隔符(例如这里的逗号)，split 出来，然后分别验证这些条目是否合法（如果分别发Ajax将会很多、不可行），再转换为一个个 tag。 这种需求一般是单独做一个「导入」文件或组的功能来实现，但放到 tags-input 组件或 select 组件里，感觉也有一定合理性。 在 select2 的 [Automatic tokenization](https://select2.github.io/examples.html#tokenizer) example 里输入 `red,blue,green,`  这串特定分割的字符串，会自动根据逗号 split 出三个 tag 出来。select2 这个还能输入更多自动保存到选择list里，也不涉及到发Ajax操作。


## 设计原则：
- 职责清晰
    - 组件的每个模块，分别该承担哪些功能？
    - 多个组件/模块协同完成一件事情，而不是一个组件替其他组件完成本该它自己完成的事情
- 开放与封闭
    - 属性配置等API对外开放；组件内部dom及状态的更改、对外封闭
- 高内聚、低耦合
    - 组件内部通过callback方式直接调用，组件与组件之间通过发布订阅的模式通信
- 尽量避免信息冗余
    - 例如：一个东西能被另一个推导出来，就只使用一个
- api 尽量和已知概念保持一致
    - 例如api命名：聚焦常用命名是focusable，而不是canFocus等自己臆想的名字；还有如onDeselect、
    - api的功能要符合常用、遵循单一职责。例如：active表示活动状态、但不能代替表示selected选中状态。

模块间如果有层级关系的话，父类可调用子类，但子类不要去调用父类的方法？是否正确？



--------



------

## MVC
- Model
    - model 里存放的是「需要持久化的数据」(DO, domain object)，而不是页面显示用的临时数据（VO, view object / ui state）。
    - model 里可以包含对Ajax请求参数的组装、处理；如果返回数据也需要统一处理，可以写相应的统一处理函数？
    - 公共 model 抽取出来放一个地方；不同页面特有的 model 邻近相应 view 放置
    - model 是否是 singleton 的？使用时需不需要 new ？
- View
    - 页面全部组件化（参考react组件化思路）
        - 抽象出组件的方式尽量简单（react比angular组件简单）
        - 需要复用的代码片段、抽象成组件（哪怕仅是两三行代码，但需要到处复用）-- 小组件
- controller
    - 内容应尽量少，在 controller 里设置页面显示用的运行时数据（VO, view object / ui state），持久化的数据从model里获取。
    - Any time you need to store information only for the lifetime of this application run, you should store it on a controller.

### model 不同的设计思路：
- [Backbone.Model](http://backbonejs.org/#Model)
- [ember-models](http://guides.emberjs.com/v1.10.0/models/)、[ember-data-model-maker](http://andycrum.github.io/ember-data-model-maker/)

ember-data 处理方式：

- `DS.Model` 用来创建数据模型。定义了需要呈现给用户的数据的属性和行为。
    - 不同模型之间会有关联关系：一对一，一对多，多对多。与后台数据库模型类似。[原文](http://guides.emberjs.com/v1.10.0/models/defining-models/#toc_defining-relationships)、[翻译](https://m.oschina.net/blog/518608)
    - 模型本身没有任何数据；模型只定义了其实例所具有的属性和行为，而这些实例被称为记录。
    - 记录是模型的实例，包含了从服务器端加载而来的数据。应用本身也可以创建新的记录，以及将新记录保存到服务器端。
- `DS.Store` 中心数据仓库，是应用的所有数据的缓存。一般整个应用只有一个 store 生成，负责创建/删除/查找/过滤/定位 `DS.Model` 的实例。
    - 注意，重申下 Model 只是数据的属性和行为，Model 的实例 record 包含具体的数据，由 store 创建存储管理。
- 利用不同的 Adapter 和不同服务端通信，如：HTTP、Websocket 等。

在 react.js 的 flux 等架构中，是不建议使用「fat model」的。[model使用](https://medium.com/swlh/the-case-for-flux-379b7d1982c6)

fat model, skinny controller. the model should do the heavy lifting are:

- Validation in the case of CRUD functionality and post methods.
- Type-conversions and data manipulation.
- Storing data in memory or in HTML5 databases to minimize server hits.

The server-side code mainly does model manipulation and notifications, and so having a fat model/thin controllers makes sense. The controller is essentially the router to the model.

### 业务场景
#### 文章下边的 “like” ：
- 有一个 “like” 按钮。
- 显示前十个喜欢此文章的用户。（对应一个 API）
- 单独一个模块显示喜欢此文章的全部用户，带有分页。（对应另一个 API）
- 点击 “like” 按钮，以上两个区域的数据改变。

这里对于点击了喜欢的用户，需要有个「 model collection」，但是需要一个 model 或者是 两个 ？

> It would be nice if those two lists corresponded to the same model collection, but this means the same model collection needs to be fed from two different API responses. Turns out, 1:1 correspondence between API responses and model objects doesn’t scale!


------

## dom 优化

dom批量更新：dom操作如，1.删除一个元素，2.增加一个元素，3.在增加的元素上改变一个属性。
如果用 dom-api 一步步操作，会导致中间多次的 repaints 和 reflows，这是比较低效耗性能的。
如果放到「虚拟dom」上操作，会把这三个过程最终的结果，一次更新到实际dom树上，只用操作一次实际dom。

react virtual-dom 里一次digest中的diff只需一次，但是会随着ui的复杂度，性能损耗严重，virtual-dom与原dom的对应也更难(如果angular的脏检查的性能取决与watcher的数量，那react则是取决与ui规模)。 virtual-dom的内部结构变化是不可预知的

[React Virtual DOM vs Incremental DOM vs Ember’s Glimmer: Fight](https://auth0.com/blog/2015/11/20/face-off-virtual-dom-vs-incremental-dom-vs-glimmer/)


------

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

### spa 基础问题
- [客户端渲染和服务端渲染，哪个快？](http://www.onebigfluke.com/2015/01/experimentally-verified-why-client-side.html)
    - It depends on what you're doing. If you care about first paint time, server-side rendering wins. If your app needs all of the data on the page before it can do anything, client-side rendering wins.
    - Below 1,000 cats worth of complexity, the client- and server-side rendering approaches have essentially the same time to first paint on both desktop and mobile. Above 1,000 cats worth of complexity, server-side rendering will do first paint faster than client-side rendering. But the client-side rendering approach will always win for last paint time above 1,000 cats.
- [Batching HTTP Requests in Angular to Improve Performance](https://github.com/jonsamwell/angular-http-batcher)
    - HTTP Batching is actual fairly simple as a concept. The idea is to group multiple HTTP requests into a single HTTP call. It basically defines a way to represent a complete HTTP request (headers and all) as a section in a single HTTP POST body.


## 反模式
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
