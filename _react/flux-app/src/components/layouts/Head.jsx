import React from 'react';
import { Row, Dropdown } from 'antd';
import I18nSelector from '../../common/i18n';
import AppActions from '../../actions/AppActions';

const HomeMenu = React.createClass({
  getInitialState() {
    return {
      lang: '',
    };
  },
  onSelectLang(key, locales) {
    this.locales = locales;
    this.setState({
      lang: key,
    });
    AppActions.getResource(key);
  },
  render() {
    return (
      <Row className="head">
        <div className="header">
          <h1 className="my-logo pull-left">
            <a href="/"><span className="text">蚂蚁金融云</span><span className="beta">公测</span></a>
          </h1>
          <div className="pull-right">
            <ul className="my-nav clearfix">
              <li className="my-nav-list">
                <a href="/" className="link" target="_self"><sapn className="act">首页</sapn><span className="hov">首页</span></a>
              </li>
              <li className="my-nav-list">
                <a href="/solutions" className="link" target="_self"><sapn className="act">解决方案</sapn><span className="hov">解决方案</span></a>
              </li>
              <li className="my-nav-list">
                <a href="/products" className="link" target="_self"><sapn className="act">产品</sapn><span className="hov">产品</span></a>
              </li>
              <li className="my-nav-list">
                <a href="/support" className="link" target="_self"><sapn className="act">文档</sapn><span className="hov">文档</span></a>
              </li>
              <li className="my-nav-list">
                <a href="/support" className="link" target="_self"><sapn className="act">帮助支持</sapn><span className="hov">帮助支持</span></a>
              </li>
              <li className="my-nav-list">
                <a href="/support" className="link" target="_self"><sapn className="act">登录</sapn><span className="hov">登录</span></a>
              </li>
              <li className="my-nav-list">
                <Dropdown overlay={<I18nSelector onSelectLang={this.onSelectLang} />}>
                  <a className="link">{this.locales ? this.locales[this.state.lang] : '中文'}</a>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </Row>
    );
  },
});

export default HomeMenu;
