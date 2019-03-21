/* eslint-disable */
import * as constant from '../constant/House'
import axios from 'axios'
import utils from '../../../../util/util'
import {
    CAS_LOGIN, 
    CAS_CASCHECK,
    WEI_INDEX_HOUSING,
    WEI_HOUSING_PERSONNEL,
    WEI_HOUSING_BUILDING,
    WEI_BUILD,
    WEI_HOUSE,
    WEI_RESIDENT_PICTURE,
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

const defaultValue = localStorage.getItem('levelValue').split(",");
const len = defaultValue.length;
const zoneId = defaultValue[len-1];

export const changev=(value)=>(dispatch)=>{
    return dispatch(actionCreator(constant.CHANGEV,value));
};

export const getHousingInfo = (cb) => (dispatch, getState) => {
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
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(WEI_INDEX_HOUSING, {
        userKey: p_userKey,
        zoneId: zoneId
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        let data = res.data
        if(data.msg == "成功" && data.success) {
          let housingInfo = data.obj;
          return dispatch(actionCreator(constant.CHANGEV, {
            housingInfo: housingInfo,
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

export const getHousingPersonnel= (id) => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    const level = getState().GSIndex.level ? getState().GSIndex.level : 'districtId'
    const levelId = getState().GSIndex.levelId ? getState().GSIndex.levelId : '3'
    let userKey = ''
    if (localUserKey) {
        userKey = localUserKey
    }
    let params = {
        zoneId: levelId,
        housingId: id
    }
    params[level] = levelId
    params['userKey'] = userKey
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true,
        roomLoading: true,
    })); 
    axios.post(WEI_HOUSING_PERSONNEL, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false,
            roomLoading: false,
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            const housing = data.housing
            const liveUser = data.liveUser            
            const userTotal = data.userTotal            
            if (liveUser.length > 0) {
                function getPic(id) {
                    // 返回一个promise对象
                    return new Promise((resolve, reject) => {
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
                liveUser.forEach((item, index) => {
                    newData.push(item)
                    if(item.user.id) {
                        getPic(item.user.id).then(pic => {
                            num++
                            newData[index].user.file = pic
                            if(num === liveUser.length) {
                                dispatch(actionCreator(constant.CHANGEV, {
                                    dpLoading: false,
                                    roomLoading: false,
                                })); 

                                console.log(newData);
                                return dispatch(actionCreator(constant.CHANGEV, {
                                    housingPerson: liveUser
                                })); 
                            }
                        },error => { console.log(error); 
                            // 执行失败的回调函数
                        });
                    }else {
                        dispatch(actionCreator(constant.CHANGEV, {
                            dpLoading: false,
                            roomLoading: false,
                        })); 
                    }
                })
            }
            return dispatch(actionCreator(constant.CHANGEV, {
                housingDetail: housing,
                housingUserTotal: userTotal
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

// 获取小区楼幢
export const getBuildList= (cb) => (dispatch, getState) => {
    const { userKey, id } = getState().DataVisualization
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
    const PARAMS = {
        userKey: p_userKey,
        zoneId: p_id,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        dpLoading: true
      })); 
    axios.get(WEI_BUILD, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
          })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(data.length > 0) {
                let homeBuildListJson = {}
                data.forEach(item => {
                    homeBuildListJson[item.id] = item
                })
                dispatch(actionCreator(constant.CHANGEV, {
                    dpLoading: true
                  })); 
                axios.post(WEI_HOUSING_BUILDING, {
                    userKey: p_userKey,
                    zoneId: p_id,
                    storiedBuildingId: data[0].id,
                    unit: 1
                })
                .then(function (res) {
                    dispatch(actionCreator(constant.CHANGEV, {
                        dpLoading: false
                      })); 
                    if(res.data.msg === "成功" && res.data.success) {
                        const data1 = res.data.obj
                        console.log(data)
                        console.log(data1)                        
                        let homeRoomListJson = {}
                        if(data1.length > 0) {
                            data1.forEach(item => {
                                homeRoomListJson[item.id] = item
                            })
                        }
                        let homeUnitList = []
                        let homeLayerList = []
                        if(data.length > 0) {
                            if(data[0].unit > 0) {
                                for(let i=0; i < data[0].unit; i++){
                                    let num = i
                                    num++
                                    homeUnitList.push(num)
                                }
                            }
                        }
                        if(data.length > 0) {
                            if(data[0].unit > 0) {
                                for(let i=0; i < data[0].layer; i++){
                                    let num = i
                                    num++
                                    homeLayerList.push(num)
                                }
                            }
                        }
                        if(cb) cb() 
                        return dispatch(actionCreator(constant.CHANGEV, {
                            homeBuildList: data,
                            homeUnitList: homeUnitList,
                            homeLayerList: homeLayerList,
                            homeBuildInfo: data[0],
                            homeBuild: data[0].id,
                            homeUnit: 'all',
                            homeLayer: 'all',
                            homeRoom: 'all',
                            homeBuildListJson: homeBuildListJson,
                            homeRoomList: data1,
                            homeRoomListJson: homeRoomListJson
                        }));
                    } else if(res.data.msg === "微服务异常" && !res.data.success) {
                        casCheck(p_userKey)
                    }
                }).catch(function (error) {
                    console.log(error)
                    casCheck(p_userKey)
                });
            }
            
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
          })); 
        console.log(error)
        casCheck(p_userKey)
    });
}

export const getRoomList = (build, unit, layer, cb) => (dispatch, getState) => {
    const { userKey, homeBuild } = getState().DataVisualization
    const id = getState().GSHouse.levelId ? getState().GSHouse.levelId : '3'
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        storiedBuildingId: homeBuild,
        unit: unit,
        layer: layer,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        dpLoading: true
      })); 
    axios.post(WEI_HOUSING_BUILDING, PARAMS)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
          })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            if(cb) cb()
            let homeRoomListJson = {}
            if(data.length > 0) {
                data.forEach(item => {
                    homeRoomListJson[item.id] = item
                })
            }
            return dispatch(actionCreator(constant.CHANGEV, {
                homeRoomList: data,
                homeRoom: 'all',
                homeRoomListJson: homeRoomListJson
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            // casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
          })); 
        console.log(error)
        // casCheck(userKey)
    });
}

export const getBuildTogal = (value, cb) => (dispatch, getState) => {
    const { userKey, id } = getState().DataVisualization
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        storiedBuildingId: value
    }
    dispatch(actionCreator(constant.CHANGEV, {
        dpLoading: true
      })); 
    axios.get(WEI_BUILD_TOGAL, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
          })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            if(cb) cb()
            return dispatch(actionCreator(constant.CHANGEV, {
                homeBuildTotal: data
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
          })); 
        console.log(error)
        casCheck(userKey)
    });
}

