import React from 'react';
import ReactDOM from 'react-dom'

export var Parent = React.createClass({
  render: function () {
    React.Children.forEach(this.props.children, (item, index) => {
      console.log(item, index);
    });

    // 如果 this.props.children 不是数组，
    // this.props.children.map 、 this.props.children.forEach 等会报错！
    // map 会遍历所有层级的 dom 节点，forEach 只检查一层
    let newChildren = React.Children.map(this.props.children, item => {
      return React.cloneElement(item, {
        style: {color: 'red'},
      });
    });

    return (<div>
      {newChildren}
    </div>);
  }
});
