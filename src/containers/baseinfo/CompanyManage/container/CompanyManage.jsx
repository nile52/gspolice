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
    Upload,
    Icon,
    Radio,
    DatePicker,
    Popover,
    Divider,
} from 'antd';
import BreadCrumbCustom from '../../../../component/BreadCrumbCustom/BreadCrumbCustom'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
import {
    WEI_HOUSE,
    CAS_LOGIN,
    CAS_CASCHECK
} from '../../../../fetch/apis'
import * as actions from '../actions/CompanyManage'
import utils from '../../../../util/util.js'
import SearchInput from './SearchInput'
import '../style/CompanyManage.less'
import { log } from 'handlebars';
let timeout;
let currentValue;

const companyType = {
    0: "有限责任公司",
    1: "个体工商户",
    2: "个体独资企业",
    3: "一人有限公司",
    4: "机关单位",
    5: "事业单位",
    6: "社会群体单位",
    7: "法人",
    8: "其他"    
}

let companyTypeOption = [] 

for (const key in companyType) {
    if (companyType.hasOwnProperty(key)) {
        const element = companyType[key];
        companyTypeOption.push(<Option key={key} value={key}>{element}</Option>)
    }
}

const industryType = {
    0: "农、林、牧、渔业",
    1: "采矿业",
    2: "制造业",
    3: "电力、热力、燃气及水生产和供应业",
    4: "建筑业",
    5: "批发和零售业",
    6: "交通运输、仓储和邮政业",
    7: "信息传输、软件和信息技术服务业",
    8: "金融业",
    9: "房地产业",
    10: "租赁和商务服务业",
    11: "科学研究和技术服务业",
    12: "水利、环境和公共设施管理业",
    13: "居民服务、修理和其他服务业",
    14: "教育",
    15: "卫生和社会工作",
    16: "文化、体育和娱乐业",
    17: "公共管理、社会保障和社会组织",
    18: "国际组织",
}

let industryTypeOption = [] 

for (const key in industryType) {
    if (industryType.hasOwnProperty(key)) {
        const element = industryType[key];
        industryTypeOption.push(<Option key={key} value={key}>{element}</Option>)
    }
}

const operationState  = {
    0: "存续",
    1: "在业",
    2: "吊销",
    3: "注销",
    4: "停业",
    5: "清算",    
}

let operationStateOption = [] 

for (const key in operationState) {
    if (operationState.hasOwnProperty(key)) {
        const element = operationState[key];
        operationStateOption.push(<Option key={key} value={key}>{element}</Option>)
    }
}

@connect(
    state => state,
    {...actions}
)

