/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions/Door'
import $ from 'jquery'
import {
  Row,
  Col,
  Spin,
  Divider,
  Select,
  Modal,
  Card,
  Progress
  // EnterAnimation
} from 'antd'
import {
  WS_URL
} from '../../../../fetch/apis'
  
import '../style/Door.less'
import mapStyleJson from '../../../../static/json/mapStyleJson.json'
import utils from '../../../../util/util';
import sxt1 from '../../../../static/images/sxt1.gif'
import sxt3 from '../../../../static/images/sxt3.gif'
import rlsx1 from '../../../../static/images/rlsx1.png'
import rlsx3 from '../../../../static/images/rlsx3.png'
import marker_blue from '../../../../static/images/gawing/marker_blue_door.png'
import marker_red from '../../../../static/images/gawing/marker_red_door.png'
import marker_hover from '../../../../static/images/gawing/marker_hover_door.png'
import title_icon1 from '../../../../static/images/gawing/gs_icon_03(2).png'
import TopCascaderModal from '../../component/TopCascaderModal/TopCascaderModal'
import TopButtons from '../../component/TopButtons/TopButtons'
import TopCascader from '../../component/TopCascader/TopCascader'
import SearchBox from '../../component/SearchBox/SearchBox'
import '../../../../static/css/animate.css'
import '../../../../static/css/tooltip-line.css'
const Option = Select.Option

@connect(
    state => state,
    {...actions}
)

