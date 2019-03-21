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

import * as actions from '../actions/roleManage'
import '../style/roleManage.less'

@connect(
    state => state,
    {...actions}
)

class roleManage extends Component {
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
        this.props.getLogList(this.props.roleManage.currentParams, page)
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
        //     roleManage,
        //     total,
        //     current,
        //     pageSize,
        // } = this.props.roleManage

        const logLoading = false
        const logApiList = []
        const roleManage = []

        
        const columns = [
            {
                title: '角色',
                dataIndex: 'num',
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
            <BreadCrumbCustom first="系统信息管理" second="角色管理"/>
            <Row gutter={16}>
                <Col className="gutter-row" md={24}>
                    <div className="gutter-box">
                        <Card title="角色管理">
                            <Button type="primary">新增角色</Button>
                            <Table columns={columns} dataSource={roleManage} pagination={false}/>
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
          </div>
        );
    }
}
export default Form.create()(roleManage);