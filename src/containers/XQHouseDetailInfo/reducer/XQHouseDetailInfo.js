import * as constant from '../constant/XQHouseDetailInfo'

const initialState = {
    data: "XQHouseDetailInfo",
    xqInfo: null,
    diLoading: false,
    servicesChannelList: [],
    
    XQHouseTypeTotal: [
        3008,
        1010,
        1250,
        740
    ]
};

export default function XQHouseDetailInfo(state = initialState, action = {}) {
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