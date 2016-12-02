import React from 'react';
import ReactDOM from 'react-dom';

// import 'antd-mobile/lib/button/style/index.css';
// import Button from 'antd-mobile/lib/button';
// import 'antd-mobile/lib/list-view/style/index.css';
// import ListView from 'antd-mobile/lib/list-view';

import Misc from './Misc';
import Carousel from './Carousel.js';
import Form from './Form';
import RefreshControl from './RefreshControl';
import Modal from './Modal';
import Popup from './Popup';

import './index.less';

const App = React.createClass({
  render() {
    const items = [{id: '1'}, {id: 'header'}];
    return (<div className="container" id="container">
      <div className="body">
        <Misc />
        <Carousel />
        <Modal /> <Popup />
        <Form /> <hr />
        <RefreshControl /> <hr />
      </div>
      <div className="fixed-bottom">底部固定条</div>
    </div>);
  }
})

ReactDOM.render(<App></App>, document.getElementById('example'));
