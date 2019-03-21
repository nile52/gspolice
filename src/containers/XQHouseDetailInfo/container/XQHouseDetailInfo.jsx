/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions/XQHouseDetailInfo'
import {
  Row,
  Col,
  Spin,
  Modal,
  Button
} from 'antd'
import '../style/XQHouseDetailInfo.less'
import utils from '../../../util/util';

@connect(
    state => state,
    {...actions}
)

class XQHouseDetailInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: null,
      barHeight: 0,
      visible: false
    }
  }

  showModal = (value) => {
    this.setState({
      visible: true,
      info: value
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  componentWillMount() {
    let housingId = utils.getQueryVariable('housingId');
    this.props.getXqList()
    this.props.getHomePageUser(housingId)
  }

  componentDidMount() {
    let _this = this
    let screenH = document.documentElement.clientHeight
    let mainDom = document.getElementsByClassName("data_info_item")
    let mainBlock = document.getElementsByClassName("house_info_main")
    mainDom[0].style.height = screenH/12 + 'rem'
    mainDom[1].style.height = screenH/12 + 'rem'
    mainBlock[0].style.height =  screenH - 10*12 - 40 + 'px'
    // mainBlock[1].style.height = screenH/12 + 'rem'
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

    
    clearInterval(timer1)
    let timer1 = setInterval(() => {
      let nowTime = new Date().getTime();
      let weekArr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
      var weekDay = new Date().getDay();
      _this.setState({
        time: utils.timeToHMS(nowTime) + ' ' + weekArr[weekDay]
      })
    }, 1000)




    window.onresize = function() {
      let screenH = document.documentElement.clientHeight
      let mainDom = document.getElementsByClassName("data_info_item")
      let leftBottom = document.querySelector(".data_info_left_bottom")
      mainDom[0].style.height = screenH/12 + 'rem'
      mainDom[1].style.height = screenH/12 + 'rem'
    }


  }



  render() {
    const {
      barHeight,
    } = this.state
    const {
      diLoading,
      homePageUser,
      xqInfo
    } = this.props.XQDataInfo


    const selectHousing = homePageUser ? homePageUser.housing : ''
    const homeResidentList = homePageUser ?  homePageUser.liveUser : ''
    const noliveUser = homePageUser ?  homePageUser.noliveUser : ''
    
    return (
      <div>
        <Row>
          <Col span={18}  className="data_info_item data_info_left">
            <Row>
              <Col span={24} className="data_info_left_top">
                <div className="data_info_header_center">
                  <div className="data_info_header_center_bg">
                    {xqInfo ? xqInfo.name : ''}小区数据概览
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
              <div className="data_info_right_item  house_info_main">
                <div className="house_title">{homePageUser ? homePageUser.housing.room : ''}</div>
                <Row>
                    {homeResidentList&&homeResidentList.length>0?
                      homeResidentList.map((i, index) => {
                        var item = i.user
                        var vehicle = i.vehicle
                        var vehicleBlock
                        if (vehicle.length) {
                        var vehicleBlock = <Button type="primary" onClick={ () => this.showModal(vehicle)}>查看车辆</Button>   
                        } 
                        let path = `/xqhousedetailinfo/housingId/` + item.id;
                        return (
                          <Col className="ant-col" key={index} xs={{ span: 7 }} lg={{ span: 7 }}>
                            <div className="house_info type_blue clearfix">
                              <div className="">
                                <img className="room_person_img" src={item.file}/>
                              </div>
                              <div className="room_person_info"><span>{item.name}</span>{item.gender == 'male' ? '男' : '女'}，{item.nativePlace}，维吾尔族</div>
                              <div className="room_person_idcardnum">{utils.plusXing(item.idCard, 9, 0)}</div>                             
                              {vehicleBlock}                     
                            </div>
                          </Col>
                        )
                      })
                    :<div>暂无数据</div>}
                </Row>
                

                {/* 车辆模态框 */}
                <div>
                  <Modal
                    title="车辆信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >
                  {/* 浙A12345白色，奥迪A5
                  车位001，2018-12-22到期，200元/月
                  用车人：李大牛（车主本人） */}
                    {this.state.info ? this.state.info.map((item, index) => {
                        return (
                          <div class="car_info">
                            <div class="room_car_info1">
                              <span>{item.licenseNumber}</span>{item.color},{item.brand}
                            </div>
                            <div class="room_car_info2">车位{item.parkingSpaceId}，2018-12-22到期，200元/月</div>
                            <div class="room_car_info3">用车人：李大牛（车主本人）</div>
                          </div>
                        )
                      })
                    : ''}
                  </Modal>
                </div>


                {/* <div className="house_title_sub"><span>房间车辆情况</span></div>
                <Row>
                  <Col className="ant-col" xs={{ span: 8 }} lg={{ span: 7 }}>
                    <div className="car_info">
                      <div className="room_car_info1"><span>浙A12345</span>白色，奥迪A5</div>
                      <div className="room_car_info2">车位001，2018-12-22到期，200元/月</div>
                      <div className="room_car_info3">用车人：李大牛（车主本人）</div>                     
                    </div>
                  </Col>
                  <Col className="ant-col" xs={{ span: 8 }} lg={{ span: 7 }}>
                    <div className="car_info">
                      <div className="room_car_info1"><span>浙A12345</span>白色，奥迪A5</div>
                      <div className="room_car_info2">车位001，2018-12-22到期，200元/月</div>
                      <div className="room_car_info3">用车人：李大牛（车主本人）</div>                     
                    </div>  
                  </Col>
                  <Col className="ant-col" xs={{ span: 8 }} lg={{ span: 7 }}>
                    <div className="car_info">
                      <div className="room_car_info1"><span>浙A12345</span>白色，奥迪A5</div>
                      <div className="room_car_info2">车位001，2018-12-22到期，200元/月</div>
                      <div className="room_car_info3">用车人：李大牛（车主本人）</div>                     
                    </div>     
                  </Col>
                </Row> */}
              </div>
              
            </Spin>
          </Col>
          <Col span={6}  className="data_info_item data_info_right">
            <div className="data_info_right_item data_info_right_3">
              <div className="house_title_sub"><span>房屋情况</span></div>
              <Row className="xq_detail_item xq_detail_item_first">
                <Col span={8}><span className="xq_detail_addr_label">逻辑房号:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{selectHousing ? selectHousing.externalId : ''}</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">幢号:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{selectHousing ? selectHousing.layer : ''}</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">单元号:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{selectHousing ? selectHousing.unit : ''}</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">状态:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{selectHousing ? utils.getHouseUsage(selectHousing.usage) : ''}</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">装修:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{selectHousing ? selectHousing.totalStoriedBuilding : ''}</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">装修时间:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{selectHousing ? selectHousing.EqptEquipmentChannelDoorTotal : ''}</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">面积:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{selectHousing ? selectHousing.area : ''}</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">物业费:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">5</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">物业截止时间:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">5</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">人数:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">5</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">车数:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">5</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">老人标记:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">5</span></Col>  
              </Row>
            </div>
            <div className="data_info_right_item data_info_right_2">
                <div className="house_title_sub"><span>历史居住</span></div>
                <div className="house_person_history">
                  <Row>
                    {noliveUser.length>0 ? noliveUser.map((item, index) =>{
                      return (
                        <Col className="ant-col" key={index} xs={{ span: 24 }} lg={{ span: 24 }}>
                          <div className="house_info type_orange">
                            <div className="">
                              <img className="room_person_img" src={item.file}/>
                            </div>
                            <div className="room_person_info"><span>{item.name}</span>{item.gender == 'male' ? '男' : '女'}，{item.nativePlace}，维吾尔族</div>
                            <div className="room_person_idcardnum">{utils.plusXing(item.idCard, 9, 0)}</div>             
                          </div>
                        </Col>
                      )
                    }) : <div>暂无数据</div>}

                     
                  </Row>
                </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default XQHouseDetailInfo;
