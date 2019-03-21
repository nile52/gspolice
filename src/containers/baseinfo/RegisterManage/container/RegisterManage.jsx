/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import utils from '../../../../util/util.js'
import {
    CAS_LOGIN, 
    CAS_CASCHECK, 
    GET_THIRD_TOKEN
} from '../../../../fetch/apis.js'
import {Row, Col, Card, Modal} from 'antd'
import BreadCrumbCustom from '../../../../component/BreadCrumbCustom/BreadCrumbCustom'
import * as actions from '../actions/RegisterManage'
import '../style/RegisterManage.less'

@connect(
  state => state,
  {...actions}
)

class RegisterManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null
    }
  }

  componentDidMount() {
  }

  render() {
    // 车辆管理
    let url1 = `http://13588193818.gadj.yiding.me/manager/roomRecord`
    return (
      <div>
        <BreadCrumbCustom first="系统管理" second="登记管理"/>
        <Row gutter={16}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
                <Card>
                  <div className="father_frame">
                    <iframe 
                      id="mainFrame" 
                      name="mainFrame" 
                      scrolling="no"
                      src={url1}
                      frameborder="0">
                    </iframe>
                  </div>
                </Card>
            </div> 
          </Col>
        </Row> 
        
      </div>
    );
  }
}

export default RegisterManage;