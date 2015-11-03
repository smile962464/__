/*
 *
 */
import AppDispatcher from '../common/AppDispatcher';
import {EventEmitter} from 'events';
import assign from 'object-assign';

import Constants from '../constants/Constants';

const CHANGE_EVENT = 'change';
const data = {};
const AppStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getData() {
    return data;
  },
});
AppStore.dispatcherToken = AppDispatcher.register((payload) => {
  if (!data[payload.type]) {
    data[payload.type] = {};
  }
  if (payload._loading !== undefined) {
    data[payload.type]._loading = payload._loading;
    if (payload._loading === false) {
      // ajax loaded
      data[payload.type].res = payload.data;
    }
  }

  switch (payload.type) {
  case Constants.I18N_RESOURCE_LOADED:
    break;
  case Constants.INIT:
    break;
  default:
  }
  AppStore.emitChange();
});
export default AppStore;
