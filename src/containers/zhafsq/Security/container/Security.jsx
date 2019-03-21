/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/Security'
import $ from 'jquery'
import {
  Modal,
  Spin,
  Table,
  Form,
  Cascader,
  Checkbox,
  Button,
  Input,
  Badge,
} from 'antd'
import '../style/Security.less'
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
import videoLoading from '../../../../static/images/zhafsq/loading_video.gif'
import rightTopTitle from '../../../../static/images/zhafsq/border_after_index.png'
import IndexTopHeader from '../../component/IndexTopHeader/IndexTopHeader'
import LeftBasicData from '../../component/LeftBasicData/LeftBasicData'
import TopCascaderModal from '../../component/TopCascaderModal/TopCascaderModal'
import * as toastr from 'toastr';
import '../../../../static/css/toastr.min.css';
import '../../../../static/css/animate.css';
import '../../../../static/css/tooltip-line.css';

import bgleft from '../../../../static/images/zhafsq/0.png'
import bgright  from '../../../../static/images/zhafsq/1.png'

import {
  subdistrictDataColor,
  tableDataEtcGuard
} from './markerJsonData'

import { Select } from 'antd';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['xq1', 'xq2', 'xq3'];
const defaultCheckedList = ['xq1', 'xq3'];

// 0:失效 1:有效 2:在建
const searchPlainOptions = [
  { value: '0', label: '失效' },
  { value: '1', label: '有效' },
  { value: '2', label: '在建' },
];

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

class Security extends Component {
  constructor(props) {
    super(props)
    this.initMap = this.initMap.bind(this)
    this.addWindow = this.addWindow.bind(this)
    this.state = {
      map: null,
      time: null,
      pieHeight: 0,
      barHeight: 0,
      cascaderLabel: localStorage.getItem('label') ? localStorage.getItem('label') : '拱墅区',
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      finalCheck: [],
      dataSource: ['拱墅区拱墅区','上塘街道上塘街道','中国铁建国际城', '中天西城纪', '蔡马人家'],
      modalData: [],
      modalVisible: false,
      loading:true,
      faceidDetail:{
        'address':'佳源银座一楼大厅',
        'name':'人行闸机',             
        'model':'DH-ASI858988',
        'size':'七寸',
        'type':'人脸识别门禁',
        'owner':'XX物业',
        'publictime':'2019-01-0100:00:01',
        'protect':'浙江启融',
        'lasttime':'2019_01_09 18:00:01',
      },
      people:{
        'name':'张佳佳',
        'pid':'41018935566559588995',             
        'address':'拱墅区大关街道大关西六苑24幢3单元403室',
        'tel':'15825848598',
      },
      statistic:{
        'passtime':'2019-01-06 16:03:94',
        'lastpasstime':'2019-01-06 16:03:94',
        'passSeven':'23',
        'passAll':'151',
      },
    }
  }

