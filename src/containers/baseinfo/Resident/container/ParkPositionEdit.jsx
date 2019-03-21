/* eslint-disable */
import React, { Component } from 'react';
import { Button, Form, Row, Col, Select, Icon, Modal, DatePicker} from 'antd';
// 日期中文
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;
const Option = Select.Option;
import utils from '../../../../util/util.js'
import axios from 'axios'
import {
  CAS_LOGIN,
  CAS_CASCHECK,
  WEI_SELECT_PARKING_SPACE
} from '../../../../fetch/apis'
import '../style/Resident.less'
import { 
  validateParkArr, 
  positionTypeJson, 
  rulesTitle,
  formItemLayout1,
} from './residentDatas'
class ParkPositionEdit extends Component {
  constructor(props) {
    super(props)
    this.add = this.add.bind(this),
    this.edit = this.edit.bind(this)
    this.parkLotChange = this.parkLotChange.bind(this)
    this.getParkingSpaceCodingList = this.getParkingSpaceCodingList.bind(this)
    this.state = {
      addParkVisible: false,
      parkType: 'edit',
      nfParkingSpaceCodingList: [],
      parkingSpaceCodingList: [],
      park_name: 'please',
      park_parkingSpaceCoding: 'please',
      park_positionType: 'please',
      index: null
    }
  }

  add = () => {
    let _this = this
    this.props.form.validateFields(validateParkArr, (error, values) => {
      if (!error) {
        let parkingLotId,park_parkingSpaceCodingId;
        this.props.parkingLotList.forEach(item => {
          if(item.name == values.park_name) {
            parkingLotId = item.id
          }
        })
        this.state.parkingSpaceCodingList.forEach(item => {
          if(item.parkingSpaceCoding == values.park_parkingSpaceCoding) {
            park_parkingSpaceCodingId = item.id
          }
        })
        let userId = this.props.singleResidentList.id
        let zoneId = this.props.id
        let addParkJson = {
          "positionType": positionTypeJson[values.park_positionType],
          "positionType": positionTypeJson[values.park_positionType],
          "expireDate": positionTypeJson[values.park_expireDate],
          "id": park_parkingSpaceCodingId,
          "userId": userId,
        }
        let addJson = {
          id: park_parkingSpaceCodingId,
          userKey: null,
          limit: 20,
          pages: null,
          fields: null,
          rule: null,
          createDate: 1526457381000,
          createDateString: null,
          createName: null,
          modifyDate: 1527063818000,
          modifyDateString: null,
          modifyName: null,
          delete: false,
          fieldLimit: "*",
          parkingLotId: parkingLotId,
          zoneId: zoneId,
          userId: userId,
          parkingSpaceCoding: values.park_parkingSpaceCoding,
          positionType: values.park_positionType,
          expireDate: values.park_expireDate.format('YYYY-MM-DD'),
          vehicleType: null,
          chargingCoding: null,
          name: values.park_name,
          state: 0,
          label: null,
          isAdd: true,
        }
        this.props.plusPark(addJson, () => {
          this.setState({
            park_name: 'please',
            park_parkingSpaceCoding: 'please',
            park_positionType: 'please',
            parkingSpaceCodingList: [],
          }, this.props.form.resetFields(validateParkArr))
          this.handleCancel('addParkVisible')
        })
      }
    });
  }

  edit = () => {
    let _this = this
    this.props.form.validateFields(validateParkArr, (error, values) => {
      if (!error) {
        let parkingLotId,park_parkingSpaceCodingId;
        this.props.parkingLotList.forEach(item => {
          if(item.name == values.park_name) {
            parkingLotId = item.id
          }
        })
        this.state.nfParkingSpaceCodingList.forEach(item => {
          if(item.parkingSpaceCoding == values.park_parkingSpaceCoding) {
            park_parkingSpaceCodingId = item.id
          }
        })
        let userId = this.props.singleResidentList.id
        let zoneId = this.props.id
        let editParkJson = {
          "positionType": positionTypeJson[values.park_positionType],
          "expireDate": positionTypeJson[values.park_expireDate],
          "id": park_parkingSpaceCodingId,
          "userId": userId,
        }
        let modifyJson  = this.state.modifyJson
        modifyJson.id = park_parkingSpaceCodingId
        modifyJson.parkingLotId = parkingLotId
        modifyJson.zoneId = zoneId
        modifyJson.userId = userId
        modifyJson.parkingSpaceCoding = values.park_parkingSpaceCoding
        modifyJson.positionType = values.park_positionType
        modifyJson.expireDate = values.park_expireDate
        modifyJson.name = values.park_name
        this.props.editPark(modifyJson, this.state.index, () => {
          this.setState({
            park_name: 'please',
            park_parkingSpaceCoding: 'please',
            park_positionType: 'please',
            parkingSpaceCodingList: [],
          }, this.props.form.resetFields(validateParkArr))
          this.handleCancel('addParkVisible')
        })
      }
    });
  }

