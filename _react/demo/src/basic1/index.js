import React from 'react';
import ReactDOM from 'react-dom'

import { Button, Group } from './callback';
import { Parent } from './children';

const App = React.createClass({
  render() {
    return (<div>
      <h3>buttonGroup - button</h3>
      <Group ref="buttonGroup">
        <Button key={1} name="Component A"/>
        <Button key={2} name="Component B"/>
        <Button key={3} name="Component C"/>
      </Group>
      <h3>test React.Children methods</h3>
      <Parent>
        <div key={1}>
          2 <br />
          <span>1</span> <br />
          <span>11</span>
        </div>
      </Parent>
    </div>);
  }
})

ReactDOM.render(<App></App>, document.getElementById('example'));
