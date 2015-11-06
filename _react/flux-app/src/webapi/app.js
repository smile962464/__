/*
 *
 */
import Resource from '../common/Resource';

const appApi = new Resource('/tests/:id/attr/:sub', {id: 0}, {
  actionName: {
    method: 'PUT',
    params: {
      sub: 'sub',
      argExa: true,
    },
  },
}, {
  timeout: 1000,
  headers: {
    jry: 'jin rong yun',
  },
});

appApi.get({}).then(res => {
  window.console.log('Resource get ', res);
});

// invoke custom action
appApi.actionName({}, {postBody: 'custom body'}).then(res => {
  window.console.log('Resource actionName ', res);
});


export default appApi;
