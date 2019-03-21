import * as constant from '../constant/CompanyManage'
import axios from 'axios'
import utils from '../../../../util/util.js'
import {
    CAS_LOGIN, 
    CAS_CASCHECK,
    
    WEI_COMPANY_INSERT,
    WEI_COMPANY_SELECT,
    WEI_COMPANY_SELECT_ID,
    WEI_COMPANY_DELETE,
    WEI_COMPANY_UPDATE
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
  


export const getCompanyList=(params, page=1) => (dispatch, getState) => {
    const {userKey, id} = getState().CompanyManage
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        // limit: 2,
        ...params,
        pages: page
    }
    let companyList = []
    axios.post(WEI_COMPANY_SELECT, PARAMS)
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(data.length > 0) {
                data.map((item, index) => {
                    item.num = parseInt(index, 10) + 1 + (page-1)*20
                })
            }
            return dispatch(actionCreator(constant.CHANGEV, {
                companyList: data,
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

export const updateCompany=(params,cb) => (dispatch, getState) => {
    const {userKey, id} = getState().CompanyManage
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        ...params
    }
    axios.post(WEI_COMPANY_UPDATE,PARAMS)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            loading: false
        })); 
        if(res.data.msg === "成功" && res.data.success) {
            console.log(res.data.msg);
            console.log(res.data.success);
            if (cb) cb()
        } else if(res.data.msg === "微服务异常" && !res.data.succcess) {
            console.log('aaaa');
            
            casCheck(userKey)
        }
    }).catch(function (error) {
        console.log(error);
        console.log('bbbb');
        casCheck(userKey)
    })
}

export const getCompany=(params, cb) => (dispatch, getState) => {
    const {userKey, id} = getState().CompanyManage
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        ...params
    }
    let companyInfo 
    axios.post(WEI_COMPANY_SELECT_ID, PARAMS)
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            companyInfo = res.data.obj

            console.log(res);
            console.log(companyInfo);
            
            if (cb) cb()
            return dispatch(actionCreator(constant.CHANGEV, {
                companyInfo: companyInfo,
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        casCheck(userKey)
    })
}

export const addCompany = (params, cb) => (dispatch, getState) => {
    const {
        userKey,
        id
    } = getState().CompanyManage
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        ...params,
    }
    dispatch(actionCreator(constant.CHANGEV, {
        loading: true
    }));
    axios.post(WEI_COMPANY_INSERT, PARAMS)
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

export const deletaCompany = (params, cb) => (dispatch, getState) => {
    const {
        userKey,
    } = getState().CompanyManage
    const PARAMS = {
        userKey: userKey,
        id: params
    }
    dispatch(actionCreator(constant.CHANGEV, {
        loading: true
    }));
    axios.post(WEI_COMPANY_DELETE, PARAMS)
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


