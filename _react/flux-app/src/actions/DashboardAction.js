import AppDispatcher from '../common/AppDispatcher';
import Constants from '../constants/Constants';

export default {
  loadPage: function loadPage() {
    AppDispatcher.ajaxStart({
      type: Constants.DASHBOARD_INIT,
    });

  },
};
