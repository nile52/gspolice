/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Form, Table, Button, Row, Col, Card, Input, Select, Pagination, Modal, Tabs, Spin, Switch } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import BreadCrumbCustom from '../../../../component/BreadCrumbCustom/BreadCrumbCustom'
import InputButtonForm from '../../../../component/InputButtonForm/InputButtonForm'
import InputSelectForm from '../../../../component/InputSelectForm/InputSelectForm'
import utils from '../../../../util/util.js'
import ResidentEdit from './ResidentEdit'
import ResidentInfo from './ResidentInfo'
import HouseInfo from './HouseInfo'
import HouseEdit from './HouseEdit'
import ParkPositionEdit from './ParkPositionEdit'
import ParkPositionInfo from './ParkPositionInfo'
import io from 'socket.io-client';
// import io from '../../../../../node_modules/socket.io/node_modules/socket.io-client/dist/socket.io'
import {
    searchResidentArr,
    validateResidentArr,
    formItemLayout1,
    formItemLayout2,
    formItemLayout3,
} from './residentDatas'
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

import * as actions from '../actions/Resident'
import '../style/Resident.less'
import { util } from 'node-forge';
import {
    WEI_EXPORTUSER
} from '../../../../fetch/apis'

@connect(
    state => state,
    {...actions}
)

