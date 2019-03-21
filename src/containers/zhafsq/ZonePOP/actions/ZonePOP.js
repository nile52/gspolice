/* eslint-disable */
import * as constant from '../constant/ZonePOP'
import axios from 'axios'
import utils from '../../../../util/util'
import {
    CAS_LOGIN, 
    CAS_CASCHECK,
    POLICE_ZONE_LEVEL,
    POLICE_PEOPLE_FOCUS,
    POLICE_PEOPLE_BASE_ZONE,
    POLICE_PEOPLE_NATIVE
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
    axios.post(POLICE_PEOPLE_BASE_ZONE, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            var barData = data.buildData ? data.buildData.map((item, key)=>{
                return {
                    "total": item.residenceTotal+item.permanentTotal+item.flowTotal,
                    "name": item.buildingName,
                    "residenceTotal": item.residenceTotal,
                    "permanentTotal": item.permanentTotal,
                    "flowTotal": item.flowTotal
                }
            }) : []
            return dispatch(actionCreator(constant.CHANGEV, {
                barData: barData,
                residence: data.residence,
                userTotal: data.userTotal,
                tagData: data.tagData,
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


//原籍分布柱状图
export const getPeopleNative = () => (dispatch, getState) => {
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
    axios.post(POLICE_PEOPLE_NATIVE, params)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            diLoading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            var capital = res.data.obj
            // console.log(capital);
            var res = [];
            var narr = [];
            for (var i = 0; i < capital.length; i++) {
                var n = res.indexOf(capital[i].native_place);
                if (n == -1) {
                    res.push(capital[i].native_place);
                    narr.push({ "native_place": capital[i].native_place, num: [capital[i].num] })
                } else {
                    narr[n].num.push(capital[i].num)
                }
            }
            var nativeArr = narr.map((m, n) => {
                return({
                    name: m.native_place,
                    value: eval(m.num.join('+'))
                })
            })
            return dispatch(actionCreator(constant.CHANGEV, {
                nativeArr: nativeArr,
                pointNativeArr: capital
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