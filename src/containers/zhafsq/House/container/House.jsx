/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/House'
import $ from 'jquery'
import {
  Row,
  Col,
  Spin,
  Table,
  Progress,
  Cascader,
  Form,
  Checkbox,
  Button
  // EnterAnimation
} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import '../style/House.less'
import utils from '../../../../util/util';

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

import IndexTopHeader from '../../component/IndexTopHeader/IndexTopHeader'
import LeftBasicData from '../../component/LeftBasicData/LeftBasicData'
import TopCascaderModal from '../../component/TopCascaderModal/TopCascaderModal'
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
const plainOptions = ['xq1', 'xq2', 'xq3'];
const defaultCheckedList = ['xq1', 'xq3'];
const CheckboxGroup = Checkbox.Group;

const searchPlainOptions = [
  { label: '自住', value: 'personalUse' },
  { label: '出租', value: 'rentOut' },
  { label: '群租', value: 'groupLive' },
  { label: '网约', value: 'Internet' },
];

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

class House extends Component {
  constructor(props) {
    super(props)
    this.initMap = this.initMap.bind(this)
    this.addWindow = this.addWindow.bind(this)
    this.state = {
      map: null,
      pieHeight: 0,
      barHeight: 0,
      cascaderLabel: localStorage.getItem('label') ? localStorage.getItem('label') : '拱墅区',
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      finalCheck: [],
      dataSource: ['拱墅区拱墅区', '上塘街道上塘街道', '中国铁建国际城', '中天西城纪', '蔡马人家'],
      housedata: null,
      loading: true,
      tableLevel: null,
      tableLevelValue: null,
    }
  }

