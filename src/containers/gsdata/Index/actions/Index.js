/* eslint-disable */
import * as constant from '../constant/Index'
import axios from 'axios'
import utils from '../../../../util/util'
import {
    CAS_LOGIN, 
    CAS_CASCHECK,
    WEI_INDEX_HOUSING,
    WEI_INDEX_EQUIPMENT,
    WEI_INDEX_POPULATION,
    WEI_POINT_POSITION,
    WEI_ZONE_INFO
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

// 地图点位
export const getPointPosition = () => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    // const level = getState().GSIndex.level ? getState().GSIndex.level : 'districtId'
    // const levelId = getState().GSIndex.levelId ? getState().GSIndex.levelId : '2'
    const level = localStorage.getItem('level') ? localStorage.getItem('level') : 'districtId'
    const levelId = localStorage.getItem('levelId') ? localStorage.getItem('levelId') : '2'
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    params[level] = levelId
    params['userKey'] = p_userKey
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(WEI_POINT_POSITION, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                pointList: data
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

// 人口统计
export const getPopulationInfo= () => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    // const level = getState().GSIndex.level ? getState().GSIndex.level : 'districtId'
    // const levelId = getState().GSIndex.levelId ? getState().GSIndex.levelId : '2'
    const level = localStorage.getItem('level') ? localStorage.getItem('level') : 'districtId'
    const levelId = localStorage.getItem('levelId') ? localStorage.getItem('levelId') : '2'
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    params[level] = levelId
    params['userKey'] = p_userKey
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(WEI_INDEX_POPULATION, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                populationInfo: data
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

// 房屋分类统计
export const getHousingInfo= () => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    // const level = getState().GSIndex.level ? getState().GSIndex.level : 'zoneId'
    // const levelId = getState().GSIndex.levelId ? getState().GSIndex.levelId : '3'
    const level = localStorage.getItem('level') ? localStorage.getItem('level') : 'zoneId'
    const levelId = localStorage.getItem('levelId') ? localStorage.getItem('levelId') : '3'
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    params[level] = levelId
    params['userKey'] = p_userKey
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(WEI_INDEX_HOUSING, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                housingInfo: data
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

// 设备数量统计
export const getEquipmentInfo= () => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    // const level = getState().GSIndex.level ? getState().GSIndex.level : 'zoneId'
    // const levelId = getState().GSIndex.levelId ? getState().GSIndex.levelId : '3'
    const level = localStorage.getItem('level') ? localStorage.getItem('level') : 'zoneId'
    const levelId = localStorage.getItem('levelId') ? localStorage.getItem('levelId') : '3'
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    params[level] = levelId
    params['userKey'] = p_userKey
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(WEI_INDEX_EQUIPMENT, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            console.log(data)
            return dispatch(actionCreator(constant.CHANGEV, {
                equipmentInfo: data
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