/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../actions/Zone'
import $ from 'jquery'
import {
  Row,
  Col,
  Spin,
  Tag,
  Checkbox,
  Pagination,
  // EnterAnimation
} from 'antd'
import '../style/Zone.less'
import {
  POLICE_INDEX_REALTIME_MAC,
  POLICE_INDEX_REALTIME_CAR,
  POLICE_INDEX_REALTIME_DOOR, 
  POLICE_INDEX_REALTIME_FACE,
} from '../../../../fetch/apis'
import utils from '../../../../util/util';

import mapStyleJson from '../../../../static/json/mapStyleJson.json'
import marker_blue from '../../../../static/images/gawing/marker_blue.png'

import marker_xq1 from '../../../../static/images/zhafsq/marker_xq1.png'
import marker_xq2 from '../../../../static/images/zhafsq/marker_xq2.png'
import marker_xq3 from '../../../../static/images/zhafsq/marker_xq3.png'
import marker_gz from '../../../../static/images/zhafsq/marker_gz.png'
import marker_ll from '../../../../static/images/zhafsq/marker_ll.png'
import marker_fw from '../../../../static/images/zhafsq/marker_fw.png'
import marker_dw from '../../../../static/images/zhafsq/marker_dw.png'
import marker_af from '../../../../static/images/zhafsq/marker_af.png'
import marker_cr from '../../../../static/images/zhafsq/marker_cr.png'
import marker_wy from '../../../../static/images/zhafsq/marker_wy.png'



import marker_face from '../../../../static/images/zhafsq/marker_face.png'
import marker_car_brake from '../../../../static/images/zhafsq/marker_car_brake.png'
import marker_entrance_guard from '../../../../static/images/zhafsq/marker_entrance_guard.png'
import marker_ball_camera from '../../../../static/images/zhafsq/marker_ball_camera.png'
import marker_ball_camera_grey from '../../../../static/images/zhafsq/marker_ball_camera_grey.png'
import marker_mac from '../../../../static/images/zhafsq/marker_mac.png'



import listIcon1 from '../../../../static/images/zhafsq/list_icon1.png'
import listIcon2 from '../../../../static/images/zhafsq/list_icon2.png'
import listIcon3 from '../../../../static/images/zhafsq/list_icon3.png'
import dahuaLogo from '../../../../static/images/zhafsq/dahua_logo_s.png'
import hikLogo from '../../../../static/images/zhafsq/hik_logo_s.png'

import pic00 from '../../../../static/images/zhafsq/pic00.png'
import pic01 from '../../../../static/images/zhafsq/pic01.png'
import pic02 from '../../../../static/images/zhafsq/pic02.png'
import pic03 from '../../../../static/images/zhafsq/pic03.png'
import pic04 from '../../../../static/images/zhafsq/pic04.png'
import pic05 from '../../../../static/images/zhafsq/pic05.png'
import pic06 from '../../../../static/images/zhafsq/pic06.png'

import IndexTopHeader from '../../component/IndexTopHeader/IndexTopHeader'
import TopCascaderModal from '../../component/TopCascaderModal/TopCascaderModal'

import '../../../../static/css/animate.css';
import '../../../../static/css/tooltip-line.css';

import {
  xqJson1,
  xqJson2,
  xqJson3,
  // gzJson,
  // llJson,
  // fwJson,
  // dwJson,
  // afJson,
  // crJson,
  wyJson,
  tabsData,
  devDataSet
} from './markerJsonData'

const plainOptions = ['xq1', 'xq2', 'xq3'];
const defaultCheckedList = ['xq1', 'xq3'];
Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

@connect(
  state => state,
  { ...actions }
)

class Zone extends Component {
  constructor(props) {
    super(props)
    this.initMap = this.initMap.bind(this)
    this.addWindow = this.addWindow.bind(this)

    this.state = {
      map: null,
      time: null,
      barHeight: 0,
      bottomData: null,
      boxVisiable: true,
      cascaderLabel: localStorage.getItem('label') ? localStorage.getItem('label') : '拱墅区',
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      finalCheck: [],
      childTabData: tabsData.face,
      qualityData: [],
      bottomlist: [],
      gzJson: [],
      llJson: [],
      fwJson: [],
      dwJson: [],
      afJson: [],
      crJson: [],
      datatype:[],
      tab2_value: 'face0',
      defaultLevelInfo: {
        label: "拱墅区",
        level: "districtId",
        value: "2"
      },
      subLevelInfo: {
        label: "拱墅区",
        level: "districtId",
        value: "2"
      }
    }
  }

