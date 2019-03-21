import * as constant from '../constant/LogQueryList'

const initialState = {
    logApiList: [],
    logQueryList: [],
    pageSize: 20,
    total: 0,
    current: 1,
    currentParams: {},
};

export default function LogQueryList(state = initialState, action = {}) {
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

