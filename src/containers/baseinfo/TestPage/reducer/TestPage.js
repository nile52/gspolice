import * as constant from '../constant/TestPage'

const initialState = {
    data: 'testpage_props'
};

export default function TestPage(state = initialState, action = {}) {
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
