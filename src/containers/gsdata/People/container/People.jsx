/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions/People'
import $ from 'jquery'
import {
  Row,
  Col,
  Spin,
  Button,
  Select,
  Modal,
  Table,
  Form, 
  Input, 
  Tooltip, 
  Icon,
  Cascader, 
  Checkbox,
  AutoComplete
} from 'antd'
import '../style/People.less'
import '../style/People.less'

import utils from '../../../../util/util.js'
import mapStyleJson from '../../../../static/json/mapStyleJson.json'
import marker_blue from '../../../../static/images/gawing/marker_people_s.png'
import carDefault from '../../../../static/images/gawing/default_car.png'
import peopleDefault from '../../../../static/images/gawing/default_people.png'
import houseDefault from '../../../../static/images/gawing/default_house.png'
import gsbg5 from '../../../../static/images/gawing/map_window_bg.png'
import TopButtons from '../../component/TopButtons/TopButtons'
import '../../../../static/css/animate.css'
import '../../../../static/css/tooltip-line.css';
import '../../../../static/css/gsdata.less';

const Option = Select.Option
const FormItem = Form.Item
const AutoCompleteOption = AutoComplete.Option

@connect(
    state => state,
    {...actions}
)

class People extends Component {
  constructor(props) {
    super(props)
    this.initMap = this.initMap.bind(this)
    this.addWindow = this.addWindow.bind(this)
    this.toPageHouse = this.toPageHouse.bind(this)
    this.state = {
      map: null,
      time: null,
      isHalf1: true,
      isHalf2: true,
      isHalf3: true,
      isHalf4: true,
      btnsVisiable: false,
      selectVisiable: 'select_unvisiable',
      confirmDirty: false,
      autoCompleteResult: [],
      userDetail: null,
      userList: null,
      resultVisible: this.props.resultVisible,
    }
  }

  showModal = () => {
    this.setState({
      resultVisible: true,
    });
  }

  modalHandleOk = (e) => {
    this.setState({
      resultVisible: false,
    });
  }

  modalHandleCancel = (e) => {
    this.setState({
      resultVisible: false,
    });
  }

  toPageHouse = (zoneid, buildid, houseid, t) => {
    // var personId = $(e.target).attr('data-id');
    // localStorage.setItem('personId', personId)
    console.log(zoneid, buildid, houseid)
    window.location.href="/gsdata/house?zoneId="+ zoneid +"&storiedBuildingId="+ buildid +"&housingId="+ houseid
  }

