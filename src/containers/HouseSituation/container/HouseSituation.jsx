/* eslint-disable */
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {createForm} from 'rc-form'
import {connect} from 'react-redux'

import * as actions from '../actions/HouseSituation'
import { Row, Col, DatePicker, Form, Button, Select} from 'antd';
import '../style/HouseSituation.less'
import {
  WEI_SERVICE
} from '../../../fetch/apis'
import axios from 'axios'
import moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const {MonthPicker,RangePicker,WeekPicker} = DatePicker;

@connect(
    state => state,
    {...actions}
)

class HouseSituation extends Component {
  constructor(props) {
    super(props)
    // this.changeName = this.changeName.bind(this)
    const value = props.value || {};
    this.state = {
        date: new Date(),
        datepicker: '',
        res: {
          unit: "17幢1单元",
          allRome: [
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
            {doorCard : "1-101" , people : "5" , car : "1" , roomType : "1"},
          ]
        }
        
    }
  }

  handlePanelChange = (value, dateString) => {
    let newDate = moment(dateString)
    if (!('value' in this.props)) {

      this.setState({ datepicker: newDate });
    }
    this.triggerChange({ datepicker: newDate });
  }

  changeName = (value) => {
    switch(value){
      case 1 : return "自住房";
      break;
      case 2 : return "出租房";
      break;
      case 3 : return "群租房";
      break;
      case 4 : return "网约房";
      break;
    }
  }



  componentDidMount() {
    let screenH = document.documentElement.clientHeight
    let mainDom = document.getElementsByClassName("data_info_item")
    let leftBottom = document.querySelector(".data_info_left_bottom")
    mainDom[0].style.height = screenH/12 + 'rem'
    mainDom[1].style.height = screenH/12 + 'rem'
    leftBottom.style.height = screenH - 10*12 - 40 + 'px'
    window.onresize = function() {
      let screenH = document.documentElement.clientHeight
      let mainDom = document.getElementsByClassName("data_info_item")
      let leftBottom = document.querySelector(".data_info_left_bottom")
      mainDom[0].style.height = screenH/12 + 'rem'
      mainDom[1].style.height = screenH/12 + 'rem'
      leftBottom.style.height = screenH - 10*12 - 40 + 'px'
    }
    clearInterval(timer)
    var timer = setInterval(()=>this.tick(),1000)
   

  }
  


  tick() {
    this.setState({
        date : new Date()
    })
}
    // const {datepicker} = this.props.value
    // const dateFormat = 'YYYY-MM-DD';

  

