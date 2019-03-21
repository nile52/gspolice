import * as constant from '../constant/App'

const initialState = {
    id: null,
};

export default function App(state = initialState, action = {}) {
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