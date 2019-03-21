/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions/Strength'
import $ from 'jquery'
import { format, render, cancel, register } from 'timeago.js';
import moment from 'moment';
import {
  Modal,
  Spin,
  Table,
  Progress,
  Cascader,
  Row,
  Col,
  Form, 
  Icon, 
  Input, 
  Button,
  Select,
  Tag,
  Checkbox,
  DatePicker,
  // EnterAnimation
} from 'antd'

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;

import '../style/Strength.less'
import '../../../../static/css/animate.css';
import '../../../../static/css/tooltip-line.css';
import utils from '../../../../util/util';
import mapStyleJson from '../../../../static/json/mapStyleJson.json'
import marker_blue from '../../../../static/images/gawing/marker_blue.png'
import marker_police from '../../../../static/images/zhafsq/marker_police.png'
import marker_police_car from '../../../../static/images/zhafsq/marker_police_car.png'
import marker_ty_tx from '../../../../static/images/zhafsq/marker_ty_tx.png'
import marker_ty_gt from '../../../../static/images/zhafsq/marker_ty_gt.png'
import marker_ty_ld from '../../../../static/images/zhafsq/marker_ty_ld.png'
import marker_ty_pcs from '../../../../static/images/zhafsq/marker_ty_pcs.png'
import rightTopTitle from '../../../../static/images/zhafsq/border_after_index.png'
import IndexTopHeader from '../../component/IndexTopHeader/IndexTopHeader'
import LeftCharts from './LeftCharts'
import LeftBasicData from '../../component/LeftBasicData/LeftBasicData'
import TopCascaderModal from '../../component/TopCascaderModal/TopCascaderModal'

import {
  subdistrictDataColor
} from './markerJsonData'

const plainOptions = ['巡特警特巡队', '派出所', '社会联动单位', '岗亭']
const defaultCheckedList = [];

const searchPlainOptions = [  
  { label: '在岗', value: '1' },
  { label: '离岗', value: '0' },
];

const policeType = {
  '1': '警员',
  '0': '警车',
  '联动': '社会联动单位',
  '派出所': '派出所',
  '特巡': '巡特警特巡队',
  '岗亭': '岗亭',
}

const searchDefaultCheckedList = ['online', 'offline'];

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

class Strength extends Component {
  constructor(props) {
    super(props)
    this.initMap = this.initMap.bind(this)
    this.addWindow = this.addWindow.bind(this)
    this.state = {
      map: null,
      time: null,
      pieHeight: 0,
      barHeight: 0,
      bottomData: null,
      boxVisiable: true,
      saveMacData: [],
      returnMacData: [],
      cascaderLabel: localStorage.getItem('label') ? localStorage.getItem('label') : '拱墅区',
      pcsName: localStorage.getItem('pcsName') ? localStorage.getItem('pcsName') : '祥符派出所',
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      finalCheck: [],
      dataSource: ['拱墅区拱墅区','上塘街道上塘街道','中国铁建国际城', '中天西城纪', '蔡马人家'],
      modalData: [],
      modalVisible: false,
      loading:true,
      gpsid: null,
      searchArr: {}
    }
  }

  pcsModalHandleOk = (e) => {
    this.setState({
        pcsVisible: false,
    });
  }

  pcsModalHandleCancel = (e) => {
      this.setState({
          pcsVisible: false,
      });
  }

  goPcsPage = (e) => {
      var thisValue = $(e.target).text()        
      if (thisValue) {
          localStorage.setItem('pcsName', thisValue)
      }
      this.setState({
          pcsVisible: false,
          pcsName: thisValue
      });
      this.allPost()
  }

  showPcsModal = () => {
    var _this = this
    this.setState({
        pcsVisible: true,
    });
  } 

  disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }

  // 表单验证
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        var searchArr = {
          ONLINE: values.status.length == 2 ? '' : values.status[0].toString(), 
          UNIT: values.unit,
          USER_NAME: values.user_name,
          USER_ID: values.user_id,
          CAR_NO: values.car_no,
          POLICE_TYPE: values.type,
        }
        this.props.getForcesList(searchArr)
        this.setState({
          searchArr: searchArr
        })
      }
    });
  }

  tableOnChange = (pagination, filters, sorter) => {

    console.log(pagination);
    
    var searchArr = this.state.searchArr
    var page = pagination.current
    var limit = pagination.pageSize
    this.props.getForcesList(searchArr, page, limit)
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
    dqChecked.remove("巡特警特巡队")
    dqChecked.remove("派出所")
    dqChecked.remove("社会联动单位")
    dqChecked.remove("岗亭")
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

  // stype 类型(派出所 联动 特巡 岗亭)
  onCheckAllChange = (e) => {
    var dqChecked = this.state.finalCheck
    var map = this.state.map
    dqChecked.remove("巡特警特巡队")
    dqChecked.remove("派出所")
    dqChecked.remove("社会联动单位")
    dqChecked.remove("岗亭")
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
    // this.getBoundary(map)
  }

  // dqChecked.remove("巡特警特巡队")
  // dqChecked.remove("派出所")
  // dqChecked.remove("社会联动单位")
  // 编写自定义函数,创建标注
  dealMarker = (map, finalCheck) => {
    map.clearOverlays();
    finalCheck.forEach((item, index) => {
      switch (item) {
        case 'jyjson':
          this.addMarker(map, this.props.ZHAFStrength.jyjson, marker_police, 'jyjson')
          break;
        case 'jcjson':
          this.addMarker(map, this.props.ZHAFStrength.jcjson, marker_police_car, 'jcjson')
          break;
        case '巡特警特巡队':
          this.addMarker(map, this.props.ZHAFStrength.txjson, marker_ty_tx, '巡特警特巡队')
          break;
        case '派出所':
          this.addMarker(map, this.props.ZHAFStrength.pcsjson, marker_ty_pcs, '派出所')
          break;
        case '社会联动单位':
          this.addMarker(map, this.props.ZHAFStrength.ldjson, marker_ty_ld, '社会联动单位')
          break;
        case '岗亭':
          this.addMarker(map, this.props.ZHAFStrength.gtjson, marker_ty_gt, '岗亭')
          break;
        default:
          break;
      }
    });
  }

  // 编写自定义函数,创建标注
  addMarker = (map, points, marker_img, type) => {
    var _this = this
    if (points) {
      points.forEach((item, index) => {
        if(item.GPS || (item.LATITUDE && item.LONGITUDE)) {
          var point, name, markerIcon, no, online
          if (type == 'jyjson' || type == 'jcjson') {
            var p = item.GPS.split(',')
            point = new BMap.Point(p[0], p[1])
            name = item.POLICE_TYPE==1 ? item.USER_NAME : item.CAR_NO
            markerIcon = new BMap.Icon(marker_img, new BMap.Size(16,16))  
            no = item.POLICE_TYPE==1 ? item.USER_ID : '无'
            online = item.online==1 ? '在线' : '离线' 
          } else {
            point = new BMap.Point(item.LONGITUDE, item.LATITUDE);
            name = item.NAME
            markerIcon = new BMap.Icon(marker_img, new BMap.Size(16,16));
            no = item.SNUMBER
            online = item.time
          }

          var marker = new BMap.Marker(point, {
            icon: markerIcon,
            title: name,
            label: item.POLICE_TYPE,
            id: item.GPSID,
          });
           
          const sDom2 = `<div class="xq_window">
                          <div class="xq_window_wrap animated fadeInDown">
                            <span class="xq_window_text xq_window_title">`+ name +`</span>
                          </div>
                          <div class="xq_window_wrap animated fadeInRight">
                            <label class="xq_window_label">警号:`+ no +`</label>
                            <span class="xq_window_text">`+ (item.temporaryTotal ? item.temporaryTotal : '') +`</span>
                          </div>
                          <div class="xq_window_wrap animated fadeInRight">
                            <label class="xq_window_label">所属单位:</label>
                            <span class="xq_window_text">`+ item.UNIT +`</span>
                          </div>
                          <div class="xq_window_wrap animated fadeInRight">
                            <label class="xq_window_label">在岗时间:</label>
                            <span class="xq_window_text">`+ online +`</span>
                          </div>
                          <div class="xq_window_bottom">
                            <a class="xq_window_btn showtrack">轨迹还原</a>
                            <a class="xq_window_btn showdetail">查看详情</a>
                          </div>
                          <div class="xq_sanjiao"></div>
                        </div>`

          var infoBox = new BMapLib.InfoBox(map,sDom2,{
            boxStyle:{
              background:"rgba(0, 0, 0, 0.6",
              borderTop: '12px solid #0f1634',
              borderImage: 'linear-gradient(to right, #15358a,#3bc7f2) 1',
              width: "300px",
              height: "200px",
              marginBottom: "18px"
            },
            closeIconMargin: "1px 1px 0 0",
            enableAutoPan: true,
            align: INFOBOX_AT_TOP
          });
          marker.addEventListener("click", function(e) {
            // console.log(this);
            // console.log(e);
            
            var overlays = map.getOverlays();
            for (let i = 0; i < overlays.length; i++) {
              const dom = overlays[i].V;
              const type = $(dom).attr('class');
              if (type == 'infoBox') {
                overlays[i].close();
              }
            }
            infoBox.open(marker);
            $(infoBox.V).on('click', '.showtrack', function(e) {

              if (type == 'jyjson' || type == 'jcjson') {
                _this.state.gpsid = item.GPSID
                _this.state.markerType = 'normal'
              } else {
                _this.state.snumber = item.SNUMBER
                _this.state.markerType = 'tianyi'
              }
 
              $('.time_picker_com').css('display', 'block')
            })
            $(infoBox.V).on('click', '.showdetail', function(e) {
              if (type == 'jyjson' || type == 'jcjson') {
                _this.showModal(item.GPSID)
              } else {
                _this.showModal(item.SNUMBER)
              }
            })
          });
          map.addOverlay(marker);
        }
      });      
    }
  }

  timeOnChange = (value, dateString) => {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
  }
  
  timeOnOk = (value) => {
    var starttime = value[0].format('YYYY-MM-DD HH:mm')
    var endtime = value[1].format('YYYY-MM-DD HH:mm')
    var _this  = this
    var markerType = this.state.markerType
    var map = this.state.map

    console.log(markerType);
    
    if (markerType == 'normal') {
      this.props.getPointTrajectory(this.state.gpsid, starttime, endtime, ()=>{
        _this.getTrack(map)
      })
    } else {
      this.props.getPointTrajectoryTianYi(this.state.snumber, starttime, endtime, ()=>{
        _this.getTrack(map)
      })
    }
  }

  // 添加地图轨迹
  getTrack = (map) => {
    map.clearOverlays();
    var trajectory = this.props.ZHAFStrength.trajectory ? this.props.ZHAFStrength.trajectory : {}
    var trajectoryStr = trajectory ? trajectory.replace("[", "").replace("]", "") : ''

    var firstPoint = trajectoryStr.split(';')[0]
    var boundaries = []
    boundaries.push(trajectoryStr)
    var count = boundaries.length;
    for(var i = 0; i < count; i++){
      var ply = new BMap.Polyline(boundaries[i], {
        strokeWeight: 2, 
        strokeColor: 'rgb(47, 159, 35)',
        strokeOpacity:0.0, 
        fillOpacity: 0.3, 
        fillColor: "#000000"
      }); // 建立多边形覆盖物
      map.addOverlay(ply);  // 添加覆盖物     
    }   
    var point = new BMap.Point(firstPoint.split(',')[0], firstPoint.split(',')[1]);
    map.centerAndZoom(point, 17); 
  }

  recoverPoint = () => {
    this.dealMarker(this.state.map, this.state.finalCheck);
    $('.time_picker_com').css('display', 'none')
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
  getBoundary = (map) => {
    // var bdary = new BMap.Boundary();
    // var name = '蔡马人家';
    // bdary.get(name, function(rs){       //获取行政区域
    //     console.log(rs);
        
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
    // // var boundaries = [ "120.146408,30.318969;120.148524,30.318895;120.148595,30.318852;120.148672,30.317729;120.148672,30.317729;120.148672,30.317301;120.146305,30.317375;120.146318,30.317437;"]
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
  }

  showModal = (id) => {
    this.props.getPointDetail(id)
    this.setState({
      modalVisible: true,
    });
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

  pushMacData = () => {
    var oldData = this.state.saveMacData;
    var getmacData = this.state.bottomData&&this.state.bottomData.entranceGuardRecord ? this.state.bottomData.entranceGuardRecord : [];

    var newData = oldData.concat(getmacData)
    this.setState({
      saveMacData: newData
    })
    var num = Math.floor(Math.random() * 17 + 1);
    var returnMacData = []
    if (newData&&newData.length>20) {
      returnMacData = [newData[num], newData[num+1], newData[num+2]]
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

  // 拿到TopCascaderModalContent组件级联选择的数据
  confirmCascaderChange = (value) => {

    console.log(value)
    // this.props.changev({
    //   levelValue: value.levelValue,
    //   level: value.level,
    //   levelId: value.levelId,
    // })
    // localStorage.setItem('levelValue', value.levelValue)
    // localStorage.setItem('level', value.level)
    // localStorage.setItem('levelId', value.levelId)
    // localStorage.setItem('label', value.label)
    // this.setState({
    //   cascaderLabel: value.label
    // })
    // this.allPost()
  }

  allPost = () => {
    this.props.getBarData()
    this.props.getForcesList()
    this.props.getPoliceUnit()
    this.props.getPointTrajectoryTotal()

    this.props.getForcesListPoint(0, 'jcjson')
    this.props.getForcesListPoint(1, 'jyjson')
    this.props.getForcesListPointTianYi('派出所', 'pcsjson')
    this.props.getForcesListPointTianYi('联动', 'ldjson')
    this.props.getForcesListPointTianYi('特巡', 'txjson')
    this.props.getForcesListPointTianYi('岗亭', 'gtjson')
  }

  componentWillMount() {
    this.props.getLevel();    
    this.allPost();
  }

  componentDidMount() {
    let _this = this
    _this.props.form.validateFields();
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
        pieHeight: parseFloat(pieWrapDomHeight.split('px')[0])
      })
    }

    const map = new BMap.Map("dimap", {MAXZOOM: 18}); 
    // 初始化地图,设置中心点坐标和地图级别
    var point = new BMap.Point(120.149018,30.32539);    //120.149018,30.32539
    map.centerAndZoom(point,14);                     
    this.getBoundary(map)
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
      pcsName
    } = this.state
    const {
      diLoading,
      subdistrictData,
      level,
      policeUnit,
      tableData,
      tableLoading,
      tableCurrPage,
      tableTotalCount,
      tableTotalPage,
      markerUserId,
      markerUserName,
      trajectoryTotal,
      pieData,
      barData
    } = this.props.ZHAFStrength    
    
    const toBasicDataProps = {
      subdistrictData: subdistrictData,
      subdistrictDataColor: subdistrictDataColor
    }

    const toLeftChartsProps = {
      pieData: pieData,
      barData: barData
    }
  
    let indexTopHeaderProps = null
    if (level) {
      indexTopHeaderProps = {
        supportChangeLevel: false,
        confirmCascaderChange: this.confirmCascaderChange,
        changeOnSelect: true,
        level: level,
        label: cascaderLabel,
        titleType: 'type2',
        title: '实有力量和装备',
        subTitle: pcsName,
        showPcsModal: this.showPcsModal
      }      
    }


    const columns = [
      {
        title: '名称',
        dataIndex: 'user_name',
        key: 'user_name',
        render: (text, record) => {
          var sDom          
          if (record.type == '0') { // <Icon type="car" />
            sDom = <p title={record.car_no}>{record.car_no}</p>
          } else { // <Icon type="user" />
            sDom = <p title={record.user_name}>{record.user_name}</p>
          }
          return( sDom )
        }
      },{
        title: '编号',
        dataIndex: 'user_id',
        key: 'user_id',
        render: (text, record) => (<p title={text}>{text}</p>)
      }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => (<p title={text}>{policeType[text]}</p>)
      }, {
        title: '在线时间',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          var sDom 
          if (record.status == '1') {
            sDom = <p><Tag color="#2f9f23">在线</Tag></p>
          } else {
            sDom = <p className="offline">{format(record.lasttime, 'zh_CN')}</p>
          }
          return(
            sDom
          )
        }
      }];
    
    const modalColumns = [
      {
        title: '日期',
        dataIndex: 'name',
        key: 'name',
      },{
        title: '目标单位',
        dataIndex: 'upper',
        key: 'upper',
      }, {
        title: '时间类型',
        dataIndex: 'police',
        key: 'police',
      }, {
        title: '描述',
        dataIndex: 'paper',
        key: 'paper',
      }];
    
    const modalData = [
      {
        key: '1',
        name: '浙江启融科技有限公司',
        upper: '祥符所',
        police: '张单元',
        paper: '营业执照',
        number: '0101201916248888J',
        type: 'personalUse',
        personNum: 1,
        area: '10',
      }, {
        key: '2',
        name: '马人家',
        upper: '2幢',
        police: '2单元',
        paper: '2',
        number: '0202',
        type: 'personalUse',
        personNum: 2,
        area: '20',
      }, {
        key: '3',
        name: '马人家',
        upper: '3幢',
        police: '3单元',
        paper: '3',
        number: '0303',
        type: 'personalUse',
        personNum: 3,
        area: '30',
      }, {
        key: '4',
        name: '蔡马人家',
        upper: '4幢',
        police: '4单元',
        paper: '4',
        number: '0404',
        type: 'personalUse',
        personNum: 4,
        area: '40',
      }, {
        key: '5',
        name: '蔡马人家',
        upper: '幢',
        police: '5单元',
        paper: '5',
        number: '0505',
        type: 'personalUse',
        personNum: 5,
        area: '50',
      }, {
        key: '6',
        name: '蔡马人家',
        upper: '6幢',
        police: '6单元',
        paper: '6',
        number: '0606',
        type: 'personalUse',
        personNum: 6,
        area: '60',
      }, {
        key: '12',
        name: '蔡马人家',
        upper: '2幢',
        police: '2单元',
        paper: '2',
        number: '0202',
        type: 'personalUse',
        personNum: 2,
        area: '20',
      }, {
        key: '13',
        name: '蔡马人家',
        upper: '3幢',
        police: '3单元',
        paper: '3',
        number: '0303',
        type: 'personalUse',
        personNum: 3,
        area: '30',
      }, {
        key: '14',
        name: '蔡马人家',
        upper: '4幢',
        police: '4单元',
        paper: '4',
        number: '0404',
        type: 'personalUse',
        personNum: 4,
        area: '40',
      }, {
        key: '15',
        name: '蔡马人家',
        upper: '幢',
        police: '5单元',
        paper: '5',
        number: '0505',
        type: 'personalUse',
        personNum: 5,
        area: '50',
      }, {
        key: '16',
        name: '蔡马人家',
        upper: '6幢',
        police: '6单元',
        paper: '6',
        number: '0606',
        type: 'personalUse',
        personNum: 6,
        area: '60',
      }, {
        key: '22',
        name: '蔡马人家',
        upper: '2幢',
        police: '2单元',
        paper: '2',
        number: '0202',
        type: 'personalUse',
        personNum: 2,
        area: '20',
      }, {
        key: '23',
        name: '蔡马人家',
        upper: '3幢',
        police: '3单元',
        paper: '3',
        number: '0303',
        type: 'personalUse',
        personNum: 3,
        area: '30',
      }, {
        key: '24',
        name: '蔡马人家',
        upper: '4幢',
        police: '4单元',
        paper: '4',
        number: '0404',
        type: 'personalUse',
        personNum: 4,
        area: '40',
      }, {
        key: '25',
        name: '蔡马人家',
        upper: '幢',
        police: '5单元',
        paper: '5',
        number: '0505',
        type: 'personalUse',
        personNum: 5,
        area: '50',
      }, {
        key: '26',
        name: '蔡马人家',
        upper: '6幢',
        police: '6单元',
        paper: '6',
        number: '0606',
        type: 'personalUse',
        personNum: 6,
        area: '60',
      }, {
        key: '32',
        name: '蔡马人家',
        upper: '2幢',
        police: '2单元',
        paper: '2',
        number: '0202',
        type: 'personalUse',
        personNum: 2,
        area: '20',
      }, {
        key: '33',
        name: '蔡马人家',
        upper: '3幢',
        police: '3单元',
        paper: '3',
        number: '0303',
        type: 'personalUse',
        personNum: 3,
        area: '30',
      }, {
        key: '34',
        name: '蔡马人家',
        upper: '4幢',
        police: '4单元',
        paper: '4',
        number: '0404',
        type: 'personalUse',
        personNum: 4,
        area: '40',
      }, {
        key: '35',
        name: '蔡马人家',
        upper: '幢',
        police: '5单元',
        paper: '5',
        number: '0505',
        type: 'personalUse',
        personNum: 5,
        area: '50',
      }, {
        key: '36',
        name: '蔡马人家',
        upper: '6幢',
        police: '6单元',
        paper: '6',
        number: '0606',
        type: 'personalUse',
        personNum: 6,
        area: '60',
      }
    ];

  
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
          </div> 

          {/* 地图 */}
          <div className="bottom_fix">
            <div className="data_info_left_bottom basic_box">
                <div className="box_top_title">
                    <p>警力分布与轨迹<img src={rightTopTitle} />
                      <span>总数：<em>{trajectoryTotal}</em></span>
                    </p>
                </div>

                <div id="dimap"></div>
                <div className="time_picker_com">
                  <RangePicker
                    disabledDate={this.disabledDate}
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['开始时间', '结束时间']}
                    onChange={this.timeOnChange}
                    onOk={this.timeOnOk}
                  />
                  <Button onClick={this.recoverPoint}>关闭轨迹</Button>
                </div>
                
                <div className="marker_checkbox_container">
                  <Checkbox value="jyjson" onChange={this.onCheckboxSimpleChange}>警员</Checkbox>
                  <Checkbox value="jcjson" onChange={this.onCheckboxSimpleChange}>警车</Checkbox>
                  <Checkbox value="ll3" onChange={this.onCheckboxSimpleChange} disabled>执勤点</Checkbox>
                  <div className="marker_checkbox_group_container">
                    <Checkbox
                      indeterminate={this.state.indeterminate}
                      onChange={this.onCheckAllChange}
                      checked={this.state.checkAll}
                    ></Checkbox>
                    <span onClick={this.CheckboxGroupOpen}>天翼对讲机</span>
                    <div className="marker_checkbox_group">
                      <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                    </div>
                  </div>
                </div>
            </div>
          </div>    
          
          {/* 左边-基础数据 */}
          {/* style={{display: 'none'}} */}
          <div className="basic_box left_fix" >
            <div className="box_top_title">
                <p>基础数据<img src={rightTopTitle} /></p>
            </div>
            {/* <LeftBasicData {...toBasicDataProps} /> */}
            <LeftCharts {...toLeftChartsProps} />
          </div>

          {/* 右边 */}   
          <div className="right_fix">
            {/* 历史查询 */}
            <div className="basic_box data_info_right_item data_info_right_3">
              <div className="box_top_title">
                  <p>历史查询<img src={rightTopTitle} /></p>
              </div>
              {/* 搜索筛选 */}
              <div className="area_select">
                <Form layout="inline" className="search_form" onSubmit={this.handleSubmit}>
                  {/* <Form.Item>
                    {getFieldDecorator('unit', {
                      initialValue: '',
                    })(
                      <Select className="search_form_item search_form_item_unit">
                        <Option key='all' value=''>全部单位</Option>
                        {policeUnit ? policeUnit.map((item, ind) => (<Option key={ind} value={item} >{item}</Option>)) : ''}
                      </Select>
                    )}
                  </Form.Item> */}
                  <Form.Item>
                    {getFieldDecorator('type', {
                      initialValue: '',
                    })(
                      <Select className="search_form_item">                
                        <Option value="">全部类型</Option>
                        <Option value="1">警员</Option>
                        <Option value="0">警车</Option> 
                        <Option value="联动">社会联动单位</Option> 
                        <Option value="派出所">派出所</Option> 
                        <Option value="特巡">巡特警特巡队</Option> 
                        <Option value="岗亭">岗亭</Option>
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('user_name', {
                    })(
                      <Input className="search_form_item" placeholder="输入警员名称查找" />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('user_id', {
                    })(
                      <Input className="search_form_item" placeholder="输入警员编号查找" />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('car_no', {
                    })(
                      <Input className="search_form_item" placeholder="输入警车牌号查找" />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('status', {
                      initialValue: ['1', '0'],
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
            className="night_modal"
            width="900px"
            visible={this.state.modalVisible}
            onOk={this.modalHandleOk}
            onCancel={this.modalHandleCancel}
            footer={false}
          >
            <div className="modal_top clearfix">
              <div className="float_item fl institution_name">警员详情<img src={rightTopTitle} /></div>
              <div className="float_item fr institution_code"><label>所属单位：</label>米市巷派出所</div>
            </div>
            <div className="modal_middle clearfix">
              <div className="float_item fl">
                <div className="police_info">
                  <img className="police_img" src="https://avatars0.githubusercontent.com/u/799578?v=4" />
                  <div className="police_detail">
                    <div>民警：{markerUserName}</div>
                    <div>警号：{markerUserId}</div>
                    <div className="police_status">在岗</div>
                  </div>                
                </div>
              </div>

              <div className="float_item fr police_extra_detail "></div>

            </div>
            <div className="modal_bottom ">

              <div className="float_item">
                <p><label>轨迹更新时间：</label><span>945749375475848K</span></p>
                <Table 
                    bordered
                    className="zhafTable"
                    size="small"
                    columns={modalColumns} 
                    dataSource={modalData} 
                    pagination={{ pageSize: 5}} 
                    onChange={this.modalTableOnChange} />
              </div>
            </div>
          </Modal>
          <Modal
              title="切换单位"
              visible={this.state.pcsVisible}
              className="top-cascader-modal"
              footer={false}
              onOk={this.pcsModalHandleOk}
              onCancel={this.pcsModalHandleCancel}
              okText="确定"
              cancelText="取消"
          >
              { policeUnit ? policeUnit.map((item, index)=>(
                  <li><a key={index} onClick={this.goPcsPage}>{item}</a></li>
              )) : '暂无数据' }
          </Modal>

        </div>
      </Spin>
    )
  }
}

export default Form.create()(Strength);
// 地图边界，tabs切换