/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Form, Input, Button, Row, Col, Card, Spin, DatePicker, Table, Modal,Pagination } from 'antd';
import BreadCrumbCustom from '../../../../component/BreadCrumbCustom/BreadCrumbCustom'
import * as actions from '../actions/HistoryCaseManage'
import '../style/HistoryCaseManage.less'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;

@connect(
  state => state,
  {...actions}
)
class HistoryCaseManage extends Component {
    constructor(props) {
      super(props)
      this.submit = this.submit.bind(this)
      this.state = {}
    }  

    pageOnChange(page) {
      this.props.getResidentList(this.props.HistoryCaseManage.currentParams, page)
    }

    handleOperator = (type, item)=>{
      if(type =='create'){
          this.setState({
              title:'创建发案',
              isVisible:true,
              type
          })
      }else if(type=="edit" || type=='detail'){
          if(!item){
              Modal.info({
                  title: '信息',
                  content: '请选择一个发案'
              })
              return;
          }
          this.setState({
              title:type=='edit'?'编辑发案':'查看详情',
              isVisible:true,
              caseInfo:item,
              type
          })
      }else if(type=="delete"){
          if(!item){
              Modal.info({
                  title: '信息',
                  content: '请选择一个发案'
              })
              return;
          } else {
            this.props.caseDelete(item.id, () => {
              this.handleOk('isVisible')
              this.addForm.props.form.resetFields()
              this.props.caseSelect(this.props.HistoryCaseManage.currentParams)
            })
          }
      }
    }

    handleSubmit = ()=>{
      let type = this.state.type;
      let _this = this;
      this.addForm.props.form.validateFields( (err, values) => {
        if (!err) {
          let CaseParams = {}
          // 案发时间
          if (values.modal_createDateString) {
            CaseParams.createDate = values.modal_createDateString.format('YYYY-MM-DD HH:mm:ss');
          }
          // 涉案人员
          if (values.modal_involveName ) {
            CaseParams.involveName = values.modal_involveName 
          }
          // 案情梗概
          if (values.modal_description) {
            CaseParams.description = values.modal_description
          }
          if (type == 'edit') {
            CaseParams.id = this.state.caseInfo.id;
            this.props.caseUpdate(CaseParams, () => {
              _this.handleOk('isVisible')
              _this.addForm.props.form.resetFields()
              _this.props.caseSelect(this.props.HistoryCaseManage.currentParams)
            })
          } else {
            this.props.caseAdd(CaseParams, () => {
              _this.handleOk('isVisible')
              _this.addForm.props.form.resetFields()
              _this.props.caseSelect(this.props.HistoryCaseManage.currentParams)
            })
          }
        }
      });
    }

