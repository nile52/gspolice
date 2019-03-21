import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createForm} from 'rc-form';
import { Form, Button, Row, Col} from 'antd';
import '../style/DataVisualization.less'
const FormItem = Form.Item;

class DataHeaderCenter extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const {changeShortCutMenu, isShortCut} = this.props
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
    return (
      <div className="data_header_center">
        <div className="header_center_bg">
        智慧小区数据统览
            <div className="header_center_left_btn" onClick={(type) => changeShortCutMenu('isShortCut')}>
              <span className="header_center_left_text" >{isShortCut?'数据可视化':'快捷菜单'}</span>
            </div>
            <Link to="/app/baseinfo/resident">
            <div className="header_center_right_btn">
              <span className="header_center_right_text">后台视图</span>
            </div>
            </Link>
            {/* <div className="header_center_title">
              <span className="header_center_title_text">智慧小区数据统览</span>
            </div> */}
        </div>
      </div>
    )
  }

}

export default Form.create()(DataHeaderCenter);