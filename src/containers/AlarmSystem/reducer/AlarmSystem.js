import * as constant from '../constant/AlarmSystem'

const initialState = {
    data: "AlarmSystem"
};

export default function AlarmSystem(state = initialState, action = {}) {
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