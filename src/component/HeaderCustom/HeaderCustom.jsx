import React, { Component } from 'react';
import { Menu, Icon, Layout, Popover, Dropdown, Modal } from 'antd';
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import * as toastr from 'toastr';
import '../../static/css/toastr.min.css';
import SiderCustom from '../SiderCustom/SiderCustom';
import {CAS_LOGIN, CAS_XQLIST, CAS_LOGOUT, CAS_CASCHECK, WEI_ZONE_SYSTEM} from '../../fetch/apis'
import utils from '../../util/util.js'
const { Header } = Layout;
const MenuItemGroup = Menu.ItemGroup;

@withRouter

class HeaderCustom extends Component {
    constructor() {
        super()
        this.changeXq = this.changeXq.bind(this)
        this.logout = this.logout.bind(this)
        this.casCheck = this.casCheck.bind(this)
        this.state = {
            visible: false,
            xqList: [],
            defaultXq: '',
            fontAuth: false,
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

    changeXq(item) {
        let _this = this
        if(this.state.defaultXq !== item.name) {
            Modal.confirm({
                title: '切换小区',
                content: '您即将离开对本小区操作，当前未提交的修改可能无法正确保存，是否切换？',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    axios.get(WEI_ZONE_SYSTEM, {
                        params: {
                            userKey: _this.props.userKey,
                            zoneId: item.id
                        }
                    })
                    .then(function (res) {
                        if(res.data.msg === "成功" && res.data.success) {
                            let url = res.data.obj.url
                            _this.props.changev({
                                url: url,
                                id: item.id
                            })
                             _this.setState({
                                defaultXq: item.name,
                            })
                            localStorage.setItem('id', item.id)
                        } else if(res.data.msg === "微服务异常" && !res.data.success) {
                            _this.casCheck(_this.props.userKey)
                        }
                    }).catch(function (error) {
                        _this.casCheck(_this.props.userKey)
                    })
                    
                },
                onCancel() {}
            });
        }
    }

    logout() {
        window.location.href=`${CAS_LOGOUT}?userKey=${this.props.userKey}`
        localStorage.setItem('userKey', null)
        localStorage.setItem('id', null)
    }

    componentWillMount() {
        let _this = this
        const resource = this.props.userInfo.resource
        if(resource.length>0) {
            switch(resource.length) {
                case 1:
                    if(resource[0].value == '/**') {
                        this.setState({
                            fontAuth: true
                        })
                    }else {
                        this.setState({
                            fontAuth: false
                        })
                    }
                    break;
                default:
                    resource.map(function(item) {
                        if(item.value == "/datavisualization") {
                            _this.setState({
                                fontAuth: true
                            })
                        }
                    })
                    break;
            }
        } else {
            this.setState({
                fontAuth: false
            })
        }
      }

    componentDidMount() {
        let _this = this
        axios.get(CAS_XQLIST, {
            params: {
                userKey: this.props.userKey
            }
        })
        .then(function (res) {
            let data = res.data
            if(data.msg == "成功" && data.success) {
                let localId = localStorage.getItem('id')
                let id = '', defaultXq = ''
                if(localId && localId!='null') {
                    id = localId
                    data.obj.forEach(item => {
                        if(item.id == localId) {
                            defaultXq = item.name
                        }
                    })
                } else {
                    id = data.obj[0].id
                    defaultXq = data.obj[0].name
                }
                
                axios.get(WEI_ZONE_SYSTEM, {
                    params: {
                        userKey: _this.props.userKey,
                        zoneId: id
                    }
                })
                .then(function (res) {
                    if(res.data.msg === "成功" && res.data.success) {
                        let url = res.data.obj.url
                        _this.props.changev({
                            id: id,
                            url: url
                        })
                        _this.setState({
                            xqList: data.obj,
                            defaultXq: defaultXq
                        })
                        localStorage.setItem('id', id)
                    }
                })
            } else if(res.data.msg === "微服务异常" && !res.data.success) {
                _this.casCheck(_this.props.userKey)
            }
        }).catch(function (error) {
            _this.casCheck(_this.props.userKey)
        });
    }

    render() {
        let _this = this
        const {path} = this.props;
        const {fontAuth} = this.state
        const XQMenu = (
        <Menu>
            {this.state.xqList.map(function(item, index) {
                return <Menu.Item key={index} onClick={() => _this.changeXq(item)}>
                <span>{item.name}</span>
                </Menu.Item>
            })}
        </Menu>
        );
        return (
        <Header style={{ background: '#fff', padding: 0, height: 65 }} className="custom-theme" >
            {
                this.props.isMobile ? (
                    <div className="header-title-left">
                        <Popover content={<SiderCustom path={path} popoverHide={this.popoverHide} />} trigger="click" placement="bottomLeft" visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
                            <Icon type="bars" className="trigger custom-trigger" />
                        </Popover>
                    </div>
                ) : (
                    <div className="header-title-left">
                        <Icon
                            className="trigger custom-trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                        <span className="xq-name">{this.state.defaultXq}</span>    
                        <Dropdown overlay={XQMenu}>
                            <a className="ant-dropdown-link">
                            [切换小区] <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                )
            }
            
            <Menu
                mode="horizontal"
                style={{ lineHeight: '64px', float: 'right' }}
                onClick={this.menuClick}
            >
                {fontAuth ? <Menu.Item key="full" onClick={this.screenFull} >
                        <Link to="/datavisualization">
                            <span style={{'color':'#FF6600'}}>
                            展示视图
                            </span>    
                        </Link>
                    </Menu.Item> : null
                }
                <Menu.Item key="1">
                    当前用户：<span>{this.props.userInfo.userName}</span>    
                </Menu.Item>
                {this.props.isMobile ? null : 
                    <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                }
            </Menu>
            <style>{`
                .ant-menu-submenu-horizontal > .ant-menu {
                    width: 120px;
                    left: -40px;
                }
            `}</style>
        </Header>
        );
    }
}

export default HeaderCustom;