  parkLotChange = (value, cb) => {
    this.setState({
      park_name: value,
    }, this.props.form.setFieldsValue({
      park_name: value,
    }))
    this.getParkingSpaceCodingList({
      park_name: value
    }, () => {
      if(cb) cb()
    })
  }

  getParkingSpaceCodingList= (params, cb) => {
    let _this = this
    const userKey = this.props.userKey
    const PARAMS = {
      userKey: userKey,
      zoneId: this.props.id,
      parkingLotId: this.props.parkingLotJson[params.park_name].id,
    }
    axios.get(WEI_SELECT_PARKING_SPACE, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(data.length > 0) {
              if(cb) cb()
              _this.setState({
                nfParkingSpaceCodingList: data,
                parkingSpaceCodingList: data.filter(item => {
                  return !item.userId
                })
              })
            }
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
            axios.get(CAS_CASCHECK, {
                params: {
                    userKey: userKey
                }
            })
            .then(function (res) {
                if(res.data.msg === "成功" && res.data.success) {
                  toastr.error('网络异常')
                    // Modal.info({
                    //     title: '异常',
                    //     content: "网络异常",
                    //     onOk() {},
                    // });
                } else {
                    utils.toLoginUrl(CAS_LOGIN)
                    localStorage.setItem('userKey', null)
                    localStorage.setItem('id', null)
                }
            })
        }
    }).catch(function (error) {
        utils.toLoginUrl(CAS_LOGIN)
        localStorage.setItem('userKey', null)
        localStorage.setItem('id', null)
    });
  }

  isNotSelect = (rule, value, callback) => {
    if(value) {
      if (value == 'please') {
          callback(rulesTitle[rule.field]);
      }
    }
    callback();
  }

  handleOk = (type) => {
    this.setState({
      [type]: true
    })
  }

  handleCancel = (type) => {
    this.setState({
      [type]: false
    })
  }

  componentWillMount() {
  }

  componentDidMount() {
    
  }
  
  render() {
    let _this = this
    const { getFieldDecorator } = this.props.form;
    const {
      singleParkingLotList,
      parkingLotList,
      plusPark,
      minusPark,
      editPark
    } = this.props
    const {
      addParkVisible,
      parkType,
      parkingSpaceCodingList,
      park_name,
      park_parkingSpaceCoding,
      park_positionType,
      park_expireDate
    } = this.state
    let parkLotOptions, parkingSpaceCodingOptions, positionTypeOptions;
    if (parkingLotList && parkingLotList.length > 0) {
      parkLotOptions = parkingLotList.map((item) => {
        return <Option key={item.name}>{item.name}</Option>;
      });
    } else {
      parkLotOptions = [];
    }
    if (parkingSpaceCodingList && parkingSpaceCodingList.length > 0) {
      parkingSpaceCodingOptions = parkingSpaceCodingList.map((item) => {
        return <Option key={item.parkingSpaceCoding}>{item.parkingSpaceCoding}</Option>;
      });
    } else {
      parkingSpaceCodingOptions = [];
    }
    let positionTypeList = [
      {key: '0', name: '公有'},
      {key: '1', name: '专属'},
      {key: '2', name: '自有'},
      {key: '3', name: '私有'},
      {key: '4', name: '其他'}
    ]
    positionTypeOptions = positionTypeList.map((item) => {
      return <Option key={item.key}>{item.name}</Option>;
    });
    parkLotOptions.unshift(<Option key="please">请选择</Option>)
    parkingSpaceCodingOptions.unshift(<Option key="please">请选择</Option>)
    positionTypeOptions.unshift(<Option key="please">请选择</Option>)

    console.log(singleParkingLotList);
    
    return (
        <div>
            <Row>
              <Col span={24}>
                <Col span={2} className="build-btns">
                  <Button type="primary" onClick={() => {
                    this.setState({
                      parkType: 'add'
                    })
                    this.handleOk('addParkVisible')
                  }}><Icon type="plus" />新增</Button>  
                </Col>
              </Col>
            </Row>
            <Row><div style={{width:'100%',borderBottom: '1px solid #E8E8E8', marginBottom:'10px'}}></div></Row> 
            {singleParkingLotList.map((item, index) => {
              return (
                <div key={index}>{item.userId!=0 ?<Row>
                    <Col span={24}>
                        <Col span={6}>
                            <FormItem 
                                label={'停车场:'}
                                {...formItemLayout1}
                            >
                              <span>{item.name}</span>
                            </FormItem> 
                        </Col>
                        <Col span={6}>
                            <FormItem 
                                label={'车位号:'}
                                {...formItemLayout1}
                            >
                              <span>{item.parkingSpaceCoding}</span>  
                            </FormItem> 
                        </Col>
                        <Col span={6}>
                            <FormItem 
                                label={'车位类型:'}
                                {...formItemLayout1}
                            >
                              <span>{positionTypeJson[item.positionType]}</span>  
                            </FormItem> 
                        </Col>
                        <Col span={1}></Col> 
                        {/* <Col span={2} className="build-btns">
                            <Button onClick={() => {
                              this.setState({
                                parkType: 'edit',
                                park_parkingSpaceCoding: item.parkingSpaceCoding,
                                park_positionType: item.positionType,
                                index: index,
                                modifyJson: item,
                              }, this.parkLotChange(item.name, ()=>{
                                this.props.form.setFieldsValue({
                                  park_parkingSpaceCoding: item.parkingSpaceCoding,
                                  park_positionType: item.positionType,
                                });
                              }))
                              this.handleOk('addParkVisible')
                            }}><Icon type="edit" />修改</Button>  
                        </Col> */}
                        <Col span={2} className="build-btns">
                            <Button type="danger" onClick={
                              () => Modal.confirm({
                                title: '删除',
                                content: '确定要删除此条车位关联信息吗？',
                                okText: '确认',
                                cancelText: '取消',
                                onOk() {
                                  minusPark(index)
                                },
                                onCancel() {},
                              })
                            }><Icon type="minus" />删除</Button>  
                        </Col>
                    </Col> 
                  </Row>:null}
                </div>
              )
            })}
            <Modal
                visible={addParkVisible}
                title="关联车位"
                width="75%"
                onOk={parkType == 'add'?this.add:this.edit}
                onCancel={(type) => {
                  this.setState({
                    park_name: 'please',
                    park_parkingSpaceCoding: 'please',
                    park_positionType: 'please',
                    parkingSpaceCodingList: [],
                  }, this.props.form.resetFields(validateParkArr))
                  this.handleCancel('addParkVisible')
                }}
                footer={[
                  <Button key="back" onClick={(type) => {
                    this.setState({
                      park_name: 'please',
                      park_parkingSpaceCoding: 'please',
                      park_positionType: 'please',
                      parkingSpaceCodingList: [],
                    }, this.props.form.resetFields(validateParkArr))
                    this.handleCancel('addParkVisible')
                  }}>取消</Button>,
                  <Button key="submit" type="primary" onClick={parkType == 'add'?this.add:this.edit}>
                      确定
                  </Button>
                ]}
            >
                  <div>
                    <Row>
                      <Col span={24}>
                          <Col span={6}>
                              <FormItem 
                                  label={'停车场:'}
                                  {...formItemLayout1}
                              >
                                  {getFieldDecorator(`park_name`, {
                                      initialValue: park_name,
                                      rules: [
                                        {required: true, message: '请输入停车场'}, 
                                        {validator: this.isNotSelect}
                                      ],
                                  })(
                                      <Select
                                          showSearch
                                          style={{ width: '100%' }} 
                                          onChange={(value) => this.parkLotChange(value, () => {
                                            this.setState({
                                              park_parkingSpaceCoding: 'please',
                                              park_positionType: 'please'
                                            }, this.props.form.setFieldsValue({
                                              park_parkingSpaceCoding: 'please',
                                              park_positionType: 'please'
                                            }))
                                          })}  
                                        >
                                          {parkLotOptions}
                                      </Select>
                                  )}
                              </FormItem> 
                          </Col>
                          <Col span={6}>
                              <FormItem 
                                  label={'车位号:'}
                                  {...formItemLayout1}
                              >
                                  {getFieldDecorator(`park_parkingSpaceCoding`, {
                                      initialValue: park_parkingSpaceCoding,
                                      rules: [
                                        {required: true, message: '请输入车位号'},
                                        {validator: this.isNotSelect}
                                      ],
                                  })(
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        >
                                        {parkingSpaceCodingOptions}
                                    </Select>
                                  )}
                              </FormItem> 
                          </Col>
                          
                          <Col span={6}>
                              <FormItem 
                                  label={'停车位类型:'}
                                  {...formItemLayout1}
                              >
                                  {getFieldDecorator(`park_positionType`, {
                                      initialValue: park_positionType,
                                      rules: [
                                        {required: true, message: '请输入停车位类型'},
                                        {validator: this.isNotSelect}
                                      ],
                                  })(
                                      <Select
                                          showSearch
                                          style={{ width: '100%' }} >
                                          {positionTypeOptions}
                                      </Select>
                                  )}
                              </FormItem> 
                          </Col>
                      </Col> 

                      <Col span={24}>
                          <Col span={6}>
                              <FormItem 
                                  label={'到期时间:'}
                                  {...formItemLayout1}
                              >
                                  {getFieldDecorator(`park_expireDate`, {
                                  })(
                                    <DatePicker format="YYYY-MM-DD" showToday={false} placeholder="请输入到期时间"/> 
                                  )}
                              </FormItem> 
                          </Col>


                      </Col>
                    </Row> 
                  </div>
                </Modal>
       </div>
    )
  }
}

export default ParkPositionEdit;
