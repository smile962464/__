import React from 'react';
import ReactDOM from 'react-dom';

import { Button, Group } from './ParentChildren';
import { WrapButton, WrapGroup } from './Wrap';

const App = React.createClass({
  render() {
    return (<div>
      <h3>buttonGroup - button</h3>
      <Group>
        <Button key={1} id={1} name="Component A"/>
        <Button key={2} id={2} name="Component B"/>
        <Button key={3} id={3} name="Component C"/>
      </Group>

      <br/>
      <Group>
        {[1, 2, 3].map(i => <Button key={i} id={i} name={`Component ${i}`} />)}
      </Group>

      <br />
      <WrapGroup>
        {[11, 22, 33].map(i => <WrapButton key={i} id={i} name1={`Component ${i}`} />)}
      </WrapGroup>
    </div>);
  }
})

ReactDOM.render(<App></App>, document.getElementById('example'));
