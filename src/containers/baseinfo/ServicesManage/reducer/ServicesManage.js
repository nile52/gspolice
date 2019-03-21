import * as constant from '../constant/ServicesManage'

const initialState = {};

export default function ServicesManage(state = initialState, action = {}) {
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
