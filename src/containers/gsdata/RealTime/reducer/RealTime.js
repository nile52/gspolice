import * as constant from '../constant/RealTime'

const initialState = {
    data: "RealTime",
    xqInfo: null,
    diLoading: false,
    xqid: '',
    servicesChannelList: [],
    XQHouseTypeTotal: [
        3008,
        1010,
        1250,
        740
    ],
    currentModalPage: 1,
    playlist: [],
    topPlayUrl: "http://112.17.106.71:7086/live/cameraid/1000072%2410/substream/1.m3u8",
    topPlayTitle: "拱墅区·上塘街道·蔡马人家·12栋1单元负一层人脸1.163"
};

export default function RealTime(state = initialState, action = {}) {
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