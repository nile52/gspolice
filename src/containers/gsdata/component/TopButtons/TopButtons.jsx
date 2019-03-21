import React, { Component } from 'react';
import { 
    Modal,
    Form,
    Input,
    Button,
    Table,
    Spin
} from 'antd';
import $ from 'jquery';
import { withRouter } from 'react-router-dom'
import {
    CAS_CASCHECK,
    CAS_LOGIN,
    CAS_XQLIST,
    WEI_HOUSE_SEARCH
} from '../../../../fetch/apis'
import utils from '../../../../util/util.js'
import axios from 'axios'
import './TopButtons.less'
import '../../../../static/css/gsdata.less'
import xqCard from '../xqCard/xqCard';

const FormItem = Form.Item;

@withRouter

class TopButtons extends Component {
    constructor() {
        super()
        this.state = {
            btnsVisiable: false,
            subtitle: '',
            modalVisible: false,
            xqModalVisible: false,
            userList: [],
            searchLoading: false,
            xqList: [],
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
                Modal.info({
                    title: '异常',
                    content: "网络异常",
                    onOk() {},
                });
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


    getXqList = (userKey) => {
        const localUserKey = localStorage.getItem('userKey')
        const localId = localStorage.getItem('id')
        let p_userKey = ''
        if(userKey) {
          p_userKey = userKey
        } else if (localUserKey && localId) {
          p_userKey = localUserKey
        }
        axios.get(CAS_XQLIST, {
            params: {
                userKey: p_userKey
            }
        })
        .then(function (res) {
            let data = res.data
            if(data.msg === "成功" && data.success) {
              this.setState({
                xqList: data.obj,
              })
            } else {
            }
        }).catch(function (error) {
              console.log(error)
        });
    }


    btnToggle = () => {
        var visiable = this.state.btnsVisiable
        this.setState({
            btnsVisiable: !visiable
        })
    }

    linkTo = (e) => {
        e.preventDefault();
        const defaultValue = localStorage.getItem('levelValue')
        const level = localStorage.getItem('level')
        const levelId = localStorage.getItem('levelId')
        if(level != 'zoneId'){
            alert('请选择小区')

            // this.setState({
            //     xqModalVisible: true,
            // })

        } else {
            window.location.href="/gsdata/house"
        }
    }

    toPeoplePage = (e) => {
        var personId = $(e.target).attr('data-id');
        localStorage.setItem('personId', personId)
        window.location.href="/gsdata/people"
    }

    toSearch = (e) => {
        e.preventDefault();
        this.setState({
            modalVisible: true
        })
    }

    handleOk = (e) => {
        // console.log(e);
        this.setState({
            modalVisible: false,
        });
    }

    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            modalVisible: false,
        });
    }

    xqHandleOk = (e) => {
        // console.log(e);
        this.setState({
            xqModalVisible: false,
        });
    }

    xqHandleCancel = (e) => {
        // console.log(e);
        this.setState({
            xqModalVisible: false,
        });
    }

    goSearch(searchData){
        var param = searchData;
        let _this = this
        let userKey = this.props.userKey
        param.userKey = userKey
        if (userKey) {
            _this.setState({
                searchLoading: true,
            })
            axios.post(WEI_HOUSE_SEARCH, param)
            .then(function (res) {
                if(res.data.msg === "成功" && res.data.success) {
                    let userList = res.data.obj                 
                    _this.setState({
                        userList: userList,
                        searchLoading: false,
                    })
                } else if(res.data.msg === "微服务异常" && !res.data.success) {
                    // _this.casCheck(_this.props.userKey)
                }
            }).catch(function (error) {
                // _this.casCheck(_this.props.userKey)
            })          
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            if(values.name || values.idCard || values.licenseNumber){
                // console.log('success')
                var searchData = [];
                if (values.name) {
                    searchData.name = values.name
                }
                if (values.idCard) {
                    searchData.name = values.idCard
                }
                if (values.licenseNumber) {
                    searchData.licenseNumber = values.licenseNumber
                }
                this.goSearch(searchData)
            } else {
                alert('请输入搜索内容')
            }
          }
        });
    }

    componentWillMount(){
        this.getXqList();
    }

    componentDidMount(){
        $(".basic_btn").click(function(){
            $(".func_btn").animate({
              height:'toggle',
              width:'toggle'
            });
          });
        const path = this.props.location.pathname;
        var usernameEle = $('ul a');
        for (let i = 0; i < usernameEle.length; i++) {
            const element = usernameEle[i].pathname;
            var index = path.indexOf(element);
            if (index > -1) {
                var subTitle = $(usernameEle[i]).attr('title')
                this.setState({
                    subtitle: subTitle
                })
                $('ul a').eq(i).attr('href', '/gsdata/index').addClass('toindex')
            } 
        }

        var cards = $('.card-drop'), 
        toggler = cards.find('.toggle'), 
        links = cards.find('ul>li'), 
        li = links, 
        count = links.length, width = 100;

        console.log(cards, toggler, links, li, count);
        
        li.each(function (i) {
            $(this).css('z-index', count - i);
        });
        function setClosed() {
            var cards = $('.card-drop');
            cards.each(function (index) {
                links = $(this).find('ul>li');
                li = links
                li.each(function (index) {
                    $(this).css('top', index * 4).css('width', width - index * 0.5 + '%').css('margin-left', index * 0.25 + '%');
                });
                li.addClass('closed');
                toggler.removeClass('active');
            })
        }
        setClosed();

        
        toggler.on('mousedown', function () {
            var $this = $(this),
                li = $this.siblings('ul').find('li');
                // console.log(li);
            if ($this.is('.active')) {
                setClosed();
            } else {
                $this.addClass('active');
                li.removeClass('closed');
                li.each(function (index) {
                    $(this).css('top', 60 * (index + 1)).css('width', '100%').css('margin-left', '0px');
                });
            }
        });
        $('.card-drop ul>li').on('click', function (e) {
            e.preventDefault;
            var $this = $(this), 
                label = $this.data('label'),
                li = $this
            li.removeClass('active');
            $this.parent().parent().find('li').removeClass('active');        
            $this.addClass('active');
            $this.parent().parent().siblings('.toggle').text(label);
            setClosed();
            
        });
    }

    render() {
        const {
            btnsVisiable,
            subtitle,
            userList,
            xqList,
        } = this.state;

        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 6,
                },
            },
        };

        const xqCardProps = {
            xqList: xqList,
        }

        const { getFieldDecorator } = this.props.form;

        var dataSource = []

        if (userList) {
            userList.map((item, index) => {
                var useritem = {
                    key: item.user.id,
                    name: item.user.name,
                    idCard: item.user.idCard,
                    mobile: item.user.mobile,
                }
                return dataSource.push(useritem)
            })
        }

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <span className="result_name" data-id={record.key} onClick={this.toPeoplePage}>{text}</span>,
        }, {
            title: '身份证',
            dataIndex: 'idCard',
            key: 'idCard',
        }, {
            title: '手机',
            dataIndex: 'mobile',
            key: 'mobile',
        }];
        
        return (
            <div className="data_info_left_top">
                <div className="top_btns">
                    <div className="basic_btn" title="展开/收起" 
                        // onClick={this.btnToggle}
                    ></div>
                    {/* <div className={'btnshow_' + btnsVisiable + ' func_btn animated rollIn'} > */}
                    <div className="func_btn">
                        <ul>
                            <a href="/gsdata/realtime" title="实时监控"><li></li></a>
                            <a href="/gsdata/mac" title="MAC探针"><li></li></a>
                            <a href="/gsdata/door" title="门禁"><li></li></a>
                            <a href="/gsdata/car" title="车闸"><li></li></a>
                            <a href="/gsdata/people" title="住户详情" onClick={this.toSearch}><li></li></a>
                            <a href="/gsdata/face" title="人脸监控"><li></li></a>
                            <a href="/gsdata/monitor" title="布控"><li></li></a>
                            <a href="/gsdata/house" title="房屋详情" onClick={this.linkTo}><li></li></a>
                        </ul>
                    </div>
                </div>
                <div className="top_title">
                    <p>
                        <span>智</span>
                        <span>慧</span>
                        <span>安</span>
                        <span>防</span>
                        <span>小</span>
                        <span>区</span>
                        <span>管</span>
                        <span>理</span>
                        <span>平</span>
                        <span>台</span>
                    {subtitle ?  " · "+subtitle : ''}</p>
                </div>


                {/* name idCard licenseNumber */}
                <Modal
                    className="search_modal transparency_modal"
                    title="搜索"
                    visible={this.state.modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={false}
                >
                    <Spin spinning={this.state.searchLoading}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                    label="姓名"
                                >
                                {getFieldDecorator('name', {
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                    label="身份证号"
                                >
                                {getFieldDecorator('idCard', {
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                    label="手机"
                                >
                                {getFieldDecorator('licenseNumber', {
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">搜索</Button>
                            </FormItem>
                        </Form>

                        { userList.length>0 ? 
                            <Table 
                                dataSource={dataSource} 
                                columns={columns} 
                                style= {{color: "#fff"}}
                            /> 
                        : ''}
                    </Spin>
                </Modal>


                <Modal
                    className="xq_modal transparency_modal"
                    title="选择小区"
                    visible={this.state.xqModalVisible}
                    onOk={this.xqHandleOk}
                    onCancel={this.xqHandleCancel}
                    footer={false}
                >
                    <xqCard {...xqCardProps} />
                </Modal>

            </div>
        );
    }
}

export default Form.create()(withRouter(TopButtons));