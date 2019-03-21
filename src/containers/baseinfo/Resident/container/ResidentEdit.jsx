/* eslint-disable */
import React, { Component } from 'react';
import { 
    Button, 
    Form, 
    Row, 
    Col, 
    Radio, 
    Input, 
    DatePicker, 
    Select, 
    Checkbox, 
    Upload, 
    Icon, 
    Modal,
    Cascader,
    message
} from 'antd';
const { TextArea } = Input;
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
import InputButtonForm from '../../../../component/InputButtonForm/InputButtonForm'
import InputSelectForm from '../../../../component/InputSelectForm/InputSelectForm'
import DatePickerCheckboxGroup from '../../../../component/DatePickerCheckboxGroup/DatePickerCheckboxGroup'
import utils from '../../../../util/util'
import {
    formItemLayout1,
    formItemLayout3,
    formItemLayout4,
    formItemLayout5,
    formItemLayout6,
    formItemLayout7
} from './residentDatas'
import '../style/Resident.less'

class ResidentEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            casCaderOptions: [],
        }
    }

    handleCancel = () => this.setState({ 
      previewVisible: false 
    })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    isShenFenZheng = (rule, value, callback) => {
        const form = this.props.form;
        if(value && value.input) {
            const result = utils.isShenFenZheng(value.input)
            if(!(result.status)) {
                callback(result.msg)
            }
        }
        if(value.input === '') {
            callback('请输入身份证号');
        }
        
        callback();
    }

    isPhoneNumber = (rule, value, callback) => {
        if(value && value.input) {
            const number = parseInt(value.input || 0, 10);
            if (isNaN(number)) {
                callback('请输入数字');
            }
        }
        if(value.input === '') {
            callback('请输入手机号');
        }
        callback();
    }

    isPhoneNumberNotRequire = (rule, value, callback) => {
        if(value && value.input) {
            const number = parseInt(value.input || 0, 10);
            if (isNaN(number)) {
                callback('请输入数字');
            }
        }
        callback();
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

    loadData = (selectedOptions) => {
        let _this = this
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        this.props.getLkbAddress({
            init: false,
            value: targetOption.value,
            level: targetOption.level
        }, (data) => {
            let targetChildren = []
            if(data) {
                data.data.forEach((item) => {
                    targetChildren.push({
                        label: item.text,
                        value: item.value,
                        level: data.level,
                        isLeaf: data.level=='区县'?true:false
                    })
                })
                targetOption.loading = false
                targetOption.children = targetChildren
                _this.setState({
                    casCaderOptions: [..._this.state.casCaderOptions]
                })
            }
        })
    }

    warning = () => {
        message.warning('流动人口中心接口出错，租户暂停录入修改');
    }

    componentWillReceiveProps(nextProps) {
        if (('casCaderOptions' in nextProps) && (nextProps.casCaderOptions !== this.state.casCaderOptions)) {
            if(nextProps.casCaderOptions) {
                this.setState({
                    casCaderOptions: nextProps.casCaderOptions,
                })
            }
        }
    }

    componentDidMount() {
        if(this.props.lkbIsWrong) {
            this.warning()
        }
        if(this.props.casCaderOptions) {
            this.setState({
                casCaderOptions: this.props.casCaderOptions,
            })
        }
    }
  
    render() {
        const { getFieldDecorator } = this.props.form;
        const { 
            singleResidentList,
            userTypeList,
            singleUserType,
            residentType,
            addType,
            readCard,
            lkbIsWrong
        } = this.props

        let{ 
            isRequired,
            isForeign
        } = this.props


        if (isRequired && singleResidentList.flowIsPermanent && singleResidentList.flowIsPermanent == "常住人员" || singleResidentList.flowIsPermanent =="人户分离" || singleResidentList.flowIsPermanent =="境外人员") {
            isRequired = false
        } 
        if (singleResidentList && singleResidentList.flowIsPermanent && singleResidentList.flowIsPermanent =="境外人员") {
            isForeign = true
        } 


        console.log(singleResidentList);
        

        const sixOptions = [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
        ]
        const typeOptions = [
            { label: '常住人员', value: '常住人员' },
            { label: '人户分离', value: '人户分离' },
            { label: '流动人员', value: '流动人员', disabled: lkbIsWrong?true:false },
            { label: '境外人员', value: '境外人员' },
        ]
        const userTypeOptions = []
        if (userTypeList &&  userTypeList.length > 0) {
            userTypeList.forEach((item) => {
                userTypeOptions.push({
                    label: item.name,
                    value: item.id+''
                })
            })
        }
        const dateFormat = 'YYYY-MM-DD';
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        let form_upload_personalPicture = null
        if(singleResidentList.personalPicture) {
            form_upload_personalPicture = [{
                uid: -1,
                name: 'personalPicture.png',
                status: 'done',
                url: singleResidentList.personalPicture,
                thumbUrl: singleResidentList.personalPicture,
            }]
        }
        let form_upload_idCardPicture = null
        if(singleResidentList.idCardPicture) {
            form_upload_idCardPicture = [{
                uid: -2,
                name: 'idCardPicture.png',
                status: 'done',
                url: singleResidentList.idCardPicture,
                thumbUrl: singleResidentList.idCardPicture,
            }]
        }
        
        // console.log(addType);
        return (
            <div>
            <Row>
                <Col span={24}>
                    <Col span={9}>
                        <FormItem
                            {...formItemLayout3}
                                label="人员照片"
                            >
                            {getFieldDecorator('form_personalP', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                                initialValue: form_upload_personalPicture,
                                rules: [{
                                    required: true, message: '请上传身份证照片',
                                }],
                            })(
                                <Upload
                                    listType="picture-card"
                                    // fileList={fileList}
                                    onPreview={this.handlePreview}
                                    // onChange={this.handleChange}
                                >
                                    {uploadButton}
                                </Upload>
                            )}
                        </FormItem>
                    </Col>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                        <Col span={9}>
                            <FormItem
                                {...formItemLayout3}
                                    label="身份证照片"
                                >
                                {getFieldDecorator('form_idCardP', {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                    initialValue: form_upload_idCardPicture,
                                    rules: [{
                                        required: true, message: '请上传头像',
                                    }],
                                })(
                                    <Upload
                                        listType="picture-card"
                                        // fileList={fileList}
                                        onPreview={this.handlePreview}
                                        // onChange={this.handleChange}
                                    >
                                        {uploadButton}
                                    </Upload>
                                )}
                            </FormItem>
                        </Col>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Col span={9}>
                        <FormItem 
                            label={'姓名:'}
                            {...formItemLayout3}
                        >
                            {getFieldDecorator(`form_name`, {
                                initialValue: singleResidentList.name,
                                rules: [{
                                    required: true, message: '请输入姓名',
                                }],
                            })(
                                <Input placeholder="请输入姓名"/>   
                            )}
                        </FormItem> 
                    </Col>
                </Col> 
            </Row>
            <Row>
                <Col span={24}>
                    <Col span={9}>
                        <FormItem 
                            label={'性别:'}
                            {...formItemLayout3}
                        >
                            {getFieldDecorator(`form_gender`, {
                                    initialValue: singleResidentList.gender,
                                    rules: [{
                                        required: true, message: '请输入性别',
                                    }],
                            })(
                                <RadioGroup options={sixOptions}  />
                            )}
                        </FormItem> 
                    </Col>

                {addType=="normal" ? 
                    <Col span={12}>
                        <FormItem 
                            label={'居民类型:'}
                            {...formItemLayout7}
                        >
                            {getFieldDecorator(`form_type`, {
                                    initialValue: singleResidentList.flowIsPermanent,
                                    rules: [{
                                        required: true, message: '请输入居民类型',
                                    }],
                            })(
                                <RadioGroup 
                                    options={typeOptions} 
                                    disabled={residentType=='add'?false:true} 
                                    onChange={(e) => {
                                        let type = e.target.value
                                        if(type == "常住人员" || type == "人户分离" || type == "境外人员") {
                                            this.props.changev({
                                                isRequired: false
                                            })
                                        } else {
                                            this.props.changev({
                                                isRequired: true
                                            })
                                        }
                                        if(type == "境外人员") {
                                            this.props.changev({
                                                isForeign: true
                                            })
                                        } else {
                                            this.props.changev({
                                                isForeign: false
                                            })
                                        }
                                    }}
                                />
                            )}
                        </FormItem> 
                    </Col>                    
                :''}
                </Col>
            </Row>
            
            {
                isForeign ? 
                <Row>
                    <Col span={24}>
                        <Col span={9}>
                                <FormItem 
                                    label="护照号:"
                                    {...formItemLayout6}
                                >
                                    {getFieldDecorator('form_passport',{
                                        initialValue: singleResidentList.passport,
                                      
                                        rules: [
                                            {required: true, message: '护照号'}],
                                    })(
                                        <Input placeholder="请输入护照号"/>
                                    )}
                                </FormItem>
                        </Col>
                    </Col> 
                </Row>
                :
                <Row>
                    <Col span={24}>
                        <Col span={9}>
                                <FormItem 
                                    label="身份证号:"
                                    {...formItemLayout6}
                                >
                                    {getFieldDecorator('form_idCard',{
                                        initialValue: {
                                            input: singleResidentList.idCard,
                                            button: false
                                        },
                                        rules: [
                                            {required: true, message: '请输入身份证号'},
                                            { validator: this.isShenFenZheng }],
                                    })(
                                        <InputButtonForm btnChange={readCard}/>
                                    )}
                                </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem 
                                label={'身份证地址:'}
                                {...formItemLayout3}
                            >
                                {getFieldDecorator(`form_address`, {
                                        initialValue: singleResidentList.address,
                                        rules: [{
                                            required: true, message: '请输入身份证地址',
                                        }],
                                })(
                                    <Input placeholder="请输入身份证地址"/>
                                )}
                            </FormItem> 
                        </Col>
                    </Col> 
                </Row>
            }

            <Row>
                {addType=="normal" ? 
                    <Col span={24}>
                        <Col span={9}>
                                <FormItem 
                                    label="户籍地址:"
                                    {...formItemLayout3}
                                >
                                    {getFieldDecorator('form_house_address',{
                                        initialValue: singleResidentList.householdRegistration,
                                        rules: [{
                                            required: isRequired,
                                            message: '请输入户籍地址',
                                        }],
                                    })(
                                        <Cascader 
                                            options={this.state.casCaderOptions}
                                            onChange={this.cascaderChange}
                                            loadData={this.loadData}
                                            style={{"width": "20rem"}}
                                            placeholder="请输入户籍地址"
                                            disabled={lkbIsWrong}
                                            changeOnSelect
                                        />
                                    )}
                                </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem 
                                label={'详细地址:'}
                                {...formItemLayout3}
                            >
                                {getFieldDecorator(`form_detail_address`, {
                                        initialValue: singleResidentList.householdsAddress,
                                        rules: [{
                                            required: isRequired, message: '请输入详细地址',
                                        }],
                                })(
                                    <Input placeholder="请输入详细地址" disabled={lkbIsWrong}/>
                                )}
                            </FormItem> 
                        </Col>
                    </Col>              
                :
                    <Col span={24}>
                        <Col span={9}>
                                <FormItem 
                                    label="户籍地址:"
                                    {...formItemLayout3}
                                >
                                    {getFieldDecorator('form_house_address',{
                                        initialValue: singleResidentList.householdRegistration,
                                    })(
                                        <Cascader 
                                            options={this.state.casCaderOptions}
                                            onChange={this.cascaderChange}
                                            loadData={this.loadData}
                                            style={{"width": "20rem"}}
                                            placeholder="请输入户籍地址"
                                            disabled={lkbIsWrong}
                                            changeOnSelect
                                        />
                                    )}
                                </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem 
                                label={'详细地址:'}
                                {...formItemLayout3}
                            >
                                {getFieldDecorator(`form_detail_address`, {
                                        initialValue: singleResidentList.householdsAddress,
                                })(
                                    <Input placeholder="请输入详细地址" disabled={lkbIsWrong}/>
                                )}
                            </FormItem> 
                        </Col>
                    </Col>
                }

            </Row>
            <Row>
                <Col span={24}>
                    <Col span={9}>
                        <FormItem 
                            label={'出生日期:'}
                            {...formItemLayout3}
                        >
                            {getFieldDecorator(`form_birthDate`,{
                                    initialValue: singleResidentList.birthDate?moment(utils.timeToDate(singleResidentList.birthDate), dateFormat):'',
                                    rules: [{
                                        required: true, message: '请输入出生日期',
                                    }],
                            })(
                                <DatePicker format={dateFormat} showToday={false} placeholder="出生日期"/> 
                            )}
                        </FormItem> 
                    </Col>
                    <Col span={9}>
                        <FormItem 
                            label={'手机号:'}
                            {...formItemLayout4}
                        >
                            {getFieldDecorator(`form_mobile`, {
                                initialValue: {
                                    input: singleResidentList.mobile?singleResidentList.mobile.split('-')[1]:'',
                                    select: singleResidentList.mobile?singleResidentList.mobile.split('-')[0]:'+86',
                                },
                                rules: [
                                    {
                                        required: true, message: '请输入手机号',
                                    },
                                    {
                                        validator: this.isPhoneNumber
                                    }
                                ],
                            })(
                                <InputSelectForm />
                            )}
                        </FormItem> 
                    </Col>
                    
                </Col> 
            </Row>
            <Row>
                <Col span={24}>
                    <Col span={9}>
                        <FormItem 
                            label={'身份证有效期:'}
                            {...formItemLayout6}
                        >
                            {getFieldDecorator(`form_idCardDate`, {
                                initialValue: {
                                    datepicker: singleResidentList.idCardDate?moment(utils.timeToDate(singleResidentList.idCardDate), dateFormat):'',
                                    checkbox: []
                                }
                            })(
                                <DatePickerCheckboxGroup />
                            )}
                        </FormItem> 
                    </Col>
                    <Col span={9}>
                        <FormItem 
                            label={'民族/国籍:'}
                            {...formItemLayout3}
                        >
                            {getFieldDecorator(`form_racial`, {
                                initialValue: singleResidentList.racial,
                            })(
                                <Input placeholder="请输入民族/国籍"/>   
                            )}
                        </FormItem> 
                    </Col>
                </Col> 
            </Row>

        {addType=="normal" ? 
            <div>
            <Row>
                <Col span={24}>
                    <Col span={6}>
                        <FormItem 
                            label={'政治面貌:'}
                            {...formItemLayout1}
                        >
                            {getFieldDecorator(`form_politicsStatus`, {
                                initialValue: singleResidentList.politicsStatus,
                            })(
                                <Select
                                    showSearch
                                    style={{ width: '100%' }} 
                                    onChange={this.buildChange}>
                                    <Option key="群众">群众</Option>
                                    <Option key="中央预备党员">中央预备党员</Option>
                                    <Option key="中共党员">中共党员</Option>
                                    <Option key="民主党派">民主党派</Option>
                                    <Option key="无党派人士">无党派人士</Option>
                                    <Option key="反动分子">反动分子</Option>
                                </Select>
                            )}
                            
                        </FormItem> 
                    </Col>
                    <Col span={3} className="build-btns"></Col>
                    <Col span={6}>
                        <FormItem 
                            label={'婚姻状况:'}
                            {...formItemLayout1}
                        >
                            {getFieldDecorator(`form_marriage`, {
                                initialValue: singleResidentList.marriage,
                            })(
                                <Select
                                    showSearch
                                    style={{ width: '100%' }} 
                                    onChange={this.buildChange}>
                                    <Option key="未知">未知</Option>
                                    <Option key="未婚">未婚</Option>
                                    <Option key="已婚">已婚</Option>
                                    <Option key="离异">离异</Option>
                                    <Option key="丧偶">丧偶</Option>
                                </Select>
                            )}
                        </FormItem> 
                    </Col>
                </Col> 
            </Row>
            <Row>
                <Col span={24}>
                    <Col span={9}>
                        <FormItem 
                            label={'电子邮箱:'}
                            {...formItemLayout3}
                        >
                            {getFieldDecorator(`form_email`,{
                                initialValue: singleResidentList.email,
                                rules: [{
                                    type: 'email', message: '请输入正确的电子邮箱',
                                }],
                            })(
                                <Input placeholder="请输入电子邮箱"/>   
                            )}
                        </FormItem> 
                    </Col>
                    <Col span={9}>
                        <FormItem 
                            label={'微信号:'}
                            {...formItemLayout3}
                        >
                            {getFieldDecorator(`form_wx`, {
                                initialValue: singleResidentList.wx,
                            })(
                                <Input placeholder="请输入微信号"/>   
                            )}
                        </FormItem> 
                    </Col>
                </Col> 
            </Row>
            <Row>
                <Col span={24}>
                        <Col span={9}>
                            <FormItem 
                                label={'监护人手机号:'}
                                {...formItemLayout4}
                            >
                                {getFieldDecorator(`form_guardianMobile`, {
                                    initialValue: {
                                        input: singleResidentList.guardianMobile?singleResidentList.guardianMobile.split('-')[1]:'',
                                        select: singleResidentList.guardianMobile?singleResidentList.guardianMobile.split('-')[0]:'+86',
                                    },
                                    rules: [{
                                        validator: this.isPhoneNumberNotRequire
                                    }]
                                })(
                                    <InputSelectForm />
                                )}
                            </FormItem> 
                        </Col>
                </Col> 
            </Row>
            </div>
        :''}
            <Row>
                <Col span={24}>
                    <Col span={9}>
                        <FormItem 
                            label={'紧急联系人:'}
                            {...formItemLayout3}
                        >
                            {getFieldDecorator(`form_emergencyContact`, {
                                initialValue: singleResidentList.emergencyContact
                            })(
                                <Input placeholder="请输入紧急联系人"/>   
                            )}
                        </FormItem> 
                    </Col>
                    <Col span={9}>
                            <FormItem 
                                label={'紧急联系人手机号:'}
                                {...formItemLayout4}
                            >
                                {getFieldDecorator(`form_emergencyContactMobile`, {
                                    initialValue: {
                                        input: singleResidentList.emergencyContactMobile?singleResidentList.emergencyContactMobile.split('-')[1]:'',
                                        select: singleResidentList.emergencyContactMobile?singleResidentList.emergencyContactMobile.split('-')[0]:'+86',
                                    },
                                    rules: [{
                                        validator: this.isPhoneNumberNotRequire
                                    }]
                                })(
                                    <InputSelectForm />
                                )}
                            </FormItem> 
                        </Col>
                </Col> 
            </Row>
        {addType=="normal" ? 
            <Row>
                <Col span={24}>
                    <Col span={18}>
                        <FormItem 
                            label={'居民标签:'}
                            {...formItemLayout5}
                        >
                            {getFieldDecorator(`form_userType`, {
                                initialValue: singleUserType&&singleUserType.length>0? singleUserType.map(item => item.valueId):[]
                            })(
                                <CheckboxGroup options={userTypeOptions} />  
                            )}
                        </FormItem> 
                    </Col>
                </Col> 
            </Row>
        :''}
            <Row>
                <Col span={24}>
                    <Col span={18}>
                        <FormItem 
                            label={'备注:'}
                            {...formItemLayout5}
                        >
                            {getFieldDecorator(`form_remark`, {
                                initialValue: singleResidentList.remark
                            })(
                                <TextArea 
                                    placeholder="请输入备注" 
                                    autosize={{ minRows: 2, maxRows: 6 }} />  
                            )}
                        </FormItem> 
                    </Col>
                </Col> 
            </Row>
            <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
            </Modal>
        </div>
        )
    }
}

export default ResidentEdit;