  peopleSearch = (e) => {
    var personId = $(e.target).attr('data-id');
    localStorage.setItem('personId', personId)
    // window.location.href="/gsdata/people"
    this.props.getSearch({userId: personId}, () => {
      _this.setState({
        resultVisible: true
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var _this = this
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(values.name || values.idCard || values.licenseNumber){
            console.log('success')
            var searchData = {};
            if (values.name) {
                searchData.name = values.name
            }
            if (values.idCard) {
                searchData.name = values.idCard
            }
            if (values.licenseNumber) {
                searchData.licenseNumber = values.licenseNumber
            }
            this.props.getSearch(searchData, () => {
              _this.setState({
                resultVisible: true
              })
            })
        } else {
            alert('请输入搜索内容')
        }
      }
    });
  }

  initMap = (map, Long, Dat) => {
    const point = new BMap.Point(Long, Dat);
    map.centerAndZoom(point, 14); 
    this.getBoundary(map)
  }

  addWindow = (map, services) => {
    services.forEach((item, index) => {
      if(item.longitude && item.latitude && totals) {
        var point = new BMap.Point(item.longitude, item.latitude);
        const blueIcon = new BMap.Icon(marker_blue, new BMap.Size(15,21));
        const redIcon = new BMap.Icon(marker_blue, new BMap.Size(15,21));
        var marker = new BMap.Marker(point, {
          icon: blueIcon,
          title: item.name
        });
        const sDom = `<div id="xq_window" class="xq_window">
                        <div class="xq_window_wrap animated fadeInDown">
                          <span class="xq_window_text xq_window_title">`+ item.eqptEquipmentName +`</span>
                        </div>
                      </div>`
                      
        const sDom2 = `<div id="xq_window" class="xq_window">
                        <div class="xq_window_wrap animated fadeInDown">
                          <span class="xq_window_text xq_window_title">`+ item.eqptEquipmentName +`</span>
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
          marker.setLabel(label)
          marker.setIcon(redIcon)
        })
        marker.addEventListener('mouseout', function() {
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
    if (nextProps.GSPeople.userDetail && this.state.map) {
      // this.initMap(this.state.map, nextProps.GSPeople.xqInfo.longitude, nextProps.GSPeople.xqInfo.latitude)
      // this.initMap(this.state.map)
    } 
    if(this.state.map) {
      if(nextProps.GSPeople.userDetail && nextProps.GSPeople.userDetail.eqptEquipmentRecord && nextProps.GSPeople.userDetail.eqptEquipmentRecord.length > 0) {
        this.state.map.clearOverlays(); 
        this.getBoundary(this.state.map)
        this.addWindow(this.state.map, nextProps.GSPeople.userDetail.eqptEquipmentRecord)
        // 此处需要一个小区列表，包含基本详情和小区信息
      } else {
        this.state.map.clearOverlays(); 
      }
    }
  }

  componentWillMount() {
    var _this = this
    this.props.getSearch(null, () => {
      _this.setState({
        resultVisible: true
      })
    })
  }

  componentDidMount() {
    let _this = this
    let screenH = document.documentElement.clientHeight
    let mainDom = document.getElementsByClassName("data_info_item")
    // let leftBottom = document.querySelector(".data_info_left_bottom")
    mainDom[0].style.height = screenH/12 + 'rem'
    mainDom[1].style.height = screenH/12 + 'rem'
    // leftBottom.style.height = screenH + 'px'

    const map = new BMap.Map("dimap", {MAXZOOM: 18}); 
    // 初始化地图,设置中心点坐标和地图级别
    var point = new BMap.Point(120.149018,30.32539);    
    map.centerAndZoom(point,14);
    
    let Long, Dat;
    const {
      xqInfo
    } = this.props.GSPeople 
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
      // let leftBottom = document.querySelector(".data_info_left_bottom")
      mainDom[0].style.height = screenH/12 + 'rem'
      mainDom[1].style.height = screenH/12 + 'rem'
      // leftBottom.style.height = screenH + 'px'
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

    // this.timer3 = setInterval(
    //   () => this.props.getPersonnelRecord(),
    //   10000
    // );
    // this.timer4 = setInterval(
    //   () => this.props.getCLSelectRecVehicleRecord(),
    //   10000
    // );
  }
  
  componentWillUnmount() {
    // clearInterval(this.timer3);
    // clearInterval(this.timer4);
  }

  render() {
    const {
      resultVisible
    } = this.state

    const {
      userDetail,
      userList,
      diLoading,
      searchLoading,
      // resultVisible
    } = this.props.GSPeople
    
    var userInfo = userDetail ? userDetail : null
    var archHousing = userInfo ? userInfo.archHousing : null
    var eqptEquipmentRecord = userInfo ? userInfo.eqptEquipmentRecord : null
    var legalCase = userInfo ? userInfo.legalCase : null
    var user = userInfo ? userInfo.user : null
    var vmVehicle = userInfo ? userInfo.vmVehicle : null

    var vmVehicleCode = ''
    
    if (vmVehicle) {
      vmVehicleCode = vmVehicle.map((item, index) => {
        return(
          <span key={index}>{item.licenseNumber}</span>
        )
      })
    } 

    const toTopButtonsProps = {
      userKey: this.props.GSCar.userKey,
    }

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 6,
        },
      },
    };


    var dataSource = []

    if (userList) {
        userList.map((item, index) => {
            var useritem = {
                key: item.user.id,
                name: item.user.name,
                idCard: item.user.idCard,
                mobile: item.user.mobile,
            }
            return dataSource.push(useritem)
        })
    }

    const columns = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <span className="result_name" data-id={record.key} onClick={this.peopleSearch}>{text}</span>,
    }, {
        title: '身份证',
        dataIndex: 'idCard',
        key: 'idCard',
    }, {
        title: '手机',
        dataIndex: 'mobile',
        key: 'mobile',
    }];
    

    return (
      <Spin size="large" spinning={diLoading}> 
        <div className="animated slideInLeft">
          <Row>
              {/* address: "杭州市拱墅区上塘镇水田畈３６号"
              age: "56"
              birthDate: "1962-06-21 00:00:00"
              createDate: "2018-07-24 19:12:15"
              delete: false
              fieldLimit: "*"
              gender: "male"
              id: 1728
              idCard: "33010719620621093X"
              limit: 20
              marriage: ""
              mobile: "+86-13185083686"
              modifyDate: "2018-09-11 01:00:19"
              name: "孟国建"
              nativePlace: "浙江省"
              state: 0 */}
            <Col span={18}  className="data_info_item data_info_left">
              <div className="data_info_right_item data_info_right_1">
                <div className="top_item_left fl">

                  {user ? <div className="item_people_info clearfix">
                            <img className="people_img" src={user ? user.file : peopleDefault}/>
                            <div className="people_text">
                              <p>姓名：{user ? user.name : ''}</p>
                              <p>性别：{user ? user.gender=="male" ? '男' : '女' : ''}</p>
                              <p>民族：{user ? user.name : ''}</p>
                              <p>出生：{user ? user.birthDate : ''}</p>
                              <p>住址：{user ? user.address : ''}</p>
                              <p>身份证：{user ? user.idCard : ''}</p>
                              <p>联系电话：{user ? user.mobile : ''}</p>
                              <p>车辆：{vmVehicleCode}</p>
                            </div>
                          </div> : ''}

                          <div className="item_people_info">
                            <p>案底：{legalCase ? legalCase.length != 0 ? legalCase : '无' : '无'}</p>
                          </div>
                              
                </div>
                <div className="top_item_right fr">   
                  <div className="item_car_info">
                    <div className="card_container">

                        {/* bodyColor: "白色"
                        brand: "其它"
                        code: ""
                        color: "白色"
                        createDate: "2018-07-24 19:24:31"
                        delete: false
                        fieldLimit: "*"
                        id: 5
                        licenseNumber: "浙F680TC"
                        limit: 20
                        modifyDate: "2018-09-10 19:03:22"
                        remark: "23"
                        state: 0
                        type: "0"
                        userId: 2626
                        vin: "" */}

                        { vmVehicle ? vmVehicle.length>0 ? vmVehicle.map((item, index) => {
                          return(
                            <div key={index} className="card_item">
                              <img className="people_img" src={carDefault}/>
                              <div className="card_item_right">
                                <p>车牌号：{item.licenseNumber}</p>
                                <p>车主：男</p>
                                <p>车辆类型：{item.vin}</p>
                                <p>上牌时间：未知</p>
                                <p>上牌地：未知</p>
                                <p>排量：未知</p>
                                <p>减速箱：未知</p>
                                <p>关联人数：未知</p>
                              </div>
                            </div>
                          )
                        }) : <div className="nodata">暂无数据</div> : <div  className="nodata">暂无数据</div> }
                    </div>
                  </div>


                    {/* housing: {archives: "", area: 0, commercial: false, createDate: "2018-08-06 18:06:12", delete: false,…}
                    archives: ""
                    area: 0
                    commercial: false
                    createDate: "2018-08-06 18:06:12"
                    delete: false
                    externalId: "b6978204e785b87f90cf62c4fa52994d"
                    fieldLimit: "*"
                    housingPictureId: 8
                    id: 1000
                    layer: 2
                    limit: 20
                    modifyDate: "2018-09-10 10:15:29"
                    name: "2-25-12幢"
                    oriented: ""
                    room: "12-2-2-0201"
                    state: 0
                    storiedBuildingId: 47
                    unit: 2
                    usage: "rentOut"
                    zoneId: 3
                    housingMaster: [{name: "贾春华", mobile: "+86-13634106811"}, {name: "俞洪庆", mobile: "+86-15990120038"},…]
                    0: {name: "贾春华", mobile: "+86-13634106811"}
                    1: {name: "俞洪庆", mobile: "+86-15990120038"}
                    2: {name: "高祥", mobile: "+86-19906630556"}
                    3: {name: "朱仪泽", mobile: "+86-13656670936"}
                    4: {name: "王超", mobile: "+86-13082801555"}
                    5: {name: "余国良", mobile: "+86-13805785230"}
                    userTotal: 30 */}
                  {/* <div> */}
                    { archHousing ? <div className="item_house_info">
                                      <div className="ext_btn" onClick={this.toPageHouse.bind(this, archHousing[0].housing.zoneId, archHousing[0].housing.storiedBuildingId, archHousing[0].housing.id)}></div>
                                      <div className="card_item">
                                        <img className="people_img" src={houseDefault} />
                                        <div className="card_item_right">
                                          <p>房屋信息：{archHousing ? archHousing[0] ? utils.getHouseUsage(archHousing[0].housing.usage) : '' : ''}</p>
                                          <p>房屋面积：{archHousing ? archHousing[0] ? archHousing[0].housing.area : '' : ''}㎡</p>
                                          <p>租住人数：{archHousing ? archHousing[0] ? archHousing[0].userTotal : '' : ''}</p>
                                          <p>租住时间：未知</p>
                                          <p>房东姓名：{archHousing ? archHousing[0] ? archHousing[0].housingMaster ?  archHousing[0].housingMaster.map((item, index) => {
                                            return (
                                              <span key={index}> {item.name} </span>
                                            )
                                          }): '' : '' : ''}</p>
                                          <p>房东联系电话：{archHousing ? archHousing[0] ? archHousing[0].housingMaster ?  archHousing[0].housingMaster.map((item, index) => {
                                            return (
                                              <span key={index}> {item.mobile} </span>
                                            )
                                          }): '' : '' : ''}</p>
                                        </div>
                                      </div>
                                    </div> : '' }
                  {/* </div> */}
                </div>
              </div>
              <div className="data_info_right_item data_info_right_2">
                <div className="" id="dimap" style={{width: '100%', height: '100%'}}></div>
              </div>        
            </Col>
            <Col span={6}  className="data_info_item data_info_right">
              
              <div className="data_info_right_item data_info_right_1">
                <div className="top_data_title1">
                  <p>搜索</p>
                </div>
                <Spin spinning={searchLoading}>
                  <Form onSubmit={this.handleSubmit}>
                    <FormItem
                      {...formItemLayout}
                        label="姓名"
                    >
                      {getFieldDecorator('name', {
                        rules: [{ message: '请输入姓名!', whitespace: false }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                        label="身份证"
                    >
                      {getFieldDecorator('idCard', {
                        rules: [{ message: '请输入身份证!', whitespace: false }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                        label="车牌号"
                    >
                      {getFieldDecorator('licenseNumber', {
                        rules: [{ message: '请输入车牌号!', whitespace: false }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                      <Button type="primary" htmlType="submit">搜索</Button>
                    </FormItem>
                  </Form>
                </Spin>
              </div>
              
              <div className="data_info_right_item data_info_right_2">
                <div className="top_data_title1">
                  <p>历史轨迹</p>
                </div>
                <div className="card_container">

                  {/* eqptEquipmentName: "园区1期8幢1单元数字门口机_05"
                  latitude: ""
                  location: ""
                  locationDate: "2018-07-24 18:19:55"
                  longitude: "" */}

                  { eqptEquipmentRecord ? eqptEquipmentRecord.length>0 ? eqptEquipmentRecord.map((item, index) => {
                    return(
                      <div className="right_monitor_block" key={index}>
                        <p>定位点：{item.longitude? item.longitude + ',' : '' } {item.longitude? item.latitude + ',' : '' } {item.longitude? item.location + ',' : '' }</p>
                        <p>采集设备：{item.eqptEquipmentName}</p>
                        <p>定位时间：{item.locationDate}</p>
                      </div>
                    )
                  }) : <div className="nodata">暂无数据</div> : <div className="nodata">暂无数据</div> }
                </div>
              </div>
            </Col>
          </Row>
          <TopButtons {...toTopButtonsProps} />

          <Modal
            className="transparency_modal"
            title="搜索结果"
            visible={resultVisible}
            onOk={this.modalHandleOk}
            onCancel={this.modalHandleCancel}
          >
            {userList&&userList.length>0 ? 
                <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    style= {{color: "#fff"}}
                /> 
            : '' }


            {/* {userList&&userList.length>0 ? userList.map((item, index)=>{
              return(
                <p key={index}>{item.user.name}{item.user.idCard}{item.user.mobile}</p>
              )
            }) : '' } */}
          </Modal>
        </div>
      </Spin>
    )
  }
}

export default Form.create()(People);
