import * as constant from '../constant/ServicesManageSearch'

const initialState = {
    servicesBrandList: [],
    servicesList: [],
    pageSize: 20, 
    total: 0, 
    current: 1,
};

export default function ServicesManageSearch(state = initialState, action = {}) {
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

