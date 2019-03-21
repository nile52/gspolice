/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions/RealTime'
import $ from 'jquery'
import {
  Row,
  Col,
  Spin,
  Modal,
  Checkbox,
  Pagination,
  Button,
  Divider,
  Card,
  Icon
  // EnterAnimation
} from 'antd'
import { findDOMNode } from 'react-dom'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import '../style/RealTime.less'
import utils from '../../../../util/util';
import mapStyleJson from '../../../../static/json/mapStyleJson.json'
import sxt1 from '../../../../static/images/sxt1.gif'
import sxt3 from '../../../../static/images/sxt3.gif'
import rlsx1 from '../../../../static/images/rlsx1.png'
import rlsx3 from '../../../../static/images/rlsx3.png'
import videoLoading from '../../../../static/images/gawing/loading_video.gif'
import marker_blue from '../../../../static/images/gawing/marker_blue_realtime.png'
import marker_hover from '../../../../static/images/gawing/marker_hover_realtime.png'
import gsbg5 from '../../../../static/images/gawing/map_window_bg.png'
import camera_icon from '../../../../static/images/gawing/icon_realtime4.png'
import TopCascader from "../../component/TopCascader/TopCascader";
import TopButtons from '../../component/TopButtons/TopButtons'
import '../../../../static/css/animate.css'
import '../../../../static/css/tooltip-line.css';
import TopCascaderModal from '../../component/TopCascaderModal/TopCascaderModal'



@connect(
    state => state,
    {...actions}
)

class RealTime extends Component {
  constructor(props) {
    super(props)
    this.initMap = this.initMap.bind(this)
    this.addMarker = this.addMarker.bind(this)
    this.addWindow = this.addWindow.bind(this)
    this.selectToggle = this.selectToggle.bind(this)
    this.changeTopPlayUrl = this.changeTopPlayUrl.bind(this)
    this.configChangeChanne = this.configChangeChanne.bind(this)
    this.state = {
      map: null,
      time: null,
      btnsVisiable: false,
      selectVisiable: 'select_unvisiable',
      modalvisible: false,

      url1: null,
      url2: null,
      playing1: true,
      playing2: true,

      checkedNum: 0,
      checkedValues: '',
      cascaderLabel: localStorage.getItem('label') ? localStorage.getItem('label') : '拱墅区'
    }
  }

  // onChange =(e) => {
  //   console.log($(".camera_item input:checked"));
  //   if($(".camera_item input:checked").length > 8){
  //     console.log(e.target);
  //     e.target.checked = false;
  //   }
  //   var nowCheckedNum = this.state.checkedNum
  //   var thisCheck = e.target.checked
  //   if(nowCheckedNum >= 8 && thisCheck == true){
  //     e.target.checked = false
  //     Modal.info({
  //       title: "提示",
  //       message: "最多只能选择8个！"
  //     })
  //     return;
  //   }
  //   if(thisCheck){
  //     this.setState({
  //       checkedNum: nowCheckedNum + 1
  //     })
  //   } else {
  //     this.setState({
  //       checkedNum: nowCheckedNum + 1
  //     })
  //   }
  // }

  // 摄像机选择弹窗分页
  pageOnChange = (page) => {
    this.props.getServicesChannelListAll(page)
  }

  // 确认切换8个视频
  configChangeChanne = () => {
    let list = []
    this.state.checkedValues.forEach((item) => {
      this.props.getPlay(item, (value) => {
        list.push(value)
      })
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
    // this.restartWebSocket()
  }  

  onChange = (checkedValues) => {
    this.setState({
      checkedValues,
    });
  }

  goSearch = () => {  
    var name = $('#form_q').val()
    this.props.getEquipmentList(name)
  }

  // shipin 
  playPause = (playing) => {
    this.setState({ [playing]: !this.state[playing] })
  }

  reload = (type) => {
    if(type === 'url1') {
      clearTimeout(timer1)
      var timer1 = setTimeout(() => {
        this.setState({
          url1: 'http://60.191.94.122:9952/live/cameraid/1000090%240/substream/1.m3u8',
          playing1: true
        })
      }, 100)
      this.setState({ url1: null, playing1: false })
    } else if (type === 'url2') {
      clearTimeout(timer2)
      var timer2 = setTimeout(() => {
        this.setState({
          url2: 'http://60.191.94.122:9952/live/cameraid/1000090%240/substream/1.m3u8'
        })
      }, 100)
      this.setState({
        url2: null
      })
    }
  }

  onClickFullscreen = (player) => {
    screenfull.request(findDOMNode(this[player]))
  }

  ref1 = player => {
    this.player1 = player
  }

  ref2 = player => {
    this.player2 = player
  }

  changeTopPlayUrl = (url, title) => {
    console.log(url);
    this.props.changev({ 
      topPlayUrl: url,
      topPlayTitle: title,
    })
    var topVideo = $("#topVideo")[0]
    var hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(topVideo);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      topVideo.play();
    })
  }
  // shipin 


