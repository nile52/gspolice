/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions/Monitor'
import $ from 'jquery'
import {
  Row,
  Col,
  Spin,
  Collapse,
  Select,
  Modal,
  Form,
  Button, 
  Upload, 
  DatePicker,
  Icon, 
  Input,
} from 'antd'
import '../style/Monitor.less'
import TopCascaderModal from '../../component/TopCascaderModal/TopCascaderModal'
import cardicon1 from '../../../../static/images/gawing/gs_icon_01(2).png'
import cardicon2 from '../../../../static/images/gawing/gs_icon_02(2).png'
import cardicon3 from '../../../../static/images/gawing/gs_icon_03(2).png'
import cardicon4 from '../../../../static/images/gawing/gs_icon_04(2).png'
import '../../../../static/css/animate.css'
import '../../../../static/css/tooltip-line.css';
import utils from '../../../../util/util';
import SearchBox from '../../component/SearchBox/SearchBox';
import TopButtons from '../../component/TopButtons/TopButtons';
import TopCascader from "../../component/TopCascader/TopCascader";
import { Iterable } from 'immutable';
import axios from 'axios'
import {
  WEI_UPLOAD
} from '../../../../fetch/apis'

import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


const Option = Select.Option
const Panel = Collapse.Panel;
const FormItem = Form.Item;


