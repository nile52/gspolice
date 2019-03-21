/* eslint-disable */
import * as constant from '../constant/Face'
import axios from 'axios'
import utils from '../../../../util/util'
import {
    CAS_LOGIN,
    CAS_XQLIST,
    CAS_CASCHECK,
    WEI_EQPT_TOTAL,
    WEI_DISTRIBUTION_DATA,
    WEI_EQUIPMENT,
    WEI_ZONE_INFO,
    WEI_FACE_PICRTUE,
    WEI_FACE_PICRTUESEARCH,
    WEI_FACE_QUERYRECORDTOTAL,
    WEI_DISTRIBUTION_RESULT,
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
    const { userKey, id } = getState().GSFace
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
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(WEI_EQPT_TOTAL, {
        userKey: p_userKey,
        zoneId: p_id,
        type: 5
    })
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
            eqptEquipmentInfo: eqptEquipmentInfo,
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

export const getEquipmentList = (cb) => (dispatch, getState) => {
    const { userKey, id } = getState().GSFace
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
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(WEI_EQUIPMENT, {
        userKey: p_userKey,
        zoneId: p_id,
        type: 5
    })
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
        type: 1
    }
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(WEI_DISTRIBUTION_DATA, PARAMS)
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

export const getFacePicture= () => (dispatch, getState) => {
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
        type: 1
    }
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(WEI_FACE_PICRTUE, PARAMS)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                pictures: data
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


// 后端获取8张图片
export const getFacePictureSearch= () => (dispatch, getState) => {
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
    }
    axios.post(WEI_FACE_PICRTUESEARCH, PARAMS)
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                pictureData: data
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        console.log(error)
        //casCheck(p_userKey)
    });
}


// 大华-采集人脸总数
export const getQueryRecordTotal= (cb) => (dispatch, getState) => {
    axios.get(WEI_FACE_QUERYRECORDTOTAL)
    .then(function (res) {
        console.log(res);
        if(res.data.result == 'success') {
            console.log(res.data.data)
            const total = res.data.data.total
            axios.get(WEI_FACE_QUERY,{
                pageSize: 10,
                startId: total,
                isAlarm: 0 
            })
            .then(function (res) {
                console.log(res);
                if(res.data.result == 'success') {
                    const dataList = res.data.data.dataList
                    return dispatch(actionCreator(constant.CHANGEV, {
                        pictureLists: dataList
                    })); 
                    
                } else if(res.data.msg === "微服务异常" && !res.data.success) {
                    casCheck(p_userKey)
                }
            }).catch(function (error) {
                console.log(error)
                //casCheck(p_userKey)
            });
            
        } else{
        // } else if(res.data.msg === "微服务异常" && !res.data.success) {
            // casCheck(p_userKey)
            if(cb) cb
        }
    }).catch(function (error) {
        if(cb) cb
        console.log(error)
        console.log(cb);
        
        //casCheck(p_userKey)
    });
}