  render () {
    const {
      homeBuildList,
      homeBuildListJson,
      homeBuild,
      handleCancel,
      getBuildTogal,
      changev
    } = this.props
    let buildOptions;
    if (homeBuildList &&  homeBuildList.length > 0) {
      buildOptions = homeBuildList.map((item, index) => {
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
    const { getFieldDecorator } = this.props.form;
    const {changeShortCutMenu, isShortCut, roomList} = this.props
    const formItemLayout1 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    }

    
    // const {data} = this.props.HouseSituation

    return (
      <div>
        <Row>
          <Col span={18}  className="data_info_item data_info_left">
            <Row>
              <Col span={24} className="data_info_left_top">
                  <div className="header_center_bg">大关小区详细情况
                    <Link to="/datavisualization">
                      <div className="header_center_left_btn">
                        <span className="header_center_left_text">快捷菜单</span>
                      </div>
                    </Link>
                    <Link to="/app/baseinfo/buildingarea">
                      <div className="header_center_right_btn">
                        <span className="header_center_right_text">后台视图</span>
                      </div>
                    </Link>
                  </div>
                  <p className="clock_num">{this.state.date.toLocaleTimeString()}</p>
              </Col>  
            </Row>
            <div className="data_info_left_bottom">
              <div className="data_info_usermsg">
                <span>{this.state.res.unit}</span>
                <Col span={6} className="house_lay_select" >
                        <Select 
                          value={homeBuild}
                          style={{width: '7rem'}}
                          onChange={(value, option) => {
                            handleCancel(['layerVisible', 'roomVisible', 'inOutVisible'])
                            getBuildTogal(value)
                            let homeUnitList = []
                            for(let i=0; i < homeBuildListJson[value].unit; i++){
                              let num = i
                              num++
                              homeUnitList.push(num)
                            }
                            changev({
                              homeUnitList: homeUnitList,
                              homeRoomList: [],
                              homeBuildInfo: homeBuildList[option.key],
                              homeBuild: value,
                              homeUnit: 'all',
                              homeRoom: 'all',
                            })
                          }}
                          getPopupContainer={() => document.getElementById('housesituation')}
                        >
                          {buildOptions}
                        </Select>
                    </Col>
                <Button type="primary" className="data_button">返回查看小区</Button>
                <div>
                  <Row>
                    <Col span={2}>
                      <div>
                      
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
          <Col span={6}  className="data_info_item data_info_right">
            <Row>
              <div className="data_unitcase">
                <div className="data_case">////////////////////单元情况\\\\\\\\\\\\\\\\\\\\</div>
                <div className="data_unitcase1">
                  <div className="data_unitcase1-1"><span className="data_YY">常住人数</span><br/><span className="data_Y1">135</span></div>
                  <div className="data_unitcase1-2"><span className="data_YY">暂住人数</span><br/><span className="data_Y2">135</span></div>
                  <div className="data_unitcase1-3"><span className="data_YY">房屋总数</span><br/><span className="data_Y3">135</span></div>
                  <div className="data_unitcase1-4"><span className="data_YY">车辆总数</span><br/><span className="data_Y4">135</span> </div>
                </div>
                <div className="data_unitcase2">
                  <div className="data_unitcase2-1"><span className="data_Y5">自住</span><span className="data_YY">5</span></div>
                  <div className="data_unitcase2-2"><span className="data_Y6">出租</span><span className="data_YY">5</span></div>
                  <div className="data_unitcase2-3"><span className="data_Y7">群租</span><span className="data_YY">5</span></div>
                  <div className="data_unitcase2-4"><span className="data_Y8">网约</span><span className="data_YY">5</span></div>
                </div>  
              </div>
            </Row>
            <Row>
              <div className="data_unitnews">
                <div className="data_case">////////////////////单元信息\\\\\\\\\\\\\\\\\\\\</div>
                <div className="sider_zh_list_row_item">
                  <Row type="flex" justify="center">
                    <Col span={18}>所属幢 <span className="zh_list_row_item_text">1</span></Col>
                  </Row>
                </div>
                <div className="sider_zh_list_row_item">
                  <Row type="flex" justify="center">
                    <Col span={18}>所属单元 <span className="zh_list_row_item_text">2</span></Col>
                  </Row>
                </div>
                <div className="sider_zh_list_row_item">
                  <Row type="flex" justify="center">
                    <Col span={18}>联系人 <span className="zh_list_row_item_text">3</span></Col>
                  </Row>
                </div>
                <div className="sider_zh_list_row_item">
                  <Row type="flex" justify="center">
                    <Col span={18}>联系电话 <span className="zh_list_row_item_text">5</span></Col>
                  </Row>
                </div>
                <div className="sider_zh_list_row_item">
                  <Row type="flex" justify="center">
                    <Col span={18}>幢 <span className="zh_list_row_item_text">5</span></Col>
                  </Row>
                </div>
                <div className="sider_zh_list_row_item">
                  <Row type="flex" justify="center">
                    <Col span={18}>门禁 <span className="zh_list_row_item_text">6</span></Col>
                  </Row>
                </div>
                <div className="sider_zh_list_row_item">
                  <Row type="flex" justify="center">
                    <Col span={18}>探针 <span className="zh_list_row_item_text">7</span></Col>
                  </Row>
                </div>
                <div className="sider_zh_list_row_item">
                  <Row type="flex" justify="center">
                    <Col span={18}>监控 <span className="zh_list_row_item_text">8</span></Col>
                  </Row>
                </div>
              </div>
            </Row>
          </Col>
        </Row>
        
      </div>
    )
  }
}

export default Form.create()(HouseSituation);
