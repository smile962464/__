import React from 'react';
import ReactDOM from 'react-dom'
// import Comp from './comp'
// require('./index.less');

const App = React.createClass({
  render() {
    const items = [{id: '1'}, {id: 'header'}];
    return (
      <div>
        <span key="header">12</span>
        {items.map((item) => <span key={item.id} />)}
        demo
      </div>
    );
  }
})

ReactDOM.render(<App></App>, document.getElementById('example'));
