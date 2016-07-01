import React from 'react';
import ReactDOM from 'react-dom';
import Item from './Item';

let index = 2;

const App = React.createClass({
  getInitialState() {
    return {
      items: [{id: '1'}, {id: 'header'}],
    }
  },
  onItemClick() {
    this.setState({
      // items: [...this.state.items, { id: Math.random() + ++index }],
      items: this.state.items.push({ id: Math.random() + ++index }) && this.state.items,
    });
  },
  render() {
    const items = this.state.items;
    return (<div style={{display: 'flex'}}>
      <div style={{marginRight: 10}}>
        {items.map((item) => <Item key={item.id} />)}
        <div><button onClick={this.onItemClick}>add</button></div>
      </div>
      <div>
        {items.map((item) => <div key={item.id}>normal span {item.id}</div>)}
        <div><button onClick={this.onItemClick}>add</button></div>
      </div>
    </div>);
  }
})

ReactDOM.render(<App></App>, document.getElementById('example'));
