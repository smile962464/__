require('antd/lib/index.css');
require('./styles/index.less');

import React from 'react';
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history';
import { Router } from 'react-router';
import routeConfig from './routes';

const history = createHashHistory({
  queryKey: false,
});

ReactDOM.render(
  <Router routes={routeConfig} history={history} />,
  document.getElementById('react-content')
);
