/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions/XQDataInfo'
import $ from 'jquery'
import {
  Row,
  Col,
  Spin,
  Card,
  Progress
  // EnterAnimation
} from 'antd'
import '../style/XQDataInfo.less'
import {
  WEI_SERVICE
} from '../../../fetch/apis'
import utils from '../../../util/util';
import sxt1 from '../../../static/images/sxt1.gif'
import sxt3 from '../../../static/images/sxt3.gif'
import rlsx1 from '../../../static/images/rlsx1.png'
import rlsx3 from '../../../static/images/rlsx3.png'
import gsbg5 from '../../../static/images/gs_bg_07.png'
import gsbg4 from '../../../static/images/gs_bg_04.png'
import cardicon1 from '../../../static/images/gs_icon_01.png'
import cardicon2 from '../../../static/images/gs_icon_02.png'
import cardicon3 from '../../../static/images/gs_icon_03.png'
import cardicon4 from '../../../static/images/gs_icon_04.png'

import XQHouseTypePie from './XQHouseTypePie'
import XQServicesBar from './XQServicesBar'
import { blockParams } from 'handlebars';

@connect(
    state => state,
    {...actions}
)

class XQDataInfo extends Component {
  constructor(props) {
    super(props)
    this.initMap = this.initMap.bind(this)
    this.addMarker = this.addMarker.bind(this)
    this.addWindow = this.addWindow.bind(this)
    this.state = {
      map: null,
      time: null,
      pieHeight: 0,
      barHeight: 0,
      isHalf1: true,
      isHalf2: true,
      isHalf3: true,
      isHalf4: true,
    }
  }

  handleClick1 = (event) => {
    event.preventDefault();
    this.setState({
      isHalf1: !this.state.isHalf1,
      isHalf2: true,
      isHalf3: true,
      isHalf4: true,
    })
    event.stopPropagation();  
  }
  handleClick2 = (event) => {
    event.preventDefault();
    this.setState({
      isHalf2: !this.state.isHalf2,
      isHalf1: true,
      isHalf3: true,
      isHalf4: true,
    })
    event.stopPropagation();  
  }

  handleClick3 = (event) => {
    event.preventDefault();
    this.setState({
      isHalf3: !this.state.isHalf3,
      isHalf2: true,
      isHalf1: true,
      isHalf4: true,    
    })
    event.stopPropagation();  
  }

  handleClick4 = (event) => {
    event.preventDefault();
    this.setState({
      isHalf4: !this.state.isHalf4,
      isHalf2: true,
      isHalf3: true,
      isHalf1: true,
    
    })
    event.stopPropagation();  
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
        const myIcon = new BMap.Icon(imgObj, new BMap.Size(30,30));
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
        var marker = new BMap.Marker(point);

        const sDom = `<div id="xq_window" class="xq_window">
                        <div class="xq_window_wrap">
                          <span class="xq_window_text xq_window_title">`+ item.name +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <label class="xq_window_label">常住人口:</label>
                          <span class="xq_window_text">`+ (totals.longTimeTotal ? totals.longTimeTotal : '') +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <label class="xq_window_label">暂住人口:</label>
                          <span class="xq_window_text">`+ totals.flowTotal +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <label class="xq_window_label">设备数:</label>
                          <span class="xq_window_text">`+ totals.EqptEquipmentChannelTotal +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <a href="/xqdetailinfo/zoneId/`+ item.id +`" class="xq_window_btn">查看详情</a>
                        </div>
                      </div>`
                      
        const sDom2 = `<div id="xq_window" class="xq_window">
                        <button class="closeBtn">X</button>
                        <div class="xq_window_wrap">
                          <span class="xq_window_text xq_window_title">`+ item.name +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <label class="xq_window_label">常住人口:</label>
                          <span class="xq_window_text">`+ (totals.longTimeTotal ? totals.longTimeTotal : '') +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <label class="xq_window_label">暂住人口:</label>
                          <span class="xq_window_text">`+ totals.flowTotal +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <label class="xq_window_label">设备数:</label>
                          <span class="xq_window_text">`+ totals.EqptEquipmentChannelTotal +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <a href="/xqdetailinfo/zoneId/`+ item.id +`" class="xq_window_btn">查看详情</a>
                        </div>
                      </div>`
        


        var label = new BMap.Label(sDom,{offset:new BMap.Size(-48,-140)});
        var label2 = new BMap.Label(sDom2,{offset:new BMap.Size(-48,-140)});
        const _iw = new BMap.InfoWindow(sDom); 
        label.setStyle({
          background: "url("+ gsbg5 +")",
          backgroundSize: '100% 100%',
          border: "none"
        })
        label2.setStyle({
          background: "url("+ gsbg5 +")",
          backgroundSize: '100% 100%',
          border: "none"
        })    
        marker.addEventListener('mouseover', function() {
          marker.setLabel(label);
        })
        marker.addEventListener('mouseout', function() { 
          setTimeout(
            function(){
              map.removeOverlay(label)
            }, 1000
          )
        })
        marker.addEventListener("click", function(e) {
          marker.setLabel(label2);   
        });
        label2.addEventListener("click", function(e) {
          map.removeOverlay(label2)
        });

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
    if (nextProps.XQDataInfo.xqInfo && this.state.map) {
      this.initMap(this.state.map, nextProps.XQDataInfo.xqInfo.longitude, nextProps.XQDataInfo.xqInfo.latitude)   
    } 
    if(this.state.map) {
      if(nextProps.XQDataInfo.xqList && nextProps.XQDataInfo.xqList.length > 0) {
        this.state.map.clearOverlays(); 
        // this.addMarker(this.state.map, nextProps.XQDataInfo.servicesChannelList)
        this.getBoundary(this.state.map)
        this.addWindow(this.state.map, nextProps.XQDataInfo.xqList, nextProps.XQDataInfo.zoneTotal)
        // 此处需要一个小区列表，包含基本详情和小区信息
      } else {
        this.state.map.clearOverlays(); 
      }
    }
  }

