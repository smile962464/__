/*
 *
 */
import Resource from '../common/Resource';

const appApi = new Resource('/users/:id/photos/:file', {id: 0}, {
  actionName: {
    method: 'PUT',
    params: {
      file: 'file',
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
