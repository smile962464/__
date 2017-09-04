

react filter（filter子节点）: https://github.com/facebook/react/issues/4867

[Javascript reactive frameworks](http://rrees.me/2015/06/04/overview-of-javascript-reactive-frameworks/)

## FRP (Functional Reactive Programming)
The former is Passive programming, while the latter is Reactive programming

- 展现：render :: Model -> UI
    - render 是一个接受一个数据模型参数并返回一个用户界面的函数。
    - React.js本质：(state, props) => state
- 响应：reactive :: Action -> Model -> Model（Model, Side Effects(异步消息)）
    - reactive 是一个接受一个动作（事件）参数和一个模型，并返回一个新的模型的函数。
    - 有「Side Effects(异步消息)」时，reactive :: Action -> Model -> (Model, Effects Action)。参考 https://github.com/evancz/elm-architecture-tutorial/
    - flux本质：(state, action) => state。 redux的reducer也是这样。
- render 和 reactive 反复迭代即得到一个用户应该看到并可以操作的用户界面。


## 服务端渲染
`ReactDOMServer.renderToString()`执行时间、一般复杂的页面需要 20~50ms。数据如果是全局变量，用户并发访问服务器、就可能拿到了同一份数据，需要通过uuid来做标记，比较麻烦。redux 的 store 是一个通过函数构造的，数据是函数的参数，作为初始化数据，数据不是全局变量，没问题。函数式无副作用、无状态，利于并发。- @翰文
高并发的应用，不推荐使用 react 服务器渲染，因为性能不算好，会拉低应用的 qps 。


## redux
- [UI state应该放到哪里？](https://github.com/rackt/redux/issues/595)
- [解读 redux 的设计思路与用法](http://div.io/topic/1309)

### redux & redux-saga 场景
form 表单提交，触发 `FORM_POST` action，
saga里触发（yield put）`POST_SUCCESS`/`POST_FAILURE` action，
无论提交成功或失败，都需要改变页面状态、或拉取新的列表数据，触发`UI_CHANGE`/`PULL_DATA` action，
`UI_CHANGE`/`PULL_DATA`需要参数，用`yield select`从`state`里选取需要的数据（ui状态数据需要存到全局state里），
复杂场景下、需要在 saga 里对来自不同action的数据结果做比对、筛选等操作，再触发最终的action（比如steps条的下一步）。


## flux
不同的 component 维护许多各自不同 state ，导致数据碎片化，flux 模式利用顶层 store 能解决这个问题

[本质：(state, action) => state](https://speakerdeck.com/jmorrell/jsconf-uy-flux-those-who-forget-the-past-dot-dot-dot)

- Stores hold data, and signal when something has changed
- Views subscribe to the stores that contain the data that it needs
- Data updates, re-render the view, we know this stuff
- This tends to be pretty intuitive for frontend developers

actions 其实就是 data，或者我认为是 mutations，即 ui 或者 server 的 response。
action creator 是一个 help method，调用 dispatcher，传递 mutations。
所以，action creator 是直接调用 dispatcher (passive) 的。

dispatcher 是一个 pub-sub systems。

component 直接调用 action creator
store 监听 action creator
component 监听 store

Flux isolates all data mutations to a particular layer in the application and establishes a completely predictable way to get data in and out of there.

If you are serious about working with data, there has to be a single source of truth for all of it. Neither the UI nor other models should be able to mutate the data.

In Flux, Store is the only place in your whole app that has privilege to mutate the data. It has no setters and only responds to actions emitted by the components. API responses are also actions, as they serve as inputs to Store. Only Store gets to decide how to update the data.

[Smart and Dumb Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)


## react

注意：一些命令式 API 比如`Popup.show(<Component />)`的使用限制：
假如 A 组件的 click 方法里 调用了 Popup.show() ，最后会需要使用类似（此处故意加 res）
`const res = ReactDOM.render(<Component />， new_Mount_Node)`，
这会在新的 new_Mount_Node 根节点渲染 Component 组件，这与调用者 A 组件 所在的 mount 根节点 不是同一个。
如果 A 组件所在组件树上有 新的数据，要更新 Component ，此时需要重新调用 Popup.show() 方法、即需要重新执行上述 ReactDOM.render 代码来进行更新。
但是 Popup.show() 方法调用时会有入场动画等，更新数据时不再需要显示动画，可以考虑加上 Popup.update() 方法，
也需要重新调用 ReactDOM.render ，如果动画是做在 Component 组件里边，同样还会有动画，无法解决。
那是否能通过 ReactDOM.render 的返回值 res 来获取到 Component 手动调用什么方法进行更新呢？没方法能做到。
最终解决办法：hack 方式、在更新数据时去掉动画。
-- 总结，对于这种命令式 API , 最好是只传入简单字符串，如果传入复杂组件，组件自己维护状态、跟调用者的状态关系尽量少。

----

[React](http://facebook.github.io/react/index.html) / [react-starter-kit](https://github.com/kriasoft/react-starter-kit) / [react-bootstrap](http://react-bootstrap.github.io/components.html)

(single responsibility principle) a component should ideally only do one thing. If it ends up growing it should be decomposed into smaller subcomponents.

何时该用`props`、何时该用`state`: 
To build your app correctly you first need to think of the minimal set of mutable state that your app needs. 例如：有一个todo-list的数组是组件的state，不用再有list.length这样的state。

a component cannot mutate its props — they are always consistent with what its owner sets them to.

- 子组件更新父组件状态：
    - The parent is the source of truth, so the child needs to tell the parent to change its state. Pass a callback from the parent to the child, and have the child call it.
    - 子组件并不能任意地改写父组件的状态，无论是触发事件还是调用回调，最终父组件发生了什么还是由父组件自身来决定的，这就保证了子组件对父组件的解耦，从而使得子组件可移植/复用。
- 父组件更新子组件：一般只能通过向子组件传递改变后的 props

[higher-order-components](https://facebook.github.io/react/docs/higher-order-components.html)

### 生命周期

图示 dia­gram :
![https://tylermcginnis.com/an-introduction-to-life-cycle-events-in-react-js/](https://gw.alipayobjects.com/zos/rmsportal/KMqUOATjGIAemLuRLNWF.png)  
![http://www.cnblogs.com/twobin/p/4949888.html](https://gw.alipayobjects.com/zos/rmsportal/JRAlcAXhcdkagRIirtUP.jpg)

- 当首次装载组件时，按顺序执行 getDefaultProps、getInitialState、componentWillMount、render 和 componentDidMount；
- 当卸载组件时，执行 componentWillUnmount；
- 当重新装载组件时，此时按顺序执行 getInitialState、componentWillMount、render 和 componentDidMount，但并不执行 getDefaultProps；
- 当再次渲染组件时，组件接受到更新状态，此时按顺序执行 componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate、render 和 componentDidUpdate。

注意点：

- getDefaultProps() 只会运行一次
- getInitialState()、componentDidMount() 有几个实例，就运行几次
    - 例如嵌套元素`<ele> <ele> </ele> </ele>`，从里到外依次执行 componentDidMount
- render() 当 state 被改变，就会运行，但不一定更改相应的实际dom
- componentWillReceiveProps() 当 props 被改变时运行。

[3 Reasons why I stopped using React.setState](https://medium.com/@mweststrate/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e#.o2lwoysxh)

- setState 是异步的
- setState 引起不必要的 render
- setState 不能覆盖所有的组件状态（像生命周期的钩子、timers、events ）

### diff 处理

- React.js does not need to have knowledge about what exactly changed. 
All it needs to know is whether the state changed at all or not.
- While immutability does not provide easier answers to a what exactly changed problem, 
it provides a great answer to the is it changed at all or not question. 
- [虚拟DOM Diff算法解析](http://www.infoq.com/cn/articles/react-dom-diff)

### key

- [Dynamic Children - Why the Keys are Important](http://blog.arkency.com/2014/10/react-dot-js-and-dynamic-children-why-the-keys-are-important/)
- 不能在组件内通过 props 获取 key 或 ref。
- React.Children.map 会修改 key, 而 this.props.children.map 不会，参考 demo 示例

### 处理children

需要遍历或修改 children，要使用`React.Children.forEach / React.Children.map` 方法，
而不要用`Array.isArray(children) / children.forEach`等方法。
`React.Children.xx`方法里有类似递归调用（详细跟踪React源码里的`traverseAllChildrenImpl`方法）、
能自动解析类似这样的children：

```html
<List.Body>
  <List.Item>收银员</List.Item>
  {[1, 2, 3].map((i, index) => (<List.Item key={index}>运营</List.Item>))}
</List.Body>
```

而自己写的`Array.isArray`等如果不递归解析、就会把上段代码解析错误。