var dahuaData = "{\"code\":0,\"msg\":\"操作成功\",\"value\":{},\"data\":{\"currentPage\":1,\"pageSize\":20,\"totalCount\":0,\"totalPage\":0,\"orderBy\":\"ALARM_DATE DESC\",\"startPosition\":1,\"endPosition\":20,\"countType\":\"sync\",\"queryType\":\"query\",\"dataList\":[{\"currentPage\":0,\"pageSize\":0,\"totalCount\":0,\"totalPage\":0,\"orderBy\":null,\"startPosition\":0,\"endPosition\":0,\"countType\":null,\"queryType\":null,\"dataList\":null,\"page\":false,\"id\":791,\"idNumber\":\"41152819820807375X\",\"capDate\":1544620097000,\"localeName\":\"音悦汇娱乐有限公司\",\"localeCode\":\"240537$1$0$0\",\"surveyId\":0,\"facerecordId\":5535437,\"alarmDate\":1544620380000,\"surveyType\":null,\"surveyStyle\":1,\"status\":1,\"faceImgUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzMwLzIwMTgvMTIvMTIvMjEvU21hbGxQaWMvMjAxODEyMTIyMTA4MTc3MjYyODc0LmpwZw==\",\"imgUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzMwLzIwMTgvMTIvMTIvMjEvQmlnUGljLzIwMTgxMjEyMjEwODE3NTU5NDgzMzQ4MjIuanBn\",\"localeCodeArr\":null,\"name\":\"张生显\",\"sex\":1,\"ethnicity\":null,\"province\":\"41\",\"city\":\"15\",\"birthday\":\"19820807\",\"age\":null,\"startDateStr\":null,\"endDateStr\":null,\"localeCodes\":null,\"alarmRules\":null,\"alarmRulesArr\":null,\"statusStr\":\"未确认\",\"capDateStr\":\"2018-12-12 21:08:17\",\"alarmDateStr\":\"2018-12-12 21:13:00\",\"surveyTypeStr\":null,\"confidence\":91,\"imageUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzMwLzIwMTgvMTIvMTIvMjEvQmlnUGljLzIwMTgxMjEyMjEwODE3NTU5NDgzMzQ4MjIuanBn\",\"faceImageIdStr\":\"1765024026339411439\",\"matchImgUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QE1DMEpyZld5amdBNzI3ODYwL3BpY3R1cmVzLzEwMDA2NS85MGJhYjdlNi1kNTMxLTQ1ODAtOWE4NC1jMDU0OTdhMGI5Y2YuanBn\",\"targetLib\":\"前科涉赌\",\"sexStr\":\"男\",\"birthdayStr\":null,\"ethnicityStr\":null,\"provinceStr\":\"河南\",\"cityStr\":\"信阳\",\"userId\":null,\"reason\":null,\"lat\":\"null\",\"lng\":\"null\",\"faceAlarmId\":null,\"accept\":null,\"acceptStr\":null,\"fbCreateDate\":null,\"fbStr\":null,\"effectBtnClass\":null,\"invalidBtnClass\":null,\"hanldeBtnClass\":null,\"accepter\":null,\"feedBack\":null,\"level\":1,\"accepte\":\"已签收\",\"startedId\":null,\"devchnIds\":null,\"devChnIds\":null,\"ageBegin\":null,\"ageEnd\":null,\"faceLibIds\":[],\"surveyTypeArr\":null,\"statusArr\":null,\"fringe\":null,\"glasses\":null,\"uygur\":null,\"fringeStr\":null,\"glassesStr\":null,\"uygurStr\":null,\"flag\":null,\"hitTargetLib\":null,\"isPager\":null,\"syncMode\":true}],\"page\":false,\"id\":null,\"idNumber\":\"41152819820807375X\",\"capDate\":null,\"localeName\":null,\"localeCode\":null,\"surveyId\":null,\"facerecordId\":null,\"alarmDate\":null,\"surveyType\":null,\"surveyStyle\":null,\"status\":null,\"faceImgUrl\":null,\"imgUrl\":null,\"localeCodeArr\":null,\"name\":null,\"sex\":null,\"ethnicity\":null,\"province\":null,\"city\":null,\"birthday\":null,\"age\":null,\"startDateStr\":null,\"endDateStr\":null,\"localeCodes\":null,\"alarmRules\":null,\"alarmRulesArr\":null,\"statusStr\":null,\"capDateStr\":null,\"alarmDateStr\":null,\"surveyTypeStr\":null,\"confidence\":null,\"imageUrl\":null,\"faceImageIdStr\":null,\"matchImgUrl\":null,\"targetLib\":null,\"sexStr\":null,\"birthdayStr\":null,\"ethnicityStr\":null,\"provinceStr\":null,\"cityStr\":null,\"userId\":null,\"reason\":null,\"lat\":null,\"lng\":null,\"faceAlarmId\":null,\"accept\":null,\"acceptStr\":null,\"fbCreateDate\":null,\"fbStr\":null,\"effectBtnClass\":null,\"invalidBtnClass\":null,\"hanldeBtnClass\":null,\"accepter\":null,\"feedBack\":null,\"level\":0,\"accepte\":null,\"startedId\":5535437,\"devchnIds\":null,\"devChnIds\":null,\"ageBegin\":null,\"ageEnd\":null,\"faceLibIds\":[],\"surveyTypeArr\":null,\"statusArr\":null,\"fringe\":null,\"glasses\":null,\"uygur\":null,\"fringeStr\":null,\"glassesStr\":null,\"uygurStr\":null,\"flag\":null,\"hitTargetLib\":null,\"isPager\":null,\"syncMode\":true},\"ok\":true}";

var dahuaDataJson = JSON.parse(dahuaData)
console.log(dahuaDataJson);


const validatePeopleArr = [
  'people_pictureUrl',
  'people_realName',
  'people_idCard',
  'people_policeName',
  'people_distributionStart',
  'people_distributionEnd',
  'people_distributionCompany',
  'people_remark',
]

const validateDoorArr = [
  'door_pictureUrl',
  'door_realName',
  'door_idCard',
  'door_doorCard',
  'door_policeName',
  'door_distributionStart',
  'door_distributionEnd',
  'door_distributionCompany',
  'door_remark',
]

const validateMacArr = [
  'mac_macCode',
  'mac_policeName',
  'mac_distributionStart',
  'mac_distributionEnd',
  'mac_distributionCompany',
  'mac_remark',
]

