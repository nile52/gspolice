/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import { 
    Form, 
    Table, 
    Button, 
    Row, 
    Col, 
    Card, 
    Input, 
    Select, 
    Pagination, 
    Modal, 
    Spin,
    DatePicker 
} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import BreadCrumbCustom from '../../../../component/BreadCrumbCustom/BreadCrumbCustom'
import axios from 'axios'
import {
    WEI_HOUSE,
    CAS_LOGIN,
    CAS_CASCHECK
} from '../../../../fetch/apis'
import utils from '../../../../util/util'
import {
    validateVisitorArr,
    formItemLayout1,
    formItemLayout2,
    formItemLayout3
} from './VisitorDatas'
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

import * as actions from '../actions/VisitorManage'
import '../style/VisitorManage.less'

@connect(
    state => state,
    {...actions}
)

class VisitorManage extends Component {
    constructor(props) {
        super(props)
        this.buildChange = this.buildChange.bind(this)
        this.unitChange = this.unitChange.bind(this)
        this.layerChange = this.layerChange.bind(this)
        this.getRoomList = this.getRoomList.bind(this)
        this.submit = this.submit.bind(this)
        this.pageOnChange = this.pageOnChange.bind(this)
        this.clear = this.clear.bind(this)
        this.state = {
        }
    }

    getRoomList = (params) => {
        let _this = this
        const userKey = this.props.VisitorManage.userKey
        if(params.build && params.unit) {
          const PARAMS = {
            userKey: userKey,
            zoneId: this.props.VisitorManage.id,
            storiedBuildingId: this.props.VisitorManage.buildJson[params.build].id,
            unit: params.unit,
            layer: params.layer
          }
          axios.get(WEI_HOUSE, {
              params: PARAMS
          })
          .then(function (res) {
              if(res.data.msg === "成功" && res.data.success) {
                  const data = res.data.obj.data
                  let newRoom= 'all'
                  _this.props.form.setFieldsValue({
                    form_room: newRoom,
                  });
                  _this.props.changev({
                    roomList: data,
                  })
              } else if(res.data.msg === "微服务异常" && !res.data.success) {
                  axios.get(CAS_CASCHECK, {
                      params: {
                          userKey: userKey
                      }
                  })
                  .then(function (res) {
                      if(res.data.msg === "成功" && res.data.success) {
                        //   Modal.info({
                        //       title: '异常',
                        //       content: "网络异常",
                        //       onOk() {},
                        //   });
                      } else {
                          utils.toLoginUrl(CAS_LOGIN)
                          localStorage.setItem('userKey', null)
                          localStorage.setItem('id', null)
                      }
                  })
              }
          }).catch(function (error) {
              console.log(error)
              utils.toLoginUrl(CAS_LOGIN)
              localStorage.setItem('userKey', null)
              localStorage.setItem('id', null)
          });
        }
    }

    buildChange = (value) => {
        if(value == 'all') {
            this.props.form.setFieldsValue({
                form_unit: 'all',
                form_layer: 'all',
                form_room: 'all'
            });
            this.props.changev({
                unitList: [],
                layerList: [],
                roomList: []
            })
            return;
        }
        // a
        let unit = this.props.VisitorManage.buildJson[value].unit
        let layer = this.props.VisitorManage.buildJson[value].layer
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
        this.props.changev({
            unitList: newUnitList,
            layerList: newlayerList
        })
        this.props.form.setFieldsValue({
            form_unit: 'all',
            form_layer: 'all'
        });
    }

    unitChange = (value) => {
        this.props.form.setFieldsValue({
            form_unit: value,
            form_layer: 'all',
            form_room: 'all'
        });
        this.getRoomList({
            build: this.props.form.getFieldsValue().form_build,
            unit: value === 'all'?undefined:value
        })
    }

    layerChange = (value) => {
        this.props.form.setFieldsValue({
            form_layer: value,
        });
        this.getRoomList({
            build: this.props.form.getFieldsValue().form_build,
            unit: this.props.form.getFieldsValue().form_unit,
            layer: value === 'all'?undefined:value
        })
    }

