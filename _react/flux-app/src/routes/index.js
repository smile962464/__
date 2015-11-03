const routeConfig = [
  {
    path: '/',
    component: require('../components/App'),
    indexRoute: {
      getComponent: (location, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../components/dashboard'));
        });
      },
      onEnter: (nextState, replaceState) => {
        replaceState(null, '/dashboard');
      },
    },
    childRoutes: [
      require('./dashboard'),
      require('./userinfo'),
      require('./members'),
      require('./logs'),
      require('./orders'),
    ],
  },
  {
    path: '*',
    component: require('../components/404'),
  },
];

export default routeConfig;
