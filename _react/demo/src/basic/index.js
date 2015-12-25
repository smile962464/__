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
  },
  render() {
    console.log('Life render');
    return (<div>
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
        <Life defaultValue={this.state.now + '--'}></Life>
        <Life key={this.state.now} defaultValue={this.state.now}></Life>
    </div>);
  }
})

ReactDOM.render(<App />, document.getElementById('example'));
