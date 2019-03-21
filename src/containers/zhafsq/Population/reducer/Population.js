import * as constant from '../constant/Population'

const initialState = {
    data: "Population",
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

export default function Population(state = initialState, action = {}) {
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