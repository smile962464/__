require('./index.less');

import React from 'react';
import { Row, Col } from 'antd';
import DashboardAction from '../../actions/DashboardAction';
import DashboardStore from '../../stores/DashboardStore';
import { gettext } from '../../common/i18n';

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
    // const state = this.state;
    const props = this.props;

    const initData = props.initData.INIT;
    const i18nData = props.initData.I18N_RESOURCE_LOADED;

    const init = initData ? <div>
      loading state：{initData._loading ? 'loading...' : 'loaded' } <br />
      content：{JSON.stringify(initData.res ? initData.res.body : '')}
    </div> : '';

    const i18n = i18nData ? <div>
    <h1>右上角切换中英文状态</h1>
    使用方式：{gettext('app.name')}
    </div> : '';

    // console.log('xxx', props);
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
        <Row>
          <div className="test">
                <h2>Dashboard</h2>
                <span className={style.sam}>local style</span>
                {init}
                <hr />
                {i18n}
              </div>
        </Row>
      </div>
    );
  },
});

export default Dashboard;
