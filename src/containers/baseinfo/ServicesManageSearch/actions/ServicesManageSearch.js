import * as constant from '../constant/ServicesManageSearch'
import axios from 'axios'
import utils from '../../../../util/util.js'
import {
    WEI_SERVICE, 
    WEI_SERVICE_BRAND, 
    CAS_LOGIN, 
    CAS_CASCHECK, 
    GET_THIRD_TOKEN
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

export const changev=(value)=>(dispatch)=>{
    return dispatch(actionCreator(constant.CHANGEV,value));
};

export const getThirdToken = () => (dispatch, getState) => {
    const {id} = getState().ServicesManageSearch
    const PARAMS = {
        zoneId: id
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
        }
    }).catch(function (error) {
        // utils.toLoginUrl(CAS_LOGIN)
        // localStorage.setItem('userKey', null)
    });
}

export const getServicesBrandList= () => (dispatch, getState) => {

    const {userKey, id} = getState().ServicesManageSearch
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
    }
    let servicesBrandList = []
    axios.get(WEI_SERVICE_BRAND, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(data.length > 0) {
                servicesBrandList = data
            }
            return dispatch(actionCreator(constant.CHANGEV, {
                servicesBrandList: servicesBrandList
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            axios.get(CAS_CASCHECK, {
                params: {
                    userKey: userKey
                }
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
                    // utils.toLoginUrl(CAS_LOGIN)
                    // localStorage.setItem('userKey', null)
                }
            }).catch(function (error) {
                // utils.toLoginUrl(CAS_LOGIN)
                // localStorage.setItem('userKey', null)
            });
        }
    }).catch(function (error) {
        // utils.toLoginUrl(CAS_LOGIN)
        // localStorage.setItem('userKey', null)
    });
}

export const getServicesList= (params, page=1) => (dispatch, getState) => {
    const {userKey, id} = getState().ServicesManageSearch
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
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
                servicesList: servicesList,
                total: res.data.obj.total,
                currentParams: PARAMS,
                current: page
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