class Door extends Component {
  constructor(props) {
    super(props)
    this.initMap = this.initMap.bind(this)
    this.toPeoplePage = this.toPeoplePage.bind(this)
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
      cardData: [],
      faceData: [],
      cascaderLabel: localStorage.getItem('label') ? localStorage.getItem('label') : '拱墅区'
    }
  }

  restartWebSocket = () => {
    let _this = this
    this.state.s_websocket.close()
    var localLevel = localStorage.getItem('levelValue');
    var userId = localStorage.getItem('userId');
    // var userId = this.props.GSIndex.userInfo.userId
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
            type:"gatebrake"
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
                bottomData: res.obj,
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

  initMap = (map, Long, Dat) => {
    const point = new BMap.Point(Long, Dat);
    map.centerAndZoom(point, 14); 
    // this.getBoundary(map)
  }

  // 编写自定义函数,创建标注
  addMarker = (map, services) => {
    services.forEach((item, index) => {
      if(item.longitude && item.latitude) {
        let imgObj = null
        if(item.type.indexOf('编码通道') > -1) {
          if(item.state) {
            imgObj = rlsx3
          } else {
            imgObj = rlsx1
          }
        }
        if(item.type.indexOf('门禁通道') > -1) {
          if(item.state) {
            imgObj = sxt3
          } else {
            imgObj = sxt1
          }
        }
        const point = new BMap.Point(item.longitude, item.latitude);
        const myIcon = new BMap.Icon(imgObj, new BMap.Size(20,36));
        const marker = new BMap.Marker(point, {
          icon: myIcon
        });
        map.addOverlay(marker);
      }
    })
  }

  addWindow = (map, services) => {
    services.forEach((item, index) => {
      if(item.longitude && item.latitude) {
        var point = new BMap.Point(item.longitude, item.latitude);
        const blueIcon = new BMap.Icon(marker_blue, new BMap.Size(20,36));
        const redIcon = new BMap.Icon(marker_hover, new BMap.Size(20,36));
        var marker = new BMap.Marker(point, {
          icon: blueIcon,
          title: item.name
        });

        // const sDom = `<div id="xq_window" class="xq_window">
        //                 <div class="xq_window_wrap animated fadeInDown">
        //                   <span class="xq_window_text xq_window_title">`+ item.name +`</span>
        //                 </div>
        //               </div>`
                      
        // const sDom2 = `<div id="xq_window" class="xq_window">
        //                 <div class="xq_window_wrap animated fadeInDown">
        //                   <span class="xq_window_text xq_window_title">`+ item.name +`</span>
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
    if (nextProps.GSDoor.xqInfo && this.state.map) {
      this.initMap(this.state.map, nextProps.GSDoor.xqInfo.longitude, nextProps.GSDoor.xqInfo.latitude)   
    } 
    if(this.state.map) {
      if(nextProps.GSDoor.mapDomList && nextProps.GSDoor.mapDomList.length > 0) {
        this.state.map.clearOverlays(); 
        // this.addMarker(this.state.map, nextProps.GSDoor.servicesChannelList)
        this.getBoundary(this.state.map)
        this.addWindow(this.state.map, nextProps.GSDoor.mapDomList)
        // 此处需要一个小区列表，包含基本详情和小区信息
      } else {
        this.state.map.clearOverlays(); 
      }
    }
  }


  allPost = () => {
    this.props.getEquipmentTotal()
    this.props.getDistributionData()
    this.props.getEquipmentList()
  }

  
  toPeoplePage = (personId) => {
    if (personId) {
      localStorage.setItem('personId', personId)
      window.location.href="/gsdata/people"
    }
  }

  handleSubmit = (values) => {
    console.log(values)
    this.props.getEquipmentList(values)
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
    leftBottom.style.height = screenH/12 - 41.65 + 'rem'

    const map = new BMap.Map("dimap", {MAXZOOM: 18}); 
    // 初始化地图,设置中心点坐标和地图级别
    var point = new BMap.Point(120.149018,30.32539);    
    map.centerAndZoom(point,14);                     
    var marker = new BMap.Marker(point);
    map.addOverlay(marker); 
    
    let Long, Dat;
    const {
      xqInfo
    } = this.props.GSDoor 
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
      // styleJson: mapStyleJson
    });
    
    clearInterval(timer1)
    let timer1 = setInterval(() => {
      let nowTime = new Date().getTime();
      let weekArr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
      var weekDay = new Date().getDay();
      _this.setState({
        time: utils.timeToHMS(nowTime) + ' ' + weekArr[weekDay]
      })
    }, 1000)

    window.onresize = function() {
      let screenH = document.documentElement.clientHeight
      let mainDom = document.getElementsByClassName("data_info_item")
      let leftBottom = document.querySelector(".data_info_left_bottom")
      mainDom[0].style.height = screenH/12 + 'rem'
      mainDom[1].style.height = screenH/12 + 'rem'
      leftBottom.style.height = screenH + 'px'
      leftBottom.style.height = screenH/12 - 41.6 + 'rem'
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


    console.log(this.props.GSIndex.userInfo)
    var localLevel = localStorage.getItem('levelValue');
    var userId = localStorage.getItem('userId');
    // var userId = this.props.GSIndex.userInfo.userId
    var cascaderLevel = localStorage.getItem('levelValue') ? localStorage.getItem('levelValue').split(",") : []
    console.log(cascaderLevel)

    var districtId = cascaderLevel[0] ? cascaderLevel[0] : 0
    var streetId = cascaderLevel[1] ? cascaderLevel[1] : 0
    var communityId = cascaderLevel[2] ? cascaderLevel[2] : 0
    var zoneId = cascaderLevel[3] ? cascaderLevel[3] : 0

    console.log(districtId, streetId, communityId, zoneId)

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
            type:"gatebrake"
        };
        message = JSON.stringify(message);
        
        websocket.send(message);
        console.log(message);
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
                cardData: res.cardData,
                faceData: res.faceData,
            })
        }
    }
    this.setState({
      map: map,
      s_websocket: websocket
    })
  }

  render() {
    const {
      cardData,
      faceData,
      cascaderLabel
    } = this.state
    const {
      diLoading,
      equipmentInfo,
      equipmentList,
      distributionList,
      level
    } = this.props.GSDoor

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

    const toSearchBoxProps = {
      placeholder: '门禁位置或住户姓名',
      from1: 'name',
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
                  <div className="bottom_left_block fl">
                    <div className="botto_block_tilte">
                      <p><img width="14" className="title_icon" src={title_icon1} /> 刷卡门禁</p>
                    </div>
                    <div className="card_container">
                      <Row gutter={8}>

                          {/* address: "12-2-22-2202"
                          catchPicture: "http://112.17.106.71:50000/8f11ed4d-8693-11e8-b159-000af7e1a67c/20181203/5/dsf_6f329ddf-f6d6-11e8-8634-000af7e1a67c_17612149_17628811.jpg"
                          equipmentName: "10人脸闸机_通道1"
                          lastTime: 1543836940000
                          localPicture: "http://112.17.106.71:81/upload/hrms/360734199106120516.jpg"
                          nativePlace: "江西省"
                          openDoorTime: 1543836966000
                          picture: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD"
                          userId: 1762
                          userName: "刘佛春"
                          zoneId: 3
                          zoneName: "蔡马人家" */}

                          {/* equipmentName: "1"
                          lastTime: 1543837090000
                          openDoorTime: 1543837091000
                          userName: "idCard未知"
                          zoneName: "蔡马人家" */}



                        { cardData ? cardData.map((item,index) => {
                          return(                    
                            <Col span={12} key={index}>
                              <div className="bottom_monitor_item">
                                <div className="ext_btn" title="查看住户详情" onClick={this.toPeoplePage.bind(this, item.userId)}></div>
                                <h3>位置：{item.equipmentName}</h3>
                                <Divider style={{ margin: "2px 0" }} />
                                <p>姓名：{item.userName}</p>
                                <p>籍贯：{item.nativePlace ? item.nativePlace : '未知'}</p>
                                <p>住址：{item.zoneName}</p>
                                <p>开门时间：{item.openDoorTime ? utils.timeToHMS(item.openDoorTime) : '未知'}</p>
                                  <p>最近开门：{item.lastTime ? utils.timeToHMS(item.lastTime) : '未知'}</p>
                              </div>                        
                            </Col>
                          )
                        }) : ''}
                      </Row>                    
                    </div>
                  </div>
                  <div className="bottom_right_block fl">
                    <div className="botto_block_tilte">
                      <p><img width="14" className="title_icon" src={title_icon1} /> 人脸门禁</p>
                    </div>
                    <div className="card_container">
                      <Row gutter={8}>


                          {/* address: "9-1-13-1303"
                          catchPicture: "http://112.17.106.71:50000/8f11ed4d-8693-11e8-b159-000af7e1a67c/20181203/5/dsf_6f329ddf-f6d6-11e8-8634-000af7e1a67c_17838236_17844312.jpg"
                          equipmentName: "6"
                          lastTime: 1543837137000
                          localPicture: "http://112.17.106.71:81/upload/face/2018-08-18/1_1534560821801.jpg"
                          nativePlace: "浙江省"
                          openDoorTime: 1543837143000
                          picture: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD"
                          userId: 517
                          userName: "郦燕颖"
                          zoneId: 3
                          zoneName: "蔡马人家" */}
                          
                        { faceData ? faceData.map((item,index) => {
                          return(                    
                            <Col span={12} >
                              <div className="bottom_monitor_item clearfix">
                                <div className="ext_btn"  title="查看住户详情" onClick={this.toPeoplePage.bind(this, item.userId)}></div>
                                <h3>位置：{item.equipmentName}</h3>
                                <div className="bottom_item_left fl">
                                  <img src={item.catchPicture} />
                                  <img src={item.localPicture}/>
                                </div>
                                <div className="bottom_item_right fr">
                                  <p>姓名：{item.userName}</p>
                                  <p>籍贯：{item.nativePlace}</p>
                                  <p>住址：{item.zoneName}{item.address}</p>
                                  <p>开门时间：{item.openDoorTime ? utils.timeToHMS(item.openDoorTime) : '未知'}</p>
                                  <p>最近开门：{item.lastTime ? utils.timeToHMS(item.lastTime) : '未知'}</p>
                                </div>
                              </div>
                            </Col>  
                          )
                        }) : ''}                 
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
                {/* <div className="ext_btn">详情</div> */}
                <div className="top_data_title2">
                  <p>警员布控</p>             
                </div>
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
                      <div key={index} className="police_block clearfix">
                        <div className="block_title">
                          <p>布控原因：{item.label}</p>
                        </div>
                        <div className="police_img fl">
                          <img src={item.pictureUrl}></img>
                        </div>
                        <div className="police_text fl">
                          <Row>
                            <Col span={12}>
                              <p>姓名：{item.realName}</p>
                              <p>籍贯: {item.realName}</p>
                              <p>身份证：{item.idCard}</p>
                            </Col>
                            <Col span={12}>
                              <p>布控单位：{item.distributionCompany}</p>
                              <p>布控时间：{item.createDate}</p>
                              <p>民警姓名：{item.policeName}</p>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    )
                  }) : ''}
                </div>

              </div>
              <div className="data_info_right_item data_info_right_3">
                <SearchBox {...toSearchBoxProps} />
                <div className="card_container">
                  { equipmentList ? equipmentList.map((item,index) => {
                    return(                    
                      <div key={index} className="right_monitor_block">
                        <div className="right_top_btn" title="查看住户详情" onClick={this.toPeoplePage.bind(this,item.userId)}></div>
                        <img src={item.picture}></img>
                        <div className="right_monitor_info">
                          <h3>某小区东一号门</h3>
                          <Row>
                            <Col span={12}>
                              <p>姓名：{item.userName}</p>
                              <p>籍贯：{item.nativePlace}</p>
                              <p>住址：{item.address}</p>
                            </Col>
                            <Col span={12}>
                              <p>开门时间：{item.openDoorTime}</p>
                              <p>最近开门：{item.lastTime}</p>
                            </Col>
                          </Row>
                        </div>
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

export default Door;
