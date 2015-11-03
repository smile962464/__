/*
 *
 */
import AppDispatcher from '../common/AppDispatcher';
import {EventEmitter} from 'events';
import assign from 'object-assign';

import Constants from '../constants/Constants';

const CHANGE_EVENT = 'change';
const data = {};
const DashboardStore = assign({}, EventEmitter.prototype, {
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
DashboardStore.dispatcherToken = AppDispatcher.register((payload) => {
  switch (payload.type) {
  case Constants.INIT:
    break;
  default:
  }
});

export default DashboardStore;
