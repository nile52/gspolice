import * as constant from '../constant/Resident'

const initialState = {
    buildList: [],
    buildJson: {},
    unitList: [],
    houseList: [],
    layerList: [],
    userTypeList: [],
    userTypeJson: {},
    residentList: [],
    parkingLotList: [],
    parkingLotJson: {},
    singleResidentList: {},
    singleHouseList: [],
    singleParkingLotList: [],
    singleUserType: [],
    pageSize: 20,
    total: 0,
    current: 1,
    currentParams: {},
    loading: false,
    residentType: 'edit',
    residentId: null,
    casCaderOptions: [],
    provinceCityArea: '',
    isRequired: true,
    isForeign: false,
    lkbIsWrong: false
};

export default function Resident(state = initialState, action = {}) {
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