class Resident extends Component {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.export = this.export.bind(this)
        this.clear = this.clear.bind(this)
        this.add = this.add.bind(this)
        this.edit = this.edit.bind(this)
        this.delete = this.delete.bind(this)
        this.isShenFenZheng = this.isShenFenZheng.bind(this)
        this.pageOnChange = this.pageOnChange.bind(this)
        this.plusHouse = this.plusHouse.bind(this)
        this.minusHouse = this.minusHouse.bind(this)
        this.editHouse = this.editHouse.bind(this)
        this.editHouseRelation = this.editHouseRelation.bind(this)
        this.plusPark = this.plusPark.bind(this)
        this.minusPark = this.minusPark.bind(this)
        this.editPark = this.editPark.bind(this)
        this.buildChange = this.buildChange.bind(this)
        this.changeTab = this.changeTab.bind(this)
        this.readCard = this.readCard.bind(this)
        this.addNewResident = this.addNewResident.bind(this)
        this.state = {
            modifyVisible: false,
            infoVisible: false,
            activeKey: '1',
            nameLike: false,
            stompClient: null
        }
    }

    changeTab = (activeKey) => {
        this.setState({ activeKey });
    }

    isShenFenZheng = (rule, value, callback) => {
        const form = this.props.form;
        if(value && value.input ) {
            const result = utils.isShenFenZheng(value.input)
            if(!(result.status)) {
                callback(result.msg)
            }
        }
        callback();
    }

    isPhoneNumber = (rule, value, callback) => {
        if(value && value.input) {
            const number = parseInt(value.input || 0, 10);
            if (isNaN(number)) {
                callback('请输入数字');
            }
        }
        callback();
    }

    showModal = (type) => {
        this.setState({
          [type]: true,
        });
    }

    handleOk = (type) => { 
        console.log( type );
        if(this.state.stompClient) {
            this.state.stompClient.disconnect()
        }
        this.setState({ 
            [type]: false,
            activeKey: '1',
            stompClient: null
         }, () => {
            // window.location.reload()
         });
         this.props.changev({
            singleHouseList: [],
            singleParkingLotList: [],
         })
    }

    handleCancel = (type) => {
        if(this.state.stompClient) {
            this.state.stompClient.disconnect()
        }
        this.setState({ 
            [type]: false,
            activeKey: '1',
            stompClient: null
        }, () => {
            // window.location.reload()
        });

        console.log( [type] );
        
    }

    submit = (e) => {
        let _this = this
        e.preventDefault();
        this.props.form.validateFields((error, values) => {
            if (!error) {
                let params = {}
                // 姓名
                if(this.state.nameLike) {
                    params.nameLike = values.name ? values.name : undefined
                } else {
                    params.name = values.name ? values.name : undefined
                }
                // 籍贯
                params.nativePlace = params.nativePlace = values.nativePlace ? values.nativePlace === 'all' ? undefined : values.nativePlace : undefined
                // 性别
                params.gender = values.gender ? values.gender === 'all' ? undefined : values.gender : undefined
                // 身份证
                params.idCard = values.idCard.input ? values.idCard.input : undefined
                // 手机号码
                params.mobile = values.mobile.input ? values.mobile.select + '-' + values.mobile.input : undefined
                // 居民标签
                params.userTypeId = values.userType ? values.userType === 'all' ? undefined : values.userType : undefined
                // 居民类型
                params.flowIsPermanent = values.flowIsPermanent ? values.flowIsPermanent === 'all' ? undefined : values.flowIsPermanent : undefined
                // 楼幢id或者房屋id
                if(values.build === 'all') {} else if(values.layer != 'all' || values.unit != 'all') {
                    params.storiedBuildingId = this.props.Resident.buildJson[values.build].id
                    params.unit = values.unit ? values.unit === 'all' ? undefined : values.unit : undefined
                    params.layer = values.layer ? values.layer === 'all' ? undefined : values.layer : undefined
                    _this.props.getHouseList(params, (housingId) => {
                        params.housingId = housingId
                    })
                } else {
                    // 楼幢id
                    params.storiedBuildingId = values.build ? values.build === 'all' ? undefined :this.props.Resident.buildJson[values.build].id : undefined                    
                }
                this.props.getResidentList(params)
            }
        });
    }

    export = (e) => {
        let _this = this
        e.preventDefault();
        this.props.form.validateFields((error, values) => {
            if (!error) {
                let params = {}
                // 姓名
                if (this.state.nameLike) {
                    params.nameLike = values.name ? values.name : undefined
                } else {
                    params.name = values.name ? values.name : undefined
                }
                // 性别
                params.gender = values.gender ? values.gender === 'all' ? undefined : values.gender : undefined
                // 身份证
                params.idCard = values.idCard.input ? values.idCard.input : undefined
                // 手机号码
                params.mobile = values.mobile.input ? values.mobile.select + '-' + values.mobile.input : undefined
                // 居民标签
                params.userTypeId = values.userType ? values.userType === 'all' ? undefined : values.userType : undefined
                // 居民类型
                params.flowIsPermanent = values.flowIsPermanent ? values.flowIsPermanent === 'all' ? undefined : values.flowIsPermanent : undefined
                // 楼幢id或者房屋id
                if (values.build === 'all') { } else if (values.layer != 'all' || values.unit != 'all') {
                    params.storiedBuildingId = this.props.Resident.buildJson[values.build].id
                    params.unit = values.unit ? values.unit === 'all' ? undefined : values.unit : undefined
                    params.layer = values.layer ? values.layer === 'all' ? undefined : values.layer : undefined
                    _this.props.getHouseList(params, (housingId) => {
                        params.housingId = housingId
                    })
                } else {
                    // 楼幢id
                    params.storiedBuildingId = values.build ? values.build === 'all' ? undefined : this.props.Resident.buildJson[values.build].id : undefined
                }
                this.props.exportUser(params)
            }
        });
    }

    clear() {
        this.props.form.resetFields(searchResidentArr)
    }

    pageOnChange(page) {
        this.props.getResidentList(this.props.Resident.currentParams, page)
    }

    buildChange = (value) => {
        if(value == 'all') {
            this.props.form.setFieldsValue({
                unit: 'all'
            });
            return;
        }
        let unit = this.props.Resident.buildJson[value].unit
        let layer = this.props.Resident.buildJson[value].layer
        let newUnitList = [],
            newlayerList = []
        if(unit > 0) {
            for(let i=0; i<unit; i++){
                let num = i
                num++
                newUnitList.push(num)
            }
        }
        if (layer > 0) {
            for(let i=0; i<layer; i++){
                let num = i
                num++
                newlayerList.push(num)
            }
        }
        this.props.changev({
            unitList: newUnitList,
            layerList: newlayerList
        })
        this.props.form.setFieldsValue({
            unit: 'all',
            layer: 'all'
        });
    }

    modify = (type, data) => {
        let _this = this

        var flowIsPermanent = data.flowIsPermanent;
        if (flowIsPermanent == '网约房租客') {
            this.props.changev({
                addType: 'net'
            })            
        }else{
            this.props.changev({
                addType: 'normal'
            })     
        }

        // 建立连接对象（还未发起连接）
        var socket = new SockJS("http://localhost:8089/websocket");
        //var socket = new SockJS("http://192.168.1.188:8089/websocket");
        // 获取 STOMP 子协议的客户端对象
        var stompClient = Stomp.over(socket);
        // 向服务器发起websocket连接并发送CONNECT帧
        // stompClient.disconnect()
        stompClient.connect(
            {},
            function connectCallback(frame) {
                stompClient.subscribe('/topic/callback', function (response) {
                    if(response.body != "未找到数据") {
                        const res = JSON.parse(response.body)
                        _this.props.form.setFieldsValue({
                            form_personalP: [{
                                uid: -1,
                                name: 'personalPicture.png',
                                status: 'done',
                                url: "data:image/jpeg;base64," + res.takingPicture,
                                thumbUrl: "data:image/jpeg;base64," + res.takingPicture,
                            }],
                            form_idCardP: [{
                                uid: -2,
                                name: 'idCardPicture.png',
                                status: 'done',
                                url: "data:image/jpeg;base64," + res.idCardPicture,
                                thumbUrl: "data:image/jpeg;base64," + res.idCardPicture,
                            }],
                            form_name: res.name,
                            form_gender: res.gender == '男'? 'male' : 'female',
                            form_idCard: {
                                input: res.idCard,
                                button: true
                            },
                            form_address: res.address,
                            form_birthDate: moment(res.birthday.replace(/年|月/g, "-").replace(/日/g, ""))
                        });
                    }
                });
            },
            function errorCallBack(error) {
                // 连接失败时（服务器响应 ERROR 帧）的回调方法
                alert("连接失败");
            }
        );
        this.setState({
            stompClient: stompClient
        })
        this.props.getSingleResidentList({id: data.id}, () => {
            this.showModal(type)
        })
    }

    addNewResident = (props, net) => {
        let _this = this
        this.props.changev({
            residentType: 'add'
        })

        console.log(net)
        if (net) {
            this.props.changev({
                addType: 'net'
            })            
        }else{
            this.props.changev({
                addType: 'normal'
            })     
        }
        this.showModal('modifyVisible')
        // 建立连接对象（还未发起连接）
        var socket = new SockJS("http://localhost:8089/websocket");
        //var socket = new SockJS("http://192.168.1.188:8089/websocket");
        // 获取 STOMP 子协议的客户端对象
        var stompClient = Stomp.over(socket);
        // 向服务器发起websocket连接并发送CONNECT帧
        // stompClient.disconnect()
        stompClient.connect(
            {},
            function connectCallback(frame) {
                stompClient.subscribe('/topic/callback', function (response) {
                    if(response.body != "未找到数据") {
                        const res = JSON.parse(response.body)
                        _this.props.form.setFieldsValue({
                            form_personalP: [{
                                uid: -1,
                                name: 'personalPicture.png',
                                status: 'done',
                                url: "data:image/jpeg;base64," + res.takingPicture,
                                thumbUrl: "data:image/jpeg;base64," + res.takingPicture,
                            }],
                            form_idCardP: [{
                                uid: -2,
                                name: 'idCardPicture.png',
                                status: 'done',
                                url: "data:image/jpeg;base64," + res.idCardPicture,
                                thumbUrl: "data:image/jpeg;base64," + res.idCardPicture,
                            }],
                            form_name: res.name,
                            form_gender: res.gender == '男'? 'male' : 'female',
                            form_idCard: {
                                input: res.idCard,
                                button: true
                            },
                            form_address: res.address,
                            form_birthDate: moment(res.birthday.replace(/年|月/g, "-").replace(/日/g, ""))
                        });
                    }
                });
            },
            function errorCallBack(error) {
                // 连接失败时（服务器响应 ERROR 帧）的回调方法
                alert("连接失败");
            }
        );
        this.setState({
            stompClient: stompClient
        })
    }

    readCard = () => {
        let _this = this
        this.props.changev({
            loading: true
        })
        clearTimeout(resident_time)
        var resident_time = setTimeout(() => {
            _this.props.changev({
                loading: false
            })
            _this.props.getReadCard((data) => {
                _this.props.form.setFieldsValue({
                    form_personalP: [{
                        uid: -1,
                        name: 'personalPicture.png',
                        status: 'done',
                        url: "data:image/jpeg;base64," + data.obj.takingPicture,
                        thumbUrl: "data:image/jpeg;base64," + data.obj.takingPicture,
                    }],
                    form_idCardP: [{
                        uid: -2,
                        name: 'idCardPicture.png',
                        status: 'done',
                        url: "data:image/jpeg;base64," + data.obj.idCardPicture,
                        thumbUrl: "data:image/jpeg;base64," + data.obj.idCardPicture,
                    }],
                    form_name: data.obj.name,
                    form_gender: data.obj.gender == '男'? 'male' : 'female',
                    form_idCard: {
                        input: data.obj.idCard,
                        button: true
                    },
                    form_address: data.obj.address,
                    form_birthDate: moment(data.obj.birthday.replace(/年|月/g, "-").replace(/日/g, ""))
                });
            })
        },5000)
        
    }

    plusHouse = (data, cb) => {
        console.log(data)
        let newSingleHouseList = this.props.Resident.singleHouseList;
        newSingleHouseList.push(data)
        this.props.changev({
            singleHouseList: newSingleHouseList
        })
        if(cb) cb()
    }

    minusHouse = (index, cb) => {
        let newSingleHouseList = this.props.Resident.singleHouseList;
        newSingleHouseList[index].delete = true
        this.props.changev({
            singleHouseList: newSingleHouseList
        })
        if(cb) cb()
    }

    editHouseRelation = (index, value, cb) => {
        let newSingleHouseList = this.props.Resident.singleHouseList;
        newSingleHouseList[index].relation = value
        this.props.changev({
            singleHouseList: newSingleHouseList
        })
        if(cb) cb()
    }

    addLiveEnd = (index, value) => {
        let newSingleHouseList = this.props.Resident.singleHouseList;
        newSingleHouseList[index].liveEnd = value
        this.props.changev({
            singleHouseList: newSingleHouseList
        })
    }


    editHouse = (data, index, cb) => {
        let newSingleHouseList = this.props.Resident.singleHouseList;
        newSingleHouseList[index].delete = true
        this.props.changev({
            singleHouseList: newSingleHouseList
        })
        if(cb) cb()
    }

    plusPark = (data, cb) => {
        let newSingleParkingLotList = this.props.Resident.singleParkingLotList;
        newSingleParkingLotList.push(data)
        this.props.changev({
            singleParkingLotList: newSingleParkingLotList
        })

        console.log(newSingleParkingLotList);
        
        if(cb) cb()
    }

    minusPark = (index, cb) => {
        let newSingleParkingLotList = this.props.Resident.singleParkingLotList;
        newSingleParkingLotList[index].userId = 0
        this.props.changev({
            singleParkingLotList: newSingleParkingLotList
        })
        if(cb) cb()
    }

    editPark = (data, index, cb) => {
        let newSingleParkingLotList = this.props.Resident.singleParkingLotList;
        newSingleParkingLotList.splice(index, 1, data)
        this.props.changev({
            singleParkingLotList: newSingleParkingLotList
        })
        if(cb) cb()
    }

    add = (e) => {
        let _this = this
        e.preventDefault();

        this.props.form.validateFields(validateResidentArr, (error, values) => {
            if (!error) {
                let residentParams = {}
                /*
                 * 居民个人信息
                 */
                // 人员照片
                // 身份证照片
                let personalPicture = '',
                    idCardPicture = '';
                if(values.form_personalP && values.form_personalP[0]) {
                    personalPicture = values.form_personalP[0].thumbUrl
                }
                if(values.form_idCardP && values.form_idCardP[0]) {
                    idCardPicture = values.form_idCardP[0].thumbUrl
                }
                residentParams.personalPicture = personalPicture
                residentParams.idCardPicture = idCardPicture
                // 姓名
                residentParams.name = values.form_name
                // 性别
                residentParams.gender = values.form_gender == 'male' ? '男' : '女'
                // 居民类型
                if (_this.props.Resident.addType == 'net') {
                    residentParams.flowIsPermanent = '网约房租客'
                } else {
                    residentParams.flowIsPermanent = values.form_type
                }
                // 护照号
                residentParams.passport = values.form_passport
                // 身份证号
                residentParams.idCard = values.form_idCard.input
                // 身份证地址
                residentParams.address = values.form_address
                 // 户籍级联
                 if(this.props.Resident.isRequired) {
                     if (values.form_house_address) {
                         residentParams.householdRegistration = values.form_house_address[values.form_house_address.length - 1]
                     } else {
                        residentParams.householdRegistration = null
                     }
                }
                // 户籍详细地址
                if(this.props.Resident.isRequired) {
                    residentParams.householdsAddress = values.form_detail_address
                }
                // 出生日期
                residentParams.birthDate = values.form_birthDate.format('YYYY/MM/DD')
                // 民族/国籍
                if(values.form_racial) {
                    residentParams.racial = values.form_racial
                }
                // 身份证有效期
                if(values.form_idCardDate.datepicker && values.form_idCardDate.datepicker!='') {
                    residentParams.idCardDate = values.form_idCardDate.datepicker.format('YYYY/MM/DD')
                }
                // 手机号
                if(values.form_mobile.input) {
                    residentParams.mobile = values.form_mobile.select + '-' + values.form_mobile.input
                }
                // 政治面貌
                if(values.form_politicsStatus) {
                    residentParams.politicsStatus = values.form_politicsStatus
                }
                // 婚姻状况
                if(values.form_marriage) {
                    residentParams.marriage = values.form_marriage
                }
                // 电子邮箱
                if(values.form_email) {
                    residentParams.email = values.form_email
                }
                // 微信号
                if(values.form_wx) {
                    residentParams.wx = values.form_wx
                }
                // 监护人手机号
                if(values.form_guardianMobile && values.form_guardianMobile.input) {
                    residentParams.guardianMobile = values.form_guardianMobile.select  + '-' + values.form_guardianMobile.input
                }
                // 紧急联系人
                if(values.form_emergencyContact) {
                    residentParams.mergencyContact = values.form_emergencyContact
                }
                // 紧急联系人手机号
                if(values.form_emergencyContactMobile.input) {
                    residentParams.emergencyContactMobile = values.form_emergencyContactMobile.select + '-' + values.form_emergencyContactMobile.input
                }
                // 居民标签
                if(values.form_userType && values.form_userType.length > 0) {
                    residentParams.userType = values.form_userType.length > 0 ? values.form_userType.length == 1 ? values.form_userType[0] : values.form_userType.join(',') : null
                }
                // 备注
                if(values.form_remark) {
                    residentParams.remark = values.form_remark
                }
                // 籍贯
                residentParams.nativePlace = utils.IdCardBGY(values.form_idCard.input, 4)
                /*
                 * 房屋信息 
                 */
                let housingArr = utils.houseLocalToServer(_this.props.Resident.singleHouseList, _this.props.Resident.residentType, _this.props.Resident.addType)
                let isHasOneHouse = false
                let newHousingArr = []
                
                if(housingArr.length < 1) {
                    isHasOneHouse = false
                } else {
                    for(let i = 0; i < housingArr.length; i++) {
                        if(!housingArr[i].delete) {
                            isHasOneHouse = true
                            housingArr[i].delete = null
                            var newItem = {}
                            if (_this.props.Resident.addType == 'net') {
                                newItem = {
                                    housingId: housingArr[i].housingId,
                                    consistent: housingArr[i].consistent,
                                    dwell: housingArr[i].dwell,
                                    relation: housingArr[i].relation,
                                    liveStart: housingArr[i].liveStart,
                                    liveEnd: housingArr[i].liveEnd
                                }          
                            } else {
                                newItem = {
                                    housingId: housingArr[i].housingId,
                                    consistent: housingArr[i].consistent,
                                    dwell: housingArr[i].dwell,
                                    relation: housingArr[i].relation,
                                }
                            }

                            newHousingArr.push(newItem)
                        }
                    }
                }
                if(!isHasOneHouse) {
                    Modal.error({
                        title: '缺少房屋关联',
                        content: '人员必须至少关联一套房屋',
                    });
                    return false;
                }
                residentParams.housing = JSON.stringify(newHousingArr)
                /*
                 * 车位信息
                 */
                residentParams.parkingSpace = JSON.stringify(utils.parkLocalToServer(_this.props.Resident.singleParkingLotList, _this.props.Resident.residentType))
                this.props.residentInsert(residentParams, () => {
                    this.handleOk('modifyVisible')
                    this.props.form.resetFields(validateResidentArr)
                    this.props.getResidentList(this.props.Resident.currentParams)
                })
            }
        });
    }

    delete = (e, value) => {
        let _this = this
        this.props.form.validateFields(validateResidentArr, (error, values) => {
            if (!error) {
                let residentParams = {}
                residentParams.id = this.props.Resident.singleResidentList.id
                this.props.residentDelete(value, () => {
                    this.handleOk('modifyVisible')
                    this.props.form.resetFields(validateResidentArr)
                    this.props.getResidentList(this.props.Resident.currentParams)
                })
            }
        });
    }
    
    edit = (e) => {
        let _this = this
        e.preventDefault();
        this.props.form.validateFields(validateResidentArr, (error, values) => {
            if (!error) {
                let residentParams = {}
                /*
                 * 居民个人信息
                 */
                residentParams.id = this.props.Resident.singleResidentList.id
                // 人员照片
                // 身份证照片
                let personalPicture = '',
                    idCardPicture = '';
                if(values.form_personalP && values.form_personalP[0]) {
                    personalPicture = values.form_personalP[0].thumbUrl
                }
                if(values.form_idCardP && values.form_idCardP[0]) {
                    idCardPicture = values.form_idCardP[0].thumbUrl
                }
                residentParams.personalPicture = personalPicture
                residentParams.idCardPicture = idCardPicture
                // 姓名
                residentParams.name = values.form_name
                // 性别
                residentParams.gender = values.form_gender == 'male' ? '男' : '女'
                // 居民类型
                // residentParams.flowIsPermanent = values.form_type
                // 护照号
                residentParams.passport = values.passport                
                // 身份证号
                residentParams.idCard = values.form_idCard.input
                // 身份证地址
                residentParams.address = values.form_address
                // 户籍级联
                if(this.props.Resident.isRequired) {
                    residentParams.householdRegistration = values.form_house_address[values.form_house_address.length - 1]
                }
                // 户籍详细地址
                if(this.props.Resident.isRequired) {
                    residentParams.householdsAddress = values.form_detail_address
                }
                // 出生日期
                residentParams.birthDate = values.form_birthDate.format('YYYY/MM/DD')
                // 民族/国籍
                if(values.form_racial) {
                    residentParams.racial = values.form_racial
                }
                // 身份证有效期
                if(values.form_idCardDate.datepicker && values.form_idCardDate.datepicker!='') {
                    residentParams.idCardDate = values.form_idCardDate.datepicker.format('YYYY/MM/DD')
                }
                // 手机号
                if(values.form_mobile.input) {
                    residentParams.mobile = values.form_mobile.select + '-' + values.form_mobile.input
                }
                // 政治面貌
                if(values.form_politicsStatus) {
                    residentParams.politicsStatus = values.form_politicsStatus
                }
                // 婚姻状况
                if(values.form_marriage) {
                    residentParams.marriage = values.form_marriage
                }
                // 电子邮箱
                if(values.form_email) {
                    residentParams.email = values.form_email
                }
                // 微信号
                if(values.form_wx) {
                    residentParams.wx = values.form_wx
                }
                // 监护人手机号
                if(values.form_guardianMobile && values.form_guardianMobile.input) {
                    residentParams.guardianMobile = values.form_guardianMobile.select  + '-' + values.form_guardianMobile.input
                }
                // 紧急联系人
                if(values.form_emergencyContact) {
                    residentParams.mergencyContact = values.form_emergencyContact
                }
                // 紧急联系人手机号
                if(values.form_emergencyContactMobile.input) {
                    residentParams.emergencyContactMobile = values.form_emergencyContactMobile.select + '-' + values.form_emergencyContactMobile.input
                }
                // 居民标签
                if(values.form_userType && values.form_userType.length > 0) {
                    residentParams.userType = values.form_userType.length > 0 ? values.form_userType.length == 1 ? values.form_userType[0] : values.form_userType.join(',') : null
                }
                // 备注
                if(values.form_remark) {
                    residentParams.remark = values.form_remark
                }
                // 籍贯
                residentParams.nativePlace = utils.IdCardBGY(values.form_idCard.input, 4)
                /*
                 * 房屋信息 
                 */
                let housingArr = utils.houseLocalToServer(_this.props.Resident.singleHouseList, _this.props.Resident.residentType, _this.props.Resident.addType)
                let isHasOneHouse = false
                let newHousingArr = []
                
                if(housingArr.length < 1) {
                    isHasOneHouse = false
                } else {
                    for(let i = 0; i < housingArr.length; i++) {
                        if(!housingArr[i].delete) {
                            isHasOneHouse = true
                            housingArr[i].delete = null
                        }
                        var newItem = {}
                        if (_this.props.Resident.addType == 'net') {
                            newItem = {
                                housingId: housingArr[i].housingId,
                                consistent: housingArr[i].consistent,
                                dwell: housingArr[i].dwell,
                                id: housingArr[i].id,
                                delete: housingArr[i].delete,
                                userId: housingArr[i].userId,
                                relation: housingArr[i].relation,
                                liveStart: housingArr[i].liveStart,
                                liveEnd: housingArr[i].liveEnd
                            }          
                        } else {
                            newItem = {
                                housingId: housingArr[i].housingId,
                                consistent: housingArr[i].consistent,
                                dwell: housingArr[i].dwell,
                                id: housingArr[i].id,
                                delete: housingArr[i].delete,
                                userId: housingArr[i].userId,
                                relation: housingArr[i].relation,
                            }
                        }
                        newHousingArr.push(newItem)
                    }
                }
                if(!isHasOneHouse) {
                    Modal.error({
                        title: '缺少房屋关联',
                        content: '人员必须至少关联一套房屋',
                    });
                    return false;
                }
                residentParams.housing = JSON.stringify(newHousingArr)
                /*
                 * 车位信息
                 */
                residentParams.parkingSpace = JSON.stringify(utils.parkLocalToServer(_this.props.Resident.singleParkingLotList, _this.props.Resident.residentType))                
                this.props.saveModify(residentParams, () => {
                    this.handleOk('modifyVisible')
                    this.props.form.resetFields(validateResidentArr)
                    this.props.getResidentList(this.props.Resident.currentParams)
                })
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.App.id != this.props.App.id) {
            this.props.form.resetFields()
            this.props.getBuildList()
            this.props.getResidentList()
            this.props.getParkingLotList()
        }
    }

    componentDidMount() {
        this.props.form.resetFields()
        this.props.getBuildList()
        this.props.getResidentList()
        this.props.getParkingLotList()
        this.props.getKeyAndValue()
        this.props.getLkbAddress({
            init: true
        })
    }

    render() {
        var buttonStatus = this.props.Resident.userInfo.buttonStatus
        // var buttonStatus = "1"
        console.log(buttonStatus)
        
        let _this = this
        const { getFieldDecorator } = this.props.form;
        const { modifyVisible, infoVisible } = this.state
        const {
            buildList,
            unitList,
            layerList,
            residentList,
            userTypeList,
            userTypeJson,
            singleResidentList,
            singleHouseList,
            singleParkingLotList,
            singleUserType,
            parkingLotList,
            parkingLotJson,
            total,
            current,
            pageSize,
            buildJson,
            userKey,
            id,
            loading,
            residentType,
            addType,
            casCaderOptions,
            provinceCityArea,
            isRequired,
            isForeign,
            lkbIsWrong
        } = this.props.Resident

        const toChildProps = {
            form: this.props.form,
            singleResidentList,
            singleHouseList,
            singleParkingLotList,
            singleUserType,
            buildList,
            userTypeList,
            userTypeJson,
            buildJson,
            parkingLotList,
            parkingLotJson,
            userKey,
            id,
            residentType,
            addType,
            casCaderOptions,
            provinceCityArea,
            isRequired,
            isForeign,
            lkbIsWrong,
            plusHouse: this.plusHouse,
            minusHouse: this.minusHouse,
            editHouse: this.editHouse,
            editHouseRelation: this.editHouseRelation,
            addLiveEnd: this.addLiveEnd,
            plusPark: this.plusPark,
            minusPark: this.minusPark,
            editPark: this.editPark,
            getLkbAddress: this.props.getLkbAddress,
            readCard: this.readCard,
            changev: this.props.changev
        }
        const columns = [
            {
                title: '序号',
                dataIndex: 'num'
            }, {
                title: '姓名',
                dataIndex: 'name',
                render: (text, record) => {
                    return <a onClick={(type, data) => this.modify('infoVisible', record)}>{text}</a>
                }
            }, {
                title: '所在位置',
                dataIndex: 'address',
            }, {
                title: '身份证号',
                dataIndex: 'idCard',
                render: (text, record) => {
                    return <span>{utils.plusXing(text, 10, 0)}</span>
                }
            }, {
                title: '年龄',
                dataIndex: 'birthDate',
                render: (text, record) => {
                    // utils.howOld(createDate)
                    return <span>{utils.howOld(text)}</span>
                }
            }, {
                title: '性别',
                dataIndex: 'gender',
                render: (text, record) => {
                    return <span>{text == 'male' ? '男' : '女'}</span>
                }
            }, {
                title: '政治面貌',
                dataIndex: 'politicsStatus',
            }, {
                title: '居民类型',
                dataIndex: 'flowIsPermanent',
            }, {
                title: '手机号',
                dataIndex: 'mobile',
                render: (text, record) => {
                    return <span>{text}</span>
                }
            }, {
                title: '籍贯',
                dataIndex: 'nativePlace',
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return (
                        <div>
                            <Button onClick={() => {
                                this.props.changev({
                                    residentType: 'edit',
                                    residentId: record.id
                                })
                                this.modify('modifyVisible', record)
                            }}>修改</Button>&nbsp;
                            <Button type="danger" onClick={() => Modal.confirm({
                                title: '删除',
                                content: '确定要删除此条居民信息吗？',
                                okText: '确认',
                                cancelText: '取消',
                                onOk() { 
                                        _this.props.changev({
                                            residentType: 'delete',
                                            residentId: record.id
                                        })
                                        _this.delete('modifyVisible', record.id)
                                    // return new Promise((resolve, reject) => {
                                    // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                                    // }).catch(() => console.log('Oops errors!'));
                                },
                                onCancel() {},
                            })}>删除</Button>
                        </div>
                    )
                }
            }
        ];
        let buildOptions;
        let unitOptions;
        let layerOptions;
        let userTypeOptions;
        let nativePlaceOptions;
        if (casCaderOptions &&  casCaderOptions.length > 0) {
            nativePlaceOptions = casCaderOptions.map((item) => {
                return <Option key={item.label}>{item.label}</Option>;
            });
        } else {
            nativePlaceOptions = [];
        }
        if (buildList &&  buildList.length > 0) {
            buildOptions = buildList.map((item) => {
                let newName = ''
                let newNameArr = item.name.split('-')
                let newNameArrLength = newNameArr.length
                if( newNameArrLength > 1) {
                    newName = newNameArr[newNameArrLength -1]
                } else {
                    newName = item.name
                }
                return <Option key={item.name}>{newName}</Option>;
            });
        } else {
            buildOptions = [];
        }
        if (unitList &&  unitList.length > 0) {
            unitOptions = unitList.map((item) => {
                return <Option key={item}>{item}</Option>;
            });
        } else {
            unitOptions = [];
        }
        if (layerList && layerList.length > 0) {
            layerOptions = layerList.map((item) => {
                return <Option key={item}>{item}</Option>;
            });
        } else {
            layerOptions = [];
        }
        if (userTypeList && userTypeList.length > 0) {
            userTypeOptions = userTypeList.map((item) => {
                return <Option key={item.id}>{item.name}</Option>;
            });
        } else {
            userTypeOptions = [];
        }
        buildOptions.unshift(<Option key="all">所有</Option>)
        unitOptions.unshift(<Option key="all">所有</Option>)
        layerOptions.unshift(<Option key="all">所有</Option>)
        userTypeOptions.unshift(<Option key="all">所有</Option>)
        nativePlaceOptions.unshift(<Option key="all">所有</Option>)
        nativePlaceOptions.push(<Option key="其他">其他</Option>)
        return (
          <div>
                <BreadCrumbCustom first="基本信息管理" second="居民信息管理"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="居民信息管理">
                                <Form>
                                    {/* 所在位置 和 姓名 */}
                                    <Row>
                                        <Col span={24}>
                                            <Col span={6}>
                                                <FormItem 
                                                    label={'所在位置:'}
                                                    {...formItemLayout1}
                                                >
                                                    {getFieldDecorator(`build`, {
                                                        initialValue: 'all',
                                                    })(
                                                        <Select
                                                            style={{ width: '100%' }} 
                                                            onChange={this.buildChange}>
                                                            {buildOptions}
                                                        </Select>
                                                    )}
                                                </FormItem> 
                                            </Col>
                                            <Col span={1} className="build-btns">
                                                <span className="house-unit">幢</span>
                                            </Col>
                                            <Col span={3}>
                                                <FormItem 
                                                    {...formItemLayout2}
                                                >
                                                    {getFieldDecorator(`unit`, {
                                                        initialValue: 'all',
                                                    })(
                                                        <Select
                                                            showSearch
                                                            style={{ width: '100%' }} >
                                                            {unitOptions}
                                                        </Select>
                                                    )}
                                                </FormItem> 
                                            </Col>
                                            <Col span={1} className="build-btns">
                                                <span className="house-unit">单元</span>
                                            </Col>
                                            <Col span={3}>
                                                <FormItem 
                                                    {...formItemLayout2}
                                                >
                                                    {getFieldDecorator(`layer`, {
                                                        initialValue: 'all',
                                                    })(
                                                        <Select
                                                            showSearch
                                                            style={{ width: '100%' }} >
                                                            {layerOptions}
                                                        </Select>
                                                    )}
                                                </FormItem> 
                                            </Col>
                                            <Col span={1} className="build-btns">
                                                <span className="house-unit">层</span>
                                            </Col>
                                        </Col> 
                                    </Row>
                                    {/* 姓名 和 性别 */}
                                    <Row>
                                        <Col span={24}>
                                            <Col span={6}>
                                                <FormItem 
                                                    label={'姓名:'}
                                                    {...formItemLayout1}
                                                >
                                                    {getFieldDecorator(`name`)(
                                                        <Input placeholder="请输入姓名"/>   
                                                    )}
                                                </FormItem> 
                                            </Col>
                                            <Col span={1} className="build-btns"></Col>
                                            <Col span={2} className="build-btns">
                                                <Switch 
                                                    checkedChildren="标准" 
                                                    unCheckedChildren="模糊" 
                                                    defaultChecked 
                                                    onChange={(value) => {
                                                        this.setState({
                                                            nameLike: !value
                                                        })
                                                    }}  
                                                />
                                            </Col>
                                            <Col span={6}>
                                                <FormItem 
                                                    label={'性别:'}
                                                    {...formItemLayout1}
                                                >
                                                    {getFieldDecorator(`gender`, {
                                                        initialValue: 'all',
                                                    })(
                                                        <Select
                                                            showSearch
                                                            style={{ width: '100%' }} >
                                                            <Option key="all">所有</Option>
                                                            <Option key="male">男</Option>
                                                            <Option key="female">女</Option>
                                                        </Select>
                                                    )}
                                                </FormItem> 
                                            </Col>
                                        </Col> 
                                    </Row>
                                    {/* 身份证号 和 手机号 */}
                                    <Row>
                                        <Col span={24}>
                                            <Col span={9}>
                                                <FormItem 
                                                    label="身份证号:"
                                                    {...formItemLayout3}
                                                >
                                                    {getFieldDecorator('idCard', {
                                                        initialValue: {
                                                            input: '',
                                                            button: false
                                                        },
                                                        rules: [{ validator: this.isShenFenZheng }],
                                                    })(
                                                        <InputButtonForm placeholder="请输入身份证号"/>
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col span={9}>
                                                <FormItem 
                                                    label={'手机号:'}
                                                    {...formItemLayout3}
                                                >
                                                    {getFieldDecorator(`mobile`, {
                                                        initialValue: {
                                                            input: '',
                                                            select: '+86'
                                                        },
                                                        rules: [{
                                                            validator: this.isPhoneNumber
                                                        }]
                                                    })(
                                                        <InputSelectForm />
                                                    )}
                                                </FormItem> 
                                            </Col>
                                        </Col> 
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Col span={9}>
                                                <FormItem 
                                                    label={'门禁卡号:'}
                                                    {...formItemLayout3}
                                                >
                                                    {getFieldDecorator(`mjkh`, {
                                                        initialValue: {
                                                            input: '',
                                                            button: false
                                                        },
                                                    })(
                                                        <InputButtonForm placeholder="请输入门禁卡号"/> 
                                                    )}
                                                </FormItem> 
                                            </Col>
                                            
                                            <Col span={6}>
                                                <FormItem 
                                                    label={'居民标签:'}
                                                    {...formItemLayout1}
                                                >
                                                    {getFieldDecorator(`userType`, {
                                                        initialValue: 'all',
                                                    })(
                                                        <Select
                                                            style={{ width: '100%' }} >
                                                            {userTypeOptions}
                                                        </Select>  
                                                    )}
                                                </FormItem> 
                                            </Col>
                                        </Col> 
                                    </Row>
                                    <Row>
                                        <Col span={24}>

                                            <Col span={9}>
                                                <FormItem 
                                                    label={'居民类型:'}
                                                    {...formItemLayout3}
                                                >
                                                    {getFieldDecorator(`flowIsPermanent`, {
                                                        initialValue: 'all',
                                                    })(
                                                        <Select
                                                            showSearch
                                                            style={{ width: '100%' }} >
                                                            <Option key="all">所有</Option>
                                                            <Option key="常住人员">常住人员</Option>
                                                            <Option key="人户分离">人户分离</Option>
                                                            <Option key="流动人员">流动人员</Option>
                                                            <Option key="境外人员">境外人员</Option>
                                                            <Option key="退租人员">退租人员</Option>
                                                            <Option key="未知">未知</Option>
                                                        </Select>
                                                    )}
                                                </FormItem> 
                                            </Col>
                                            <Col span={6}>
                                                <FormItem 
                                                    label={'籍贯:'}
                                                    {...formItemLayout1}
                                                >
                                                    {getFieldDecorator(`nativePlace`, {
                                                        initialValue: 'all',
                                                    })(
                                                        <Select
                                                            style={{ width: '100%' }} >
                                                            {nativePlaceOptions}
                                                        </Select>  
                                                    )}
                                                </FormItem> 
                                            </Col>
                                            <Col span={1} className="build-btns"></Col>
                                            
                                        </Col> 
                                    </Row>
                                    <Row type="flex" justify="space-around">
                                        <Col span={8} className="resident-btns-left">
                                            <Col span={3} className="build-btns">
                                                <Button type="primary" style={{width: 120}} onClick={this.submit}>查询</Button>
                                            </Col>
                                            <Col span={3} className="build-btns">
                                                <Button style={{width: 120}} onClick={this.clear}>清空条件</Button>
                                            </Col>
                                        </Col>
                                        <Col span={12} className="resident-btns-right">
                                            {buttonStatus=='0'||buttonStatus=='2' ? 
                                                <Col span={2} className="build-btns">
                                                    <Button style={{width: 100}} onClick={this.addNewResident}>新增居民</Button>
                                                </Col>                                            
                                            : ''}
                                            {buttonStatus=='1'||buttonStatus=='2' ? 
                                                <Col span={4} className="build-btns">
                                                    <Button style={{width: 200}} onClick={this.addNewResident.bind(this,'net')}>新增临时住户（网约房）</Button>
                                                </Col>                                                           
                                            : ''}
                                            <Col span={2} className="build-btns">
                                                <Button style={{width: 100}} disabled onClick={this.clear}>导入</Button>
                                            </Col>
                                            <Col span={2} className="build-btns">
                                                <Button style={{width: 100}} disabled onClick={this.export}>导出</Button>
                                            </Col>
                                            {/* <Col span={2} className="build-btns">
                                                <Button style={{width: 100}} disabled onClick={this.clear}>全部导出</Button>
                                            </Col>
                                            <Col span={2} className="build-btns">
                                                <Button style={{width: 100}} disabled onClick={this.clear}>批量授权</Button>
                                            </Col>
                                            <Col span={2} className="build-btns">
                                                <Button style={{width: 100}} disabled onClick={this.clear}>全部授权</Button>
                                            </Col> */}
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </div>  
                    </Col>
                </Row> 
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Spin spinning={loading}>
                                <Card>
                                    <Table columns={columns} dataSource={residentList} pagination={false}/>
                                    <div className="pagination">
                                        <Pagination 
                                            current={current}
                                            onChange={this.pageOnChange} 
                                            pageSize={pageSize} 
                                            showTotal={total => `共 ${total} 条`}
                                            total={total} />
                                    </div>
                                </Card>
                            </Spin>
                        </div>
                    </Col>
                </Row>
                <Modal
                    destroyOnClose
                    visible={modifyVisible}
                    title={`${residentType == 'add' ? '新增' : '修改' }${addType == 'net' ? '网约房' : '' }居民信息`}
                    width='75%'
                    onOk={residentType == 'add' ? this.add : this.edit}
                    onCancel={(type) => {
                        _this.props.form.resetFields(validateResidentArr)
                        _this.props.changev({
                            singleResidentList: {},
                            singleHouseList: [],
                            singleParkingLotList: [],
                        })
                        _this.handleCancel('modifyVisible')
                    }}
                    footer={[
                        <Button key="back" onClick={(type) => {
                            _this.props.form.resetFields(validateResidentArr)
                            _this.props.changev({
                                singleResidentList: {},
                                singleHouseList: [],
                                singleParkingLotList: [],
                            })
                            this.handleCancel('modifyVisible')
                        }}>取消</Button>,
                        <Button type="primary" disabled={singleResidentList.flowIsPermanent == '流动人员'?lkbIsWrong?true:false:false} onClick={residentType == 'add' ? this.add : this.edit}>
                            {`${residentType == 'add' ? '保存' : '保存修改' }`}
                        </Button>
                    ]}
                >
                    <Spin spinning={loading}>
                        <Tabs 
                            type="card" 
                            activeKey={this.state.activeKey} 
                            onChange={this.changeTab}
                        >
                            <TabPane tab="人员基本信息" key="1">
                                {this.props.form?<ResidentEdit {...toChildProps} />:null}
                            </TabPane>
                            <TabPane tab="房屋信息" key="2">
                                {this.props.form?<HouseEdit {...toChildProps} />:null}
                            </TabPane>
                            <TabPane tab="车位信息" key="3">
                                {this.props.form?<ParkPositionEdit {...toChildProps} />:null}
                            </TabPane>
                        </Tabs>
                    </Spin>
                </Modal>
                
                <Modal
                    visible={infoVisible}
                    title="居民信息"
                    width='75%'
                    onOk={(type) => {
                        _this.props.form.resetFields(validateResidentArr)
                        _this.props.changev({
                            singleResidentList: {}
                        })
                        _this.handleOk('infoVisible')
                    }}
                    onCancel={(type) => {
                        _this.props.form.resetFields(validateResidentArr)
                        _this.props.changev({
                            singleResidentList: {}
                        })
                        this.handleCancel('infoVisible')
                    }}
                    footer={null}
                >
                    <Spin spinning={loading}>
                        <Tabs 
                            type="card"
                            activeKey={this.state.activeKey} 
                            onChange={this.changeTab}
                        >
                            <TabPane tab="人员基本信息" key="1">
                                <ResidentInfo {...toChildProps} />
                            </TabPane>
                            <TabPane tab="房屋信息" key="2">
                                <HouseInfo {...toChildProps} />
                            </TabPane>
                            <TabPane tab="车位信息" key="3">
                                <ParkPositionInfo {...toChildProps} />
                            </TabPane>
                        </Tabs>
                    </Spin>
                </Modal>
          </div>
        );
    }
}
export default Form.create()(Resident);