  pageOnChange = (pageNumber) => {
    var tab2_value = this.state.tab2_value
    this.props.getDevData(devDataSet[tab2_value].type, devDataSet[tab2_value].response, pageNumber)
  }

  // 切换子级tab (1-人脸 2-开门 3-过车 4-mac 5-监控 6-消防 7-位移 8-CK 9-联防 )
  changeChildTabs = (e) => {
    var d = $(e.target);
    d.siblings().removeClass('active')
    d.addClass('active')
    var tab1_value = $(e.target).data('value');
    switch (tab1_value) {
      case 'face':
        this.props.getDevData(1, 'pointPositions')
        this.setState({
          childTabData: tabsData['face'],
          tab2_value: 'face0'
        })
        break;
      case 'door':
        this.props.getDevData(2, 'pointPositions')
        this.setState({
          childTabData: tabsData['door'],
          tab2_value: 'door0'
        })
        break;
      case 'car':
        this.props.getDevData(3, 'pointPositions')
        this.setState({
          childTabData: tabsData['car'],
          tab2_value: 'car0'
        })
        break;
      case 'monitor':
        this.props.getDevData(5, 'data')
        this.setState({
          childTabData: tabsData['monitor'],
          tab2_value: 'monitor0'
        })
        break;
      case 'mac':
        this.props.getDevData(4, 'pointPositions')
        this.setState({
          childTabData: tabsData['mac'],
          tab2_value: 'mac0'
        })
        break;
      default:
        break;
    }
    $('#top_tab_container').find('li').removeClass('active')
    $('#top_tab_container').find('li').eq(0).addClass('active')
  }

  // 切换子级tab列表数据
  getChildTabsData = (e) => {
    var d = $(e.target);
    d.siblings().removeClass('active')
    d.addClass('active')
    var tab2_value = $(e.target).attr('data-value');
    console.log(tab2_value);
    
    this.setState({
      tab2_value: tab2_value
    })
    switch (tab2_value) {
      case 'face1':
        this.props.getBottomlist(POLICE_INDEX_REALTIME_FACE)
        break;
      case 'door1':
        this.props.getBottomlist(POLICE_INDEX_REALTIME_DOOR)
        break;
      case 'car1':
        this.props.getBottomlist(POLICE_INDEX_REALTIME_CAR)
        break;
      case 'mac1':
        this.props.getBottomlist(POLICE_INDEX_REALTIME_MAC)
        break;
      default:  
        this.props.getDevData(devDataSet[tab2_value].type, devDataSet[tab2_value].response)
        break;
    }
  }

  onCheckboxSimpleChange = (e) => {
    var _this = this
    var checked = e.target.checked
    var value = e.target.value
    var dqChecked = this.state.finalCheck
    var map = this.state.map
    if (checked) {
      dqChecked.push(value)
      _this.setState({
        finalCheck: dqChecked
      })
    } else {
      dqChecked.remove(value)
      _this.setState({
        finalCheck: dqChecked
      })
    }
    if (map) {
      this.dealMarker(map, dqChecked)
    }
  }

