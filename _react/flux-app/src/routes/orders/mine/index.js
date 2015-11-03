module.exports = {
  path: '/orders/mine',
  getComponent: (location, callback) => {
    require.ensure([], (require) => {
      callback(null, require('../../../components/orders/MyOrder'));
    });
  },
};
