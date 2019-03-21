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
    DatePicker 
} from 'antd';
import Selectrix from "react-selectrix";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import BreadCrumbCustom from '../../../../component/BreadCrumbCustom/BreadCrumbCustom'
import utils from '../../../../util/util'
import {
    validateLogArr,
    formItemLayout1,
    formItemLayout2,
    formItemLayout3
} from './LogDatas'
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

import * as actions from '../actions/accountManage'
import '../style/accountManage.less'

@connect(
    state => state,
    {...actions}
)

class accountManage extends Component {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.pageOnChange = this.pageOnChange.bind(this)
        this.clear = this.clear.bind(this)
        this.state = {
        }
    }

    submit = () => {
        let params = {}
        let formData = this.props.form.getFieldsValue()
        params.username = formData.username?formData.username == ''?undefined:formData.username:undefined
        params.memberName = formData.memberName?formData.memberName == ''?undefined:formData.memberName:undefined
        params.createDateStart = formData.time?formData.time[0] ? formData.time[0].format('YYYY/MM/DD HH:mm:ss') : undefined: undefined
        params.createDateEnd = formData.time?formData.time[1] ? formData.time[1].format('YYYY/MM/DD HH:mm:ss') : undefined: undefined
        let newUrlList = []
        if(formData.urlList && formData.urlList.length > 0) {
            formData.urlList.forEach((item) => {
                newUrlList.push(item.key)
            })
        } else {
            newUrlList = undefined
        }
        params.urlList = JSON.stringify(newUrlList)
        console.log(params)
        this.props.getLogList(params)
    }

    clear() {
        this.props.form.resetFields()
    }

    handleChange() {
        console.log('aaaa')
    }

    pageOnChange(page) {
        this.props.getLogList(this.props.accountManage.currentParams, page)
    }

    componentDidMount() {
        // this.props.getLogApi()
        // this.props.getLogList()
    }

    render() {
        let _this = this
        const { getFieldDecorator } = this.props.form;
        // const {
        //     logLoading,
        //     logApiList,
        //     accountManage,
        //     total,
        //     current,
        //     pageSize,
        // } = this.props.accountManage

        const logApiList = [];
        const logLoading = false
        const accountManage = []
        
        const columns = [
            {
                title: '账号名称',
                dataIndex: 'num',
            }, {
                title: '所属',
                dataIndex: 'username',
            }, {
                title: '角色',
                dataIndex: 'memberName',
            }, {
                title: '状态',
                dataIndex: 'url',
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <a href="javascript:;">修改</a>
                    <Divider type="vertical" />
                    <a href="javascript:;">禁用</a>
                  </span>
                ),
            }
            
        ];
        return (
          <div>
            <BreadCrumbCustom first="系统信息管理" second="账号信息管理"/>
            <Row gutter={16}>
                <Col className="gutter-row" md={24}>
                    <div className="gutter-box">
                        <Card title="账号信息管理">
                            <Row>
                                <Col span={24}>
                                    <Col span={6}>
                                        <FormItem 
                                            label={'账号名称:'}
                                            {...formItemLayout1}
                                        >
                                            {getFieldDecorator(`username`)(
                                                <Input placeholder="请输入账号名称"/>   
                                            )}
                                        </FormItem> 
                                    </Col>
                                    <Col span={6}>
                                        <FormItem 
                                            label={'角色:'}
                                            {...formItemLayout1}
                                        >
                                            {getFieldDecorator(`memberName`)(
                                                <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                                                    <Option value="jack">角色1</Option>
                                                    <Option value="lucy">角色2</Option>
                                                    <Option value="Yiminghe">角色3</Option>
                                                </Select>
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
                        <Card>
                            <Table columns={columns} dataSource={accountManage} pagination={false} locale={{emptyText: '暂无数据' }}/>
                            {/* <div className="pagination">
                                <Pagination 
                                    current={current}
                                    onChange={this.pageOnChange} 
                                    pageSize={pageSize} 
                                    total={total} />
                            </div> */}
                        </Card>
                    </div>
                </Col>
            </Row>
          </div>
        );
    }
}
export default Form.create()(accountManage);