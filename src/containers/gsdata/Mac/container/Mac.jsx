/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions/Mac'
import $ from 'jquery'
import {
  Row,
  Col,
  Spin,
  Select,
  Divider,
  Form,
  Card,
} from 'antd'
import {
  WS_URL
} from '../../../../fetch/apis'  
import '../style/Mac.less'
import mapStyleJson from '../../../../static/json/mapStyleJson.json'
import utils from '../../../../util/util';
import TopCascaderModal from '../../component/TopCascaderModal/TopCascaderModal'
import marker_blue from '../../../../static/images/gawing/marker_blue_mac.png'
import marker_red from '../../../../static/images/gawing/marker_red_mac.png'
import marker_hover from '../../../../static/images/gawing/marker_hover_mac.png'

import mac_icon1 from '../../../../static/images/gawing/gs_icon_01(2).png'
import TopButtons from "../../component/TopButtons/TopButtons";
import TopCascader from "../../component/TopCascader/TopCascader";
import SearchBox from "../../component/SearchBox/SearchBox";
import SearchBtn from '../../../../static/images/gawing/search_btn_icon.png'
import '../../../../static/css/tooltip-line.css';
import '../../../../static/css/animate.css'
const Option = Select.Option

import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;


@connect(
    state => state,
    {...actions}
)

