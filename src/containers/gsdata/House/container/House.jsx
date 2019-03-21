/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions/House'
import $ from 'jquery'
import {
  Row,
  Col,
  Select,
  Modal,
  Tabs,
  DatePicker
} from 'antd'
import '../style/House.less'
import mapStyleJson from '../../../../static/json/mapStyleJson.json'
import utils from '../../../../util/util';
import sxt1 from '../../../../static/images/sxt1.gif'
import sxt3 from '../../../../static/images/sxt3.gif'
import rlsx1 from '../../../../static/images/rlsx1.png'
import rlsx3 from '../../../../static/images/rlsx3.png'
import marker_blue from '../../../../static/images/gawing/marker_people_s.png'
import marker_red from '../../../../static/images/gawing/marker_people_s.png'
import gsbg5 from '../../../../static/images/gawing/map_window_bg.png'
import housePlan from '../../../../static/images/gawing/house_plan.jpg'
import TopButtons from "../../component/TopButtons/TopButtons";
import TopCascader from "../../component/TopCascader/TopCascader";
import '../../../../static/css/animate.css'
import '../../../../static/css/tooltip-line.css'
const Option = Select.Option
const TabPane = Tabs.TabPane

import SearchBtn from '../../../../static/images/gawing/search_btn_icon.png'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

@connect(
    state => state,
    {...actions}
)

