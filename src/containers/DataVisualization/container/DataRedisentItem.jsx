import React, {Component} from 'react';
import {Row, Col} from 'antd';
import utils from '../../../util/util.js'
import Redisent from '../../../static/images/test_redisent.jpg'

class DataRedisentItem extends Component {
  render() {
    const {
      homeResidentList,
      handleOk,
      getSelectRecVehicleRecord
    } = this.props
    return (
      <div className="resident_info_wrap">
          <div className="resident_info_content">
            <ul>
              {
                homeResidentList.map((item, index) => {
                  //console.log(item.birthDate.length==13?utils.howOld(item.birthDate).years:'')
                  if(item.file) {
                    return (
                      <li className="resident_info_item">
                        <Row>
                          <Col span={6} className="resident_img_item" >
                            <img src={item.file?item.file:Redisent}alt=""/>
                          </Col>
                          <Col span={18}>
                            <Row>
                              <Col span={12}>
                                <div className="resident_info_item_content">
                                  <ul>
                                      <li>
                                        <label>姓名:</label>
                                        <span>{item.name}</span> 
                                      </li>
                                      <li>
                                        <label>性别:</label>
                                        <span>{item.gender == 'male' ? '男' : '女'}</span> 
                                      </li>
                                      <li>
                                        <label>民族:</label>
                                        <span>{item.racial}</span> 
                                      </li>
                                      <li>
                                        <label>文化程度:</label>
                                        <span>{item.educationBackground}</span>
                                      </li>
                                      <li>
                                        <label>籍贯:</label>
                                        <span>{item.nativePlace}</span>
                                      </li>
                                      <li>
                                        <label>证件类型:</label>
                                        <span>身份证</span>
                                      </li>
                                    </ul>
                                </div>
                              </Col>
                              <Col span={12}>
                                <div className="resident_info_item_content">
                                  <ul>
                                      {/*<li>
                                        <label>年龄:</label>
                                        <span>{item.birthDate.length==13?utils.howOld(item.birthDate).years:''}</span> 
                                      </li>*/}
                                      <li>
                                        <label>人员类型:</label>
                                        <span>{item.type}</span> 
                                      </li>
                                      <li>
                                        <label>房间号:</label>
                                        <span></span>
                                      </li>
                                    </ul>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={24}>
                                <div className="resident_info_item_content_idCard">
                                  <ul>
                                    <li>
                                      <label>证件号:</label>
                                      <span>{utils.plusXing(item.idCard, 9, 0)}</span>
                                    </li>
                                  </ul>
                                </div>
                              </Col> 
                            </Row>
                            
                          </Col>
                        </Row>
                        <div className="resident_info_btn_item_wrap">
                          <Row type="flex" justify="space-around">
                            <Col span={5}>
                              <div 
                                  className="resident_info_btn_item resident_info_btn_item_disable">
                                  <div
                                    className="resident_info_btn_item_text">
                                      查看同户信息
                                  </div>
                              </div>
                            </Col>
                            <Col span={5}>
                              <div 
                                  className="resident_info_btn_item resident_info_btn_item_disable">
                                  <div
                                    className="resident_info_btn_item_text">
                                      人员出入记录
                                  </div>
                              </div>
                            </Col>
                            <Col span={5}>
                              <div 
                                  className="resident_info_btn_item resident_info_btn_item_disable">
                                  <div
                                    className="resident_info_btn_item_text">
                                      查看车辆信息
                                  </div>
                              </div>
                            </Col>
                            <Col span={5} onClick={(type) => {
                              getSelectRecVehicleRecord(item.idCard, () => {
                                handleOk('inOutVisible')
                              })
                            }}>
                              <div 
                                  className="resident_info_btn_item ">
                                  <div
                                    className="resident_info_btn_item_text resident_info_btn_item_active">
                                      车辆出入记录
                                  </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        
                      </li>
                    )
                  }
                })
              }
            </ul>
          </div>
          <div className="resident_info_scroll"></div>
        </div>
    )  
  }
}

export default DataRedisentItem;