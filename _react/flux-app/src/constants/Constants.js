import keyMirror from 'keyMirror';

const ActionTypes = keyMirror({
  INIT: null,
  I18N_RESOURCE_LOADED: null,

  DASHBOARD_INIT: null,
  GET_MEMBERS: null,
});

export default ActionTypes;
