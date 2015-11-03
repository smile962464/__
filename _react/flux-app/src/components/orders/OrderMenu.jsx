import React from 'react';
import { Link } from 'react-router';

const OrderMenu = React.createClass({
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/orders/mine" activeClassName="active">我的工单</Link></li>
          <li><Link to="/orders/submit" activeClassName="active">提交工单</Link></li>
        </ul>
      </div>
    );
  },
});

export default OrderMenu;