  componentWillMount() {
    this.props.getXqList()
    this.props.getServicesChannelList();
    this.props.getZoneTotal();
    // this.props.getPersonnelRecord();
    // this.props.getCLSelectRecVehicleRecord();
  }

  componentDidMount() {
    let _this = this
    $('.circle').each(function(index, el) {
      var num = $(this).find('span').eq(0).text() * 3.6;
      if (num<=180) {
        $(this).find('.right').css('transform', "rotate(" + num + "deg)");
      } else {
        $(this).find('.right').css('transform', "rotate(180deg)");
        $(this).find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
      };
    });
    let screenH = document.documentElement.clientHeight
    let mainDom = document.getElementsByClassName("data_info_item")
    let leftBottom = document.querySelector(".data_info_left_bottom")
    mainDom[0].style.height = screenH/12 + 'rem'
    mainDom[1].style.height = screenH/12 + 'rem'
    leftBottom.style.height = screenH - 10*12 - 20 + 'px'

    const map = new BMap.Map("dimap", {MAXZOOM: 18}); 
    // 初始化地图,设置中心点坐标和地图级别
    var point = new BMap.Point(120.149018,30.32539);    
    map.centerAndZoom(point,14);                     
    var marker = new BMap.Marker(point);
    map.addOverlay(marker); 
    
    let Long, Dat;
    const {
      xqInfo
    } = this.props.XQDataInfo 
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

    map.setMapStyle({style:'midnight'});
    
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
      let leftBottom = document.querySelector(".data_info_left_bottom")
      mainDom[0].style.height = screenH/12 + 'rem'
      mainDom[1].style.height = screenH/12 + 'rem'
      leftBottom.style.height = screenH - 10*12 - 20 + 'px'
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

    this.timer3 = setInterval(
      () => this.props.getPersonnelRecord(),
      10000
    );
    this.timer4 = setInterval(
      () => this.props.getCLSelectRecVehicleRecord(),
      10000
    );
  }
  
  componentWillUnmount() {
    clearInterval(this.timer3);
    clearInterval(this.timer4);
  }

