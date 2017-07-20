
# 各种

you can't bind to ports <1024 if you are not root. 想要起 http://localhost 这样的默认 80 端口服务器，就需要系统自带的 Apache 设置，其他 

[正向代理与反向代理有什么区别](http://mp.weixin.qq.com/s/ikrI3rmSYs83wdSWqq2QIg)

## Go

编程哲学的重塑是Go语言独树一帜的根本原因，其它语言仍难以摆脱OOP或函数式编程的烙印，只有Go完全放弃了这些，
对编程范式重新思考，对热门的面向对象编程提供极度简约但却完备的支持。
Go是互联网时代的C语言，不仅会制霸云计算，10年内将会制霸整个IT领域。 


# 云计算
个人觉得云计算最大的好处是“高可扩展性/可伸缩性”，而“性能”和“高可用性”不一定是最好的。
传统系统中，工程师最基本的能力也要让系统能做到“水平扩展”，即通过加机器能应对流量暴涨，但也要尽量节约机器成本。

性能和扩展性

- 什么是性能问题？ 如果你的系统对于一个用户访问还很慢，那就是性能问题；
- 什么是扩展性问题？ 如果你的系统对一个用户来说是快的，但是在用户不断增长的高访问量下就慢了。

MapReduce 是一种分布式的程序设计模型，专门用来在集群里处理大量的数据。
主要由两部分组成：mapper和reducer。mapper读取一部分数据，运算后输出成一系列的中间（intermediate）数据；
而reducer将mapper的输出数据查核、合并，产生最后输出。

许多语言都可以实现MapReduce，所以有很多不同的实现版本，除了Google自己的版本，还有许多开源的版本，
例如Hadoop、GridGain等，最常被使用的就是Hadoop。Hadoop是以Java实现的，但是可以支持许多其他语言写成的mapper和reducer。

Hadoop 是设计用来处理大量数据和运算的，所以如果只有少量数据时，就会比关系型数据库还要慢了。

采用虚拟化技术可降低Linux使用硬件的成本，虚拟化技术有：VMWare / KVM / XEN / Microsoft Hyper-V 。 
如 CPU16核/内存24G/硬盘300G 的Linux服务器，可以“一虚三”、即虚拟出三个虚拟机来。




# 函数式编程

- [函数式编程](http://coolshell.cn/articles/10822.html)
- [函数式编程有哪些优点？](http://www.nowamagic.net/academy/detail/1220540)
- [函数式编程扫盲篇](http://www.cnblogs.com/kym/archive/2011/03/07/1976519.html)
- [函数式编程初探](http://www.ruanyifeng.com/blog/2012/04/functional_programming.html)
- [introduction-functional-javascript](http://www.sitepoint.com/introduction-functional-javascript/)
- [Functional Programming in Javascript === Garbage](http://awardwinningfjords.com/2014/04/21/functional-programming-in-javascript-equals-garbage.html)
    - javascript不适合函数式编程？

对象是面向对象的第一型，那么函数式编程也是一样，函数是函数式编程的第一型。

在纯粹函数式程式语言中，你不是像命令式语言那样命令电脑「要做什么」，而是通过用函数来描述出问题「是什么」。
递回在 Haskell 中非常重要。命令式语言要求你提供求解的步骤，Haskell 则倾向于让你提供问题的描述。
这便是 Haskell 没有 while 或 for 循环的原因，递回是我们的替代方案。

在面向对象编程中，我们把对象传来传去，那在函数式编程中，我们要做的是把函数传来传去，我们把他叫做 **高阶函数**

在函数式编程中，函数是基本单位，是第一型，他几乎被用作一切，包括最简单的计算，甚至连变量都被计算所取代。
在函数式编程中，变量只是一个名称，而不是一个存储单元，这是函数式编程与传统的命令式编程最典型的不同之处。


### Persistent data structure

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



# 架构

[微服务架构的几种模式](http://microservices.io/patterns/index.html)

[浅谈命令查询职责分离(CQRS)模式](http://www.cnblogs.com/yangecnu/p/Introduction-CQRS.html)、
[DDD CQRS架构和传统架构的优缺点比较](http://www.cnblogs.com/netfocus/archive/2016/02/06/5184182.html)

什么是微服务架构：https://os.alipayobjects.com/rmsportal/OzCkwPWAvRGwqXv.png

Matt在对微服务的总体介绍中是这样说的：经过分离的组件可以各自拥有独立的生命周期，并且按需进行扩展。
不仅如此，这种方式也打破了组件之间的技术依赖，这就允许每个服务各自选择最适合的技术进行实现。
通过将较大的问题分解为几个较小的问题，让每个问题更易于进行分析，也更利于开发者选择最适合的解决方案。

微服务与SOA之间是否存在关联？

- 现如今，谈论SOA的各种不足似乎已经成为了一件很普遍的事。但如果你认真地观察，就会发现SOA的缺陷中的绝大部分与微服务是相同的，只是有关他们的案例更为具体一些。而两者的优势其实也大体相同，因为从本质上看，这两种技术所做的都是同一件事：将一个较大的问题分解为多个较小的问题。
- 在我看来，微服务只是一种为经过良好架构设计的SOA解决方案实现的面向服务的交付方案。SOA提供了上下文的框架，同时也提供了微服务所坚持的大部分规则。不仅如此，SOA还提供了一种更宽泛的上下文，使微服务能够在复杂的企业中符合这些上下文。许多人在不断地抱怨SOA中的各种WS-*协议、ESB的庞大以及各种极端复杂的项目，其实这只是面临的挑战不同而已。

当前业界比较成熟的微服务框架有Netflix的Karyon/Ribbon，Spring的Spring Boot/Cloud，阿里的Dubbo等。
配置中心比较成熟的开源方案有百度的Disconf，360的QConf，Spring的Cloud Config和阿里的Diamond等。

REST/RPC和序列化，框架层要支持将业务逻辑以HTTP/REST或者RPC方式暴露出来，HTTP/REST是当前主流API暴露方式，
在性能要求高的场合则可采用Binary/RPC方式。针对当前多样化的设备类型(浏览器、普通PC、无线设备等)，
框架层要支持可定制的序列化机制，例如，对浏览器，框架支持输出Ajax友好的JSON消息格式，
而对无线设备上的Native App，框架支持输出性能高的Binary消息格式。

通常来说，RESTful服务最适合于为某个数据模型提供CRUD操作，而微服务架构中的服务往往能够被轻易地分解为这些CRUD类型的服务，
因此它与RESTful就能够很好地结合在一起。而对于其他类型的服务来说，类RESTful风格的服务通常也是一种良好的选择，
这种类RESTful的风格也会使用HTTP作为传输协议，但服务本身并不一定要100%地符合RESTful的原则。

baas-中台：

- 对业务开发团队来说，他们的开发能力更专注前端，交互，需要掌握的技术栈里就只需要javascript和Restful API就够了，他们可以跟专注去理解业务模型和逻辑，快速构建业务系统，进行业务创新。
- 而对于后端团队，将跟专注做平台和服务，后者需要他们将J2EE时代的开发架构，比如MVC， RPC等架构向向微服务，EDA，CQRS等云时代的架构升级，更好的将系统复杂性解构，利用服务化来构建满足业务团队的需要。

soa是Service-Oriented Architecture的首字母简称，面向服务架构。开发人员很容易理解为是一个Web Service，但是这绝对不是SOA，那顶多只能算是SOA的一种实现方法。

[stateless-authentication-for-microservices](http://www.slideshare.net/alvarosanchezmariscal/stateless-authentication-for-microservices)、
[user-authentication-with-jwt](http://blog.leapoahead.com/2015/09/07/user-authentication-with-jwt/)

uuid 全宇宙单独id。guid 一定范围内单独id，比 uuid 范围小。


B/S架构：无需安装、跨平台，像web项目。基于统一的应用层协议HTTP来交互数据，HTTP是无状态的短连接通信方式。
C/S架构：本地安装、不跨平台，像QQ等客户端程序。采用长连接的交互模式。


再说说WebService和soap，WebService也是微软重头宣传的技术之一，但是微软喜欢封装，所以采用了SOAP方式实现WebService，
这又是一个过重的协议，又证明了微软没有高并发高性能程序设计经验。独霸Web的LAMP平台，也使用了WebService，
但是人家没有采用soap，而是采用xml-rpc, json-rpc，还有Restful webserivice，这些都比微软的soap webservice轻量级，
而且更简单。至于后来的wcf, wpf, wf，那更是直接把微软送入了地狱。


## API 设计

[Apollo Data Stack](http://docs.apollostack.com/)、
[How to build a GraphQL server](https://medium.com/apollo-stack/tutorial-building-a-graphql-server-cddaa023c035#.gdvn0fb8v)

[Swagger 及 API 管理](https://www.linkedin.com/pulse/swagger-%E5%8F%8A-api-%E7%AE%A1%E7%90%86%E7%AE%80%E4%BB%8B-minglei-tu)

There are some important differences between the two though:

- Falcor returns Observables, GraphQL just values. For how Netflix wanted to use Falcor, this makes a lot of sense for them. They make multiple requests and present data as it's ready, but it also means that the client developer has to work with the Observables directly. GraphQL is a request/response model, and returns back JSON, which is trivially easy to then use. Relay adds back in some of the dynamicism that Falcor presents while maintaining only using plain values.
- Type system. GraphQL is defined in terms of a type system, and that's allowed us to built lots of interesting tools like GraphiQL, code generators, error detection, etc. Falcor is much more dynamic, which is valuable in its own right but limits the ability to do this kind of thing.
- Network usage. GraphQL was originally designed for operating Facebook's news feed on low end devices on even lower end networks, so it goes to great lengths to allow you to declare everything you need in a single network request in order to minimize latency. Falcor, on the other hand, often performs multiple round trips to collect additional data. This is really just a tradeoff between the simplicity of the system and the control of the network. For Netflix, they also deal with very low end devices (e.g. Roku stick) but the assumption is the network will be good enough to stream video.

### [Falcor](http://netflix.github.io/falcor/)

不同于传统REST API，它只提供唯一的一个端点。有了它，开发者不再需要向不同的服务器端点请求不同的数据，而是向同一个端点请求不同的模型数据。服务器端可以识别请求参数，并由Falcor Router调用恰当的router函数。也就是说，Falcor提供了一个更加直观的API，就是开发者的数据模型。这可以确保服务器永远不会返回不必要的模型数据，节省了带宽。Falcor客户端还可以使用缓存数据为连续的请求提供服务，减少服务器响应时间。

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


## rest

- [介绍-入门](http://www.cnblogs.com/artech/p/restful-web-api-02.html)
- [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)
- [理解本真的REST架构风格](http://www.infoq.com/cn/articles/understanding-restful-style)、[如何设计好的RESTful API？](http://www.infoq.com/cn/articles/how-to-design-a-good-restful-api)
- [hateoas](http://timelessrepo.com/haters-gonna-hateoas)
- [RESTful API的十个最佳实践](http://www.cnblogs.com/xiaoyaojian/p/4612503.html)
- [最佳实践](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
- [Google/Facebook/GitHub等设计对比](http://blog.octo.com/en/design-a-rest-api/)
- [jsonapi](http://jsonapi.org/format/) - [jsonapi中文](http://jsonapi.org.cn/format/)

[来自于PayPal的RESTful API标准](https://segmentfault.com/a/1190000005924733) / 
[Microsoft/api-guidelines](https://github.com/Microsoft/api-guidelines/blob/master/Guidelines.md)

[What does “state transfer” in Representational State Transfer (REST) refer to?](https://stackoverflow.com/questions/4603653/what-does-state-transfer-in-representational-state-transfer-rest-refer-to)

总结：

通过url来设计系统的结构。根据REST，每个url都代表一个resource，而整个系统就是由这些resource组成的。因此，如果url是设计良好的，那么系统的结构就也应该是设计良好的。REST允许我们通过url设计系统，就像Test Driven Development允许我们使用testcase设计class接口一样。使用REST的关键是如何抽象资源，抽象得越精确，对REST的应用就越好。

- 使用名词而不是动词，使用名词的复数形式。（一些非CRUD操作如login/logout，可以用动词，方便理解）
- Get方法和查询参数不应该改变资源状态。GET PUT和DELETE方法是幂等方法。
- 假如资源连接到其它资源，则使用子资源形式`GET /cars/711/drivers/4`，但cars和drivers可以是并列的资源。
- 有一种url形式，它对应到程序中的继承关系：`/products/books`，也可以`/books`单独作为顶层接口。
- 为集合提供过滤、排序、字段选择以及分页
    - 过滤：为所有字段或者查询语句提供独立的查询参数：`GET /cars?color=red Returns a list of red cars`
    - 排序：允许跨越多字段的正序或者倒序排列：`GET /cars?sort=-manufactorer,+model`
    - 字段选择：一些情况下，我们只需要在列表中查询几个有标识意义的字段，我们不需要从服务端把所有字段的值都请求出来，所以需要支持API选择查询字段的能力，这也可以提到网络传输性能和速度：`GET /cars?fields=manufacturer,model,id,color`
    - 使用offset和limit来获取固定数量的资源结果，当其中一个参数没有出现时，应该提供各自的默认值，比如默认取第一页，或者默认取20条数据：`GET /cars?offset=10&limit=5 取第三页的5条数据`
    - 使用自定义的头X-Total-Count发回给调用段实际的资源数量。
- 使用HTTP状态码处理错误
    - 200 – OK – 一切正常
    - 201 – OK – 新资源已经被创建
    - 204 – OK – 资源删除成功
    - 304 – 没有变化，客户端可以使用缓存数据
    - 400 – Bad Request – 调用不合法，确切的错误应该在error payload中描述，例如：“JSON 不合法 ”
    - 401 – 未认证，调用需要用户通过认证
    - 403 – 不允许的，服务端正常解析和请求，但是调用被回绝或者不被允许
    - 404 – 未找到，指定的资源不存在
    - 422 – 不可指定的请求体 – 只有服务器不能处理实体时使用，比如图像不能被格式化，或者重要字段丢失。
    - 500 – Internal Server Error – 标准服务端错误，API开发人员应该尽量避开这种错误

- 无状态通信（Stateless）：通信的会话状态（Session State）应该全部由客户端负责维护。应该注意区别应用的状态和连接协议的状态。HTTP连接是无状态的（也就是不记录每个连接的信息），而REST传输会包含应用的所有状态信息。通讯本身的无状态性可以让不同的服务器的处理一系列请求中的不同请求，提高服务器的扩展性。
- 充分利用好HTTP缓存是RESTful API可伸缩性的根本。HTTP协议是一个分层的架构，从两端的user agent到origin server之间，可以插入很多中间组件。而在整个HTTP通信链条的很多位置，都可以设置缓存。HTTP协议内建有很好的缓存机制，可以分成过期模型和验证模型两套缓存机制。

#### 根据[richardson模型](http://martinfowler.com/articles/richardsonMaturityModel.html), REST架构的成熟度有3个等级:

- Level 0 POX (这个就不算REST了)
- Level 1 Resources:  解决了Level 0 接口的问题, 使得各种资源有了自己相应的URI,虽然仍然是POX的交互方式, 但是每一个接口都更加紧凑和内聚, 相应的容易维护起来.
- Level 2 Http verbs:  这一级别使用http verbs来对各种资源进行crud操作, 使得应用程序的接口更加的统一, 语义更加明确.
- Level 3 Hypermedia Controls: 
    - RESTful的架构本意是"在符合架构原理的前提下，理解和评估以网络为基础的应用软件的架构设计，得到一个功能强、性能好、适宜通信的架构。" 这个世界上规模最大的, 耦合度最低, 最稳定的, 性能最好的分布式网络应用是什么? 就是WEB本身. 规模,稳定,性能都不用说了. 为什么说耦合度低呢? 想一想每个人上网的经历, 你几乎不需要任何培训就可以上一个新的网络购物平台挑选商品,用信用卡付款,邮寄到自己家里.把网站的程序想像成一个状态机, 用户在一系列状态转换中完成自己的目标. 这中间的每一步, 应用程序都告诉你当前的状态和可能的下一步操作, 最终引导用户从挑选商品,挑选更多商品,到支付页面,到输入信用卡信息,最终完成付费,到达状态机的终点.这种 service discoverablility 和 self-documenting 就是 level 3 想解决的问题 在这里面, 告诉用户当前状态以及各种下一步操作的东西, 比如链接, 按钮等等, 就是Hypermedia Controls. Hypermedia Controls 就是这个状态机的引擎. Level 3 的REST架构就是希望能够统一这一类的 Hypermedia Controls, 赋予他们标准的, 高度可扩展的标准语义及表现形式, 使得甚至无人工干预的机器与机器间的通用交互协议边的可能. 比如你可以告诉一个通用的购物客户端, "给我买个最便宜的xbox", 客户端自动连上google进行搜索, 自动在前10个购物网站进行搜索, 进行价格排序, 然后自动挑选最便宜的网站, 进行一系列操作最终完成用信用卡付费, 填写个人收件地址然后邮寄. 这些都依赖于Hypermedia Controls带来的这种 service discoverablility 和 self-documenting。

资源、子资源、相关资源，都能通过「links」关联，达到从一个资源找到相关资源(links列出URL)，或者直接 embedded 相关资源。

### 业务实例
> 其他：[github](http://api.github.com/)、[instagram](https://instagram.com/developer/)、
[白宫API规范](https://github.com/WhiteHouse/api-standards)

> [React.js and Spring Data REST: Part 1 - Basic Features](https://spring.io/blog/2015/09/01/react-js-and-spring-data-rest-part-1-basic-features)、[React.js and Spring Data REST: Part 2 - Hypermedia](http://spring.io/blog/2015/09/15/react-js-and-spring-data-rest-part-2-hypermedia)，包含_links、_embedded、Paging、Sorting 很完善的rest库。

具体到业务中的表现就是“embedded resources”，代码中的实现方式是在一些标记@RestResource注解的bean中(model)的一些属性上加入@Relation注解(自定义的注解)，并设置相应的loader用来加载相关资源，然后写具体的loader来实现功能。

目前只在业务中的一部分实现了这个功能，前端能通过拼接参数获得关联资源(也能exclude掉不需要的数据字段)，实例如`http://xx?e=xx&_xfields=title&_embedded=category,category.types,type,rank,status`，通过改变`_xfields / _embedded`会得到不同结果，其实这样已经带来了不少便利。当然如果像github-API一样把关联资源子资源等的link-uri的给出，那么也就产生了在线API文档，少了些找文档的问题。

如果不用这样的@Relation注解实现、Java怎么处理这个问题呢？一般是要设置不少`多余的`model，如父子资源各有一个model，当需要一起用的时候，又要设置新的合并起来的model。或者会形成很多map数据结构的层层嵌套，导致代码耦合难以阅读。



# http

HTTP协议根本没有长短连接这一说，HTTP协议是基于请求/响应模式的，因此只要服务端给了响应，本次HTTP连接就结束了。

HTTP分为长连接和短连接，其实本质上是说的TCP连接。TCP连接是一个双向的通道，它是可以保持一段时间不关闭的，因此TCP连接才有真正的长连接和短连接这一说。HTTP协议说到底是应用层的协议，而TCP才是真正的传输层协议，只有负责传输的这一层才需要建立连接。

HTTP1.1默认是长连接，也就是默认Connection的值就是keep-alive。好处是：长连接情况下，多个HTTP请求可以复用同一个TCP连接，这就节省了很多TCP连接建立和断开的消耗。

对于客户端来说，不管是长轮询还是短轮询，客户端的动作都是一样的，就是不停的去请求，不同的是服务端，短轮询情况下服务端每次请求不管有没有变化都会立即返回结果，而长轮询情况下，如果有变化才会立即返回结果，而没有变化的话，则不会再立即给客户端返回结果，直到超时为止。但是长轮询也是有坏处的，因为把请求挂起同样会导致资源的浪费，假设还是1000个人停留在某个商品详情页面，那就很有可能服务器这边挂着1000个线程，在不停检测库存量，这依然是有问题的。　因此，从这里可以看出，不管是长轮询还是短轮询，都不太适用于客户端数量太多的情况，因为每个服务器所能承载的TCP连接数是有上限的，这种轮询很容易把连接数顶满。

一种轮询方式是否为长轮询，是根据服务端的处理方式来决定的，与客户端没有关系。轮询的长短，是服务器通过编程的方式手动挂起请求来实现的。

- 发起一个HTTP请求的过程就是建立一个socket通信的过程。可以模拟浏览器发起HTTP请求：
    - 如用HttpClient发起；
    - Linux中的`curl`命令，通过`curl+url`就可以发起HTTP请求
- 搞清楚`Expires`、`Last-Modified`、`Etag`、

HTTP协议本身是一种面向资源的应用层协议，但对HTTP协议的使用实际上存在着两种不同的方式：一种是RESTful的，它把HTTP当成应用层协议，比较忠实地遵守了HTTP协议的各种规定；另一种是SOA的，它并没有完全把HTTP当成应用层协议，而是把HTTP协议作为了传输层协议，然后在HTTP之上建立了自己的应用层协议。

幂等性并不属于特定的协议，它是分布式系统的一种特性；所以，不论是SOA还是RESTful的Web API设计都应该考虑幂等性。（幂等性是数学中的一个概念，表达的是N次变换与1次变换的结果相同）

- HTTP GET方法用于获取资源，不应有副作用，所以是幂等的。（不会改变资源的状态，但不是每次GET的结果相同）
- HTTP DELETE方法用于删除资源，有副作用，但它应该满足幂等性。
- HTTP POST和PUT的区别容易被简单地误认为“POST表示创建资源，PUT表示更新资源”；而实际上，二者均可用于创建资源，更为本质的差别是在幂等性方面。
- POST所对应的URI并非创建的资源本身，而是资源的接收者。比如：POST http://www.forum.com/articles的语义是在http://www.forum.com/articles下创建一篇帖子，HTTP响应中应包含帖子的创建状态以及帖子的URI。两次相同的POST请求会在服务器端创建两份资源，它们具有不同的URI；所以，POST方法不具备幂等性。
- 而PUT所对应的URI是要创建或更新的资源本身。比如：PUT http://www.forum/articles/4231的语义是创建或更新ID为4231的帖子。对同一URI进行多次PUT的副作用和一次PUT是相同的；因此，PUT方法具有幂等性。

#### Content-type & Accept
- Content-type in a request refers to the type of the data you are sending!
    - [Do I need a content type for http get requests](http://stackoverflow.com/questions/5661596/do-i-need-a-content-type-for-http-get-requests)：Get requests should not have content-type because they do not have request entity (that is, a body)
- Accept：Content-Types that are acceptable for the response.

### [合并 HTTP 请求是否真的有意义？](http://www.zhihu.com/question/34401250)
- 浏览器针对每个域名并发建立的最大TCP连接数基本都是6个，然后每个连接上串行发送若干个请求。HTTP1.1协议规定请求只能串行发送。
- 100个请求下：在http1.1，keep-alive是默认的，现代浏览器都有DNS缓存，DNS寻址时间可忽略。
    - 寻址还是会花很少量时间，考虑个别情况下 DNS 缓存失效时需要更多点时间（10ms 左右）。另外url检查时间，一般可忽略。
- 3次握手由于有 keep-alive，一条和一百条都只需一次TCP握手--无差别。
- 发送报文--增多了99次的http请求头，请求之间有停顿（网络延迟 RTT），如果合并后节省延迟时间 RTT*(n-1)。网络延迟低或请求数n比较小时，可忽略不计。（4G以上网络延迟很低）。
    - PC上的RTT大概是50ms, wifi 为100ms， 3G为200ms，2G为400ms。例如：一个200M带宽、2000ms延迟的网络，和一个2M带宽，20ms延迟的网络。
    - 无线环境下头部大小每减少100个字节，速度能够提升20~30ms。因为：上下行带宽严重不对称，上行带宽太小。
        - 假设一个请求头部是800个字节，如果上行带宽是100个字节，那至少得传8次才能将一个请求传完。补充一下，上下行带宽不对称主要是技术和市场原因决定的，倒不是运营商太奸诈。
- 考虑丢包（比如移动网络），合并请求会更有优势。
    - 丢的是tcp包？服务器怎么知道丢了，丢了哪些内容(如get请求内容一部分丢了)？浏览器会重新发送，还是自动重发？    
- 据说keep-alive在经过代理或者防火墙的时候可能会被断开。

#### [http pipelining](https://en.wikipedia.org/wiki/HTTP_pipelining)  
- pipeline 原理是 客户端可以并行发送多个请求，但是服务器的响应必须按次序返回。一些服务器和代理不支持pipeline；在 pipeline 中的前一个链接可能会阻塞后边的链接；减缓页面加载速度。
- 检测浏览器是否开启：Firefox 地址栏中输入 about:config 搜索 pipe 找到 network.http.pipelining 。Chrome 地址栏中输入 chrome://flags 找不到开启地方，Chrome 默认禁止了 pipelining。[原因](https://www.chromium.org/developers/design-documents/network-stack/http-pipelining)

#### SPDY 和 HTTP2
核心优势就是多路复用，简单说来就是将多个请求通过一个TCP连接发送。

浏览器能不能将100个请求通过一个TCP连接发送？会出现什么问题？那就是TCP协议的head of line blocking,队头阻塞。
设想这样一个场景，一个页面有100个请求，第99个请求时，TCP丢了一个包，TCP自然会重传，重传时间是T1，重传成功后，浏览器才能获取到完整页面的响应内容，然后渲染和展示整个页面。也就是说整个页面的加载时间延迟了T1时间。在此之前，用户没有得到任何内容。

[http2讲解](http://http2-explained.haxx.se/content/zh/index.html)

[htt2 and UDP](http://2014.jsconf.eu/speakers/iliyan-peychev-http-20-and-quic-protocols-of-the-near-future.html)

[websockets 的问题](https://samsaffron.com/archive/2015/12/29/websockets-caution-required)



# 字符编码
计算机中存储信息的最小单元是一个字节，即8个bit，所以能表示的字符范围是0~255个。

#### ASCII码
单字节编码，一共128个字符，用一个字节的低7位表示。
#### ISO-8859-1
单字节编码，扩展了ASCII，总共能表示256个字符，涵盖了大多数西欧语言字符。
#### GB2312
双字节编码，编码范围A1~F7，包含6763个汉字。
#### GBK
兼容并扩展了gb2312，编码范围是8140~FEFE(去掉XX7F)，总共有23940个码位，能表示21003个汉字。

#### utf-16
用两个字节（16个bit）表示Unicode转化格式。每两个字节表示一个字符，这就大大简化了字符串操作。utf-16编码不论什么字符都用两个字节表示，规则很简单，编码效率非常高，适合在本地磁盘和内存之间使用、可以进行字符和字节之间的快速切换、如Java的内存编码就采用utf-16编码。  
但有很大一部分字符用一个字节就可以表示了，因此存储空间浪费了一倍，不适合用在网络之间传输，因为会没必要的增大了网络传输流量，而且网络传输容易损坏字节流，一旦字节流损坏将很难恢复。另外它采用顺序编码，不能对单个字符的编码值进行校验，如果中间的一个字符码值损坏，后面的所有码值都将受影响。

#### utf-8
采用一种变长技术，每个编码区域有不同的字码长度。如果一个字节最高位（第8位）为0，表示是一个ASCII字符。对单字节范围内的字符仍然用一个字节表示，对汉字采用三个字节表示。更适合网络传输，单个字符损坏也不会影响后面的其他字符，在编码效率上介于GBK和utf-16之间，在编码效率和编码安全上做了平衡，是理想的中文编码方式。

#### web上的编码
URL中包含中文时需要进行编码，但URL中`?`前后部分（分别是uri和QueryString查询字符串）编码方式不同，后端相应的解码方式也不同。

- 对uri部分进行解码的字符集是在connector的`<Connector URIEncoding="UTF-8" />`中定义的，如果没有定义，将以默认编码ISO-8859-1解析，所以最好设置为utf-8编码。
- 而HTTP的get方式请求的QueryString与post方式请求的表单参数都是作为`Parameters`保存的，都通过`request.getParameter`获取参数值，对它们的解码也是在该方法第一次被调用时进行的（注意：要在第一次调用request.getParameter方法之前就设置request.setCharacterEncoding(charset)，否则post表单提交上来的数据可能出现乱码）。浏览器根据ContentType的charset编码格式对之进行编码，然后提交到服务器，服务端同样也是用ContentType中的字符集进行解码的。


# DNS域名解析
- 输入域名并按下回车后
- 第一步，浏览器会检查缓存中有没有这个域名对应的解析过的IP地址，有就结束，没有进入下一步
- 第二步，浏览器查找操作系统缓存中是否有。操作系统也有一个域名解析过程，在hosts文件里设置可以将任何域名解析到任何能够访问的IP地址。如果指定了，浏览器会使用这个IP地址。（早期Windows中的域名被入侵黑客劫持问题）
- 前两步都是在本机完成的，如果无法完成解析，就会请求域名服务器了。我们的网络配置中都会有「DNS服务器地址」，操作系统会把域名发送给LDNS，也就是本地区的域名服务器。大约80%的域名解析到这里完成。
- 第四步，如果LDNS没命中，就到Root Server域名服务器请求解析。然后`gTLD Server`，`Name Server域名服务器`，返回该域名对应的`IP和TTL值`被Local DNS Server缓存，解析结果返回给用户、缓存到本地系统缓存中、域名解析过程结束。（这中间还有GTM负载均衡控制等）
- 可以用`nslookup`、`dig www.taobao.com`等命令，跟踪解析过程

# CDN工作机制
CDN = 镜像（Mirror）+ 缓存（Cache）+ 整体负载均衡（GSLB），主要缓存网站中的静态数据。

三种负载均衡架构：链路负载均衡、集群负载均衡、操作系统负载均衡。  
链路负载均衡就是通过DNS解析成不同的IP，用户根据这个IP来访问不同的目标服务器。  
集群负载均衡分为硬件和软件负载均衡。硬件负载均衡设备昂贵、如F5，性能非常好，但访问量超出极限时不能进行动态扩容。软件负载均衡成本低，缺点是一般一次访问请求要经过多次代理服务器，会增加网络延时，如LVS、HAProxy。  
操作系统负载均衡，是利用操作系统级别的软中断或硬中断，设置多队列网卡等来实现。

