/* eslint-disable */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createForm} from 'rc-form';
import { Form, Table, Button, Row, Col, Input, Select, Pagination, Modal, Card, Spin, Divider, DatePicker} from 'antd';
// 日期中文
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import BreadCrumbCustom from '../../../../component/BreadCrumbCustom/BreadCrumbCustom'
const FormItem = Form.Item;
const Option = Select.Option;
import * as actions from '../actions/ParkingManage'
import '../style/ParkingManage.less'

@connect(
    state => state,
    {...actions}
)

class ParkingManage extends Component {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.addPlakingPosition = this.addPlakingPosition.bind(this)
        this.pageOnChange = this.pageOnChange.bind(this)
        this.state={
            page: 1,
            addPlakingLotVisible: false,
            addPlakingPositionVisible: false,
            modifyPlakingPositionVisible: false,
            deletePlakingPositionVisible: false
        }
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
                    content: '请选择一个停车位'
                })
                return;
            }
            console.log(type, item )
            this.setState({
                title:type=='edit'?'编辑停车位':'查看详情',
                modifyPlakingPositionVisible:true,
                positionInfo:item,
                type
            })
        }else if(type=="delete"){
            if(!item){
                Modal.info({
                    title: '信息',
                    content: '请选择一个停车位'
                })
                return;
            } else {
              this.props.deleteParkingSpaceCodingList(item.id, () => {
                this.props.getParkingSpaceCodingList()
              })
            }
            
        }
      }

    // 查询停车位
    submit = (e) => {
        let _this = this
        e.preventDefault();
        this.props.form.validateFields(["parking", "parkingNum", "parkingType", "parkingStatus"], (error, values) => {
            if (!error) {
                console.log(values)
                let params = {}
                // 停车场名
                params.parkingLotId = values.parking==="all"?undefined:values.parking
                params.parkingSpaceCoding = values.parkingNum==""?undefined:values.parkingNum
                params.positionType = values.parkingType==="all"?undefined:values.parkingType
                params.state = values.parkingStatus==="all"?undefined:values.parkingStatus
                this.props.getParkingSpaceCodingList(params)
            }
        });
    }

    // 新增停车场
    addPlakingLot = () => {
        let _this = this
        this.props.form.validateFields(["add_lotName", "add_lotType", "add_lotNum"], (error, values) => {
            if (!error) {
                let params = {}
                // 停车场名
                params.name = values.add_lotName
                params.type = values.add_lotType
                params.number = values.add_lotNum
                this.props.addParkingLot(params, () => {
                    _this.handleCancel('addPlakingLotVisible')
                    _this.props.getParkingSpaceCodingList()
                    _this.props.getParkingLotList()
                })
                
            }
        });
    }

    // 批量新增停车位
    addPlakingPosition = () => {
        let _this = this
        this.props.form.validateFields(["add_parking", "add_carType", "add_prefix", "add_front", "add_end"], (error, values) => {
            if (!error) {
                let params = {}
                // 停车场名
                params.parkingLotId = values.add_parking === ''?undefined:values.add_parking
                params.vehicleType = values.add_carType === ''?undefined:values.add_carType
                params.head = values.add_prefix === ''?undefined:values.add_prefix
                params.start = values.add_front === ''?undefined:values.add_front
                params.end = values.add_end === ''?undefined:values.add_end
                this.props.addParkingSpaceCodingList(params, () => {
                    _this.handleCancel('addPlakingPositionVisible')
                    _this.props.getParkingSpaceCodingList()
                })
                
            }
        });
    }

    // 修改停车位
    modifyPlakingPosition = () => {
        let _this = this
        this.props.form.validateFields([
            "modify_parking", 
            "modify_carType", 
            "modify_carNo", 
            "modify_chargingCoding", 
            "modify_equipmentChannelId",
            "modal_expireDate",
            "modify_positionType",
            "modify_otherEquit",
            "modify_otherEquitNo"], (error, values) => {
            if (!error) {
                let params = {}
                // 停车场名
                params.id = this.state.positionInfo.id;
                params.parkingLotId = values.modify_parking
                params.vehicleType = values.modify_carType === ''?undefined:values.modify_carType
                params.parkingSpaceCoding = values.modify_carNo === ''?undefined:values.modify_carNo
                params.chargingCoding = values.modify_chargingCoding === ''?undefined:values.modify_chargingCoding
                params.equipmentChannelId = values.modify_equipmentChannelId === ''?undefined:values.modify_equipmentChannelId
                params.expireDate = values.modal_expireDate === ''?undefined:values.modal_expireDate
                params.positionType = values.modify_positionType === ''?undefined:values.modify_positionType
                this.props.updatePlakingPosition(params, () => {
                    _this.handleCancel('modifyPlakingPositionVisible')
                    _this.props.getParkingSpaceCodingList()
                    this.props.form.resetFields()
                })
                
            }
        });
    }

    // 删除停车位
    deletePlakingPosition = () => {
        let _this = this
        this.props.form.validateFields(["delete_parking"], (error, values) => {
            if (!error) {
                let params = {}
                // 停车场名
                params.id = this.props.ParkingManage.parkingLotJson[values.delete_parking].id
                this.props.deleteParkingSpaceCodingList(params, () => {
                    _this.handleCancel('deletePlakingPositionVisible')
                    _this.props.getParkingSpaceCodingList()
                })
            }
        });   
    }

    pageOnChange(page) {
        this.setState({
            page
        })
        this.props.getParkingSpaceCodingList(this.props.ParkingManage.currentParams, page)
    }

    handleOk = (type) => {
        this.setState({ [type]: true });
    }

    handleCancel = (type) => {
        this.props.form.resetFields(["add_parking", "add_carType", "add_prefix", "add_front", "add_end", "delete_parking"])
        this.props.form.resetFields(["modify_parking", "modify_carType", "modify_carNo", "modify_chargingCoding", "modify_equipmentChannelId", "modal_expireDate", "modify_positionType"])
        this.setState({ [type]: false });
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    componentDidMount() {
        this.props.getParkingLotList()
        this.props.getParkingSpaceCodingList()
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            addPlakingLotVisible,
            addPlakingPositionVisible,
            modifyPlakingPositionVisible,
            deletePlakingPositionVisible
        } = this.state
        const {
            parkingLotList,
            parkingSpaceCodingList,
            parkLoading,
            pageSize,
            total,
            current,
        } = this.props.ParkingManage
        
        const data = parkingSpaceCodingList.length>0?parkingSpaceCodingList.map((item, index) => {
            let positionType = ""
            switch(item.positionType) {
                case "0":
                    positionType = "公有"
                    break
                case "1":
                    positionType = "专属"
                    break
                case "2":
                    positionType = "自有"
                    break
                case "3":
                    positionType = "私有"
                    break
                case "4":
                    positionType = "其他"
                    break
            }

            let positionStatus = ""
            switch(item.state) {
                case 0:
                    positionStatus = "空闲"
                    break
                case 1:
                    positionStatus = "已使用"
                    break
            }
            item.num = ++index + (this.state.page-1)*20
            item.parking= item.name
            item.parkingNum= item.parkingSpaceCoding
            item.parkingType= positionType
            item.parkingStatus= positionStatus
            return item
            
        }):[]

        let _this = this
        
          const columns = [{
            title: '序号',
            dataIndex: 'num',
            key: 'num',
          }, {
            title: '所在停车场',
            dataIndex: 'parking',
            key: 'parking',
          }, {
            title: '车位号',
            dataIndex: 'parkingNum',
            key: 'parkingNum',
          }, {
            title: '车位类型',
            dataIndex: 'parkingType',
            key: 'parkingType',
          },{
            title: '车位状态',
            dataIndex: 'parkingStatus',
            key: 'parkingStatus',
          },{
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <span>
                  {/* <a href="javascript:;" onClick={(type) => this.handleOperator('detail', record)}>详情</a>
                  <Divider type="vertical" />                     */}
                  <Button onClick={() => this.handleOperator('edit', record)}>修改</Button>
                  <Divider type="vertical" />
                  <Button type="danger" 
                  onClick={() => Modal.confirm({
                    title: '删除',
                    content: '确定要删除此条停车位信息吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() { _this.handleOperator('delete', record)},
                })}>删除</Button>
                </span>
            ),
          }];
          const formItemLayout1 = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8  },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 12 },
            },
          }
          let parkLotOptions, positionTypeOptions,positionStatusOptions, modalParkLotOptions;
          if (parkingLotList && parkingLotList.length > 0) {
            parkLotOptions = parkingLotList.map((item) => {
              return <Option value={item.id}>{item.name}</Option>;
            });
            modalParkLotOptions = parkingLotList.map((item) => {
                return <Option value={item.id}>{item.name}</Option>;
              });
          } else {
            parkLotOptions = [];
            modalParkLotOptions = []
          }
          let positionTypeList = [
            {key: '0', name: '公有'},
            {key: '1', name: '专属'},
            {key: '2', name: '自有'},
            {key: '3', name: '私有'},
            {key: '4', name: '其他'}
          ]
          let positionStatusList = [
            {key: '0', name: '空闲'},
            {key: '1', name: '已使用'},
          ]
          positionTypeOptions = positionTypeList.map((item) => {
            return <Option key={item.key}>{item.name}</Option>;
          });
          positionStatusOptions = positionStatusList.map((item) => {
            return <Option key={item.key}>{item.name}</Option>;
          });
          parkLotOptions.unshift(<Option key="all" value="all">请选择</Option>)
          positionTypeOptions.unshift(<Option key="all" value="all">请选择</Option>)
          positionStatusOptions.unshift(<Option key="all" value="all">请选择</Option>)

          const positionInfo = this.state.positionInfo || {};
          const type = this.state.type;

        return (
            <div>
                <BreadCrumbCustom first="基本信息管理" second="停车场（位）管理"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="停车场（位）管理">
                                <Row>
                                    <Col span={24}>
                                        <Col span={5}>
                                            <FormItem 
                                                label={'停车场名:'}
                                                {...formItemLayout1}
                                            >
                                                {getFieldDecorator(`parking`, {
                                                    initialValue: 'all',
                                                })(
                                                    <Select
                                                        showSearch
                                                        style={{ width: '100%' }} >
                                                        {parkLotOptions}
                                                    </Select>
                                                )}
                                            </FormItem> 
                                        </Col>
                                        <Col span={5}>
                                            <FormItem 
                                                label={'车位号:'}
                                                {...formItemLayout1}
                                            >
                                                {getFieldDecorator(`parkingNum`)(
                                                    <Input placeholder="请输入车位号"/>
                                                )}
                                            </FormItem> 
                                        </Col>
                                        <Col span={5}>
                                            <FormItem 
                                                label={'车位类型:'}
                                                {...formItemLayout1}
                                            >
                                                {getFieldDecorator(`parkingType`, {
                                                    initialValue: 'all',
                                                })(
                                                    <Select
                                                        showSearch
                                                        style={{ width: '100%' }} >
                                                        {positionTypeOptions}
                                                    </Select>
                                                )}
                                            </FormItem> 
                                        </Col>
                                        <Col span={5}>
                                            <FormItem 
                                                label={'车位状态:'}
                                                {...formItemLayout1}
                                            >
                                                {getFieldDecorator(`parkingStatus`, {
                                                    initialValue: 'all',
                                                })(
                                                    <Select
                                                        showSearch
                                                        style={{ width: '100%' }} >
                                                        {positionStatusOptions}
                                                    </Select>
                                                )}
                                            </FormItem> 
                                        </Col>
                                    </Col> 
                                </Row> 
                                <Row>
                                    <Col span={24}>
                                        <Col span={1}></Col>
                                        <Col span={3}>
                                            <Button 
                                                type="primary" 
                                                style={{width: 120}} 
                                                onClick={this.submit}
                                            >查询</Button>
                                        </Col>
                                        <Col span={3}>
                                            <Button 
                                                style={{width: 120}} 
                                                onClick={(type) => this.handleOk('addPlakingLotVisible')}
                                            >新增停车场</Button>
                                        </Col> 
                                        <Col span={3}>
                                            <Button 
                                                style={{width: 120}} 
                                                onClick={(type) => this.handleOk('addPlakingPositionVisible')}
                                            >新增停车位</Button>
                                        </Col>
                                        {/* <Col span={3}>
                                            <Button 
                                                type="danger"
                                                style={{width: 120}} 
                                                onClick={(type) => this.handleOk('deletePlakingPositionVisible')}
                                            >删除停车场</Button>
                                        </Col> */}

                                    </Col> 
                                </Row> 
                            </Card>
                        </div>  
                        
                    </Col>
                </Row> 
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Spin spinning={parkLoading}>
                                <Card>
                                    <Table columns={columns} dataSource={data} pagination={false} locale={{emptyText: '暂无数据'}} />
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

                {/* 新增停车场 */}
                <Modal
                    visible={addPlakingLotVisible}
                    title="新增停车场"
                    width='90%'
                    onCancel={(type) => {
                        this.handleCancel('addPlakingLotVisible')
                    }}
                    footer={[
                        <Button key="back" onClick={(type) => {
                          this.handleCancel('addPlakingLotVisible')
                        }}>取消</Button>,
                        <Button key="submit" type="primary" onClick={() => {
                            this.addPlakingLot()
                        }}>提交</Button>
                    ]}
                >
                   <div className="dahua-iframe-parent">
                        <Row>
                            <Col span={24}>
                                <Col span={6}>
                                    <FormItem 
                                        label={'停车场名:'}
                                        {...formItemLayout1}
                                    >
                                        {getFieldDecorator(`add_lotName`, {
                                            rules: [{
                                                required: true, message: '请输入停车场名',
                                            }],
                                        })(
                                            <Input placeholder="请输入停车场名"/>
                                        )}
                                    </FormItem> 
                                </Col>
                                
                                <Col span={6}>
                                    <FormItem 
                                        label={'停车场类型:'}
                                        {...formItemLayout1}
                                    >
                                        {getFieldDecorator(`add_lotType`, {
                                            rules: [{
                                                required: true, message: '请选择停车场类型',
                                            }],
                                        })(
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }} >
                                                <Option value="0">室外普通</Option>
                                                <Option value="1">室外临时</Option>
                                                <Option value="2">室外立体</Option>
                                                <Option value="3">室内普通</Option>
                                                <Option value="4">室内地下</Option>
                                                <Option value="5">室内临时</Option>
                                                <Option value="6">其他</Option>
                                            </Select>
                                        )}
                                    </FormItem> 
                                </Col>
                            </Col> 
                        </Row> 
                        <Row>
                            <Col span={24}>
                                <Col span={6}>
                                    <FormItem 
                                        label={'停车位数量:'}
                                        {...formItemLayout1}
                                    >
                                        {getFieldDecorator(`add_lotNum`,{
                                            rules: [{
                                                required: true, message: '请输入停车位数量',
                                            }],
                                        })(
                                            <Input placeholder="停车位数量"/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Col>
                        </Row>
                   
                   </div>
                </Modal>

                {/* 新增停车位 */}
                <Modal
                    visible={addPlakingPositionVisible}
                    title="新增停车位"
                    width='60%'
                    onCancel={(type) => {
                        this.handleCancel('addPlakingPositionVisible')
                    }}
                    footer={[
                        <Button key="back" onClick={(type) => {
                          this.handleCancel('addPlakingPositionVisible')
                        }}>取消</Button>,
                        <Button key="submit" type="primary" onClick={() => {
                            this.addPlakingPosition()
                        }}>提交</Button>
                    ]}
                >
                   <div className="add_plaking_position">
                        <Row>
                            <Col span={24}>
                                <Col span={6}>
                                    <FormItem 
                                        label={'所属停车场:'}
                                        {...formItemLayout1}
                                    >
                                        {getFieldDecorator(`add_parking`, {
                                            rules: [{
                                                required: true, message: '请输入所属停车场',
                                            }],
                                        })(
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }} 
                                            >
                                                {modalParkLotOptions}
                                            </Select>
                                        )}
                                    </FormItem> 
                                </Col>
                                
                                <Col span={6}>
                                    <FormItem 
                                        label={'对应车辆类型:'}
                                        {...formItemLayout1}
                                    >
                                        {getFieldDecorator(`add_carType`, {
                                            rules: [{
                                                required: true, message: '请输入对应车辆类型',
                                            }],
                                        })(
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }} >
                                                <Option value="0">小型汽车</Option>
                                                <Option value="1">中型汽车</Option>
                                                <Option value="2">大型汽车</Option>
                                                <Option value="3">自行车/电动车</Option>
                                                <Option value="4">其他</Option>
                                            </Select>
                                        )}
                                    </FormItem> 
                                </Col>
                            </Col> 
                        </Row> 
                        <Row>
                            <Col span={24}>
                                <Col span={6}>
                                    <FormItem 
                                        label={'前缀字母:'}
                                        {...formItemLayout1}
                                    >
                                        {getFieldDecorator(`add_prefix`)(
                                            <Input placeholder="请输入前缀字母"/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem 
                                        label={'数字起于:'}
                                        {...formItemLayout1}
                                    >
                                        {getFieldDecorator(`add_front`)(
                                            <Input placeholder="请输入起始数字"/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem 
                                        label={'止于:'}
                                        {...formItemLayout1}
                                    >
                                        {getFieldDecorator(`add_end`)(
                                            <Input placeholder="请输入末尾数字"/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Col>
                        </Row>
                   </div>
                </Modal>

                {/* 修改停车位 */}
                <Modal
                    visible={modifyPlakingPositionVisible}
                    title="修改停车位"
                    width='60%'
                    onCancel={(type) => {
                        this.handleCancel('modifyPlakingPositionVisible')
                    }}
                    footer={[
                        <Button key="back" onClick={(type) => {
                            this.handleCancel('modifyPlakingPositionVisible')
                        }}>取消</Button>,
                        <Button key="submit" type="primary" onClick={() => {
                            this.modifyPlakingPosition()
                        }}>提交</Button>
                    ]}
                >
                   <div className="modify_plaking_position">
                        <Row>
                            <Col span={24}>
                                <Col span={6}>
                                    <FormItem 
                                        label={'所属停车场:'}
                                        {...formItemLayout1}
                                    >
                                        {positionInfo && type=='detail' ? positionInfo.parkingLotId :
                                            getFieldDecorator(`modify_parking`, {
                                            initialValue:   positionInfo.parkingLotId,
                                            rules: [{
                                                required: true, message: '请输入所属停车场',
                                            }],
                                        })(
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }} 
                                            >
                                                {modalParkLotOptions}
                                            </Select>
                                        )}
                                    </FormItem> 
                                </Col>                                
                                <Col span={6}>
                                    <FormItem 
                                        label={'对应车辆类型:'}
                                        {...formItemLayout1}
                                    >
                                        {positionInfo && type=='detail' ? positionInfo.vehicleType :
                                            getFieldDecorator(`modify_carType`, {
                                            initialValue:   positionInfo.vehicleType,
                                            rules: [{
                                                required: true, message: '请输入对应车辆类型',
                                            }],
                                        })(
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }} >
                                                <Option value="0">小型汽车</Option>
                                                <Option value="1">中型汽车</Option>
                                                <Option value="2">大型汽车</Option>
                                                <Option value="3">自行车/电动车</Option>
                                                <Option value="4">其他</Option>
                                            </Select>
                                        )}
                                    </FormItem> 
                                </Col>
                                <Col span={6}>
                                    <FormItem 
                                        label={'车位号:'}
                                        {...formItemLayout1}
                                    >
                                        {positionInfo && type=='detail' ? positionInfo.parkingSpaceCoding :
                                            getFieldDecorator(`modify_carNo`,{initialValue: positionInfo.parkingSpaceCoding})(
                                            <Input placeholder="请输入车位号"/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Col> 
                        </Row> 
                        <Row>
                            <Col span={24}>
                                <Col span={6}>
                                    <FormItem 
                                        label={'到期时间:'}
                                        {...formItemLayout1}
                                    >
                                        {positionInfo && type=='detail' ? positionInfo.expireDate :
                                        getFieldDecorator(`modal_expireDate`,{
                                                initialValue: positionInfo.expireDate?moment(positionInfo.expireDate, "YYYY-MM-DD"):'',
                                                // rules: [{
                                                //     required: true, message: '请输入到期时间',
                                                // }],
                                        })(
                                            <DatePicker format="YYYY-MM-DD" showToday={false} placeholder="请输入到期时间"/> 
                                        )}
                                    </FormItem> 
                                </Col>     
                                <Col span={6}>
                                    <FormItem 
                                        label={'车位类型:'}
                                        {...formItemLayout1}
                                    >
                                        {positionInfo && type=='detail' ? positionInfo.positionType :
                                            getFieldDecorator(`modify_positionType`, {
                                            initialValue:   positionInfo.positionType,
                                            rules: [{
                                                required: true, message: '请选择车位类型',
                                            }],
                                        })(
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }} >
                                                <Option value="0">公有</Option>
                                                <Option value="1">专属</Option>
                                                <Option value="2">自有</Option>
                                                <Option value="3">私有</Option>
                                                <Option value="4">其他</Option>
                                            </Select>
                                        )}
                                    </FormItem> 
                                </Col>                            
                                <Col span={6}>
                                    <FormItem 
                                        label={'关联充电桩:'}
                                        {...formItemLayout1}
                                    >
                                        {positionInfo && type=='detail' ? positionInfo.chargingCoding :
                                            getFieldDecorator(`modify_chargingCoding`, {initialValue: positionInfo.chargingCoding})(
                                            <Input placeholder="请输入设备号"/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem 
                                        label={'关联摄像头:'}
                                        {...formItemLayout1}
                                    >
                                        {positionInfo && type=='detail' ? positionInfo.equipmentChannelId :
                                            getFieldDecorator(`modify_equipmentChannelId`, {initialValue: positionInfo.equipmentChannelId})(
                                            <Input placeholder="请输入设备号"/>
                                        )}
                                    </FormItem>
                                </Col>
  
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col span={24}>
                                <Col span={6}>
                                    <FormItem 
                                        label={'其他关联设备:'}
                                        {...formItemLayout1}
                                    >
                                        {getFieldDecorator(`modify_otherEquit`)(
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }} >
                                                <Option value="0">小型汽车</Option>
                                                <Option value="1">中型汽车</Option>
                                                <Option value="2">大型汽车</Option>
                                                <Option value="3">自行车/电动车</Option>
                                                <Option value="4">其他</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem 
                                        label={'设备号:'}
                                        {...formItemLayout1}
                                    >
                                        {getFieldDecorator(`modify_otherEquitNo`)(
                                            <Input placeholder="请输入设备号"/>
                                        )}
                                    </FormItem>
                                </Col>
  
                            </Col>
                        </Row> */}
                   </div>
                </Modal>

                {/* 删除停车位 */}
                <Modal
                    visible={deletePlakingPositionVisible}
                    title="删除停车位"
                    width='70%'
                    onCancel={(type) => {
                        this.handleCancel('deletePlakingPositionVisible')
                    }}
                    footer={[
                        <Button key="back" onClick={(type) => {
                          this.handleCancel('deletePlakingPositionVisible')
                        }}>取消</Button>,
                        <Button key="submit" type="danger" onClick={() => {
                            this.deletePlakingPosition()
                        }}>删除</Button>
                    ]}
                >
                   <div className="delete_plaking_position">
                        <Row>
                            <Col span={24}>
                                <Col span={6}>
                                    <FormItem 
                                        label={'所属停车场:'}
                                        {...formItemLayout1}
                                    >
                                        {getFieldDecorator(`delete_parking`,{
                                            rules: [{
                                                required: true, message: '请输入所属停车场',
                                            }],
                                        })(
                                            <Select
                                                showSearch                                                
                                                onChange={this.handleChange}
                                                style={{ width: '100%' }} >
                                                {modalParkLotOptions}
                                            </Select>
                                        )}
                                    </FormItem> 
                                </Col>
                            </Col> 
                        </Row> 
                   </div>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(ParkingManage);
