/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/Population'
import $ from 'jquery'
import {
  Spin,
  Cascader
  // EnterAnimation
} from 'antd'

import '../style/Population.less'

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

import IndexTopHeader from '../../component/IndexTopHeader/IndexTopHeader'
import LeftBasicData from '../../component/LeftBasicData/LeftBasicData'
import TopCascaderModal from '../../component/TopCascaderModal/TopCascaderModal'
import XQHouseTypePie from './XQHouseTypePie'
import '../../../../static/css/animate.css';
import '../../../../static/css/tooltip-line.css';

import {
  xqJson1,
  xqJson2,
  xqJson3,
  gzJson,
  llJson,
  fwJson,
  dwJson,
  afJson,
  crJson,
  wyJson,
  tabsData,
  subdistrictDataColor

} from './markerJsonData'
import axios  from 'axios'
const plainOptions = ['xq1', 'xq2', 'xq3'];
const defaultCheckedList = ['xq1', 'xq3'];

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

class Population extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      pieHeight: 0,
      barHeight: 0,
      cascaderLabel: localStorage.getItem('label') ? localStorage.getItem('label') : '拱墅区',
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      finalCheck: [],
      dataSource: ['拱墅区拱墅区','上塘街道上塘街道','中国铁建国际城', '中天西城纪', '蔡马人家'],
      childTabData: tabsData.distribution,
      rightselect:[]
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

  // 编写自定义函数,创建标注
  dealMarker = (map, finalCheck) => {
    map.clearOverlays();
    finalCheck.forEach((item, index) => {
      switch (item) {
        case 'xq1':
          this.addMarker(map, xqJson1, marker_xq1)
          break;
        case 'xq2':
          this.addMarker(map, xqJson2, marker_xq2)
          break;
        case 'xq3':
          this.addMarker(map, xqJson3, marker_xq3)
          break;
        case 'gz':
          this.addMarker(map, gzJson, marker_gz)
          break;
        case 'll':
          this.addMarker(map, llJson, marker_ll)
          break;
        case 'fw':
          this.addMarker(map, fwJson, marker_fw)
          break;
        case 'dw':
          this.addMarker(map, dwJson, marker_dw)
          break;
        case 'af':
          this.addMarker(map, afJson, marker_af)
          break;
        case 'cr':
          this.addMarker(map, crJson, marker_cr)
          break;
        case 'wy':
          this.addMarker(map, wyJson, marker_wy)
          break;
        default:
          break;
      }
    });
  }

  // 编写自定义函数,创建标注
  addMarker = (map, points, marker_img) => {
    points.forEach((item, index) => {
      if(item.longitude && item.latitude) {
        var point = new BMap.Point(item.longitude, item.latitude);
        const markerIcon = new BMap.Icon(marker_img, new BMap.Size(16,16));
        var marker = new BMap.Marker(point, {
          icon: markerIcon,
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
    for(var i = 0; i < count; i++){
      var ply = new BMap.Polygon(boundaries[i], {
        strokeWeight: 2, 
        strokeColor: 'rgb(139, 246, 235)',
        strokeOpacity:0.0, 
        fillOpacity: 0.3, 
        fillColor: "#000000"
      }); //建立多边形覆盖物
      ply.disableMassClear(); //禁止覆盖物在 map.clearOverlays 方法中被清除。
      map.addOverlay(ply);  //添加覆盖物
    }
    this.setState({
      ply: ply
    })
  }

  // 拿到TopCascaderModalContent组件级联选择的数据
  confirmCascaderChange = (value) => {
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
    this.props.getPieData('districtId', '2')
    this.props.getBoundaries(()=>{
      this.getBoundary()
    })    
  }

  componentWillMount() {
    this.props.getLevel();
    this.allPost();
  }

  componentDidMount() {
    let _this = this

    let screenH = document.documentElement.clientHeight
    let pageContainer = document.querySelector(".page-container")
    pageContainer.style.height = screenH + 'px'

    window.onresize = function() {
      let screenH = document.documentElement.clientHeight
      let pageContainer = document.querySelector(".page-container")
      pageContainer.style.height = screenH + 'px'
      let pieWrapDom = document.querySelector('.data_info_right_3')
      let pieWrapDomHeight = utils.getStyle(pieWrapDom, 'height').height
      let barWrapDom = document.querySelector('.data_info_right_4')
      let barWrapDomHeight = utils.getStyle(barWrapDom, 'height').height
      _this.setState({
        pieHeight: parseFloat(pieWrapDomHeight.split('px')[0]),
        barHeight: parseFloat(barWrapDomHeight.split('px')[0])
      })
    }

    // 鼠标跟随
    $(document).mousemove(function (e) {
      var xPos = parseInt(e.pageX+12) + "px";
      var yPos = e.pageY + "px";
      $(".legend").css("left", xPos)
      $(".legend").css("top", yPos-50);
    });

    const map = new BMap.Map("dimap", {MAXZOOM: 18}); 
    // 初始化地图,设置中心点坐标和地图级别
    var point = new BMap.Point(120.149018,30.32539);    
    map.centerAndZoom(point,14);
    map.enableScrollWheelZoom();  
    map.setMapStyle({
      style:'midnight',
      // styleJson: mapStyleJson
    });
    this.setState({
      map: map,
    })
  }

  render() {
    const {
      cascaderLabel,
    } = this.state
    const {
      diLoading,
      barData,
      level,
      rightselect,
      cascaderLoading,
      pointlist
    } = this.props.ZHAFPopulation

    const toPieProps = {
      housingInfo: rightselect
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
        subTitle: '拱墅区',
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
            <div className="data_info_left_bottom">
                <div id="dimap"></div>
            </div>
          </div>    
          
          {/* 左边-基础数据 */}
          <div className="basic_box left_fix">
            <div className="box_top_title">
                <p>基础数据<img src={rightTopTitle} /></p>
            </div>
            <LeftBasicData {...toBasicDataProps} />
          </div>

          {/* 右边 */}   
          <div className="right_fix">
            {/* 人口查询 */}
            <div className="basic_box data_info_right_item data_info_right_3">
              <div className="box_top_title">
                  <p>人口查询<img src={rightTopTitle} /></p>
              </div>
              
              <div className="area_select">
                <Cascader 
                  style={{ width: '100%' }} 
                  options={level} 
                  onChange={this.onChangeCascader}
                  changeOnSelect={true}
                  placeholder="请选择" 
                />
              </div>
              <Spin size="large" spinning={cascaderLoading}>
                <div className="right_pie_block">
                  <XQHouseTypePie {...toPieProps}/>
                </div>
                <div className="right_piedata_block">
                  <div className="total_data">
                    <p>实有人口：<span>{rightselect ? rightselect.total ? rightselect.total : '0' : '0'}</span></p>
                    <p>居住证数：{rightselect ? rightselect.residenceTotal ? rightselect.residenceTotal : '0' : '0'}</p>
                  </div>
                  <ul>
                    <li>常住人口：{rightselect ? rightselect.permanentTotal? rightselect.permanentTotal : '0' : '0'}</li>
                    <li>流动人口：{rightselect ? rightselect.flowTotal ? rightselect.flowTotal : '0' : '0'}</li>
                    <li>其他：{rightselect ? rightselect.total - rightselect.permanentTotal - rightselect.flowTotal ? rightselect.total - rightselect.permanentTotal - rightselect.flowTotal : '0' : '0'}</li>
                  </ul>
                </div>
              </Spin>
            </div>

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

export default Population;

// 地图边界，tabs切换