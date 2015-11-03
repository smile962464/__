import React from 'react';
import OrderMenu from './OrderMenu';

const Orders = React.createClass({
  propTypes: {
    children: React.PropTypes.element,
  },

  getDefaultProps() {
    return {
      children: React.PropTypes.node,
    };
  },

  render() {
    return (
      <div>
        <OrderMenu/>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  },
});

export default Orders;
