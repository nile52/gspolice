import * as constant from '../constant/HousesManage'

const initialState = {
    buildList: [],
    buildJson: {},
    unitList: [],
    houseList: [],
    layerList: [],
    roomList: [],
    pageSize: 20,
    total: 0,
    current: 1,
    currentParams: {},
    token: null
};

export default function HousesManage(state = initialState, action = {}) {
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

