/* eslint-disable */
import * as constant from '../constant/RealTime'
import axios from 'axios'
import utils from '../../../../util/util'
import {
    CAS_LOGIN, 
    CAS_CASCHECK,
    WEI_ZONE_INFO,
    WEI_SERVICE_CHANNEL,
    WEI_EQPT_TOTAL,
    WEI_EQPT_SERACH,
    WEI_PLAY,
    WEI_MQ,
} from '../../../../fetch/apis'

function casCheck(userKey) {
    const PARAMS = {
        userKey: userKey,
    }
    axios.get(CAS_CASCHECK, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            Modal.info({
                title: '异常',
                content: "网络异常",
                onOk() {},
            });
        } else {
            utils.toLoginUrl(CAS_LOGIN)
            localStorage.setItem('userKey', null)
            localStorage.setItem('id', null)
        }
    }).catch(function (error) {
        console.log(error)
        utils.toLoginUrl(CAS_LOGIN)
        localStorage.setItem('userKey', null)
        localStorage.setItem('id', null)
    });
}

function actionCreator(type, data) {
    return {
        type: type,
        payload: data
    }
}

export const changev=(value)=>(dispatch)=>{
    return dispatch(actionCreator(constant.CHANGEV,value));
};

// 级联结构数据
export const getLevel = () => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(WEI_ZONE_INFO, {
        userKey: p_userKey,
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                level: data
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
          })); 
        console.log(error)
        //casCheck(p_userKey)
    });
}

export const getEquipmentTotal = (cb) => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    const level = getState().GSIndex.level ? getState().GSIndex.level : 'districtId'
    const levelId = getState().GSIndex.levelId ? getState().GSIndex.levelId : '2'
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    params[level] = levelId
    params['userKey'] = p_userKey
    params['type'] = 1
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(WEI_EQPT_TOTAL, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        let data = res.data
        if(data.msg == "成功" && data.success) {
            // console.log(data);
          let eqptEquipmentInfo = data.obj;
          if(cb) cb()
          return dispatch(actionCreator(constant.CHANGEV, {
            equipmentInfo: eqptEquipmentInfo,
            equipmentList: eqptEquipmentInfo.eqptEquipment,
          })); 
        } else {
          casCheck(p_userKey)
        }
    }).catch(function (error) {
          dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
          })); 
          console.log(error)
          //casCheck(p_userKey)
      });
}

// 获取摄像头列表，摄像头加上视频流地址
export const getServicesChannelList= () => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    const localId = localStorage.getItem('id')
    let p_userKey = ''
    let p_id = '' 
    if (localUserKey && localId) {
        p_userKey = localUserKey
        p_id = localId
    }
    const PARAMS = {
        userKey: p_userKey,
        zoneId: p_id,
        longitudeNull: 1,
        latitudeNull: 1
    }
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.get(WEI_SERVICE_CHANNEL, {
        params: PARAMS
    })
    .then(function (res) {
        console.log(res);
        
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data 
            return dispatch(actionCreator(constant.CHANGEV, {
                servicesChannelList: data
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
          })); 
        console.log(error)
        //casCheck(p_userKey)
    });
}

// 获取所有摄像头列表，摄像头加上视频流地址
export const getServicesChannelListAll = (page=1) => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    const localId = localStorage.getItem('id')
    let p_userKey = ''
    let p_id = '' 
    if (localUserKey && localId) {
        p_userKey = localUserKey
        p_id = localId
    }
    const PARAMS = {
        userKey: p_userKey,
        zoneId: p_id,
        pages: page,
        limit: 30
    }
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.get(WEI_SERVICE_CHANNEL, {
        params: PARAMS
    })
    .then(function (res) {       
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data 
            const total = res.data.obj.total 
            const totalPager = res.data.obj.totalPager
            return dispatch(actionCreator(constant.CHANGEV, {
                currentModalPage: page,
                servicesChannelListAll: data,
                servicesChannelListTotal: total,
                servicesChannelListTotalPager: totalPager,
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
          })); 
        console.log(error)
        //casCheck(p_userKey)
    });
}

