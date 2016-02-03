import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'
import Api from '../services/Api'

var Store = {

  getDatas: function() {
    Api
      .get('grosse URL')
      .then(function (res) {
        AppDispatcher.handleViewAction({
          actionType: AppConstants.GET_DATA_SUCCESS,
          datas: res.body.datas
        });
      })
      .catch(function (res) {
        AppDispatcher.handleViewAction({
          actionType: AppConstants.GET_DATA_FAILED
        });
      });
  }
};

module.exports = Event;