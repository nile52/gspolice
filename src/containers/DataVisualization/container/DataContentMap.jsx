/* eslint-disable */
import React, {Component} from 'react';
import { Row, Col } from 'antd';
import $ from 'jquery'
import sxt1 from '../../../static/images/sxt1.gif'
import sxt3 from '../../../static/images/sxt3.gif'
import rlsx1 from '../../../static/images/rlsx1.png'
import rlsx3 from '../../../static/images/rlsx3.png'
import '../style/DataVisualization.less'

class DataContentMap extends Component {
  constructor(props) {
    super(props)
    this.addMarker = this.addMarker.bind(this)
    this.state = {
      map: null,
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
        let _this = this
        function myClick(){  
          // alert($(".BMap_pop").length)  
          if(document.getElementById('video_input_state').value == '在线') {
            if($(".BMap_pop").length>0){//有BMap_pop证明信息窗口已经打开 
              
              var buttonobj=document.createElement("button"); 
              buttonobj.className = "gotohere"  
              buttonobj.innerHTML = "查看录像";  
              buttonobj.style = `
                width: 70px; 
                height: 30px; 
                position: absolute; 
                left: 90px; 
                top: 60px; 
                z-index: 100;
                outline: 0;
                border: 0;
                color: #fff;
                background-color: cornflowerblue;
              `  
              buttonobj.onclick=function(e){ 
                let id = document.getElementById('video_input_id').value
                _this.props.getHomePlay(id, () => {
                  _this.props.handleOk('videoContentVisible')
                })
              }  
              var xxx = $(".BMap_pop");  
              xxx.remove(".gotohere");  
              if(1 > $(".gotohere").length){
                  xxx.append(buttonobj);  
              }else{}  
                
            }else{  
                myClick();  
            }  
          } else {
            var xxx = $(".gotohere");  
            xxx.remove();  
          }
          
      }
        const point = new BMap.Point(item.longitude, item.latitude);
        const myIcon = new BMap.Icon(imgObj, new BMap.Size(30,30));
        const marker = new BMap.Marker(point, {
          icon: myIcon
        });
        const sDom = `<div>
          <div class="service_infowindow">
            <label class="service_infowindow_label">设备名称:</label>
            <span class="service_infowindow_text">${item.name}</span>
          </div>
          <div class="service_infowindow">
            <label class="service_infowindow_label">运行状态:</label>
            <span class="service_infowindow_text">${item.state?'在线':'离线'}</span>
          </div>
          <input type="hidden" id="video_input_id" value="${item.id}"/> 
          <input type="hidden" id="video_input_state" value="${(item.state && (item.type.indexOf('编码通道')>-1 || item.type.indexOf('门禁通道')>-1))?'在线':'离线'}"/> 
          
          ${(item.state && (item.type.indexOf('编码通道')>-1 || item.type.indexOf('门禁通道')>-1))?
          `<div class="service_infowindow_btn_wrap">
            <button id="service_infowindow_btn" class="service_infowindow_btn"></button>
          </div>`:''}
        </div>`
        const _iw = new BMap.InfoWindow(sDom);  
        marker.addEventListener("click", function(e) {
          this.openInfoWindow(_iw); 
          myClick()
        });
        map.addOverlay(marker);
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.xqInfo && this.state.map) {
      this.initMap(this.state.map, nextProps.xqInfo.longitude, nextProps.xqInfo.latitude)   
    } 
    if(this.state.map) {
      if(nextProps.servicesChannelList.length > 0) {
        this.state.map.clearOverlays(); 
        this.addMarker(this.state.map, nextProps.servicesChannelList)
      } else {
        this.state.map.clearOverlays(); 
      }
    }
  }

  componentDidMount () {
    let mainDom =  document.querySelector('.data_content_map')
    let mapDom =  document.querySelector('#allmap')
    // document.documentElement.clientHeight
    let screenH = document.documentElement.clientHeight
    let headerH = 11*12
    let mainH = (screenH-headerH)
    mainDom.style.height = mainH/12 + 'rem'
    mapDom.style.height = mainH/12 + 'rem'
    window.onresize = function() {
      let screenH = document.documentElement.clientHeight
      let headerH = 11*12
      let mainH = (screenH-headerH)
      mainDom.style.height = mainH/12 + 'rem'
      mapDom.style.height = mainH/12 + 'rem'
    }
    const map = new BMap.Map("allmap");
    let Long, Dat;
    if(this.props.xqInfo.longitude && this.props.xqInfo.latitude) {
      Long = this.props.xqInfo.longitude
      Dat = this.props.xqInfo.latitude
    } else {
      Long = 120.156919
      Dat = 30.332474 
    }
    if (this.props.xqInfo) {
      this.initMap(map, Long, Dat)   
    }  
    if(this.props.servicesChannelList.length > 0) {
      map.clearOverlays(); 
      this.addMarker(map, this.props.servicesChannelList)
    }else{
      map.clearOverlays(); 
    }
    map.enableScrollWheelZoom();  
    map.setMapStyle({style:'midnight'});
    this.setState({
      map: map
    })
  }

  render() {
    return (
      <div className="data_content_map">
        <div id="allmap"></div>
      </div>
    )
  }
}

export default DataContentMap;