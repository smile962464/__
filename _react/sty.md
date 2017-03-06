

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


## react native
[介绍](https://www.youtube.com/watch?v=KVZ-P-ZI6W4)、[深入介绍](https://www.youtube.com/watch?v=7rDsRXj9-cU)

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

### flux中的Ajax放到什么地方
- 官方推荐单独放到utils模块下，被某个action调用，并且Ajax返回结果触发新的action，store里不出现。（见flux-chat）
- 另一种是在store里的某个方法发送Ajax；也在store里注册Ajax返回的回调函数，并直接调用`Dispatcher.dispatch()`。


## react
- [React](http://facebook.github.io/react/index.html)
- [react-starter-kit](https://github.com/kriasoft/react-starter-kit)
- [react-components](http://react-components.com/)
- [react-bootstrap](http://react-bootstrap.github.io/components.html)

### 怎么划分组件、怎么确定state
[怎么划分组件](http://facebook.github.io/react/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy)

how do you know what should be its own component? Just use the same techniques for deciding if you should create a new function or object. One such technique is the single responsibility principle, that is, a component should ideally only do one thing. If it ends up growing it should be decomposed into smaller subcomponents.

[怎么确定state](http://facebook.github.io/react/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state)

To build your app correctly you first need to think of the minimal set of mutable state that your app needs.
例如：有一个todo-list的数组是组件的state，不用再有list.length这样的state。

### UI state and application state
[todo-input的state](http://facebook.github.io/flux/docs/todo-list.html#content)

All application state should live in the store, while components occasionally hold on to UI state. Ideally, React components preserve as little state as possible.

### 知识点

[暴露组件函数-嵌套组件常用](http://facebook.github.io/react/tips/expose-component-functions.html)

- 何时该用`props`、何时该用`state`
    - a component cannot mutate its props — they are always consistent with what its owner sets them to.
- 子组件更新父组件状态：The parent is the source of truth, so the child needs to tell the parent to change its state. Pass a callback from the parent to the child, and have the child call it.
    - 子组件则可以通过事件冒泡或是传递一个回调的方式来对父组件做出反馈。
    - 子组件并不能任意地改写父组件的状态，无论是触发事件还是调用回调，最终父组件发生了什么还是由父组件自身来决定的，这就保证了子组件对父组件的解耦，从而使得子组件可移植/复用。
- 两个component里如果都要用到相同的一个方法，这个方法该放到哪个component？一些公共方法函数，该放到哪里？
- 不同的component维护许多各自不同state，导致数据碎片化，flux模式利用顶层store能解决这个问题？

- [Dynamic Children - Why the Keys are Important](http://blog.arkency.com/2014/10/react-dot-js-and-dynamic-children-why-the-keys-are-important/)

    http://facebook.github.io/react/docs/component-specs.html#updating-shouldcomponentupdate
    一：有助于提高性能。
    二：间接解决了一个问题，如下描述：
    当列表里有`<input />`，input的onChange事件回调里有改变state，会让input被重新render，导致input的焦点丢失。
    怎么解决呢？
     - 可以利用shouldComponentUpdate，在input输入内容时，虽然改变了state，但不用再重新render
     - 也可以把onChange事件，改为onBlur事件，即blur后再改变state、再render


#### 生命周期
不管页面有多少个component标签实例，它里边的生命周期函数

- getDefaultProps() 只会运行一次
- getInitialState()、componentDidMount() 有几个实例，就运行几次
    - 例如嵌套元素`<ele> <ele> </ele> </ele>`，从里到外依次执行componentDidMount
- render() 当state被改变，就会运行，但不一定更改相应的实际dom
- componentWillReceiveProps() 当props被改变时运行。
    - 场景：父组件的某个事件需要触发子组件某个state的改变，子组件的state与其props有关：
    - 父组件想改变子组件，一般只能通过向子组件传递改变后的props，这时会触发子组件上的此函数，在此函数里改变state
