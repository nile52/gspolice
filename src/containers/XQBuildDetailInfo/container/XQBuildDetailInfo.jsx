/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Tag, Select} from 'antd'
import * as actions from '../actions/XQBuildDetailInfo'
// import { getRoomList } from '../actions/XQBuildDetailInfo';
import $ from 'jquery'
import {
  Row,
  Col,
  Spin
} from 'antd'
import '../style/XQBuildDetailInfo.less'
import {
  WEI_SERVICE
} from '../../../fetch/apis'
import utils from '../../../util/util';
import sxt1 from '../../../static/images/sxt1.gif'
import sxt3 from '../../../static/images/sxt3.gif'
import rlsx1 from '../../../static/images/rlsx1.png'
import rlsx3 from '../../../static/images/rlsx3.png'
const Option = Select.Option;

@connect(
    state => state,
    {...actions}
)

class XQBuildDetailInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: null,
      barHeight: 0
    }
  }


  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
    this.props.getZonetotal()
    let homeBuild = utils.getQueryVariable('buildingId');
    this.props.getHomePageHousing(homeBuild)
  }

  componentDidMount() {
    let _this = this
    let screenH = document.documentElement.clientHeight
    let mainDom = document.getElementsByClassName("data_info_item")
    let mainBlock = document.getElementsByClassName("build_info_main")
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
      homeUnit,
    } = this.state
    const {
      getRoomList,
      changev,
    } = this.props
    const {
      diLoading,
      XQHouseTypeTotal,
      getZonetotal,
      // homeRoomList,
      initUnitNum ,
      getSelectStoriedBuilding,
      homePageHousing,
      zonetotal
    } = this.props.XQDataInfo



    function getUsageColor(usage) {
      var usageColor = ''     
      switch (usage) {
        case '出租': 
          usageColor = "type_green"
          break;
        case '自住': 
          usageColor = "type_blue"
          break;
        case '群租': 
          usageColor = "type_red"
          break;
        case '网约': 
          usageColor = "type_yellow"
          break;  
        default:
          usageColor = "type_gray"
          break;
      }
      return usageColor
    }



    var UnitTitle = '';
    // debugger
    var unitNum = getSelectStoriedBuilding ? getSelectStoriedBuilding.unit : ''
    var unitName = homePageHousing ? homePageHousing.storiedBuilding.name : ''
    var unitId = getSelectStoriedBuilding ? getSelectStoriedBuilding.id : ''

    let newName = ''
    let newNameArr = unitName.split('-')
    let newNameArrLength = newNameArr.length
    if( newNameArrLength > 1) {
      newName = newNameArr[newNameArrLength -1]
    } else {
      newName = unitName
    }

    if (unitNum > 1) {
      let unitOptions = [];
      for (let index = 1; index < unitNum+1; index++) {
        unitOptions.push(<Option key={index} value={index} className="house_lay_select_option">{index}</Option>);
      }

      UnitTitle = <div className="build_title">{newName}
                    <Select value={initUnitNum} style={{width: '7rem'}}
                      onChange={(value) => {
                          console.log(value)
                          getRoomList(unitId, value);   
                          changev({
                            initUnitNum: value
                          })                  
                      }}
                      // getPopupContainer={() => document.getElementById('datavisualization')}
                    >
                      {unitOptions}
                    </Select>
                  </div>
    } else {
      UnitTitle = <div className="build_title">{newName}1单元</div>
    }
  
    return (
      <div>
        <Row>
          <Col span={18}  className="data_info_item data_info_left">
            <Row>
              <Col span={24} className="data_info_left_top">
                <div className="data_info_header_center">
                  <div className="data_info_header_center_bg">
                    {zonetotal ? zonetotal.zone.name : ''}小区数据概览
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
              <div className="data_info_right_item  build_info_main">
                {UnitTitle}
                <div className="rowlist">
                  <Row gutter={24}>
                    {homePageHousing&&homePageHousing.housing.length>0?
                      homePageHousing.housing.map((item, index) => {
                        let path = `/xqhousedetailinfo/housingId/` + (item.housingId ? item.housingId : 38) +`/zoneId/`+ this.props.XQDetailInfo.xqId;
                        let UsageColor = getUsageColor(item.usage)
                        let newRoomName = ''
                        let newNameArr = item.room.split('-')
                        let newNameArrLength = newNameArr.length
                        if( newNameArrLength > 1) {
                          newRoomName = newNameArr[newNameArrLength -1]
                        } else {
                          newRoomName = item.room
                        }
                        return (
                          <Col span={3} key={index}>
                            <Link to={path}>
                              <div className={"room_info " + UsageColor}  >
                                <div className="room_num">{newRoomName}</div>
                                <div>住{item.housingUserTotal ? item.housingUserTotal : '0'}人</div>
                                <div>车{item.housingVehicle ? item.housingVehicle : '0'}辆</div>
                                <div className="room_type">{item.usage}</div>                             
                              </div>
                            </Link>                        
                          </Col>
                        )
                      })
                    :<div>暂无数据</div>}
                  </Row>                  
                </div>
              </div>
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
                        <div className="data_info_right_1_text_num right_1_green_num">{homePageHousing ? homePageHousing.userPermanent : ''}</div>
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
                        <div className="data_info_right_1_text_num right_1_blue_num">{homePageHousing ? homePageHousing.userFlow : ''}</div>
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
                        <div className="data_info_right_1_text_num right_1_yellow_num">{homePageHousing ? homePageHousing.housingTotal-1 : ''}</div>
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
                        <div className="data_info_right_1_text_num right_1_red_num">{homePageHousing ? homePageHousing.vehicle : ''}</div>
                      </div>
                    </Col>
                </Col>
              </Row>

              <Row className="data_info_right_2_item_wrap">
                <Col span={24} className="data_info_right_1_item">
                    <Col span={6} className="data_info_right_1_item_item">
                      <div className="">
                        <div className="data_info_right_buttom_text">
                          <Tag color="blue">自住</Tag>
                          {homePageHousing ? homePageHousing.personalUse : ''}
                        </div>
                      </div>
                    </Col>
                    <Col span={6} className="data_info_right_1_item_item">
                      <div className="">
                        <div className="data_info_right_buttom_text">
                          <Tag color="green">出租</Tag>
                          {homePageHousing ? homePageHousing.rentOut : ''}
                        </div>
                      </div>
                    </Col>
                    <Col span={6} className="data_info_right_1_item_item">
                      <div className="">
                        <div className="data_info_right_buttom_text">
                          <Tag color="red">群租</Tag>
                          {homePageHousing ? homePageHousing.groupLive : ''}
                        </div>
                      </div>
                    </Col>
                    <Col span={6} className="data_info_right_1_item_item">
                      <div className="">
                        <div className="data_info_right_buttom_text">
                          <Tag color="yellow">网约</Tag>
                          {homePageHousing ? homePageHousing.Internet : ''}
                        </div>
                      </div>
                    </Col>
                </Col>
              </Row>
            </div>

            <div className="data_info_right_item data_info_right_3">
              <Row className="xq_detail_item xq_detail_item_first">
                <Col span={8}><span className="xq_detail_addr_label">所属幢:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{newName}</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">所属单元:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">绿洲物业</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">联系人:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">李某某</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">联系电话:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{getZonetotal ? getZonetotal.zone.phone : ''}</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">幢:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{homePageHousing ? homePageHousing.storiedBuilding.layer : ''}</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">门禁:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">{getZonetotal ? getZonetotal.EqptEquipmentChannelDoorTotal : ''}</span></Col>  
              </Row> 
              <Row className="xq_detail_item">
                <Col span={8}><span className="xq_detail_addr_label">探针:</span></Col>
                <Col span={16}><span className="xq_detail_addr_text">5</span></Col>  
              </Row> 
            </div>
          </Col>
        </Row>
        
      </div>
    )
  }
}

export default XQBuildDetailInfo;
