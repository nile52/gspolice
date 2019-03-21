import * as constant from '../constant/HistoryCaseManage'

const initialState = {
  num: "",
  pageSize: 20,
  currentParams: {},
};

export default function HistoryCaseManage(state = initialState, action = {}) {
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

