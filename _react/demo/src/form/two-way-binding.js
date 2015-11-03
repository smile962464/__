import React from 'react';
import ReactDOM from 'react-dom'
import ReactCatalyst from './ReactCatalyst'

var App = React.createClass({
  mixins: [ReactCatalyst.LinkedStateMixin],
  //mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {
      values: [
        {type: "translateX", x: 10},
        {type: "scaleX", x: 1.2}
      ]
    }
  },
  setData: function () {
    this.setState({
      values: [
        {type: "translateX1", x: 101},
        {type: "scaleX1", x: 1.21}
      ]
    })
  },
  render: function () {
    return <div>
            {this.state.values.map(function (item, i) {
              return <div>
                <input valueLink={this.linkState('values.' + i + '.type')}/>
                <input valueLink={this.linkState('values.' + i + '.x')}/>
              </div>
            }, this)}
      <pre>{JSON.stringify(this.state)}</pre>
      <br />
      <button onClick={this.setData}>set data</button>
    </div>;
  }
});

export default App;
