import * as constant from '../constant/HistoryCaseManage'
import axios from 'axios'
import utils from '../../../../util/util.js'
import {
    CAS_LOGIN, 
    CAS_CASCHECK,
    WEI_CASE_INSERT,
    WEI_CASE_SELECT,
    WEI_CASE_UPDATE,
    WEI_CASE_DELETE,
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

export const getData= (page=1) => (dispatch, getState) => {
  return dispatch(actionCreator(constant.CHANGEV, {
    num: "0"
})); 
}

export const caseSelect = (params, page = 1, cb) => (dispatch, getState) => {
    const {
        userKey,
        id
    } = getState().HistoryCaseManage
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        pages: page,
        delete: "false",
    };
    if (params) {
        if (params.startDate) {
            PARAMS.startDate = params.startDate
        }
        if (params.endDate) {
            PARAMS.endDate = params.endDate
        }
        if (params.involveName) {
            PARAMS.involveName = params.involveName
        }
    }
    dispatch(actionCreator(constant.CHANGEV, {
        caseLoading: true
    }));
    axios.get(WEI_CASE_SELECT, {
            params: PARAMS
        })
        .then(function (res) {
            dispatch(actionCreator(constant.CHANGEV, {
                caseLoading: false
            }));
            if (res.data.msg === "成功" && res.data.success) {
                const data = res.data.obj.data
                // if (data.length > 0) {
                    if (cb) cb()
                    dispatch(actionCreator(constant.CHANGEV, {
                        caseList: data,
                        total: res.data.obj.total,
                        currentParams: PARAMS,
                        current: page,
                    }));
                // }
            } else if (res.data.msg === "微服务异常" && !res.data.success) {
                casCheck(userKey)
            }
        }).catch(function (error) {
            dispatch(actionCreator(constant.CHANGEV, {
                caseLoading: false
            }));
            console.log(error)
            casCheck(userKey)
        });
}

export const caseAdd = (params, cb) => (dispatch, getState) => {
    const {
        userKey,
        id
    } = getState().HistoryCaseManage
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        ...params,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        loading: true
    }));
    axios.post(WEI_CASE_INSERT, PARAMS)
        .then(function (res) {
            dispatch(actionCreator(constant.CHANGEV, {
                loading: false
            }));
            if (res.data.msg === "成功" && res.data.success) {
                if (cb) cb()
                console.log(cb);
            } else if (res.data.msg === "微服务异常" && !res.data.success) {
                casCheck(userKey)
            }
        }).catch(function (error) {
            dispatch(actionCreator(constant.CHANGEV, {
                loading: false
            }));
            console.log(error)
            // casCheck(userKey)
        });
}

export const caseDelete = (params, cb) => (dispatch, getState) => {
    const {
        userKey,
    } = getState().HistoryCaseManage
    const PARAMS = {
        userKey: userKey,
        id: params
    }
    dispatch(actionCreator(constant.CHANGEV, {
        loading: true
    }));
    axios.post(WEI_CASE_DELETE, PARAMS)
        .then(function (res) {
            dispatch(actionCreator(constant.CHANGEV, {
                loading: false
            }));
            if (res.data.msg === "成功" && res.data.success) {
                if (cb) cb()
            } else if (res.data.msg === "微服务异常" && !res.data.success) {
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

export const caseUpdate = (params, cb) => (dispatch, getState) => {
    const {
        userKey,
        id
    } = getState().HistoryCaseManage
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        ...params,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        loading: true
    }));
    axios.post(WEI_CASE_UPDATE, PARAMS)
        .then(function (res) {
            dispatch(actionCreator(constant.CHANGEV, {
                loading: false
            }));
            if (res.data.msg === "成功" && res.data.success) {
                console.log('aaa')
                if (cb) cb()
            } else if (res.data.msg === "微服务异常" && !res.data.success) {
                casCheck(userKey)
            }
        }).catch(function (error) {
            dispatch(actionCreator(constant.CHANGEV, {
                loading: false
            }));
            console.log(error)
            // casCheck(userKey)
        });
}