  render() {
    const {
      barHeight,
      pieHeight,
    } = this.state
    const {
      diLoading,
      zoneTotal,
      clselectRecVehicleRecordList,
      homeEntryAndExitList
    } = this.props.XQDataInfo

    let {
      isHalf1, 
      isHalf2, 
      isHalf3, 
      isHalf4, 
    } = this.state;


    const toChildProps = {
      zoneTotal: zoneTotal,
      barHeight: barHeight,
      pieHeight: pieHeight,
      changev: this.props.changev,
    }

    var classString1 = 'bottom_fix_item ' + (isHalf1 ? 'block_half' : 'block_all');
    var classString2 = 'bottom_fix_item ' + (isHalf2 ? 'block_half' : 'block_all');
    var classString3 = 'bottom_fix_item ' + (isHalf3 ? 'block_half' : 'block_all');
    var classString4 = 'bottom_fix_item ' + (isHalf4 ? 'block_half' : 'block_all');

    const cardTitle1 = <p><img src={cardicon4}></img> 人脸捕获记录</p>
    const cardTitle2 = <p><img src={cardicon3}></img> 门禁进出比对</p>
    const cardTitle3 = <p><img src={cardicon2}></img> 车辆进出记录</p>
    const cardTitle4 = <p><img src={cardicon1}></img> MAC 探针记录</p>

    return (
      <div>
        <Row>
          <Col span={18}  className="data_info_item data_info_left">
            <Row>
              <Col span={24} className="data_info_left_top">
                <div className="data_info_header_center">
                  <div className="data_info_header_center_bg">
                    拱墅区公安网数据概览
                      <Link to="/datavisualization">
                        <div className="data_info_header_center_left" >
                          <span className="data_info_header_center_text">
                            {/* 数据可视化 */}
                          </span>
                        </div>
                      </Link>
                      <Link to="/app/baseinfo/buildingarea">
                        <div className="data_info_header_center_right">
                          <span className="data_info_header_center_text">
                            {/* 后台视图 */}
                          </span>
                        </div>
                      </Link>
                      <div className="data_info_header_center_time">{this.state.time}</div>
                  </div>
                </div>
              </Col>  
            </Row> 
            <Spin spinning={diLoading}>
              <div className="data_info_left_bottom" id="dimap"></div>

              <div className="data_info_left_bottom">
                {/* <EnterAnimation> */}
                  <Row className="bottom_fix">
                    <Col 
                      className={classString1} 
                      span={6}
                      onClick={this.handleClick1.bind(this)}
                      // onMouseLeave={this.toggleBlock}
                    >
                      <Card title={cardTitle1}>
                        {homeEntryAndExitList?homeEntryAndExitList.map((item, key)=>{
                          return (
                            <p>【{utils.getZoneName(item.zoneId)}】{item.equipmentChannelName}：{item.userName}</p>
                          )
                        }):'暂无记录'}
                      </Card>
                    </Col>
                    <Col 
                      className={classString2} 
                      span={6}
                      onClick={this.handleClick2.bind(this)}
                    >
                      <Card title={cardTitle2}>
                        <p>【蔡马人家】11幢：孔雪浩</p>
                        <p>【蔡马人家】11幢：孔雪浩</p>
                        <p>【蔡马人家】11幢：孔雪浩</p>
                        <p>【蔡马人家】11幢：孔雪浩</p>
                        <p>【蔡马人家】11幢：孔雪浩</p>
                        <p>【蔡马人家】11幢：孔雪浩</p>
                        <p>【蔡马人家】11幢：孔雪浩</p>
                        <p>【蔡马人家】11幢：孔雪浩</p>
                      </Card>
                    </Col>
                    <Col 
                      className={classString3} 
                      span={6}
                      onClick={this.handleClick3.bind(this)}
                    >
                      <Card title={cardTitle3}>
                        {clselectRecVehicleRecordList?clselectRecVehicleRecordList.map((item, key)=>{
                          return (
                            <p>【{utils.getZoneName(item.zoneId)}】{item.equipmentChannelName}：{item.licenseNumber}</p>
                          )
                        }):'暂无记录'}
                      </Card>
                    </Col>
                    <Col 
                      className={classString4} 
                      span={6}
                      onClick={this.handleClick4.bind(this)}
                    >
                      <Card title={cardTitle4}>
                        <p>【蔡马人家】孔雪浩 12-SF-45-NK-u0</p>
                        <p>【蔡马人家】孔雪浩 12-SF-45-NK-u0</p>
                        <p>【蔡马人家】孔雪浩 12-SF-45-NK-u0</p>
                        <p>【蔡马人家】孔雪浩 12-SF-45-NK-u0</p>
                        <p>【蔡马人家】孔雪浩 12-SF-45-NK-u0</p>
                        <p>【蔡马人家】孔雪浩 12-SF-45-NK-u0</p>
                        <p>【蔡马人家】孔雪浩 12-SF-45-NK-u0</p>
                      </Card>
                    </Col>
                  </Row>    
                {/* </EnterAnimation> */}
              </div>
            </Spin>
          </Col>
          <Col span={6}  className="data_info_item data_info_right">
            <div className="data_info_right_item data_info_right_1">
              <div className="top_data_title">
                <p>浙江省杭州市拱墅区</p>
                <img src={gsbg4}></img>                
              </div>
              <Row className="data_info_right_1_item_wrap">
                <Col span={12} className="data_info_right_1_item">
                    <Col span={12} className="data_info_right_1_item_item">
                      <div className="data_info_right_1_icon right_1_icon_red">
                        <i className="icon iconfont icon-baohanxiaoqusvg"></i>
                      </div>
                    </Col>
                    <Col span={12} className="data_info_right_1_item_item">
                      <div className="data_info_right_1_text">
                        <div className="data_info_right_1_text_title">小区总数</div>
                        <div className="data_info_right_1_text_num right_1_red_num">{zoneTotal ? zoneTotal.zoneTotal : ''}</div>
                      </div>
                    </Col>
                </Col>
                <Col span={12} className="data_info_right_1_item data_info_green">
                    <Col span={12} className="data_info_right_1_item_item">
                      <div className="data_info_right_1_icon right_1_icon_green">
                        <i className="icon iconfont icon-shebei"></i>
                      </div>
                    </Col>
                    <Col span={12} className="data_info_right_1_item_item">
                      <div className="data_info_right_1_text">
                        <div className="data_info_right_1_text_title">设备总数</div>
                        <div className="data_info_right_1_text_num right_1_green_num">{zoneTotal ? zoneTotal.EqptEquipmentChannelTotal : ''}</div>
                      </div>
                    </Col>
                </Col>
              </Row>
              <Row className="data_info_right_1_item_wrap">
                <Col span={12} className="data_info_right_1_item">
                    <Col span={12} className="data_info_right_1_item_item">
                      <div className="data_info_right_1_icon right_1_icon_blue">
                        <i className="icon iconfont icon-people"></i>
                      </div>
                    </Col>
                    <Col span={12} className="data_info_right_1_item_item">
                      <div className="data_info_right_1_text">
                        <div className="data_info_right_1_text_title">人员总数</div>
                        <div className="data_info_right_1_text_num right_1_blue_num">{zoneTotal ? zoneTotal.userToatl : ''}</div>
                      </div>
                    </Col>
                </Col>
                <Col span={12} className="data_info_right_1_item">
                    <Col span={12} className="data_info_right_1_item_item">
                      <div className="data_info_right_1_icon right_1_icon_yellow">
                        <i className="icon iconfont icon-69"></i>
                      </div>
                    </Col>
                    <Col span={12} className="data_info_right_1_item_item">
                      <div className="data_info_right_1_text">
                        <div className="data_info_right_1_text_title">房屋总数</div>
                        <div className="data_info_right_1_text_num right_1_yellow_num">{zoneTotal ? zoneTotal.housingTotal-1 : ''}</div>
                      </div>
                    </Col>
                </Col>
              </Row>
            </div>
            <div className="data_info_right_item data_info_right_2">
              <Row className="data_info_right_2_item_wrap">
                <Col span={8} className="data_info_right_2_item">

                  {/* <div className="data_info_right_2_zz"> */}
                    <div className="circle">
                      <div className="pie_left"><div className="left"></div></div>
                      <div className="pie_right"><div className="right"></div></div>
                      <div className="mask">
                        <span>30</span>.00%
                        <p>2018年统计率</p>
                      </div>
                    </div>
                  {/* </div> */}

                  {/* <div className="data_info_right_2_cz">
                      <p className="data_info_right_2_cz_title">常住人口</p>
                      <p className="data_info_right_2_cz_num">{zoneTotal ? zoneTotal.longTimeTotal : ''}</p>
                  </div> */}
                </Col>
                <Col span={8} className="data_info_right_2_item">
                  <div className="data_info_right_2_zz">
                      <p className="data_info_right_2_zz_title">暂住人口</p>
                      <p className="data_info_right_2_zz_num">{zoneTotal ? zoneTotal.flowTotal : ''}</p>
                  </div>
                </Col>
                <Col span={8} className="data_info_right_2_item">
                  <div className="data_info_right_2_item data_info_right_2_hz">
                    <p className="data_info_right_2_hz_title">人口情况汇总</p>
                    <p className="data_info_right_2_hz_num">共计{zoneTotal ? zoneTotal.userToatl : ''}</p>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="data_info_right_item data_info_right_3">
              <XQHouseTypePie {...toChildProps}/>
            </div>
            <div className="data_info_right_item data_info_right_4">
              <XQServicesBar {...toChildProps}/>
            </div>
          </Col>
        </Row>

      </div>
    )
  }
}

export default XQDataInfo;
