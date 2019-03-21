/* eslint-disable */
import * as constant from '../constant/XQBuildDetailInfo'
import axios from 'axios'
import utils from '../../../util/util'
import {
    CAS_LOGIN, 
    CAS_CASCHECK,
    CAS_XQLIST,
    WEI_SERVICE_CHANNEL,
    WEI_HISTOGRAM,
    WEI_ZONETOTAL,
    WEI_BUILD_TOGAL,
    WEI_HOUSE,
    WEI_BUILD,
    WEI_HOUSING
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

// 获取小区详情
export const getZonetotal = () => (dispatch, getState) => {
    console.log(getState().XQDetailInfo)
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

// 获取楼幢房屋列表
export const getHomePageHousing = (value) => (dispatch, getState) => {
    console.log(getState())
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
        storiedBuildingId: value
    }
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.get(WEI_HOUSING, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                homePageHousing: data
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