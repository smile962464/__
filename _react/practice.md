

### [3 Reasons why I stopped using React.setState](https://medium.com/@mweststrate/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e#.o2lwoysxh)
- setState 是异步的
- setState 引起不必要的 render
- setState 不能覆盖所有的组件状态（像生命周期的钩子、timers、events ）


### 处理children
需要遍历或修改children，要使用`React.Children.forEach / React.Children.map` 方法，而不要用`Array.isArray(children) / children.forEach`等方法。

`React.Children.xx`方法里有类似递归调用（详细跟踪React源码里的`traverseAllChildrenImpl`方法）、
能自动解析类似这样的children：
```
<List.Body>
  <List.Item
    thumb="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg"
  ><div className="am-list-title">收银员</div></List.Item>
  {[1, 2, 3, 4, 5, 6].map((i, index) => {
    return (<List.Item key={index}
    ><div className="am-list-title">运营</div></List.Item>);
  })}
</List.Body>
```
而自己写的`Array.isArray`等如果不递归解析、就会把上段代码解析错误。
