import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';

// import js and css modularly, parsed by babel-plugin-antd
import { Button } from 'antd-mobile';
import Form from './Form';
import RefreshControl from './RefreshControl';

const App = React.createClass({
  render() {
    const items = [{id: '1'}, {id: 'header'}];
    return (
      <div style={{ margin: 10 }}>
        <Button type="primary" onClick={(e) => console.log(e) }>Start</Button>
        <Form /> <hr />
        <RefreshControl /> <hr />
      </div>
    );
  }
})

ReactDOM.render(<App></App>, document.getElementById('example'));
