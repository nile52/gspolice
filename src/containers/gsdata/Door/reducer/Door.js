import * as constant from '../constant/Door'

const initialState = {
    data: "Door",
    xqInfo: null,
    diLoading: false,
    xqid: '',
    servicesChannelList: [],
    XQHouseTypeTotal: [
        3008,
        1010,
        1250,
        740
    ]
};

export default function Door(state = initialState, action = {}) {
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