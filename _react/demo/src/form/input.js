import React from 'react';
import ReactDOM from 'react-dom'
import LinkedStateMixin from 'react-addons-linked-state-mixin'

var Input = React.createClass({
  getInitialState: function () {
    return {
      val: this.props.value || ''
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      val: nextProps.value
    });
  },
  valChange: function (e) {
    var val = e.target.value;
    this.setState({
      val: val
    });
    this.props.onChange(val);
  },
  render: function () {
    return <input type="text" className="form-control" required
                  value={this.state.val}
                  onChange={this.valChange} />
  }
});

var Form = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function () {
    return {
      val: 'init'
    }
  },
  cli: function (index) {
    this.setState({
      val: this.props.list[index]
    })
  },
  change: function (val) {
    console.log( val );
    this.setState({
      val: val
    })
  },
  render: function () {
    return (
      <div className="form-horizontal" role="form">
        {this.props.list.map(function (item, index) {
          return <button onClick={this.cli.bind(this, index)}>{item}</button>
        }, this)}
         -- 点击这些按钮
        <br />
        <Input key={Date.now()} value={this.state.val} onChange={this.change} />输入焦点消失
        <br />
        <Input value={this.state.val} onChange={this.change} />
        <br />
        <input valueLink={this.linkState('val')} />
      </div>
    )
  }
});


export default Form;
