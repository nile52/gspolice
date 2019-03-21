/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/Institution'
import $ from 'jquery'
import {
  Modal,
  Spin,
  Table,
  Form,
  Cascader,
  Row,
  Col,
  Checkbox,
  Button
} from 'antd'
import '../style/Institution.less'
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

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['xq1', 'xq2', 'xq3'];
const defaultCheckedList = ['xq1', 'xq3'];

const searchPlainOptions = [
  { value: '0', label: '机关单位' },
  { value: '1', label: '事业单位' },
  { value: '2', label: '企业' },
  { value: '3', label: '团体' },
  { value: '4', label: '社会群体单位' },
  { value: '5', label: '个体工商户' },
  { value: '6', label: '法人' },
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

class Institution extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      pieHeight: 0,
      cascaderLabel: localStorage.getItem('label') ? localStorage.getItem('label') : '拱墅区',
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      finalCheck: [],
      dataSource: ['拱墅区拱墅区','上塘街道上塘街道','中国铁建国际城', '中天西城纪', '蔡马人家'],
      modalData: [],
      modalVisible: false,
      loading:true,
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
      var type = values.type.toString()
      this.props.getCompanyList(level, value, type)
    });
  }

  tableOnChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  }

  onChangeCascader = (value) => {
    switch (value.length) {
      case 1:
        this.props.getCompanyList('districtId', value[0])
        this.setState({
          tableLevel: 'districtId',
          tableLevelValue: value[0],
        })
        break;
      case 2:
        this.props.getCompanyList('streetId', value[1])
        this.setState({
          tableLevel: 'streetId',
          tableLevelValue: value[1],
        })
        break;
      case 3:
        this.props.getCompanyList('communityId', value[2])
        this.setState({
          tableLevel: 'communityId',
          tableLevelValue: value[2],
        })
        break;
      case 4:
        this.props.getCompanyList('zoneId', value[3])
        this.setState({
          tableLevel: 'zoneId',
          tableLevelValue: value[3],
        })
        break;    
      default:
        break;
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
      cascaderLabel: value.label
    })
    this.allPost()
  }

  componentWillReceiveProps(nextProps) {
    var pointlist = nextProps.ZHAFInstitution.pointlist;
    if (pointlist) {
      this.addMarker(this.state.map, pointlist, marker_xq2)
    }
  }



  allPost = () => {
    this.props.getBarData()
    this.props.getCompanyList()
    this.props.getPointPositionlist('5')
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
      _this.setState({
        pieHeight: parseFloat(pieWrapDomHeight.split('px')[0])
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
    } = this.state
    const {
      diLoading,
      tableLoading,
      level,
      barData,
      tableData
    } = this.props.ZHAFInstitution

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
        title: '实有单位',
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
      title: '单位名称',
      dataIndex: 'name',
      key: 'name',
      width: 170,
      },{
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: 75,
        render: type => utils.getCompanyType(type),
      }, {
        title: '管辖单位',
        dataIndex: 'superviseCompany',
        key: 'superviseCompany',
        width: 75
      }, {
        title: '负责民警',
        dataIndex: 'supervisePolice',
        key: 'supervisePolice',
        width: 75
      }, {
        title: '单位证件类',
        dataIndex: 'certificatesType',
        key: 'certificatesType',
        width: 100
      }, {
        title: '单位证件号',
        dataIndex: 'certificatesNum',
        key: 'certificatesNum',
        width: 150
      }
    ];
    
    const modalColumns = [{
      title: '日期',
      dataIndex: 'name',
      key: 'name',
      width: 220,
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 75,
      render: type => utils.getHouseUsage(type),
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
    }, {
      title: '管辖单位',
      dataIndex: 'upper',
      key: 'upper',
      width: 75
    }, {
      title: '负责民警',
      dataIndex: 'police',
      key: 'police',
      width: 75
    }, {
      title: '单位证件类',
      dataIndex: 'paper',
      key: 'paper',
      width: 100
    }, {
      title: '单位证件号',
      dataIndex: 'number',
      key: 'number',
      width: 150
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
      name: '蔡马人家',
      upper: '2幢',
      police: '2单元',
      paper: '2',
      number: '0202',
      type: 'personalUse',
      personNum: 2,
      area: '20',
    }, {
      key: '3',
      name: '蔡马人家',
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
                    <p>单位地图定位<img src={rightTopTitle} /></p>
                </div>
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
                  <p>单位查询<img src={rightTopTitle} /></p>
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
                    {getFieldDecorator('type', {
                      initialValue: ['0', '1', '2', '3', '4', '5', '6'],
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
                  bordered
                  size="small"
                  className="zhafTable"
                  columns={columns} 
                  dataSource={tableData} 
                  pagination={false} 
                  scroll={{ x: 1000, y: 830 }} 
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
              <div className="float_item fl institution_name">浙江启融科技有限公司<img src={rightTopTitle} /></div>
              <div className="float_item fr institution_code"><label>统一社会信用代码：</label>945749375475848K</div>
            </div>
            <div className="modal_middle">
              <Row>
                <Col span={8}>
                  <label>法定代表人：</label><span>aaaa</span>
                </Col>
                <Col span={8}>
                  <label>注册资本：</label><span>aaaa</span>
                </Col>
                <Col span={8}>
                  <label>成立时间：</label><span>aaaa</span>
                </Col>
                <Col span={8}>
                  <label>营业期限自：</label><span>aaaa</span>
                </Col>
                <Col span={8}>
                  <label>营业期限至：</label><span>aaaa</span>
                </Col>
                <Col span={8}>
                  <label>核准日期：</label><span>aaaa</span>
                </Col>
                <Col span={24}>
                  <label>登记机关：</label><span>aaaa</span>
                </Col>
                <Col span={24}>
                  <label>地址：</label><span>aaaa</span>
                </Col>
                <Col span={24}>
                  <label>经营范围：</label><span>所有叠加或覆盖到地图的内容，我们统称为地图覆盖物。如标注、矢量图形元素(包括：折线和多边形和圆)、信息窗口等。覆盖物拥有自己的地理坐标，当您拖动或缩放地图时，它们会相应的移动。地图API提供了如下几种覆盖物：Overlay：覆盖物的抽象基类，所有的覆盖物均继承此类的方法。Marker：标注表示地图上的点，可自定义标注的图标。Label：表示地图上的文本标注，您可以自定义标注的文本内容。Polyline：表示地图上的折线。Polygon：表示地图上的多边形。多边形类似于闭合的折线，另外您也可以为其添加填充颜色。Circle: 表示地图上的圆。InfoWindow：信息窗口也是一种特殊的覆盖物，它可以展示更为丰富的文字和多媒体信息。注意：同一时刻只能有一个信息窗口在地图上打开。可以使用map.addOverlay方法向地图添加覆盖物，使用map.removeOverlay方法移除覆盖物，注意此方法不适用于InfoWindow。</span>
                </Col>
              </Row>
            </div>
            <div className="modal_bottom clearfix">
              <div className="float_item fl">
                <p><label>所属辖区派出所：</label><span>祥符所</span></p>
                <div className="police_info">
                  <img className="police_img" src="https://avatars0.githubusercontent.com/u/799578?v=4" />
                  <div className="police_detail">
                    <div><label>民警：</label><span>aaaa</span></div>
                    <div><label>警号：</label><span>aaaa</span></div>
                    <div><label>最近走访时间：</label><span>aaaa</span></div>
                    <div><label>走访情况：</label><span>aaaa</span></div>
                    <div><label>走访情况：</label><span>aaaa</span></div>
                  </div>                
                </div>
              </div>
              <div className="float_item fr">
                <p><label>轨迹更新时间：</label><span>945749375475848K</span></p>
                <Table 
                    bordered
                    className="zhafTable"
                    size="small"
                    columns={modalColumns} 
                    dataSource={ modalData} 
                    pagination={false} 
                    scroll={{ x: 1000, y: 290 }} 
                    onChange={this.modalTableOnChange} />
              </div>
            </div>
          </Modal>
        </div>
      </Spin>
    )
  }
}

export default Form.create()(Institution);