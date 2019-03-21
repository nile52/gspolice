import React, {Component} from 'react';
import { Form, Button, Row, Col, Select} from 'antd';
import PeopleInfoBar from './PeopleInfoBar'
import { getResidentList, getHousing } from '../actions/DataVisualization';
const Option = Select.Option;

class DataLayerUnitRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabKey: 'house'
    }
  }

  handleTabs = (type) => {
    this.setState({
      tabKey: type
    })
  }

  render() {
    const {
      xqInfo,
      homeUnitList,
      homeRoomList,
      homeUnit,
      homeRoom,
      homeBuildInfo,
      homeBuildTotal,
      handleOk,
      handleCancel,
      getRoomList,
      getResidentList,
      getHousing,
      changev
    } = this.props
    const {
      tabKey
    } = this.state
    let newHomeBuildInfoName = ''
    let newHomeBuildInfoNameArr = homeBuildInfo.name.split('-')
    let newHomeBuildInfoNameArrLength = newHomeBuildInfoNameArr.length
    if( newHomeBuildInfoNameArrLength > 1) {
      newHomeBuildInfoName = newHomeBuildInfoNameArr[newHomeBuildInfoNameArrLength -1]
    } else {
      newHomeBuildInfoName = homeBuildInfo.name
    }
    let homeBuildName = xqInfo.name + newHomeBuildInfoName
    let unitOptions,roomOptions;
    if(homeUnitList &&  homeUnitList.length > 0) {
      unitOptions = homeUnitList.map((item, index) => {
          return <Option key={index} value={item} className="house_lay_select_option">{item}</Option>;
      });
    } else {
        unitOptions = [];
    }
    if(homeRoomList &&  homeRoomList.length > 0) {
      
      roomOptions = homeRoomList.map((item, index) => {
        let newRoom = ''
        let newRoomArr = item.room.split('-')
        let newRoomArrLength = newRoomArr.length
        if( newRoomArrLength > 1) {
          newRoom = newRoomArr[newRoomArrLength -1]
        } else {
          newRoom = item.room
        }
          return <Option key={index} value={item.id} className="house_lay_select_option"
            onClick={() => {
              handleOk(['roomVisible'])
            }}
          >{newRoom}</Option>;
      });
    } else {
      roomOptions = [];
    }
    unitOptions.unshift(<Option key="0" value="all">请选择</Option>)
    roomOptions.unshift(<Option key="0" value="all">请选择</Option>)
    const userTypeList = ['党员', '退伍军人', '残疾', '退休', '孤寡老人', '失业', '育龄妇女', '关怀人员']
    let userTypeArr = [] 
    if(homeBuildTotal.userType && homeBuildTotal.userType['居民类型']) {
      homeBuildTotal.userType['居民类型'].forEach(item => {
        if(userTypeList.indexOf(item.name) > -1) {
          let total = homeBuildTotal.userTypeTotal[item.id] || 0
          userTypeArr.push({
            name: item.name,
            total: total
          })
        }
      })
    }
    return (
      <div className="data_layer_unit_room">
        <div className="layer_unit_room_close" onClick={(type) => {
          handleOk(['residentVisible', 'floatingVisible', 'videoVisible', 'videoInfoVisible'])
          handleCancel(['layerVisible', 'roomVisible', 'inOutVisible'])
        }}>x</div>
        <Row>
          <div className="layer_info">{homeBuildName}</div>
        </Row>
        <Row>
          <div className="layer-info-wrap">
            <Row>
              <Col span={12}>
                <div className="layer_info_item">
                  <label className="layer_info_item_label">楼层数：</label>
                  <span className="layer_info_item_num">{homeBuildInfo.layer?homeBuildInfo.layer:0}</span>
                </div>
              </Col>
              <Col span={12}> 
                <div className="layer_info_item">
                  <label className="layer_info_item_label">常住人员：</label>
                  <span className="layer_info_item_num">{homeBuildTotal.longTimeTotal?homeBuildTotal.longTimeTotal:0}</span>
                </div>
              </Col>
            </Row> 
            <Row>
              <Col span={12}>
                <div className="layer_info_item">
                  <label className="layer_info_item_label">单元数：</label>
                  <span className="layer_info_item_num">{homeBuildInfo.unit?homeBuildInfo.unit:0}</span>
                </div>
              </Col>
              <Col span={12}> 
                <div className="layer_info_item">
                  <label className="layer_info_item_label">流动人员：</label>
                  <span className="layer_info_item_num">{homeBuildTotal.flowTotal?homeBuildTotal.flowTotal:0}</span>
                </div>
              </Col>
            </Row> 
            <Row>
              <Col span={12}>
                <div className="layer_info_item">
                  <label className="layer_info_item_label">住房套数：</label>
                  <span className="layer_info_item_num">{homeBuildTotal.housingTotal?homeBuildTotal.housingTotal:0}</span>
                </div>
              </Col>
            </Row> 
            <Row>
              <div style={{height: '1rem'}}></div>
            </Row>
            <div className="layer_info_btn_wrap">
              <Row type="flex" justify="space-between">
                  <Col span={10}>
                    <div 
                      className="layer_info_btn_item"
                      onClick={(type) => this.handleTabs('house')}>
                      <div
                        className={tabKey == 'house'? "layer_info_btn_item_text layer_info_btn_item_active" : "layer_info_btn_item_text"}>
                          房屋信息
                        </div>
                    </div>
                  </Col> 
                  <Col span={10}>
                    <div className="layer_info_btn_item" onClick={(type) => this.handleTabs('people')}>
                      <div 
                        className={tabKey == 'people'? "layer_info_btn_item_text layer_info_btn_item_active" : "layer_info_btn_item_text"}>
                          人员结构
                        </div>
                    </div>
                  </Col> 
                
              </Row> 
            </div>
          </div>
        </Row> 

        <Row>
          <div className="layer_info_content_wrap">
            <div>
              {/* 房屋信息组件 */}
              {tabKey == "house" ? 
                <div className="house_info_wrap">
                  <Row type="flex" justify="space-around">
                    <Col span={9}>
                      <Col span={18} className="house_info_select" >
                        <Select value={homeUnit} style={{width: '7rem'}}
                          onChange={(value) => {
                            if(value == 'all') {
                              handleCancel(['roomVisible', 'inOutVisible'])
                              changev({
                                homeUnit: value,
                                homeRoom: value
                              })
                            } else {
                              getRoomList(value, () => {
                                handleCancel(['roomVisible', 'inOutVisible'])
                                changev({
                                  homeUnit: value,
                                })
                              })
                            }
                          }}
                          getPopupContainer={() => document.getElementById('datavisualization')}
                        >
                          {unitOptions}
                        </Select>
                      </Col>
                      <Col span={6}>
                        <span className="house_info_unit">单元</span>
                      </Col>
                    </Col>
                    <Col span={9}>
                      <Col span={18} className="house_info_select" >
                        <Select 
                          value={homeRoom} style={{width: '7rem'}}
                          onChange={(value) => {
                            if(value == 'all') {
                              handleCancel(['roomVisible', 'inOutVisible'])
                            }else {
                              handleCancel('inOutVisible')
                              // WEI_HOUSE
                              getResidentList(value)
                              getHousing(value)
                            }
                            changev({
                              homeRoom: value
                            })
                          }}
                          getPopupContainer={() => document.getElementById('datavisualization')}
                          >
                          {roomOptions}
                        </Select>
                      </Col>
                      <Col span={6}>
                        <span className="house_info_unit">室</span>
                      </Col>
                    </Col>
                  </Row> 
                </div>
              : null}
              {/* 人员结构组件 */}
              {tabKey == "people" ? 
                <div className="people_info_wrap">
                  <Row>
                    <Col span={12}>
                      <div className="people_info_left">
                        <ul>
                            {
                              userTypeArr.map((item, index) => {
                                return (
                                  <li key={index}>
                                    <label>{item.name}:</label>
                                    <span>{item.total}</span> 
                                  </li>
                                )
                              })
                            }
                        </ul>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="people_info_right">
                        {homeBuildTotal.age?<PeopleInfoBar age={homeBuildTotal.age}/>:null}
                      </div>
                    </Col>
                  </Row>
                </div>
              : null}
              
            </div>
          </div>
        </Row> 
      </div>
    )
  }
}

export default DataLayerUnitRoom;