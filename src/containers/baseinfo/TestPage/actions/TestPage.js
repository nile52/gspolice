import * as constant from '../constant/TestPage'

function actionCreator(type, data) {
    return {
        type: type,
        payload: data
    }
}

export const changev=(value)=>(dispatch)=>{
    return dispatch(actionCreator(constant.CHANGEV,value));
};

export const changeProps=(value)=>(dispatch)=>{
    return dispatch(actionCreator(constant.CHANGEV,value));
};


  
