import React from 'react';
import ReactDOM from 'react-dom'

export default React.createClass({
  componentWillReceiveProps(nextProps) {
    // invoked when component is receiving props, not for initial 'render'
    console.log('Life componentWillReceiveProps');
  },
  componentWillUpdate(nextProps, nextState) {
    // invoked immediately before rendering with new props or state, not for initial 'render'
    // see componentWillReceiveProps if you need to call setState
    console.log('Life componentWillUpdate');
  },
  componentDidUpdate(prevProps, prevState) {
    // invoked immediately after DOM updates, not for initial 'render'
    console.log('Life componentDidUpdate');
  },
  componentWillMount() {
    // invoked once, before initial 'render'
    console.log('Life componentWillMount');
  },
  componentWillUnmount() {
    // invoked immediately before a component is unmounted from the DOM
    console.log('Life componentWillUnmount');
  },
  componentDidMount() {
    // invoked once (client-only), after initial 'render'
    // good for AJAX, setTimeout, setInterval
    console.log('Life componentDidMount');
    this.refs.container.addEventListener('mousedown', (e) => {
      console.log('mousedown event', e);
    }, false);
  },
  shouldComponentUpdate(nextProps, nextState) {
    // invoked before rendering with new props, not for initial 'render'
    console.log('Life shouldComponentUpdate');
    return true;
  },
  render() {
    console.log('Life render');
    return (<div ref="container">
      see console
    </div>);
  }
});
