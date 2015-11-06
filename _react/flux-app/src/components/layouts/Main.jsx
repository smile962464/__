import React from 'react';
import { Row } from 'antd';

const Main = React.createClass({
  propTypes: {
    children: React.PropTypes.element,
    initData: React.PropTypes.object,
  },
  render() {
    return (
      <Row className="content">
        <Row className="content-main">
          { React.cloneElement(this.props.children, {initData: this.props.initData}) }
        </Row>
      </Row>
    );
  },
});

export default Main;