    submit = () => {
        let params = {}
        let formData = this.props.form.getFieldsValue()
        params.storiedBuildingId = formData.form_build ? formData.form_build === 'all' ? undefined :this.props.VisitorManage.buildJson[formData.form_build].id : undefined
        params.unit = formData.form_unit ? formData.form_unit === 'all' ? undefined : formData.form_unit : undefined
        params.layer = formData.form_layer ? formData.form_layer === 'all' ? undefined : formData.form_layer : undefined
        params.room = formData.form_room ?  formData.form_room === 'all' ? undefined : formData.form_room : undefined
        params.name = formData.form_name ? formData.form_name : undefined 
        params.idCard = formData.form_idCard ? formData.form_idCard : undefined 
        params.mobile = formData.form_mobile ? formData.form_mobile : undefined
        params.gender = formData.form_gender ? formData.form_gender === 'all' ? undefined : formData.form_gender : undefined
        params.createDateStart = formData.form_time?formData.form_time[0] ? formData.form_time[0].format('YYYY/MM/DD HH:mm:ss') : undefined: undefined
        params.createDateEnd = formData.form_time?formData.form_time[1] ? formData.form_time[1].format('YYYY/MM/DD HH:mm:ss') : undefined: undefined
        params.licensNumber = formData.form_licensNumber ? formData.form_licensNumber : undefined
        this.props.getVisitorList(params)
    }

    clear() {
        this.props.form.resetFields()
        this.props.getVisitorList()
    }

    pageOnChange(page) {
        this.props.getVisitorList(this.props.VisitorManage.currentParams, page)
    }

    componentDidMount() {
        this.props.form.resetFields()
        this.props.getBuildList()
        this.props.getVisitorList()
    }

