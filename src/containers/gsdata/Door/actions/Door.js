/* eslint-disable */
import * as constant from '../constant/Door'
import axios from 'axios'
import utils from '../../../../util/util'
import {
    CAS_LOGIN, 
    CAS_CASCHECK,
    WEI_EQPT_TOTAL,
    WEI_DISTRIBUTION_DATA,
    WEI_EQUIPMENT,
    WEI_ZONE_INFO,
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
    params['type'] = 8


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
            mapDomList: eqptEquipmentInfo.eqptEquipment,
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

export const getEquipmentList = (value, cb) => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    const level = getState().GSIndex.level ? getState().GSIndex.level : 'districtId'
    const levelId = getState().GSIndex.levelId ? getState().GSIndex.levelId : '2'
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = {...value}
    params[level] = levelId
    params['userKey'] = p_userKey
    params['type'] = 8

    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(WEI_EQUIPMENT, params)
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


export const getDistributionData= () => (dispatch, getState) => {
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
    params['type'] = 2

    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(WEI_DISTRIBUTION_DATA, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                distributionList: data
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


