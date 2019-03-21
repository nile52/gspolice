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
    DatePicker,
    Modal
} from 'antd';
import Selectrix from "react-selectrix";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import BreadCrumbCustom from '../../../../component/BreadCrumbCustom/BreadCrumbCustom'
import utils from '../../../../util/util.js'
import {
    validateLogArr,
    formItemLayout1,
    formItemLayout2,
    formItemLayout3
} from './LogDatas'
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

import * as actions from '../actions/authManage'
import '../style/authManage.less'

@connect(
    state => state,
    {...actions}
)

class authManage extends Component {
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

    pageOnChange(page) {
        this.props.getLogList(this.props.authManage.currentParams, page)
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
        //     authManage,
        //     total,
        //     current,
        //     pageSize,
        // } = this.props.authManage

        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
        };

        const logLoading = false
        const logApiList = []
        const authManage = []

        const columns = [
            {
                title: '路径',
                dataIndex: 'path',
            }, {
                title: '名称',
                dataIndex: 'username',
            }, {
                title: '状态',
                dataIndex: 'state',                
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <a href="javascript:;">修改</a>
                    <Divider type="vertical" />
                    <a href="javascript:;">删除</a>
                  </span>
                ),
            }
        ];
        return (
          <div>
            <BreadCrumbCustom first="系统信息管理" second="权限管理"/>
            <Row gutter={16}>
                <Col className="gutter-row" md={24}>
                    <div className="gutter-box">
                        <Card title="权限管理">
                            <Button type="primary" style={{width: 120}}>新增权限</Button>
                            <Table columns={columns} dataSource={authManage} pagination={false}/>
                            <div className="pagination">
                                {/* <Pagination 
                                    current={current}
                                    onChange={this.pageOnChange} 
                                    pageSize={pageSize} 
                                    total={total} /> */}
                            </div>
                        </Card>
                    </div>  
                </Col>
            </Row>

            {/* 新增权限 */}
            <Modal
                title="新增权限"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="路径">
                        {getFieldDecorator('path', {
                            rules: [{required: true, message: '请输入路径'}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="名称">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入名称'}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="描述">
                        {getFieldDecorator('path', {
                            rules: [{required: true, message: '请输入描述'}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="状态">
                        {getFieldDecorator('path')(
                          <Select defaultValue="0" style={{ width: 120 }}>
                            <Option value="0">启用</Option>
                            <Option value="1">禁用</Option>
                          </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>            


          </div>
        );
    }
}
export default Form.create()(authManage);