    render() {
        let _this = this
        const { getFieldDecorator } = this.props.form;
        const {
        } = this.props.VisitorManage
        const {
            buildList,
            unitList,
            layerList,
            roomList,
            visitorList,
            visitorLoading,
            total,
            current,
            pageSize,
        } = this.props.VisitorManage
        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
            }, {
                title: '拜访目标',
                dataIndex: 'visitoredName',
            }, {
                title: '来访人',
                dataIndex: 'visitorName',
            }, {
                title: '身份证号',
                dataIndex: 'idCard',
            }, {
                title: '年龄',
                dataIndex: 'years',
            }, {
                title: '性别',
                dataIndex: 'gender',
            }, {
                title: '手机号码',
                dataIndex: 'mobile',
            }, {
                title: '籍贯',
                dataIndex: 'racial',
            }
        ];
        let buildOptions;
        let unitOptions;
        let layerOptions;
        let roomOptions;
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
        if (this.props.form.getFieldsValue().build !== 'all' && unitList &&  unitList.length > 0) {
            unitOptions = unitList.map((item) => {
                return <Option key={item}>{item}</Option>;
            });
        } else {
            unitOptions = [];
        }
        if (this.props.form.getFieldsValue().unit !== 'all' && layerList && layerList.length > 0) {
            layerOptions = layerList.map((item) => {
                return <Option key={item}>{item}</Option>;
            });
        } else {
            layerOptions = [];
        }
        if (this.props.form.getFieldsValue().unit !== 'all' && roomList && roomList.length > 0) {
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
        buildOptions.unshift(<Option key="all">所有</Option>)
        unitOptions.unshift(<Option key="all">所有</Option>)
        layerOptions.unshift(<Option key="all">所有</Option>)
        roomOptions.unshift(<Option key="all">所有</Option>)
        return (
          <div>
            <BreadCrumbCustom first="基本信息管理" second="访客信息管理"/>
            <Row gutter={16}>
                <Col className="gutter-row" md={24}>
                    <div className="gutter-box">
                        <Card title="访客信息管理">
                            {/* 所在位置 和 房间号 */}
                            <Row>
                                <Col span={24}>
                                    <Col span={6}>
                                        <FormItem 
                                            label={'所在位置:'}
                                            {...formItemLayout1}
                                        >
                                            {getFieldDecorator(`form_build`, {
                                                initialValue: 'all',
                                            })(
                                                <Select
                                                    showSearch
                                                    style={{ width: '100%' }} 
                                                    onChange={this.buildChange}>
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
                                            {getFieldDecorator(`form_unit`, {
                                                initialValue: 'all',
                                            })(
                                                <Select
                                                    showSearch
                                                    style={{ width: '100%' }} 
                                                    onChange={this.unitChange}
                                                >
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
                                            {getFieldDecorator(`form_layer`, {
                                                initialValue: 'all',
                                            })(
                                                <Select
                                                    showSearch
                                                    style={{ width: '100%' }}
                                                    onChange={this.layerChange}
                                                >
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
                                            {getFieldDecorator(`form_room`, {
                                                initialValue: 'all',
                                            })(
                                                <Select
                                                    showSearch
                                                    style={{ width: '100%' }}
                                                >
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
                            <Row>
                                <Col span={24}>
                                    <Col span={6}>
                                        <FormItem 
                                            label={'拜访者姓名:'}
                                            {...formItemLayout1}
                                        >
                                            {getFieldDecorator(`form_name`)(
                                                <Input placeholder="请输入拜访者姓名"/>   
                                            )}
                                        </FormItem> 
                                    </Col>
                                    <Col span={6}>
                                        <FormItem 
                                            label={'性别:'}
                                            {...formItemLayout3}
                                        >
                                            {getFieldDecorator(`form_gender`, {
                                                initialValue: 'all',
                                            })(
                                                <Select
                                                    showSearch
                                                    style={{ width: '100%' }} >
                                                    <Option key="all">所有</Option>
                                                    <Option key="male">男</Option>
                                                    <Option key="female">女</Option>
                                                </Select>
                                            )}
                                        </FormItem> 
                                    </Col>
                                    <Col span={6}>
                                        <FormItem 
                                            label={'出入时间:'}
                                            {...formItemLayout3}
                                        >
                                            {getFieldDecorator(`form_time`)(
                                                <RangePicker
                                                    showTime={{
                                                        hideDisabledOptions: true,
                                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                                                    }}
                                                    format="YYYY-MM-DD HH:mm:ss"
                                                    placeholder={["开始时间", "结束时间"]}
                                                />
                                            )}
                                        </FormItem> 
                                    </Col>
                                </Col> 
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Col span={6}>
                                        <FormItem 
                                            label={'车牌号:'}
                                            {...formItemLayout1}
                                        >
                                            {getFieldDecorator(`form_licensNumber`)(
                                                <Input placeholder="请输入拜访者车牌号"/>   
                                            )}
                                        </FormItem> 
                                    </Col>
                                    <Col span={6}>
                                        <FormItem 
                                            label={'身份证号:'}
                                            {...formItemLayout3}
                                        >
                                            {getFieldDecorator(`form_idCard`)(
                                                <Input placeholder="请输入拜访者身份证号"/>   
                                            )}
                                        </FormItem> 
                                    </Col>
                                    <Col span={6}>
                                        <FormItem 
                                            label={'手机号:'}
                                            {...formItemLayout3}
                                        >
                                            {getFieldDecorator(`form_mobile`)(
                                                <Input placeholder="请输入拜访者手机号"/>   
                                            )}
                                        </FormItem> 
                                    </Col>
                                </Col> 
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Col span={3} className="build-btns"></Col>
                                    <Col span={3} className="build-btns">
                                        <Button type="primary" style={{width: 120}} onClick={this.submit}>查询</Button>
                                    </Col>
                                    <Col span={3} className="build-btns">
                                        <Button style={{width: 120}} onClick={this.clear}>清空条件</Button>
                                    </Col>
                                </Col> 
                            </Row>
                        </Card>
                    </div>  
                </Col>
            </Row> 
            <Row gutter={16}>
                <Col className="gutter-row" md={24}>
                    <div className="gutter-box">
                        <Spin spinning={visitorLoading}>
                            <Card>
                                <Table columns={columns} dataSource={visitorList} pagination={false}/>
                                <div className="pagination">
                                    <Pagination 
                                        current={current}
                                        onChange={this.pageOnChange} 
                                        pageSize={pageSize} 
                                        total={total} />
                                </div>
                            </Card>
                        </Spin>
                    </div>
                </Col>
            </Row>
          </div>
        );
    }
}
export default Form.create()(VisitorManage);