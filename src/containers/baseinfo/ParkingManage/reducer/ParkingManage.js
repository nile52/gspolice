import * as constant from '../constant/ParkingManage'

const initialState = {
    parkingLotList: [],
    parkingLotJson: {},
    parkingSpaceCodingList: [],
    currentParams: null,
    parkLoading: false,
    pageSize: 20,
    total: 0,
    current: 1
};

export default function ParkingManage(state = initialState, action = {}) {
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

