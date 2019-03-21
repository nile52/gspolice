import * as constant from '../constant/RegisterManage'

const initialState = {};

export default function RegisterManage(state = initialState, action = {}) {
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
