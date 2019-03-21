/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../actions/NewIndex'
import $ from 'jquery'
import {
  Row,
  Col,
  Spin,
  Card,
  AutoComplete,
  Input,
  Menu,
  Checkbox,
  Button,
  // EnterAnimation
} from 'antd'

import QueueAnim from 'rc-queue-anim';
import '../style/NewIndex.less'
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

import rightTopTitle from '../../../../static/images/zhafsq/border_after_index.png'
import listIcon1 from '../../../../static/images/zhafsq/list_icon1.png'
import listIcon2 from '../../../../static/images/zhafsq/list_icon2.png'
import listIcon3 from '../../../../static/images/zhafsq/list_icon3.png'

import IndexLeftDataBlock from '../../component/IndexLeftDataBlock/IndexLeftDataBlock'
import IndexTopHeader from '../../component/IndexTopHeader/IndexTopHeader'
import XQHouseTypePie from './XQHouseTypePie'
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
} from './markerJsonData'


const { Meta } = Card
const CheckboxGroup = Checkbox.Group;
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const Search = Input.Search;

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

class NewIndex extends Component {
  constructor(props) {
    super(props)
    this.initMap = this.initMap.bind(this)
    this.addWindow = this.addWindow.bind(this)
    this.restartLiveData = this.restartLiveData.bind(this)
    this.state = {
      timeBottom: null,
      map: null,
      time: null,
      pieHeight: 0,
      barHeight: 0,
      bottomData: null,
      nowleval: null,
      boxVisiable: true,
      saveMacData: [],
      returnMacData: [],
      cascaderLabel: localStorage.getItem('label') ? localStorage.getItem('label') : '拱墅区',
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      finalCheck: [],
      childTabData: tabsData.distribution,
      qualityData: [],
      zong: [],
      bottomlist: [],
      village: [],
      gzJson: [],
      llJson: [],
      fwJson: [],
      dwJson: [],
      afJson: [],
      crJson: [],
      datatype:[],
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

  // <li onClick={this.changeChildTabs} data-value="distribution" className="active">布控类</li>
  // <li onClick={this.changeChildTabs} data-value="person">人员类</li>
  // <li onClick={this.changeChildTabs} data-value="car">车辆类</li>
  // <li onClick={this.changeChildTabs} data-value="zone">小区类</li>

  // 切换子级tab
  changeChildTabs = (e) => {
    var d = $(e.target);
    d.siblings().removeClass('active')
    d.addClass('active')
    var tab1_value = $(e.target).data('value');
    switch (tab1_value) {
      case 'distribution':
        this.setState({
          childTabData: tabsData['distribution']
        })
        break;
      case 'person':
        this.setState({
          childTabData: tabsData['person']
        })
        break;
      case 'car':
        this.setState({
          childTabData: tabsData['car']
        })
        break;
      case 'zone':
        this.setState({
          childTabData: tabsData['zone']
        })
        break;
      default:
        break;
    }
  }

  // 切换子级tab列表数据
  getChildTabsData = (e) => {
    var d = $(e.target);
    d.siblings().removeClass('active')
    d.addClass('active')
    var tab2_value = $(e.target).attr('data-value');
    console.log(d)
    console.log(tab2_value)
  }

  // 横向tab滚动
  tabScoll = (e) => {
    e.preventDefault();
    var d = $(e.target)
    var d2 = $('#top_tab_container')
    var d2li = $('#top_tab_container li').eq(0)
    var dclass = d.attr('class')
    if (dclass == "arrow-left") {
      var scollLen = Math.abs(d2li.position().left - 20 + 93) > 93 ? Math.abs(d2li.position().left - 20 + 93) : 0;
      console.log(scollLen);
      d2.scrollLeft(scollLen)
    } else {
      var scollLen = Math.abs(d2li.position().left - 20 - 93);
      console.log(scollLen);
      d2.scrollLeft(scollLen)
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

  // 类型(1-小区 2-动态感知 3-实有力量 4-实有房屋 5-实有单位 6-实有安防 7-小区出入口 8-窨井盖)
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
          this.addMarker(map, '1', this.props.ZHAFIndex.xqJson, marker_xq3)
          break;
        case '2':
          this.addMarker(map, '2', this.props.ZHAFIndex.gzJson, marker_gz)
          break;
        case '3':
          this.addMarker(map, '3', this.props.ZHAFIndex.llJson, marker_ll)
          break;
        case '4':
          this.addMarker(map, '4', this.props.ZHAFIndex.fwJson, marker_fw)
          break;
        case '5':
          this.addMarker(map, '5', this.props.ZHAFIndex.dwJson, marker_dw)
          break;
        case '6':
          this.addMarker(map, '6', this.props.ZHAFIndex.afJson, marker_af)
          break;
        case '7':
          this.addMarker(map, '7', this.props.ZHAFIndex.crJson, marker_cr)
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
      
      switch (type) {
        case '3':
          points.forEach((item, index) => {
            if (item.GPS) {
              var p = item.GPS.split(',')
              var point = new BMap.Point(p[0], p[1]);
              const markerIcon = new BMap.Icon(marker_img, new BMap.Size(16, 16));
              var marker = new BMap.Marker(point, {
                icon: markerIcon,
                title: "["+ item.GPSID + "]" + item.DEV_TYPE + item.SLABLE
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
    var boundaries = this.props.ZHAFIndex.boundaries
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

  pushMacData = () => {
    var oldData = this.state.saveMacData;
    var getmacData = this.state.bottomData && this.state.bottomData.entranceGuardRecord ? this.state.bottomData.entranceGuardRecord : [];

    var newData = oldData.concat(getmacData)
    this.setState({
      saveMacData: newData
    })
    var num = Math.floor(Math.random() * 17 + 1);
    var returnMacData = []
    if (newData && newData.length > 20) {
      returnMacData = [newData[num], newData[num + 1], newData[num + 2]]
      this.setState({
        returnMacData: returnMacData
      })
    }
  }

  toggleBox = () => {
    var visiable = this.state.boxVisiable
    this.setState({
      boxVisiable: !visiable
    })
  }

  updateBottomlist = (url, type) => {
    this.props.getBottomlist(url)
    clearTimeout(this.state.timeBottom)
    let timeBottom = setInterval( () => {
      this.props.getBottomlist(url)
    }, 10000)
    this.setState({
      timeBottom: timeBottom,
      liveDataType: type
    })
  }

  restartLiveData(e) {
    let cid = '1'
    if (e) {
      $(e.target).siblings().removeClass('active')
      $(e.target).addClass('active')
      cid = $(e.target).attr('cid')    
    }
    if (cid == '1') {
      //人脸实时数据
      this.updateBottomlist(POLICE_INDEX_REALTIME_FACE, 1)
    } else if (cid == '2') {
      //车闸实时数据
      this.updateBottomlist(POLICE_INDEX_REALTIME_CAR, 2)
    } else if (cid == '3') {
      //探针实时数据
      this.updateBottomlist(POLICE_INDEX_REALTIME_MAC, 3)
    } else if (cid == '4') {
      //门禁实时数据
      this.updateBottomlist(POLICE_INDEX_REALTIME_DOOR, 4)
    }
  }

  autoCompleteSelect = (value, option) => {   
    var props = option.props
    // children: "西湖区"
    // data-value: "1" 
    // level: "districtId"
    this.setState({
      subLevelInfo:{
        label: props.children,
        level: props.level,
        value: props['data-value']
      }
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
    this.restartWebSocket()
  }


  allPost(){
    this.props.getLevel()
    this.props.getLeftData()
    this.props.getPerceptionData()
    this.props.getXqList()
    this.props.getPcsList()
    this.restartLiveData()
    {/* 类型(1-小区 2-动态感知 3-实有力量 4-实有房屋 5-实有单位 6-实有安防 7-小区出入口 8-窨井盖) */}
    this.props.getPointPositionlist('1', 'xqJson')
    this.props.getPointPositionlist('2', 'gzJson')
    this.props.getPointPositionlist('3', 'llJson')
    this.props.getPointPositionlist('4', 'fwJson')
    this.props.getPointPositionlist('5', 'dwJson')
    this.props.getPointPositionlist('6', 'crJson')
    this.props.getBoundaries(()=>{
      this.getBoundary()
      if (this.state.map && this.state.finalCheck) {
        this.dealMarker(this.state.map, this.state.finalCheck)
      }    
    })
  }

  componentWillMount() {
    localStorage.setItem('level', "districtId")
    localStorage.setItem('levelId', "2" )
    localStorage.setItem('label', "拱墅区")
    localStorage.setItem('levelValue', "2,,,")
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
    } = this.props.ZHAFIndex
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

    clearInterval(timer1)
    let timer1 = setInterval(() => {
      let nowTime = new Date().getTime();
      let weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      var weekDay = new Date().getDay();
      _this.setState({
        time: utils.timeToHMS(nowTime) + ' ' + weekArr[weekDay]
      })
    }, 1000)


    var callboarTimer;
    var callboard = $('#callboard');
    var callboardUl = callboard.find('ul');
    var callboardLi = callboard.find('li');
    var liLen = callboard.find('li').length;
    var initHeight = callboardLi.first().outerHeight(true);
    console.log(initHeight)
    function autoAnimation() {
      if (liLen <= 1) return;

      var callboardLiFirst = callboard.find('li').first();
      callboardLiFirst.animate({
        marginTop: -initHeight
      }, 500, function () {
        clearTimeout(callboarTimer);
        callboardLiFirst.appendTo(callboardUl).css({ marginTop: 0 });
        callboarTimer = setTimeout(autoAnimation, 5000);
      });
    }
    callboard.mouseenter(
      function () {
        clearTimeout(callboarTimer);
      }
    ).mouseleave(function () {
      callboarTimer = setTimeout(autoAnimation, 5000);
    });
    setTimeout(window.autoAnimation, 5000);


    window.onresize = function () {
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
      let pieWrapDom = document.querySelector('.data_info_right_3')
      let pieWrapDomHeight = utils.getStyle(pieWrapDom, 'height').height
      let barWrapDom = document.querySelector('.data_info_right_4')
      let barWrapDomHeight = utils.getStyle(barWrapDom, 'height').height
      _this.setState({
        pieHeight: parseFloat(pieWrapDomHeight.split('px')[0]),
        barHeight: parseFloat(barWrapDomHeight.split('px')[0])
      })
    }
    clearTimeout(timer2)
    let timer2 = setTimeout(() => {
      let pieWrapDom = document.querySelector('.data_info_right_3')
      let pieWrapDomHeight = utils.getStyle(pieWrapDom, 'height').height
      let barWrapDom = document.querySelector('.data_info_right_4')
      let barWrapDomHeight = utils.getStyle(barWrapDom, 'height').height
      this.setState({
        pieHeight: parseFloat(pieWrapDomHeight.split('px')[0]),
        barHeight: parseFloat(barWrapDomHeight.split('px')[0])
      })
    }, 1000)

    let timer3 = setInterval(() => {
      this.pushMacData()
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
    } = this.state

    const {
      diLoading,
      level,
      leftdata,
      qualityData,
      bottomlist,
      xqlist,
      pcslist
    } = this.props.ZHAFIndex

    var liveDataDom;

    var iType = {
      '1':'电话号码',
      '2':'IMEI',
      '3':'IMSI',
      '4':'QQ',
      '5':'微信',
      '6':'淘宝',
      '7':'新浪微博',
      '8':'腾讯微博',
      '9':'百度帐号',
      '10':'京东帐号',
      '11':'优酷帐号',
      '12':'米聊',
      '13':'携程旅行',
      '14':'滴滴',
      '15':'快的',
      '16':'陌陌'
    }    

    switch (liveDataType) {
      case 3:
        liveDataDom = bottomlist ? bottomlist.map((item, index) => {
          if (index < 6) {
            var msgType, thirdValue, inOutFlag
            switch (item.msgType) {
              case '2':
                msgType = '终端MAC'
                thirdValue = iType[item.identityType] ? iType[item.identityType] : '未知类型'
                break;
              case '4':
                msgType = '虚拟身份'
                thirdValue = item.mACAddress
                break;         
              default:
                msgType = '其他'
                thirdValue = '未知'
                break;
            }
            switch (item.inOutFlag) {
              case 2:
                inOutFlag = '离开'
                break;
              case 1:
                inOutFlag = '进入'
                break;
              default:
                inOutFlag = '离开'
                break;
            }
            return (
              <div key={index} className="mac_block">
                <p className="mac_item">捕获类型：{msgType}</p>
                <p className="mac_item">捕获时间：{utils.timeToHMSt(item.collectTime)}</p>
                <p className="mac_item">捕获信息：{thirdValue}</p>
                <p className="mac_item">状态：{inOutFlag}</p>
              </div>
            )
          }
        }) : ''
        break;
      default:
        liveDataDom = bottomlist ? bottomlist.map((item, index) => {
          if (index <= 6) {
            return (
              <div key={index} className="card_block">
                <Card
                  hoverable
                  style={{ width: 160 }}
                  cover={<img alt={item.pictureUrlCatch} src={'http://41.198.198.31:81/'+item.apiUrlCatch} />}
                >
                  <Meta
                    title={"【" + item.equipmentChannelName + "】" + item.label}
                    description={utils.timeToHMS(item.inOutDate)}
                  />
                </Card>
              </div>
            )
          }
        }) : ''
        break;
    }


    // 树形转线性
    function treeConvertList(root) {
      const list = [];
      if (root) {
        const Root = JSON.parse(JSON.stringify(root));
        const queue = [];
        Root.map((item) => {
          queue.push(item)
        })
        while (queue.length) {
          const node = queue.shift();
          if (node.children && node.children.length) {
            queue.push(...node.children);
          }
          delete node.children;
          list.push(node);
        }
      }
      return list;
    }

    let listLevel = []
    if (level) {
      listLevel = treeConvertList(level)
    }

    const levelOptions = listLevel ? listLevel.map((group, index) => <Option key={index} level={group.level} data-value={group.value}>{group.label}</Option>) : ''

    let toLeftDataProps = null
    if (leftdata && xqlist && pcslist) {
      toLeftDataProps = {
        leftdata: leftdata,
        xqlist: xqlist,
        pcslist: pcslist
      }      
    }

    const toPieProps = {
      housingInfo: this.props.ZHAFIndex.qualityData
    }

    const indexTopHeaderProps = {
      titleType: 'type1',
      title: '智慧安防社区系统',
    }


    return (
      <Spin size="large" spinning={diLoading}>
        {/* animated slideInLeft */}
        <div className="page-container">

          <div className="data_info_left_bottom" id="dimap"></div>

          <div className="top_fix">
            <IndexTopHeader {...indexTopHeaderProps} />
            <div className="scroll_notice">
              <div id="callboard">
                <ul>
                  <li>公告[2]：关于集中力量打好春节期间信息</li>
                  <li>公告[3]：公安部发话啦！办理身份证可以享受这项福利哦！</li>
                  <li>公告[1]：温暖回家路，您做上免费爱心专车了吗？</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 类型(1-小区 2-动态感知 3-实有力量 4-实有房屋 5-实有单位 6-实有安防 7-小区出入口 8-窨井盖) */}
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
                <Checkbox value="1" onChange={this.onCheckboxSimpleChange}>小区</Checkbox>
                <Checkbox value="2" onChange={this.onCheckboxSimpleChange}>动态感知</Checkbox>
                <Checkbox value="3" onChange={this.onCheckboxSimpleChange}>实有力量</Checkbox>
                <Checkbox value="4" onChange={this.onCheckboxSimpleChange}>实有房屋</Checkbox>
                <Checkbox value="5" onChange={this.onCheckboxSimpleChange}>实有单位</Checkbox>
                <Checkbox value="6" onChange={this.onCheckboxSimpleChange}>实有安防设施</Checkbox>
                <Checkbox value="7" onChange={this.onCheckboxSimpleChange}>小区出入口</Checkbox>
                <Checkbox value="wy" onChange={this.onCheckboxSimpleChange}>实有警情案事件</Checkbox>
              </div>
            </div>


            {/* <div className="b-toggle" onClick={this.toggleBox}></div> */}

            <div className="livedata_container">
              <div className="clearfix">
                <div className="livedata_toggle">
                  {/* <Button className="active" onClick={this.restartLiveData.bind(this, 'recPersonnelRecord')}>人脸</Button>
                      <Button onClick={this.restartLiveData.bind(this, 'recVehicleRecord')}>车辆</Button>
                      <Button onClick={this.restartLiveData.bind(this, 'recVehicleRecord')}>WiFi</Button>
                      <Button onClick={this.restartLiveData.bind(this, 'entranceGuardRecord')}>门禁</Button> */}
                  <Button className="active" onClick={this.restartLiveData.bind(this)} cid="1">人脸</Button>
                  <Button onClick={this.restartLiveData.bind(this)} cid="2">车辆</Button>
                  <Button onClick={this.restartLiveData.bind(this)} cid="3">WiFi</Button>
                  <Button onClick={this.restartLiveData.bind(this)} cid="4">门禁</Button>
                  {/* <Button onClick={this.restartLiveData.bind(this, 'entranceGuardRecord')}>监控</Button>
                      <Button onClick={this.restartLiveData.bind(this, 'recPersonnelRecord')}>消防</Button>
                      <Button onClick={this.restartLiveData.bind(this, 'recVehicleRecord')}>位移</Button>
                      <Button onClick={this.restartLiveData.bind(this, 'entranceGuardRecord')}>CK</Button> */}
                </div>
              </div>
              <div className="livedata_block clearfix">
                {liveDataDom}
              </div>
            </div>
          </div>

          <div className="left_fix">
            <div className="top_level_change">
              <AutoComplete
                className="header_left_autocomplete"
                style={{ width: 200 }}
                placeholder="请输入区域"
                onSelect={this.autoCompleteSelect}
                defaultValue="拱墅区"
              >
                {levelOptions}
              </AutoComplete>
              <Button type="primary" className="index_search_btn" onClick={this.changeLevel}>切换区域</Button>
            </div>
            <IndexLeftDataBlock {...toLeftDataProps} />
          </div>

          <div className="right_fix">
            {/* 饼图数据 */}
            <div className="data_info_right_item data_info_right_3">
              <div className="right_top_data">
                <p className="clearfix"><label>今日感知数</label><span>{this.props.ZHAFIndex.zong}</span></p>
              </div>
              <div className="right_pie_block">
                <XQHouseTypePie {...toPieProps} />
              </div>
              <div className="right_piedata_block">
                <ul>
                  <li>过车感知：{qualityData ? qualityData.vehicleRecords : '0'}</li>
                  <li>开门记录：{qualityData ? qualityData.personnelRecord : '0'}</li>
                  <li>人脸抓拍：{qualityData ? qualityData.faceTotal : '0'}</li>
                  <li>事件感知：{qualityData ? qualityData.perceptions : '0'}</li>
                  <li>MAC感知：{qualityData ? qualityData.mac : '0'}</li>
                </ul>
              </div>
            </div>

            {/* 模型应用 */}
            <div className="data_info_right_item data_info_right_4">
              <div className="right_top_title">
                <p>模型应用<img src={rightTopTitle} /></p>
              </div>
              <div className="right_top_data">
                <p className="clearfix"><label>今日预警总数</label><span>5503</span></p>
              </div>
              <div className="right_bottom_tab clearfix">
                <div className="tab_left">
                  <ul>
                    <li onClick={this.changeChildTabs} data-value="distribution" className="active">布控类</li>
                    <li onClick={this.changeChildTabs} data-value="person">人员类</li>
                    <li onClick={this.changeChildTabs} data-value="car">车辆类</li>
                    <li onClick={this.changeChildTabs} data-value="zone">小区类</li>
                  </ul>
                </div>
                <div className="right_block">
                  <div className="tab_top">
                    <a className="arrow-left" href="#" onClick={this.tabScoll}></a>
                    <a className="arrow-right" href="#" onClick={this.tabScoll}></a>
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

                  <div className="list_block list_scroll">
                    <div className="list_card">
                      <img className="catch_pic" src="https://avatars0.githubusercontent.com/u/97088?v=4"></img>
                      <div className="list_container">
                        <p><img src={listIcon1} />吸毒人员</p>
                        <p><img src={listIcon2} />2018-12-21 08:08:08</p>
                        <p><img src={listIcon3} />莫干山路999号</p>
                      </div>
                    </div>
                    <div className="list_card">
                      <img className="catch_pic" src="https://avatars0.githubusercontent.com/u/97088?v=4"></img>
                      <div className="list_container">
                        <p><img src={listIcon1} />吸毒人员</p>
                        <p><img src={listIcon2} />2018-12-21 08:08:08</p>
                        <p><img src={listIcon3} />莫干山路999号</p>
                      </div>
                    </div>
                    <div className="list_card">
                      <img className="catch_pic" src="https://avatars0.githubusercontent.com/u/97088?v=4"></img>
                      <div className="list_container">
                        <p><img src={listIcon1} />吸毒人员</p>
                        <p><img src={listIcon2} />2018-12-21 08:08:08</p>
                        <p><img src={listIcon3} />莫干山路999号</p>
                      </div>
                    </div>
                    <div className="list_card">
                      <img className="catch_pic" src="https://avatars0.githubusercontent.com/u/97088?v=4"></img>
                      <div className="list_container">
                        <p><img src={listIcon1} />吸毒人员</p>
                        <p><img src={listIcon2} />2018-12-21 08:08:08</p>
                        <p><img src={listIcon3} />莫干山路999号</p>
                      </div>
                    </div>
                    <div className="list_card">
                      <img className="catch_pic" src="https://avatars0.githubusercontent.com/u/97088?v=4"></img>
                      <div className="list_container">
                        <p><img src={listIcon1} />吸毒人员</p>
                        <p><img src={listIcon2} />2018-12-21 08:08:08</p>
                        <p><img src={listIcon3} />莫干山路999号</p>
                      </div>
                    </div>
                    <div className="list_card">
                      <img className="catch_pic" src="https://avatars0.githubusercontent.com/u/97088?v=4"></img>
                      <div className="list_container">
                        <p><img src={listIcon1} />吸毒人员</p>
                        <p><img src={listIcon2} />2018-12-21 08:08:08</p>
                        <p><img src={listIcon3} />莫干山路999号</p>
                      </div>
                    </div>
                    <div className="list_card">
                      <img className="catch_pic" src="https://avatars0.githubusercontent.com/u/97088?v=4"></img>
                      <div className="list_container">
                        <p><img src={listIcon1} />吸毒人员</p>
                        <p><img src={listIcon2} />2018-12-21 08:08:08</p>
                        <p><img src={listIcon3} />莫干山路999号</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    )
  }
}

export default NewIndex;

// 地图边界，tabs切换