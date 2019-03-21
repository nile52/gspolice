import * as constant from '../constant/XQDetailInfo'
import utils from '../../../util/util'

const initialState = {
    data: "XQDetailInfo",
    xqInfo: null,
    diLoading: false,
    servicesChannelList: [],
    xqId: utils.getQueryVariable('zoneId'),
    XQHouseTypeTotal: [
        3008,
        1010,
        1250,
        740
    ]
};

export default function XQDetailInfo(state = initialState, action = {}) {
  switch (action.type) {
      case constant.CHANGEV:
          return {
              ...state,
              ...action.payload,
          };
    default:
      return state;
  }
}