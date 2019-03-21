/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions/XQDetailInfo'
import $ from 'jquery'
import {
  Row,
  Col,
  Spin
} from 'antd'
import '../style/XQDetailInfo.less'
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
import XQHouseTypePie from './XQHouseTypePie'

@connect(
    state => state,
    {...actions}
)

class XQDetailInfo extends Component {
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
    }
  }

  initMap = (map, Long, Dat) => {
    const point = new BMap.Point(Long, Dat);
    map.centerAndZoom(point, 20); 
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

  addWindow = (map, services, zonetotal) => {

    console.log(this.props);
    
    let _this = this;
    for (const index in services) {
      var markers = []
      if (services.hasOwnProperty(index)) {
        const item = services[index];
        let newName = ''
        let newNameArr = index.split('-')
        let newNameArrLength = newNameArr.length
        if( newNameArrLength > 1) {
          newName = newNameArr[newNameArrLength -1]
        } else {
          newName = index
        }

        var point = new BMap.Point(item.longitude, item.latitude);
        var marker = new BMap.Marker(point);
        const sDom = `<div id="xq_window" class="xq_window">
                        <div class="xq_window_wrap">
                          <span class="xq_window_text xq_window_title">`+ (zonetotal ? zonetotal.name : '') + newName +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <label class="xq_window_label">常住人口:</label>
                          <span class="xq_window_text">`+ item.longTimeTotal +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <label class="xq_window_label">暂住人口:</label>
                          <span class="xq_window_text">`+ item.flowTotal +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <label class="xq_window_label">车辆数:</label>
                          <span class="xq_window_text">`+ item.vehicleTotal +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <a href="/xqbuilddetailinfo/zoneId/`+ this.props.XQDetailInfo.xqId +`/buildingId/`+ item.storiedBuildingId +`" class="xq_window_btn">查看详情</a>
                        </div>
                      </div>`

        var label = new BMap.Label(sDom,{offset:new BMap.Size(-48,-140)});

        label.setStyle({
          background: "url("+ gsbg5 +")",
          backgroundSize: '100% 100%',
          border: "none",
          display: 'none'
        })

        marker.addEventListener('mouseover', function(e) {     
          var label = this.getLabel();
          if (label) {
            label.setStyle({
              display:"block"
            });            
          }
        })
   
        marker.addEventListener('mouseout', function() { 
          var label = this.getLabel();
          if (label) {
            var hasBtn = label.content.indexOf('closeBtn')
          }          
          if (label && hasBtn == -1) {
            setTimeout(() => {
              label.setStyle({    
                display:"none"
              });                    
            }, 500);
          }
        })

        marker.addEventListener("click", function(e) {
          var label = this.getLabel();
          if (label) {
            label.setStyle({
              display:"none"
            }); 
            _this.addLabel(this, index, services, "label2", map, zonetotal)
          } 
        });
        marker.setLabel(label);
        map.addOverlay(marker);
      }
    }


  }

  addLabel = (marker, index, services, islabel2, map, zonetotal) => {
        const item = services[index];
        let newName = ''
        let newNameArr = index.split('-')
        let newNameArrLength = newNameArr.length
        if( newNameArrLength > 1) {
          newName = newNameArr[newNameArrLength -1]
        } else {
          newName = index
        }
        const sDom = `<div id="xq_window" class="xq_window">
                        <div class="xq_window_wrap">
                          <span class="xq_window_text xq_window_title">`+ zonetotal.name + newName +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <label class="xq_window_label">常住人口:</label>
                          <span class="xq_window_text">`+ item.longTimeTotal +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <label class="xq_window_label">暂住人口:</label>
                          <span class="xq_window_text">`+ item.flowTotal +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <label class="xq_window_label">车辆数:</label>
                          <span class="xq_window_text">`+ item.vehicleTotal +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <a href="/xqbuilddetailinfo/zoneId/`+ this.props.XQDetailInfo.xqId +`/buildingId/`+ item.storiedBuildingId +`" class="xq_window_btn">查看详情</a>
                        </div>
                      </div>`

        const sDom2 = `<div id="xq_window" class="xq_window">
                        <button class="closeBtn">X</button>
                        <div class="xq_window_wrap">
                          <span class="xq_window_text xq_window_title">`+ zonetotal.name + newName +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <label class="xq_window_label">常住人口:</label>
                          <span class="xq_window_text">`+ item.longTimeTotal +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <label class="xq_window_label">暂住人口:</label>
                          <span class="xq_window_text">`+ item.flowTotal +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <label class="xq_window_label">车辆数:</label>
                          <span class="xq_window_text">`+ item.vehicleTotal +`</span>
                        </div>
                        <div class="xq_window_wrap">
                          <a href="/xqbuilddetailinfo/zoneId/`+ this.props.XQDetailInfo.xqId +`/buildingId/`+ item.storiedBuildingId +`" class="xq_window_btn">查看详情</a>
                        </div>
                      </div>`

        var label = new BMap.Label(sDom,{offset:new BMap.Size(-48,-140)});
        var label2 = new BMap.Label(sDom2,{offset:new BMap.Size(-48,-140)});

        label.setStyle({
          background: "url("+ gsbg5 +")",
          backgroundSize: '100% 100%',
          border: "none",
          display: "none"
        })

        label2.setStyle({
          background: "url("+ gsbg5 +")",
          backgroundSize: '100% 100%',
          border: "none"
        })  

        if (islabel2) {
          marker.setLabel(label2);
          label2.addEventListener("click", function(e) {
            map.removeOverlay(label2)
            marker.setLabel(label);
          })          
        }else{
          marker.setLabel(label);
        }   
  }

  componentWillReceiveProps(nextProps) {    
    if (nextProps.XQDataInfo.xqInfo && this.state.map) {
      this.initMap(this.state.map, nextProps.XQDataInfo.xqInfo.longitude, nextProps.XQDataInfo.xqInfo.latitude)   
    }       
    if(this.state.map) {
      if(nextProps.XQDataInfo.servicesChannelList.length > 0) {
        this.state.map.clearOverlays(); 
        this.addMarker(this.state.map, nextProps.XQDataInfo.servicesChannelList)
        this.addWindow(this.state.map, nextProps.XQDataInfo.getHistogram, nextProps.XQDataInfo.xqInfo)
      } else if(nextProps.XQDataInfo.getHistogram) {
        this.state.map.clearOverlays(); 
        this.addWindow(this.state.map, nextProps.XQDataInfo.getHistogram, nextProps.XQDataInfo.xqInfo)
      } else {
        this.state.map.clearOverlays(); 
      }
    }
  }

  componentWillMount() {
    this.props.getXqList()
    this.props.getServicesChannelList()
    this.props.getHistogram()
    this.props.getZonetotal()
  }

  componentDidMount() {
    let _this = this
    let screenH = document.documentElement.clientHeight
    let mainDom = document.getElementsByClassName("data_info_item")
    let leftBottom = document.querySelector(".data_info_left_bottom")
    mainDom[0].style.height = screenH/12 + 'rem'
    mainDom[1].style.height = screenH/12 + 'rem'
    leftBottom.style.height = screenH - 10*12 - 20 + 'px'
    const map = new BMap.Map("dimap", {MAXZOOM: 18});
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
    map.enableScrollWheelZoom();  
    
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
      let pieWrapDom = document.querySelector('.data_info_right_2')
      let pieWrapDomHeight = utils.getStyle(pieWrapDom, 'height').height
      _this.setState({
        pieHeight: parseFloat(pieWrapDomHeight.split('px')[0]),
      })
    }
    clearTimeout(timer2)
    let timer2 = setTimeout(() => {
      let pieWrapDom = document.querySelector('.data_info_right_2')
      let pieWrapDomHeight = utils.getStyle(pieWrapDom, 'height').height
      this.setState({
        pieHeight: parseFloat(pieWrapDomHeight.split('px')[0]),
      })
    }, 1000)
  }
  
  render() {
    const {
      barHeight,
      pieHeight
    } = this.state
    const {
      diLoading,
      XQHouseTypeTotal,
      zonetotal,
      xqInfo
    } = this.props.XQDataInfo

    const toChildProps = {
      zonetotal: zonetotal,
      barHeight: barHeight,
      pieHeight: pieHeight,
      changev: this.props.changev,
    }
    
    return (
      <div>
        <Row>
          <Col span={18}  className="data_info_item data_info_left">
            <Row>
              <Col span={24} className="data_info_left_top">
                <div className="data_info_header_center">
                  <div className="data_info_header_center_bg">
                    {xqInfo?xqInfo.name:''}小区数据概览
                      <Link to="/xqdatainfo">
                        <div className="data_info_header_center_left" >
                          <span className="data_info_header_center_text" >
                            {/* 拱墅区概览 */}
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
            </Spin>
          </Col>
          <Col span={6}  className="data_info_item data_info_right">
            <div className="data_info_right_item data_info_right_1">
              <Row className="data_info_right_1_item_wrap">
                <Col span={12} className="data_info_right_1_item">
                    <Col span={12} className="data_info_right_1_item_item">
                      <div className="data_info_right_1_icon right_1_icon_green">
                        <i className="icon iconfont icon-people"></i>
                      </div>
                    </Col>
                    <Col span={12} className="data_info_right_1_item_item">
                      <div className="data_info_right_1_text">
                        <div className="data_info_right_1_text_title">常住人口</div>
                        <div className="data_info_right_1_text_num right_1_green_num">{zonetotal ? zonetotal.longTimeTotal : ''}</div>
                      </div>
                    </Col>
                </Col>
                <Col span={12} className="data_info_right_1_item data_info_green">
                    <Col span={12} className="data_info_right_1_item_item">
                      <div className="data_info_right_1_icon right_1_icon_blue">
                        <i className="icon iconfont icon-people"></i>
                      </div>
                    </Col>
                    <Col span={12} className="data_info_right_1_item_item">
                      <div className="data_info_right_1_text">
                        <div className="data_info_right_1_text_title">暂住人数</div>
                        <div className="data_info_right_1_text_num right_1_blue_num">{zonetotal ? zonetotal.flowTotal : ''}</div>
                      </div>
                    </Col>
                </Col>
              </Row>
              <Row className="data_info_right_1_item_wrap">
                <Col span={12} className="data_info_right_1_item">
                    <Col span={12} className="data_info_right_1_item_item">
                      <div className="data_info_right_1_icon right_1_icon_yellow">
                        <i className="icon iconfont icon-69"></i>
                      </div>
                    </Col>
                    <Col span={12} className="data_info_right_1_item_item">
                      <div className="data_info_right_1_text">
                        <div className="data_info_right_1_text_title">房屋总数</div>
                        <div className="data_info_right_1_text_num right_1_yellow_num">{zonetotal ? zonetotal.housingTotal-1 : ''}</div>
                      </div>
                    </Col>
                </Col>
                <Col span={12} className="data_info_right_1_item">
                    <Col span={12} className="data_info_right_1_item_item">
                      <div className="data_info_right_1_icon right_1_icon_red">
                        <i className="icon iconfont icon-car"></i>
                      </div>
                    </Col>
                    <Col span={12} className="data_info_right_1_item_item">
                      <div className="data_info_right_1_text">
                        <div className="data_info_right_1_text_title">车辆总数</div>
                        <div className="data_info_right_1_text_num right_1_red_num">{zonetotal ? zonetotal.totalVmVehicle : ''}</div>
                      </div>
                    </Col>
                </Col>
              </Row>
            </div>
            <div className="data_info_right_item data_info_right_2">
              <XQHouseTypePie {...toChildProps}/>
            </div>
            <div className="data_info_right_item data_info_right_3">
              <Row className="xq_detail_item xq_detail_item_first">
                <Col span={8}><span className="xq_detail_addr_label">小区地址:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{zonetotal ? zonetotal.zone.address : ''}</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">物业公司:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">绿洲物业</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">联系人:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">李某某</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">联系电话:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{zonetotal ? zonetotal.zone.phone : ''}</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">幢数:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{zonetotal ? zonetotal.totalStoriedBuilding : ''}</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">门禁:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{zonetotal ? zonetotal.EqptEquipmentChannelDoorTotal : ''}</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">探针:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">5</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">车辆常驻:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{zonetotal ? zonetotal.totalVmVehicle : ''}</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">车辆临时进出:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{zonetotal ? zonetotal.totalRecVehicleRecord : ''}</span></Col>  
              </Row> 
            </div>
          </Col>
        </Row>
        
      </div>
    )
  }
}

export default XQDetailInfo;
