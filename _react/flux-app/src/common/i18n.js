import React from 'react';

import request from 'superagent';
import cookie from 'react-cookie';
// import localStorage from './localStorage';

import { Menu } from 'antd';

const locales = {
  'zh_CN': '中文',
  'en_US': 'English',
};

const _current = cookie.load('LOCALE') || 'zh_CN';
const prefix = 'src/i18n/apps-';
let data = {};

// 获取文件路径
function getResource(current) {
  const locale = current || _current;
  cookie.save('LOCALE', locale);
  return new Promise((resolve, reject) => {
    request.get(`${prefix}${locale}.json`).end((error, res) => {
      error ? reject(error) : resolve(res);
      data = res.body;
    });
  });
}
// 翻译方法
function translate(key) {
  return data[key] || key;
}

const Selector = React.createClass({
  propTypes: {
    onSelectLang: React.PropTypes.func,
  },
  getInitialState() {
    return {
      current: _current,
    };
  },
  handleClick(item) {
    this.setState({
      current: item.key,
    });
    if (this.props.onSelectLang) {
      this.props.onSelectLang(item.key, locales);
    }
  },
  render() {
    const items = [];
    for (const key in locales) {
      if (locales.hasOwnProperty(key)) {
        items.push(<Menu.Item key={key}>{locales[key]}</Menu.Item>);
      }
    }
    return <Menu selectedKeys={[this.state.current]} onClick={this.handleClick}>{items}</Menu>;
  },
});

export default {
  Selector,
  getResource,
  gettext: translate,
  currentLang: locales[_current],
};
