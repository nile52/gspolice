import * as constant from '../constant/HouseSituation'

const initialState = {
    data: "HouseSituation"
};

export default function HouseSituation(state = initialState, action = {}) {
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