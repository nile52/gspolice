/* eslint-disable */
import React, { Component } from 'react';
import { Button, Layout } from 'antd';
import {connect} from 'react-redux'
import Router from '../../../routers/Router';
import SiderCustom from '../../../component/SiderCustom/SiderCustom';
import HeaderCustom from '../../../component/HeaderCustom/HeaderCustom';
const { Content, Footer } = Layout;

import * as actions from '../actions/App'
import { Divider } from 'antd';
// import '../style/App.less'

@connect(
    state => state,
    {...actions}
)

class App extends Component {
  constructor() {
    super()
    this.state = {
      collapsed: false,
      isMobile: false
    }
  }

  componentWillMount() {
    this.getClientWidth();
    window.onresize = () => {
        this.getClientWidth();
    }
  }
  componentDidMount() {
  }
  getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
      const clientWidth = document.body.clientWidth;
      this.setState({
        isMobile: clientWidth <= 992
      })
  };
  toggle = () => {
      this.setState({
          collapsed: !this.state.collapsed,
      });
  };

  render() {
    let userInfo = this.props.Page.userInfo?this.props.Page.userInfo:null
    let userKey = this.props.Page.userKey?this.props.Page.userKey:null
    let toChildProps = {
      isMobile: this.state.isMobile,
      toggle: this.toggle,
      collapsed: this.state.collapsed,
      userInfo: userInfo,
      userKey: userKey,
      changev: this.props.changev
    }
    return (
      userInfo?<Layout>
          {!this.state.isMobile && <SiderCustom {...toChildProps} />}
          <Layout style={{flexDirection: 'column'}}>
              <HeaderCustom {...toChildProps} />
              <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                  <Router/>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                智慧小区后台管理系统 ©2018 浙江启融科技有限公司
              </Footer>
          </Layout>
      </Layout>:<div></div>
    );
  }
}

export default App;
