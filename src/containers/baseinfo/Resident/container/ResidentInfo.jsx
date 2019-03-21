/* eslint-disable */
import React, { Component } from 'react';
import { Button, Form, Row, Col, Upload } from 'antd';
const FormItem = Form.Item;
import Logo from '../../../../static/images/logo.jpg'
import utils from '../../../../util/util.js'
import {
    formItemLayout1,
    formItemLayout3,
    formItemLayout4,
    formItemLayout5,
    formItemLayout6
} from './residentDatas'
import '../style/Resident.less'

class ResidentInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { 
        singleResidentList, 
        singleUserType, 
        userTypeJson,
        provinceCityArea,
    } = this.props

    let singleUserTypeText = ''
    let singleUserTypeTextArr = []
    if(singleUserType.length > 0) {
        singleUserType.forEach(item => singleUserTypeTextArr.push(userTypeJson[item.valueId].name))
    }
    return (
        <div>
          <Row>
              <Col span={24}>
                    <Col span={9}>
                        <FormItem
                            {...formItemLayout3}
                                label="人员照片"
                            >
                            <img src={singleResidentList.personalPicture?singleResidentList.personalPicture:Logo} alt="" className="resident_img"/>
                        </FormItem>
                    </Col>
              </Col>
          </Row>
          <Row>
              <Col span={24}>
                    <Col span={9}>
                        <FormItem
                            {...formItemLayout3}
                                label="身份证照片"
                            >
                            <img src={singleResidentList.idCardPicture?singleResidentList.idCardPicture:Logo} alt="" className="resident_img"/>
                        </FormItem>
                    </Col>
              </Col>
          </Row>
          <Row>
              <Col span={24}>
                  <Col span={9}>
                      <FormItem 
                          label={'姓名:'}
                          {...formItemLayout3}
                      >
                          <span className="ant-form-text">{singleResidentList.name}</span>
                      </FormItem> 
                  </Col>
                  
              </Col> 
          </Row>
          <Row>
              <Col span={24}>
                    <Col span={9}>
                        <FormItem 
                            label={'性别:'}
                            {...formItemLayout3}
                        >
                            <span className="ant-form-text">{singleResidentList.gender=="male"?'男':'女'}</span>
                        </FormItem> 
                    </Col>
                    <Col span={9}>
                        <FormItem 
                            label={'居民类型:'}
                            {...formItemLayout3}
                        >
                            <span className="ant-form-text">{singleResidentList.flowIsPermanent}</span>
                        </FormItem> 
                    </Col>
              </Col> 
          </Row>
          <Row>
              <Col span={24}>
                  <Col span={9}>
                        <FormItem 
                            label="身份证号:"
                            {...formItemLayout6}
                        >
                          <span className="ant-form-text">{singleResidentList.idCard}</span>
                        </FormItem>
                  </Col>
                  <Col span={9}>
                      <FormItem 
                          label={'身份证地址:'}
                          {...formItemLayout3}
                      >
                        <span className="ant-form-text">{singleResidentList.address}</span>
                      </FormItem> 
                  </Col>
              </Col> 
          </Row>
          <Row>
              <Col span={24}>
                  <Col span={9}>
                        <FormItem 
                            label="户籍地址:"
                            {...formItemLayout6}
                        >
                          <span className="ant-form-text">{provinceCityArea}</span>
                        </FormItem>
                  </Col>
                  <Col span={9}>
                      <FormItem 
                          label={'详细地址:'}
                          {...formItemLayout3}
                      >
                        <span className="ant-form-text">{singleResidentList.householdsAddress}</span>
                      </FormItem> 
                  </Col>
              </Col> 
          </Row>
          <Row>
              <Col span={24}>
                  <Col span={9}>
                      <FormItem 
                          label={'出生日期:'}
                          {...formItemLayout3}
                      >
                        <span className="ant-form-text">{utils.timeToDate(singleResidentList.birthDate)}</span>
                      </FormItem> 
                  </Col>
                  <Col span={9}>
                      <FormItem 
                          label={'民族/国籍:'}
                          {...formItemLayout3}
                      >
                        <span className="ant-form-text">{singleResidentList.racial}</span>
                      </FormItem> 
                  </Col>
              </Col> 
          </Row>
          <Row>
              <Col span={24}>
                  <Col span={9}>
                      <FormItem 
                          label={'身份证有效期:'}
                          {...formItemLayout6}
                      >
                        <span className="ant-form-text">{utils.timeToDate(singleResidentList.idCardDate)}</span>
                      </FormItem> 
                  </Col>
                  <Col span={9}>
                        <FormItem 
                            label={'手机号:'}
                            {...formItemLayout4}
                        >
                          <span className="ant-form-text">{singleResidentList.mobile}</span>
                        </FormItem> 
                    </Col>
              </Col> 
          </Row>
          <Row>
              <Col span={24}>
                  <Col span={6}>
                      <FormItem 
                          label={'政治面貌:'}
                          {...formItemLayout1}
                      >
                        <span className="ant-form-text">{singleResidentList.politicsStatus}</span>
                      </FormItem> 
                  </Col>
                  <Col span={3} className="build-btns"></Col>
                  <Col span={6}>
                      <FormItem 
                          label={'婚姻状况:'}
                          {...formItemLayout1}
                      >
                        <span className="ant-form-text">{singleResidentList.marriage}</span>
                      </FormItem> 
                      
                  </Col>
              </Col> 
          </Row>
          <Row>
              <Col span={24}>
                  <Col span={9}>
                      <FormItem 
                          label={'电子邮箱:'}
                          {...formItemLayout3}
                      >
                          <span className="ant-form-text">{singleResidentList.email}</span>
                      </FormItem> 
                  </Col>
                  <Col span={9}>
                      <FormItem 
                          label={'微信号:'}
                          {...formItemLayout3}
                      >
                          <span className="ant-form-text">{singleResidentList.wx}</span>
                      </FormItem> 
                  </Col>
              </Col> 
          </Row>
          <Row>
              <Col span={24}>
                    <Col span={9}>
                        <FormItem 
                            label={'监护人手机号:'}
                            {...formItemLayout4}
                        >
                          <span className="ant-form-text">{singleResidentList.guardianMobile}</span>
                        </FormItem> 
                    </Col>
              </Col> 
          </Row>
          <Row>
              <Col span={24}>
                  <Col span={9}>
                      <FormItem 
                          label={'紧急联系人:'}
                          {...formItemLayout3}
                      >
                        <span className="ant-form-text">{singleResidentList.emergencyContact}</span>
                      </FormItem> 
                  </Col>
                  <Col span={9}>
                        <FormItem 
                            label={'紧急联系人手机号:'}
                            {...formItemLayout4}
                        >
                          <span className="ant-form-text">{singleResidentList.emergencyContactMobile}</span>
                        </FormItem> 
                    </Col>
              </Col> 
          </Row>
          <Row>
              <Col span={24}>
                  <Col span={18}>
                      <FormItem 
                          label={'居民标签:'}
                          {...formItemLayout5}
                      >
                        <span className="ant-form-text">{singleUserTypeTextArr.join(',')}</span>
                      </FormItem> 
                  </Col>
              </Col> 
          </Row>
          <Row>
              <Col span={24}>
                  <Col span={18}>
                      <FormItem 
                          label={'备注:'}
                          {...formItemLayout5}
                      >
                        <span className="ant-form-text">{singleResidentList.remark}</span>
                      </FormItem> 
                  </Col>
              </Col> 
          </Row>
       </div>
    )
  }
}

export default ResidentInfo;
