/* eslint-disable */
import React, { Component } from 'react';
import $ from 'jquery';
import { Button, Form, Row, Col, Input, Select, Icon, Modal, Radio, Switch, DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
import utils from '../../../../util/util.js'
import axios from 'axios'
import {
  WEI_HOUSE,
  CAS_LOGIN,
  CAS_CASCHECK
} from '../../../../fetch/apis'
import {
  validateHouseArr,
  formItemLayout1,
  formItemLayout2,
  relationHouseJson,
  validateAddLiveEnd
} from './residentDatas'
import '../style/Resident.less'

class HouseEdit extends Component {
  constructor(props) {
    super(props)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.buildChange = this.buildChange.bind(this)
    this.unitChange = this.unitChange.bind(this)
    this.layerChange = this.layerChange.bind(this)
    this.getRoomList = this.getRoomList.bind(this)
    this.timeModalHandleOk = this.timeModalHandleOk.bind(this)
    this.showAddTimeModal = this.showAddTimeModal.bind(this)
    this.add = this.add.bind(this)
    this.edit = this.edit.bind(this)
    this.state = {
      addHouseVisible: false,
      timeModalVisible: false,
      unitList: [],
      layerList: [],
      roomList: [],
      house_build: '',
      house_unit: '',
      house_layer: '',
      house_room: '',
      house_relation: '0',
      house_dwell: '1',
      house_consistent: '1',
      housingId: '',
      id: '',
      userId: '',
      modifyJson: null,
      houseType: 'edit',
      singleHouseList: '', 
      startValue: utils.timeToHMS(new Date()), 
      endValue: '', 
      endOpen: '',
      oldLiveEnd: null,
      liveEndChangedIndex: null
    }
  }

  onChangeRelation = (checked,index,name) => {
      if (checked) {
        this.props.editHouseRelation(index, '6', () => {})        
      } else {
        this.props.editHouseRelation(index, '11', () => {})
      }
  }

  add = () => {
    let _this = this
    this.props.form.validateFields(validateHouseArr, (error, values) => {

      console.log(values);
      
      if (!error) {
        // 这里的housingId 是从房屋列表里面拿的 id为0 userId是从房屋关联列表里面拿的
        let houseingId = null;
        this.state.roomList.forEach((item, index) => {
          if(item.room == values.house_room) {
            houseingId = item.id
          }
        })
        let userId = this.props.singleResidentList.id
        let zoneId = this.props.id
        let addHouseJson = {
          "housingId": houseingId,
          "consistent": values.house_consistent == '1' ? true : false,
          "dwell": values.house_dwell == '1' ? true : false,
          "id": 0,
          "userId": userId,
          "delete": false,
          "relation": relationHouseJson[values.house_relation]
        }
        let addJson = {
          id: 0,
          userKey: null,
          limit: 20,
          pages: null,
          fields: null,
          rule: null,
          createDate: null,
          createDateString: null,
          createName: null,
          modifyDate: null,
          modifyDateString: null,
          modifyName: null,
          delete: null,
          fieldLimit: "*",
          zoneId: zoneId,
          userId: userId,
          housingId: houseingId,
          relation: values.house_relation ? values.house_relation : 1,
          consistent: values.house_consistent == '1' ? true : false,
          dwell: values.house_dwell == '1' ? true : false,
          name: values.house_build,
          unit: values.house_unit,
          layer: values.house_layer,
          room: values.house_room,
          liveStart: values.house_liveStart ? values.house_liveStart.format('YYYY-MM-DD HH:mm:ss'): '',
          liveEnd: values.house_liveEnd ? values.house_liveEnd.format('YYYY-MM-DD HH:mm:ss'): '',
          isAdd: true
        }

        this.props.plusHouse(addJson, () => {
          this.setState({
            house_relation: '0',
            house_dwell: '1',
            house_consistent: '1',
          }, this.props.form.resetFields(validateHouseArr))
          this.handleCancel('addHouseVisible')
        })
      }
    });
  }

  delete = () => {
    let _this = this
    this.props.form.validateFields(validateHouseArr, (error, values) => {
      if (!error) {
        // 这里的housingId 是从房屋列表里面拿的 id为0 userId是从房屋关联列表里面拿的
        let houseingId = null;
        this.state.roomList.forEach((item, index) => {
          if(item.room == values.house_room) {
            houseingId = item.id
          }
        })
        let userId = this.props.singleResidentList.id
        let zoneId = this.props.id
        let addHouseJson = {
          "housingId": houseingId,
          "consistent": values.house_consistent == '1' ? true : false,
          "dwell": values.house_dwell == '1' ? true : false,
          "id": 0,
          "userId": userId,
          "delete": false,
          "relation": relationHouseJson[values.house_relation]
        }
        let addJson = {
          id: 0,
          userKey: null,
          limit: 20,
          pages: null,
          fields: null,
          rule: null,
          createDate: null,
          createDateString: null,
          createName: null,
          modifyDate: null,
          modifyDateString: null,
          modifyName: null,
          delete: null,
          fieldLimit: "*",
          zoneId: zoneId,
          userId: userId,
          housingId: houseingId,
          relation: values.house_relation,
          consistent: values.house_consistent == '1' ? true : false,
          dwell: values.house_dwell == '1' ? true : false,
          name: values.house_build,
          unit: values.house_unit,
          layer: values.house_layer,
          room: values.house_room,
          isAdd: true
        }
        this.props.plusHouse(addJson, () => {
          this.setState({
            house_relation: '0',
            house_dwell: '1',
            house_consistent: '1',
          }, this.props.form.resetFields(validateHouseArr))
          this.handleCancel('addHouseVisible')
        })
      }
    });
  }

  edit = () => {
    this.props.form.validateFields(validateHouseArr, (error, values) => {
      if (!error) {
        let editHouseJson = {
          "housingId": this.state.housingId,
          "consistent": values.house_consistent == '1' ? true : false,
          "dwell": values.house_dwell == '1' ? true : false,
          "id": this.state.id,
          "userId": this.state.userId,
          "delete": false,
          "relation": relationHouseJson[values.house_relation]
        }
        let modifyJson = this.state.modifyJson
        modifyJson.name = values.house_build
        modifyJson.unit = values.house_unit
        modifyJson.layer = values.house_layer
        modifyJson.room = values.house_room
        modifyJson.consistent = values.house_consistent == '1'? true : false
        modifyJson.relation = values.house_relation
        modifyJson.dwell = values.house_dwell == '1'? true : false
        this.props.editHouse(modifyJson, this.state.index, () => {
          this.setState({
            house_relation: '0',
            house_dwell: '1',
            house_consistent: '1',
          }, this.props.form.resetFields(validateHouseArr))
          this.handleCancel('addHouseVisible')
        })
      }
    });
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

  showAddTimeModal = (index, time, params) => {
    console.log(index, time)
    this.setState({
      timeModalVisible: true,
      oldLiveEnd: time,
      liveEndChangedIndex: index
    });
  }

  timeModalHandleOk = (key, params) => {
    console.log(key, params);
    this.props.form.validateFields(validateAddLiveEnd, (error, values) => {
      if (!error) {
        var newLiveEnd = values.add_liveEnd.format('YYYY-MM-DD HH:mm:ss')
        this.props.addLiveEnd(key, newLiveEnd)            
      }
    })
    this.setState({
      timeModalVisible: false,
    });
  }

  timeModalHandleCancel = (e) => {
    console.log(e);
    this.setState({
      timeModalVisible: false,
    });
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onTimeChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  buildChange = (value, cb) => {
    let unit = this.props.buildJson[value].unit
    let layer = this.props.buildJson[value].layer
    let newUnitList = [],
        newlayerList = []
    if(unit > 0) {
        for(let i=0; i<unit; i++){
            let num = i
            num++
            newUnitList.push(num)
        }
    }
    if (layer > 0) {
        for(let i=0; i<layer; i++){
            let num = i
            num++
            newlayerList.push(num)
        }
    }
    let newHouse_unit = newUnitList.length>0?newUnitList[0]:''
    let newHouse_layer = newlayerList.length>0?newlayerList[0]:''
    this.props.form.setFieldsValue({
      house_unit: newHouse_unit,
      house_layer: newHouse_layer,
    });
    this.setState({
        unitList: newUnitList,
        layerList: newlayerList,
        house_build: value,
        house_unit: newHouse_unit,
        house_layer: newHouse_layer,
    }, this.getRoomList({
      house_build: value,
      house_unit: newHouse_unit,
      house_layer: newHouse_layer,
    }, () => {
      if(cb) cb()
    }))
    
  }

  unitChange = (value, cb) => {
    this.props.form.setFieldsValue({
      house_unit: value,
    });
    this.setState({
      house_unit: value,
    }, () => {
      this.getRoomList({
        house_build: this.props.form.getFieldsValue().house_build,
        house_unit: value,
        house_layer: this.props.form.getFieldsValue().house_layer
      }, () => {
        if(cb) cb()
      })
    })
    
  }
  layerChange = (value, cb) => {
    this.props.form.setFieldsValue({
      house_layer: value,
    });
    this.setState({
      house_layer: value,
    }, this.getRoomList({
      house_build: this.props.form.getFieldsValue().house_build,
      house_unit: this.props.form.getFieldsValue().house_unit,
      house_layer: value
    }, () => {
      if(cb) cb()
    }))
    
  }
  
  getRoomList = (params, cb) => {
    let _this = this
    const userKey = this.props.userKey
    if(params.house_build && params.house_unit) {
      const PARAMS = {
        userKey: userKey,
        zoneId: this.props.id,
        storiedBuildingId: this.props.buildJson[params.house_build].id,
        unit: params.house_unit,
        layer: params.house_layer
      }
      axios.get(WEI_HOUSE, {
          params: PARAMS
      })
      .then(function (res) {
          if(res.data.msg === "成功" && res.data.success) {
              const data = res.data.obj.data
              let newHouse_room= data.length>0?data[0].room:''
              _this.props.form.setFieldsValue({
                house_room: newHouse_room,
              });
              _this.setState({
                roomList: data,
                house_room: newHouse_room
              }, () => {
                if(cb) cb()
              })
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
  }

  componentWillMount() {
  }

  componentDidMount() {
    // if(this.props.buildList.length>0) {
    //   this.buildChange(this.props.buildList[0].name)
    // }
  }
  
  render() {
    let _this = this
    const { getFieldDecorator } = this.props.form;
    const {
      singleHouseList,
      minusHouse,
      buildList,
      addType
    } = this.props;
    const {
      unitList,
      layerList,
      roomList,
      house_build,
      house_unit,
      house_layer,
      house_room,
      house_relation,
      house_dwell,
      house_consistent,
      houseType,
      startValue, endValue, endOpen,
      oldLiveEnd,
      liveEndChangedIndex,
    } = this.state

    console.log(liveEndChangedIndex);
    

    const {addHouseVisible} = this.state
    let buildOptions,unitOptions,layerOptions,roomOptions;
    if (buildList &&  buildList.length > 0) {
        buildOptions = buildList.map((item) => {
          let newName = ''
          let newNameArr = item.name.split('-')
          let newNameArrLength = newNameArr.length
          if( newNameArrLength > 1) {
              newName = newNameArr[newNameArrLength -1]
          } else {
              newName = item.name
          }
          return <Option key={item.name}>{newName}</Option>;
        });
    } else {
        buildOptions = [];
    }
    if (unitList &&  unitList.length > 0) {
        unitOptions = unitList.map((item) => {
            return <Option key={item}>{item}</Option>;
        });
    } else {
        unitOptions = [];
    }
    if (layerList && layerList.length > 0) {
        layerOptions = layerList.map((item) => {
          return <Option key={item}>{item}</Option>;
        });
    } else {
        layerOptions = [];
    }
    if (roomList && roomList.length > 0) {
      roomOptions = roomList.map((item) => {
        let newRoom = ''
        if(item) {
          let newRoomArr = (item.room+'').split('-')
          let newRoomArrLength = newRoomArr.length
          if( newRoomArrLength > 1) {
            newRoom = newRoomArr[newRoomArrLength -1]
          } else {
            newRoom = item.room
          }
        }
        return <Option key={item.room}>{newRoom}</Option>;
      });
    } else {
      roomOptions = [];
    }
    const consistentOptions = [
      { label: '是', value: '1' },
      { label: '否', value: '0' },
    ]
    const dwellOptions = [
      { label: '是', value: '1' },
      { label: '否', value: '0' },
    ]
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    return (
        <div>
            <Row>
              <Col span={24}>
                {/* <Col span={2} className="build-btns"></Col> */}
                <Col span={2} className="build-btns">
                  <Button type="primary" onClick={(type) => {
                    this.buildChange(this.props.buildList[0].name, () => {})
                    this.setState({
                      houseType: 'add'
                    })
                    this.handleOk('addHouseVisible')
                  }}><Icon type="plus" />新增</Button>  
                </Col>
              </Col>
            </Row>
            <Row><div style={{width:'100%',borderBottom: '1px solid #E8E8E8', marginBottom:'10px'}}></div></Row> 
            {singleHouseList.map((item, index) => {
              let newName = ''
              let newNameArr = item.name.split('-')
              let newNameArrLength = newNameArr.length
              if( newNameArrLength > 1) {
                newName = newNameArr[newNameArrLength -1]
              } else {
                newName = item.name
              }
              let newRoom = ''
              if(item.room) {
                let newRoomArr = (item.room+'').split('-')
                let newRoomArrLength = newRoomArr.length
                if( newRoomArrLength > 1) {
                    newRoom = newRoomArr[newRoomArrLength -1]
                } else {
                    newRoom = item.room
                }
              }
              return (
                <div key={index}>{item.delete? null :<Row>
                    <Col span={24}>
                        <Col span={9}>
                            <FormItem 
                                label={'房屋位置:'}
                                {...formItemLayout1}
                            >
                              <span>{newName + item.unit + '单元' + item.layer + '层' + newRoom + '室'}</span>
                            </FormItem> 
                        </Col>

                        {addType=='normal' ?  
                          <Col span={6}>
                              <FormItem 
                                  label={'与房主关系:'}
                                  {...formItemLayout1}
                              >
                                <span>{relationHouseJson[item.relation]}</span>  
                              </FormItem> 
                          </Col>
                        :
                          <Col span={6}>
                              <FormItem 
                                  {...formItemLayout2}
                              >
                                <span>{item.liveStart}</span> - <span>{item.liveEnd}</span>
                              </FormItem> 
                          </Col>
                        }

                        <Col span={1}></Col> 
                        {/* <Col span={2} className="build-btns">
                            <Button onClick={() => {
                              this.buildChange(item.name, () => {
                                this.unitChange(item.unit, () => {
                                  this.layerChange(item.layer)
                                })
                              })
                              this.setState({
                                housingId: item.housingId,
                                id: item.id,
                                userId: item.id,
                                index: index,
                                house_room: item.room,
                                house_relation: item.relation,
                                house_dwell: item.dwell?"1":'0',
                                house_consistent: item.consistent?'1':'0',
                                modifyJson: item,
                                houseType: 'edit'
                              })
                              this.handleOk('addHouseVisible')
                            }}><Icon type="edit" />修改</Button>  
                        </Col> */}
                        <Col span={3} className="build-btns">
                            <Button type="danger" onClick={
                              () => Modal.confirm({
                                title: '删除',
                                content: '确定要删除此条房屋关联信息吗？',
                                okText: '确认',
                                cancelText: '取消',
                                onOk() {
                                  minusHouse(index)
                                  
                                },
                                onCancel() {},
                              })
                            }><Icon type="minus" />删除</Button>  
                        </Col>
                        
                        {item.relation == 6||11 ? 
                          <Col span={2} className="build-btns">
                            <Switch checkedChildren="续租" key={index} defaultChecked={item.relation == 6 ? true : false}   unCheckedChildren="退租" onChange={(value) => {this.onChangeRelation(value, index, 'tui')}} />
                          </Col>
                        : ''}

                        {addType=='net' ?  
                          <Col span={3} className="build-btns">
                            <Button onClick={this.showAddTimeModal.bind(this, index, item.liveEnd)}><Icon type="plus"/>续约</Button>  
                        </Col>
                        : '' }
                        
                    </Col> 
                  </Row>}
                </div>
              )
            })}
            <Modal
                visible={addHouseVisible}
                title="关联房屋"
                width="75%"
                onOk={houseType == 'add'?this.add:this.edit}
                onCancel={(type) => {
                  this.setState({
                    house_relation: '0',
                    house_dwell: '1',
                    house_consistent: '1',
                  }, this.props.form.resetFields(validateHouseArr))
                  this.handleCancel('addHouseVisible')
                }}
                footer={[
                  <Button key="back" onClick={(type) => {
                    this.setState({
                      house_relation: '0',
                      house_dwell: '1',
                      house_consistent: '1',
                    }, this.props.form.resetFields(validateHouseArr))
                    this.handleCancel('addHouseVisible')
                  }}>取消</Button>,
                  <Button key="submit" type="primary" onClick={houseType == 'add'?this.add:this.edit}>
                      确定
                  </Button>
                ]}
            >
                  <div>
                    <Row>
                          <Col span={24}>
                              <Col span={6}>
                                  <FormItem 
                                      label={'所在位置:'}
                                      {...formItemLayout1}
                                  >
                                      {getFieldDecorator(`house_build`, {
                                          initialValue: house_build,
                                          rules: [{
                                            required: true, message: '请输入楼幢',
                                          }],
                                      })(
                                          <Select
                                              showSearch
                                              style={{ width: '100%' }} 
                                              onChange={(value) => this.buildChange(value, ()=>{})}>
                                              {buildOptions}
                                          </Select>
                                      )}
                                  </FormItem> 
                              </Col>
                              <Col span={1} className="build-btns">
                                  <span className="house-unit">幢</span>
                              </Col>
                              <Col span={3}>
                                  <FormItem 
                                      {...formItemLayout2}
                                  >
                                      {getFieldDecorator(`house_unit`, {
                                          initialValue: house_unit,
                                          rules: [{
                                            required: true, message: '请输入单元',
                                          }],
                                      })(
                                          <Select
                                              showSearch
                                              style={{ width: '100%' }} 
                                              onChange={(value) => this.unitChange(value, ()=>{})}>
                                              {unitOptions}
                                          </Select>
                                      )}
                                  </FormItem> 
                              </Col>
                              
                              <Col span={1} className="build-btns">
                                  <span className="house-unit">单元</span>
                              </Col>
                              <Col span={3}>
                                  <FormItem 
                                      {...formItemLayout2}
                                  >
                                      {getFieldDecorator(`house_layer`, {
                                          initialValue: house_layer,
                                          rules: [{
                                            required: true, message: '请输入层',
                                          }],
                                      })(
                                          <Select
                                              showSearch
                                              style={{ width: '100%' }} 
                                              onChange={(value) => this.layerChange(value, ()=>{})}>
                                              {layerOptions}
                                          </Select>
                                      )}
                                  </FormItem> 
                              </Col>
                              <Col span={1} className="build-btns">
                                  <span className="house-unit">层</span>
                              </Col>
                              <Col span={3}>
                                  <FormItem 
                                      {...formItemLayout2}
                                  >
                                      {getFieldDecorator(`house_room`, {
                                          initialValue: house_room,
                                          rules: [{
                                            required: true, message: '请输入室',
                                          }],
                                      })(
                                          <Select
                                              showSearch
                                              style={{ width: '100%' }}>
                                              {roomOptions}
                                          </Select>
                                      )}
                                  </FormItem> 
                              </Col>
                              <Col span={1} className="build-btns">
                                  <span className="house-unit">室</span>
                              </Col>
                          </Col> 
                      </Row>
                    {addType=='normal' ?                   
                      <Row>
                          <Col span={24}>
                            <Col span={6}>
                              <FormItem 
                                  label={'与房主关系:'}
                                  {...formItemLayout1}
                              >
                                  {getFieldDecorator(`house_relation`, {
                                    initialValue: house_relation,
                                  })(
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }} >
                                        <Option key="0">本人</Option>
                                        <Option key="6">租客</Option>
                                        <Option key="1">配偶</Option>
                                        <Option key="2">子女</Option>
                                        <Option key="3">孙子女</Option>
                                        <Option key="4">父母</Option>
                                        <Option key="5">祖父母</Option>
                                        <Option key="7">其他亲属</Option>
                                        <Option key="8">朋友</Option>
                                        <Option key="9">其他</Option>
                                        <Option key="10">二房东</Option>
                                        <Option key="11">退租</Option>
                                    </Select>  
                                  )}
                              </FormItem> 
                          </Col>
                          <Col span={6}>
                              <FormItem 
                                label={'人户一致:'}
                                {...formItemLayout1}
                              >
                                {getFieldDecorator(`house_consistent`, {
                                      initialValue: house_consistent,
                                })(
                                    <RadioGroup options={consistentOptions}  />
                                )}
                              </FormItem> 
                          </Col> 
                          <Col span={6}>
                              <FormItem 
                                label={'是否居住:'}
                                {...formItemLayout1}
                              >
                                {getFieldDecorator(`house_dwell`, {
                                      initialValue: house_dwell,
                                })(
                                    <RadioGroup options={dwellOptions}  />
                                )}
                              </FormItem> 
                          </Col>     
                        </Col>
                      </Row>
                    :
                      <Row>

                          <Col span={24} style={{display: 'none'}}>
                            <Col span={6}>
                              <FormItem 
                                  label={'与房主关系:'}
                                  {...formItemLayout1}
                              >
                                  {getFieldDecorator(`house_relation`, {
                                    initialValue: '1000',
                                  })(
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }} >
                                        <Option Selected key="1000">网约房租客</Option>
                                        
                                    </Select>  
                                  )}
                              </FormItem> 
                            </Col>  
                          </Col>
                          <Col span={24}>
                            <Col span={9}>
                              <FormItem 
                                  label={'入住时间:'}
                                  {...formItemLayout1}
                              >
                                  {getFieldDecorator(`house_liveStart`,{
                                          initialValue: moment(new Date(), dateFormat),
                                          rules: [{
                                              required: true, message: '请输入入住时间',
                                          }],
                                  })(
                                      <DatePicker
                                        disabledDate={this.disabledStartDate}
                                        showTime
                                        format={dateFormat}
                                        value={startValue}
                                        placeholder="入住时间"
                                        onTimeChange={this.onStartChange}
                                        onOpenChange={this.handleStartOpenChange}
                                        showToday={false} 
                                        locale={locale}
                                      /> 
                                  )}
                              </FormItem> 
                          </Col>
                          <Col span={9}>
                              <FormItem 
                                  label={'退房时间:'}
                                  {...formItemLayout1}
                              >
                                  {getFieldDecorator(`house_liveEnd`,{
                                          // initialValue: liveEnd?moment(utils.timeToDate(liveEnd), dateFormat):'',
                                          rules: [{
                                              required: true, message: '请输入退房时间',
                                          }],
                                  })(
                                      <DatePicker
                                        disabledDate={this.disabledEndDate}
                                        showTime
                                        format={dateFormat} 
                                        value={endValue}
                                        showToday={false} 
                                        placeholder="退房时间"
                                        onTimeChange={this.onEndChange}
                                        open={endOpen}
                                        onOpenChange={this.handleEndOpenChange}
                                        locale={locale}
                                      /> 
                                  )}
                              </FormItem> 
                          </Col> 
        
                        </Col>
                      </Row>
                    } 
                   </div>
            </Modal>

            <Modal
              title="续约"
              visible={this.state.timeModalVisible}
              onOk={this.timeModalHandleOk.bind(this, liveEndChangedIndex)}
              onCancel={this.timeModalHandleCancel}
            >
              {getFieldDecorator(`add_liveEnd`,{
                      initialValue: moment(oldLiveEnd, dateFormat),
                      rules: [{
                          required: true, message: '请输入续约时间',
                      }],
              })(
                <DatePicker
                  showTime
                  locale={locale}
                  format={dateFormat} 
                  showToday={false} 
                  placeholder="续约时间"
                /> 
              )}

            </Modal>



       </div>
    )
  }
}

export default HouseEdit;
