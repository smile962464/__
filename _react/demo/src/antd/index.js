import React from 'react';
import ReactDOM from 'react-dom';

// import js and css modularly, parsed by babel-plugin-antd
import { Button } from 'antd-mobile';

// import pc antd
import { Button as ButtonPc } from 'antd';
// import 'antd/lib/button/style/index.css';
// import ButtonPc from 'antd/lib/button';
import table from './table';
import Misc from './misc';

const App = React.createClass({
  getInitialState() {
    return {
      table: false,
    }
  },
  render() {
    const items = [{id: '1'}, {id: 'header'}];
    return (<div style={{ margin: 10 }}>
      <Button onClick={(e) => this.setState({table: !this.state.table}) }>Start</Button> <br />
      <ButtonPc onClick={(e) => console.log(e)}>Start</ButtonPc>

      <Misc />
      {table(this.state.table)}
    </div>);
  }
})

ReactDOM.render(<App></App>, document.getElementById('example'));
