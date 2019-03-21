/* eslint-disable */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createForm} from 'rc-form';
import { Form, Table, Button, Row, Col, Card, Input, Select, Pagination} from 'antd';
import BreadCrumbCustom from '../../../../component/BreadCrumbCustom/BreadCrumbCustom'
const FormItem = Form.Item;
const Option = Select.Option;

import * as actions from '../actions/ServicesManageSearch'
import '../style/ServicesManageSearch.less'
  
const columns = [{
    title: '序号',
    dataIndex: 'num',
  }, {
    title: '设备名称',
    dataIndex: 'servicename',
  }, {
    title: '设备型号',
    dataIndex: 'servicemodel',
  }, {
    title: '设备类型',
    dataIndex: 'deviceName'
  }, {
    title: '设备品牌',
    dataIndex: 'nameBrand'
  }, {
    title: '物理编码',
    dataIndex: 'coding',
  }, {
    title: '所属系统',
    dataIndex: 'label',
    render: (data) => {
        let labelJson = {
            0: "安防系统",
            1: "人车出入管控",
            2: "消防消控",
            3: "给排水",
            4: "供电线路",
            5: "燃气管线",
            6: "电话/电视/互联网",
            7: "其他",
        }
        return <span>{labelJson[data]}</span>
    }
  }, {
    title: '运行状态',
    dataIndex: 'state',
    render: (data) => {
        return <span>{data?"运行中":"离线"}</span>
    }
  }];

@connect(
    state => state,
    {...actions}
)

class ServicesManageSearch extends Component {
    constructor() {
        super()
        this.submit = this.submit.bind(this)
        this.pageOnChange = this.pageOnChange.bind(this)
        this.clear = this.clear.bind(this)
    }

    handleChange = (type) => {
        this.setState({
            [type]: !this.state[type] 
        })
    }

    pageOnChange = (page) => {
        this.props.getServicesList(this.props.ServicesManageSearch.currentParams, page)
    }

    submit = () => {
        let params = {}
        let formData = this.props.form.getFieldsValue()
        params.state = formData.state ? formData.state === 'all' ? undefined :formData.state : undefined
        params.label = formData.label ? formData.label === 'all' ? undefined : formData.label : undefined
        params.deviceName = formData.deviceName ? formData.deviceName : undefined
        params.name = formData.name ? formData.name : undefined
        params.number = formData.number ? formData.number : undefined
        params.nameBrand = formData.nameBrand ? formData.nameBrand : undefined
        params.coding = formData.coding ? formData.coding : undefined
        this.props.getServicesList(params)
    }

