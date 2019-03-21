import * as constant from '../constant/CarsManage'

const initialState = {};

export default function CarsManage(state = initialState, action = {}) {
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
