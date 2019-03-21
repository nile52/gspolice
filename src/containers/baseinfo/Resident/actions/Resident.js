import * as constant from '../constant/Resident'
import axios from 'axios'
import utils from '../../../../util/util.js'
import {
    WEI_BUILD,
    WEI_HOUSE,
    WEI_RESIDENT,
    CAS_LOGIN,
    CAS_CASCHECK,
    WEI_SINGLE_RESIDENT,
    WEI_MODIFY_RESIDENT,
    WEI_SELECT_USER_HOUSING,
    WEI_SELECT_PARKING_SPACE,
    WEI_SELECT_PARKING_LOT,
    WEI_KEY_AND_VALUE,
    WEI_RESIDENT_INSERT,
    WEI_RESIDENT_DELETE,
    GET_LKB_ADDRESS,
    WEI_GET_ID_CARD,
    WEI_EXPORTUSER
} from '../../../../fetch/apis'
import { Modal } from 'antd';
import * as toastr from 'toastr';
import '../../../../static/css/toastr.min.css';

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

export const changev=(value)=>(dispatch)=>{
    return dispatch(actionCreator(constant.CHANGEV,value));
};

export const getBuildList= () => (dispatch, getState) => {
    const {userKey, id} = getState().Resident
    if(!(userKey && id)) return 
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
    }
    let buildList = []
    let buildJson = {}
    axios.get(WEI_BUILD, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(data.length > 0) {
                data.map((item, index) => {
                    buildList.push({
                        num: parseInt(index, 10) + 1,
                        buildId: id,
                        name: item.name,
                        layer: item.layer,
                        unit: item.unit,
                    })
                    buildJson[item.name] = item            
                })
            }
            return dispatch(actionCreator(constant.CHANGEV, {
                buildList: buildList,
                buildJson: buildJson
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        console.log(error)
        casCheck(userKey)
    });
}

export const getHouseList=(params, cb) => (dispatch, getState) => {
    const {userKey, id} = getState().Resident
    if(!(userKey && id)) return  
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        ...params
    }
    let houseId = ''
    axios.get(WEI_HOUSE, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(data.length > 0) {
                //获取房屋id 从房屋list中获取一长串ID拼起来 1,2,3,4,5,6
                if (data.length === 1) {
                    houseId = data[0].id
                } else {
                    data.map((item, index) => {
                        if (index === data.length -1) {
                            houseId += item.id
                        } else {
                            houseId += item.id + ','
                        }
                    })
                }
            } else {
                houseId = 0
            }
            if (cb) cb(houseId)
            return dispatch(actionCreator(constant.CHANGEV, {
                houseId: houseId,
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        console.log(error)
        casCheck(userKey)
    });
}
  
export const getResidentList= (params, page=1) => (dispatch, getState) => {
    const {userKey, id} = getState().Resident
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        // limit: 2,
        ...params,
        pages: page
    }
    if(!PARAMS.zoneId) return
    dispatch(actionCreator(constant.CHANGEV, {
        loading: true
    })); 
    axios.get(WEI_RESIDENT, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            loading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            
            if(data.length > 0) {
                data.map((item, index) => {
                    item.num = (parseInt(index, 10) + 1) + (page-1)*20
                })
            }
            return dispatch(actionCreator(constant.CHANGEV, {
                residentList: data,
                total: res.data.obj.total,
                currentParams: PARAMS,
                current: page
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            loading: false
        })); 
        console.log(error)
        casCheck(userKey)
    });
    
}

