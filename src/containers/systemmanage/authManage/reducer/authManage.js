import * as constant from '../constant/LogQueryList'

const initialState = {
    logApiList: [],
    authManage: [],
    pageSize: 20,
    total: 0,
    current: 1,
    currentParams: {},
};

export default function authManage(state = initialState, action = {}) {
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

