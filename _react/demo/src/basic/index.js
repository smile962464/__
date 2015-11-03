import React from 'react';
import ReactDOM from 'react-dom'
// require('./index.less');

const Life = React.createClass({
  componentWillUpdate() {
    console.log('componentWillUpdate');
  },
  componentDidUpdate() {
    console.log('componentDidUpdate');
  },
  componentWillMount() {
    console.log('componentWillMount');
  },
  componentDidMount() {
    console.log('componentDidMount');
  },
  render() {
    console.log('render');
    return (
      <div>lifecycle</div>
    );
  }
});

const App = React.createClass({
  getInitialState() {
    return {
      now: 1
    }
  },
  cli() {
    this.setState({
      now: Date.now
    })
  },
  render() {
    return (
      <div>
        <button onClick={this.cli}>switch</button>
        <Life key={this.state.now}></Life>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('example'));