class CompanyManage extends Component {
    constructor() {
        super()
        this.submit = this.submit.bind(this)
        this.pageOnChange = this.pageOnChange.bind(this)
        this.clear = this.clear.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.state = {
            addVisible: false,
            modifyVisible: false,
            houseId: '',
            type: 'create',
            HousingMasterData: '',
            selectCompanyType: '',
        }
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        if(e && e.fileList.length > 1) {
            e.fileList.shift()
        }
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    modify = (type, data) => {
        this.props.getCompany({id: data.id}, () => {
            this.setState({ houseId: data.id });
            this.showModal(type)
        })
    }

    showModal = (type) => {
        this.setState({
          [type]: true,
        });
    }

    handleOperator = (type, item)=>{
        if (item) {
            this.props.getCompany({id: item.id})
        } 
        if(type =='create'){
            this.setState({
                title:'创建在地单位',
                addVisible:true,
                type
            })
        }else if(type=="edit" || type=='detail'){
            if(!item){
                Modal.info({
                    title: '信息',
                    content: '请选择一个单位'
                })
                return;
            }
            this.setState({
                title:type=='edit'?'编辑单位':'查看详情',
                addVisible:true,
                caseInfo:item,
                type
            })
        }else if(type=="delete"){
            if(!item){
                Modal.info({
                    title: '信息',
                    content: '请选择一个单位'
                })
                return;
            } else {
              this.props.deletaCompany(item.id, () => {
                this.handleCancel('addVisible')
                this.props.getCompanyList(this.props.HistoryCaseManage.currentParams)
              })
            }
        }
    }
  
    handleSubmit = ()=>{
        let type = this.state.type;
        let _this = this;
        this.addForm.props.form.validateFields( (err, values) => {
            
          if (!err) {
            let companyParams = {}
            // name
            // 公司名称
            if (values.name ) {
                companyParams.name = values.name 
            }
            
            // legalPerson
            // 法人
            if (values.legalPerson ) {
                companyParams.legalPerson = values.legalPerson 
            }
            
            // registerMoney	
            // 注册资金(万起)
            if (values.registerMoney ) {
                companyParams.registerMoney = values.registerMoney 
            }
            
            // establishTime	
            // 成立时间
            if (values.establishTime ) {
                companyParams.establishTime = values.establishTime.format('YYYY-MM-DD');
            }
            
            // businessTermStart	
            // 营业开始时间
            if (values.businessTermStart ) {
                companyParams.businessTermStart = values.businessTermStart.format('YYYY-MM-DD');
            }
            
            // businessTermEnd	
            // 营业结束时间
            if (values.businessTermEnd ) {
                companyParams.businessTermEnd = values.businessTermEnd.format('YYYY-MM-DD');
            }
            
            // checkTime	
            // 核准时间
            if (values.checkTime ) {
                companyParams.checkTime = values.checkTime.format('YYYY-MM-DD');
            }
            
            // registerCompany	
            // 注册机关
            if (values.registerCompany ) {
                companyParams.registerCompany = values.registerCompany 
            }
            
            // address	
            // 地址
            if (values.address ) {
                companyParams.address = values.address 
            }
            
            // describe		
            // 所属行业(0-林牧渔业，1-采矿业，2-金融业，3-制造业)
            if (values.describe !== undefined ) {
                companyParams.describe = values.describe 
            }
            
            // creditCode	
            // 信用代码
            if (values.creditCode ) {
                companyParams.creditCode = values.creditCode 
            }
            
            // type		
            // 单位类型(0-机关单位 1-事业单位 2-企业 3-团体 4-社会群体单位 5-个体工商户 6-法人)
            if (values.type !== undefined  ) {
                companyParams.type = values.type 
            }
            
            // status		
            // 运营状态（0-存续，1-在业，2-吊销，3-注销，4-停业，5-清算）
            if (values.status !== undefined ) {
                companyParams.status = values.status 
            }
            
            // superviseCompany	
            // 管辖单位
            if (values.superviseCompany ) {
                companyParams.superviseCompany = values.superviseCompany 
            }
            
            // supervisePolice	
            // 负责民警
            if (values.supervisePolice ) {
                companyParams.supervisePolice = values.supervisePolice 
            }
            
            // certificatesType	
            // 单位证件类型(0-单位证件类型)
            if (values.certificatesType ) {
                companyParams.certificatesType = values.certificatesType 
            }
            
            // certificatesNum	
            // 单位证件号
            if (values.certificatesNum ) {
                companyParams.certificatesNum = values.certificatesNum 
            }
            
            // longitude	
            // 经度
            if (values.longitude ) {
                companyParams.longitude = values.longitude 
            }
            
            // latitude	
            // 纬度
            if (values.latitude ) {
                companyParams.latitude = values.latitude 
            }          

            if (type == 'edit') {
              companyParams.id = this.state.caseInfo.id;             

              this.props.updateCompany(companyParams, () => {
                _this.handleCancel('addVisible')
                _this.addForm.props.form.resetFields()
                _this.props.getCompanyList(this.props.HistoryCaseManage.currentParams)
              })
            } else {
              this.props.addCompany(companyParams, () => {
                _this.handleCancel('addVisible')
                _this.addForm.props.form.resetFields()
                _this.props.getCompanyList(this.props.HistoryCaseManage.currentParams)
              })
            }
          }
        });
    }

    submit = () => {
        let params = {}
        let formData = this.props.form.getFieldsValue()
        // params.certificatesNum = formData.certificatesNum ? formData.certificatesNum === 'all' ? undefined : formData.certificatesNum : undefined
        params.describe = formData.describe ? formData.describe === 'all' ? undefined : formData.describe : undefined
        params.name = formData.name ? formData.name === 'all' ? undefined : formData.name : undefined
        params.status = formData.status ? formData.status === 'all' ? undefined : formData.status : undefined
        params.type = formData.type ? formData.type === 'all' ? undefined : formData.type : undefined
        this.props.getCompanyList(params)
    }

    edit = () => {
        let params = {}
        let formData = this.props.form.getFieldsValue()
        params.id = this.state.houseId
        params.area       = formData.edit_area ? formData.edit_area : ''
        params.commercial = formData.edit_commercial ? formData.edit_commercial=='否'? '0': '1': ''
        params.roomMaster   = formData.edit_landlord ? formData.edit_landlord : ''
        params.oriented   = formData.edit_oriented ? formData.edit_oriented : ''
        params.usage      = formData.edit_usage ? formData.edit_usage : ''
        params.pictureAddress = formData.edit_pictureAddress ? formData.edit_pictureAddress[0].thumbUrl : ''
        this.props.updateCompany(params, () => {
            this.setState({
                'modifyVisible': false,
            });
            this.props.getCompanyList()
        })
    }   

    clear() {
        this.props.form.resetFields()
        this.props.getCompanyList()
    }

    pageOnChange(page) {
        this.props.getCompanyList(this.props.CompanyManage.currentParams, page)
    }

    handleOk = (type) => {
        this.setState({ [type]: true });
    }

    handleCancel = (type) => {
        this.setState({ [type]: false });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.App.id != this.props.App.id) {
            this.props.form.resetFields()
            // this.props.getBuildList()
            this.props.getCompanyList()
        }
    }