class House extends Component {
  constructor(props) {
    super(props)
    this.initMap = this.initMap.bind(this)
    this.addMarker = this.addMarker.bind(this)
    this.addWindow = this.addWindow.bind(this)
    this.selectUnVisiable = this.selectUnVisiable.bind(this)
    this.selectToggle = this.selectToggle.bind(this)
    this.shouHouseDetail = this.shouHouseDetail.bind(this)
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
      houseVisible: false,
      house2Visible: false,
      homeUnitList: '',
      homeRoomList: [],
      homeBuildInfo: '',
      homeBuild: '',
      homeUnit: 'all',
      homeRoom: 'all',
      roomNum: '',

    }
  }


  callback = (key) => {
    console.log(key);
  }

  shouHouseDetail = (id, roomNum) => {
    this.props.getHousingPersonnel(id);
    this.setState({
      roomNum: roomNum
    })
  }

  // 显示地图点位弹窗
  showHouseModal = () => {
    console.log('aaa')
    this.setState({
      house2Visible: true,
    });
  }

  // 隐藏地图点位弹窗
  houseHandleCancel = () => {
    this.setState({
      houseVisible: false,
    });
  }

  // 隐藏地图点位弹窗
  house2HandleCancel = () => {
    this.setState({
      house2Visible: false,
    });
  }


  selectUnVisiable = () => {
    console.log('qqqq')
    this.setState({
      selectVisiable: 'select_unvisiable',
    })
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
        const myIcon = new BMap.Icon(imgObj, new BMap.Size(15,21));
        const marker = new BMap.Marker(point, {
          icon: myIcon
        });
        map.addOverlay(marker);
      }
    })
  }

  addWindow = (map, services, totals) => {
    services.forEach((item, index) => {
      if(item.longitude && item.latitude && totals) {
        var point = new BMap.Point(item.longitude, item.latitude);
        const blueIcon = new BMap.Icon(marker_blue, new BMap.Size(15,21));
        const redIcon = new BMap.Icon(marker_red, new BMap.Size(15,21));
        var marker = new BMap.Marker(point, {
          icon: blueIcon,
          title: item.name
        });

        const sDom = `<div id="xq_window" class="xq_window">
                        <div class="xq_window_wrap animated fadeInDown">
                          <span class="xq_window_text xq_window_title">`+ item.name +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">常住人口:</label>
                          <span class="xq_window_text">`+ (totals.longTimeTotal ? totals.longTimeTotal : '') +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">暂住人口:</label>
                          <span class="xq_window_text">`+ totals.flowTotal +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">设备数:</label>
                          <span class="xq_window_text">`+ totals.EqptEquipmentChannelTotal +`</span>
                        </div>
                      </div>`
                      
        const sDom2 = `<div id="xq_window" class="xq_window">
                        <div class="xq_window_wrap animated fadeInDown">
                          <span class="xq_window_text xq_window_title">`+ item.name +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">常住人口:</label>
                          <span class="xq_window_text">`+ (totals.longTimeTotal ? totals.longTimeTotal : '') +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">暂住人口:</label>
                          <span class="xq_window_text">`+ totals.flowTotal +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">设备数:</label>
                          <span class="xq_window_text">`+ totals.EqptEquipmentChannelTotal +`</span>
                        </div>
                      </div>`
        


        var label = new BMap.Label(sDom,{offset:new BMap.Size(48,-70)});
        var label2 = new BMap.Label(sDom2,{offset:new BMap.Size(48,-70)});
        const _iw = new BMap.InfoWindow(sDom); 
        label.setStyle({
          background: "url("+ gsbg5 +")",
          backgroundSize: '100% 100%',
          border: "none",
          animationName: "fadeInUp",
          animationDuration: "1s",
          animationFillMode: "both",
        })
        label2.setStyle({
          background: "url("+ gsbg5 +")",
          backgroundSize: '100% 100%',
          border: "none",
          animationName: "fadeInUp",
        })    
        marker.addEventListener('mouseover', function() {
          // console.log('aaa');
          marker.setLabel(label)
          marker.setIcon(redIcon)
        })
        marker.addEventListener('mouseout', function() {
          // console.log('bbb');
          setTimeout(
            function(){
              map.removeOverlay(label)
            }, 1000
          )
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
    if (nextProps.GSHouse.xqInfo && this.state.map) {
      this.initMap(this.state.map, nextProps.GSHouse.xqInfo.longitude, nextProps.GSHouse.xqInfo.latitude)   
    } 
    if(this.state.map) {
      if(nextProps.GSHouse.xqList && nextProps.GSHouse.xqList.length > 0) {
        this.state.map.clearOverlays(); 
        // this.addMarker(this.state.map, nextProps.GSHouse.servicesChannelList)
        this.getBoundary(this.state.map)
        this.addWindow(this.state.map, nextProps.GSHouse.xqList, nextProps.GSHouse.zoneTotal)
        // 此处需要一个小区列表，包含基本详情和小区信息
      } else {
        this.state.map.clearOverlays(); 
      }
    }
  }

  allPost = () => {
    this.props.getBuildList()
    this.props.getHousingInfo()
    // this.props.getHousingPersonnel()
  }

  componentWillMount() {
    this.allPost()
  }

  componentDidMount() {
    let _this = this
    let screenH = document.documentElement.clientHeight
    let mainDom = document.getElementsByClassName("data_info_item")
    // let leftBottom = document.querySelector(".data_info_left_bottom")
    mainDom[0].style.height = screenH/12 + 'rem'
    mainDom[1].style.height = screenH/12 + 'rem'
    // leftBottom.style.height = screenH + 'px'

    const map = new BMap.Map("dimap", {MAXZOOM: 18}); 
    // 初始化地图,设置中心点坐标和地图级别
    var point = new BMap.Point(120.149018,30.32539);    
    map.centerAndZoom(point,14);                     
    var marker = new BMap.Marker(point);
    map.addOverlay(marker); 
    
    let Long, Dat;
    const {
      xqInfo
    } = this.props.GSHouse 
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
    this.setState({
      map: map,
    })
    window.onresize = function() {
      let screenH = document.documentElement.clientHeight
      let mainDom = document.getElementsByClassName("data_info_item")
      // let leftBottom = document.querySelector(".data_info_left_bottom")
      mainDom[0].style.height = screenH/12 + 'rem'
      mainDom[1].style.height = screenH/12 + 'rem'
      // leftBottom.style.height = screenH + 'px'

      // let pieWrapDom = document.querySelector('.data_info_right_3')
      // let pieWrapDomHeight = utils.getStyle(pieWrapDom, 'height').height
      // _this.setState({
      //   pieHeight: parseFloat(pieWrapDomHeight.split('px')[0]),
      // })
    }
    // clearTimeout(timer2)
    // let timer2 = setTimeout(() => {
    //   let pieWrapDom = document.querySelector('.data_info_right_3')
    //   let pieWrapDomHeight = utils.getStyle(pieWrapDom, 'height').height
    //   this.setState({
    //     pieHeight: parseFloat(pieWrapDomHeight.split('px')[0]),
    //   })
    // }, 1000)

    // this.timer3 = setInterval(
    //   () => this.props.getPersonnelRecord(),
    //   10000
    // );
    // this.timer4 = setInterval(
    //   () => this.props.getCLSelectRecVehicleRecord(),
    //   10000
    // );
  }
  
  componentWillUnmount() {
    // clearInterval(this.timer3);
    // clearInterval(this.timer4);
  }

  render() {
    const {
      roomNum
    } = this.state
    const {
      housingInfo,
      homeUnitList,
      homeLayerList,
      homeRoomList,
      homeBuildList,
      homeBuild,
      homeUnit,
      homeLayer,
      homeRoom,
      homeBuildInfo,
      homeBuildTotal,
      homeBuildListJson,
      homeRoomListJson,
      housingDetail,
      housingUserTotal,
      housingPerson,

    } = this.props.GSHouse

    const toCascaderProps = {
      userKey: this.props.GSCar.userKey,
      changev: this.props.changev,
      allPost: this.allPost,
      changeOnSelect: false
    }

    const toTopButtonsProps = {
      userKey: this.props.GSCar.userKey,
    }

    let buildOptions;
    if (homeBuildList &&  homeBuildList.length > 0) {
      buildOptions = homeBuildList.map((item, index) => {
        let newName = ''
        let newNameArr = item.name.split('-')
        let newNameArrLength = newNameArr.length
        if( newNameArrLength > 1) {
          newName = newNameArr[newNameArrLength -1]
        } else {
          newName = item.name
        }
        return <Option 
          key={index} 
          value={item.id} 
          className="house_lay_select_option"
        >{newName}</Option>;
      });
    } else {
        buildOptions = [];
    }

    
    let unitOptions,layerOptions,roomOptions;
    if(homeUnitList &&  homeUnitList.length > 0) {
      unitOptions = homeUnitList.map((item, index) => {
          return <Option key={index} value={item} className="house_lay_select_option">{item}</Option>;
      });
    } else {
      unitOptions = [];
    }

    if(homeLayerList &&  homeLayerList.length > 0) {
      layerOptions = homeLayerList.map((item, index) => {
          return <Option key={index} value={item} className="">{item}</Option>;
      });
    } else {
      layerOptions = [];
    }


    if(homeRoomList &&  homeRoomList.length > 0) {
      roomOptions = homeRoomList.map((item, index) => {
        let newRoom = ''
        let newRoomArr = item.name.split('-')
        let newRoomArrLength = newRoomArr.length
        if( newRoomArrLength > 1) {
          newRoom = newRoomArr[newRoomArrLength -1]
        } else {
          newRoom = item.name
        }
          return <Col key={index} span={8} >
                  <div className={"police_block "+ item.usage +"_block clearfix"}>
                      <h3 onClick={this.shouHouseDetail.bind(this,item.id, newRoom)}>{newRoom}</h3>
                      <p>居住人：{item.userCount}人</p>
                      <p>车辆数：{item.vehicleCount}辆</p>
                  </div>                
                </Col>;
      });
    } else {
      roomOptions = [];
    }
    unitOptions.unshift(<Option key="0" value="all">请选择</Option>)
    layerOptions.unshift(<Option key="0" value="all">请选择</Option>)

    console.log(housingPerson)

    return (
      // <Spin size="large" spinning={diLoading}>
        <div className="animated slideInLeft">
          <TopButtons {...toTopButtonsProps} />
          <Row>
            <Col span={18}  className="data_info_item data_info_left">
                <div className="bottom_fix clearfix">
                  <div className="bottom_left_block">
                    <div className="top_data_title1">
                      {/*  */}
                      <p>住址：拱墅区·上塘街道·蔡马小区·{homeBuild}幢·{homeUnit?homeUnit=="all"?"1":homeUnit:"1"}单元 {roomNum} 居住人数：{housingUserTotal?housingUserTotal:'0'}人</p>
                    </div>
                    <div className="clearfix"></div>
                    <div className="card_container">
                      <Row gutter={8}>

                        {housingPerson ? housingPerson.map((item, index) => {
                          var carItem = ''
                          if (item.vehicle.length>0) {
                            carItem = item.vehicle.map((item2, index2) => {
                              return(
                                <span key={index2}> {item2.licenseNumber} </span>
                              )
                            })                            
                          } else {
                            carItem = '无'
                          }


                          // for (let i = 0; i < item.vehicle.length; i++) {
                          //   carItem += `<span>`+ item.vehicle[i].licenseNumber +`</span>`;
                          // }
                          return  <Col span={8} >
                              <div className="bottom_monitor_item">
                                <div className="people_img fl">
                                  <img src={item.user.file}/>
                                </div>
                                <div className="people_info fl">
                                  <p>姓名：{item.user.name}</p>
                                  <p>性别：{item.user.gender == 'male' ? '男' : '女' }</p>
                                  <p>民族：{item.user.racial}</p>
                                  <p>出生：{item.user.birthDate}</p>
                                  <p>住址：{item.user.address}</p>
                                  <p>身份证：{utils.plusXing(item.user.idCard, 9, 0)}</p>
                                  <p>关联车辆：{carItem}</p>
                                </div>
                              </div>
                            </Col>;
                        }) : ''}

                      </Row>
                    </div>

                  </div>
                  <div className="bottom_right_block">
                    <div className="bottom_left_box fl">
                      <div className="data_info_left_bottom" id="dimap"></div>
                    </div>
                    <div className="bottom_right_box fl">
                      <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="房屋信息" key="1">
                            {/* archives: ""
                            area: 0
                            commercial: false
                            createDate: "2018-06-26 00:33:05"
                            delete: false
                            externalId: "10123b89421b377b6eeb2d08d1cbc3a8"
                            fieldLimit: "*"
                            housingPictureId: 11
                            id: 38
                            layer: 2
                            limit: 20
                            modifyDate: "2018-09-11 08:02:23"
                            oriented: ""
                            pictureAddress: "data:image/jpg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/"
                            room: "2-1-2-0201"
                            state: 1
                            storiedBuildingId: 41
                            unit: 1
                            usage: "rentOut"
                            zoneId: 3 */}
                            <div className="card_container">
                              <img className="house_plan" src={housePlan} />
            
                              <p>房屋信息：{housingDetail ? utils.getHouseUsage(housingDetail.usage) : ''}</p>
                              <p>房屋面积：{housingDetail ? housingDetail.area : ''}平方</p>
                              <p>居住人数：{housingUserTotal}人</p>
                              <p>租住时间：未知</p>
                              <p>房东姓名：未知</p>
                              <p>房东电话：未知</p>
                            </div>
                        </TabPane>
                        <TabPane tab="历史信息" key="2">
                            <div className="search_box">
                                <Row gutter={2}>
                                    <Col span={8}>
                                        <DatePicker className="search_form" locale={locale} onChange={this.onChange} />
                                    </Col>
                                    <Col span={8}>
                                        <DatePicker className="search_form" locale={locale} onChange={this.onChange} />
                                    </Col>
                                    <Col span={2}>
                                        <button><img src={SearchBtn} /></button>
                                    </Col>
                                </Row>
                            </div>



                            <div className="card_container card_history">
                              <div className="card_item">
                                <p>房屋信息：<span>群租房</span></p>
                                <p>房屋面积：120平方</p>
                                <p>居住人数：4人</p>
                                <p>租住时间：2018年9月-2019年9月</p>
                                <p>房东姓名：马文咯</p>
                                <p>房东电话：15232939312</p>   
                                <div className="ext_btn" onClick={this.showHouseModal}></div>      
                              </div>
                              <div className="card_item">
                                <p>房屋信息：<span>群租房</span></p>
                                <p>房屋面积：120平方</p>
                                <p>居住人数：4人</p>
                                <p>租住时间：2018年9月-2019年9月</p>
                                <p>房东姓名：马文咯</p>
                                <p>房东电话：15232939312</p>   
                                <div className="ext_btn" onClick={this.showHouseModal}></div>      
                              </div> 
                              <div className="card_item">
                                <p>房屋信息：<span>群租房</span></p>
                                <p>房屋面积：120平方</p>
                                <p>居住人数：4人</p>
                                <p>租住时间：2018年9月-2019年9月</p>
                                <p>房东姓名：马文咯</p>
                                <p>房东电话：15232939312</p>   
                                <div className="ext_btn" onClick={this.showHouseModal}></div>      
                              </div> 
                            </div>
                        </TabPane>
                      </Tabs>
                    </div>
                  </div> 
                </div>
            </Col>
            <Col span={6}  className="data_info_item data_info_right">
              <div className="data_info_right_item data_info_right_1">
                <div className="top_data_title1">
                  <div className="select_block">
                    <TopCascader {...toCascaderProps} />
                  </div>
                </div>
                <Row gutter={16}>
                  {/* 
                  Internet: 0
                  groupLive: 0
                  housingTotal: 847
                  other: 2
                  personalUse: 5
                  rentOut: 838 */}
                  <Col span={6} >
                          <div className="face_top_block">
                              {/* <img src={top_icon1}/> */}
                              <div className="img_block img_block1"></div>
                              <p className="face_top_label">自住</p>
                              <p className="face_top_value">{housingInfo ? housingInfo.personalUse : ''}</p>
                          </div>
                  </Col>
                  <Col span={6} >
                          <div className="face_top_block">
                              {/* <img src={top_icon2}/> */}
                              <div className="img_block img_block2"></div>
                              <p className="face_top_label">整租</p>
                              <p className="face_top_value">{housingInfo ? housingInfo.rentOut : ''}</p>
                          </div>
                  </Col>
                  <Col span={6} >
                          <div className="face_top_block">
                              {/* <img src={top_icon3}/> */}
                              <div className="img_block img_block3"></div>
                              <p className="face_top_label">群租</p>
                              <p className="face_top_value">{housingInfo ? housingInfo.groupLive : ''}</p>
                          </div>
                  </Col>
                  <Col span={6} >
                          <div className="face_top_block">
                              {/* <img src={top_icon4} /> */}
                              <div className="img_block img_block4"></div>
                              <p className="face_top_label">网约</p>
                              <p className="face_top_value">{housingInfo ? housingInfo.Internet : ''}</p>
                          </div>
                  </Col>
                </Row>
              </div>
              <div className="data_info_right_item data_info_right_2">
                <div className="select_container clearfix">
                  {/* <Cascader options={options} placeholder="Please select" /> */}
                  <Row gutter={8}>
                    <Col span={8}>
                      <div className="select_item fl">
                        <Select style={{ width: '100%' }}
                            value={homeBuild}
                            onChange={(value, option) => {
                              this.props.getRoomList(value, '', '')
                              let homeUnitList = []
                              let layerUnitList = []
                              for(let i=0; i < homeBuildListJson[value].unit; i++){
                                let num = i
                                num++
                                homeUnitList.push(num)
                              }
                              for(let i=0; i < homeBuildListJson[value].layer; i++){
                                let num = i
                                num++
                                layerUnitList.push(num)
                              }
                              this.props.changev({
                                homeUnitList: homeUnitList,
                                layerUnitList: layerUnitList,
                                homeRoomList: [],
                                homeBuildInfo: homeBuildList[option.key],
                                homeBuild: value,
                                homeUnit: 'all',
                                homeRoom: 'all',
                              })
                            }}
                          >
                            {buildOptions}
                        </Select>
                      </div>  
                    </Col>
                    <Col span={8}>
                      <div className="select_item fl">
                        <Select 
                          style={{ width: '100%' }}
                          value={homeUnit}
                          onChange={(value) => {
                            if(value == 'all') {
                              this.props.changev({
                                homeUnit: value,
                                homeRoom: value
                              })
                            } else {
                              this.props.getRoomList(homeBuild, value, '', () => {
                                this.props.changev({
                                  homeUnit: value,
                                })
                              })
                            }
                          }}
                        >
                          {unitOptions}
                        </Select>
                      </div>                    
                    </Col>
                    <Col span={8}>
                      <div className="select_item fl">
                        <Select 
                          style={{ width: '100%' }}
                          value={homeLayer} 
                            onChange={(value) => {
                              this.props.getRoomList(homeBuild, homeUnit, value, () => {
                                this.props.changev({
                                  homeLayer: value,
                                })
                              })
                              this.props.changev({
                                homeLayer: value
                              })
                            }}
                            >
                          {layerOptions}
                        </Select>
                      </div>
                    </Col>
                  </Row>  
                </div>
                <div className="card_container">
                  <Row gutter={8}>
                    {roomOptions}
                  </Row>
                </div>
              </div> 
            </Col>
          </Row>

          {/* 点位位置 */}
          <Modal
            width= "85rem"
            className="house_modal"
            visible={this.state.houseVisible}
            onOk={this.handleOk}
            onCancel={this.houseHandleCancel}
            footer={false}
          >
            <h3>历史居住</h3>
            <div className="house_block clearfix">
              <div className="house_img fl">
                <img alt="房间格局" src="https://avatars3.githubusercontent.com/u/12635613?v=4"/>
              </div>
              <div className="house_info fr">
                <p>地址：</p>
                <p>房屋信息：<span className="type_usage type_personal">群租房</span></p>
                <p>房屋面积：120平方</p>
                <p>租住时间：2018年9月-2019年9月</p>
                <p>房东姓名：马文咯</p>
                <p>房东电话：15232939312</p>
              </div>
            </div>
            <div className="history_block">
              <h3>居住人数：4人</h3>
              <div className="card_container">
                <Row gutter={8}>
                  <Col span="12">
                    <div className="card_item">
                      <img src="https://avatars3.githubusercontent.com/u/12635613?v=4"/>
                      <div className="person_info">
                        <p>姓名：账单</p>
                        <p>性别：账单</p>
                        <p>民族：账单</p>
                        <p>出生：账单</p>
                        <p>住址：账单</p>
                        <p>身份证：账单</p>
                        <p>关联车辆：
                          <span>浙A673A8</span>
                          <span>浙A3975X</span>
                        </p>
                      </div>
                    </div>
                    <div className="ext_btn"></div>
                  </Col>
                  <Col span="12">
                    <div className="card_item">
                      <img src="https://avatars3.githubusercontent.com/u/12635613?v=4"/>
                      <div className="person_info">
                        <p>姓名：账单</p>
                        <p>性别：账单</p>
                        <p>民族：账单</p>
                        <p>出生：账单</p>
                        <p>住址：账单</p>
                        <p>身份证：账单</p>
                        <p>关联车辆：
                          <span>浙A673A8</span>
                          <span>浙A3975X</span>
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col span="12">
                    <div className="card_item">
                      <img src="https://avatars3.githubusercontent.com/u/12635613?v=4"/>
                      <div className="person_info">
                        <p>姓名：账单</p>
                        <p>性别：账单</p>
                        <p>民族：账单</p>
                        <p>出生：账单</p>
                        <p>住址：账单</p>
                        <p>身份证：账单</p>
                        <p>关联车辆：
                          <span>浙A673A8</span>
                          <span>浙A3975X</span>
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col span="12">
                    <div className="card_item">
                      <img src="https://avatars3.githubusercontent.com/u/12635613?v=4"/>
                      <div className="person_info">
                        <p>姓名：账单</p>
                        <p>性别：账单</p>
                        <p>民族：账单</p>
                        <p>出生：账单</p>
                        <p>住址：账单</p>
                        <p>身份证：账单</p>
                        <p>关联车辆：
                          <span>浙A673A8</span>
                          <span>浙A3975X</span>
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Modal>

          <Modal
            width= "91rem"
            className="house_modal house2_modal"
            visible={this.state.house2Visible}
            onOk={this.handleOk}
            onCancel={this.house2HandleCancel}
            footer={false}
          >
            <h3>历史居住</h3>
            <div className="house_block clearfix">
              <div className="house_img fl">
                <img alt="房间格局" src="https://avatars3.githubusercontent.com/u/12635613?v=4"/>
              </div>
              <div className="house_info fr">
                <p>地址：</p>
                <p>房屋信息：<span className="type_usage type_personal">群租房</span></p>
                <p>房屋面积：120平方</p>
                <p>租住时间：2018年9月-2019年9月</p>
                <p>房东姓名：马文咯</p>
                <p>房东电话：15232939312</p>
              </div>
            </div>
            <div className="history_block">
              <h3>居住人数：4人</h3>
              <div className="tabs_block">
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                  <TabPane tab="1号房间" key="1">
                    <div className="card_container">
                      <Row gutter={8}>
                        <Col span="12">
                          <div className="card_item">
                            <img src="https://avatars3.githubusercontent.com/u/12635613?v=4"/>
                            <div className="person_info">
                              <p>姓名：账单</p>
                              <p>性别：账单</p>
                              <p>民族：账单</p>
                              <p>出生：账单</p>
                              <p>住址：账单</p>
                              <p>身份证：账单</p>
                              <p>关联车辆：
                                <span>浙A673A8</span>
                                <span>浙A3975X</span>
                              </p>
                            </div>
                          </div>
                          <div className="ext_btn"></div>
                        </Col>
                        <Col span="12">
                          <div className="card_item">
                            <img src="https://avatars3.githubusercontent.com/u/12635613?v=4"/>
                            <div className="person_info">
                              <p>姓名：账单</p>
                              <p>性别：账单</p>
                              <p>民族：账单</p>
                              <p>出生：账单</p>
                              <p>住址：账单</p>
                              <p>身份证：账单</p>
                              <p>关联车辆：
                                <span>浙A673A8</span>
                                <span>浙A3975X</span>
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col span="12">
                          <div className="card_item">
                            <img src="https://avatars3.githubusercontent.com/u/12635613?v=4"/>
                            <div className="person_info">
                              <p>姓名：账单</p>
                              <p>性别：账单</p>
                              <p>民族：账单</p>
                              <p>出生：账单</p>
                              <p>住址：账单</p>
                              <p>身份证：账单</p>
                              <p>关联车辆：
                                <span>浙A673A8</span>
                                <span>浙A3975X</span>
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col span="12">
                          <div className="card_item">
                            <img src="https://avatars3.githubusercontent.com/u/12635613?v=4"/>
                            <div className="person_info">
                              <p>姓名：账单</p>
                              <p>性别：账单</p>
                              <p>民族：账单</p>
                              <p>出生：账单</p>
                              <p>住址：账单</p>
                              <p>身份证：账单</p>
                              <p>关联车辆：
                                <span>浙A673A8</span>
                                <span>浙A3975X</span>
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col span="12">
                          <div className="card_item">
                            <img src="https://avatars3.githubusercontent.com/u/12635613?v=4"/>
                            <div className="person_info">
                              <p>姓名：账单</p>
                              <p>性别：账单</p>
                              <p>民族：账单</p>
                              <p>出生：账单</p>
                              <p>住址：账单</p>
                              <p>身份证：账单</p>
                              <p>关联车辆：
                                <span>浙A673A8</span>
                                <span>浙A3975X</span>
                              </p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </TabPane>
                  <TabPane tab="2号房间" key="2">
                    <div className="card_container">
                      <Row gutter={8}>
                        <Col span="12">
                          <div className="card_item">
                            <img src="https://avatars3.githubusercontent.com/u/12635613?v=4"/>
                            <div className="person_info">
                              <p>姓名：账单</p>
                              <p>性别：账单</p>
                              <p>民族：账单</p>
                              <p>出生：账单</p>
                              <p>住址：账单</p>
                              <p>身份证：账单</p>
                              <p>关联车辆：
                                <span>浙A673A8</span>
                                <span>浙A3975X</span>
                              </p>
                            </div>
                          </div>
                          <div className="ext_btn"></div>
                        </Col>
                        <Col span="12">
                          <div className="card_item">
                            <img src="https://avatars3.githubusercontent.com/u/12635613?v=4"/>
                            <div className="person_info">
                              <p>姓名：账单</p>
                              <p>性别：账单</p>
                              <p>民族：账单</p>
                              <p>出生：账单</p>
                              <p>住址：账单</p>
                              <p>身份证：账单</p>
                              <p>关联车辆：
                                <span>浙A673A8</span>
                                <span>浙A3975X</span>
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col span="12">
                          <div className="card_item">
                            <img src="https://avatars3.githubusercontent.com/u/12635613?v=4"/>
                            <div className="person_info">
                              <p>姓名：账单</p>
                              <p>性别：账单</p>
                              <p>民族：账单</p>
                              <p>出生：账单</p>
                              <p>住址：账单</p>
                              <p>身份证：账单</p>
                              <p>关联车辆：
                                <span>浙A673A8</span>
                                <span>浙A3975X</span>
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col span="12">
                          <div className="card_item">
                            <img src="https://avatars3.githubusercontent.com/u/12635613?v=4"/>
                            <div className="person_info">
                              <p>姓名：账单</p>
                              <p>性别：账单</p>
                              <p>民族：账单</p>
                              <p>出生：账单</p>
                              <p>住址：账单</p>
                              <p>身份证：账单</p>
                              <p>关联车辆：
                                <span>浙A673A8</span>
                                <span>浙A3975X</span>
                              </p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </Modal>
        </div>
      // </Spin>
    )
  }
}

export default House;
