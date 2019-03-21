/* eslint-disable */
import * as constant from '../constant/Population'
import axios from 'axios'
import utils from '../../../../util/util'
import {
    CAS_LOGIN, 
    CAS_CASCHECK,
    POLICE_BOUNDARIES,
    WEI_POINT_POSITION,
    POLICE_PEOPLE_BASE,
    POLICE_ZONE_LEVEL,
    REN_SELECT,
    POLICE_PEOPLE_FOCUS
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
    axios.post(POLICE_ZONE_LEVEL, {
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

// 获取热区
export const getBoundaries = (cb) => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    const level = localStorage.getItem('level') ? localStorage.getItem('level') : 'districtId'
    const levelId = localStorage.getItem('levelId') ? localStorage.getItem('levelId') : '2'
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    params[level] = levelId
    params['userKey'] = p_userKey

    const PARAMS = {
        userKey: p_userKey,
        [level]: levelId
    }
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.get(POLICE_BOUNDARIES, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.hotSpace
            // console.log(data );
            dispatch(actionCreator(constant.CHANGEV, {
                boundaries: data
            })); 
            if (cb) cb()
            return
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

// 左侧柱状-基础数据
export const getBarData = () => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
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
    axios.post(POLICE_PEOPLE_BASE, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                barData: data
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

// 右侧饼图数据
export const getPieData = (level, levelId) => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    params[level] = levelId
    params['userKey'] = p_userKey
    dispatch(actionCreator(constant.CHANGEV, {
        cascaderLoading: true
    })); 
    axios.post(REN_SELECT, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            cascaderLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                rightselect: data
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            cascaderLoading: false
          })); 
        console.log(error)
        //casCheck(p_userKey)
    });
}

// 地图点位
export const getPointPosition = () => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    // const level = getState().ZHAFPopulation.level ? getState().ZHAFPopulation.level : 'districtId'
    // const levelId = getState().ZHAFPopulation.levelId ? getState().ZHAFPopulation.levelId : '2'
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

//全区-重点关注信息数据( 层级 现在还不能做 需要和领导 确认完接口 才能给)
export const getPeopleFocus = () => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    // const level = getState().ZHAFPopulation.level ? getState().ZHAFPopulation.level : 'districtId'
    // const levelId = getState().ZHAFPopulation.levelId ? getState().ZHAFPopulation.levelId : '2'
    const level = localStorage.getItem('level') ? localStorage.getItem('level') : 'districtId'
    const levelId = localStorage.getItem('levelId') ? localStorage.getItem('levelId') : '2'
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    // params[level] = levelId
    params['userKey'] = p_userKey
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(POLICE_PEOPLE_FOCUS, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                pointlist: data
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