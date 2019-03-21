import * as constant from '../constant/Institution'

const initialState = {
    data: "Institution",
    xqInfo: null,
    diLoading: false,
    xqid: '',
    servicesChannelList: [],
    XQInstitutionTypeTotal: [
        3008,
        1010,
        1250,
        740
    ]
};

export default function Institution(state = initialState, action = {}) {
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