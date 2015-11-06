import React from 'react';
import { Row, Dropdown } from 'antd';
import AppActions from '../../actions/AppActions';

import { Selector as I18nSelector, gettext, currentLang } from '../../common/i18n';

const HomeMenu = React.createClass({
  getInitialState() {
    return {
      lang: currentLang,
    };
  },
  onSelectLang(key, locales) {
    this.setState({
      lang: locales[key],
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
                <a href="/" className="link" target="_self"><sapn className="act">{gettext('head.home')}</sapn><span className="hov">{gettext('head.home')}</span></a>
              </li>
              <li className="my-nav-list">
                <a href="/solutions" className="link" target="_self"><sapn className="act">{gettext('head.solution')}</sapn><span className="hov">{gettext('head.solution')}</span></a>
              </li>
              <li className="my-nav-list">
                <a href="/products" className="link" target="_self"><sapn className="act">{gettext('head.product')}</sapn><span className="hov">{gettext('head.product')}</span></a>
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
                  <a className="link">{this.state.lang}</a>
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
