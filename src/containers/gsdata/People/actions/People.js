/* eslint-disable */
import * as constant from '../constant/People'
import axios from 'axios'
import utils from '../../../../util/util'
import {
    CAS_LOGIN, 
    CAS_CASCHECK,
    WEI_HOUSE_SEARCH,
    WEI_RESIDENT_PICTURE
} from '../../../../fetch/apis'

function casCheck(userKey) {
    const PARAMS = {
        userKey: userKey,
    }
    axios.get(CAS_CASCHECK, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            Modal.info({
                title: '异常',
                content: "网络异常",
                onOk() {},
            });
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

export const getSearch = (param, cb) => (dispatch, getState) => {
    const { userKey, id } = getState().GSPeople
    const localUserKey = localStorage.getItem('userKey')
    const localPersonId = localStorage.getItem('personId')
    const localId = localStorage.getItem('id')
    let p_userKey = ''
    let p_id = ''
    if(userKey && id) {
      p_userKey = userKey
      p_id = id
    } else if (localUserKey && localId) {
      p_userKey = localUserKey
      p_id = localId
    }
    if (!param && localPersonId) {
        param = {}
        param.userId = localPersonId
    }
    var PARAMS = param
    PARAMS.userKey = p_userKey

    dispatch(actionCreator(constant.CHANGEV, {
        searchLoading: true
    })); 
    axios.post(WEI_HOUSE_SEARCH, param)
    .then(function (res) {
        dispatch(actionCreator(constant.CHANGEV, {
            searchLoading: false
        })); 
        let data = res.data
        if(data.msg == "成功" && data.success) {
            let userList = res.data.obj
            if (userList.length == 1) {

                // 获取人员照片
                axios.get(WEI_RESIDENT_PICTURE, {
                    params: {
                        userKey: p_userKey,
                        userId: userList[0].user.id,
                        type: 'personal'
                    }
                })
                .then(function (res) {
                    if(res.data.msg === "成功" && res.data.success) {
                        let pic = null;
                        if(res.data.obj) {
                            pic = res.data.obj.file
                        }
                        userList[0].user.file = pic
                    } else if(res.data.msg === "微服务异常" && !res.data.success) {
                        casCheck(userKey)
                    }
                })
      
                dispatch(actionCreator(constant.CHANGEV, {
                    userDetail: userList[0],
                    userList: null,
                }));
            } else if (userList.length > 1) {
                dispatch(actionCreator(constant.CHANGEV, {
                    userList: userList,
                    userInfo: null,
                }));
                if(cb) cb()
            }
        } else {
          casCheck(p_userKey)
        }
    }).catch(function (error) {
          dispatch(actionCreator(constant.CHANGEV, {
            searchLoading: false
          })); 
          console.log(error)
          //casCheck(p_userKey)
      });
}
