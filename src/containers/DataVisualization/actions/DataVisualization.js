import * as constant from '../constant/DataVisualization'
import axios from 'axios'
import utils from '../../../util/util.js'
import {
    CAS_LOGIN, 
    CAS_CASCHECK, 
    CAS_XQLIST,
    WEI_HOME_PAGE_TOGAL,
    WEI_BUILD,
    WEI_BUILD_TOGAL,
    WEI_SERVICE_CHANNEL,
    WEI_HOUSE,
    WEI_RESIDENT,
    WEI_SELECT_RECVEHICLE_RECORD,
    WEI_RESIDENT_PICTURE,
    WEI_PLAY,
    WEI_PERSONNEL_RECORD,
    WEI_GET_HOUSING,
    WEI_GET_LABEL,
    WEI_GET_AGE,
    WEI_PIE_CHART,
    WEI_BAR_CHART,
    WEI_KEY_AND_VALUE,
    WEI_HOUSING_ADDRESS,
    WEI_DEFAULT_PLAY,
    WEI_SERVICE, 
    WEI_CASE_TOTAL
} from '../../../fetch/apis'
import { Modal } from 'antd';
import * as toastr from 'toastr';
import '../../../static/css/toastr.min.css';

function actionCreator(type, data) {
    return {
        type: type,
        payload: data
    }
}

function casCheck(userKey) {
    const PARAMS = {
        userKey: userKey,
    }
    axios.get(CAS_CASCHECK, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            toastr.error('网络异常')
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

export const changev = (value) => (dispatch) => {
    return dispatch(actionCreator(constant.CHANGEV,value));
};

export const getXqList = (cb) => (dispatch, getState) => {
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
  dispatch(actionCreator(constant.CHANGEV, {
    dpLoading: true
  })); 
  axios.get(CAS_XQLIST, {
      params: {
          userKey: p_userKey
      }
  })
  .then(function (res) {
      dispatch(actionCreator(constant.CHANGEV, {
        dpLoading: false
      })); 
      let data = res.data
      if(data.msg === "成功" && data.success) {
        let xqList = data.obj;
        let xqInfo = null
        xqList.forEach(item => {
            if(item.id == p_id) {
              xqInfo = item
            }
        })
        if(cb) cb()
        return dispatch(actionCreator(constant.CHANGEV, {
          xqList: data.obj,
          xqInfo: xqInfo,
          id: p_id
        })); 
      } else {
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

// 获取案件总数
export const getCaseTotal = (cb) => (dispatch, getState) => {
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
    dispatch(actionCreator(constant.CHANGEV, {
      dpLoading: true
    })); 
    axios.get(WEI_CASE_TOTAL, {
        params: {
            userKey: p_userKey,
            zoneId: p_id,
            delete: false
        }
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
          dpLoading: false
        })); 
        let data = res.data
        if(data.msg === "成功" && data.success) {
          if(cb) cb()
          return dispatch(actionCreator(constant.CHANGEV, {
            caseTotal: data.obj,
          })); 
        } else {
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

export const getHomePageTotal = (value, cb) => (dispatch, getState) => {
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
        zoneId: p_id
    }
    dispatch(actionCreator(constant.CHANGEV, {
        dpLoading: true
    })); 
    axios.get(WEI_HOME_PAGE_TOGAL, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
          })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                homePageTotal: data
            })); 
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
          })); 
        console.log(error)
        casCheck(p_userKey)
    });
}

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
                axios.get(WEI_BUILD_TOGAL, {
                    params: {
                        userKey: p_userKey,
                        zoneId: p_id,
                        storiedBuildingId: data[0].id
                    }
                })
                .then(function (res) {
                    dispatch(actionCreator(constant.CHANGEV, {
                        dpLoading: false
                      })); 
                    if(res.data.msg === "成功" && res.data.success) {
                        let homeUnitList = []
                        if(data.length > 0) {
                            if(data[0].unit > 0) {
                                for(let i=0; i < data[0].unit; i++){
                                    let num = i
                                    num++
                                    homeUnitList.push(num)
                                }
                            }
                        }
                        if(cb) cb() 
                        return dispatch(actionCreator(constant.CHANGEV, {
                            homeBuildList: data,
                            homeUnitList: homeUnitList,
                            homeBuildInfo: data[0],
                            homeBuild: data[0].id,
                            homeBuildTotal: res.data.obj,
                            homeUnit: 'all',
                            homeRoom: 'all',
                            homeBuildListJson: homeBuildListJson
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

export const getServicesChannelList= () => (dispatch, getState) => {
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
        dpLoading: true
      })); 
    axios.get(WEI_SERVICE_CHANNEL, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
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
            dpLoading: false
          })); 
        console.log(error)
        casCheck(p_userKey)
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

export const getRoomList = (value, cb) => (dispatch, getState) => {
    const { userKey, id, homeBuild } = getState().DataVisualization
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        storiedBuildingId: homeBuild,
        unit: value
    }
    dispatch(actionCreator(constant.CHANGEV, {
        dpLoading: true
      })); 
    axios.get(WEI_HOUSE, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
          })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
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

export const getResidentList = (value, cb) => (dispatch, getState) => {
    const { userKey, id } = getState().DataVisualization
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        housingId: value,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        dpLoading: true,
        roomLoading: true,
      })); 
    axios.get(WEI_RESIDENT, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            let data = res.data.obj.data
            if(cb) cb()
            if(data.length > 0) {
                
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
                data.forEach((item, index) => {
                    newData.push(item)
                    if(item.id) {
                        getPic(item.id).then(pic => {
                            num++
                            newData[index].file = pic
                            if(num === data.length) {
                                dispatch(actionCreator(constant.CHANGEV, {
                                    dpLoading: false,
                                    roomLoading: false,
                                })); 
                                return dispatch(actionCreator(constant.CHANGEV, {
                                    homeResidentList:newData,
                                })); 
                            }
                        },error => { console.log(error); 
                            // 执行失败的回调函数
                        });
                    }else {
                        dispatch(actionCreator(constant.CHANGEV, {
                            dpLoading: false
                        })); 
                    }
                })
            } else {
                dispatch(actionCreator(constant.CHANGEV, {
                    dpLoading: false,
                    roomLoading: false,
                  })); 
                return dispatch(actionCreator(constant.CHANGEV, {
                    homeResidentList:data,
                })); 
            }   
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            dispatch(actionCreator(constant.CHANGEV, {
                dpLoading: false,
                roomLoading: false,
              })); 
            casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false,
            roomLoading: false,
          })); 
        console.log(error)
        casCheck(userKey)
    });
}

