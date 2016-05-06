import React from 'react';
import ReactDOM from 'react-dom'

const Comp = React.createClass({
  getInitialState() {
    console.log('getInitialState');
    return {
      now: 1
    }
  },
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
    return (
        <div>
          demo
        </div>
    );
  }
})

export default Comp;
