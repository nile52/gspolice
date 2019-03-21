/* eslint-disable */
import * as constant from '../constant/House'
import axios from 'axios'
import utils from '../../../../util/util'
import {
    CAS_LOGIN, 
    CAS_CASCHECK,
    WEI_POINT_POSITION,
    POLICE_ZONE_LEVEL,
    POLICE_HOUSE_CLASS,
    HOUSE_SEL,
    POLICE_HOUSE_BASE,
    POLICE_BOUNDARIES,
    DATA_HOUSE,
    MARKER_DATA
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
            const data = res.data.obj
            dispatch(actionCreator(constant.CHANGEV, {
                boundaries: data ? data.hotSpace : []
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

// 饼图数据
export const getPieData = () => (dispatch, getState) => {
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
    axios.post(POLICE_HOUSE_CLASS, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                pieTotal: data.total,
                rentOut: data.rentOut,
                Internet: data.Internet,
                groupLive: data.groupLive,
                personalUse: data.personalUse,
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

// 房屋查询数据
export const getHouseList = (l, v, usage='personalUse,rentOut,idle,groupLive') => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    const level = l ? l : localStorage.getItem('level') ? localStorage.getItem('level') : 'districtId'
    const levelId =  v ? v : localStorage.getItem('levelId') ? localStorage.getItem('levelId') : '2'
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    params['userKey'] = p_userKey
    params[level] = levelId
    params['susage'] = usage
    dispatch(actionCreator(constant.CHANGEV, {
        tableLoading: true
    })); 
    axios.post(HOUSE_SEL, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            tableLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.list
            const selectdata = []
            data.map((v, i) => {
                selectdata.push({
                  key: i,
                  zoneName: v.name,
                  build: v.room.split('-')[0],
                  unit: v.room.split('-')[1],
                  layer: v.room.split('-')[2],
                  room: v.room.split('-')[3],
                  usage: v.skey
                })
            })
            return dispatch(actionCreator(constant.CHANGEV, {
                selectdata: selectdata
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            tableLoading: false
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
    axios.post(POLICE_HOUSE_BASE, params)
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

// 小区数据排名
export const getHousingTop = () => (dispatch, getState) => {
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
    axios.post(DATA_HOUSE, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                housingTop: data
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
export const getPointPositionlist = (type, jsonName) => (dispatch, getState) => {
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
    params['type'] = type
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(MARKER_DATA, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                pointlist : data ? data.list : ''  
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