export const getSelectRecVehicleRecord = (value, cb) => (dispatch, getState) => {
    const { userKey, id } = getState().DataVisualization
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        idCard: value,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        dpLoading: true
      })); 
    axios.get(WEI_SELECT_RECVEHICLE_RECORD, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
          })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(cb) cb()
            return dispatch(actionCreator(constant.CHANGEV, {
                selectRecVehicleRecordList: data
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

export const getResidentPicture = (value, cb) => (dispatch, getState) => {
    const { userKey } = getState().DataVisualization
    const PARAMS = {
        userKey: userKey,
        userId: value
    }
    dispatch(actionCreator(constant.CHANGEV, {
        dpLoading: true
      })); 
    axios.get(WEI_RESIDENT_PICTURE, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
          })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            if(cb) cb(data)
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

export const getHomePlay = (value, cb) => (dispatch, getState) => {
    const { userKey, id } = getState().DataVisualization
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        equipmentChannelId: value,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        dpLoading: true
      })); 
    axios.get(WEI_PLAY, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
          })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            dispatch(actionCreator(constant.CHANGEV, {
                homePlayUrl: data
            })); 
            if(cb) cb()
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

export const getPersonnelRecord = (cb) => (dispatch, getState) => {
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
        pages: 1,
        limit: 2,
        fields: 'id',
        rule: 'desc'
    }
    dispatch(actionCreator(constant.CHANGEV, {
        dpLoading: true
      })); 
    axios.get(WEI_PERSONNEL_RECORD, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
          })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            dispatch(actionCreator(constant.CHANGEV, {
                homeEntryAndExitList: data
            })); 
            if(cb) cb()
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

