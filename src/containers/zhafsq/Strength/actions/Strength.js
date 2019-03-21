/* eslint-disable */
import * as constant from '../constant/Strength'
import axios from 'axios'
import * as toastr from 'toastr';
import '../../../../static/css/toastr.min.css';
import utils from '../../../../util/util'
import moment from 'moment'; 
import {
    CAS_LOGIN, 
    CAS_CASCHECK,
    POLICE_ZONE_LEVEL,
    POLICE_FORCES_BASE,
    POLICE_FORCES_POLICE,
    POLICE_FORCES_POLICEUNIT,
    POLICE_FORCES_TRAJECTORY,
    POLICE_FORCES_TRAJECTORY_TIANYI,
    POLICE_FORCES_POLICE_ALL,
    POLICE_FORCES_TRAJECTORY_TOTAL,
    POLICE_FORCES_POINT_TIANYI
} from '../../../../fetch/apis'
import { deepStrictEqual } from 'assert';

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

// 实有力量与装备-基础数据-小区
export const getBarData = () => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    const stype = localStorage.getItem('pcsName') ? localStorage.getItem('pcsName') : '祥符派出所'
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    params['UNIT'] = stype
    params['userKey'] = p_userKey
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(POLICE_FORCES_BASE, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                pieData: data.upper,
                barData: data.lower
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

// 警力点位
export const getForcesListPoint = (value, type) => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    const stype = localStorage.getItem('pcsName') ? localStorage.getItem('pcsName') : '祥符派出所'
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = {}
    // params[level] = levelId
    params['userKey'] = p_userKey
    params['POLICE_TYPE'] = value
    params['UNIT'] = stype
    axios.post(POLICE_FORCES_POLICE_ALL, params)
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                [type]: data
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        console.log(error)
        //casCheck(p_userKey)
    });
}

// 天翼点位
export const getForcesListPointTianYi = (value, type) => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    const stype = localStorage.getItem('pcsName') ? localStorage.getItem('pcsName') : '祥符派出所'
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = {}
	// unitName 派出所名称 (目前只有祥符派出所有数据)
	// stype 类型(派出所 联动 特巡 岗亭)
    params['userKey'] = p_userKey
    params['stype'] = value
    params['unitName'] = stype
    axios.post(POLICE_FORCES_POINT_TIANYI, params)
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                [type]: data
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(p_userKey)
        }
    }).catch(function (error) {
        console.log(error)
        //casCheck(p_userKey)
    });
}


// 查询警力
export const getForcesList = (searchArr={}, current=1, size=20) => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    const level = localStorage.getItem('level') ? localStorage.getItem('level') : 'districtId'
    const levelId = localStorage.getItem('levelId') ? localStorage.getItem('levelId') : '2'
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = searchArr
    // params[level] = levelId
    params['userKey'] = p_userKey
    params['size'] = size
    params['current'] = current
    dispatch(actionCreator(constant.CHANGEV, {
        tableLoading: true
    })); 
    axios.post(POLICE_FORCES_POLICE, params)
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            var list = data.list
            var currPage = data.currPage
            var totalCount = data.totalCount
            var totalPage = data.totalPage
            var tableData = []
            list.map((v,i)=>{
                tableData.push({
                    key: i,
                    user_name: v.USER_NAME,
                    user_id: v.USER_ID,
                    unit: v.USER_UNIT,
                    car_no: v.CAR_NO,
                    type: v.POLICE_TYPE,
                    status: v.ONLINE,   
                    lasttime: v.STIME&&v.STIME.length == 12 ? utils.dealPlainTime(v.STIME) : v.STIME,   
                })
            })
            return dispatch(actionCreator(constant.CHANGEV, {
                tableLoading: false,
                tableData: tableData,
                tableCurrPage: currPage,
                tableTotalCount: totalCount,
                tableTotalPage: totalPage
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

// 获取警力详情
export const getForcesDetail = (id) => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    const level = localStorage.getItem('level') ? localStorage.getItem('level') : 'districtId'
    const levelId = localStorage.getItem('levelId') ? localStorage.getItem('levelId') : '2'
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    // params[level] = levelId
    params['userKey'] = p_userKey
    params['GPSID'] = id
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(POLICE_FORCES_POLICE, params)
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                diLoading: false,
                markerDetail: data[0],
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

// 查询警员单位信息
export const getPoliceUnit = () => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    const level = localStorage.getItem('level') ? localStorage.getItem('level') : 'districtId'
    const levelId = localStorage.getItem('levelId') ? localStorage.getItem('levelId') : '2'
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    // params[level] = levelId
    params['type'] = 1
    params['userKey'] = p_userKey
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(POLICE_FORCES_POLICEUNIT, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                policeUnit: data
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

// 查询警员详情
export const getPointDetail = (id, starttime, endtime, cb) => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    params['gpsId'] =  id // '000009025407'
    params['userKey'] = p_userKey
    params['startDate'] = '2019-01-01 00:00'
    params['endDate'] = moment(new Date()).format("YYYY-MM-DD HH:mm")
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(POLICE_FORCES_TRAJECTORY, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            dispatch(actionCreator(constant.CHANGEV, {
                markerTrajectoryList: list,
                markerPoliceType: policeType,
                markerUserId: userId,
                markerUserName: userName,
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

// 查询轨迹（警员警车）
export const getPointTrajectory = (id, starttime, endtime, cb) => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    params['gpsId'] = id
    params['userKey'] = p_userKey
    params['startDate'] = starttime
    params['endDate'] = endtime
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(POLICE_FORCES_TRAJECTORY, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.gps            
            if (!data) {
                toastr.error('当前所选时间范围内无轨迹数据，请重新选择。')
                return
            }
            dispatch(actionCreator(constant.CHANGEV, {
                trajectory: data
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

// 查询轨迹（天翼）
export const getPointTrajectoryTianYi = (id, starttime, endtime, cb) => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    params['snumber'] = id // "15397069618"
    params['userKey'] = p_userKey
    params['startDate'] = starttime
    params['endDate'] = endtime
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(POLICE_FORCES_TRAJECTORY_TIANYI, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.gps            
            if (!data) {
                toastr.error('当前所选时间范围内无轨迹数据，请重新选择。')
                return
            }
            dispatch(actionCreator(constant.CHANGEV, {
                trajectory: data
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


// 查询轨迹总数
export const getPointTrajectoryTotal = () => (dispatch, getState) => {
    const localUserKey = localStorage.getItem('userKey')
    let p_userKey = ''
    if (localUserKey) {
        p_userKey = localUserKey
    }
    let params = []
    params['userKey'] = p_userKey
    dispatch(actionCreator(constant.CHANGEV, {
        diLoading: true
    })); 
    axios.post(POLICE_FORCES_TRAJECTORY_TOTAL, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            dispatch(actionCreator(constant.CHANGEV, {
                trajectoryTotal: data
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
