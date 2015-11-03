module.exports = {
  path: '/dashboard',
  getComponent: (location, callback) => {
    require.ensure([], (require) => {
      callback(null, require('../../components/dashboard'));
    });
  },
};
