import React from 'react';
import ReactCatalyst from './ReactCatalyst'

var App = React.createClass({
  mixins: [ReactCatalyst.LinkedStateMixin],
  //mixins: [React.addons.LinkedStateMixin],
  getInitialState() {
    return {
      values: [
        {type: "translateX", x: 10},
        {type: "scaleX", x: 1.2}
      ]
    }
  },
  setData() {
    this.setState({
      values: [
        {type: "translateX1", x: 101},
        {type: "scaleX1", x: 1.21}
      ]
    })
  },
  render() {
    return <div>
      {this.state.values.map(function (item, i) {
        return <div key={i}>
          <input valueLink={this.linkState('values.' + i + '.type')}/>
          <input valueLink={this.linkState('values.' + i + '.x')}/>
        </div>
      }, this)}
      <pre>{JSON.stringify(this.state, null, '  ')}</pre>
      <br />
      <button onClick={this.setData}>set data</button>
    </div>;
  }
});

export default App;
