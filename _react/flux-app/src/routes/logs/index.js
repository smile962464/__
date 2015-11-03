module.exports = {
  path: '/logs',
  getComponent: (location, callback) => {
    require.ensure([], (require) => {
      callback(null, require('../../components/logs'));
    });
  },
};
