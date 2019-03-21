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

import * as actions from '../actions/LogQueryList'
import '../style/LogQueryList.less'

@connect(
    state => state,
    {...actions}
)

class LogQueryList extends Component {
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
        this.props.getLogList(this.props.LogQueryList.currentParams, page)
    }

    componentDidMount() {
        this.props.getLogApi()
        this.props.getLogList()
    }

    render() {
        let _this = this
        const { getFieldDecorator } = this.props.form;
        const {
            logLoading,
            logApiList,
            logQueryList,
            total,
            current,
            pageSize,
        } = this.props.LogQueryList
        
        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
            }, {
                title: '账户',
                dataIndex: 'username',
            }, {
                title: '名称',
                dataIndex: 'memberName',
            }, {
                title: '操作时间',
                dataIndex: 'createDate',
            }, {
                title: '请求地址',
                dataIndex: 'url',
            }
        ];
        return (
          <div>
            <BreadCrumbCustom first="基本信息管理" second="访客信息管理"/>
            <Row gutter={16}>
                <Col className="gutter-row" md={24}>
                    <div className="gutter-box">
                        <Card title="访客信息管理">
                            <Row>
                                <Col span={24}>
                                    <Col span={6}>
                                        <FormItem 
                                            label={'账户:'}
                                            {...formItemLayout1}
                                        >
                                            {getFieldDecorator(`username`)(
                                                <Input placeholder="请输入账户"/>   
                                            )}
                                        </FormItem> 
                                    </Col>
                                    <Col span={6}>
                                        <FormItem 
                                            label={'名称:'}
                                            {...formItemLayout1}
                                        >
                                            {getFieldDecorator(`memberName`)(
                                                <Input placeholder="请输入名称"/>   
                                            )}
                                        </FormItem> 
                                    </Col>
                                    <Col span={9}>
                                        <FormItem 
                                            label={'出入时间:'}
                                            {...formItemLayout2}
                                        >
                                            {getFieldDecorator(`time`)(
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
                                    
                                    <Col span={18}>
                                        <FormItem 
                                            label={'请求地址:'}
                                            {...formItemLayout3}
                                        >
                                            {getFieldDecorator(`urlList`)(
                                                <Selectrix 
                                                    height={500}
                                                    multiple={true}
                                                    stayOpen={true}
                                                    checkBoxes={true}
                                                    materialize={true}
                                                    options={logApiList}
                                                />
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
                            <Table columns={columns} dataSource={logQueryList} pagination={false}/>
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
export default Form.create()(LogQueryList);