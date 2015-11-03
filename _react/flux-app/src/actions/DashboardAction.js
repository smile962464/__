import AppDispatcher from '../common/AppDispatcher';
import Constants from '../constants/Constants';
import dashboardApi from '../webapi/dashboard';

export default {
  loadPage: function loadPage() {
    AppDispatcher.ajaxStart({
      type: Constants.DASHBOARD_INIT,
    });

    dashboardApi.get(123).then((res) => {
      AppDispatcher.ajaxEnd({
        type: Constants.DASHBOARD_INIT,
        data: res,
      });
    });
  },

};