export const getEquipmentList = (name, cb) => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    const level = getState().GSIndex.level ? getState().GSIndex.level : 'districtId'
    const levelId = getState().GSIndex.levelId ? getState().GSIndex.levelId : '2'
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    params[level] = levelId
    params['userKey'] = p_userKey
    params['type'] = 1
    params['name'] = name
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(WEI_EQPT_SERACH, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        let data = res.data
        if(data.msg == "成功" && data.success) {
            // console.log(data);
          let eqptEquipmentList = data.obj;
          if(cb) cb()
          return dispatch(actionCreator(constant.CHANGEV, {
            equipmentList: eqptEquipmentList,
          })); 
        } else {
          casCheck(p_userKey)
        }
    }).catch(function (error) {
          dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
          })); 
          console.log(error)
          //casCheck(p_userKey)
    });
}

export const getPlay = (value, cb) => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    const levelId = getState().GSIndex.levelId ? getState().GSIndex.levelId : '2'
    dispatch(actionCreator(constant.CHANGEV, {
        dpLoading: true
    })); 
    const PARAMS = {
        userKey: localUserKey,
        zoneId: levelId,
        equipmentChannelId: value,
    }
    axios.get(WEI_DEFAULT_PLAY, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            dispatch(actionCreator(constant.CHANGEV, {
                dpLoading: false
            }));
            // dispatch(actionCreator(constant.CHANGEV, {
            //     playUrl: data
            // })); 
            if (cb) cb(data)
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(localUserKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
        })); 
        console.log(error)
        casCheck(localUserKey)
    });
}

export const getDefaultPlays = (value, cb) => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    const levelId = getState().GSIndex.levelId ? getState().GSIndex.levelId : '2'
    dispatch(actionCreator(constant.CHANGEV, {
        playlist: [
            { 
              id: 4160,
              title: '拱墅区·上塘街道·蔡马人家·蔡马小区入口人脸1.90',
              playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%240/substream/1.m3u8"
            },
            { 
              id: 4161,
              title: '拱墅区·上塘街道·蔡马人家·2栋负一层东人脸1.209',
              playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%241/substream/1.m3u8"
            },
            { 
              id: 4162,
              title: '拱墅区·上塘街道·蔡马人家·3栋负一层东人脸1.212',
              playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%242/substream/1.m3u8"
            },
            { 
              id: 4164,
              title: '拱墅区·上塘街道·蔡马人家·8栋负一层东人脸1.130',
              playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%243/substream/1.m3u8"
            },
            { 
              id: 4169,
              title: '拱墅区·上塘街道·蔡马人家·8栋负一层西人脸1.132',
              playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%244/substream/1.m3u8"
            },
            { 
              id: 4171,
              title: '拱墅区·上塘街道·蔡马人家·9栋负一层人脸1.223',
              playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%245/substream/1.m3u8"
            },
            { 
              id: 4178,
              title: '拱墅区·上塘街道·蔡马人家·2栋负一层西人脸1.204',
              playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%246/substream/1.m3u8"
            },
            { 
              id: 4199,
              title: '拱墅区·上塘街道·蔡马人家·11栋1单元负一层人脸1.85',
              playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%247/substream/1.m3u8"
            },
            { 
              id: 4201,
              title: '拱墅区·上塘街道·蔡马人家·12栋1单元负一层人脸1.163',
              playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%248/substream/1.m3u8"
            },
            { 
              id: 4204,
              title: '拱墅区·上塘街道·蔡马人家·12栋1单元负一层人脸1.163',
              playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%249/substream/1.m3u8"
            },
            { 
              id: 4209,
              title: '拱墅区·上塘街道·蔡马人家·蔡马小区入口人脸',
              playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%2410/substream/1.m3u8"
            },
          ]
    })); 
         
}

export const getVideoList = (value, cb) => (dispatch, getState) => {
    axios.get(WEI_MQ)
    .then(function (res) {
        var playlist = res.data

        console.log(playlist)
        dispatch(actionCreator(constant.CHANGEV, {
            playlist: res.data
        })); 
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
        })); 
        console.log(error)
        // casCheck(localUserKey)
    });
}