    clear() {
        this.props.form.resetFields()
        this.props.getServicesList()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.App.id != this.props.App.id) {
            this.props.form.resetFields()
            this.props.getServicesBrandList()
            this.props.getServicesList()
        }
    }

    componentDidMount() {
        this.props.form.resetFields()
        this.props.getServicesBrandList()
        this.props.getServicesList()
    }

    render() {
        const {
            servicesBrandList,
            servicesList,
            pageSize, 
            total, 
            current
        } = this.props.ServicesManageSearch
        const { getFieldDecorator } = this.props.form;
        const formItemLayout1 = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 12 },
            },
          },
          formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 0 },
              },
              wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
              },
          },
          formItemLayout3 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
              },
              wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
              },
          },
          formItemLayout4 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
              },
              wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
              },
          }
          let servicesBrandOpthions;
          if (servicesBrandList &&  servicesBrandList.length > 0) {
            servicesBrandOpthions = servicesBrandList.map((item) => {
                  return <Option key={item.deviceName}>{item.deviceName}</Option>;
              });
          } else {
            servicesBrandOpthions = [];
          }
          servicesBrandOpthions.unshift(<Option key="all">所有</Option>)
        return (
          <div>
                <BreadCrumbCustom first="基本信息管理" second="设备信息管理-查询"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="设备信状态">
                                <Form
                                    className="ant-advanced-search-form"
                                >
                                    {/* 运行状态 所属系统 设备类型 */}
                                <Row>
                                    <Col span={24}>
                                        <Col span={6}>
                                            <FormItem 
                                                label={'运行状态:'}
                                                {...formItemLayout1}
                                            >
                                                {getFieldDecorator(`state`, {
                                                    initialValue: 'all',
                                                })(
                                                    <Select
                                                        showSearch
                                                        style={{ width: '100%' }} >
                                                        <Option value="all">所有</Option>
                                                        <Option value="1">运行中</Option>
                                                        <Option value="0">离线</Option>
                                                    </Select>
                                                )}
                                            </FormItem> 
                                        </Col>
                                        <Col span={6}>
                                            <FormItem 
                                                label={'所属系统:'}
                                                {...formItemLayout1}
                                            >
                                                {getFieldDecorator(`label`, {
                                                    initialValue: 'all',
                                                })(
                                                    <Select
                                                        showSearch
                                                        style={{ width: '100%' }} >
                                                        <Option value="all">所有</Option>
                                                        <Option value="0">安防系统</Option>
                                                        <Option value="1">人车出入管控</Option>
                                                        <Option value="2">消防消控</Option>
                                                        <Option value="3">给排水</Option>
                                                        <Option value="4">供电线路</Option>
                                                        <Option value="5">燃气管线</Option>
                                                        <Option value="6">电话/电视/互联网</Option>
                                                        <Option value="7">其他</Option>
                                                    </Select>
                                                )}
                                            </FormItem> 
                                        </Col>
                                        <Col span={6}>
                                            <FormItem 
                                                label={'设备类型:'}
                                                {...formItemLayout1}
                                            >
                                                {getFieldDecorator(`deviceName`, {
                                                    initialValue: 'all',
                                                })(
                                                    <Select
                                                        showSearch
                                                        style={{ width: '100%' }}>
                                                        {servicesBrandOpthions}
                                                    </Select>
                                                )}
                                            </FormItem> 
                                        </Col>
                                    </Col> 
                                </Row>
                                 {/* 设备名称 设备型号 */}
                                <Row>
                                    <Col span={24}>
                                        <Col span={6}>
                                            <FormItem 
                                                label={'设备名称:'}
                                                {...formItemLayout1}
                                            >
                                                {getFieldDecorator(`name`, {
                                                    initialValue: '',
                                                })(
                                                    <Input placeholder="请输入设备名称"/>
                                                 )}
                                            </FormItem> 
                                        </Col>
                                        <Col span={6}>
                                            <FormItem 
                                                label={'设备型号:'}
                                                {...formItemLayout1}
                                            >
                                                {getFieldDecorator(`number`, {
                                                    initialValue: '',
                                                })(
                                                    <Input placeholder="请输入设备型号"/>
                                                 )}
                                            </FormItem> 
                                        </Col>
                                        
                                    </Col> 
                                </Row>
                                {/* 设备品牌 物理编码 */}
                                <Row>
                                    <Col span={24}>
                                        <Col span={6}>
                                            <FormItem 
                                                label={'设备品牌:'}
                                                {...formItemLayout1}
                                            >
                                                {getFieldDecorator(`nameBrand`, {
                                                    initialValue: '',
                                                })(
                                                    <Input placeholder="请输入设备品牌"/>
                                                 )}
                                            </FormItem> 
                                        </Col>
                                        <Col span={6}>
                                            <FormItem 
                                                label={'物理编码:'}
                                                {...formItemLayout1}
                                            >
                                                {getFieldDecorator(`coding`, {
                                                    initialValue: '',
                                                })(
                                                    <Input placeholder="请输入物理编码"/>
                                                 )}
                                            </FormItem> 
                                        </Col>
                                        <Col span={1} className="build-btns"></Col>
                                        <Col span={3} className="build-btns">
                                            <Button type="primary" style={{width: 120}} onClick={this.submit}>查询</Button>
                                        </Col>
                                        <Col span={3} className="build-btns">
                                            <Button style={{width: 120}} onClick={this.clear}>清空条件</Button>
                                        </Col>
                                    </Col> 
                                </Row>
                                </Form>
                            </Card>
                        </div>  
                        
                    </Col>
                </Row> 
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card>
                                <Table columns={columns} dataSource={servicesList} pagination={false}/>
                                <div className="pagination">
                                    <Pagination 
                                        current={current}
                                        onChange={this.pageOnChange} 
                                        pageSize={pageSize} 
                                        total={total} />
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
          </div>
        );
    }
}
export default Form.create()(ServicesManageSearch);