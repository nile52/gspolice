import * as constant from '../constant/Security'

const initialState = {
    data: "Security",
    xqInfo: null,
    diLoading: false,
    xqid: '',
    servicesChannelList: [],
    XQSecurityTypeTotal: [
        3008,
        1010,
        1250,
        740
    ]
};

export default function Security(state = initialState, action = {}) {
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