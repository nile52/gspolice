/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Form, Table, Button, Row, Col, Card, Input, Select, Pagination, Modal, Upload, Icon, Radio, DatePicker } from 'antd';
import BreadCrumbCustom from '../../../../component/BreadCrumbCustom/BreadCrumbCustom'
import InputSelectForm from '../../../../component/InputSelectForm/InputSelectForm'
import DatePickerCheckboxGroup from '../../../../component/DatePickerCheckboxGroup/DatePickerCheckboxGroup'
import axios from 'axios'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
import {
    WEI_HOUSE,
    CAS_LOGIN,
    CAS_CASCHECK
} from '../../../../fetch/apis'
import * as actions from '../actions/HousesManage'
import utils from '../../../../util/util.js'
import SearchInput from './SearchInput'
import '../style/HousesManage.less'
let timeout;
let currentValue;


@connect(
    state => state,
    {...actions}
)

class HousesManage extends Component {
    constructor() {
        super()
        this.buildChange = this.buildChange.bind(this)
        this.unitChange = this.unitChange.bind(this)
        this.layerChange = this.layerChange.bind(this)
        this.getRoomList = this.getRoomList.bind(this)
        this.submit = this.submit.bind(this)
        this.pageOnChange = this.pageOnChange.bind(this)
        this.clear = this.clear.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.state = {
            addVisible: false,
            modifyVisible: false,
            houseId: '',
            HousingMasterData: ''
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
        this.props.getHouse({id: data.id}, () => {
            this.setState({ houseId: data.id });
            this.showModal(type)
        })
    }

    showModal = (type) => {
        this.setState({
          [type]: true,
        });
    }

    getRoomList = (params) => {
        let _this = this
        const userKey = this.props.HousesManage.userKey
        if(params.build && params.unit) {
          const PARAMS = {
            userKey: userKey,
            zoneId: this.props.HousesManage.id,
            storiedBuildingId: this.props.HousesManage.buildJson[params.build].id,
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
                    room: newRoom,
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
                        toastr.error('网络异常')
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
                unit: 'all',
                layer: 'all',
                room: 'all'
            });
            return;
        }
        let unit = this.props.HousesManage.buildJson[value].unit
        let layer = this.props.HousesManage.buildJson[value].layer
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
            unit: 'all',
            layer: 'all'
        });
    }

    unitChange = (value) => {
        this.props.form.setFieldsValue({
            unit: value,
            layer: 'all',
            room: 'all'
        });
        this.getRoomList({
            build: this.props.form.getFieldsValue().build,
            unit: value === 'all'?undefined:value
        })
    }

    layerChange = (value) => {
        this.props.form.setFieldsValue({
          layer: value,
        });
        this.getRoomList({
            build: this.props.form.getFieldsValue().build,
            unit: this.props.form.getFieldsValue().unit,
            layer: value === 'all'?undefined:value
        })
    }

    submit = () => {
        let params = {}
        let formData = this.props.form.getFieldsValue()
        params.storiedBuildingId = formData.build ? formData.build === 'all' ? undefined :this.props.HousesManage.buildJson[formData.build].id : undefined
        params.unit = formData.unit ? formData.unit === 'all' ? undefined : formData.unit : undefined
        params.layer = formData.layer ? formData.layer === 'all' ? undefined : formData.layer : undefined
        params.room = formData.room ?  formData.room === 'all' ? undefined : formData.room : undefined
        params.areaStart = formData.areaStart ? formData.areaStart : undefined
        params.areaEnd = formData.areaEnd ? formData.areaEnd : undefined
        params.usage = formData.usage ? formData.usage === 'all' ? undefined : formData.usage : undefined
        params.commercial = formData.commercial ? formData.commercial === 'all' ? undefined : formData.commercial : undefined
        params.oriented = formData.oriented ? formData.oriented === 'all' ? undefined : formData.oriented : undefined
        this.props.getHouseList(params)
    }

    edit = () => {
        let params = {}
        let formData = this.props.form.getFieldsValue()
        // console.log(formData);
        // console.log(this.state.houseId)
        // if (!formData.edit_landlord) {
        //     Modal.info({
        //         title: '提示',
        //         content: '请选择房东'
        //     })
        // }

        params.id = this.state.houseId
        params.area       = formData.edit_area ? formData.edit_area : ''
        params.commercial = formData.edit_commercial ? formData.edit_commercial=='否'? '0': '1': ''
        params.roomMaster   = formData.edit_landlord ? formData.edit_landlord : ''
        params.oriented   = formData.edit_oriented ? formData.edit_oriented : ''
        params.usage      = formData.edit_usage ? formData.edit_usage : ''
        params.pictureAddress = formData.edit_pictureAddress ? formData.edit_pictureAddress[0].thumbUrl : ''
        this.props.updateHouse(params, () => {
            this.setState({
                'modifyVisible': false,
            });
            this.props.getHouseList()
        })
    }   

    clear() {
        this.props.form.resetFields()
        this.props.getHouseList()
    }

    pageOnChange(page) {
        this.props.getHouseList(this.props.HousesManage.currentParams, page)
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
            this.props.getBuildList()
            this.props.getHouseList()
        }
    }

    componentDidMount() {
        this.props.form.resetFields()
        this.props.getBuildList()
        this.props.getHouseList()
        this.props.getThirdToken()
    }

    getBuildName(data){
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

    getHouseName(data){
        let newRoom = ''
        if(data) {
            let newRoomArr = (data+'').split('-')
            let newRoomArrLength = newRoomArr.length
            if( newRoomArrLength > 1) {
                newRoom = newRoomArr[newRoomArrLength -1]
            } else {
                newRoom = data
            }
        }
        return newRoom
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
        // console.log(v);
        this.setState({ value: v });
        // console.log(this.state.value)
    }

    render() {
        let url = `http://${this.props.HousesManage.url}/hrms/#!/rented-house?userId=1&fromC=1&isThird=true&token=`
        const { getFieldDecorator } = this.props.form;
        const {
            buildList,
            unitList,
            layerList,
            houseList,
            houseInfo,
            roomList,
            total,
            isRequired,
            current,
            pageSize,
            token,
            HousingMasterData,
        } = this.props.HousesManage
        const {
            addVisible,
            modifyVisible,
        } = this.state

        const toChildProps = {
            value: houseInfo ? houseInfo.landlord : '',
            HousingMasterData: this.props.HousesManage.HousingMasterData,
            getSelectHousingMaster: this.props.getSelectHousingMaster
        }


        const validateHouseArr = [
            'commercial',
            'usage',
        ]

        const dateFormat = 'YYYY-MM-DD';
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        let form_upload_pictureAddress = null
        if(houseList.pictureAddress) {
            form_upload_pictureAddress = [{
                uid: -1,
                name: 'pictureAddress.png',
                status: 'done',
                url: houseList.pictureAddress,
                thumbUrl: houseList.pictureAddress,
            }]
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
          }
        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
                key: 'num',
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
                title: '单元号',
                dataIndex: 'unitname',
                key: 'unitname',
            }, {
                title: '房屋名称',
                dataIndex: 'roomname',
                render: (data) => {
                    let newRoom = ''
                    if(data) {
                        let newRoomArr = (data+'').split('-')
                        let newRoomArrLength = newRoomArr.length
                        if( newRoomArrLength > 1) {
                            newRoom = newRoomArr[newRoomArrLength -1]
                        } else {
                            newRoom = data
                        }
                    }
                    return newRoom
                }
            }, {
                title: '所在楼层',
                dataIndex: 'currentfloor',
                key: 'currentfloor',
            }, {
                title: '房屋面积',
                dataIndex: 'area',
                key: 'area',
            }, {
                title: '房屋朝向',
                dataIndex: 'oriented',
                key: 'oriented',
            }, {
                title: '使用情况',
                dataIndex: 'usage',
                key: 'usage',
                render: (data) => {                   
                    return <span>{utils.getHouseUsage(data)}</span>
                }
            }, {
                title: '是否商用',
                dataIndex: 'commercial',
                key: 'commercial',
            }, {
                title: '档案',
                dataIndex: 'archives',
                key: 'archives',
            }, {
                title: '数据来源',
                dataIndex: 'state',
                key: 'state',
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <div>
                        <Button onClick={() => {
                            // this.props.changev({
                            //     houseType: 'edit',
                            //     houseId: record
                            // })
                            this.modify('modifyVisible', record)
                        }}>编辑</Button>&nbsp;
                        <Button type="danger" disabled onClick={() => Modal.confirm({
                            title: '删除',
                            content: '确定要删除此条房屋信息吗？',
                            okText: '确认',
                            cancelText: '取消',
                            onOk() {
                                return new Promise((resolve, reject) => {
                                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                                }).catch(() => console.log('Oops errors!'));
                            },
                            onCancel() {},
                        })}>删除</Button>
                    </div>
                ),
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


        var data = HousingMasterData
        var houseMasteroptions;
    
        if(data){
            houseMasteroptions = data.map(d => <Option value={d.id}>{d.name}{d.mobile}</Option>);
        }else{
            houseMasteroptions = []
        }
    
        // console.log(houseMasteroptions)
        
        buildOptions.unshift(<Option key="all">所有</Option>)
        unitOptions.unshift(<Option key="all">所有</Option>)
        layerOptions.unshift(<Option key="all">所有</Option>)
        roomOptions.unshift(<Option key="all">所有</Option>)
        return (
          <div id="housesmanage">
                <BreadCrumbCustom first="基本信息管理" second="房屋信息管理"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="房屋信息管理">
                                {/* 所在位置 和 房间号 */}
                                <Row>
                                    <Col span={24}>
                                        <Col span={6}>
                                            <FormItem 
                                                label={'所在位置:'}
                                                {...formItemLayout1}
                                            >
                                                {getFieldDecorator(`build`, {
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
                                                {getFieldDecorator(`unit`, {
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
                                                {getFieldDecorator(`layer`, {
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
                                                {getFieldDecorator(`room`, {
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
                                {/* 房屋面积 和 使用情况 */}
                                <Row>
                                    <Col span={24}>
                                        <Col span={6}>
                                            <FormItem 
                                                label={'房屋面积:'}
                                                {...formItemLayout1}
                                            >
                                                {getFieldDecorator(`areaStart`)(
                                                    <Input placeholder="请输入最小面积"/>   
                                                )}
                                            </FormItem> 
                                        </Col>
                                        <Col span={1} className="build-btns">
                                            <span className="house-unit">m²</span>
                                        </Col>
                                        <Col span={1} className="build-btns">
                                            <span className="house-unit">--</span>
                                        </Col>
                                        <Col span={3}>
                                            <FormItem 
                                                {...formItemLayout2}
                                            >
                                                {getFieldDecorator(`areaEnd`)(
                                                    <Input placeholder="请输入最大面积"/>   
                                                )}
                                            </FormItem> 
                                        </Col>
                                        <Col span={1} className="build-btns">
                                            <span className="house-unit">m²</span>
                                        </Col>
                                        <Col span={6}>
                                            <FormItem 
                                                label={'使用情况:'}
                                                {...formItemLayout4}
                                            >
                                                {getFieldDecorator(`usage`, {
                                                    initialValue: 'all',
                                                })(
                                                    <Select
                                                        showSearch
                                                        style={{ width: '100%' }} >
                                                        <Option value="all">所有</Option>
                                                        <Option value="personalUse">自住</Option>
                                                        <Option value="rentOut">出租</Option>
                                                        <Option value="idle">闲置</Option>
                                                        <Option value="closeDown">查封</Option>
                                                        <Option value="other">其他</Option>
                                                    </Select>
                                                )}
                                            </FormItem> 
                                        </Col>
                                    </Col> 
                                </Row> 
                                {/* 是否商用 和 房屋朝向 */}
                                <Row>
                                    <Col span={24}>
                                        <Col span={6}>
                                            <FormItem 
                                                label={'是否商用:'}
                                                {...formItemLayout1}
                                            >
                                                {getFieldDecorator(`commercial`, {
                                                    initialValue: 'all',
                                                })(
                                                    <Select
                                                        showSearch
                                                        style={{ width: '100%' }}>
                                                        <Option value="all">所有</Option>
                                                        <Option value="true">是</Option>
                                                        <Option value="false">否</Option>
                                                    </Select>
                                                )}
                                            </FormItem> 
                                        </Col>
                                        <Col span={6}>
                                            <FormItem 
                                                label={'房屋朝向:'}
                                                {...formItemLayout3}
                                            >
                                                {getFieldDecorator(`oriented`, {
                                                    initialValue: 'all',
                                                })(
                                                    <Select
                                                        showSearch
                                                        style={{ width: '100%' }}>
                                                        <Option value="all">所有</Option>
                                                        <Option value="正东">正东</Option>
                                                        <Option value="正南">正南</Option>
                                                        <Option value="正西">正西</Option>
                                                        <Option value="正北">正北</Option>
                                                        <Option value="东南">东南</Option>
                                                        <Option value="西南">西南</Option>
                                                        <Option value="东北">东北</Option>
                                                        <Option value="西北">西北</Option>
                                                    </Select>
                                                )}
                                            </FormItem> 
                                        </Col>
                                        <Col span={1} className="build-btns"></Col>
                                        <Col span={3} className="build-btns">
                                            <Button type="primary" style={{width: 120}} onClick={this.submit}>查询</Button>
                                        </Col>
                                        <Col span={3} className="build-btns">
                                            <Button style={{width: 120}} onClick={(type) => this.handleOk('addVisible')}>新增</Button>
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
                                <Table columns={columns} dataSource={houseList} pagination={false}/>
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
                    visible={addVisible}
                    title="房屋录入"
                    width='90%'
                    onCancel={(type) => {
                        this.handleCancel('addVisible')
                    }}
                    footer={null}
                >
                   <div className="dahua-iframe-parent">
                       <iframe 
                        src={`${url}${token}`} 
                        frameborder="0"
                        style={{width:'100%', minHeight:'70rem', overflow:'auto'}}
                        width="100%" 
                        scrolling="no" 
                        frameBorder="0"
                        />
                   </div>
                </Modal>


                <Modal
                    visible={modifyVisible}
                    title="房屋信息管理"
                    width='90%'
                    onCancel={(type) => {
                        this.handleCancel('modifyVisible')
                    }}
                    footer={[
                        <Button key="back" onClick={(type) => {
                            _this.props.form.resetFields(validateHouseArr)
                            _this.props.changev({
                                houseInfo: [],
                            })
                            this.handleCancel('modifyVisible')
                        }}>取消</Button>,
                        <Button type="primary" onClick={this.edit}>保存修改</Button>
                    ]}
                >

                    {houseInfo ? 
                        <div>
                            <Row>
                                <Col span={24}>
                                    <Col span={9}>
                                        <h2>{this.getBuildName(houseInfo.name)}{houseInfo.unit}单元{this.getHouseName(houseInfo.room)}室</h2>
                                    </Col>
                                </Col>
                            </Row>      
                            <Row>
                                <Col span={24}>
                                    <Col span={9}>
                                        <FormItem 
                                            label={'是否商用:'}
                                            {...formItemLayout3}
                                        >
                                            {getFieldDecorator(`edit_commercial`, {
                                                    initialValue: houseInfo.commercial ? '是': '否',
                                            })(
                                                <Select
                                                    style={{ width: '100%' }} >
                                                    <Option value="false">否</Option>
                                                    <Option value="true">是</Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={9}>
                                        <FormItem 
                                            label={'使用情况:'}
                                            {...formItemLayout3}
                                        >
                                            {getFieldDecorator(`edit_usage`, {
                                                initialValue: houseInfo.usage,
                                                rules: [{
                                                    required: true, message: '请选择使用情况',
                                                }],
                                            })(
                                                <Select
                                                    style={{ width: '100%' }} >
                                                    
                                                    <Option key="rentOut">长租</Option><Option key="personalUse">自住</Option>
                                                    <Option key="Internet">网约</Option>
                                                    <Option key="groupLive">群租</Option>
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
                                            {...formItemLayout3}
                                                label="户型图"
                                            >
                                            {getFieldDecorator('edit_pictureAddress', {
                                                valuePropName: 'fileList',
                                                getValueFromEvent: this.normFile,
                                                initialValue: form_upload_pictureAddress,
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
                                    <Col span={9}>
                                        <FormItem 
                                            label={'房东:'}
                                            {...formItemLayout3}
                                        >
                                            {getFieldDecorator(`edit_landlord`, {
                                                initialValue: houseInfo.landlord,
                                            })(
                                                <Select
                                                    showSearch
                                                    // value={this.state.value}
                                                    // placeholder={this.props.placeholder}
                                                    style={{width:'100%'}}
                                                    defaultActiveFirstOption={false}
                                                    // showArrow={false}
                                                    filterOption={false}
                                                    onSearch={this.handleSearch}
                                                    onChange={this.handleChange}
                                                    // notFoundContent={null}
                                                >
                                                    {houseMasteroptions}
                                        
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
                                            label={'房屋面积（平方）:'}
                                            {...formItemLayout3}
                                        >
                                            {getFieldDecorator(`edit_area`, {
                                                    initialValue: houseInfo.area,
                                            })(
                                                <Input placeholder="请输入房屋面积"/>
                                            )}
                                        </FormItem> 
                                    </Col>                        
                                    <Col span={9}>
                                        <FormItem 
                                            label={'房屋朝向:'}
                                            {...formItemLayout3}
                                        >
                                            {getFieldDecorator(`edit_oriented`, {
                                                initialValue: houseInfo.oriented,
                                            })(
                                                <Select
                                                    style={{ width: '100%' }} >
                                                    <Option value="正东">正东</Option>
                                                    <Option value="正南">正南</Option>
                                                    <Option value="正西">正西</Option>
                                                    <Option value="正北">正北</Option>
                                                    <Option value="东南">东南</Option>
                                                    <Option value="西南">西南</Option>
                                                    <Option value="东北">东北</Option>
                                                    <Option value="西北">西北</Option>
                                                </Select>
                                            )}
                                        </FormItem> 
                                    </Col>
                                </Col> 
                            </Row>

                        </div>                  
                    :''}
                            
                </Modal>


          </div>
        );
    }
}
export default Form.create()(HousesManage);