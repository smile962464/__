import React from 'react';
import ReactDOM from 'react-dom'

var Button = React.createClass({
  handleClick: function () {
    this.props.selectItem(this);
  },
  render: function () {
    var selected = this.props.isSelected;
    return (
      <div onClick={this.handleClick}
        className={selected ? "selected" : ""}>
        {this.props.name} ({this.props.key}) {selected ? "<---" : ""}
      </div>
    );
  }
});

var Group = React.createClass({
  getInitialState: function () {
    return {
      selectedItem: null
    };
  },
  selectItem: function (item) {
    this.setState({
      selectedItem: item
    });
  },
  render: function () {
    var selectedKey = (this.state.selectedItem && this.state.selectedItem.props.key) || null;
    // debugger;
    var children = this.props.children.map(function (item, i) {
      var isSelected = item.props.key === selectedKey;
      return React.cloneElement(item, {
        isSelected: isSelected,
        selectItem: this.selectItem,
        key: item.props.key
      });
    }, this);
    return (
      <div>
        <strong>Selected:</strong>
          {this.state.selectedItem ? this.state.selectedItem.props.name : 'None'}
        <hr/>
          {children}
      </div>
    );
  }
});

var Parent = React.createClass({
  getInitialState: function () {
    return {
    };
  },
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

const App = React.createClass({
  render() {
    return (<div>
      <h3>buttonGroup - button</h3>
      <Group ref="buttonGroup">
        <Button key={1} name="Component A"/>
        <Button key={2} name="Component B"/>
        <Button key={3} name="Component C"/>
      </Group>
      <h3>test React.Children methods</h3>
      <Parent>
        <div key={1}>
          2 <br />
          <span>1</span> <br />
          <span>11</span>
        </div>
      </Parent>
    </div>);
  }
})

ReactDOM.render(<App></App>, document.getElementById('example'));
