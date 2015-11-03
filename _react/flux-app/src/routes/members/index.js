export default {
  path: '/members',
  getComponent: (location, callback) => {
    require.ensure([], (require) => {
      callback(null, require('../../components/members'));
    });
  },
};