export const getHousing = (value, cb) => (dispatch, getState) => {
    const { userKey, id } = getState().DataVisualization
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        housingId: value,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        dpLoading: true
      })); 
    axios.get(WEI_GET_HOUSING, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            dpLoading: false
          })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            dispatch(actionCreator(constant.CHANGEV, {
                homeHousingInfo: data
            })); 
            if(cb) cb()
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

export const getLabel = (value, page=1, cb) => (dispatch, getState) => {
    const { userKey, id } = getState().DataVisualization
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        flow: value.flow,
        valueId: value.valueId,
        pages: page
    }
    dispatch(actionCreator(constant.CHANGEV, {
        dpLoading: true
      })); 
    axios.get(WEI_GET_LABEL, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            const total = res.data.obj.total
            if(data.length > 0) {
                let newData = []
                data.forEach((item, index) => {
                    newData.push(item)
                    if(item.id) {
                        axios.get(WEI_RESIDENT_PICTURE, {
                            params: {
                                userKey: userKey,
                                userId: item.id,
                                type: 'personal'
                            }
                        })
                        .then(function (res) {
                            if(res.data.msg === "成功" && res.data.success) {
                                let pic = null;
                                if(res.data.obj) {
                                    pic = res.data.obj.file
                                }
                                newData[index].personalPicture = pic
                                if(index === (data.length-1)) {
                                    dispatch(actionCreator(constant.CHANGEV, {
                                        dpLoading: false
                                      })); 
                                    if(cb) cb()
                                    return dispatch(actionCreator(constant.CHANGEV, {
                                        residentList: newData,
                                        flow: value.flow,
                                        residentListTitle: value.residentListTitle,
                                        dpLoading: false,
                                        residentTogal: total,
                                        residentListType: 'label',
                                        residentListParams: value
                                    })); 
                                }
                            } else if(res.data.msg === "微服务异常" && !res.data.success) {
                                dispatch(actionCreator(constant.CHANGEV, {
                                    dpLoading: false
                                  })); 
                                casCheck(userKey)
                            }
                        })
                    }
                })
            } else {
                dispatch(actionCreator(constant.CHANGEV, {
                    dpLoading: false
                  })); 
                if(cb) cb()
                return dispatch(actionCreator(constant.CHANGEV, {
                    residentList: data,
                    flow: value.flow,
                    residentListTitle: value.residentListTitle
                })); 
            }   
            
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            dispatch(actionCreator(constant.CHANGEV, {
                dpLoading: false
              })); 
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

export const getAge = (value, page=1, cb) => (dispatch, getState) => {
    const { userKey, id } = getState().DataVisualization
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        flow: value.flow,
        key: value.key,
        pages: page
    }
    dispatch(actionCreator(constant.CHANGEV, {
        dpLoading: true
      })); 
    axios.get(WEI_GET_AGE, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            const total = res.data.obj.total
            if(data.length > 0) {
                let newData = []
                data.forEach((item, index) => {
                    newData.push(item)
                    if(item.id) {
                        axios.get(WEI_RESIDENT_PICTURE, {
                            params: {
                                userKey: userKey,
                                userId: item.id,
                                type: 'personal'
                            }
                        })
                        .then(function (res) {
                            if(res.data.msg === "成功" && res.data.success) {
                                let pic = null;
                                if(res.data.obj) {
                                    pic = res.data.obj.file
                                }
                                newData[index].personalPicture = pic
                                if(index === (data.length-1)) {
                                    if(cb) cb()
                                    return dispatch(actionCreator(constant.CHANGEV, {
                                        residentList: newData,
                                        flow: value.flow,
                                        residentListTitle: value.residentListTitle,
                                        dpLoading: false,
                                        residentTogal: total,
                                        residentListType: 'age',
                                        residentListParams: value
                                    })); 
                                }
                            } else if(res.data.msg === "微服务异常" && !res.data.success) {
                                dispatch(actionCreator(constant.CHANGEV, {
                                    dpLoading: false
                                  })); 
                                casCheck(userKey)
                            }
                        })
                    }
                })
            } else {
                dispatch(actionCreator(constant.CHANGEV, {
                    dpLoading: false
                  })); 
                if(cb) cb()
                return dispatch(actionCreator(constant.CHANGEV, {
                    residentList: data,
                    flow: value.flow,
                    residentListTitle: value.residentListTitle
                })); 
            }   
            
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            dispatch(actionCreator(constant.CHANGEV, {
                dpLoading: false
              })); 
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

export const getArea = (value, page=1, cb) => (dispatch, getState) => {
    const { userKey, id } = getState().DataVisualization
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        nativePlace: value,
        flowIsPermanent: '流动人员',
        pages: page
    }
    dispatch(actionCreator(constant.CHANGEV, {
        dpLoading: true
      })); 
    axios.get(WEI_RESIDENT, {
        params: PARAMS,
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            const total = res.data.obj.total
            if(data.length > 0) {
                let newData = []
                data.forEach((item, index) => {
                    newData.push(item)
                    if(item.id) {
                        axios.get(WEI_RESIDENT_PICTURE, {
                            params: {
                                userKey: userKey,
                                userId: item.id,
                                type: 'personal'
                            }
                        })
                        .then(function (res) {
                            if(res.data.msg === "成功" && res.data.success) {
                                let pic = null;
                                if(res.data.obj) {
                                    pic = res.data.obj.file
                                }
                                newData[index].personalPicture = pic
                                if(index === (data.length-1)) {
                                    if(cb) cb()
                                    return dispatch(actionCreator(constant.CHANGEV, {
                                        residentList: newData,
                                        flow: true,
                                        residentListTitle: value,
                                        dpLoading: false,
                                        residentTogal: total,
                                        residentListType: 'area',
                                        residentListParams: value
                                    })); 
                                }
                            } else if(res.data.msg === "微服务异常" && !res.data.success) {
                                casCheck(userKey)
                            }
                        })
                    }else {
                        dispatch(actionCreator(constant.CHANGEV, {
                            dpLoading: false
                          })); 
                    }
                })
            } else {
                dispatch(actionCreator(constant.CHANGEV, {
                    dpLoading: false
                  })); 
                if(cb) cb()
                return dispatch(actionCreator(constant.CHANGEV, {
                    residentList: data,
                    flow: true,
                    residentListTitle: ''
                })); 
            }   
            
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            dispatch(actionCreator(constant.CHANGEV, {
                dpLoading: false
              })); 
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

// WEI_PIE_CHART
export const getPieChart = (value, cb) => (dispatch, getState) => {
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
        zoneId: p_id
    }
    axios.get(WEI_PIE_CHART, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                pieList: data
            })); 
        }
    }).catch(function (error) {
        console.log(error)
        casCheck(p_userKey)
    });
}

