/* eslint-disable */
import * as constant from '../constant/Zone'
import axios from 'axios'
import utils from '../../../../util/util'
import {
    CAS_LOGIN, 
    CAS_CASCHECK,
    POLICE_ZONE_LEVEL,
    INDEX_LEFT,
    MARKER_DATA,
    POLICE_INDEX_PERCEPTION,
    POLICE_BOUNDARIES,
    POLICE_XQLIST,
    POLICE_DEV_DATA,
    POLICE_DEV_POINT
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

// 获取热区
export const getXqList = () => (dispatch, getState) => {
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
    axios.get(POLICE_XQLIST, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                xqlist: data
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

// 左侧数据
export const getLeftData = () => (dispatch, getState) => {
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
    axios.post(INDEX_LEFT, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                leftdata: res.data.obj
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
    axios.post(POLICE_DEV_POINT, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            let pointlist
            if (jsonName == 'dwJson') {
                pointlist = data ? data : ''
            } else {
                pointlist = data ? data.pointPositions : ''
            }
            return dispatch(actionCreator(constant.CHANGEV, {
                [jsonName]: pointlist
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

// 今日感知数数据
export const getPerceptionData = () => (dispatch, getState) => {
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
    axios.post(POLICE_INDEX_PERCEPTION, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                qualityData: data,
                zong: parseInt(data.vehicleRecords) + parseInt(data.personnelRecord)
                  + parseInt(data.faceTotal) + parseInt(data.perceptions) +
                  parseInt(data.mac)
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

// 底部实时数据
export const getBottomlist = (url, size=7) => (dispatch, getState) => {
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
    params['size'] = size
    dispatch(actionCreator(constant.CHANGEV, {
        liLoading: true
    })); 
    axios.post(url, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            liLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                rightData: data,
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            liLoading: false
          })); 
        console.log(error)
        //casCheck(p_userKey)
    });
}

// 设备数据 (1-人脸 2-开门 3-过车 4-mac 5-监控 6-消防 7-位移 8-CK 9-联防 )
export const getDevData = (type, name, pageNumber) => (dispatch, getState) => {
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
    params['size'] = 7
    params['current'] = pageNumber
    dispatch(actionCreator(constant.CHANGEV, {
        liLoading: true
    })); 
    axios.post(POLICE_DEV_DATA, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            liLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                rightData: data[name]
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            liLoading: false
          })); 
        console.log(error)
        //casCheck(p_userKey)
    });
}
