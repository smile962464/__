import React from 'react';
import ReactDOM from 'react-dom';
// import 'antd-mobile/lib/button/style';
// import Button from 'antd-mobile/lib/button';

// import js and css modularly, parsed by babel-plugin-antd
import { Button } from 'antd-mobile';

const App = React.createClass({
  render() {
    const items = [{id: '1'}, {id: 'header'}];
    return (
      <div style={{ margin: 10 }}>
        <Button onClick={(e) => console.log(e)}>Start</Button>
      </div>
    );
  }
})

ReactDOM.render(<App></App>, document.getElementById('example'));
