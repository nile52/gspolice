import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { menus } from './menus';
import SiderMenu from './SiderMenu';
import {connect} from 'react-redux'
import utils from '../../util/util.js'
import Logo from '../../static/images/logo.jpg'
import './SiderCustom.less'
const { Sider } = Layout;

class SiderCustom extends Component {
  state = {
    collapsed: false,
    mode: 'inline',
    openKey: '',
    selectedKey: '',
    firstHide: true,        // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
    menuAuth: null
  };
  componentWillMount() {
    const resource = this.props.userInfo.resource
    let menuList = []
    let newResource = []
    let itemMenu = {}
    if(resource.length>0) {
        switch(resource.length) {
            case 1:
                if(resource[0].value == '/**') {
                    this.setState({
                        menuAuth: menus
                    })
                }
                break;
            default:
                resource.map(function(item) {
                    switch(item.value) {
                        case "/app/baseinfo":
                            newResource = resource.filter((item, index) => {
                                return item.value.match("/app/baseinfo/")
                            })
                            itemMenu = utils.createMenu(item, newResource)
                            menuList.push(itemMenu)
                            break
                        case "/app/communityinfo":
                            newResource = resource.filter((item, index) => {
                                return item.value.match("/app/communityinfo/")
                            })
                            itemMenu = utils.createMenu(item, newResource)
                            menuList.push(itemMenu)
                            break
                        case "/app/commercialservice":
                            newResource = resource.filter((item, index) => {
                                return item.value.match("/app/commercialservice/")
                            })
                            itemMenu = utils.createMenu(item, newResource)
                            menuList.push(itemMenu)
                            break
                        case "/app/visitorsmanage":
                            newResource = resource.filter((item, index) => {
                                return item.value.match("/app/visitorsmanage/")
                            })
                            itemMenu = utils.createMenu(item, newResource)
                            menuList.push(itemMenu)
                            break
                        case "/app/systemmanage":
                            newResource = resource.filter((item, index) => {
                                return item.value.match("/app/systemmanage/")
                            })
                            itemMenu = utils.createMenu(item, newResource)
                            menuList.push(itemMenu)
                            break
                    }
                })
                this.setState({
                    menuAuth: menuList
                })
                break;
        }
    }
  }
  componentDidMount() {
    this.setMenuOpen(this.props);
  }
  componentWillReceiveProps(nextProps) {
      this.onCollapse(nextProps.collapsed);
      this.setMenuOpen(nextProps)
  }
  setMenuOpen = props => {
      const { pathname } = props.location;
      this.setState({
          openKey: pathname.substr(0, pathname.lastIndexOf('/')),
          selectedKey: pathname
      });
  };
  onCollapse = (collapsed) => {
      this.setState({
          collapsed,
          firstHide: collapsed,
          mode: collapsed ? 'vertical' : 'inline',
      });
  };
  menuClick = e => {
      this.setState({
          selectedKey: e.key
      });
      const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
      popoverHide && popoverHide();
  };
  openMenu = v => {
      this.setState({
          openKey: v[v.length - 1],
          firstHide: false,
      })
  };
  render() {
      return (
          <Sider
              trigger={null}
              breakpoint="lg"
              collapsed={this.props.collapsed}
              style={{ overflowY: 'auto' }}
          >
              <div className="logo"><img src={Logo} className="logo_side"/>{this.props.collapsed?"":"智慧小区"}</div>
              <SiderMenu
                  menus={this.state.menuAuth}
                  onClick={this.menuClick}
                  theme="dark"
                  mode="inline"
                  selectedKeys={[this.state.selectedKey]}
                  openKeys={this.state.firstHide ? null : [this.state.openKey]}
                  onOpenChange={this.openMenu}
              />
              <style>
                  {`
                  #nprogress .spinner{
                      left: ${this.state.collapsed ? '70px' : '206px'};
                      right: 0 !important;
                  }
                  `}
              </style>
          </Sider>
      )
  }
}

export default withRouter(SiderCustom);