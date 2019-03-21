import * as constant from '../constant/XQBuildDetailInfo'

const initialState = {
    data: "XQBuildDetailInfo",
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

export default function XQBuildDetailInfo(state = initialState, action = {}) {
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