  // 关闭模态框
  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
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
      if (!err) {
        if (!values.status.toString().length) {
          return toastr.error('请勾选设备状态')
        }
        var searchArr = {
          state: values.status.toString().length ? values.status.toString() : null,
          name: values.name,
          supplier: values.supplier
        }
        if (values.devType) {
          searchArr['devType'] = values.devType
        }
        this.props.getEquipmentList( level, value, searchArr,)
        this.setState({
          searchArr: searchArr
        })
      }
    });
  }

  tableOnChange = (pagination, filters, sorter) => {
    var level = this.state.tableLevel
    var value = this.state.tableLevelValue
    console.log('params', pagination, filters, sorter);
    var searchArr = this.state.searchArr
    var page = pagination.current
    var limit = pagination.pageSize
    this.props.getEquipmentList(level, value, searchArr, page, limit)
  }

  onChangeCascader = (value) => {
    switch (value.length) {
      case 1:
        this.props.getEquipmentList('districtId', value[0])
        this.setState({
          tableLevel: 'districtId',
          tableLevelValue: value[0],
        })
        break;
      case 2:
        this.props.getEquipmentList('streetId', value[1])
        this.setState({
          tableLevel: 'streetId',
          tableLevelValue: value[1],
        })
        break;
      case 3:
        this.props.getEquipmentList('communityId', value[2])
        this.setState({
          tableLevel: 'communityId',
          tableLevelValue: value[2],
        })
        break;
      case 4:
        this.props.getEquipmentList('zoneId', value[3])
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

  CheckboxGroupOpen = (e) => {
    $(e.target).siblings('.marker_checkbox_group').toggleClass('show')
  }

  // 初始化地图
  initMap = (map, Long, Dat) => {
    const point = new BMap.Point(Long, Dat);
    map.centerAndZoom(point, 14); 
    // this.getBoundary(map)
  }

  // 编写自定义函数,创建标注
  dealMarker = (map, finalCheck) => {
    map.clearOverlays();
    finalCheck.forEach((item, index) => {
      switch (item) {
        case 'gate_barrier':
          this.addMarker(map, this.props.ZHAFSecurity.gate_barrier, marker_xq1)
          break;
        case 'gate_lot':
          this.addMarker(map, this.props.ZHAFSecurity.gate_lot, marker_xq2)
          break;
        case 'mac':
          this.addMarker(map, this.props.ZHAFSecurity.mac, marker_xq3)
          break;
        case 'monitor':
          this.addMarker(map, this.props.ZHAFSecurity.monitor, marker_gz)
          break;
        case 'witness':
          this.addMarker(map, this.props.ZHAFSecurity.witness, marker_ll)
          break;
        case 'guest':
          this.addMarker(map, this.props.ZHAFSecurity.guest, marker_fw)
          break;
        case 'video_intercom':
          this.addMarker(map, this.props.ZHAFSecurity.video_intercom, marker_dw)
          break;
        case 'etc_guard':
          this.addMarker(map, this.props.ZHAFSecurity.etc_guard, marker_af)
          break;
        case 'face_camera':
          this.addMarker(map, this.props.ZHAFSecurity.face_camera, marker_cr)
          break;
        default:
          break;
      }
    });
  }

  // 编写自定义函数,创建标注
  addMarker = (map, points, marker_img) => {
    var _this = this
    points.forEach((item, index) => {
      if(item.longitude && item.latitude) {
        var point = new BMap.Point(item.longitude, item.latitude);
        const markerIcon = new BMap.Icon(marker_img, new BMap.Size(16,16));
        var marker = new BMap.Marker(point, {
          icon: markerIcon,
          title: item.name,
          id: item.id,
          type: item.devType
        });
        marker.addEventListener('click',function(e){
          var mid = item.id
          var mtype = item.devType
          _this.props.getEquipmentInfo(mid);
          _this.setState({
            mtype: mtype,
            modalVisible: true,
          })
          if (mtype == 'etc_guard') {
            var topVideo = $("#video")[0]
            // var url = $("#video").attr('data-url')
            var url = 'http://112.17.106.71:7086/live/cameraid/1000072%240/substream/1.m3u8'
            var hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(topVideo);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
              topVideo.play();
            })            
          }
        })
        map.addOverlay(marker);
      }
    });
  }

  // 编写自定义函数,创建标注
  addWindow = (map, services) => {
    var _this = this
    services.forEach((item, index) => {
      if(item.longitude && item.latitude) {
        var point = new BMap.Point(item.longitude, item.latitude);
        const blueIcon = new BMap.Icon(marker_blue, new BMap.Size(32,32));
        var marker = new BMap.Marker(point, {
          icon: blueIcon,
          title: item.name,
          id: '1111'
        });
        // 标注点击弹框
        marker.addEventListener("click", function(e) {
          console.log(_this)
          _this.setState({
            modalData: services[index],
            modalVisible: true,
          })
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

  modalHandleOk = (e) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  }

  modalHandleCancel = (e) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  }

  // 拿到TopCascaderModalContent组件级联选择的数据
  confirmCascaderChange = (value) => {
    localStorage.setItem('levelValue', value.levelValue)
    localStorage.setItem('level', value.level)
    localStorage.setItem('levelId', value.levelId)
    localStorage.setItem('label', value.label)
    this.setState({
      cascaderLabel: value.label,
      levelValue: value.levelValue
    })
    this.allPost()
  }

  allPost = () => {
    this.props.getBarData()
    this.props.getEquipmentList()
    this.props.getEquipmentTotal()    
    this.props.getBoundaries(()=>{
      this.getBoundary()
    })
    this.props.getEquipmentPoint('gate_barrier')
    this.props.getEquipmentPoint('gate_lot')
    this.props.getEquipmentPoint('mac')
    this.props.getEquipmentPoint('monitor')
    this.props.getEquipmentPoint('witness')
    this.props.getEquipmentPoint('guest')
    this.props.getEquipmentPoint('video_intercom')
    this.props.getEquipmentPoint('etc_guard')
    this.props.getEquipmentPoint('face_camera')
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
      _this.setState({
        pieHeight: parseFloat(pieWrapDomHeight.split('px')[0]),
      })
    }

    const map = new BMap.Map("dimap", {MAXZOOM: 14}); 
    // 初始化地图,设置中心点坐标和地图级别
    var point = new BMap.Point(120.149018,30.32539);    //120.149018,30.32539
    map.centerAndZoom(point,14);
    map.enableScrollWheelZoom();  
    map.setMapStyle({
      style:'midnight',
    });

    this.setState({
      map: map,
    })
  }

  render() {
    const {
      cascaderLabel,
      levelValue,
      mtype,
    } = this.state
    const {
      diLoading,
      tableLoading,
      level,
      barData,
      tableData,
      equipmentTotal,
      tableCurrPage,
      tableTotalCount
    } = this.props.ZHAFSecurity   

    let levelValueTable = localStorage.getItem('levelValue') ? localStorage.getItem('levelValue').split(',') : ''
  
    let indexTopHeaderProps = null
    if (level) {
      indexTopHeaderProps = {
        supportChangeLevel: true,
        confirmCascaderChange: this.confirmCascaderChange,
        changeOnSelect: true,
        level: level,
        label: cascaderLabel,      
        titleType: 'type2',
        title: '实有安防设备',
        subTitle: '拱墅区',
      }
    }

    const toBasicDataProps = {
      subdistrictData: barData,
      subdistrictDataColor: subdistrictDataColor
    }

    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    const columns = [{
        title: '设备名称',
        dataIndex: 'name',
        render: (text, record) => {
          var badge = ''
          switch (record.status) {
            case 0:
              badge = <Badge status="error" />
              break;
            case 1:
              badge = <Badge status="success" />
              break;              
            case 2:
              badge = <Badge status="warning" />
              break;
            default:
              break;
          }
          return(
            <span>{badge} {record.name}</span>
          )
        },
      }, {
        title: '类型',
        dataIndex: 'devType',
        render: devType => utils.getEquipmentType(devType),
      }, {
        title: '运营单位',
        dataIndex: 'supplier',
        key: 'supplier',
      }
    ];


    const modalTableColumns = [{
      title: '发生时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '核验形式',
      dataIndex: 'checkout',
      key: 'checkout',
    }, {
      width: 140,
      title: '识别情况',
      dataIndex: 'result',
      render: result => result == 0 ? <span className='error'>未通过</span> : <span className='success'>通过</span>,
    }, {
      title: '核验信息',
      dataIndex: 'massage',
      key: 'massage',
    }, {
      title: '数据统计（累计核验次数）',
      dataIndex: 'num',
      key: 'num',
    }];

    return (
      <Spin size="large" spinning={diLoading}>
        {/* animated slideInLeft */}
        <div className="page-container">
          
          {/* 头部标题 */}
          <div className="top_fix">
            <IndexTopHeader {...indexTopHeaderProps} />
          </div> 

          {/* 地图 */}
          <div className="bottom_fix">
            <div className="data_info_left_bottom basic_box">
                <div className="box_top_title">
                    <p>设备点位分布<img src={rightTopTitle} />
                      <span>总数：<em>{equipmentTotal}</em></span>
                    </p>
                </div>
                <div id="dimap"></div>
                <div className="marker_checkbox_container">
                  <Checkbox value="gate_barrier" onChange={this.onCheckboxSimpleChange}>道闸设备</Checkbox>
                  <Checkbox value="gate_lot" onChange={this.onCheckboxSimpleChange}>车闸设备</Checkbox>
                  <Checkbox value="mac" onChange={this.onCheckboxSimpleChange}>mac 设备</Checkbox>
                  <Checkbox value="monitor" onChange={this.onCheckboxSimpleChange}>监控设备</Checkbox>
                  <Checkbox value="witness" onChange={this.onCheckboxSimpleChange}>人证设备</Checkbox>
                  <Checkbox value="guest" onChange={this.onCheckboxSimpleChange}>访客机设备</Checkbox>
                  <Checkbox value="video_intercom" onChange={this.onCheckboxSimpleChange}>可视对讲设备</Checkbox>
                  <Checkbox value="etc_guard" onChange={this.onCheckboxSimpleChange}> 人脸闸机设备</Checkbox>
                  <Checkbox value="face_camera" onChange={this.onCheckboxSimpleChange}>人脸摄像机</Checkbox>
                </div>
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
                  <p>单位查询<img src={rightTopTitle} /></p>
              </div>
              <div className="area_select">
                <Cascader 
                  style={{ width: '100%' }} 
                  options={level} 
                  onChange={this.onChangeCascader}
                  defaultValue={levelValue ? levelValue : levelValueTable}
                  changeOnSelect={true}
                  placeholder="请选择" 
                />

                <Form layout="inline" className="search_form" onSubmit={this.handleSubmit}>
                  <Form.Item>
                    {getFieldDecorator('name', {
                    })(
                      <Input className="search_form_item" placeholder="输入设备名称查找"/>
                    )}
                  </Form.Item>

                  <Form.Item>
                    {getFieldDecorator('supplier', {
                    })(
                      <Input className="search_form_item" placeholder="输入运营单位查找"/>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('devType', {
                      initialValue: '',
                    })(
                      <Select className="search_form_item">
                        <Option value="">全部类型</Option>
                        <Option value="gate_barrier">道闸设备</Option>
                        <Option value="gate_lot">车闸设备</Option>
                        <Option value="mac">mac 设备</Option>
                        <Option value="monitor">监控设备</Option>
                        <Option value="witness">人证设备</Option>
                        <Option value="guest">访客机设备</Option>
                        <Option value="video_intercom">可视对讲设备</Option>
                        <Option value="etc_guard">人脸闸机设备</Option>
                        <Option value="face_camera">人脸摄像机</Option>
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('status', {
                      initialValue: ['0', '1', '2'],
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
              <div className="table_container">
                <Table 
                  size="small"
                  className="zhafTable"
                  columns={columns} 
                  dataSource={tableData} 
                  pagination={{ 
                    pageSize: 20,
                    current: tableCurrPage,
                    total: tableTotalCount,
                }}
                  onChange={this.tableOnChange} 
                  loading={tableLoading}/>              
              </div>

            </div>
          </div>

          {/* 地图点位单位详情模态框 */}
          <Modal
            className="equipment_modal"
            width="900px"
            visible={this.state.modalVisible}
            onOk={this.modalHandleOk}
            onCancel={this.modalHandleCancel}
            footer={false}
          >
            <div className="equipment_block">
              <div className="equipment_title">
                <div className="equipment_title_left">
                  {this.state.faceidDetail.address} {this.state.faceidDetail.name}
                </div>
                <div className="equipment_title_right">
                  <span>{this.state.faceidDetail.model}</span>
                  <i>{this.state.faceidDetail.size}</i>
                  <em>
                    <img src={bgleft} className="bgleft" />
                    {this.state.faceidDetail.type}
                    <img src={bgright} className="bgright" />
                  </em>
                </div>
                {/* <img src={close} onClick={this.closeModal} /> */}
              </div>
              <div className="content">
                <div className="content_top">
                  <div className="content_item">
                    <p><span className="firsts">业主单位：</span>
                    <i className="firsti">{this.state.faceidDetail.owner}</i></p>
                  </div>
                  <div className="content_item">
                    <p><span className="firsts">维保单位：</span>
                    <i className="firsti">{this.state.faceidDetail.protect}</i></p>
                  </div>
                  <div className="content_item">
                    <p><span className="firsts">上线时间：</span>
                    <i className="firsti">{this.state.faceidDetail.publictime}</i></p>
                  </div>
                  <div className="content_item">
                    <p><span className="firsts">上次检修时间：</span>
                    <i className="firsti">{this.state.faceidDetail.lasttime}</i></p>
                  </div>
                </div>

                {
                  mtype == 'face' ? 
                    <div className="content_bottom">
                      <div className="content_list_title">
                          <ul>
                            <li style={{width: '140px'}}>抓拍人像</li>
                            <li style={{width: '140px'}}>库内人像</li>
                            <li style={{width: '320px'}}>识别情况</li>
                            <li style={{width: '250px'}}>数据统计</li>
                          </ul>
                      </div>
                      <div className="content_list">
                        <ul>
                          <li className="list clearfix">
                            <div className="photo">
                              <img src="https://avatars1.githubusercontent.com/u/1911623?s=400&v=4" />
                            </div>
                            <div className="photo">
                              <img src="https://avatars1.githubusercontent.com/u/1911623?s=400&v=4" />
                            </div>
                            <div className="list_info">
                              <div className="discern">
                                <p className="recognize_status success">识别成功</p>
                                <p className="name">{this.state.people.name}</p>
                                <p>{this.state.people.pid}</p>
                                <p>住址：{this.state.people.address}</p>
                                <p>电话：{this.state.people.tel}</p>
                              </div>
                              <div className="dataAll">
                                <p className="title">通过时间：</p>
                                <p>{this.state.statistic.passtime}</p>
                                <p className="title m-t">上次通过：</p>
                                <p>{this.state.statistic.lastpasstime} </p>
                                <p>近七天累计通过次数：<span> {this.state.statistic.passSeven} </span>次</p>
                                <p>历史累计通过次数：<span> {this.state.statistic.passAll} </span>次</p>
                              </div>
                            </div>
                          </li>
                          <li className="list clearfix">
                            <div className="photo">
                              <img src="https://avatars1.githubusercontent.com/u/1911623?s=400&v=4" />
                            </div>
                            <div className="photo">
                              <img src="https://avatars1.githubusercontent.com/u/1911623?s=400&v=4" />
                            </div>
                            <div className="list_info">
                              <div className="discern">
                                <p className="recognize_status success">识别成功</p>
                                <p className="name">{this.state.people.name}</p>
                                <p>{this.state.people.pid}</p>
                                <p>住址：{this.state.people.address}</p>
                                <p>电话：{this.state.people.tel}</p>
                              </div>
                              <div className="dataAll">
                                <p className="title">通过时间：</p>
                                <p>{this.state.statistic.passtime}</p>
                                <p className="title m-t">上次通过：</p>
                                <p>{this.state.statistic.lastpasstime} </p>
                                <p>近七天累计通过次数：<span> {this.state.statistic.passSeven} </span>次</p>
                                <p>历史累计通过次数：<span> {this.state.statistic.passAll} </span>次</p>
                              </div>
                            </div>
                          </li>
                          <li className="list clearfix">
                            <div className="photo">
                              <img src="https://avatars1.githubusercontent.com/u/1911623?s=400&v=4" />
                            </div>
                            <div className="photo">
                              <img src="https://avatars1.githubusercontent.com/u/1911623?s=400&v=4" />
                            </div>
                            <div className="list_info">
                              <div className="discern">
                                <p className="recognize_status fail">识别失败</p>
                                <div className="failinfo">未知</div>
                              </div>
                              <div className="dataAll">
                                <p className="title">通过时间：</p>
                                <p>{this.state.statistic.passtime}</p>
                                <p className="title m-t">上次通过：</p>
                                <p>未知</p>
                              </div>
                            </div>
                          </li>
                          {/* <li className="list clearfix">
                            <div className="photo">
                              <img src="https://avatars1.githubusercontent.com/u/1911623?s=400&v=4" />
                            </div>
                            <div className="photo">
                              <img src="https://avatars1.githubusercontent.com/u/1911623?s=400&v=4" />
                            </div>
                            <div className="list_info">
                              <div className="discern">
                                <p className="recognize_status fail">识别失败</p>
                                <div className="failinfo">未知</div>
                              </div>
                              <div className="dataAll">
                                <p className="title">通过时间：</p>
                                <p>{this.state.statistic.passtime}</p>
                                <p className="title m-t">上次通过：</p>
                                <p>未知</p>
                              </div>
                            </div>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  : ''
                }

                {
                  mtype == 'monitor' ? 
                    <div className="content_bottom">
                      <video muted="muted" id="video" className="video" poster={videoLoading} autoPlay="autoplay" data-url='http://112.17.106.71:7086/live/cameraid/1000072%240/substream/1.m3u8'></video>
                    </div>
                  : ''
                }

                {
                  mtype == 'etc_guard' ? 
                    <div className="content_bottom">
                      <Table 
                        columns={modalTableColumns} 
                        dataSource={tableDataEtcGuard} />
                    </div>
                  : ''
                }
                
              </div>
            </div>
          </Modal>

        </div>
      </Spin>
    )
  }
}

export default Form.create()(Security);