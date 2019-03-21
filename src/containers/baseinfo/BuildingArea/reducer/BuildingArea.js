import * as constant from '../constant/BuildingArea'

const initialState = {
    buildList: [],
    pageSize: 20,
    total: 0,
    current: 1
};

export default function BuildingArea(state = initialState, action = {}) {
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

