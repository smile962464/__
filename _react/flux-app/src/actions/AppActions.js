import AppDispatcher from '../common/AppDispatcher';
import Constants from '../constants/Constants';
import appApi from '../webapi/App';
import I18nSelector from '../common/i18n';

export default {
  getResource: (key) => {
    AppDispatcher.ajaxStart({
      type: Constants.I18N_RESOURCE_LOADED,
    });
    I18nSelector.getResource(key).then(res => {
      AppDispatcher.ajaxEnd({
        type: Constants.I18N_RESOURCE_LOADED,
        data: res,
      });
    });
  },
  loadPage: (path, cb) => {
    AppDispatcher.ajaxStart({
      type: Constants.INIT,
    });

    appApi.get(123).then((res) => {
      AppDispatcher.ajaxEnd({
        type: Constants.INIT,
        data: res,
      });
      if (cb) {
        cb();
      }
    });
  },
};
