import React from 'react';
import ReactDOM from 'react-dom'
// require('./index.less');

import Controlled from './un-controlled';

const App = React.createClass({
  getInitialState() {
    return {
      now: 1
    }
  },
  cli() {
    console.log(this.refs.control.refs.unInput.value);
    this.setState({
      now: Date.now()
    });
  },
  render() {
    return (<div>
      <h3>(Un)controlled Components</h3>
      <button onClick={this.cli}>switch</button>
      <h3>不变的key（可不设置）</h3>
      <Controlled key="k" value={this.state.now} ref="control" />
      <h3>每次都改变的key</h3>
      <Controlled key={this.state.now} value={this.state.now} />
    </div>);
  }
})

ReactDOM.render(<App />, document.getElementById('example'));
