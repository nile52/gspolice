/* eslint-disable */
import * as constant from '../constant/XQHouseDetailInfo'
import axios from 'axios'
import utils from '../../../util/util'
import {
    CAS_LOGIN, 
    CAS_CASCHECK,
    WEI_GET_HOUSING,
    WEI_HOUSE,
    WEI_RESIDENT,
    WEI_VEHICLE,
    CAS_XQLIST,
    WEI_USER,
    WEI_RESIDENT_PICTURE
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
            // utils.toLoginUrl(CAS_LOGIN)
            localStorage.setItem('userKey', null)
            localStorage.setItem('id', null)
        }
    }).catch(function (error) {
        console.log(error)
        // utils.toLoginUrl(CAS_LOGIN)
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
export const getXqList = (cb) => (dispatch, getState) => {
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

// 获取房屋住户详情
export const getHomePageUser = (value, cb) => (dispatch, getState) => {
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
        housingId: value,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true,
        roomLoading: true,
      })); 
    axios.get(WEI_USER, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            let data = res.data.obj
            let liveUser = res.data.obj.liveUser
            if(liveUser.length > 0) {
                function getPic(id) {
                    // 返回一个promise对象
                    return new Promise((resolve, reject) => {
                        dispatch(actionCreator(constant.CHANGEV, {
                            diLoading: true,
                            roomLoading: true,
                          })); 
                        axios.get(WEI_RESIDENT_PICTURE, {
                            params: {
                                userKey: userKey,
                                userId: id,
                                type: 'personal'
                            }
                        })
                        .then(function (res) {
                            if(res.data.msg === "成功" && res.data.success) {
                                let pic = null;
                                if(res.data.obj) {
                                    pic = res.data.obj.file
                                }
                                resolve(pic);
                            } else if(res.data.msg === "微服务异常" && !res.data.success) {
                                casCheck(userKey)
                            }
                        }).catch(function (error) {
                            reject(error);
                        });
                    });
                }
                let newData = []
                let num = 0
                liveUser.forEach((i, index) => {
                    let item = i.user
                    newData.push(item)
                    if(item.id) {
                        getPic(item.id).then(pic => {
                            num++
                            newData[index].file = pic
                            if(num == data.length) {
    
                                return dispatch(actionCreator(constant.CHANGEV, {
                                    liveUser: newData
                                })); 
                            }
                        },error => { console.log(error); 
                            // 执行失败的回调函数
                        });
                    }else {
                        dispatch(actionCreator(constant.CHANGEV, {
                            diLoading: false
                        })); 
                    }
                })
            } else {
                dispatch(actionCreator(constant.CHANGEV, {
                    diLoading: false,
                    roomLoading: false,
                  })); 
                return dispatch(actionCreator(constant.CHANGEV, {
                    homeResidentList:data,
                })); 
            }   
            dispatch(actionCreator(constant.CHANGEV, {
                diLoading: false,
                roomLoading: false,
              })); 
            return dispatch(actionCreator(constant.CHANGEV, {
                homePageUser:data,
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            dispatch(actionCreator(constant.CHANGEV, {
                diLoading: false,
                roomLoading: false,
              })); 
            casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false,
            roomLoading: false,
          })); 
        console.log(error)
        casCheck(userKey)
    });
}

