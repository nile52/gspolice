/* eslint-disable */
import * as constant from '../constant/AlarmSystem'
import axios from 'axios'
import utils from '../../../util/util'
import {CAS_LOGIN, CAS_CASCHECK, WEI_SERVICE} from '../../../fetch/apis'

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

function actionCreator(type, data) {
    return {
        type: type,
        payload: data
    }
}

export const changev=(value)=>(dispatch)=>{
    return dispatch(actionCreator(constant.CHANGEV,value));
};

export const getServicesList= (params, page=1) => (dispatch, getState) => {
    const {userKey, id} = getState().AlarmSystem
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
            const newData = "AlarmSystem页面"
            return dispatch(actionCreator(constant.CHANGEV, {
                data: newData
            })); 
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            casCheck(userKey)
        }
    }).catch(function (error) {
        casCheck(userKey)
    })
}