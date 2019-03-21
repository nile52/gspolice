import * as constant from '../constant/accountManage'

const initialState = {
    logApiList: [],
    accountManage: [],
    pageSize: 20,
    total: 0,
    current: 1,
    currentParams: {},
};

export default function accountManage(state = initialState, action = {}) {
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

