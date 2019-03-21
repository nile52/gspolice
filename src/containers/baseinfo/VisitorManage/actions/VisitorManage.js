import * as constant from '../constant/VisitorManage'
import axios from 'axios'
import utils from '../../../../util/util.js'
import {
    CAS_LOGIN,
    CAS_CASCHECK,
    WEI_BUILD,
    WEI_SELECT_USER_GUEST,
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
    const {userKey, id} = getState().VisitorManage
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
                        num: parseInt(index, 10) +1,
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

export const getVisitorList=(params, page=1) => (dispatch, getState) => {
    const {userKey, id} = getState().VisitorManage
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        // limit: 2,
        ...params,
        pages: page
    }
    let visitorList = []
    axios.get(WEI_SELECT_USER_GUEST, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(data.length > 0) {
                data.map((item, index) => {
                    visitorList.push({
                        num: (parseInt(index, 10) + 1) + 20*(page-1),
                        visitoredName: item.housingName,
                        visitorName: item.name,
                        idCard: item.idCard,
                        years: utils.IdCardBGY(item.idCard, 3),
                        gender: utils.IdCardBGY(item.idCard, 2),
                        mobile: item.mobile,
                        racial: item.racial,
                    })     
                })
            }
            return dispatch(actionCreator(constant.CHANGEV, {
                visitorList: visitorList,
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