// WEI_PIE_CHART
export const getBarChart = (value, cb) => (dispatch, getState) => {
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
        zoneId: p_id
    }
    axios.get(WEI_BAR_CHART, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                barList: data
            })); 
        }
    }).catch(function (error) {
        console.log(error)
        casCheck(p_userKey)
    });
}

export const getKeyAndValue = (params, cb) => (dispatch, getState) => {
    const { userKey} = getState().DataVisualization
    const localUserKey = localStorage.getItem('userKey')
    let p_userKey = ''
    if(userKey) {
        p_userKey = userKey
    } else if (localUserKey) {
        p_userKey = localUserKey
    }
    const PARAMS = {
        userKey: p_userKey
    }
    axios.get(WEI_KEY_AND_VALUE, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            let userTypeJson = {}
            if(data && data['居民类型'] && data['居民类型'].length > 0) {
                data['居民类型'].map((item) => {
                    userTypeJson[item.id] = item
                })
                dispatch(actionCreator(constant.CHANGEV, {
                    userTypeList: data['居民类型'],
                    userTypeJson: userTypeJson
                }));
            }
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        console.log(error)
        casCheck(p_userKey)
    });
}

export const getGHResidentList = (params, page=1, cb) => (dispatch, getState) => {
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
        //limit: 10,
        ...params,
        pages: page
    }
    dispatch(actionCreator(constant.CHANGEV, {
        ghLoading: true
      })); 
    axios.get(WEI_RESIDENT, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            let data = res.data.obj.data
            let total = res.data.obj.total
            if(cb) cb()
            if(data.length > 0) {
                let newData = []
                data.forEach((item, index) => {
                    newData.push(item)
                    if(item.id) {
                        axios.get(WEI_RESIDENT_PICTURE, {
                            params: {
                                userKey: p_userKey,
                                userId: item.id,
                                type: 'personal'
                            }
                        })
                        .then(function (res) {
                            if(res.data.msg === "成功" && res.data.success) {
                                let pic = null;
                                if(res.data.obj) {
                                    pic = res.data.obj.file
                                }
                                newData[index].file = pic
                                if(index === (data.length-1)) {
                                    return dispatch(actionCreator(constant.CHANGEV, {
                                        siderResidentList: newData,
                                        GHTogal: total,
                                        ghLoading: false
                                    })); 
                                }
                            } else if(res.data.msg === "微服务异常" && !res.data.success) {
                                dispatch(actionCreator(constant.CHANGEV, {
                                    ghLoading: false
                                  })); 
                                casCheck(p_userKey)
                            }
                        })
                    }
                })
            } else {
                return dispatch(actionCreator(constant.CHANGEV, {
                    siderResidentList:data,
                    GHTogal: total,
                    ghLoading: false
                })); 
            }   
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            dispatch(actionCreator(constant.CHANGEV, {
                ghLoading: false
              })); 
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            ghLoading: false
          })); 
        console.log(error)
        casCheck(p_userKey)
    });
}

