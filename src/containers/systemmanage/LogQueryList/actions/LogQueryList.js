import * as constant from '../constant/LogQueryList'
import axios from 'axios'
import utils from '../../../../util/util'
import {
    CAS_LOGIN, 
    CAS_CASCHECK, 
    WEI_GET_LOG_LIST,
    WEI_GET_LOG_API
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

export const getLogApi = () => (dispatch, getState) => {
    const {userKey} = getState().LogQueryList
    const PARAMS = {
        userKey: userKey
    }
    axios.get(WEI_GET_LOG_API, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            let logApiList = []
            for(let i in data){
                let json = {}
                json.key = i
                json.label = data[i]
                logApiList.push(json)
            }
            dispatch(actionCreator(constant.CHANGEV, {
                logApiList: logApiList,
            }));
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        casCheck(userKey)
    })
}

export const getLogList = (params, page=1) => (dispatch, getState) => {
    const {userKey} = getState().LogQueryList
    const PARAMS = {
        userKey: userKey,
        ...params,
        pages: page,
        fields: 'id',
        rule: 'desc'
    }
    axios.post(WEI_GET_LOG_LIST, PARAMS)
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            const total = res.data.obj.total
            let logList = []
            if(data.length > 0) {
                data.map((item, index) => {
                    logList.push({
                        num: ++index + (page-1)*20,
                        ...item
                    })         
                })
            }
            dispatch(actionCreator(constant.CHANGEV, {
                logQueryList: logList,
                total: total,
                currentParams: PARAMS,
                current: page,
            }));
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        casCheck(userKey)
    })
}