    componentDidMount() {
        this.props.form.resetFields()
        this.props.getCompanyList()
    }

    fetch(value, callback) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        var _this = this
        currentValue = value;
        function fake() {
          _this.props.getSelectHousingMaster(value)
        }
        timeout = setTimeout(fake, 300);
    }

    handleSearch = (value) => {
        this.fetch(value, data => this.setState({ data }));
    }

    handleChange = (v) => {
        this.setState({ value: v });
    }

    multipleSelectHandleChange = (value) => {
        console.log(`selected ${value}`);
    }

    companyTypeHandleChange = (value) => {
        this.setState({
            selectCompanyType: value
        })
    }

    render() {
        let _this = this
        const { getFieldDecorator } = this.props.form;
        const {
            companyList,
            companyInfo,
            total,
            isRequired,
            current,
            pageSize,
        } = this.props.CompanyManage
        const {
            addVisible,
            modifyVisible,
            type,
            selectCompanyType
        } = this.state

        const addFormProps = {
            companyInfo,
            type,
            selectCompanyType,
            companyTypeHandleChange: this.companyTypeHandleChange     
        }

        const formItemLayout1 = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 12 },
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
          },
          formItemLayout5 = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 2 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          }

        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
                key: 'num',
            }, {
                title: '单位名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '单位类型',
                dataIndex: 'type',
                key: 'type',
                render: (data) => {
                    return companyType[data]
                }
            }, {
                title: '所属行业',
                dataIndex: 'describe',
                key: 'describe',
                render: (data) => {
                    return industryType[data]
                }
            }, {
                title: '经营状况',
                dataIndex: 'status',
                key: 'status',
                render: (data) => {
                    return operationState[data]
                }
            }, {
                title: '管辖单位',
                dataIndex: 'superviseCompany',
                key: 'superviseCompany',
            }, {
                title: '负责民警',
                dataIndex: 'supervisePolice',
                key: 'supervisePolice',
            }, {
                title: '上次更新时间',
                dataIndex: 'modifyTime',
                key: 'modifyTime',
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <div>
                        <Button onClick={() => {this.handleOperator('edit', record)}}>编辑</Button>&nbsp;
                        <Button type="danger" onClick={() => Modal.confirm({
                            title: '删除',
                            content: '确定要删除此条房屋信息吗？',
                            okText: '确认',
                            cancelText: '取消',
                            onOk() {
                                _this.handleOperator('delete', record)
                            },
                            onCancel() {},
                        })}>删除</Button>
                    </div>
                ),
            }
        ];

        return (
          <div id="Companymanage">
                <BreadCrumbCustom first="基本信息管理" second="在地单位管理"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="在地单位管理">
                                {/* 房屋面积 和 使用情况 */}
                                <Row>
                                    <Col span={24}>
                                        <Col span={6}>
                                            <FormItem 
                                                label={'单位名称:'}
                                                {...formItemLayout4}
                                            >
                                                {getFieldDecorator(`name`)(
                                                    <Input placeholder="请输入单位名称"/>   
                                                )}
                                            </FormItem> 
                                        </Col>
                                        <Col span={18}>
                                            <FormItem 
                                                label={'运营状态:'}
                                                {...formItemLayout5}
                                            >
                                                {getFieldDecorator(`status`, {
                                                    initialValue: ["0","1","2","3","4","5"],
                                                })(
                                                    <Select
                                                        mode="multiple"
                                                        style={{ width: '100%' }}
                                                        placeholder="请选择运营状态"
                                                        onChange={this.multipleSelectHandleChange}
                                                        >
                                                        {operationStateOption}
                                                    </Select>
                                                )}
                                            </FormItem> 
                                        </Col>
                                        <Col span={24}>
                                            <FormItem 
                                                label={'单位类型:'}
                                                {...formItemLayout5}
                                            >
                                                {getFieldDecorator(`type`, {
                                                    initialValue: ["0","1","2","3","4","5","6","7","8"],
                                                })(
                                                    <Select
                                                        mode="multiple"
                                                        style={{ width: '100%' }}
                                                        placeholder="请选择单位类型"
                                                        onChange={this.multipleSelectHandleChange}
                                                        >
                                                        {companyTypeOption}
                                                    </Select>,
                                                )}
                                            </FormItem> 
                                        </Col>
                                        <Col span={24}>
                                            <FormItem 
                                                label={'所属行业:'}
                                                {...formItemLayout5}
                                            >
                                                {getFieldDecorator(`describe`, {
                                                    initialValue: ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"],
                                                })(
                                                    <Select
                                                        mode="multiple"
                                                        style={{ width: '100%' }}
                                                        placeholder="请选择所属行业"
                                                        onChange={this.multipleSelectHandleChange}
                                                        >
                                                        {industryTypeOption}
                                                    </Select>
                                                )}
                                            </FormItem> 
                                        </Col>
                                    </Col> 
                                </Row> 
        
                                <Row>
                                    <Col span={24}>

                                        <Col span={1} className="build-btns"></Col>
                                        <Col span={3} className="build-btns">
                                            <Button type="primary" style={{width: 120}} onClick={this.submit}>查询</Button>
                                        </Col>
                                        <Col span={3} className="build-btns">
                                            <Button 
                                                style={{width: 120}} 
                                                // onClick={(type) => this.handleOk('addVisible')}
                                                onClick={() => {this.handleOperator('create')}}
                                            >新增</Button>
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
                                <Table columns={columns} dataSource={companyList} pagination={false}/>
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
                    destroyOnClose
                    visible={addVisible}
                    title="新增在地单位"
                    onOk={this.handleSubmit}
                    okText="确认"
                    cancelText="取消"
                    width='80%'
                    onCancel={(type) => {
                        this.handleCancel('addVisible')
                    }}
                >
                    <AddForm 
                        {...addFormProps}
                        wrappedComponentRef={(inst) => this.addForm = inst}
                    />
                </Modal>
          </div>
        );
    }
}
export default Form.create()(CompanyManage);


