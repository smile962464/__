import React from 'react';
import ReactDOM from 'react-dom'
// require('./index.less');

const Life = React.createClass({
  componentWillUpdate() {
    console.log('Life componentWillUpdate');
  },
  componentDidUpdate() {
    console.log('Life componentDidUpdate');
  },
  componentWillMount() {
    console.log('Life componentWillMount');
  },
  componentDidMount() {
    console.log('Life componentDidMount');
    this.refs.container.addEventListener('mousedown', (e) => {
      console.log('mousedown event', e);
    }, false);
  },
  render() {
    console.log('Life render');
    return (<div ref="container">
      defaultValue： <input defaultValue={this.props.defaultValue} /> <br />
      value：<input value={this.props.defaultValue} />
    </div>);
  }
});

const App = React.createClass({
  getInitialState() {
    return {
      now: 1
    }
  },
  componentDidMount() {
    console.log('App componentDidMount');
  },
  cli() {
    this.setState({
      now: Date.now()
    })
  },
  render() {
    return (<div>
        <button onClick={this.cli}>switch</button>
        <h3>不设置key</h3>
        <Life defaultValue={this.state.now}></Life>
        <h3>每次都改变的key</h3>
        <Life key={this.state.now} defaultValue={this.state.now}></Life>
        <h3>一列固定数字的key</h3>
        {[1,2,3,4].map((item, index) => {
          return <Life key={index} defaultValue={this.state.now}></Life>
        })}
    </div>);
  }
})

ReactDOM.render(<App />, document.getElementById('example'));
