import * as constant from '../constant/Page'

const initialState = {
  userKey: null,
  userInfo: null,
  xqId: null,
};

export default function Page(state = initialState, action = {}) {
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
