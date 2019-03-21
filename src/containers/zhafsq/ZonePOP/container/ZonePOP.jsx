/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions/ZonePOP'
import $ from 'jquery'
import {
  Spin,
} from 'antd'

import '../style/ZonePOP.less'

import utils from '../../../../util/util';

import mapStyleJson from '../../../../static/json/mapStyleJson.json'
import rightTopTitle from '../../../../static/images/zhafsq/border_after_index.png'
import listIcon1 from '../../../../static/images/zhafsq/list_icon1.png'
import listIcon2 from '../../../../static/images/zhafsq/list_icon2.png'
import listIcon3 from '../../../../static/images/zhafsq/list_icon3.png'

import IndexTopHeader from '../../component/IndexTopHeader/IndexTopHeader'
import LeftBasicData from '../../component/LeftBasicDataPOP/LeftBasicData'
import TopCascaderModal from '../../component/TopCascaderModal/TopCascaderModal'
import XQHouseTypePie from './XQHouseTypePie'
import NativePlaceBar from './NativePlaceBar'
import '../../../../static/css/animate.css';
import '../../../../static/css/tooltip-line.css';

import {
  tabsData,
  subdistrictDataColor

} from './markerJsonData'

Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};

Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
 
@connect(
    state => state,
    {...actions}
)

