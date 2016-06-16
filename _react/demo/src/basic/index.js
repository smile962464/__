import React from 'react';
import ReactDOM from 'react-dom'
// require('./index.less');

import Lifecycle from './Lifecycle';
import Controlled from './un-controlled';

const App = React.createClass({
  getInitialState() {
    return {
      now: 1
    }
  },
  cli() {
    this.setState({
      now: Date.now()
    })
  },
  render() {
    return (<div>
      <h3>Lifecycle</h3>
      <Lifecycle />
      <h3>(Un)controlled Components</h3>
      <button onClick={this.cli}>switch</button>
      <h3>一列固定数字的key</h3>
      {[1,2].map((item, index) => {
        return <Controlled key={index} value={this.state.now} />
      })}
      <h3>每次都改变的key</h3>
      <Controlled key={this.state.now} value={this.state.now} />
    </div>);
  }
})

ReactDOM.render(<App />, document.getElementById('example'));
