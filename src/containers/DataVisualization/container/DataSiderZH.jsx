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
  Button
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

class DataSiderZH extends Component {
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
        idCard: _this.props.siderZHIdCard,
        label: _this.props.siderZHType=='all'?undefined:_this.props.siderZHType,
        inOutDateStart: _this.props.siderZHInOutDateStart,
        inOutDateEnd: _this.props.siderZHInOutDateEnd,
        housingId: _this.props.siderZHRoom=='all'?undefined:_this.props.siderZHRoom
      }
      _this.props.getZHPersonnelRecord(params, _this.state.current, () => {})
    })
  }

  idCardChange = (e) => {
    let _this = this
    const result = utils.isShenFenZheng(e.target.value)
    if(result.status || e.target.value == '') {
      let idCard =  e.target.value == ''?undefined:e.target.value
      let params = {
        idCard: idCard,
        label: this.props.siderZHType=='all'?undefined:this.props.siderZHType,
        inOutDateStart: this.props.siderZHInOutDateStart,
        inOutDateEnd: this.props.siderZHInOutDateEnd,
        housingId: this.props.siderZHRoom=='all'?undefined:this.props.siderZHRoom
      }
      this.props.getZHPersonnelRecord(params, this.state.current, () => {
        _this.changev({
          siderZHIdCard: idCard
        })
      })
      
    }
  }

  labelChange = (value) => {
    let _this = this
    let label =  value == 'all'?undefined:value
    let params = {
      idCard: this.props.siderZHIdCard,
      label: label,
      inOutDateStart: this.props.siderZHInOutDateStart,
      inOutDateEnd: this.props.siderZHInOutDateEnd,
      housingId: this.props.siderZHRoom=='all'?undefined:this.props.siderZHRoom
    }
    this.props.getZHPersonnelRecord(params, this.state.current, () => {
      _this.changev({
        siderZHType: value
      })
    })
  }

  timeChange = (value) => {
    let _this = this
    let params = {
      idCard: this.props.siderZHIdCard,
      label: this.props.siderZHType=='all'?undefined:this.props.siderZHType,
      inOutDateStart: value[0].format('YYYY/MM/DD HH:mm:ss'),
      inOutDateEnd: value[1].format('YYYY/MM/DD HH:mm:ss'),
      housingId: this.props.siderZHRoom=='all'?undefined:this.props.siderZHRoom
    }
    this.props.getZHPersonnelRecord(params, this.state.current, () => {
      _this.props.changev({
        siderZHInOutDateStart: value[0].format('YYYY/MM/DD HH:mm:ss'),
        siderZHInOutDateEnd: value[1].format('YYYY/MM/DD HH:mm:ss')
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
      ZHTogal,
      zhLoading,
      siderZHBuildList,
      siderZHBuildListJson,
      siderZHUnitList,
      siderZHRoomList,
      zhEntryAndExitList,
      siderZHBuild,
      siderZHUnit,
      siderZHRoom,
      siderZHIdCard,
      siderZHType,
      getZHRoomList,
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
    if (siderZHBuildList &&  siderZHBuildList.length > 0) {
      buildOptions = siderZHBuildList.map((item, index) => {
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
    if(siderZHUnitList &&  siderZHUnitList.length > 0 && siderZHBuild != 'all') {
      unitOptions = siderZHUnitList.map((item, index) => {
          return <Option key={index} value={item} className="house_lay_select_option">{item}</Option>;
      });
    } else {
      unitOptions = [];
    }
    if(siderZHRoomList &&  siderZHRoomList.length > 0) {
      
      roomOptions = siderZHRoomList.map((item, index) => {
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
        <Spin spinning={zhLoading}>
        <div className="sider_zh_form_wrap">
        <Form>
          <Row>
            <Col span={24} className="sider_zh_col">
              <FormItem 
                  label={'身份证号:'}
                  {...formItemLayout2}
                  className="sider_zh_form_item"
              >
                  {getFieldDecorator('idCard', {
                    initialValue: siderZHIdCard,
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
                  label={'出入类型:'}
                  {...formItemLayout2}
                  className="sider_zh_form_item"
              >
                  {getFieldDecorator(`type`, {
                     initialValue: siderZHType
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
                {getFieldDecorator(`time`)(
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
                defaultValue={siderZHBuild}
                style={{width: '7rem'}}
                onChange={(value) => {
                  let newSiderZHUnitList = []
                  for(let i=0; i < siderZHBuildListJson[value].unit; i++){
                    let num = i
                    num++
                    newSiderZHUnitList.push(num)
                  }
                  this.changev({
                    siderZHUnitList: newSiderZHUnitList,
                    siderZHRoomList: [],
                    siderZHBuild: value,
                    siderZHUnit: 'all',
                    siderZHRoom: 'all',
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
                defaultValue={siderZHUnit}
                style={{width: '7rem'}}
                onChange={(value) => {
                  if(value == 'all') {
                    this.changev({
                      siderZHUnit: value,
                      siderZHRoom: value
                    })
                  } else {
                    getZHRoomList(value, () => {
                      this.changev({
                        siderZHRoom: value,
                        siderZHUnit: value
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
                defaultValue={siderZHRoom}
                style={{width: '7rem'}}
                onChange={(value) => {
                  let params = {
                    idCard: this.props.siderZHIdCard,
                    label: this.props.siderZHType=='all'?undefined:this.props.siderZHType,
                    inOutDateStart: this.props.siderZHInOutDateStart,
                    inOutDateEnd: this.props.siderZHInOutDateEnd,
                    housingId: value=='all'?undefined:value
                  }
                  this.props.getZHPersonnelRecord(params, this.state.current, () => {
                    _this.props.changev({
                      siderZHRoom: value
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
        
        <div className="sider_zh_list_wrap">
          {zhEntryAndExitList && zhEntryAndExitList.length > 0 ?zhEntryAndExitList.map((item, index) => {
            let name = "", phoneNum = ''
            let label = item.label
            let rigLocal = item.channelName
            let addr = item.equipmentChannelName
            let passageWay = item.passageWay
            let type = '', color="";
            switch(item.state) {
              case 0:
                name = item.guestName
                type = '访客'
                phoneNum = item.guestMobile
                color = "#f50"
              break
              case 1:
                name = item.userName
                type = '住户'
                phoneNum = item.userMobile
                color = "#2db7f5"
                break
              case 2:
                name = item.userName
                type = '未知'
                phoneNum = item.userMobile
                color = "#87d068"
                break
            }
            return (<div className="sider_zh_list_item">
             <div className="sider_zh_list_row_item">
               <Row>
                 <Col span={12}>姓名: <span className="zh_list_row_item_text">{name}</span></Col>
                 <Col span={12}>人员类型:<div className="zh_list_row_item_tag"><Tag color={color}>{type+'人员'}</Tag></div></Col>
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
                 <Col span={12}><Button disabled className="zh_cha_btn">查看画面</Button></Col>
               </Row>
             </div>
            </div>
            )
          }) :<p style={{textAlign: 'center', height:'20rem', lineHeight: '20rem'}}>暂无数据</p> }
         
          {
            ZHTogal>1?<div className="sider_zh_pagination">
              <Pagination 
                // simple
                itemRender={this.itemRender}
                current={this.state.current} 
                pageSize={20} 
                total={ZHTogal} 
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

export default Form.create()(DataSiderZH);