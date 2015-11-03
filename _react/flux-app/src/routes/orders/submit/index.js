module.exports = {
  path: '/orders/submit',
  getComponent: (location, callback) => {
    require.ensure([], (require) => {
      callback(null, require('../../../components/orders/OrderSubmit'));
    });
  },
};