    // 查询
    submit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          let CaseParams = {}
          // 案发时间
          if (values.startDate) {
            CaseParams.startDate = values.startDate.format('YYYY-MM-DD');
          }
          // 案发时间
          if (values.endDate) {
            CaseParams.endDate = values.endDate.format('YYYY-MM-DD');
          }
          // 涉案人员
          if (values.involveName ) {
            CaseParams.involveName = values.involveName 
          }
          this.props.caseSelect(CaseParams)
        }
      });
    }

    handleOk = (type) => {
      this.setState({ 
          [type]: false,
       });
    }

    handleNumberChange = (e) => {
      const number = parseInt(e.target.value || 0, 10);
      if (isNaN(number)) {
        return;
      }
    }

    componentDidMount() {
      this.props.getData()
      this.props.caseSelect()
    }
    render() {
      let _this = this
      const {
        caseList,
        parkingSpaceCodingList,
        caseLoading,
        pageSize,
        total,
        current,
      } = this.props.HistoryCaseManage

      const { getFieldDecorator } = this.props.form;

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
      };
      const formItemLayout2 = {
        labelCol: {
          xs: { span: 6 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 6 },
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
            offset: 4,
          },
        },
      };


      const data = caseList ? caseList : []
      const config = {
        rules: [{ type: 'object', required: true, message: '请输入案发时间' }],
      };
      const columns = [
        {
          title: '发案时间',
          dataIndex: 'createDate',
          key: 'createDate',
        }, {
          title: '涉及人员',
          dataIndex: 'involveName',
          key: 'involveName',
        }, {
          title: '案情梗概',
          dataIndex: 'description',
          key: 'description',
        }, {
          title: '操作',
          key: 'action',
          render: (text, record) => {
            return (
              <div>
                <Button onClick={() => {this.handleOperator('edit', record)}}>修改</Button>&nbsp;
                <Button type="danger" onClick={() => Modal.confirm({
                  title: '删除',
                  content: '确定要删除此条发案信息吗？',
                  okText: '确认',
                  cancelText: '取消',
                  onOk() { _this.handleOperator('delete', record)} ,
                  onCancel() { },
                })}>删除</Button>
              </div>
            )
          }
        }
      ];

      return (
        <div>
          <BreadCrumbCustom first="基本信息管理" second="本月发案管理"/>
          <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="本月发案管理">
                        <Modal
                            title={this.state.title}
                            visible={this.state.isVisible}
                            onOk={this.handleSubmit}
                            okText="确认"
                            cancelText="取消"
                            width={800}
                            onCancel={()=>{
                                this.addForm.props.form.resetFields();
                                this.setState({
                                    isVisible:false,
                                })
                            }}
                        >
                            <AddForm caseInfo={this.state.caseInfo} type={this.state.type} wrappedComponentRef={(inst) => this.addForm = inst}/>
                        </Modal>                    
                        <Form onSubmit={this.submit}>
                          <Row>
                            <Col span={24}>                      
                              <Col span={6}>
                                <FormItem
                                  {...formItemLayout2}
                                  label="案发时间"
                                >
                                {getFieldDecorator('startDate')(
                                    <DatePicker locale={locale} placeholder="请选择起始时间" format="YYYY-MM-DD" />
                                  )}
                                </FormItem>
                              </Col>
                              <Col span={6}>                            
                                <FormItem>
                                {getFieldDecorator('endDate')(
                                    <DatePicker locale={locale} placeholder="请选择截止时间" format="YYYY-MM-DD" />
                                  )}
                                </FormItem>
                              </Col>
                              <Col span={6}>
                                <FormItem
                                  {...formItemLayout2}
                                  label="涉案人员"
                                >
                                  {getFieldDecorator('involveName', {
                                  })(
                                    <Input />
                                  )}
                                </FormItem>
                              </Col>
                              <Col span={6}>
                                <FormItem {...formItemLayout2}>
                                  <Col span={10} className="build-btns">
                                    <Button type="primary" htmlType="submit">查询</Button>
                                  </Col>                                  
                                  <Col span={10} className="build-btns">
                                    <Button type="primary" onClick={()=>this.handleOperator('create')}>新增</Button>
                                  </Col>                                
                                </FormItem>
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
                <Spin spinning={caseLoading}>
                  <Card>
                    <Table columns={columns} dataSource={data} pagination={false} locale={{emptyText: '暂无数据'}}/>
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
export default Form.create()(HistoryCaseManage);

class AddForm extends Component {
  render() {
    const config = {
      rules: [{ type: 'object', required: true, message: '请输入案发时间' }],
    };
    const { getFieldDecorator } = this.props.form;
    const caseInfo = this.props.caseInfo || {};
    const type = this.props.type;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };

    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="案发时间"
        >       
          {caseInfo && type=='detail' ? caseInfo.createDate :
            getFieldDecorator(`modal_createDateString`,{
                  initialValue: caseInfo.createDate?moment(caseInfo.createDate, "YYYY-MM-DD HH:mm:ss"):'',
                  rules: [{
                      required: true, message: '请输入案发时间',
                  }],
          })(
              <DatePicker format="YYYY-MM-DD HH:mm:ss" showToday={false} placeholder="请输入案发时间"/> 
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="涉案人员"
        >
          {caseInfo && type=='detail' ? caseInfo.involveName :
            getFieldDecorator('modal_involveName', {initialValue:caseInfo.involveName})(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="案情梗概"
        >
          {caseInfo && type=='detail' ? caseInfo.description :
            getFieldDecorator('modal_description', {
            rules: [{ required: true, message: '请输入案情梗概' }],
            initialValue:caseInfo.description ? caseInfo.description : ''
          })(
            <textarea style={{ width: 500 }} 
              placeholder="请输入案情梗概"
            >
            </textarea>
          )}
        </FormItem>
      </Form>
    );
  }
}
AddForm = Form.create({})(AddForm);