const validateCarArr = [
  'car_pictureUrl',
  'car_licensePlate',
  'car_policeName',
  'car_distributionStart',
  'car_distributionEnd',
  'car_distributionCompany',
  'car_remark',
]



@connect(
    state => state,
    {...actions}
)

class Monitor extends Component {
  constructor(props) {
    super(props)
    this.selectToggle = this.selectToggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleRemark = this.toggleRemark.bind(this)
    this.state = {
      map: null,
      time: null,
      pieHeight: 0,
      barHeight: 0,
      isHalf1: true,
      isHalf2: true,
      isHalf3: true,
      isHalf4: true,
      btnsVisiable: false,
      selectVisiable: 'select_unvisiable',
      markerVisible: false,
      faceVisible: false,
      previewVisible: false,
      previewImage: '',
      fileList: [],
      cascaderLabel: localStorage.getItem('label') ? localStorage.getItem('label') : '拱墅区'
    }
  }

  // 拿到TopCascaderModalContent组件级联选择的数据
  confirmCascaderChange = (value) => {
    this.props.changev({
      levelValue: value.levelValue,
      level: value.level,
      levelId: value.levelId,
    })
    localStorage.setItem('levelValue', value.levelValue)
    localStorage.setItem('level', value.level)
    localStorage.setItem('levelId', value.levelId)
    localStorage.setItem('label', value.label)
    this.setState({
      cascaderLabel: value.label
    })
    this.allPost()
  }  

