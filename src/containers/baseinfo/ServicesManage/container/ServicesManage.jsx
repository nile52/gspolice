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
import {Row, Col, Card, Tabs, Modal} from 'antd'
import BreadCrumbCustom from '../../../../component/BreadCrumbCustom/BreadCrumbCustom'
import $ from 'jquery'
import * as actions from '../actions/ServicesManage'
const TabPane = Tabs.TabPane;
import '../style/ServicesManage.less'

@connect(
  state => state,
  {...actions}
)

class ServicesManage extends Component {
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
      _this.casCheck(userKey)
    });
  }

  componentDidMount() {
    this.getToken()
  }

  render() {
    let url = this.props.ServicesManage.url
        // 一卡通管理
    let url1 = `http://${url}/CardSolution/card/accessControl/page/index_new?isThird=true&userName=system&token=`,
        // 可视对讲
        url2 = `http://${url}/vims/#!/device-manager?isThird=true&token=`,
        // 入口管理
        url3 = `http://${url}/ipms/index.jsp#!/basic-setting/device-manager?isThird=true&userName=system&token=`,
        //  基础应用设备
        url4 = `http://${url}/admin/tab_open.action?systemName=admin&menuCode=032002001&allParentsCode=032002&userIp=127.0.0.1&token=`
    return (
      <div>
        <BreadCrumbCustom first="基本信息管理" second="设备信息管理"/>
        <Row gutter={16}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
                <Card>
                  <Tabs defaultActiveKey="1" onChange={this.getToken}>
                    <TabPane tab="一卡通管理" key="1" className="father_frame">
                      {
                        this.state.token?<iframe 
                        id="mainFrame" 
                        name="mainFrame" 
                        scrolling="no"
                        src={`${url1}${this.state.token}`}
                        frameborder="0"></iframe>:null
                      }
                    </TabPane>
                    <TabPane tab="可视对讲" key="2" className="father_frame">
                      {
                        this.state.token?<iframe 
                        id="mainFrame" 
                        name="mainFrame" 
                        scrolling="no"
                        src={`${url2}${this.state.token}`}
                        frameborder="0"></iframe>:null
                      }
                    </TabPane>
                    <TabPane tab="入口管理" key="3" className="father_frame">
                    {
                        this.state.token?<iframe 
                        id="mainFrame" 
                        name="mainFrame" 
                        scrolling="no"
                        src={`${url3}${this.state.token}`}
                        frameborder="0"></iframe>:null
                      }
                    </TabPane>
                    <TabPane tab="基础应用设备" key="4" className="father_frame">
                      {
                        this.state.token?<iframe 
                        id="mainFrame" 
                        name="mainFrame" 
                        scrolling="no"
                        src={`${url4}${this.state.token}`}
                        frameborder="0"></iframe>:null
                      }
                    </TabPane>
                  </Tabs>
                </Card>
            </div> 
          </Col>
        </Row> 
        
      </div>
    );
  }
}

export default ServicesManage;