module.exports = {
  path: '/orders',
  getComponent: (location, callback) => {
    require.ensure([], (require) => {
      callback(null, require('../../components/orders'));
    });
  },
  childRoutes: [
    require('./mine'),
    require('./submit'),
  ],
};
