/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import utils from '../../../../util/util.js'
import {
    CAS_LOGIN, 
    CAS_CASCHECK, 
    GET_THIRD_TOKEN
} from '../../../../fetch/apis'
import {Row, Col, Card, Modal} from 'antd'
import BreadCrumbCustom from '../../../../component/BreadCrumbCustom/BreadCrumbCustom'
import * as actions from '../actions/CarsManage'
import '../style/CarsManage.less'

@connect(
  state => state,
  {...actions}
)

class CarsManage extends Component {
  constructor(props) {
    super(props)
    this.casCheck = this.casCheck.bind(this)
    this.getToken = this.getToken.bind(this)
    this.state = {
      token: null
    }
  }

  casCheck = (userKey) => {
    const PARAMS = {
      userKey: userKey,
    }
    axios.get(CAS_CASCHECK, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
          toastr.error('网络异常')
            // Modal.info({
            //     title: '异常',
            //     content: "网络异常",
            //     onOk() {},
            // });
        } else {
            utils.toLoginUrl(CAS_LOGIN)
            localStorage.setItem('userKey', null)
            localStorage.setItem('id', null)
        }
    }).catch(function (error) {
      console.log(error)
      utils.toLoginUrl(CAS_LOGIN)
      localStorage.setItem('userKey', null)
      localStorage.setItem('id', null)
    });
  }

  getToken = () => {
    let _this = this
    const userKey = localStorage.getItem('userKey')
    const localId = localStorage.getItem('id')
    const PARAMS = {
        userKey: userKey,
        zoneId: localId
    }
    axios.get(GET_THIRD_TOKEN, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj
            _this.setState({
              token: data
            }) 
        }
    }).catch(function (error) {
      console.log(error)
      _this.casCheck(userKey)
    });
  }

  componentDidMount() {
    this.getToken()
  }

  render() {
    let url = this.props.CarsManage.url
    // 车辆管理
    let url1 = `http://${url}/ipms/index.jsp?isThird=true&userName=system&token=`
    return (
      <div>
        <BreadCrumbCustom first="基本信息管理" second="车辆信息管理"/>
        <Row gutter={16}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
                <Card>
                  {this.state.token?<div className="father_frame"><iframe 
                  id="mainFrame" 
                  name="mainFrame" 
                  scrolling="no"
                  src={`${url1}${this.state.token}`}
                  frameborder="0"></iframe></div>:null}
                </Card>
            </div> 
          </Col>
        </Row> 
        
      </div>
    );
  }
}

export default CarsManage;