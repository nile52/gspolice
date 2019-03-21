/* eslint-disable */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createForm} from 'rc-form';
import { Form, Table, Button, Row, Col, Card, Input, Select, Pagination, Modal } from 'antd';
import BreadCrumbCustom from '../../../../component/BreadCrumbCustom/BreadCrumbCustom'
const FormItem = Form.Item;
const Option = Select.Option;
import * as actions from '../actions/BuildingArea'
import '../style/BuildingArea.less'
import * as toastr from 'toastr';
import '../../../../static/css/toastr.min.css';
  
const columns = [{
    title: '序号',
    dataIndex: 'num',
  }, {
    title: '楼幢名称',
    dataIndex: 'name',
    render: (data) => {
        let newName = ''
        let newNameArr = data.split('-')
        let newNameArrLength = newNameArr.length
        if( newNameArrLength > 1) {
            newName = newNameArr[newNameArrLength -1]
        } else {
            newName = data
        }
        return newName
    }
  }, {
    title: '楼层数量',
    dataIndex: 'layer',
  }, {
    title: '包含单元',
    dataIndex: 'unit',
  }];
const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        num: i,
        communityname: `communityname ${i}`,
        aboutcommunityname: `aboutcommunityname ${i}`,
        buildname: 32,
        floornum: `floornum ${i}`,
        units: `units ${i}`,
    });
}

@connect(
    state => state,
    {...actions}
)

class BuildingArea extends Component {
    state = {
        addVisible: false,
        modifyVisible: false,
    };

    handleChange = (type) => {
        this.setState({
            [type]: !this.state[type] 
        })
    }

    pageOnChange = (page) => {
        this.props.getBuildList(page)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.App.id != this.props.App.id) {
            this.props.getBuildList()
        }
    }

    componentDidMount() {
        this.props.getBuildList()
    }

    render() {
        const {
            buildList, 
            pageSize, 
            total, 
            current
        } = this.props.BuildingArea
        const { getFieldDecorator } = this.props.form;
        const { addVisible, modifyVisible } = this.state
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 5 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 17 },
            },
          };
        return (
          <div>
                <BreadCrumbCustom first="基本信息管理" second="楼栋/单元/区域管理"/>
                {/* <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="楼栋/单元/区域管理">
                                <Form
                                    className="ant-advanced-search-form"
                                >
                                    <Row>
                                        <Col span={3} >
                                            <Button type="primary" onClick={(type) => this.handleChange('addVisible')}>新增</Button>
                                        </Col>
                                        <Col span={3} >
                                            <Button type="primary" onClick={(type) => this.handleChange('modifyVisible')}>修改</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </div>  
                        
                    </Col>
                </Row>  */}
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="当前已有楼幢列表">
                                <Table
                                    columns={columns} 
                                    dataSource={buildList} 
                                    pagination={false}
                                />
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
                <Modal
                    width={800}
                    title="新增"
                    visible={addVisible}
                    onOk={(type) => this.handleChange('addVisible')}
                    onCancel={(type) => this.handleChange('addVisible')}
                    >
                    <iframe src="https://www.baidu.com" frameborder="0" className="add-view"></iframe>
                </Modal>
                <Modal
                    title="修改"
                    visible={modifyVisible}
                    onOk={(type) => this.handleChange('modifyVisible')}
                    onCancel={(type) => this.handleChange('modifyVisible')}
                    >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
          </div>
        );
    }
}
export default Form.create()(BuildingArea);


    {/* <Row><Col span={12} key={'build'} >
    <Col span={12}>
        <FormItem 
            label={`楼幢`}
            {...formItemLayout}
        >
            {getFieldDecorator(`build`)(
                <Select
                    placeholder="请选择"
                    onChange={this.handleChange}
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
            )}
        </FormItem> 
    </Col>
    <Col span={4} className="build-btns">
        <Button>新增</Button>
    </Col>
    <Col span={4}  className="build-btns">
        <Button>修改</Button>
    </Col>
    <Col span={4}  className="build-btns">
        <Button>删除</Button>
    </Col>

    </Col> 
    <Col span={12} key={'unit'} >
    <Col span={12}>
        <FormItem 
            label={`单元`}
            {...formItemLayout}
        >
            {getFieldDecorator(`unit`)(
                <Select
                    placeholder="请选择"
                    onChange={this.handleChange}
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
            )}
        </FormItem> 
    </Col>
    <Col span={4} className="build-btns">
        <Button>新增</Button>
    </Col>
    <Col span={4}  className="build-btns">
        <Button>修改</Button>
    </Col>
    <Col span={4}  className="build-btns">
        <Button>删除</Button>
    </Col>
    </Col> 
    </Row>  */}