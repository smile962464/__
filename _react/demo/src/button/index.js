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

const App = React.createClass({
  render() {
    return (
      <Group ref="buttonGroup">
        <Button key={1} name="Component A"/>
        <Button key={2} name="Component B"/>
        <Button key={3} name="Component C"/>
      </Group>
    );
  }
})

ReactDOM.render(<App></App>, document.getElementById('example'));