export const getSingleResidentList= (params, cb) => (dispatch, getState) => {
    const {userKey, id} = getState().Resident
    dispatch(actionCreator(constant.CHANGEV, {
        loading: true
    })); 
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        ...params,
    }
    axios.get(WEI_SINGLE_RESIDENT, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            const singleUserType = res.data.obj.userType
            let householdRegistration = data.householdRegistration
            axios.get(GET_LKB_ADDRESS, {
                params: {
                    userKey: userKey,
                    root: 1,
                    init: true,
                    value: householdRegistration,
                }
            })
            .then(function (res) {
                if(res.data.msg === "成功" && res.data.success) {
                    let newHouseholdRegistration = []
                    let newProvinceOptions = []
                    let newCityOptions = []
                    let newAreaOptions = []
                    let provinceCityArea = ''
                    let province = ''
                    let city = ''
                    let area = ''
                    let dataOptions = res.data.obj
                    let newIsRequired = true
                    if(dataOptions.length === 3) {
                        newHouseholdRegistration.push(res.data.obj[1].parent)
                        newHouseholdRegistration.push(res.data.obj[2].parent)
                        newHouseholdRegistration.push(householdRegistration)
                        data.householdRegistration = newHouseholdRegistration
                        dataOptions[2].data.forEach(item => {
                            if(item.value === householdRegistration) {
                                area = item.text
                            }
                            newAreaOptions.push({
                                value: item.value,
                                label: item.text,
                                level: '区县',
                                isLeaf: true,
                            })
                        })
                        dataOptions[1].data.forEach(item => {
                            if(item.value === dataOptions[2].parent) {
                                newCityOptions.push({
                                    value: item.value,
                                    label: item.text,
                                    level: '地市',
                                    isLeaf: false,
                                    children: newAreaOptions
                                })
                                city = item.text
                            } else {
                                newCityOptions.push({
                                    value: item.value,
                                    label: item.text,
                                    level: '地市',
                                    isLeaf: false,
                                })
                            }
                        })
                        dataOptions[0].data.forEach(item => {
                            if(item.value === '71' || item.value === '81' || item.value === '82') {
                                newProvinceOptions.push({
                                    value: item.value,
                                    label: item.text,
                                    level: '省',
                                    isLeaf: true,
                                })
                            }else {
                                if(item.value === dataOptions[1].parent) {
                                    newProvinceOptions.push({
                                        value: item.value,
                                        label: item.text,
                                        level: '省',
                                        isLeaf: false,
                                        children: newCityOptions
                                    })
                                    province = item.text
                                } else {
                                    newProvinceOptions.push({
                                        value: item.value,
                                        label: item.text,
                                        level: '省',
                                        isLeaf: false,
                                    })
                                }
                                
                            }
                        })
                        provinceCityArea = province + city + area
                    } else {
                        newHouseholdRegistration.push(householdRegistration)
                        data.householdRegistration = newHouseholdRegistration
                        dataOptions[0].data.forEach(item => {
                            if(item.value === householdRegistration) {
                                provinceCityArea = item.text
                            }
                            if(item.value === '71' || item.value === '81' || item.value === '82') {
                                newProvinceOptions.push({
                                    value: item.value,
                                    label: item.text,
                                    level: '省',
                                    isLeaf: true,
                                })
                            }else {
                                newProvinceOptions.push({
                                    value: item.value,
                                    label: item.text,
                                    level: '省',
                                    isLeaf: false,
                                })
                            }
                        })
                    }
                    if(data) {
                        const PARAMS2 = {
                            userKey: userKey,
                            zoneId: id,
                            userId: params.id,
                            delete: false
                        }
                        axios.get(WEI_SELECT_USER_HOUSING, {
                            params: PARAMS2
                        })
                        .then(function (res) {
                            if(res.data.msg === "成功" && res.data.success) {
                                const userHouseData = res.data.obj.data
                                if(userHouseData) {
                                    axios.get(WEI_SELECT_PARKING_SPACE, {
                                        params: PARAMS2
                                    })
                                    .then(function (res) {
                                        dispatch(actionCreator(constant.CHANGEV, {
                                            loading: false
                                        }));
                                        if(res.data.msg === "成功" && res.data.success) {
                                            const userParkData = res.data.obj.data
                                            if(userParkData) {
                                                if(cb) cb()
                                                dispatch(actionCreator(constant.CHANGEV, {
                                                    singleParkingLotList: userParkData
                                                })); 
                                            }
                                        } else if(res.data.msg === "微服务异常" && !res.data.success) {
                                            casCheck(userKey)
                                        }
                                    })
                                }
                                dispatch(actionCreator(constant.CHANGEV, {
                                    singleHouseList: userHouseData,
                                })); 
                            } else if(res.data.msg === "微服务异常" && !res.data.success) {
                                dispatch(actionCreator(constant.CHANGEV, {
                                    loading: false
                                })); 
                                casCheck(userKey)
                            }
                        }).catch(function (error) {
                            dispatch(actionCreator(constant.CHANGEV, {
                                loading: false
                            }));
                            console.log(error)
                            casCheck(userKey)
                        });
                    }
                    if(data.flowIsPermanent === "常住人员") {
                        newIsRequired = false
                    }
                    dispatch(actionCreator(constant.CHANGEV, {
                        singleResidentList: data,
                        singleUserType: singleUserType,
                        casCaderOptions: newProvinceOptions,
                        provinceCityArea: provinceCityArea,
                        isRequired: newIsRequired
                    })); 
                } else {
                    let newIsRequired = true
                    if(data) {
                        const PARAMS2 = {
                            userKey: userKey,
                            zoneId: id,
                            userId: params.id
                        }
                        axios.get(WEI_SELECT_USER_HOUSING, {
                            params: PARAMS2
                        })
                        .then(function (res) {
                            if(res.data.msg === "成功" && res.data.success) {
                                const userHouseData = res.data.obj.data
                                if(userHouseData) {
                                    axios.get(WEI_SELECT_PARKING_SPACE, {
                                        params: PARAMS2
                                    })
                                    .then(function (res) {
                                        dispatch(actionCreator(constant.CHANGEV, {
                                            loading: false
                                        }));
                                        if(res.data.msg === "成功" && res.data.success) {
                                            const userParkData = res.data.obj.data
                                            if(userParkData) {
                                                if(cb) cb()
                                                dispatch(actionCreator(constant.CHANGEV, {
                                                    singleParkingLotList: userParkData
                                                })); 
                                            }
                                        } else if(res.data.msg === "微服务异常" && !res.data.success) {
                                            casCheck(userKey)
                                        }
                                    })
                                }
                                dispatch(actionCreator(constant.CHANGEV, {
                                    singleHouseList: userHouseData,
                                })); 
                            } else if(res.data.msg === "微服务异常" && !res.data.success) {
                                dispatch(actionCreator(constant.CHANGEV, {
                                    loading: false
                                })); 
                                casCheck(userKey)
                            }
                        }).catch(function (error) {
                            dispatch(actionCreator(constant.CHANGEV, {
                                loading: false
                            }));
                            console.log(error)
                            casCheck(userKey)
                        });
                    }
                    if(data.flowIsPermanent === "常住人员") {
                        newIsRequired = false
                    }
                    dispatch(actionCreator(constant.CHANGEV, {
                        singleResidentList: data,
                        singleUserType: singleUserType,
                        isRequired: newIsRequired,
                        lkbIsWrong: true
                    })); 
                    
                }
            }) 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            dispatch(actionCreator(constant.CHANGEV, {
                loading: false
            })); 
            casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            loading: false
        })); 
        console.log(error)
        casCheck(userKey)
    });
    
}

