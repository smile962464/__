require('./index.less');

import React from 'react';
import { Row, Col } from 'antd';
import DashboardAction from '../../actions/DashboardAction';
import DashboardStore from '../../stores/DashboardStore';

import style from './index.less';

const Dashboard = React.createClass({
  getInitialState() {
    return {
      page: DashboardStore.getData(),
    };
  },
  componentDidMount() {
    DashboardAction.loadPage();
    DashboardStore.addChangeListener(this.handleChange);
  },
  componentWillUnmount() {
    DashboardStore.removeChangeListener(this.handleChange);
  },
  handleChange() {
    this.setState({
      page: DashboardStore.getData(),
    });
  },
  render() {
    const props = this.props;

    const initData = props.initData.INIT;
    const i18nData = props.initData.I18N_RESOURCE_LOADED;

    return (
      <div className="content-dashboard">
        <Row className="banner">
            <Row className="banner-title">
              <Col span="24">
                <h3>某某企业</h3>
                <div></div>
              </Col>
            </Row>
            <Row>
              <Col span="12" className="banner-bd-item" />
              <Col span="12" className="banner-bd-item" />
            </Row>
        </Row>
      </div>
    );
  },
});

export default Dashboard;
