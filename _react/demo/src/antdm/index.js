import React from 'react';
import ReactDOM from 'react-dom';

// import Menu from 'antd-mobile/lib/menu'
// import'antd-mobile/lib/menu/style'
// import Grid from 'antd-mobile/lib/grid'
// import'antd-mobile/lib/grid/style'
// import Button from 'antd-mobile/lib/button'
// import'antd-mobile/lib/button/style'
// import ActivityIndicator from 'antd-mobile/lib/activity-indicator'
// import'antd-mobile/lib/activity-indicator/style'
// import NavBar from 'antd-mobile/lib/nav-bar'
// import'antd-mobile/lib/nav-bar/style'
// import Icon from 'antd-mobile/lib/icon'
// import'antd-mobile/lib/icon/style'
// import RefreshControl from 'antd-mobile/lib/refresh-control'
// import'antd-mobile/lib/refresh-control/style'
// import SearchBar from 'antd-mobile/lib/search-bar'
// import 'antd-mobile/lib/search-bar/style'
// import Tabs from 'antd-mobile/lib/tabs'
// import'antd-mobile/lib/tabs/style'
// import Timeline from 'antd-mobile/lib/timeline'
// import'antd-mobile/lib/timeline/style'
// import Steps from 'antd-mobile/lib/steps'
// import'antd-mobile/lib/steps/style'
// import Carousel from 'antd-mobile/lib/carousel'
// import'antd-mobile/lib/carousel/style'
// import Table from 'antd-mobile/lib/table'
// import'antd-mobile/lib/table/style'

// import pc antd
// import { ButtonPc } from 'antd';
// import 'antd/lib/button/style/index.css';
// import ButtonPc from 'antd/lib/button';

// import js and css modularly, parsed by babel-plugin-antd
import { Button, Card } from 'antd-mobile';
import Form from './Form';

const App = React.createClass({
  render() {
    const items = [{id: '1'}, {id: 'header'}];
    return (
      <div style={{ margin: 10 }}>
        <Button data-seed="xyz" type="primary" onClick={(e) => console.log(e) }>Start</Button> <br />
        {/** <ButtonPc onClick={(e) => console.log(e) }>Start</ButtonPc> */}
        <Form />
        <Card data-seed="xyz1">
          <Card.Header
            title="这是 title"
            thumb="http://gravatar.com/avatar/e9c13fb979736b16033acbce4c710ca1.png?size=32"
            extra={<span>this is extra</span>}
          />
          <Card.Body>
            <div>这是卡片内容</div>
          </Card.Body>
          <Card.Footer content="这是卡尾" extra={<div>这是尾部介绍</div>} />
        </Card> 
      </div>
    );
  }
})

ReactDOM.render(<App></App>, document.getElementById('example'));