class AddForm extends Component {
    render() {
      const { getFieldDecorator } = this.props.form;
      const {
          type,
          selectCompanyType
      } = this.props
      let companyInfo = {}
      if (type == 'edit') {
          companyInfo = this.props.companyInfo || {};
      }
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
  
      const content = (
        <div>
          <p style={{width: '400px'}}>不知道单位类型的提示一大段文本内容不知道单位类型的提示一大段文本内容不知道单位类型的提示一大段文本内容不知道单位类型的提示一大段文本内容不知道单位类型的提示一大段文本内容不知道单位类型的提示一大段文本内容不知道单位类型的提示一大段文本内容不知道单位类型的提示一大段文本内容不知道单位类型的提示一大段文本内容</p>
        </div>
      );


      console.log(selectCompanyType);
      console.log(type);
      

      return (
        <Form>
            <Row gutter={8}>
                <Col span={8}>
                    <FormItem
                        {...formItemLayout}
                        label="公司名称"
                    >
                        {companyInfo && type=='detail' ? companyInfo.name :
                        getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入公司名称' }],
                            initialValue:companyInfo.name ? companyInfo.name : ''
                        })(
                        <Input placeholder="请输入公司名称" />
                        )}
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem
                        {...formItemLayout}
                        label="单位类型"
                    >
                        {companyInfo && type=='detail' ? companyInfo.type :
                        getFieldDecorator('type', {
                            rules: [{ required: true, message: '请选择单位类型' }],
                            initialValue:companyInfo.type !== undefined ? companyInfo.type.toString() : ''
                        })(
                            <Select
                                style={{ width: '100%' }}
                                placeholder="请选择单位类型"
                                onChange={this.props.companyTypeHandleChange}
                                >
                                {companyTypeOption}
                            </Select>,
                        )}
                    </FormItem>
                </Col>
                <Col span={8}>
                    <Popover content={content} title="不知道单位类型的提示">
                        不知道单位类型 <Icon type="question-circle" />
                    </Popover>
                </Col>
            </Row>

