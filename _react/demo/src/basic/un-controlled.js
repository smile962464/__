import React from 'react';
import ReactDOM from 'react-dom'

export default React.createClass({
  getInitialState() {
    return {
      value: this.props.value,
    };
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      // value: nextProps.value,
    });
  },
  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  },
  render() {
    console.log('render');
    return (<div ref="container">
      Controlled span:<span>{this.state.value} - {this.props.value}</span> <br/>
      Controlled input: <input value={this.state.value} onChange={this.onChange} /> <br/>
      Controlled input(from props): <input value={this.props.value} onChange={this.onChange} /> <br/>
      Uncontrolled input:<input defaultValue={this.state.value} /> <br/>
      Uncontrolled input(from props):<input defaultValue={this.props.value} /> <br/>
    </div>);
  }
});
