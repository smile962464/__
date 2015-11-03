import React from 'react';
import { Row, Col } from 'antd';

const Foot = React.createClass({
  render() {
    return (
      <Row className="foot">
        <Row className="foot-main">
          <Col span="24">
            <p className="copyright">蚂蚁金融云版权所有 &copy; 2015 基础资源和备案服务由阿里云提供</p>
          </Col>
        </Row>
      </Row>
    );
  },
});

export default Foot;