export const getZHBuildList = (value, cb) => (dispatch, getState) => {
    const p_userKey = localStorage.getItem('userKey')
    const p_id = localStorage.getItem('id')
    const PARAMS = {
        userKey: p_userKey,
        zoneId: p_id,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        zhLoading: true
    })); 
    axios.get(WEI_BUILD, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            zhLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(data.length > 0) {
                let siderZHUnitList = []
                let siderZHBuildListJson = {}
                data.forEach(item => {
                    siderZHBuildListJson[item.id] = item
                })
                if(data.length > 0) {
                    if(data[0].unit > 0) {
                        for(let i=0; i < data[0].unit; i++){
                            let num = i
                            num++
                            siderZHUnitList.push(num)
                        }
                    }
                }
                return dispatch(actionCreator(constant.CHANGEV, {
                    siderZHBuildList: data,
                    siderZHBuildListJson: siderZHBuildListJson,
                    siderZHUnitList: siderZHUnitList,
                    siderZHBuild: 'all',
                    siderZHUnit: 'all',
                    siderZHRoom: 'all',
                }));
            }
            
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            zhLoading: false
          })); 
        console.log(error)
        casCheck(p_userKey)
    });
}

export const getZHRoomList = (value, cb) => (dispatch, getState) => {
    const { userKey, id, siderZHBuild } = getState().DataVisualization
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        storiedBuildingId: siderZHBuild,
        unit: value
    }
    dispatch(actionCreator(constant.CHANGEV, {
        zhLoading: true
    })); 
    axios.get(WEI_HOUSE, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            zhLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(cb) cb()
            return dispatch(actionCreator(constant.CHANGEV, {
                siderZHRoomList: data,
                siderZHRoom: 'all',
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            zhLoading: false
        })); 
        console.log(error)
        casCheck(userKey)
    });
}

export const getZHPersonnelRecord = (params, page=1, cb) => (dispatch, getState) => {
    const p_userKey = localStorage.getItem('userKey')
    const p_id = localStorage.getItem('id')
    const PARAMS = {
        userKey: p_userKey,
        zoneId: p_id,
        pages: page,
        ...params,
        limit: 20,
        fields: 'id',
        rule: 'desc'
    }
    dispatch(actionCreator(constant.CHANGEV, {
        zhLoading: true
    })); 
    axios.get(WEI_PERSONNEL_RECORD, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            zhLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            let total = res.data.obj.total
            dispatch(actionCreator(constant.CHANGEV, {
                zhEntryAndExitList: data,
                ZHTogal: total
            })); 
            if(cb) cb()
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            zhLoading: false
        })); 
        console.log(error)
        casCheck(p_userKey)
    });
}

