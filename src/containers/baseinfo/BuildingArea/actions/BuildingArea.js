import * as constant from '../constant/BuildingArea'
import axios from 'axios'
import utils from '../../../../util/util.js'
import {WEI_BUILD, CAS_LOGIN, CAS_CASCHECK} from '../../../../fetch/apis'
import { Modal } from 'antd'
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

export const getBuildList= (page=1) => (dispatch, getState) => {
    const {userKey, id} = getState().BuildingArea    
    const PARAMS = {
        userKey: userKey,
        zoneId: id,
        pages: page,
        // limit: 2
    }
    let buildList = []
    axios.get(WEI_BUILD, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(data.length > 0) {
                data.map((item, index) => {
                    buildList.push({
                        num: parseInt(index, 10) + 1 + (page-1)*20,
                        name: item.name,
                        layer: item.layer,
                        unit: item.unit,
                    })
                })
            }
            return dispatch(actionCreator(constant.CHANGEV, {
                buildList: buildList,
                total: res.data.obj.total,
                current: page
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
                    casCheck(userKey)
                }
            }).catch(function (error) {
                casCheck(userKey)
            });
        }
    }).catch(function (error) {
        casCheck(userKey)
    });
}
  
