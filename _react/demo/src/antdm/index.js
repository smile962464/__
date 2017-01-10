import React from 'react';
import ReactDOM from 'react-dom';

import { Button } from 'antd-mobile';
import './index.less';

const App = React.createClass({
  render() {
    return (<div className="container" id="container">
      <Button loading>btn</Button>
    </div>);
  }
})

ReactDOM.render(<App></App>, document.getElementById('example'));
