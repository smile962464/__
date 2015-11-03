import React from 'react';
import { Link } from 'react-router';
import { Row } from 'antd';

const MainMenu = React.createClass({
  render() {
    return (
      <Row className="content-nav">
        <ul className="nav">
          <li><Link to="/dashboard" className="nav-item" activeClassName="nav-item-active">总览</Link></li>
          <li><Link to="/userinfo" className="nav-item"  activeClassName="nav-item-active">个人信息</Link></li>
          <li><Link to="/members" className="nav-item"  activeClassName="nav-item-active">成员管理</Link></li>
          <li><Link to="/logs" className="nav-item"  activeClassName="nav-item-active">操作日志</Link></li>
          <li><Link to="/orders" className="nav-item"  activeClassName="nav-item-active">工单服务</Link></li>
        </ul>
      </Row>
    );
  },
});

export default MainMenu;
