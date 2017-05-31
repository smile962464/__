import React from 'react';
import ReactDOM from 'react-dom'
import LinkedStateMixin from 'react-addons-linked-state-mixin'

var Input = React.createClass({
  getInitialState () {
    return {
      val: this.props.value || ''
    }
  },
  componentWillReceiveProps(nextProps) {
    // this.setState({ val: nextProps.value });
  },
  valChange(e) {
    var val = e.target.value;
    this.setState({
      val: val
    });
    this.props.onChange(val);
  },
  render() {
    return <input value={this.state.val} onChange={this.valChange} />
  }
});

const list = ['1', '2', '3'];

var Form = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function () {
    return {
      val: 'init'
    }
  },
  cli(index) {
    this.setState({ val: list[index] })
  },
  render() {
    return (
      <div>
        {list.map((item, index) => <button key={index} onClick={() => this.cli(index)}>{item}</button>)}
         -- 点击这些按钮
        <br />
        <input valueLink={this.linkState('val')} />
        <br />
        <Input valueLink={this.linkState('val')} />（输入报错，valueLink只能用在原生input上）
      </div>
    )
  }
});
export default Form;
