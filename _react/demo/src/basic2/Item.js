import React from 'react';
import ReactDOM from 'react-dom'

export default React.createClass({
  render() {
    return (
      <div>
        item {this.props.index}
      </div>
    );
  }
});
