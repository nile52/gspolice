import React, {Component} from 'react';
import { 
  Form, 
  Row, 
  Col, 
  Input,
  Select, 
  Spin,
  Tag,
  Pagination,
  DatePicker,
  Button,
} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { format } from 'upath';
import lodash from 'lodash'
import utils from '../../../util/util.js'
moment.locale('zh-cn');
const FormItem = Form.Item;
const Option = Select.Option
const { RangePicker } = DatePicker;

class DataSiderCL extends Component {
  constructor(props) {
    super(props)
    this.onPageChange = this.onPageChange.bind(this)
    this.idCardChange = this.idCardChange.bind(this)
    this.labelChange = this.labelChange.bind(this)
    this.changev = lodash.debounce(this.changev, 200);  
    this.state={
      current: 1,
    }
  }

  changev(value) {
    this.props.changev(value)
  }

  onPageChange = (num) => {
    let _this = this
    this.setState({
      current: num
    }, () => {
      let params = {
        idCard: _this.props.siderCLIdCard,
        licenseNumber: _this.props.siderCLCarNumber,
        label: _this.props.siderCLType=='all'?undefined:_this.props.siderCLType,
        inOutDateStart: _this.props.siderCLInOutDateStart,
        inOutDateEnd: _this.props.siderCLInOutDateEnd,
        housingId: _this.props.siderCLRoom=='all'?undefined:_this.props.siderCLRoom
      }
      _this.props.getCLSelectRecVehicleRecord(params, _this.state.current, () => {})
    })
  }

  idCardChange = (e) => {
    let _this = this
    const result = utils.isShenFenZheng(e.target.value)
    if(result.status || e.target.value == '') {
      let idCard =  e.target.value == ''?undefined:e.target.value
      let params = {
        idCard: idCard,
        licenseNumber: this.props.siderCLCarNumber,
        label: this.props.siderCLType=='all'?undefined:this.props.siderCLType,
        inOutDateStart: this.props.siderCLInOutDateStart,
        inOutDateEnd: this.props.siderCLInOutDateEnd,
        housingId: this.props.siderCLRoom=='all'?undefined:this.props.siderCLRoom
      }
      this.props.getCLSelectRecVehicleRecord(params, this.state.current, () => {
        _this.changev({
          siderCLIdCard: idCard
        })
      })
    }
  }

  licenseNumberChange = (e) => {
    let _this = this
    const result = utils.isCarNumber(e.target.value)
    if(result || e.target.value == '') {
      let licenseNumber =  e.target.value == ''?undefined:e.target.value
      
      let params = {
        idCard: this.props.siderCLIdCard,
        licenseNumber: licenseNumber,
        label: this.props.siderCLType=='all'?undefined:this.props.siderCLType,
        inOutDateStart: this.props.siderCLInOutDateStart,
        inOutDateEnd: this.props.siderCLInOutDateEnd,
        housingId: this.props.siderCLRoom=='all'?undefined:this.props.siderCLRoom
      }
      this.props.getCLSelectRecVehicleRecord(params, this.state.current, () => {
        _this.changev({
          siderCLCarNumber: licenseNumber
        })
      })
    }
  }

  labelChange = (value) => {
    let _this = this
    let label =  value == 'all'?undefined:value
    let params = {
      idCard: this.props.siderCLIdCard,
      licenseNumber:  this.props.siderCLCarNumber,
      label: label,
      inOutDateStart: this.props.siderCLInOutDateStart,
      inOutDateEnd: this.props.siderCLInOutDateEnd,
      housingId: this.props.siderCLRoom=='all'?undefined:this.props.siderCLRoom
    }
    this.props.getCLSelectRecVehicleRecord(params, this.state.current, () => {
      _this.changev({
        siderCLType: value
      })
    })
  }

  timeChange = (value) => {
    let _this = this
    let params = {
      idCard: this.props.siderCLIdCard,
      licenseNumber:  this.props.siderCLCarNumber,
      label: this.props.siderCLType=='all'?undefined:this.props.siderCLType,
      inOutDateStart: value[0].format('YYYY/MM/DD HH:mm:ss'),
      inOutDateEnd: value[1].format('YYYY/MM/DD HH:mm:ss'),
      housingId: this.props.siderCLRoom=='all'?undefined:this.props.siderCLRoom
    }
    this.props.getCLSelectRecVehicleRecord(params, this.state.current, () => {
      _this.props.changev({
        siderCLInOutDateStart: value[0].format('YYYY/MM/DD HH:mm:ss'),
        siderCLInOutDateEnd: value[1].format('YYYY/MM/DD HH:mm:ss')
      })
    })
  }

  itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return null;
    } else if (type === 'next') {
      return null;
    }
    return originalElement;
  }

  render() {
    let _this = this
    const { getFieldDecorator } = this.props.form;
    const {
      CLTogal,
      clLoading,
      siderCLBuildList,
      siderCLBuildListJson,
      siderCLUnitList,
      siderCLRoomList,
      siderCLBuild,
      siderCLUnit,
      siderCLRoom,
      siderCLIdCard,
      siderCLCarNumber,
      siderCLType,
      getCLRoomList,
      siderCLInOutDateStart,
      siderCLInOutDateEnd,
      clselectRecVehicleRecordList
    } = this.props
    const formItemLayout1 = {
      labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
    }
    const formItemLayout2 = {
      labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
        },
    }
    let buildOptions, unitOptions, roomOptions;
    if (siderCLBuildList && siderCLBuildList.length > 0) {
      buildOptions = siderCLBuildList.map((item, index) => {
        let newName = ''
        let newNameArr = item.name.split('-')
        let newNameArrLength = newNameArr.length
        if( newNameArrLength > 1) {
          newName = newNameArr[newNameArrLength -1]
        } else {
          newName = item.name
        }
        return <Option 
          key={index} 
          value={item.id} 
          className="house_lay_select_option"
        >{newName}</Option>;
      });
    } else {
        buildOptions = [];
    }
    if(siderCLUnitList &&  siderCLUnitList.length > 0 && siderCLBuild != 'all') {
      unitOptions = siderCLUnitList.map((item, index) => {
          return <Option key={index} value={item} className="house_lay_select_option">{item}</Option>;
      });
    } else {
      unitOptions = [];
    }
    if(siderCLRoomList &&  siderCLRoomList.length > 0) {
      
      roomOptions = siderCLRoomList.map((item, index) => {
        let newRoom = ''
        let newRoomArr = item.room.split('-')
        let newRoomArrLength = newRoomArr.length
        if( newRoomArrLength > 1) {
          newRoom = newRoomArr[newRoomArrLength -1]
        } else {
          newRoom = item.room
        }
        return <Option key={index} value={item.id} className="house_lay_select_option">{newRoom}</Option>;
      });
    } else {
      roomOptions = [];
    }
    buildOptions.unshift(<Option key="0" value="all">请选择</Option>)
    unitOptions.unshift(<Option key="0" value="all">请选择</Option>)
    roomOptions.unshift(<Option key="0" value="all">请选择</Option>)
    return (
      <div className="sider_zh">
        <Spin spinning={clLoading}>
        <div className="sider_zh_form_wrap">
        <Form>
          <Row>
            <Col span={24} className="sider_zh_col">
              <FormItem 
                  label={'身份证号:'}
                  {...formItemLayout2}
                  className="sider_zh_form_item"
              >
                  {getFieldDecorator('cl_idCard', {
                    initialValue: siderCLIdCard,
                  }
                  )(
                      <Input placeholder="请输入身份证号" className="sider_zh_input" onChange={this.idCardChange}/>   
                  )}
              </FormItem> 
            </Col> 
          </Row>
          <Row>
            <Col span={24} className="sider_zh_col">
              <FormItem 
                  label={'车牌号:'}
                  {...formItemLayout2}
                  className="sider_zh_form_item"
              >
                  {getFieldDecorator('cl_carNum', {
                    initialValue: siderCLIdCard,
                  }
                  )(
                      <Input placeholder="请输入车牌号" className="sider_zh_input" onChange={this.licenseNumberChange}/>   
                  )}
              </FormItem> 
            </Col> 
          </Row>
          <Row>
            <Col span={24} className="sider_zh_col">
              <FormItem 
                  label={'出入类型:'}
                  {...formItemLayout2}
                  className="sider_zh_form_item"
              >
                  {getFieldDecorator(`cl_type`, {
                     initialValue: siderCLType
                  })(
                      <Select
                        style={{width: '9rem'}}
                        getPopupContainer={() => document.getElementById('datavisualization')}
                        onChange={this.labelChange}
                      >
                        <Option 
                          key='zh_build' 
                          value='all'
                          className="house_lay_select_option"
                        >请选择</Option>
                        <Option 
                          key='zh_build' 
                          value='进'
                          className="house_lay_select_option"
                        >进</Option>
                        <Option 
                          key='zh_build' 
                          value='出'
                          className="house_lay_select_option"
                        >出</Option>
                      </Select>
                  )}
              </FormItem> 
            </Col> 
          </Row>
          <Row>
            <Col span={24} className="sider_zh_col">
              <FormItem 
                label={'出入时间:'}
                {...formItemLayout2}
                className="sider_zh_form_item"
              >
                {getFieldDecorator(`cl_time`)(
                  <RangePicker
                    showTime={{
                      hideDisabledOptions: true,
                      defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                    }}
                    format="YYYY-MM-DD HH:mm:ss"
                    className="sider_zh_picker"
                    placeholder={["开始时间", "结束时间"]}
                    onOk={this.timeChange}
                  />
                )}
              </FormItem> 
            </Col> 
          </Row>
          <Row>
            <Col span={6} className="sider_zh_col" >
              <Select 
                defaultValue={siderCLBuild}
                style={{width: '7rem'}}
                onChange={(value) => {
                  let newSiderCLUnitList = []
                  for(let i=0; i < siderCLBuildListJson[value].unit; i++){
                    let num = i
                    num++
                    newSiderCLUnitList.push(num)
                  }
                  this.changev({
                    siderCLUnitList: newSiderCLUnitList,
                    siderCLRoomList: [],
                    siderCLBuild: value,
                    siderCLUnit: 'all',
                    siderCLRoom: 'all',
                  })
                }}
                getPopupContainer={() => document.getElementById('datavisualization')}
              >
                {buildOptions}
              </Select>
            </Col>
            <Col span={2} className="build-btns">
              <span className="house-unit">幢</span>
            </Col>
            <Col span={6} className="sider_zh_col" >
              <Select 
                defaultValue={siderCLUnit}
                style={{width: '7rem'}}
                onChange={(value) => {
                  if(value == 'all') {
                    this.changev({
                      siderZHUnit: value,
                      siderZHRoom: value
                    })
                  } else {
                    getCLRoomList(value, () => {
                      this.changev({
                        siderCLRoom: value,
                        siderCLUnit: value
                      })
                    })
                  }
                }}
                getPopupContainer={() => document.getElementById('datavisualization')}
              >
                {unitOptions}
              </Select>
            </Col>
            <Col span={2} className="build-btns">
              <span className="house-unit">单元</span>
            </Col>
            <Col span={6} className="sider_zh_col" >
              <Select 
                defaultValue={siderCLRoom}
                style={{width: '7rem'}}
                onChange={(value) => {
                  let params = {
                    idCard: siderCLIdCard,
                    licenseNumber:  siderCLCarNumber,
                    label: siderCLType=='all'?undefined:siderCLType,
                    inOutDateStart: siderCLInOutDateStart,
                    inOutDateEnd: siderCLInOutDateEnd,
                    housingId: value=='all'?undefined:value
                  }
                  this.props.getCLSelectRecVehicleRecord(params, this.state.current, () => {
                    _this.props.changev({
                      siderCLRoom: value
                    })
                  })
                }}
                getPopupContainer={() => document.getElementById('datavisualization')}
              >
                {roomOptions}
              </Select>
            </Col>
            <Col span={2} className="build-btns">
              <span className="house-unit">室</span>
            </Col>
          </Row>
        </Form>  
        </div>
        
        <div className="sider_zh_list_wrap sider_cl_list_wrap">
          {clselectRecVehicleRecordList && clselectRecVehicleRecordList.length > 0 ?clselectRecVehicleRecordList.map((item, index) => {
            let label = item.label
            let rigLocal = item.channelName
            let addr = item.equipmentChannelName
            let passageWay = item.passageWay
            let type = '', color="";
              switch(item.state) {
                case 0:
                  type = '访客'
                  color = "#f50"
                  break
                case 1:
                  type = '住户'
                  color = "#2db7f5"
                  break
                case 2:
                  type = item.idCard?item.idCard!='未知'?'内部':'未知':'未知'
                  color = item.idCard?item.idCard!="未知"?'#2db7f5':"#87d068":"#87d068"
                  break
              }
            return (<div className="sider_zh_list_item">
             <div className="sider_zh_list_row_item">
               <Row>
                 <Col span={12}>车牌号: <span className="zh_list_row_item_text">{item.licenseNumber?item.licenseNumber:''}</span></Col>
                 <Col span={12}>车辆类型:<div className="zh_list_row_item_tag"><Tag color={color}>{type+'车辆'}</Tag></div></Col>
               </Row>
             </div>
             <div className="sider_zh_list_row_item">
               <Row>
                 <Col span={24}>身份证号: <span className="zh_list_row_item_text">{utils.plusXing(item.idCard, 10, 0)}</span></Col>
               </Row>
             </div>
             <div className="sider_zh_list_row_item">
               <Row>
                 <Col span={24}>进出时间: <span className="zh_list_row_item_text">{utils.timeToHMS(item.inOutDate)}</span></Col>
               </Row>
             </div>
             <div className="sider_zh_list_row_item">
               <Row>
                 <Col span={24}>进出位置: <span className="zh_list_row_item_text">{addr}</span></Col>
               </Row>
             </div>
             <div className="sider_zh_list_row_item">
               <Row>
                 <Col span={24}>进出类型: <span className="zh_list_row_item_text">{passageWay}</span></Col>
               </Row>
             </div>
             <div className="sider_zh_list_row_item">
               <Row>
                 <Col span={12}>通过方式: <span className="zh_list_row_item_text">{item.label}</span></Col>
                 <Col span={12}>
                    <Button className="zh_cha_btn"
                      onClick={() => {
                        this.props.changev({
                          homePictureUrl: item.pictureUrlCatch
                        })
                        this.props.handleOk('pictureContentVisible')
                      }}
                    >
                      查看画面
                    </Button>
                  </Col>
               </Row>
             </div>
            </div>
            )
          }) :<p style={{textAlign: 'center', height:'20rem', lineHeight: '20rem'}}>暂无数据</p> }
         
          {
            CLTogal>1?<div className="sider_zh_pagination">
              <Pagination 
                // simple
                itemRender={this.itemRender}
                current={this.state.current} 
                pageSize={20} 
                total={CLTogal} 
                onChange={this.onPageChange}
              />
            </div>:null
          }
        </div>
        </Spin>
      </div>
    )  
  }
}

export default Form.create()(DataSiderCL);