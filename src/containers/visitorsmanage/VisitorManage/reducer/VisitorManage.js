import * as constant from '../constant/VisitorManage'

const initialState = {
    buildList: [],
    buildJson: {},
    unitList: [],
    layerList: [],
    roomList: [],
    visitorList: [],
    visitorLoading: false,
    pageSize: 20,
    total: 0,
    current: 1,
    currentParams: {},
};

export default function VisitorManage(state = initialState, action = {}) {
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
