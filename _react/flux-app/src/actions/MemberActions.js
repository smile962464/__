import AppDispatcher from '../common/AppDispatcher';
import membersApi from '../webapi/members';
import Constants from '../constants/Constants';

export default {
  getMembers() {
    AppDispatcher.ajaxStart({
      type: Constants.GET_MEMBERS,
    });

    membersApi.get()
      .then((res) => {
        AppDispatcher.ajaxEnd({
          type: Constants.GET_MEMBERS,
          data: res.body,
        });
      });
  },
};