export const getCLBuildList = (value, cb) => (dispatch, getState) => {
    const p_userKey = localStorage.getItem('userKey')
    const p_id = localStorage.getItem('id')
    const PARAMS = {
        userKey: p_userKey,
        zoneId: p_id,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        clLoading: true
    })); 
    axios.get(WEI_BUILD, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            clLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(data.length > 0) {
                let siderCLUnitList = []
                let siderCLBuildListJson = {}
                data.forEach(item => {
                    siderCLBuildListJson[item.id] = item
                })
                if(data.length > 0) {
                    if(data[0].unit > 0) {
                        for(let i=0; i < data[0].unit; i++){
                            let num = i
                            num++
                            siderCLUnitList.push(num)
                        }
                    }
                }
                return dispatch(actionCreator(constant.CHANGEV, {
                    siderCLBuildList: data,
                    siderCLBuildListJson: siderCLBuildListJson,
                    siderCLUnitList: siderCLUnitList,
                    siderCLBuild: 'all',
                    siderCLUnit: 'all',
                    siderCLRoom: 'all',
                }));
            }
            
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            clLoading: false
        })); 
        console.log(error)
        casCheck(p_userKey)
    });
}

export const getCLRoomList = (value, cb) => (dispatch, getState) => {
    const { userKey, id, siderCLBuild } = getState().DataVisualization
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        storiedBuildingId: siderCLBuild,
        unit: value
    }
    dispatch(actionCreator(constant.CHANGEV, {
        clLoading: true
    })); 
    axios.get(WEI_HOUSE, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            clLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(cb) cb()
            return dispatch(actionCreator(constant.CHANGEV, {
                siderCLRoomList: data,
                siderCLRoom: 'all',
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            clLoading: false
        })); 
        console.log(error)
        casCheck(userKey)
    });
}

export const getCLSelectRecVehicleRecord = (params, page=1, cb) => (dispatch, getState) => {
    const { userKey, id } = getState().DataVisualization
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        ...params,
        pages: page,
        limit: 20,
        fields: 'id',
        rule: 'desc'
    }
    dispatch(actionCreator(constant.CHANGEV, {
        clLoading: true
      })); 
    axios.get(WEI_SELECT_RECVEHICLE_RECORD, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            clLoading: false
          })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(cb) cb()
            return dispatch(actionCreator(constant.CHANGEV, {
                clselectRecVehicleRecordList: data
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            clLoading: false
          })); 
        console.log(error)
        casCheck(userKey)
    });
}

export const getDefaultPlay = () => (dispatch, getState) => {
    const p_userKey = localStorage.getItem('userKey')
    const p_id = localStorage.getItem('id')
    const PARAMS = {
        userKey: p_userKey,
        zoneId: p_id,
    } 
    axios.get(WEI_DEFAULT_PLAY, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                defaultPlayUrl1: data.url1,
                defaultPlayUrl2: data.url2,
            }));
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) { 
        console.log(error)
        casCheck(p_userKey)
    });
}

export const getHousingAddress = (params) => (dispatch, getState) => {
    const { userKey, id} = getState().DataVisualization
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        userId: params
    } 
    axios.get(WEI_HOUSING_ADDRESS, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            return dispatch(actionCreator(constant.CHANGEV, {
                housingAddressList: data
            }));
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) { 
        console.log(error)
        casCheck(userKey)
    });
}

export const getServicesList= (params, page=1) => (dispatch, getState) => {
    const p_userKey = localStorage.getItem('userKey')
    const p_id = localStorage.getItem('id')
    const {userKey} = getState().DataVisualization
    const PARAMS = {
        userKey: p_userKey,
        zoneId: p_id,
        // limit: 2,
        ...params,
        pages: page
    }
    let servicesList = []
    axios.get(WEI_SERVICE, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(data.length > 0) {
                data.map((item, index) => {
                    servicesList.push({
                        key: index,
                        num: (parseInt(index, 10) + 1) + 20*(page-1),
                        servicename: item.name,
                        servicemodel: item.number,
                        deviceName: item.deviceName,
                        nameBrand: item.nameBrand,
                        coding: item.coding,
                        zoneSystemId: item.zoneSystemId,
                        state: item.state
                    })
                })
            }
            return dispatch(actionCreator(constant.CHANGEV, {
                fontServicesList: servicesList,
                eqTotal: res.data.obj.total,
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            const PARAMS = {
                userKey: userKey,
            }
            axios.get(CAS_CASCHECK, {
                params: PARAMS
            })
            .then(function (res) {
                if(res.data.msg === "成功" && res.data.success) {
                    toastr.error('网络异常')
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
            })
        }
    })
}
