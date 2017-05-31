import React from 'react';

export var Button = React.createClass({
  handleClick() {
    this.props.selectItem(this);
  },
  render() {
    // console.log(this.props.key, 'xx') // 注意: key 在 props 里获取不到
    return (
      <div onClick={this.handleClick}>
        {this.props.name}  {this.props.isSelected ? "<---" : ""}
      </div>
    );
  }
});

export var Group = React.createClass({
  getInitialState() {
    return {
      selectedItem: null
    };
  },
  selectItem(item) {
    this.setState({
      selectedItem: item
    });
  },
  render() {
    return (
      <div>
        Selected: {this.state.selectedItem ? this.state.selectedItem.props.name : 'None'}
        <hr/>
        {this.props.children.map((item) => {
          console.log(item.key, 'xxxd')
          return React.cloneElement(item, {
            selectItem: this.selectItem,
            isSelected: item.props.id === (this.state.selectedItem ? this.state.selectedItem.props.id : null),
            key: item.key
          });
        })}
      </div>
    );
  }
});
