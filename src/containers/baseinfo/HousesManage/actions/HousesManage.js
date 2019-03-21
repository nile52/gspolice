import * as constant from '../constant/HousesManage'
import axios from 'axios'
import utils from '../../../../util/util.js'
import {
    WEI_BUILD, 
    WEI_HOUSE, 
    CAS_LOGIN, 
    CAS_CASCHECK,
    GET_THIRD_TOKEN,
    WEI_UPDATEHOUSE,
    WEI_SELECTHOUSEINGMASTER
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
    const {userKey, id} = getState().HousesManage
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
        casCheck(userKey)
    })
}

export const getHouseList=(params, page=1) => (dispatch, getState) => {
    const {userKey, id} = getState().HousesManage
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        // limit: 2,
        ...params,
        pages: page
    }
    let houseList = []
    axios.get(WEI_HOUSE, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(data.length > 0) {
                data.map((item, index) => {
                    houseList.push({
                        key: index,
                        id: item.id,
                        num: parseInt(index, 10) + 1 + (page-1)*20,
                        name: item.name,
                        unitname: item.unit ,
                        roomname: item.room + '室',
                        currentfloor: item.layer,
                        area: item.area,
                        oriented: item.oriented,
                        usage: item.usage,
                        commercial: item.commercial ? '是' : '否',
                        archives: item.archives,
                        state: item.state ? '大华' : '启融',
                    })
                })
            }
            return dispatch(actionCreator(constant.CHANGEV, {
                houseList: houseList,
                total: res.data.obj.total,
                currentParams: PARAMS,
                current: page
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        casCheck(userKey)
    })
}

export const updateHouse=(params,cb) => (dispatch, getState) => {
    const {userKey, id} = getState().HousesManage
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        ...params
    }
    axios.post(WEI_UPDATEHOUSE,PARAMS)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            loading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            console.log(data);
            if (cb) cb()
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        casCheck(userKey)
    })
}

export const getHouse=(params, cb) => (dispatch, getState) => {
    const {userKey, id} = getState().HousesManage
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        ...params
    }
    let houseInfo 
    axios.get(WEI_HOUSE, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            houseInfo = res.data.obj.data[0]
            console.log(houseInfo)
            if (cb) cb()
            return dispatch(actionCreator(constant.CHANGEV, {
                houseInfo: houseInfo,
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        casCheck(userKey)
    })
}

export const getThirdToken = () => (dispatch, getState) => {
    const id = localStorage.getItem('id')
    const userKey = localStorage.getItem('userKey')
    const PARAMS = {
        zoneId: id,
        userKey: userKey
    }
    axios.get(GET_THIRD_TOKEN, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            return dispatch(actionCreator(constant.CHANGEV, {
                token: data
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        casCheck(userKey)
    });
}


export const getSelectHousingMaster = (data) => (dispatch, getState) => {
    const id = localStorage.getItem('id')
    const userKey = localStorage.getItem('userKey')
    const PARAMS = {
        zoneId: id,
        userKey: userKey,
        name: data
    }
    axios.get(WEI_SELECTHOUSEINGMASTER, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj;
            return dispatch(actionCreator(constant.CHANGEV, {
                HousingMasterData: data
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        casCheck(userKey)
    });
}