  handleSubmit = (type, e) => {
    e.preventDefault();
    var arr 

    switch (type) {
      case 'people':
        arr = validatePeopleArr
        break;
      case 'door':
        arr = validateDoorArr
        break;
      case 'mac':
        arr = validateMacArr
        break;
      case 'car':
        arr = validateCarArr
        break;
      default:
        break;
    }

    this.props.form.validateFields(arr, (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var addJson
        switch (type) {
          case 'people':
            addJson = {
              'type': 1,
              'label': '逃犯',
              'pictureUrl': values.people_pictureUrl["0"].response.url,
              'realName': values.people_realName,
              'idCard': values.people_idCard,
              'policeName': values.people_policeName,
              'distributionStart': values.people_distributionStart.format('YYYY-MM-DD'),
              'distributionEnd': values.people_distributionEnd.format('YYYY-MM-DD'),
              'distributionCompany': values.people_distributionCompany,
              'remark': values.people_remark,
            }
            break;
          case 'door':
            addJson = {
              'type': 2,
              'label': '重点人',
              'pictureUrl': values.door_pictureUrl["0"].response.url,
              'realName': values.door_realName,
              'doorCard': values.door_doorCard,
              'idCard': values.door_idCard,
              'policeName': values.door_policeName,
              'distributionStart': values.door_distributionStart.format('YYYY-MM-DD'),
              'distributionEnd': values.door_distributionEnd.format('YYYY-MM-DD'),
              'distributionCompany': values.door_distributionCompany,
              'remark': values.door_remark,
            }
            break;
          case 'mac':
            addJson = {
              'type': 3,
              'label': '嫌疑电子设备',
              'macCard': values.mac_macCard,
              'policeName': values.mac_policeName,
              'distributionStart': values.mac_distributionStart.format('YYYY-MM-DD'),
              'distributionEnd': values.mac_distributionEnd.format('YYYY-MM-DD'),
              'distributionCompany': values.mac_distributionCompany,
              'remark': values.mac_remark,
            }
            break;
          case 'car':
            addJson = {
              'type': 4,
              'label': '嫌疑车辆',
              'licensePlate': values.car_macCard,
              'policeName': values.car_policeName,
              'distributionStart': values.car_distributionStart.format('YYYY-MM-DD'),
              'distributionEnd': values.car_distributionEnd.format('YYYY-MM-DD'),
              'distributionCompany': values.car_distributionCompany,
              'remark': values.car_remark,
            }
            break;
          default:
            break;
        }
        this.props.distributionInsert(addJson)
      }
    });
  }


  customRequest = (option) => {
    console.log(option)
    var formData = new FormData();
    // HTML 文件类型input，由用户选择
    formData.append("file", option.file);
    console.log(formData)
    var request = new XMLHttpRequest();
    request.open("POST", "http://admin.zjqrkj.cn/sys/oss/upload");
    request.send(formData);
    // this.props.uplLoad(formData)

    request.onreadystatechange=function(){
      if (request.readyState==4 && request.status==200){
        var response = JSON.parse(request.response)
        var pic = response.url
        console.log(pic)
      }
    }
    


  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  toggleRemark = (e) => {
    var dom = $(e.target);
    var ontherBlock = $('.ext_block');
    var ontherBtn = $('.ant-col-12 .btn-open');
    var silbingsBlock = dom.parent().siblings('.ext_block');
    var display = silbingsBlock[0].style.display
    if (display == "block") {
      silbingsBlock.css('display', 'none')
      dom.removeClass('btn-open')
    } else {
      ontherBlock.css('display', 'none')
      silbingsBlock.css('display', 'block')
      ontherBtn.removeClass('btn-open')
      dom.addClass('btn-open')
    }
  }

  selectToggle = () => {
    var select_visiable = this.state.selectVisiable
    if(select_visiable == 'select_unvisiable'){
      this.setState({
        selectVisiable: 'select_visiable',
      })
    } else {
      this.setState({
        selectVisiable: 'select_unvisiable',
      })
    }
  }

  allPost = () => {
    this.props.distributionTotal()
    this.props.distributionData();
    this.props.distributionResult();
  }

  componentWillMount() {
    this.props.getLevel();
    this.allPost()
  }

  componentDidMount() {
    let _this = this
    let screenH = document.documentElement.clientHeight
    let mainDom = document.getElementsByClassName("data_info_item")
    mainDom[0].style.height = screenH/12 + 'rem'
    mainDom[1].style.height = screenH / 12 + 'rem'
    mainDom[2].style.height = screenH/12 + 'rem'
    
    window.onresize = function() {
      let screenH = document.documentElement.clientHeight
      let mainDom = document.getElementsByClassName("data_info_item")
      mainDom[0].style.height = screenH/12 + 'rem'
      mainDom[1].style.height = screenH / 12 + 'rem'
      mainDom[2].style.height = screenH/12 + 'rem'
    }
  }
  
  render() {
    const {
      cascaderLabel,
    } = this.state
    const {
      diLoading,
      distributionTotal,
      distributionData,
      distributionResult,
      level,
    } = this.props.GSMonitor


    let newData = []

    if (distributionResult) {
      distributionResult.forEach((item, index) => {
        newData.push(item)
        if(item.dahuaData) {
          newData[index].dahuaDataJson = JSON.parse(item.dahuaData)
        } else {
          newData[index].dahuaDataJson = []
        }
      })      
    }




    // const toCascaderProps = {
    //   userKey: this.props.GSCar.userKey,
    //   changev: this.props.changev,
    //   allPost: this.allPost,
    //   changeOnSelect: true
    // }

    let toCascaderProps = null
    if (level) {
      toCascaderProps = {
        confirmCascaderChange: this.confirmCascaderChange,
        changeOnSelect: true,
        level: level,
        label: cascaderLabel,
      }      
    }

    const toTopButtonsProps = {
      userKey: this.props.GSCar.userKey,
    }

    const toSearchBoxProps = {
      placeholder: '身份证号',
      from1: 'idCard',
      handleSubmit: this.handleSubmit,
    }


    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const cardTitle1 = <p><img src={cardicon4}></img> 人脸布控</p>
    const cardTitle2 = <p><img src={cardicon3}></img> 门禁布控</p>
    const cardTitle3 = <p><img src={cardicon1}></img> MAC布控</p>
    const cardTitle4 = <p><img src={cardicon2}></img> 车辆布控</p>

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const { previewVisible, previewImage, fileList } = this.state;

    return (
      <Spin size="large" spinning={diLoading}>
        <div className="animated slideInLeft">
          <Row>
            <TopButtons {...toTopButtonsProps} />
            
            <Col span={6} className="data_info_item data_info_right">
              <div className="data_info_right_item data_info_right_4">
                <div className="left_data_title">
                  <p>布控结果</p>
                </div>
                <SearchBox {...toSearchBoxProps} />

                <div className="card_container">


                  {/* distributionControl */}
                  {/* communityId: null
                  createDate: "2018-11-27 02:13:40"
                  createDateString: null
                  createName: "string"
                  dahuaData: null
                  delete: false
                  distributionCompany: "上塘派出所"
                  distributionEnd: "2018-11-27"
                  distributionStart: "2018-11-27"
                  districtId: null
                  doorCard: null
                  fieldLimit: "*"
                  fields: null
                  id: 1
                  idCard: "330822199211170931"
                  isEmphasis: null
                  label: "逃犯"
                  licensePlate: null
                  limit: 20
                  macCode: null
                  modifyDate: "2018-12-11 15:48:33"
                  modifyDateString: null
                  modifyName: "string"
                  pages: null
                  pictureUrl: "http://file.zjqrkj.cn/group1/M00/35/3A/rBM-TlwPa4yAXZyhAAYHhXfwcJ0357.jpg"
                  policeName: "aaa"
                  realName: "测试人员"
                  remark: "abc"
                  rowver: "201812061713"
                  rule: null
                  state: 0
                  streetId: null
                  userKey: null
                  zoneId: 3 */}

                  {newData?newData.map((item, index)=>{
                    return(
                      <div key={index} className="card_block monitor_card_1">
                        <h3 className="mac_card_1_title">布控原因：{item.label}</h3>
                        <div className="mac_card_1_info clearfix">
                          <div className="mac_card_1_info_left fl">
                            <img src={item.pictureUrl} />
                          </div>   
                          <div className="mac_card_1_info_right fr">
                            <Row>
                              <Col span={24} >
                                <p>姓名：{item.realName}</p>
                                <p>籍贯: {item.nativePlace ? item.nativePlace : '未知'}</p>
                                <p>身份证：{item.idCard}</p>
                              </Col>
                              <Col span={24} >
                                <p>民警姓名：{item.policeName}</p>
                                <p>布控单位：{item.distributionCompany}</p>
                                <p>布控时间：{item.distributionStart+ " - "+ item.distributionEnd}</p>
                                <p>比中时间：{item.dahuaDataJson&&item.dahuaDataJson.data&&item.dahuaDataJson.data.dataList&&item.dahuaDataJson.data.dataList[0] ? utils.timeToHMS(item.dahuaDataJson.data.dataList[0].alarmDate) : '未知'}</p>
                                <p>比中地点：{item.dahuaDataJson&&item.dahuaDataJson.data&&item.dahuaDataJson.data.dataList&&item.dahuaDataJson.data.dataList[0] ? item.dahuaDataJson.data.dataList[0].localeName : '未知'}</p>
                              </Col>
                            </Row>
                          </div>   
                        </div>
                      </div>
                    )}) : <div className="nodata">暂无数据</div>
                  }
                </div>
              </div>
            </Col>

            <Col span={12} className="data_info_item data_info_right">
              <div className="data_info_right_item data_info_right_3">
                <Row gutter={8}>
                  <Col span={12} >
                    <div className="middle_data_title">
                      <p>布控列表</p>
                    </div>              
                  </Col>
                  <Col span={12} style={{marginTop: "15px"}}>
                    <SearchBox {...toSearchBoxProps} />
                  </Col>
                </Row>

                <div className="card_container">
                  <Row gutter={8}>

                    { distributionData ? distributionData.map((item, index) => {
                      var card_type;
                      var content;
                      switch (item.label) {
                        case '逃犯':
                          card_type = 'card_people'
                          content =  <div className="mac_card_2_info clearfix">
                                      <div className="mac_card_2_info_left fl">
                                        <img src={item.pictureUrl} />
                                      </div>
                                      <div className="mac_card_2_info_right fr">
                                        <p>姓名：{item.realName}</p>
                                        <p>籍贯：{item.realName}</p>
                                        <p>身份证：{item.idCard}</p>
                                        <p>民警姓名：{item.policeName}</p>
                                        <p>布控单位：{item.distributionCompany}</p>
                                        <p>布控时间：{item.distributionStart} - {item.distributionEnd}</p>
                                      </div>
                                    </div>
                          break;
                        case '重点人':
                          card_type = 'card_people'
                          content = <div className="mac_card_2_info clearfix">
                                      <div className="mac_card_2_info_left fl">
                                        <img src={item.pictureUrl} />
                                      </div>
                                      <div className="mac_card_2_info_right fr">
                                        <p>姓名：{item.realName}</p>
                                        <p>身份证：{item.idCard}</p>
                                        <p>门禁卡ID：{item.realName}</p>
                                        <p>民警姓名：{item.policeName}</p>
                                        <p>布控单位：{item.distributionCompany}</p>
                                        <p>布控时间：{item.distributionStart} - {item.distributionEnd}</p>
                                      </div>
                                    </div>
                          break;
                        case '嫌疑电子设备':
                          card_type = 'card_mac'
                          content = <div className="mac_card_2_info clearfix">
                                      <p>MAC：浙江启融</p>
                                      <p>最近位置采集：浙江启融</p>
                                      <p>民警姓名：{item.policeName}</p>
                                      <p>布控单位：{item.distributionCompany}</p>
                                      <p>布控时间：{item.distributionStart} - {item.distributionEnd}</p>
                                    </div>
                          break;
                        case '嫌疑车辆':
                          card_type = 'card_car'
                          content = <div className="mac_card_2_info clearfix">
                                      <div className="mac_card_2_info_left fl">
                                        <img src={item.pictureUrl} />
                                      </div>
                                      <div className="mac_card_2_info_right fr">
                                        <p>车辆品牌：浙江启融</p>
                                        <p>车身颜色：浙江启融</p>
                                        <p>车牌号：浙江启融</p>
                                        <p>民警姓名：{item.policeName}</p>
                                        <p>布控单位：{item.distributionCompany}</p>
                                        <p>布控时间：{item.distributionStart} - {item.distributionEnd}</p>
                                      </div>
                                    </div>
                          break;
                        default:
                          break;
                      }
                      return(
                        <Col key={index} span={12} >
                          <div className={"card_block monitor_card_2 " + card_type}>
                            <h3 className="mac_card_2_title">布控原因：{item.label}</h3>
                            {content}
                            <div className="ext_btn" onClick={this.toggleRemark.bind(this)}></div>
                          </div>   
                          <div className="ext_block">备注信息：{item.remark}</div>
                        </Col>
                      )
                    }) : '' }
                  </Row>    
                </div>

              </div>
            </Col>

            <Col span={6}  className="data_info_item data_info_right">
              <div className="data_info_right_item data_info_right_1">
                <div className="top_data_title1">
                  <div className="select_block">
                    {/* <TopCascader {...toCascaderProps}/> */}
                    {toCascaderProps ? <TopCascaderModal {...toCascaderProps} /> : '' }
                  </div>
                </div>

                <Row gutter={16}>
                  <Col span={8} >
                          <div className="face_top_block">
                              {/* <img src={top_icon1}/> */}
                              <div className="img_block img_block1"></div>
                              <p className="face_top_label">布控人数</p>
                              <p className="face_top_value">{distributionTotal?distributionTotal.total:'0'}</p>
                          </div>
                  </Col>
                  <Col span={8} >
                          <div className="face_top_block">
                              {/* <img src={top_icon2}/> */}
                              <div className="img_block img_block2"></div>
                              <p className="face_top_label">未抓捕</p>
                              <p className="face_top_value">{distributionTotal?distributionTotal.noArrestTotal:'0'}</p>
                          </div>
                  </Col>
                  <Col span={8} >
                          <div className="face_top_block">
                              {/* <img src={top_icon3}/> */}
                              <div className="img_block img_block3"></div>
                              <p className="face_top_label">已抓捕</p>
                              <p className="face_top_value">{distributionTotal?distributionTotal.arrestTotal:'0'}</p>
                          </div>
                  </Col>
                </Row>
              </div>
              <div className="data_info_right_item data_info_right_2">
                <div className="top_data_title2">
                  <p>添加布控</p>             
                </div>

                <div className="card_container">
                  <Collapse accordion>
                    <Panel header={cardTitle1} key="1" showArrow={false}>
                    
                      <Form onSubmit={this.handleSubmit.bind( this, 'people')}>
                        <FormItem
                          {...formItemLayout}
                          label="添加照片"
                        >
                          <div className="dropbox">
                            {getFieldDecorator('people_pictureUrl', {
                              valuePropName: 'fileList',
                              getValueFromEvent: this.normFile,
                              rules: [{ required: true, message: '请上传照片!' }],
                            })(
                              <Upload name="file"
                                  action={WEI_UPLOAD}
                                  listType="picture-card"
                                  onPreview={this.handlePreview}
                                  fileList={fileList}
                              >
                                {fileList.length >= 1 ? null : uploadButton}
                              </Upload>
                            )}
                          </div>
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="姓名"
                        >
                          {getFieldDecorator('people_realName', {
                            rules: [{ required: true, message: '请输入姓名!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>                    
                        <FormItem
                          {...formItemLayout}
                          label="身份证"
                        >
                          {getFieldDecorator('people_idCard', {
                            rules: [{ required: true, message: '请输入身份证!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="民警姓名"
                        >
                          {getFieldDecorator('people_policeName', {
                            rules: [{ required: true, message: '请输入民警姓名!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="布控开始时间"
                        >
                          {getFieldDecorator('people_distributionStart', {
                            rules: [{ required: true, message: '请输入布控开始时间!' }],
                          })(
                            <DatePicker locale={locale}/>
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="布控结束时间"
                        >
                          {getFieldDecorator('people_distributionEnd', {
                            rules: [{ required: true, message: '请输入布控结束时间!' }],
                          })(
                            <DatePicker locale={locale}/>
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="布控单位"
                        >
                          {getFieldDecorator('people_distributionCompany', {
                            rules: [{ required: true, message: '请输入布控单位!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="备注信息"
                        >
                          {getFieldDecorator('people_remark', {
                            rules: [{ required: true, message: '请输入备注信息!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem
                          wrapperCol={{ span: 12, offset: 6 }}
                        >
                          <Button type="primary" htmlType="submit">添加布控</Button>
                        </FormItem>
                      </Form>
                    </Panel>
                    <Panel header={cardTitle2} key="2" showArrow={false}>
                      <Form onSubmit={this.handleSubmit}>
                        <FormItem
                          {...formItemLayout}
                          label="添加照片"
                        >
                          <div className="dropbox">
                            {getFieldDecorator('door_pictureUrl', {
                              valuePropName: 'fileList',
                              getValueFromEvent: this.normFile,
                              rules: [{ required: true, message: '请上传照片!' }],
                            })(
                              <Upload 
                                action={WEI_UPLOAD}
                                listType="picture-card"
                                onPreview={this.handlePreview}
                                fileList={fileList}
                              >
                                <Icon type="plus" />
                                <div className="ant-upload-text">Upload</div>
                              </Upload>
                            )}
                          </div>
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="姓名"
                        >
                          {getFieldDecorator('door_realName', {
                            rules: [{ required: true, message: '请输入姓名!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>                    
                        <FormItem
                          {...formItemLayout}
                          label="身份证"
                        >
                          {getFieldDecorator('door_idCard', {
                            rules: [{ required: true, message: '请输入身份证!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="门卡ID"
                        >
                          {getFieldDecorator('door_doorCard', {
                            rules: [{ required: true, message: '请输入门卡ID!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="民警姓名"
                        >
                          {getFieldDecorator('door_policeName', {
                            rules: [{ required: true, message: '请输入民警姓名!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="布控开始时间"
                        >
                          {getFieldDecorator('door_distributionStart', {
                            rules: [{ required: true, message: '请输入布控开始时间!' }],
                          })(
                            <DatePicker locale={locale}/>
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="布控结束时间"
                        >
                          {getFieldDecorator('door_distributionEnd', {
                            rules: [{ required: true, message: '请输入布控结束时间!' }],
                          })(
                            <DatePicker locale={locale}/>
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="布控单位"
                        >
                          {getFieldDecorator('door_distributionCompany', {
                            rules: [{ required: true, message: '请输入布控单位!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="备注信息"
                        >
                          {getFieldDecorator('door_remark', {
                            rules: [{ required: true, message: '请输入备注信息!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                          <Button type="primary" htmlType="submit">添加布控</Button>
                        </FormItem>
                      </Form>
                    </Panel>
                    <Panel header={cardTitle3} key="3" showArrow={false}>
                      <Form onSubmit={this.handleSubmit}>
                        <FormItem
                          {...formItemLayout}
                          label="添加MAC码"
                        >
                          {getFieldDecorator('mac_macCode', {
                            rules: [{ required: true, message: '请输入MAC码!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="民警姓名"
                        >
                          {getFieldDecorator('mac_policeName', {
                            rules: [{ required: true, message: '请输入民警姓名!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="布控开始时间"
                        >
                          {getFieldDecorator('mac_distributionStart', {
                            rules: [{ required: true, message: '请输入布控开始时间!' }],
                          })(
                            <DatePicker locale={locale}/>
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="布控结束时间"
                        >
                          {getFieldDecorator('mac_distributionEnd', {
                            rules: [{ required: true, message: '请输入布控结束时间!' }],
                          })(
                            <DatePicker locale={locale}/>
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="布控单位"
                        >
                          {getFieldDecorator('mac_distributionCompany', {
                            rules: [{ required: true, message: '请输入布控单位!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="备注信息"
                        >
                          {getFieldDecorator('mac_remark', {
                            rules: [{ required: true, message: '请输入备注信息!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                          <Button type="primary" htmlType="submit">添加布控</Button>
                        </FormItem>
                      </Form>
                    </Panel>
                    <Panel header={cardTitle4} key="4" showArrow={false}>
                      <Form onSubmit={this.handleSubmit}>
                        <FormItem
                          {...formItemLayout}
                          label="添加车牌"
                        >
                          {getFieldDecorator('car_licensePlate', {
                            rules: [{ required: true, message: '请输入车牌!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>                    
                        <FormItem
                          {...formItemLayout}
                          label="民警姓名"
                        >
                          {getFieldDecorator('car_policeName', {
                            rules: [{ required: true, message: '请输入民警姓名!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="布控开始时间"
                        >
                          {getFieldDecorator('car_distributionStart', {
                            rules: [{ required: true, message: '请输入布控开始时间!' },],
                          })(
                            <DatePicker locale={locale}/>
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="布控结束时间"
                        >
                          {getFieldDecorator('car_distributionEnd', {
                            rules: [{ required: true, message: '请输入布控结束时间!' }],
                          })(
                            <DatePicker locale={locale}/>
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="布控单位"
                        >
                          {getFieldDecorator('car_distributionCompany', {
                            rules: [{ required: true, message: '请输入布控单位!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="备注信息"
                        >
                          {getFieldDecorator('car_remark', {
                            rules: [{ required: true, message: '请输入备注信息!' }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                          <Button type="primary" htmlType="submit">添加布控</Button>
                        </FormItem>
                      </Form>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Spin>
    )
  }
}

export default Form.create()(Monitor);