export const saveModify = (params, cb) => (dispatch, getState) => {
    const {userKey, id} = getState().Resident
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        ...params,
    }
    console.log(JSON.stringify(PARAMS))
    dispatch(actionCreator(constant.CHANGEV, {
        loading: true
    })); 
    axios.post(WEI_MODIFY_RESIDENT, PARAMS)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            loading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            if(cb) cb()
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            loading: false
        })); 
        console.log(error)
        casCheck(userKey)
    });
}

export const getParkingLotList = (params, cb) => (dispatch, getState) => {
    const {userKey, id} = getState().Resident
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        delete: false
    }
    axios.get(WEI_SELECT_PARKING_LOT, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            let parkingLotJson = {}
            if(data.length > 0) {
                data.map(item => {
                    parkingLotJson[item.name] = item
                })
            }
            dispatch(actionCreator(constant.CHANGEV, {
                parkingLotList: data,
                parkingLotJson: parkingLotJson
            }));
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        console.log(error)
        casCheck(userKey)
    });
    
}

export const getKeyAndValue = (params, cb) => (dispatch, getState) => {
    const {userKey} = getState().Resident
    const PARAMS = {
        userKey: userKey
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
            casCheck(userKey)
        }
    }).catch(function (error) {
        console.log(error)
        casCheck(userKey)
    });
}

