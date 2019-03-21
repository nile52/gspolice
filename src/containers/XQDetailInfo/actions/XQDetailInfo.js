/* eslint-disable */
import * as constant from '../constant/XQDetailInfo'
import axios from 'axios'
import utils from '../../../util/util'
import {
    CAS_LOGIN, 
    CAS_CASCHECK,
    CAS_XQLIST,
    WEI_SERVICE_CHANNEL,
    WEI_HISTOGRAM,
    WEI_ZONETOTAL
} from '../../../fetch/apis'

function casCheck(userKey) {
    const PARAMS = {
        userKey: userKey,
    }
    axios.get(CAS_CASCHECK, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            // Modal.info({
            //     title: '异常',
            //     content: "网络异常",
            //     onOk() {},
            // });
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

export const getXqList = (cb) => (dispatch, getState) => {
    const { userKey, xqId } = getState().XQDetailInfo
    const localUserKey = localStorage.getItem('userKey')
    const localId = localStorage.getItem('id')
    let p_userKey = ''
    let p_id = ''
    if(userKey && xqId) {
      p_userKey = userKey
      p_id = xqId
    } else if (localUserKey && localId) {
      p_userKey = localUserKey
      p_id = localId
    }
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.get(CAS_XQLIST, {
        params: {
            userKey: p_userKey
        }
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        let data = res.data
        if(data.msg == "成功" && data.success) {
          let xqList = data.obj;
          let xqInfo = null
          xqList.forEach(item => {
              if(item.id == p_id) {
                xqInfo = item
              }
          })
          if(cb) cb()
          return dispatch(actionCreator(constant.CHANGEV, {
            xqInfo: xqInfo,
            id: p_id
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

  export const getServicesChannelList= () => (dispatch, getState) => {
    const { userKey, xqId } = getState().XQDetailInfo
    const localUserKey = localStorage.getItem('userKey')
    const localId = localStorage.getItem('id')
    let p_userKey = ''
    let p_id = ''
    if(userKey && xqId) {
      p_userKey = userKey
      p_id = xqId
    } else if (localUserKey && localId) {
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

// 获取小区楼栋列表
export const getHistogram = () => (dispatch, getState) => {
    const { userKey, xqId } = getState().XQDetailInfo
    const localUserKey = localStorage.getItem('userKey')
    const localId = localStorage.getItem('id')
    let p_userKey = ''
    let p_id = ''
    if(userKey && xqId) {
      p_userKey = userKey
      p_id = xqId
    } else if (localUserKey && localId) {
      p_userKey = localUserKey
      p_id = localId
    }
    const PARAMS = {
        userKey: p_userKey,
        zoneId: p_id,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.get(WEI_HISTOGRAM, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        // console.log(res)
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.storiedBuildingTotal
            return dispatch(actionCreator(constant.CHANGEV, {
                getHistogram: data
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

// 获取小区详情
export const getZonetotal = () => (dispatch, getState) => {
    const { userKey, xqId } = getState().XQDetailInfo
    const localUserKey = localStorage.getItem('userKey')
    const localId = localStorage.getItem('id')
    let p_userKey = ''
    let p_id = ''
    if(userKey && xqId) {
      p_userKey = userKey
      p_id = xqId
    } else if (localUserKey && localId) {
      p_userKey = localUserKey
      p_id = localId
    }
    const PARAMS = {
        userKey: p_userKey,
        zoneId: p_id,
    }
    axios.get(WEI_ZONETOTAL, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                zonetotal: data
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