import React from 'react';
import ReactDOM from 'react-dom'

class MyComponent extends React.Component {
  static defaultProps = {
    prefixCls: 'cls',
  };

  constructor(props) {
    super(props);
    console.log('constructor');
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
    return true;
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    console.log('render');
    return null;
  }
}

ReactDOM.render(<MyComponent />, document.getElementById('example'));
ReactDOM.unmountComponentAtNode(document.getElementById('example'));
ReactDOM.render(<MyComponent />, document.getElementById('example'));
ReactDOM.render(<MyComponent />, document.getElementById('example'));