export const residentInsert = (params, cb) => (dispatch, getState) => {
    const {userKey, id} = getState().Resident
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        ...params,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        loading: true
    })); 
    axios.post(WEI_RESIDENT_INSERT, PARAMS)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            loading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            if(cb) cb()
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        } else {
            if(cb) cb()
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            loading: false
        })); 
        console.log(error)
        casCheck(userKey)
    });
}

export const residentDelete = (value, cb) => (dispatch, getState) => {
    const {userKey, id} = getState().Resident
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        userId: value
    }
    dispatch(actionCreator(constant.CHANGEV, {
        loading: true
    })); 
    axios.post(WEI_RESIDENT_DELETE, PARAMS)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            loading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            if(cb) cb()
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            loading: false
        })); 
        console.log(error)
        casCheck(userKey)
    });
}

export const getLkbAddress = (params, cb) => (dispatch, getState) => {
    const {userKey} = getState().Resident
    const PARAMS = {
        userKey,
        ...params,
    }
    axios.get(GET_LKB_ADDRESS, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            let data = res.data.obj
            switch(data[0].level) {
                case '省':
                    let casCaderOptions = []
                    data[0].data.forEach(item => {
                        if(item.value === '71' || item.value === '81' || item.value === '82') {
                            casCaderOptions.push({
                                value: item.value,
                                label: item.text,
                                level: '省',
                                isLeaf: true,
                            })
                        }else {
                            casCaderOptions.push({
                                value: item.value,
                                label: item.text,
                                level: '省',
                                isLeaf: false,
                            })
                        }
                    })
                    dispatch(actionCreator(constant.CHANGEV, {
                        casCaderOptions: casCaderOptions
                    }));
                    break
                case '地市':
                    if(cb) cb(data[0])
                    break
                case '区县':
                    if(cb) cb(data[0])
                    break
                default:
                    break
            }
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        } else {
            dispatch(actionCreator(constant.CHANGEV, {
                lkbIsWrong: true
            })); 
        }
    }).catch(function (error) {
        console.log(error)
        casCheck(userKey)
    });
}

export const getReadCard = (cb) => (dispatch, getState) => {
    const {userKey, id} = getState().Resident
    const PARAMS = {
        userKey,
        zoneId: id,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        loading: true
    }));
    axios.get(WEI_GET_ID_CARD, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            loading: false
        }));
        if(res.data.msg === "成功" && res.data.success) {
            if(cb) cb(res.data)
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        } else {
            Modal.info({
                title: '异常',
                content: "未找到信息, 请重新读取证件",
                onOk() {},
            });
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            loading: false
        }));
        console.log(error)
        casCheck(userKey)
    });
}

export const exportUser = (params) => (dispatch, getState) => {
    const { userKey, id } = getState().Resident
    const PARAMS = {
        ...params,
    }

    var urlEncode = function (param, key, encode) {
        if (param == null) return '';
        var paramStr = '';
        var t = typeof (param);
        if (t === 'string' || t === 'number' || t === 'boolean') {
            paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
        } else {
            for (var i in param) {
                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                paramStr += urlEncode(param[i], k, encode);
            }
        }
        return paramStr;
    };  
    var p = urlEncode(PARAMS)
    window.location.href = WEI_EXPORTUSER + '?userKey=' + userKey + '&zoneId=' + id + p
}