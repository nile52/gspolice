import * as constant from '../constant/ParkingManage'
import axios from 'axios'
import utils from '../../../../util/util.js'
import {
    CAS_LOGIN, 
    CAS_CASCHECK, 
    WEI_SELECT_PARKING_LOT,
    WEI_SELECT_PARKING_SPACE,
    WEI_ADD_PARKING_LOT,
    WEI_ADD_PARKING_SPACE,
    WEI_UPDATE_PARKING_SPACE,
    WEI_DELETE_PARKING_SPACE,
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
        utils.toLoginUrl(CAS_LOGIN)
        localStorage.setItem('userKey', null)
        localStorage.setItem('id', null)
    });
}

export const changev=(value)=>(dispatch)=>{
    return dispatch(actionCreator(constant.CHANGEV,value));
};

// 查询停车场
export const getParkingLotList = () => (dispatch, getState) => {
    const {userKey, id} = getState().ParkingManage
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
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
                parkingLotJson: parkingLotJson,
            }));
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        console.log(error)
        casCheck(userKey)
    });
}

// 查询停车位
export const getParkingSpaceCodingList = (params, page=1, cb) => (dispatch, getState) => {
    const {userKey, id, pageSize} = getState().ParkingManage
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        ...params,
        delete: false,
        limit: pageSize,
        pages: page,
        //parkingLotId: parkingLotJson[params.park_name].id,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        parkLoading: true
    }));
    axios.get(WEI_SELECT_PARKING_SPACE, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            parkLoading: false
        }));
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            const total = res.data.obj.total
            if(data.length > 0) {
                if(cb) cb()
                dispatch(actionCreator(constant.CHANGEV, {
                    parkingSpaceCodingList: data,
                    currentParams: PARAMS,
                    total: total,
                    current: page
                }));
              // parkingSpaceCodingList
            } else {
                dispatch(actionCreator(constant.CHANGEV, {
                    parkingSpaceCodingList: [],
                    currentParams: PARAMS,
                    total: total,
                    current: page
                }));
            }
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            parkLoading: false
        }));
        console.log(error)
        casCheck(userKey)
    });
}

// 新增停车场
export const addParkingLot = (params, cb) => (dispatch, getState) => {
    const {userKey, id} = getState().ParkingManage
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        ...params,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        parkLoading: true
    }));
    axios.get(WEI_ADD_PARKING_LOT, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            parkLoading: false
        }));
        if(res.data.msg === "成功" && res.data.success) {
            if(cb) cb()
           
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            parkLoading: false
        }));
        console.log(error)
        casCheck(userKey)
    });
}


// 新增停车位
export const addParkingSpaceCodingList = (params, cb) => (dispatch, getState) => {
    const {userKey, id} = getState().ParkingManage
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        ...params,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        parkLoading: true
    }));
    axios.get(WEI_ADD_PARKING_SPACE, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            parkLoading: false
        }));
        if(res.data.msg === "成功" && res.data.success) {
            if(cb) cb()
           
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            parkLoading: false
        }));
        console.log(error)
        casCheck(userKey)
    });
}

// 修改停车位
export const updatePlakingPosition = (params, cb) => (dispatch, getState) => {
    const {userKey, id} = getState().ParkingManage
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        ...params,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        parkLoading: true
    }));
    axios.get(WEI_UPDATE_PARKING_SPACE, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            parkLoading: false
        }));
        if(res.data.msg === "成功" && res.data.success) {
            if(cb) cb()
           
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            parkLoading: false
        }));
        console.log(error)
        casCheck(userKey)
    });
}

// 删除停车位
export const deleteParkingSpaceCodingList = (params, cb) => (dispatch, getState) => {
    const {userKey} = getState().ParkingManage
    const PARAMS = {
        userKey: userKey,
        id: params
    }
    dispatch(actionCreator(constant.CHANGEV, {
        parkLoading: true
    }));
    axios.get(WEI_DELETE_PARKING_SPACE, {
        params: PARAMS
    })
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            parkLoading: false
        }));
        if(res.data.msg === "成功" && res.data.success) {
            if(cb) cb()
           
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        dispatch(actionCreator(constant.CHANGEV, {
            parkLoading: false
        }));
        console.log(error)
        casCheck(userKey)
    });
}