class Mac extends Component {
  constructor(props) {
    super(props)
    this.initMap = this.initMap.bind(this)
    this.addWindow = this.addWindow.bind(this)
    this.selectToggle = this.selectToggle.bind(this)
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
      cascaderLabel: localStorage.getItem('label') ? localStorage.getItem('label') : '拱墅区',
      macData:[],
    }
  }

  restartWebSocket = () => {
    let _this = this
    this.state.s_websocket.close()
    var localLevel = localStorage.getItem('levelValue');
    var userId = localStorage.getItem('userId');
    // var userId = this.props.GSMac.userInfo.userId
    var cascaderLevel = localStorage.getItem('levelValue') ? localStorage.getItem('levelValue').split(",") : []

    var districtId = cascaderLevel[0] ? cascaderLevel[0] : 0
    var streetId = cascaderLevel[1] ? cascaderLevel[1] : 0
    var communityId = cascaderLevel[2] ? cascaderLevel[2] : 0
    var zoneId = cascaderLevel[3] ? cascaderLevel[3] : 0
    var websocket = new WebSocket(WS_URL)
    websocket.onopen = function () {
        // console.log("socket has been opened");
        var message = {
            action: "register",
            userId: userId,
            districtId:districtId,
            streetId:streetId,
            communityId:communityId,
            zoneId:zoneId,
            type:"macEquipment"
        };
        message = JSON.stringify(message);        
        websocket.send(message);
        _this.setState({
          nowleval: localLevel
        })
    }
    websocket.onmessage = function (event) {
        // console.log(event.data);
        const res = JSON.parse(event.data);
        if(res.obj) {
            _this.setState({
              macData: res
            })
        }
    }
    this.setState({
      s_websocket: websocket
    })
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
    this.restartWebSocket()
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

  onChange = (date, dateString) => {
    console.log(date, dateString);
  }

  selectToggle = () => {
    var select_visiable = this.state.selectVisiable
    console.log(select_visiable)
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

  initMap = (map, Long, Dat) => {
    const point = new BMap.Point(Long, Dat);
    map.centerAndZoom(point, 14); 
    // this.getBoundary(map)
  }

  addWindow = (map, services) => {
    services.forEach((item, index) => {
      if(item.longitude && item.latitude ) {
        var point = new BMap.Point(item.longitude, item.latitude);
        const blueIcon = new BMap.Icon(marker_blue, new BMap.Size(20,36));
        const redIcon = new BMap.Icon(marker_hover, new BMap.Size(20,36));
        var marker = new BMap.Marker(point, {
          icon: blueIcon,
          title: item.name
        });

                      
        // const sDom2 = `<div id="xq_window" class="xq_window">
        //                 <div class="xq_window_wrap animated fadeInDown">
        //                   <span class="xq_window_text xq_window_title">`+ item.name +`</span>
        //                 </div>
        //                 <div class="xq_window_wrap animated fadeInRight">
        //                   <label class="xq_window_label">常住人口:</label>
        //                   <span class="xq_window_text">`+ (totals.longTimeTotal ? totals.longTimeTotal : '') +`</span>
        //                 </div>
        //                 <div class="xq_window_wrap animated fadeInRight">
        //                   <label class="xq_window_label">暂住人口:</label>
        //                   <span class="xq_window_text">`+ totals.flowTotal +`</span>
        //                 </div>
        //                 <div class="xq_window_wrap animated fadeInRight">
        //                   <label class="xq_window_label">设备数:</label>
        //                   <span class="xq_window_text">`+ totals.EqptEquipmentChannelTotal +`</span>
        //                 </div>
        //               </div>`
        


        // var label = new BMap.Label(sDom,{offset:new BMap.Size(48,-70)});
        // var label2 = new BMap.Label(sDom2,{offset:new BMap.Size(48,-70)});
        // const _iw = new BMap.InfoWindow(sDom); 
        // label.setStyle({
        //   background: "url("+ gsbg5 +")",
        //   backgroundSize: '100% 100%',
        //   border: "none",
        //   animationName: "fadeInUp",
        //   animationDuration: "1s",
        //   animationFillMode: "both",
        // })
        // label2.setStyle({
        //   background: "url("+ gsbg5 +")",
        //   backgroundSize: '100% 100%',
        //   border: "none",
        //   animationName: "fadeInUp",
        // })    
        marker.addEventListener('mouseover', function() {
          // console.log('aaa');
          // marker.setLabel(label)
          marker.setIcon(redIcon)
        })
        marker.addEventListener('mouseout', function() {
          // console.log('bbb');
          // setTimeout(
          //   function(){
          //     map.removeOverlay(label)
          //   }, 1000
          // )
          marker.setIcon(blueIcon)
        })
        // marker.addEventListener("click", function(e) {
        //   marker.setLabel(label2);
        //   marker.setIcon(redIcon)
        // });
        // label2.addEventListener("click", function(e) {
        //   map.removeOverlay(label2)
        //   marker.setIcon(blueIcon)
        // });

        map.addOverlay(marker);
      }
    });
  }

  getBoundary = (map) => {       
    // var bdary = new BMap.Boundary();
    // var name = '拱墅区';
    // bdary.get(name, function(rs){       //获取行政区域  
    //     var count = rs.boundaries.length; //行政区域的点有多少个
    //     for(var i = 0; i < count; i++){
    //         var ply = new BMap.Polygon(rs.boundaries[i], {
    //           strokeWeight: 2, 
    //           strokeColor: 'rgb(139, 246, 235)',
    //           strokeOpacity:0.0, 
    //           fillOpacity: 0.1, 
    //           fillColor: "#000000"
    //         }); //建立多边形覆盖物
    //         map.addOverlay(ply);  //添加覆盖物
    //         //map.setViewport(ply.getPath());    //调整视野         
    //     }                
    // });   
    // 拱墅区边界值
    var boundaries = ["120.222992, 30.393995;120.203612, 30.40048;120.20292, 30.408115;120.2016, 30.404957;120.19589, 30.40402;120.198441, 30.398465;120.180906, 30.377503;120.176822, 30.3816;120.176122, 30.377313;120.165658, 30.378298;120.165131, 30.381243;120.159651, 30.38163;120.159175, 30.386611;120.152609, 30.384059;120.153309, 30.381788;120.146373, 30.381877;120.145325, 30.386325;120.135927, 30.388758;120.1374, 30.365563;120.143318, 30.346349;120.135562, 30.348854;120.130001, 30.344109;120.121766, 30.343334;120.112659, 30.34882;120.091752, 30.337377;120.102608, 30.332171;120.110122, 30.313959;120.111097, 30.29871;120.147653, 30.300067;120.161017, 30.27841;120.16646, 30.278819;120.166446, 30.288391;120.162318, 30.288637;120.158892, 30.295183;120.172792, 30.300579;120.163484, 30.315077;120.193322, 30.353097;120.214315, 30.361274;120.216988, 30.35715;120.220761, 30.36005;120.217244, 30.363487;120.221882, 30.37;120.216622, 30.37566;120.21574, 30.38447;120.211944, 30.385565;120.222992, 30.393995"]
    var count = boundaries.length;
    for(var i = 0; i < count; i++){
      var ply = new BMap.Polygon(boundaries[i], {
        strokeWeight: 2, 
        strokeColor: 'rgb(139, 246, 235)',
        strokeOpacity:0.0, 
        fillOpacity: 0.3, 
        fillColor: "#000000"
      }); //建立多边形覆盖物
      map.addOverlay(ply);  //添加覆盖物     
    }  
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.GSMac.xqInfo && this.state.map) {
      this.initMap(this.state.map, nextProps.GSMac.xqInfo.longitude, nextProps.GSMac.xqInfo.latitude)   
    } 
    if(this.state.map) {
      if(nextProps.GSMac.equipmentList && nextProps.GSMac.equipmentList.length > 0) {
        this.state.map.clearOverlays(); 
        this.getBoundary(this.state.map)
        this.addWindow(this.state.map, nextProps.GSMac.equipmentList)
        // 此处需要一个小区列表，包含基本详情和小区信息
      } else {
        this.state.map.clearOverlays(); 
      }
    }
  }

  allPost = () => {
    this.props.getEquipmentTotal()
    this.props.getDistributionData()
  }

  componentWillMount() {
    this.props.getLevel();
    this.allPost()
  }

  componentDidMount() {
    let _this = this
    let screenH = document.documentElement.clientHeight
    let mainDom = document.getElementsByClassName("data_info_item")
    let leftBottom = document.querySelector(".data_info_left_bottom")
    mainDom[0].style.height = screenH/12 + 'rem'
    mainDom[1].style.height = screenH/12 + 'rem'
    leftBottom.style.height = screenH/12 - 37.2 + 'rem'

    const map = new BMap.Map("dimap", {MAXZOOM: 18}); 
    // 初始化地图,设置中心点坐标和地图级别
    var point = new BMap.Point(120.149018,30.32539);    
    map.centerAndZoom(point,14);                     
    var marker = new BMap.Marker(point);
    map.addOverlay(marker); 
    
    let Long, Dat;
    const {
      xqInfo
    } = this.props.GSMac 
    if(xqInfo && xqInfo.longitude && xqInfo.latitude) {
      Long = xqInfo.longitude
      Dat = xqInfo.latitude
    } else {
      Long = 120.156919
      Dat = 30.332474 
    }
    if (xqInfo) {
      this.initMap(map, Long, Dat)   
    }  

    map.enableScrollWheelZoom();  
    map.setMapStyle({
      style:'midnight',
      styleJson: mapStyleJson
    });
    
    this.setState({
      map: map,
    })
    window.onresize = function() {
      let screenH = document.documentElement.clientHeight
      let mainDom = document.getElementsByClassName("data_info_item")
      let leftBottom = document.querySelector(".data_info_left_bottom")
      mainDom[0].style.height = screenH/12 + 'rem'
      mainDom[1].style.height = screenH/12 + 'rem'
      leftBottom.style.height = screenH/12 - 37.2 + 'rem'

      let pieWrapDom = document.querySelector('.data_info_right_3')
      let pieWrapDomHeight = utils.getStyle(pieWrapDom, 'height').height
      _this.setState({
        pieHeight: parseFloat(pieWrapDomHeight.split('px')[0]),
      })
    }
    clearTimeout(timer2)
    let timer2 = setTimeout(() => {
      let pieWrapDom = document.querySelector('.data_info_right_3')
      let pieWrapDomHeight = utils.getStyle(pieWrapDom, 'height').height
      this.setState({
        pieHeight: parseFloat(pieWrapDomHeight.split('px')[0]),
      })
    }, 1000)

    var localLevel = localStorage.getItem('levelValue');
    var userId = localStorage.getItem('userId');
    // var userId = this.props.GSMac.userInfo.userId
    var cascaderLevel = localStorage.getItem('levelValue') ? localStorage.getItem('levelValue').split(",") : []

    var districtId = cascaderLevel[0] ? cascaderLevel[0] : 0
    var streetId = cascaderLevel[1] ? cascaderLevel[1] : 0
    var communityId = cascaderLevel[2] ? cascaderLevel[2] : 0
    var zoneId = cascaderLevel[3] ? cascaderLevel[3] : 0

    var websocket = new WebSocket(WS_URL)
    websocket.onopen = function () {
        var message = {
            action: "register",
            userId: userId,
            districtId:districtId,
            streetId:streetId,
            communityId:communityId,
            zoneId:zoneId,
            type:"macEquipment"
        };
        message = JSON.stringify(message);
        
        websocket.send(message);
        _this.setState({
          nowleval: localLevel
        })
    }
    websocket.onmessage = function (event) {
        // console.log(event.data);
        const res = JSON.parse(event.data);
        console.log(res);
        if(res) {
            _this.setState({
                macData: res
            })
        }
    }
    this.setState({
      map: map,
      s_websocket: websocket
    })
  }

  componentWillUnmount() {
    // clearInterval(this.timer3);
    // clearInterval(this.timer4);
  }



  handleSubmit = (values) => {
    console.log(values)
    this.props.getDistributionData(values)
  } 


  render() {
    const {
      cascaderLabel,
      macData,
    } = this.state
    const {
      diLoading,
      equipmentInfo,
      equipmentList,
      distributionList,
      level,
    } = this.props.GSMac

    // const toCascaderProps = {
    //   userKey: this.props.GSMac.userKey,
    //   changev: this.props.changev,
    //   allPost: this.allPost,
    //   changeOnSelect: false
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

    const toSearchBoxProps = {
      placeholder: 'mac码',
      from1: 'macCode',
      handleSubmit: this.handleSubmit,
    }


    const toTopButtonsProps = {
      userKey: this.props.GSCar.userKey,
    }

    return (
    <Spin size="large" spinning={diLoading}>
      <div className="animated slideInLeft">
        <Row>
          <Col span={18}  className="data_info_item data_info_left">
            <Row>
              <TopButtons {...toTopButtonsProps} />  
            </Row> 
          
            
              <div className="data_info_left_bottom" id="dimap"></div>

              <div className="bottom_fix clearfix">
                <div className="bottom_left_block">

                  <div className="bottom_data_title">
                    <p><img width="14" className="title_icon" src={mac_icon1} /> 实时MAC探针数据</p>             
                  </div>

                  <div className="card_container">
                    <Row gutter={8}>

                      {/* 
                      "collectDevDimensionality": 0,
                      "collectDevLongitude": 0,
                      "collectTime": 1544603731000,
                      "devNo": "1921688232",
                      "devType": 0,
                      "fieldIntensity": 2.4,
                      "firstCollectTime": 1544603731000,
                      "historySSID": "",
                      "inOutFlag": 0,
                      "lastCollectTime": 0,
                      "linkageDevCode": "",
                      "mACAddress": "94d9b3280cad",
                      "msgType": 2,
                      "scanTime": 0,
                      "aPMacAddress": "94d9b3280cad",
                      "terminalBrand": "TP-Link Technologies Co. Ltd",
                      "vendor": "",
                      "version": "0",
                      "x": 0,
                      "y": 0 */}
                    
                      {/* {macData&&macData.length>0 ? macData.map((item, index) => {
                        return(
                          <Col span={6} >
                            <div className="bottom_card">
                              <p>捕获：{item.mACAddress}</p>
                              <p>来源：未知</p>
                              <p>时间：{utils.timeToHMS(item.collectTime)}</p>
                            </div>
                          </Col>
                        )
                      }) : <div className="nodata">暂无数据</div>} */}


                      <Col span={6} >
                        <div className="bottom_card">
                          <p>捕获：94d9b3280cad</p>
                          <p>来源：蔡马一号探针</p>
                          <p>时间：2018-11-27 02:13:40</p>
                        </div>
                      </Col>
                      <Col span={6} >
                        <div className="bottom_card">
                          <p>捕获：94d9b3280cad</p>
                          <p>来源：蔡马一号探针</p>
                          <p>时间：2018-11-27 02:13:40</p>
                        </div>
                      </Col>
                      <Col span={6} >
                        <div className="bottom_card">
                          <p>捕获：94d9b3280cad</p>
                          <p>来源：蔡马一号探针</p>
                          <p>时间：2018-11-27 02:13:40</p>
                        </div>
                      </Col>
                      <Col span={6} >
                        <div className="bottom_card">
                          <p>捕获：94d9b3280cad</p>
                          <p>来源：蔡马一号探针</p>
                          <p>时间：2018-11-27 02:13:40</p>
                        </div>
                      </Col>
                      <Col span={6} >
                        <div className="bottom_card">
                          <p>捕获：94d9b3280cad</p>
                          <p>来源：蔡马一号探针</p>
                          <p>时间：2018-11-27 02:13:40</p>
                        </div>
                      </Col>
                      <Col span={6} >
                        <div className="bottom_card">
                          <p>捕获：94d9b3280cad</p>
                          <p>来源：蔡马一号探针</p>
                          <p>时间：2018-11-27 02:13:40</p>
                        </div>
                      </Col>
                      <Col span={6} >
                        <div className="bottom_card">
                          <p>捕获：94d9b3280cad</p>
                          <p>来源：蔡马一号探针</p>
                          <p>时间：2018-11-27 02:13:40</p>
                        </div>
                      </Col>
                      <Col span={6} >
                        <div className="bottom_card">
                          <p>捕获：94d9b3280cad</p>
                          <p>来源：蔡马一号探针</p>
                          <p>时间：2018-11-27 02:13:40</p>
                        </div>
                      </Col>
                      <Col span={6} >
                        <div className="bottom_card">
                          <p>捕获：94d9b3280cad</p>
                          <p>来源：蔡马一号探针</p>
                          <p>时间：2018-11-27 02:13:40</p>
                        </div>
                      </Col>
                      <Col span={6} >
                        <div className="bottom_card">
                          <p>捕获：94d9b3280cad</p>
                          <p>来源：蔡马一号探针</p>
                          <p>时间：2018-11-27 02:13:40</p>
                        </div>
                      </Col>
                      <Col span={6} >
                        <div className="bottom_card">
                          <p>捕获：94d9b3280cad</p>
                          <p>来源：蔡马一号探针</p>
                          <p>时间：2018-11-27 02:13:40</p>
                        </div>
                      </Col>
                      <Col span={6} >
                        <div className="bottom_card">
                          <p>捕获：94d9b3280cad</p>
                          <p>来源：蔡马一号探针</p>
                          <p>时间：2018-11-27 02:13:40</p>
                        </div>
                      </Col>
                      <Col span={6} >
                        <div className="bottom_card">
                          <p>捕获：94d9b3280cad</p>
                          <p>来源：蔡马一号探针</p>
                          <p>时间：2018-11-27 02:13:40</p>
                        </div>
                      </Col>
                      <Col span={6} >
                        <div className="bottom_card">
                          <p>捕获：94d9b3280cad</p>
                          <p>来源：蔡马一号探针</p>
                          <p>时间：2018-11-27 02:13:40</p>
                        </div>
                      </Col>
                      <Col span={6} >
                        <div className="bottom_card">
                          <p>捕获：94d9b3280cad</p>
                          <p>来源：蔡马一号探针</p>
                          <p>时间：2018-11-27 02:13:40</p>
                        </div>
                      </Col>
                      <Col span={6} >
                        <div className="bottom_card">
                          <p>捕获：94d9b3280cad</p>
                          <p>来源：蔡马一号探针</p>
                          <p>时间：2018-11-27 02:13:40</p>
                        </div>
                      </Col>



                    </Row>   
                  </div>
                </div>
              </div>
            
          </Col>
          <Col span={6}  className="data_info_item data_info_right">
            <div className="data_info_right_item data_info_right_1">
              <div className="top_data_title1">
                <div className="select_block">
                  {/* <TopCascader {...toCascaderProps} /> */}
                  {toCascaderProps ? <TopCascaderModal {...toCascaderProps} /> : '' }
                </div>
              </div>
              <Row gutter={16}>
                <Col span={8} >
                        <div className="face_top_block">
                            {/* <img src={top_icon1}/> */}
                            <div className="img_block img_block1"></div>
                            <p className="face_top_label">正常数</p>
                            <p className="face_top_value">{equipmentInfo?(equipmentInfo.total-equipmentInfo.faultTotal-equipmentInfo.testTotal):'0'}</p>
                        </div>
                </Col>
                <Col span={8} >
                        <div className="face_top_block">
                            {/* <img src={top_icon2}/> */}
                            <div className="img_block img_block2"></div>
                            <p className="face_top_label">故障数</p>
                            <p className="face_top_value">{equipmentInfo?equipmentInfo.faultTotal:'0'}</p>
                        </div>
                </Col>
                <Col span={8} >
                        <div className="face_top_block">
                            {/* <img src={top_icon3}/> */}
                            <div className="img_block img_block3"></div>
                            <p className="face_top_label">调试数</p>
                            <p className="face_top_value">{equipmentInfo?equipmentInfo.testTotal:'0'}</p>
                        </div>
                </Col>
              </Row>
            </div>
            <div className="data_info_right_item data_info_right_2">
              <div className="top_data_title2">
                <p>MAC探针位置</p>             
              </div>

                    {/* <div key={index} className="card_block mac_card_1">
                      <h3 className="mac_card_1_title">{item.name}</h3>
                      <p>详细位置：{item.location} {item.latitude} {item.longitude}</p>
                      <p>安装时间：{item.createDate}</p>
                      <p>运营单位：浙江启融</p>
                    </div> */}

              <div className="card_container new_card_container">
                {/* { equipmentList ? equipmentList.map((item,index) => {
                  return(                    
                    <Card
                      className="card_1"
                      title={item.name}
                      style={{ margin: "0px 10px 10px 10px", }}
                    >
                      <p>详细位置：{item.location} {item.latitude} {item.longitude}</p>
                      <p>安装时间：{item.createDate}</p>
                      <p>运营单位：浙江启融</p>
                    </Card>
                  )
                }) : ''} */}

                <Card
                  className="card_1"
                  title="蔡马人家探针设备02"
                  style={{ margin: "0px 10px 10px 10px", }}
                >
                  <p>详细位置：30.333123 120.158477</p>
                  <p>安装时间：2018-08-22 20:43:49</p>
                  <p>运营单位：浙江启融</p>
                </Card>
                <Card
                  className="card_2"
                  title="蔡马人家探针设备02"
                  style={{ margin: "0px 10px 10px 10px", }}
                >
                  <p>详细位置：30.333123 120.158477</p>
                  <p>安装时间：2018-08-22 20:43:49</p>
                  <p>运营单位：浙江启融</p>
                </Card>

                <Card
                  className="card_3"
                  title="蔡马人家探针设备02"
                  style={{ margin: "0px 10px 10px 10px", }}
                >
                  <p>详细位置：30.333123 120.158477</p>
                  <p>安装时间：2018-08-22 20:43:49</p>
                  <p>运营单位：浙江启融</p>
                </Card>


              </div>
            </div>
            <div className="data_info_right_item data_info_right_3">
              <div className="top_data_title2">
                <p>MAC布控</p>             
              </div>
              <SearchBox {...toSearchBoxProps} />


              {/* <div className="search_box">
                  <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                      {getFieldDecorator('macCode', {
                      })(
                        <Input placeholder="mac码" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('startTime', {
                      })(
                        <DatePicker className="search_form" locale={locale} />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('endTime', {
                      })(
                        <DatePicker className="search_form" locale={locale} />
                      )}
                    </FormItem>
                    <FormItem>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                      >
                        <img src={SearchBtn} />
                      </Button>
                    </FormItem>
                  </Form>
              </div> */}


              <div className="card_container">
                    {/* createDate: "2018-11-27 16:13:40"
                    createName: "string"
                    delete: false
                    distributionCompany: "上塘派出所"
                    distributionEnd: "2018-11-27 16:03:45"
                    distributionStart: "2018-11-27 16:03:45"
                    fieldLimit: "*"
                    id: 4
                    idCard: "330107196811210014"
                    label: "嫌疑电子设备"
                    limit: 20
                    macCode: "123123123"
                    modifyDate: "2018-11-28 07:41:36"
                    modifyName: "string"
                    policeName: "aaa"
                    realName: "贾春华"
                    remark: "abc"
                    rowver: "string"
                    state: 0
                    zoneId: 3 */}
                { distributionList ? distributionList.map((item,index) => {
                  return(
                    <div key={index} className="card_block">
                      <div key={index} className="mac_card_2">
                        <h3 className="mac_card_1_title">布控原因：{item.label}</h3>
                        <Divider style={{ margin: "2px 0" }} />
                        <p>MAC：{item.macCode}</p>
                        <p>来源：2018-02-29</p>
                        <p>布控单位：{item.distributionCompany}</p>
                        <p>布控时间：{item.createDate}</p>
                        <p>民警姓名：{item.policeName}</p>
                        <div className="ext_btn" onClick={this.toggleRemark.bind(this)}></div>
                      </div>
                      <div className="ext_block">{item.remark}</div>
                    </div>
                  )
                }) : ''}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Spin>
    )
  }
}

export default Mac;