            {
                selectCompanyType ? 
                <Row gutter={8}>
                    <Divider />

                    {/* 选择不同单位类型显示不字段 */}
                    {selectCompanyType == 0 ?<div></div>: ''}
                    
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="所属行业"
                        >
                            {companyInfo && type=='detail' ? companyInfo.describe :
                            getFieldDecorator('describe', {
                                rules: [{ required: true, message: '请选择所属行业' }],
                                initialValue:companyInfo.describe !== undefined ? companyInfo.describe.toString() : ''
                            })(
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="请选择所属行业"
                                    onChange={this.multipleSelectHandleChange}
                                    >
                                    {industryTypeOption}
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="统一社会信用代码"
                        >
                            {companyInfo && type=='detail' ? companyInfo.creditCode :
                            getFieldDecorator('creditCode', {
                                rules: [{ required: true, message: '请输入统一社会信用代码' }],
                                initialValue:companyInfo.creditCode ? companyInfo.creditCode : ''
                            })(
                                <Input placeholder="请输入统一社会信用代码" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="法定代表人"
                        >
                            {companyInfo && type=='detail' ? companyInfo.legalPerson :
                            getFieldDecorator('legalPerson', {
                                rules: [{ required: true, message: '请输入法定代表人' }],
                                initialValue:companyInfo.legalPerson ? companyInfo.legalPerson : ''
                            })(
                            <Input placeholder="请输入法定代表人" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="运营状态"
                        >
                            {companyInfo && type=='detail' ? companyInfo.status :
                            getFieldDecorator('status', {
                                rules: [{ required: true, message: '请选择运营状态' }],
                                initialValue:companyInfo.status !== undefined ? companyInfo.status.toString() : ''
                            })(
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="请选择运营状态"
                                    onChange={this.multipleSelectHandleChange}
                                    >
                                    {operationStateOption}
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="注册资金"
                        >
                            {companyInfo && type=='detail' ? companyInfo.registerMoney :
                            getFieldDecorator('registerMoney', {
                                rules: [{ required: true, message: '请输入注册资金' }],
                                initialValue:companyInfo.registerMoney ? companyInfo.registerMoney : ''
                            })(
                            <Input placeholder="请输入注册资金" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="住所地址"
                        >
                            {companyInfo && type=='detail' ? companyInfo.address :
                            getFieldDecorator('address', {
                                rules: [{ required: true, message: '请输入住所地址' }],
                                initialValue:companyInfo.address ? companyInfo.address : ''
                            })(
                            <Input placeholder="请输入住所地址" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="注册机关"
                        >
                            {companyInfo && type=='detail' ? companyInfo.registerCompany :
                            getFieldDecorator('registerCompany', {
                                rules: [{ required: true, message: '请输入注册机关' }],
                                initialValue:companyInfo.registerCompany ? companyInfo.registerCompany : ''
                            })(
                            <Input placeholder="请输入注册机关" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="管辖单位"
                        >
                            {companyInfo && type=='detail' ? companyInfo.superviseCompany :
                            getFieldDecorator('superviseCompany', {
                                rules: [{ required: true, message: '请输入管辖单位' }],
                                initialValue:companyInfo.superviseCompany ? companyInfo.superviseCompany : ''
                            })(
                                <Input placeholder="请输入管辖单位" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="负责民警"
                        >
                            {companyInfo && type=='detail' ? companyInfo.supervisePolice :
                            getFieldDecorator('supervisePolice', {
                                rules: [{ required: true, message: '请输入负责民警' }],
                                initialValue:companyInfo.supervisePolice ? companyInfo.supervisePolice : ''
                            })(
                                <Input placeholder="请输入负责民警" />
                            )}
                        </FormItem>
                    </Col>

                    <Divider/>

                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="成立时间"
                        >       
                            {companyInfo && type=='detail' ? companyInfo.establishTime :
                            getFieldDecorator(`establishTime`,{
                                initialValue: companyInfo.establishTime?moment(companyInfo.establishTime, "YYYY-MM-DD"):'',
                            })(
                                <DatePicker format="YYYY-MM-DD" showToday={false} placeholder="请输入成立时间"/> 
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="核准时间"
                        >       
                            {companyInfo && type=='detail' ? companyInfo.checkTime :
                            getFieldDecorator(`checkTime`,{
                                initialValue: companyInfo.checkTime?moment(companyInfo.checkTime, "YYYY-MM-DD"):'',
                            })(
                                <DatePicker format="YYYY-MM-DD" showToday={false} placeholder="请输入核准时间"/> 
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="营业开始时间"
                        >       
                            {companyInfo && type=='detail' ? companyInfo.businessTermStart :
                            getFieldDecorator(`businessTermStart`,{
                                initialValue: companyInfo.businessTermStart?moment(companyInfo.businessTermStart, "YYYY-MM-DD"):'',
                            })(
                                <DatePicker format="YYYY-MM-DD" showToday={false} placeholder="请输入营业开始时间"/> 
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="营业结束时间"
                        >       
                            {companyInfo && type=='detail' ? companyInfo.businessTermEnd :
                            getFieldDecorator(`businessTermEnd`,{
                                initialValue: companyInfo.businessTermEnd?moment(companyInfo.businessTermEnd, "YYYY-MM-DD"):'',
                            })(
                                <DatePicker format="YYYY-MM-DD" showToday={false} placeholder="请输入营业结束时间"/> 
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="所属行业"
                        >
                            {companyInfo && type=='detail' ? companyInfo.describe :
                            getFieldDecorator('describe', {
                                initialValue:companyInfo.describe !== undefined ? companyInfo.describe.toString() : ''
                            })(
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="请选择所属行业"
                                    onChange={this.multipleSelectHandleChange}
                                    >
                                    {industryTypeOption}
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                    {/* <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="单位证件类型"
                        >
                            {companyInfo && type=='detail' ? companyInfo.certificatesType :
                            getFieldDecorator('certificatesType', {
                            rules: [{ required: true, message: '请输入单位证件类型' }],
                            initialValue:companyInfo.certificatesType ? companyInfo.certificatesType : ''
                            })(
                                <Input placeholder="请输入单位证件类型" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="单位证件号"
                        >
                            {companyInfo && type=='detail' ? companyInfo.certificatesNum :
                            getFieldDecorator('certificatesNum', {
                            rules: [{ required: true, message: '请输入单位证件号' }],
                            initialValue:companyInfo.certificatesNum ? companyInfo.certificatesNum : ''
                            })(
                                <Input placeholder="请输入单位证件号" />
                            )}
                        </FormItem>
                    </Col> */}
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="经度"
                        >
                            {companyInfo && type=='detail' ? companyInfo.longitude :
                            getFieldDecorator('longitude', {
                                initialValue:companyInfo.longitude ? companyInfo.longitude : ''
                            })(
                                <Input placeholder="请输入经度" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="纬度"
                        >
                            {companyInfo && type=='detail' ? companyInfo.latitude :
                            getFieldDecorator('latitude', {
                                initialValue:companyInfo.latitude ? companyInfo.latitude : ''
                            })(
                                <Input placeholder="请输入纬度" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="备注"
                        >
                            {companyInfo && type=='detail' ? companyInfo.remark :
                            getFieldDecorator('remark', {
                                initialValue:companyInfo.remark ? companyInfo.remark : ''
                            })(
                                <TextArea placeholder="请输入备注"></TextArea>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                : ''
            } 


        </Form>
      );
    }
}
AddForm = Form.create({})(AddForm);