  onChange = (checkedList) => {
    var dqChecked = this.state.finalCheck
    var map = this.state.map
    dqChecked.remove("xq1")
    dqChecked.remove("xq2")
    dqChecked.remove("xq3")
    dqChecked = dqChecked.concat(checkedList)
    console.log(dqChecked)
    this.setState({
      finalCheck: dqChecked,
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
    console.log(this.state.finalCheck)
    if (map) {
      this.dealMarker(map, dqChecked)
    }
  }

  onCheckAllChange = (e) => {
    var dqChecked = this.state.finalCheck
    var map = this.state.map
    dqChecked.remove("xq1")
    dqChecked.remove("xq2")
    dqChecked.remove("xq3")
    dqChecked = e.target.checked ? dqChecked.concat(plainOptions) : dqChecked
    console.log(dqChecked)
    this.setState({
      finalCheck: dqChecked,
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
    console.log(this.state.finalCheck)
    if (map) {
      this.dealMarker(map, dqChecked)
    }
  }

  CheckboxGroupOpen = (e) => {
    $(e.target).siblings('.marker_checkbox_group').toggleClass('show')
  }

  // 初始化地图
  initMap = (map, Long, Dat) => {
    const point = new BMap.Point(Long, Dat);
    map.centerAndZoom(point, 14);
  }

  // 类型(1-人脸 2-开门 3-过车 4-mac 5-监控 6-消防 7-位移 8-CK 9-联防 )
  // 编写自定义函数,创建标注
  dealMarker = (map, finalCheck) => {
    map.clearOverlays();
    finalCheck.forEach((item, index) => {
      switch (item) {
        case 'xq1':
          this.addMarker(map, 'xq1', xqJson1, marker_xq1)
          break;
        case 'xq2':
          this.addMarker(map, 'xq2', xqJson2, marker_xq2)
          break;
        case 'xq3':
          this.addMarker(map, 'xq3', xqJson3, marker_xq3)
          break;
        case '1':
          this.addMarker(map, '1', this.props.ZHAFZone.xqJson, marker_face)
          break;
        case '2':
          this.addMarker(map, '2', this.props.ZHAFZone.gzJson, marker_entrance_guard)
          break;
        case '3':
          this.addMarker(map, '3', this.props.ZHAFZone.llJson, marker_car_brake)
          break;
        case '4':
          this.addMarker(map, '4', this.props.ZHAFZone.fwJson, marker_mac)
          break;
        case '5':
          this.addMarker(map, '5', this.props.ZHAFZone.dwJson, marker_ball_camera)
          break;
        case '6':
          this.addMarker(map, '6', this.props.ZHAFZone.afJson, marker_af)
          break;
        case '7':
          this.addMarker(map, '7', this.props.ZHAFZone.crJson, marker_cr)
          break;
        case 'wy':
          this.addMarker(map, 'wy', wyJson, marker_wy)
          break;
        default:
          break;
      }
    });
  }

  // 编写自定义函数,创建标注
  addMarker = (map, type, points, marker_img) => {
    if (points) {   
      let marker_img_grey = marker_img + '_grey'
      switch (type) {
        case '5':
          points.data.forEach((item, index) => {
            if (item.longitude && item.latitude) {
              var point = new BMap.Point(item.longitude, item.latitude);
              const markerIcon = new BMap.Icon(marker_img, new BMap.Size(16, 16));
              var marker = new BMap.Marker(point, {
                icon: markerIcon,
                title: item.name
              });
              map.addOverlay(marker);
            }
          });
          points.fault.forEach((item, index) => {
            if (item.longitude && item.latitude) {
              var point = new BMap.Point(item.longitude, item.latitude);
              const markerIcon = new BMap.Icon(marker_img_grey, new BMap.Size(16, 16));
              var marker = new BMap.Marker(point, {
                icon: markerIcon,
                title: item.name
              });
              map.addOverlay(marker);
            }
          });
          break;
        default:
          points.forEach((item, index) => {
            if (item.longitude && item.latitude) {         
              var point = new BMap.Point(item.longitude, item.latitude);
              const markerIcon = new BMap.Icon(marker_img, new BMap.Size(16, 16));
              var marker = new BMap.Marker(point, {
                icon: markerIcon,
                title: item.name
              });
              map.addOverlay(marker);
            }
          });
          break;
      }
    }
  }

  // 编写自定义函数,创建标注
  addWindow = (map, services) => {
    services.forEach((item, index) => {
      if (item.longitude && item.latitude) {
        var point = new BMap.Point(item.longitude, item.latitude);
        const blueIcon = new BMap.Icon(marker_blue, new BMap.Size(16, 16));
        var marker = new BMap.Marker(point, {
          icon: blueIcon,
          title: item.name
        });

        map.addOverlay(marker);
      }
    });
  }

  // 添加地图区域边界
  getBoundary = () => {
    var lastply = this.state.ply
    var map = this.state.map
    if (lastply) {
      lastply.enableMassClear();
      map.clearOverlays(lastply)      
    }
    var boundaries = this.props.ZHAFZone.boundaries
    var count = boundaries.length;
    for (var i = 0; i < count; i++) {
      var ply = new BMap.Polygon(boundaries[i], {
        strokeWeight: 2,
        strokeColor: 'rgb(139, 246, 235)',
        strokeOpacity: 0.0,
        fillOpacity: 0.3,
        fillColor: "#000000"
      }); 
      ply.disableMassClear();
      map.addOverlay(ply);  
    }
    this.setState({
      ply: ply
    })
  }

  changeLevel = () => {
    var subLevelInfo = this.state.subLevelInfo   
    this.setState({
      defaultLevelInfo:{
        label: subLevelInfo.label,
        level: subLevelInfo.level,
        value: subLevelInfo.value
      }
    })
    localStorage.setItem('level', subLevelInfo.level)
    localStorage.setItem('levelId', subLevelInfo.value)
    localStorage.setItem('label', subLevelInfo.label)
    this.allPost()
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

  allPost(){
    this.props.getDevData(devDataSet['face0'].type, devDataSet['face0'].response)
    this.props.getLevel()
    this.props.getLeftData()
    this.props.getPerceptionData()
    this.props.getXqList()
    // (1-人脸 2-开门 3-过车 4-mac 5-监控 6-消防 7-位移 8-CK 9-联防 )
    this.props.getPointPositionlist('1', 'xqJson')
    this.props.getPointPositionlist('2', 'gzJson')
    this.props.getPointPositionlist('3', 'llJson')
    this.props.getPointPositionlist('4', 'fwJson')
    this.props.getPointPositionlist('5', 'dwJson')
    this.props.getBoundaries(()=>{
      this.getBoundary()
      if (this.state.map && this.state.finalCheck) {
        this.dealMarker(this.state.map, this.state.finalCheck)
      }    
    })
  }

  componentWillMount() {
    this.allPost()
  }

  componentDidMount() {
    let _this = this
    let screenH = document.documentElement.clientHeight
    let screenW = document.documentElement.clientWidth
    let mainDom = document.getElementsByClassName("data_info_item")
    let leftBottom = document.querySelector(".data_info_left_bottom")
    let pageContainer = document.querySelector(".page-container")
    // mainDom[0].style.height = screenH/12 + 'rem'
    // mainDom[1].style.height = screenH/12 + 'rem'
    pageContainer.style.height = screenH + 'px'
    leftBottom.style.height = screenH + 'px'
    leftBottom.style.width = screenW + 'px'

    const map = new BMap.Map("dimap", { MAXZOOM: 18 });
    // 初始化地图,设置中心点坐标和地图级别
    var point = new BMap.Point(120.149018, 30.32539);
    map.centerAndZoom(point, 14);
  
    let Long, Dat;
    const {
      xqInfo
    } = this.props.ZHAFZone
    if (xqInfo && xqInfo.longitude && xqInfo.latitude) {
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
      style: 'midnight',
      // styleJson: mapStyleJson
    });

    window.onresize = function () {
      let screenH = document.documentElement.clientHeight
      let screenW = document.documentElement.clientWidth
      let mainDom = document.getElementsByClassName("data_info_item")
      let leftBottom = document.querySelector(".data_info_left_bottom")
      let pageContainer = document.querySelector(".page-container")
      pageContainer.style.height = screenH + 'px'
      pageContainer.style.width = screenW + 'px'
      leftBottom.style.height = screenH + 'px'
      leftBottom.style.width = screenW + 'px'
      let barWrapDom = document.querySelector('.data_info_right_4')
      let barWrapDomHeight = utils.getStyle(barWrapDom, 'height').height
      _this.setState({
        barHeight: parseFloat(barWrapDomHeight.split('px')[0])
      })
    }
    clearTimeout(timer2)
    let timer2 = setTimeout(() => {
      let barWrapDom = document.querySelector('.data_info_right_4')
      let barWrapDomHeight = utils.getStyle(barWrapDom, 'height').height
      this.setState({
        barHeight: parseFloat(barWrapDomHeight.split('px')[0])
      })
    }, 1000)
    this.setState({
      map: map
    })
  }



  render() {    
    const {
      bottomData,
      boxVisiable,
      liveDataType,
      childTabData,
      cascaderLabel,
      tab2_value,
    } = this.state

    const {
      diLoading,
      liLoading,
      level,
      leftdata,
      qualityData,
      bottomlist,
      xqlist,
      rightData
    } = this.props.ZHAFZone

    let leftDataArr = [
      {
          pic: pic01,
          title: "实有人口",
          href: "/zhaf/zonepop",
          value: leftdata ? leftdata.userTotal : ""
      },{
          pic: pic02,
          title: "实有房屋",
          href: "/zhaf/house",
          value: leftdata ? leftdata.housingTotal : ""
      },{
          pic: pic03,
          title: "实有单位",
          href: "/zhaf/institution",
          value:leftdata ? leftdata.organization : ""
      },{
          pic: pic04,
          title: "实有安防设施",
          href: "/zhaf/security",
          value:leftdata ? leftdata.securityEquipment : ""
      },{
          pic: pic05,
          title: "实有力量与装备",
          href: "/zhaf/strength",
          value: leftdata ? leftdata.powerEquipment : ""
      },{
          pic: pic06,
          title: "实有警情事件",
          href: "/zhaf/alarm",
          value: leftdata ? leftdata.alarm : ""
      },
    ]

    let indexTopHeaderProps = null
    if (level) {
      indexTopHeaderProps = {
        supportChangeLevel: true,
        confirmCascaderChange: this.confirmCascaderChange,
        changeOnSelect: true,
        level: level,
        label: cascaderLabel,
        titleType: 'type2',
        title: '智慧安防社区系统',
        subTitle: '蔡马人家',
      }
    }

    var rightDom = ''

    switch (tab2_value) {
      case 'face1':
        // 人脸实时数据
        rightDom = rightData && rightData.list && rightData.list.length>0 ? rightData.list.map((item, key) => {
          return(
            <div key={key} className="list_card">
              <img className="catch_pic" src={'http://41.198.198.31:81/' + item.apiUrlCatch}></img>
              <div className="list_container">
                <p><img src={listIcon1} />{item.userName ? item.userName : '未知'}</p>
                <p><img src={listIcon2} />{item.inOutDate}</p>
                <p><img src={listIcon3} />{item.equipmentChannelName}</p>
              </div>
            </div>
          )
        }) : <div className="nodata">暂无数据</div>
        break;
      case 'door1':
        // 门闸实时数据
        rightDom = rightData && rightData.list && rightData.list.length>0 ? rightData.list.map((item, key) => {
          return(
            <div key={key} className="list_card">
              <img className="catch_pic" src={'http://41.198.198.31:81/' + item.apiUrlCatch}></img>
              <div className="list_container">
                <p><img src={listIcon1} />{item.userName ? item.userName : '未知'}</p>
                <p><img src={listIcon2} />{item.inOutDate}</p>
                <p><img src={listIcon3} />【{item.zoneId}】{item.equipmentChannelName}</p>
              </div>
            </div>
          )
        }) : <div className="nodata">暂无数据</div>
        break;
      case 'car1':
        // 车闸实时数据
        rightDom = rightData && rightData.list && rightData.list.length>0 ? rightData.list.map((item, key) => {
          return(
            <div key={key} className="list_card">
              <img className="catch_pic" src={'http://41.198.198.31:81/' + item.apiUrlCatch}></img>
              <div className="list_container">
                <p><img src={listIcon1} />{item.userName} {item.licenseNumber}</p>
                <p><img src={listIcon2} />{item.inOutDate}</p>
                <p><img src={listIcon3} />【{item.zoneId}】{item.equipmentChannelName}</p>
              </div>
            </div>
          )
        }) : <div className="nodata">暂无数据</div>
        break;
      default:
        rightDom = rightData && rightData.list && rightData.list.length>0 ? rightData.list.map((item, key) => {
          return(
            <div key={key} className="list_card">
              <img className="catch_pic" src={item.supplier == "大华" ? dahuaLogo : hikLogo}></img>
              <div className="list_container">
                <p>点位名称：<span title={item.name} className="text-overflow">{item.name}</span> {item.status==0 ? <Tag color="#f50">离线</Tag> : <Tag color="#87d068">在线</Tag>}</p>
                <p>运营单位：{item.zoneName}</p>
                <p>经纬度：{item.latitude + " " + item.longitude}</p>
              </div>
            </div>
          )
        }) : <div className="nodata">暂无数据</div>
        break;
    }

    let currPage = null
    let pageSize = null
    let totalCount = null

    if (rightData && rightData.list) {
      currPage = rightData.currPage
      pageSize = rightData.pageSize
      totalCount = rightData.totalCount
    }

    return (
      <Spin size="large" spinning={diLoading}>
        {/* animated slideInLeft */}
        <div className="page-container">

          <div className="data_info_left_bottom" id="dimap"></div>

          <div className="top_fix">
            <IndexTopHeader {...indexTopHeaderProps} />
          </div>

          {/* 类型(1-人脸 2-开门 3-过车 4-mac 5-监控 6-消防 7-位移 8-CK 9-联防 ) */}
          {/*  style={{display: 'none'}} */}
          <div className={boxVisiable ? 'bottom_fix animated zoomInUp' : 'bottom_fix box_closed animated pulse'}>
            <div className="clearfix">
              <div className="marker_checkbox_container">
                {/* <div className="marker_checkbox_group_container">
                      <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                      ></Checkbox>
                      <span onClick={this.CheckboxGroupOpen}>小区</span>
                      <div className="marker_checkbox_group">
                        <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                      </div>
                    </div> */}
                <Checkbox value="1" onChange={this.onCheckboxSimpleChange}>人脸</Checkbox>
                <Checkbox value="2" onChange={this.onCheckboxSimpleChange}>门闸</Checkbox>
                <Checkbox value="3" onChange={this.onCheckboxSimpleChange}>车闸</Checkbox>
                <Checkbox value="5" onChange={this.onCheckboxSimpleChange}>监控</Checkbox>
                <Checkbox value="4" onChange={this.onCheckboxSimpleChange}>WIFI</Checkbox>
                <Checkbox value="6" onChange={this.onCheckboxSimpleChange} disabled>消防</Checkbox>
                <Checkbox value="7" onChange={this.onCheckboxSimpleChange} disabled>位移</Checkbox>
                <Checkbox value="wy" onChange={this.onCheckboxSimpleChange} disabled>CK</Checkbox>
              </div>
            </div>
          </div>

          <div className="left_fix">
            <div className="left_top_title">一标六实</div>
            <div className="galeftmid">
              <div className="galeftmidList">
                <ul>
                  {
                    leftDataArr.map((item, index) => {
                      return (
                        <a key={index} href={item.href}>
                          <li >
                            <img src={item.pic} alt={item.title} />
                            <em>{item.title}</em>
                            <span>{item.value}</span>
                          </li>
                        </a>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </div>

          <div className="right_fix">
            {/* 模型应用 */}
            <div className="data_info_right_item data_info_right_4">
              <div className="right_bottom_tab clearfix">
                <div className="tab_left">
                  <ul>
                    <li onClick={this.changeChildTabs} data-value="face" className="active">人脸</li>
                    <li onClick={this.changeChildTabs} data-value="door">开门</li>
                    <li onClick={this.changeChildTabs} data-value="car">过车</li>
                    <li onClick={this.changeChildTabs} data-value="monitor">监控</li>
                    <li onClick={this.changeChildTabs} data-value="mac">WIFI</li>
                    <li className="disabled">消防</li>
                    <li className="disabled">位移</li>
                    <li className="disabled">CK</li>
                    <li className="disabled">联防</li>
                  </ul>
                </div>
                <div className="right_block">
                  <div className="tab_top">
                    <ul id="top_tab_container" className="clearfix">
                      {/* <li className="active">全部</li>
                      <li>在逃人员</li>
                      <li>临时布控</li>
                      <li>吸毒人员</li>
                      <li>人员人员1</li>
                      <li>人员人员2</li>
                      <li>人员人员3</li> */}
                      {childTabData.map((item, key) => {
                        return (
                          <li key={key} onClick={this.getChildTabsData} className={key == 0 ? 'active' : ''} data-value={item.value}>{item.label}</li>
                        )
                      })}
                    </ul>
                  </div>

                  <div className="list_block">
                    <Spin spinning={liLoading}>
                      {rightDom}
                    </Spin>
                  </div>
                  
                  <Pagination 
                    current={currPage}
                    pageSize={pageSize}
                    total={totalCount}
                    onChange={this.pageOnChange} 
                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    )
  }
}

export default Zone;

// 地图边界，tabs切换