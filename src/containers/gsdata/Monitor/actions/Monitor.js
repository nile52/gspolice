/* eslint-disable */
import * as constant from '../constant/Monitor'
import axios from 'axios'
import utils from '../../../../util/util'
import {
    CAS_LOGIN, 
    CAS_CASCHECK,
    WEI_DISTRIBUTION_INSERT,
    WEI_DISTRIBUTION_UPDATE,
    WEI_DISTRIBUTION_DELETE,
    WEI_DISTRIBUTION_TOTAL,
    WEI_DISTRIBUTION_DATA,
    WEI_DISTRIBUTION_RESULT,
    WEI_UPLOAD,
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

export const distributionInsert = (addJson, cb) => (dispatch, getState) => {
    const { userKey, id } = getState().GSMonitor
    const localUserKey = localStorage.getItem('userKey')
    const localId = localStorage.getItem('id')
    let p_userKey = ''
    let p_id = ''
    if(userKey && id) {
      p_userKey = userKey
      p_id = id
    } else if (localUserKey && localId) {
      p_userKey = localUserKey
      p_id = localId
    }

    var params = {...addJson}
    params.userKey = p_userKey
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(WEI_DISTRIBUTION_INSERT, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        let data = res.data
        if(data.msg == "成功" && data.success) {
            console.log(data);
            
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

export const distributionUpdate= () => (dispatch, getState) => {
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
    axios.get(WEI_DISTRIBUTION_UPDATE, {
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

export const distributionDelete= () => (dispatch, getState) => {
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
        // zoneId: p_id,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.get(WEI_DISTRIBUTION_DELETE, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                zoneTotal: data
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

export const distributionTotal = (cb) => (dispatch, getState) => {
    const { userKey, id } = getState().GSMonitor
    const localUserKey = localStorage.getItem('userKey')
    const level = getState().GSMonitor.level ? getState().GSMonitor.level : 'districtId'
    const levelId = getState().GSMonitor.levelId ? getState().GSMonitor.levelId : '2'
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
    axios.post(WEI_DISTRIBUTION_TOTAL, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
          })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            dispatch(actionCreator(constant.CHANGEV, {
                distributionTotal: data
            })); 
            if(cb) cb()
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
          })); 
        console.log(error)
        casCheck(p_userKey)
    });
}

export const distributionData = (params, page=1, cb) => (dispatch, getState) => {
    const { userKey, id } = getState().GSMonitor
    const localUserKey = localStorage.getItem('userKey')
    const level = getState().GSMonitor.level ? getState().GSMonitor.level : 'districtId'
    const levelId = getState().GSMonitor.levelId ? getState().GSMonitor.levelId : '2'
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
    axios.post(WEI_DISTRIBUTION_DATA, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
          })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            if(cb) cb()
            return dispatch(actionCreator(constant.CHANGEV, {
                distributionData: data
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
          })); 
        console.log(error)
        casCheck(userKey)
    });
}


export const distributionResult = (params, page=1, cb) => (dispatch, getState) => {
    const { userKey, id } = getState().GSMonitor
    const localUserKey = localStorage.getItem('userKey')
    const level = getState().GSMonitor.level ? getState().GSMonitor.level : 'districtId'
    const levelId = getState().GSMonitor.levelId ? getState().GSMonitor.levelId : '2'
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
    axios.post(WEI_DISTRIBUTION_RESULT, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
          })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            if(cb) cb()
            return dispatch(actionCreator(constant.CHANGEV, {
                distributionResult: data
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            // casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
          })); 
        console.log(error)
        // casCheck(userKey)
    });
}



export const uplLoad = (param) => (dispatch, getState) => {
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
      })); 
    axios.post(
        // WEI_UPLOAD, 
        'http://admin.zjqrkj.cn/sys/oss/upload',
        param)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
          }));
          console.log(res)
        // if(res.data.msg === "成功" && res.data.success) {
        //     const data = res.data.obj
        //     if(cb) cb()
        //     return dispatch(actionCreator(constant.CHANGEV, {
        //         distributionData: data
        //     })); 
        // } else if(res.data.msg === "微服务异常" && !res.data.success) {
        //     casCheck(userKey)
        // }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
          })); 
        console.log(error)
        // casCheck(userKey)
    });
}