  showModal = () => {
    console.log('aaa')
    this.setState({
      modalvisible: true,
    });
  }

  handleCancel = () => {
    this.setState({
      modalvisible: false,
    });
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
        const myIcon = new BMap.Icon(imgObj, new BMap.Size(20,37));
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
        const blueIcon = new BMap.Icon(marker_blue, new BMap.Size(20,37));
        const redIcon = new BMap.Icon(marker_hover, new BMap.Size(20,37));
        var marker = new BMap.Marker(point, {
          icon: blueIcon,
          title: item.name
        });

        const sDom = `<div id="xq_window" class="xq_window">
                        <div class="xq_window_wrap animated fadeInDown">
                          <span class="xq_window_text xq_window_title">`+ item.name +`</span>
                        </div>
                      </div>`
                      
        const sDom2 = `<div id="xq_window" class="xq_window">
                        <div class="xq_window_wrap animated fadeInDown">
                          <span class="xq_window_text xq_window_title">`+ item.name +`</span>
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
    if (nextProps.GSRealTime.xqInfo && this.state.map) {
      this.initMap(this.state.map, nextProps.GSRealTime.xqInfo.longitude, nextProps.GSRealTime.xqInfo.latitude)   
    } 
    if(this.state.map) {
      if(nextProps.GSRealTime.equipmentList && nextProps.GSRealTime.equipmentList.length > 0) {
        this.state.map.clearOverlays(); 
        // this.addMarker(this.state.map, nextProps.GSRealTime.servicesChannelList)
        this.getBoundary(this.state.map)
        this.addWindow(this.state.map, nextProps.GSRealTime.equipmentList)
        // 此处需要一个小区列表，包含基本详情和小区信息
      } else {
        this.state.map.clearOverlays(); 
      }
    }
  }

  allPost = () => {
    this.props.getEquipmentTotal()
    // this.props.getEquipmentList()

    this.props.getServicesChannelListAll();
    this.props.getServicesChannelList();
  }

  componentWillMount() {
    this.props.getLevel();
    this.props.getVideoList()
    this.allPost()
  }

  componentDidMount() {
    let _this = this
    let screenH = document.documentElement.clientHeight
    let screenW = document.documentElement.clientWidth
    let mainDom = document.getElementsByClassName("data_info_item")
    let leftBottom = document.querySelector(".data_info_left_bottom")
    mainDom[0].style.height = screenH/12 + 'rem'
    mainDom[1].style.height = screenH/12 + 'rem'
    leftBottom.style.height = screenH/2  + 'px'
    leftBottom.style.width = screenW*0.412 + 'px'

    const map = new BMap.Map("dimap", {MAXZOOM: 18}); 
    // 初始化地图,设置中心点坐标和地图级别
    var point = new BMap.Point(120.149018,30.32539);    
    map.centerAndZoom(point,14);                     
    var marker = new BMap.Marker(point);
    map.addOverlay(marker); 
    
    let Long, Dat;
    const {
      xqInfo
    } = this.props.GSRealTime 
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


    let nowTime = new Date().getTime();
    let weekArr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
    var weekDay = new Date().getDay();
    _this.setState({
      // time: utils.timeToHMS(nowTime) + ' ' + weekArr[weekDay]
      time: utils.timeToMD(nowTime)
    })    



    this.setState({
      map: map,
    })
    window.onresize = function() {
      let screenH = document.documentElement.clientHeight
      let screenW = document.documentElement.clientWidth
      let mainDom = document.getElementsByClassName("data_info_item")
      let leftBottom = document.querySelector(".data_info_left_bottom")
      mainDom[0].style.height = screenH/12 + 'rem'
      mainDom[1].style.height = screenH/12 + 'rem'
      leftBottom.style.height = screenH/2 + 'px'
      leftBottom.style.width = screenW*0.412 + 'px'
    }


    var videolist = $(".video")

    for (let index = 0; index < videolist.length; index++) {
        var element = videolist[index]
        console.log(element);
        var hls = new Hls();
        var hlssource = '';        
        var inputurl = $(element).attr("data-url");
        if (!inputurl==''){
            var hlssource = inputurl;
        }
        hls.loadSource(hlssource);
        hls.attachMedia(element);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            element.play();
        })        
    }



  }

  render() {
    const {
      selectVisiable,
      url1, url2, playing1, playing2,
      checkedNum,
      checkedValues,
      cascaderLabel,
      time
    } = this.state
    let {
      topPlayUrl,
      topPlayTitle,
      currentModalPage,
      diLoading,
      equipmentInfo,
      equipmentList,
      servicesChannelListAll,
      servicesChannelListTotal,
      servicesChannelListTotalPager,
      playlist,
      level,
    } = this.props.GSRealTime

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


    if (playlist&&playlist.length>0) {
      
    } else {
      playlist = [
        { 
          id: 4160,
          title: '拱墅区·上塘街道·蔡马人家·蔡马小区入口人脸1.90',
          playUrl: "http://41.198.192.34:83/ncg/41.198.192.10/7099/0/330105590001104160/MAIN/TCP/live.m3u8&checkinfo=ewogICAidGltZSIgOiAiMjAxODEyMTZUMTcxMDM5WiIsCiAgICJ1cmwiIDogImh0dHA6Ly80MS4xOTguMTkyLjM0OjgzL25jZy80MS4xOTguMTkyLjEwLzcwOTkvMC8zMzAxMDU1OTAwMDExMDQxNjAvTUFJTi9UQ1AvbGl2ZS5tM3U4Igp9Cg%3D%3D&idinfo=EBACAAAQAADnAozoY3rMXOyYyWnupwyr8Qv2qaiNoWMJwZmVC3RZRgRUd1UfGbacuapZiBp8bVUEYF8xCkBv4H7cUakGx1BN"
        },
        { 
          id: 4161,
          title: '拱墅区·上塘街道·蔡马人家·2栋负一层东人脸1.209',
          playUrl: "http://41.198.192.34:83/ncg/41.198.192.10/7099/0/330105590015147260/MAIN/TCP/live.m3u8&checkinfo=ewogICAidGltZSIgOiAiMjAxODEyMTZUMTcxMDM5WiIsCiAgICJ1cmwiIDogImh0dHA6Ly80MS4xOTguMTkyLjM0OjgzL25jZy80MS4xOTguMTkyLjEwLzcwOTkvMC8zMzAxMDU1OTAwMTUxNDcyNjAvTUFJTi9UQ1AvbGl2ZS5tM3U4Igp9Cg%3D%3D&idinfo=EBACAAAQAABRNq%2FqPUhKE1lA2AeYKOu0bIISzGzap4lBzzptoyWi9rf3JRS0RR6MRsBB8pU5vve3x8w0fySryTNII9OfmZ%2B6"
        },
        { 
          id: 4162,
          title: '拱墅区·上塘街道·蔡马人家·3栋负一层东人脸1.212',
          playUrl: "http://41.198.192.34:83/ncg/41.198.192.10/7099/0/330105590015342160/MAIN/TCP/live.m3u8&checkinfo=ewogICAidGltZSIgOiAiMjAxODEyMTZUMTcxMDM5WiIsCiAgICJ1cmwiIDogImh0dHA6Ly80MS4xOTguMTkyLjM0OjgzL25jZy80MS4xOTguMTkyLjEwLzcwOTkvMC8zMzAxMDU1OTAwMTUzNDIxNjAvTUFJTi9UQ1AvbGl2ZS5tM3U4Igp9Cg%3D%3D&idinfo=EBACAAAQAABLUFarAhP%2B6u7n5N9tFCvDZLqXzFo8S49LtxYGoxRnAOMqBNCYpqAA0Q3Khib5O9S9FNF8VgFd3pq6qDhHisi%2B"
        },
        { 
          id: 4164,
          title: '拱墅区·上塘街道·蔡马人家·8栋负一层东人脸1.130',
          playUrl: "http://41.198.192.34:83/ncg/41.198.192.10/7099/0/330105590015695760/MAIN/TCP/live.m3u8&checkinfo=ewogICAidGltZSIgOiAiMjAxODEyMTZUMTcxMDQwWiIsCiAgICJ1cmwiIDogImh0dHA6Ly80MS4xOTguMTkyLjM0OjgzL25jZy80MS4xOTguMTkyLjEwLzcwOTkvMC8zMzAxMDU1OTAwMTU2OTU3NjAvTUFJTi9UQ1AvbGl2ZS5tM3U4Igp9Cg%3D%3D&idinfo=EBACAAAQAAAMgmVNVVxO6ozOWDOyS1CFqUzLq%2B6Jxeamc6uYBpRwYEFCiZ%2BYlZ1qXD%2BPGyzMi%2B88VtCQWcEh3S5iHNw9swtC"
        },
        { 
          id: 4169,
          title: '拱墅区·上塘街道·蔡马人家·8栋负一层西人脸1.132',
          playUrl: "http://41.198.192.34:83/ncg/41.198.192.10/7099/0/330105590015217060/MAIN/TCP/live.m3u8&checkinfo=ewogICAidGltZSIgOiAiMjAxODEyMTZUMTcxMDQwWiIsCiAgICJ1cmwiIDogImh0dHA6Ly80MS4xOTguMTkyLjM0OjgzL25jZy80MS4xOTguMTkyLjEwLzcwOTkvMC8zMzAxMDU1OTAwMTUyMTcwNjAvTUFJTi9UQ1AvbGl2ZS5tM3U4Igp9Cg%3D%3D&idinfo=EBACAAAQAAAF5xQhzCKbSsq1PLEhi8zuJSMl%2BvFOdXkrSzhwiqeccZJHGgL1R%2Bs3Ye0Ctgudhea5c%2FZ6KdgWEYYvE3sdkNuh"
        },
        { 
          id: 4171,
          title: '拱墅区·上塘街道·蔡马人家·9栋负一层人脸1.223',
          playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%245/substream/1.m3u8"
        },
        { 
          id: 4178,
          title: '拱墅区·上塘街道·蔡马人家·2栋负一层西人脸1.204',
          playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%246/substream/1.m3u8"
        },
        { 
          id: 4199,
          title: '拱墅区·上塘街道·蔡马人家·11栋1单元负一层人脸1.85',
          playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%247/substream/1.m3u8"
        },
        { 
          id: 4201,
          title: '拱墅区·上塘街道·蔡马人家·12栋1单元负一层人脸1.163',
          playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%248/substream/1.m3u8"
        },
        { 
          id: 4204,
          title: '拱墅区·上塘街道·蔡马人家·12栋1单元负一层人脸1.163',
          playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%249/substream/1.m3u8"
        },
        { 
          id: 4209,
          title: '拱墅区·上塘街道·蔡马人家·蔡马小区入口人脸',
          playUrl: "http://112.17.106.71:7086/live/cameraid/1000072%2410/substream/1.m3u8"
        },
      ]
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

                <div className="bottom_fix  ">
                  <div className="bottom_right_block fr data_info_right_3">
                    <div className="bottom_right_box">
                      <div className="bottom_monitor_block">   
  
                        <div className="video_info clearfix">
                          <p className="video_title fl" style={{width: '70%'}} title={topPlayTitle?topPlayTitle:''}>{topPlayTitle?topPlayTitle:''}</p>
                          <p className="video_date fr">{time}</p>
                        </div>
                        <div className="video_block">
                          {/* <img src="https://avatars2.githubusercontent.com/u/8030067?v=4"></img>*/}
                          <div className="entry_exit_video_down">
                            <video muted="muted" class="video" id="topVideo" data-url={topPlayUrl} autoplay="autoplay"></video>
                          </div>
                        </div>
                        <div className="ext_btn"></div>
                      </div>     
                    </div>
                  </div>

                  <div className="bottom_left_block fl data_info_right_4">
                  
                    <Row className="bottom_video_container" gutter={8}>

                      { playlist && playlist.length > 0 ? playlist.slice(0,8).map((item, index) => {
                        return (
                          <Col key={index} span={6} >
                            <div 
                              className="bottom_monitor_item" 
                              onClick={() => this.changeTopPlayUrl(item.playUrl, item.title)}>
                              <div className="video_block">
                                <div className="entry_exit_video_down">
                                  <video muted="muted" class="video" autoplay="autoplay" data-url={item.playUrl}></video>
                                </div>
                              </div>
                              <div className="video_info">
                                <p className="video_title" title={item.title}>{item.title? item.title: ''}</p>
                              </div>
                              <div className="ext_btn"></div>
                            </div>                        
                          </Col>
                        )
                      }) : ''}

                    </Row>
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
                              <p className="face_top_value">{equipmentInfo?equipmentInfo.faultTotal:''}</p>
                          </div>
                  </Col>
                  <Col span={8} >
                          <div className="face_top_block">
                              {/* <img src={top_icon3}/> */}
                              <div className="img_block img_block3"></div>
                              <p className="face_top_label">调试数</p>
                              <p className="face_top_value">{equipmentInfo?equipmentInfo.testTotal:''}</p>
                          </div>
                  </Col>
                </Row>
              </div>
              <div className="data_info_right_item data_info_right_2">
                <div className="right_2_top clearfix">
                  <div className="camera_btn fl" onClick={this.showModal}></div>

                  <div class="searchboxForm" role="search" data-bm="2">
                    <input className="searchbox" id="form_q" type="search" />
                    <input type="submit" className="searchboxSubmit"  title="搜索" name="go" value="搜索" onClick={this.goSearch} />
                  </div>

                </div>
              
                <div className="card_container new_card_container">

                  { equipmentList ? equipmentList.map((item,index) => {
                    return(                    
                        // <div key={index} className="card_item">
                        //   <div className="ext_btn"></div>
                        //   <h3>{item.name}</h3>
                        //   <p>具体位置：{item.location}{item.latitude}{item.longitude}</p>
                        //   <p>设备编号：{item.equipmentNumber}</p>
                        //   <p>设备使用时间：{item.setupTime}</p>
                        //   <p>设备故障次数：{item.number}</p>
                        //   <p>设备检修时间：{item.modifyDate}</p>
                        // </div>
                        <Card
                          title={item.name}
                          extra={<a href="#"><Icon type="play-circle" /></a>}
                          style={{ margin: "0px 10px 10px 10px", }}
                        >
                          <p>具体位置：{item.location}{item.latitude}{item.longitude}</p>
                          <p>设备编号：{item.equipmentNumber}</p>
                          <p>设备使用时间：{item.setupTime}</p>
                          <p>设备故障次数：{item.number}</p>
                          <p>设备检修时间：{item.modifyDate}</p>
                        </Card>
          
                    )
                  }) : ''}

                </div>
              </div>
            </Col>
          </Row>

          {/* 摄像机选择 */}
          <Modal
            className="camera_modal"
            visible={this.state.modalvisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={false}
            width="133rem"
          >
            <div className="clearfix">
              <div className="fl">
                <h3><img src={camera_icon} /> 摄像机选择<span>{checkedValues.length}/8台</span></h3>
                <div className="camera_btn_warpper">
                  <Button 
                    type="primary" 
                    disabled={checkedValues.length < 8} 
                    className="camera_btn"
                    onClick={this.configChangeChanne}
                  >确定</Button>
                </div>
              </div>
              <div className="camera_search_box fr">
                  <input className="search_input"/>
                  <input className="search_submit" type="submit" value="" />
              </div>
            </div>
            <div className="card_container">
              <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange}>
                  { servicesChannelListAll ? servicesChannelListAll.map((item, index) => {
                    return(
                        <div key={index} className="camera_item">
                          <Checkbox value={item.id} 
                            // onChange={this.onChange}
                            disabled={!(checkedValues.includes(item.id) || checkedValues.length < 8)}
                          >
                          <p className="camera_title" name="default_camera">{item.name}</p></Checkbox>
                          <p className="camera_location">{item.location}</p>
                        </div>    
                    )
                  }) : ''}
              </Checkbox.Group>
            </div>
            <Pagination
              onChange={this.pageOnChange} 
              total={servicesChannelListTotal}
              showTotal={total => `共 ${servicesChannelListTotal} 条`}
              pageSize={30}
              current={currentModalPage}
              style={{float: "right", marginTop: "10px"}}
            />
          </Modal>
        </div>
      </Spin>  
    )
  }
}

export default RealTime;