  // 表单验证
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var level = this.state.tableLevel
    var value = this.state.tableLevelValue
    this.props.form.validateFields((err, values) => {
        var usages = values.usage.toString()
        this.props.getHouseList(level, value, usages)
    });
  }

  tableOnChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
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

  onChangeCascader = (value) => {
    switch (value.length) {
      case 1:
        this.props.getHouseList('districtId', value[0])
        this.setState({
          tableLevel: 'districtId',
          tableLevelValue: value[0],
        })
        break;
      case 2:
        this.props.getHouseList('streetId', value[1])
        this.setState({
          tableLevel: 'streetId',
          tableLevelValue: value[1],
        })
        break;
      case 3:
        this.props.getHouseList('communityId', value[2])
        this.setState({
          tableLevel: 'communityId',
          tableLevelValue: value[2],
        })
        break;
      case 4:
        this.props.getHouseList('zoneId', value[3])
        this.setState({
          tableLevel: 'zoneId',
          tableLevelValue: value[3],
        })
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

  // 初始化地图
  initMap = (map, Long, Dat) => {
    const point = new BMap.Point(Long, Dat);
    map.centerAndZoom(point, 14);
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
    this.allPost()
  }

  selecthouse(e) {    
    var _this = this
    var housingTop = _this.props.ZHAFHouse.housingTop
    var topId = $(e.target).attr('hid')
    var rentOut = housingTop.rentOut
    var groupLive = housingTop.groupLive
    var Internet = housingTop.Internet
    switch (topId) {
      case '1':        
        this.setState({
          housedata: rentOut.list
        })
        break;
      case '2':
        this.setState({
          housedata: groupLive.list
        })
        break;
      case '3':
        this.setState({
          housedata: Internet.list
        })
        break;    
      default:
        break;
    }
    $('#top_tab_container li').removeClass('active')
    $(e.target).addClass('active')
  }
  
  allPost = () => {
    this.props.getBarData()
    this.props.getPieData()
    this.props.getHouseList()
    this.props.getHousingTop()
    this.props.getPointPositionlist('1')
    this.props.getBoundaries(()=>{
      this.getBoundary()
    })    
  }


  componentWillReceiveProps(nextProps) {
    var pointlist = nextProps.ZHAFHouse.pointlist;
    if (pointlist) {
      this.addMarker(this.state.map, pointlist, marker_xq1)
    }
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
    const map = new BMap.Map("dimap", { MAXZOOM: 18 });
    // 初始化地图,设置中心点坐标和地图级别
    var point = new BMap.Point(120.149018, 30.32539);    // 105.403119, 38.028658
    map.centerAndZoom(point, 14);
    map.enableScrollWheelZoom();
    map.setMapStyle({
      style: 'midnight',
      // styleJson: mapStyleJson
    });

    window.onresize = function () {
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
    
    this.setState({
      map: map,
    })
  }

  selecthouse(e) {    
    var _this = this
    var housingTop = _this.props.ZHAFHouse.housingTop
    var topId = $(e.target).attr('hid')
    var rentOut = housingTop.rentOut
    var groupLive = housingTop.groupLive
    var Internet = housingTop.Internet
    switch (topId) {
      case '1':        
        this.setState({
          housedata: rentOut.list
        })
        break;
      case '2':
        this.setState({
          housedata: groupLive.list
        })
        break;
      case '3':
        this.setState({
          housedata: Internet.list
        })
        break;    
      default:
        break;
    }
    $('#top_tab_container li').removeClass('active')
    $(e.target).addClass('active')
  }

  render() {
    const {
      cascaderLabel,
      housedata,
    } = this.state
    const {
      diLoading,
      pieTotal,
      rentOut,
      Internet,
      groupLive,
      personalUse,
      level,
      selectdata,
      tableLoading,
      barData,
      housingTop
    } = this.props.ZHAFHouse

    var housingData = housedata ? housedata : housingTop ? housingTop.rentOut.list : ''

    var levelValue = localStorage.getItem('levelValue').split(',')

    let indexTopHeaderProps = null
    if (level) {
      indexTopHeaderProps = {
        supportChangeLevel: true,
        confirmCascaderChange: this.confirmCascaderChange,
        changeOnSelect: true,
        level: level,
        label: cascaderLabel,
        titleType: 'type2',
        title: '实有房屋',
        subTitle: '拱墅区',
      }
    }

    const columns = [{
      title: '小区',
      dataIndex: 'zoneName',
      key: 'zoneName',
      width: 100
    }, {
      title: '楼幢',
      dataIndex: 'build',
      key: 'build',
      width: 50
    }, {
      title: '单元',
      dataIndex: 'unit',
      key: 'unit',
      width: 75
    }, {
      title: '楼层',
      dataIndex: 'layer',
      key: 'layer',
      width: 50
    }, {
      title: '房号',
      dataIndex: 'room',
      key: 'room',
      width: 60
    }, {
      title: '类型',
      dataIndex: 'usage',
      render: usage => utils.getHouseUsage(usage),
      filters: [{
        text: '自住',
        value: 'personalUse',
      }, {
        text: '整租',
        value: 'rentOut',
      }, {
        text: '群租',
        value: 'groupLive',
      }, {
        text: '网约',
        value: 'Internet',
      }],
      onFilter: (value, record) => record.usage.indexOf(value) === 0,
    }
    ];

    const toBasicDataProps = {
      subdistrictData: barData ? barData : [],
      subdistrictDataColor: subdistrictDataColor
    }

    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    return (
      <Spin size="large" spinning={diLoading}>
        {/* animated slideInLeft */}
        <div className="page-container"> 

          {/* 头部标题 */}
          <div className="top_fix">
            <IndexTopHeader {...indexTopHeaderProps} />

            {/* 中间-分类统计 */}
            <div className="pie_block">
              <div className="basic_box">
                <div className="box_top_title">
                  <p>分类统计<img src={rightTopTitle} /></p>
                </div>
                <div className="pie_list">
                  <Row>
                    <Col span={6}>
                      <h2>自住</h2>
                      <Progress type="circle" status="active" width={140} strokeLinecap="square" strokeWidth={21} percent={Math.round(personalUse/pieTotal*100)} className="pie_item" strokeColor="#00d900" />
                      <p>{personalUse}</p>
                    </Col>
                    <Col span={6}>
                      <h2>整租</h2>
                      <Progress type="circle" status="active" width={140} strokeLinecap="square" strokeWidth={21} percent={Math.round(rentOut/pieTotal*100)} className="pie_item" strokeColor="#04a9eb" />
                      <p>{rentOut}</p>
                    </Col>
                    <Col span={6}>
                      <h2>群租</h2>
                      <Progress type="circle" status="active" width={140} strokeLinecap="square" strokeWidth={21} percent={Math.round(groupLive/pieTotal*100)} className="pie_item" strokeColor="#ffcb2d" />
                      <p>{groupLive}</p>
                    </Col>
                    <Col span={6}>
                      <h2>网约</h2>
                      <Progress type="circle" status="active" width={140} strokeLinecap="square" strokeWidth={21} percent={Math.round(Internet/pieTotal*100)} className="pie_item" strokeColor="#8f0100" />
                      <p>{Internet}</p>
                    </Col>
                  </Row>
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
            {/* 小区房屋查询 */}
            <div className="basic_box data_info_right_item data_info_right_3">
              <div className="box_top_title">
                <p>小区房屋查询<img src={rightTopTitle} /></p>
              </div>
              <div className="area_select">
                <Cascader 
                  style={{ width: '100%' }} 
                  options={level} 
                  onChange={this.onChangeCascader}
                  defaultValue={levelValue}
                  changeOnSelect={true}
                  placeholder="请选择" 
                />
                <Form layout="inline" className="search_form" onSubmit={this.handleSubmit}>
                  <Form.Item>
                    {getFieldDecorator('usage', {
                      initialValue: ['personalUse', 'rentOut', 'groupLive', 'Internet'],
                    })(
                      <CheckboxGroup options={searchPlainOptions} />
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="blue-btn"
                      type="primary"
                      htmlType="submit"
                      disabled={this.hasErrors(getFieldsError())}
                    >
                      搜索
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <Table
                columns={columns}
                dataSource={selectdata}
                pagination={false}
                scroll={{ y: 152 }}
                onChange={this.tableOnChange}
                loading={tableLoading} />
            </div>

            {/* 各类小区数据排名 */}
            <div className="basic_box data_info_right_item data_info_right_4">
              <div className="box_top_title">
                <p>各类小区数据排名<img src={rightTopTitle} /></p>
              </div>
              <div className="right_bottom_tab clearfix">
                <div className="right_block">
                  <div className="tab_top">
                    <a className="arrow-left" href="#" onClick={this.tabScoll}></a>
                    <a className="arrow-right" href="#" onClick={this.tabScoll}></a>
                    <ul id="top_tab_container" className="clearfix">
                      <li className="active" onClick={this.selecthouse.bind(this)} hid="1">整租房</li>
                      <li onClick={this.selecthouse.bind(this)} hid="2">群租房</li>
                      <li onClick={this.selecthouse.bind(this)} hid="3">网约房</li>
                    </ul>
                  </div>
                  <div className="list_block list_scroll">
                    {
                      housingData.length > 0 ? housingData.map((item, index) => {
                        return (
                          <div className="record_item" key={index}>
                            <div className="record_num">{index + 1}</div>
                            <div className="record_name">{item.streetName}--{item.zoneName}</div>
                            <div className="record_value">{item.num}</div>
                          </div>
                        )
                      }) : <div className="nodata">暂无排名数据</div>
                    }
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

export default Form.create()(House);