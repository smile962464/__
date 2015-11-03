module.exports = {
  path: '/userinfo',
  getComponent: (location, callback) => {
    require.ensure([], (require) => {
      callback(null, require('../../components/userinfo'));
    });
  },
};