class ZonePOP extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      time: null,
      pieHeight: 0,
      barHeight: 0,
      isHalf1: true,
      isHalf2: true,
      isHalf3: true,
      isHalf4: true,
      bottomData: null,
      nowleval: null,
      boxVisiable: true,
      saveMacData: [],
      returnMacData: [],
      cascaderLabel: localStorage.getItem('label') ? localStorage.getItem('label') : '拱墅区',
      indeterminate: true,
      checkAll: false,
      finalCheck: [],
      dataSource: ['拱墅区拱墅区','上塘街道上塘街道','中国铁建国际城', '中天西城纪', '蔡马人家'],
      childTabData: tabsData.distribution,
      rightselect:[]
    }
  }

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

  // 横向tab滚动
  tabScoll = (e) => {
    e.preventDefault();
    var d = $(e.target)
    var d2 = $('#top_tab_container')
    var d2li = $('#top_tab_container li').eq(0)
    var dclass = d.attr('class')
    if (dclass == "arrow-left") {
      var scollLen = Math.abs(d2li.position().left - 20 + 93) > 93 ? Math.abs(d2li.position().left - 20 + 93) : 0;
      console.log( scollLen );
      d2.scrollLeft(scollLen)
    } else {
      var scollLen =  Math.abs(d2li.position().left - 20 - 93);
      console.log( scollLen );
      d2.scrollLeft(scollLen)
    }
  }

  onChangeCascader = (value) => {
    console.log(value);
    switch (value.length) {
      case 1:
        this.props.getPieData('districtId', value[0])
        break;
      case 2:
        this.props.getPieData('streetId', value[1])
        break;
      case 3:
        this.props.getPieData('communityId', value[2])
        break;
      case 4:
        this.props.getPieData('zoneId', value[3])
        break;    
      default:
        break;
    }
  }

  // 拿到TopCascaderModalContent组件级联选择的数据
  confirmCascaderChange = (value) => {
    console.log(value)
    // this.props.changev({
    //   levelValue: value.levelValue,
    //   level: value.level,
    //   levelId: value.levelId,
    // })
    localStorage.setItem('levelValue', value.levelValue)
    localStorage.setItem('level', value.level)
    localStorage.setItem('levelId', value.levelId)
    localStorage.setItem('label', value.label)
    this.setState({
      cascaderLabel: value.label
    })
    if (value.level == 'zoneId') {
      window.location.href="/zhaf/zonepop"
    } else {
      this.allPost()
    }
  }

  allPost = () => {
    this.props.getBarData()
    this.props.getPeopleFocus()
    this.props.getPeopleNative()
  }

  componentWillReceiveProps(nextProps) {
    // https://mapv.baidu.com/examples/#baidu-map-point-honeycomb.html
    var map = this.state.map
    var pointNativeArr = nextProps.ZHAFZonePOP.pointNativeArr
    if (pointNativeArr) {
        function checkAdult(item) {
          return item.longitude != null;
        }
        var arr2 = pointNativeArr.filter(checkAdult);
        var data = arr2.map((item) =>({
                geometry: {
                    type: 'Point',
                    coordinates: [item.longitude, item.latitude]
                },
                count: item.num
        }));
        var dataSet = new mapv.DataSet(data);
        var options = {
            fillStyle: 'rgba(55, 50, 250, 0.8)',
            shadowColor: 'rgba(255, 250, 50, 1)',
            shadowBlur: 20,
            max: 100,
            size: 50,
            label: {
                show: true,
                fillStyle: 'white',
            },
            globalAlpha: 0.5,
            gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
            draw: 'honeycomb'
        }
        if (map) {
          var point = new BMap.Point(108.93, 34.27); 
          map.centerAndZoom(point,5);
          var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
        }
    }
  }
  

  componentWillMount() {
    this.props.getLevel();
    this.allPost();
  }

  componentDidMount() {
    let _this = this
    // 鼠标跟随
    $(document).mousemove(function (e) {
      var xPos = parseInt(e.pageX+12) + "px";
      var yPos = e.pageY + "px";
      $(".legend").css("left", xPos)
      $(".legend").css("top", yPos-50);
    });

    let screenH = document.documentElement.clientHeight
    let pageContainer = document.querySelector(".page-container")
    pageContainer.style.height = screenH + 'px'

    const map = new BMap.Map("dimap", {minZoom: 3, maxZoom: 7}); 
    // 初始化地图,设置中心点坐标和地图级别
    var point = new BMap.Point(108.93, 34.27);    
    map.centerAndZoom(point,5);
    map.enableScrollWheelZoom();  
    map.setMapStyle({
      style:'midnight',
      // styleJson: mapStyleJson
    });
    this.setState({
      map: map,
    })
    
    window.onresize = function() {
      let screenH = document.documentElement.clientHeight
      let screenW = document.documentElement.clientWidth
      let mainDom = document.getElementsByClassName("data_info_item")
      let leftBottom = document.querySelector(".data_info_left_bottom")
      let pageContainer = document.querySelector(".page-container")
      pageContainer.style.height = screenH + 'px'
      let barWrapDom = document.querySelector('.data_info_right_4')
      let barWrapDomHeight = utils.getStyle(barWrapDom, 'height').height
      _this.setState({
        barHeight: parseFloat(barWrapDomHeight.split('px')[0])
      })
    }
  }

  render() {
    const {
      cascaderLabel,
    } = this.state
    const {
      diLoading,
      level,
      rightselect,
      pointlist,
      barData,
      residence,
      userTotal,
      tagData,
      nativeArr,
    } = this.props.ZHAFZonePOP

    const toPieProps = {
      housingInfo: tagData
    }

    let toBarProps = {}
    if (nativeArr) {
        toBarProps = {
            nativeArr: nativeArr,
        }        
    }

    const toBasicDataProps = {
      subdistrictData: barData ? barData : [],
      subdistrictDataColor: subdistrictDataColor
    }
  
    let indexTopHeaderProps = null
    if (level) {
      indexTopHeaderProps = {
        supportChangeLevel: true,
        confirmCascaderChange: this.confirmCascaderChange,
        changeOnSelect: true,
        level: level,
        label: cascaderLabel,      
        titleType: 'type2',
        title: '实有人口',
      }      
    }

    return (
      <Spin size="large" spinning={diLoading}>
        {/* animated slideInLeft */}
        <div className="page-container">
          
          {/* 头部标题 */}
          <div className="top_fix">
            <IndexTopHeader {...indexTopHeaderProps} />

            {/* 中间-关注人员 */}
            <div className="notice_block">
              <div className="basic_box">
                <div className="box_top_title">
                    <p>关注人员<img src={rightTopTitle} /></p>
                </div>
                <div className="notice_list">
                  {pointlist ? pointlist.map((item, key) => {
                    var classSmall
                    if (item.name.length > 5) {
                       classSmall = 'fontsmall'
                    } else {
                      classSmall = ''
                    }
                    return(
                      <div key={key} className="notice_item">
                        <div className={"notice_label " + classSmall}>{item.name}</div>
                        <div className="notice_value">{item.num}人</div>
                      </div>
                    )
                  }) : ''}
                </div>
              </div>
            </div>
          </div> 

          {/* 地图 */}
          <div className="bottom_fix">
            <div className="basic_box data_info_left_bottom">
                <div className="box_top_title">
                    <p>流动人口原籍分布<img src={rightTopTitle} /></p>
                </div>
                <div id="dimap"></div>
                <NativePlaceBar {...toBarProps}/>
            </div>
          </div>    
          
          {/* 左边-基础数据 */}
          <div className="left_fix">
            <div className="basic_box">
                <div className="box_top_title">
                    <p>基础数据<img src={rightTopTitle} /></p>
                </div>
                <p className="topTotal">实有人口：<span>{userTotal}</span>人</p>
                <p className="topTotal">居住证数：<span>{residence}</span>人</p>
                <LeftBasicData {...toBasicDataProps} />            
            </div>
            <div className="basic_box">
                <div className="box_top_title"></div>
                <XQHouseTypePie {...toPieProps}/>
            </div>
          </div>

          {/* 右边 */}   
          <div className="right_fix">
            {/* 人员布控 */}
            <div className="basic_box data_info_right_item data_info_right_4">
              <div className="box_top_title">
                  <p>人员布控<img src={rightTopTitle} /></p>
              </div>
              <div className="right_bottom_tab clearfix">
                <div className="right_block">
                  <div className="tab_top">
                    <a className="arrow-left" href="#" onClick={this.tabScoll}></a>
                    <a className="arrow-right" href="#" onClick={this.tabScoll}></a>
                    <ul id="top_tab_container" className="clearfix">
                      <li className="active">当前</li>
                      <li>预警</li>
                      <li>历史记录</li> 
                    </ul>
                  </div>
                  <div className="list_block list_scroll">
                      <div className="list_card">
                        <img className="catch_pic" src="https://avatars0.githubusercontent.com/u/97088?v=4"></img>
                        <div className="list_container">
                          <p><img src={listIcon1}/>吸毒人员</p>
                          <p><img src={listIcon2}/>2018-12-21 08:08:08</p>
                          <p><img src={listIcon3}/>莫干山路999号</p>
                        </div>
                      </div>
                      <div className="list_card">
                        <img className="catch_pic" src="https://avatars0.githubusercontent.com/u/97088?v=4"></img>
                        <div className="list_container">
                          <p><img src={listIcon1}/>吸毒人员</p>
                          <p><img src={listIcon2}/>2018-12-21 08:08:08</p>
                          <p><img src={listIcon3}/>莫干山路999号</p>
                        </div>
                      </div>
                      <div className="list_card">
                        <img className="catch_pic" src="https://avatars0.githubusercontent.com/u/97088?v=4"></img>
                        <div className="list_container">
                          <p><img src={listIcon1}/>吸毒人员</p>
                          <p><img src={listIcon2}/>2018-12-21 08:08:08</p>
                          <p><img src={listIcon3}/>莫干山路999号</p>
                        </div>
                      </div>
                      <div className="list_card">
                        <img className="catch_pic" src="https://avatars0.githubusercontent.com/u/97088?v=4"></img>
                        <div className="list_container">
                          <p><img src={listIcon1}/>吸毒人员</p>
                          <p><img src={listIcon2}/>2018-12-21 08:08:08</p>
                          <p><img src={listIcon3}/>莫干山路999号</p>
                        </div>
                      </div>
                      <div className="list_card">
                        <img className="catch_pic" src="https://avatars0.githubusercontent.com/u/97088?v=4"></img>
                        <div className="list_container">
                          <p><img src={listIcon1}/>吸毒人员</p>
                          <p><img src={listIcon2}/>2018-12-21 08:08:08</p>
                          <p><img src={listIcon3}/>莫干山路999号</p>
                        </div>
                      </div>
                      <div className="list_card">
                        <img className="catch_pic" src="https://avatars0.githubusercontent.com/u/97088?v=4"></img>
                        <div className="list_container">
                          <p><img src={listIcon1}/>吸毒人员</p>
                          <p><img src={listIcon2}/>2018-12-21 08:08:08</p>
                          <p><img src={listIcon3}/>莫干山路999号</p>
                        </div>
                      </div>
                      <div className="list_card">
                        <img className="catch_pic" src="https://avatars0.githubusercontent.com/u/97088?v=4"></img>
                        <div className="list_container">
                          <p><img src={listIcon1}/>吸毒人员</p>
                          <p><img src={listIcon2}/>2018-12-21 08:08:08</p>
                          <p><img src={listIcon3}/>莫干山路999号</p>
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

export default ZonePOP;

// 地图边界，tabs切换