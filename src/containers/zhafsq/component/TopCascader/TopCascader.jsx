import React, { Component } from 'react';
import { Cascader, Modal } from 'antd';
import $ from 'jquery';
import { withRouter } from 'react-router-dom'
import {CAS_CASCHECK, WEI_ZONE_INFO, CAS_LOGIN} from '../../../../fetch/apis'
import utils from '../../../../util/util.js'
import axios from 'axios'
import './TopCascader.less'
import { combinationsReplacement } from 'simple-statistics';

@withRouter

class TopCascader extends Component {
    constructor(props) {
        super(props)
        this.getLevel = this.getLevel.bind(this)
        this.state = {
            level: []
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

    getLevel(){
      let _this = this
      let userKey = this.props.userKey
      if (userKey) {
        axios.post(WEI_ZONE_INFO, {
                userKey: userKey,
        })
        .then(function (res) {
            if(res.data.msg === "成功" && res.data.success) {
                let level = res.data.obj
                _this.setState({
                    level: level,
                })
                // localStorage.setItem('id', item.id)
            } else if(res.data.msg === "微服务异常" && !res.data.success) {
                // _this.casCheck(_this.props.userKey)
            }
        }).catch(function (error) {
            // _this.casCheck(_this.props.userKey)
        })          
      }
    }

    onChange = (value, selectedOptions) => {
        let len = value.length;
        let levelId = value[len-1];
        let level = selectedOptions[len-1].level;       
        this.props.changev({
            level: level,
            levelId: levelId,
        })
        localStorage.setItem('levelValue', value)
        localStorage.setItem('level', level)
        localStorage.setItem('levelId', levelId)
        if (this.props.location.pathname == '/gsdata/house') {
            if (level != 'zoneId') {
                alert('请选择小区')
            } else {
                this.props.allPost()
            }
        } else {
            this.props.allPost()
        }
    }

    filter = (inputValue, path) => {
        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    }

    componentWillMount(){
      this.getLevel()
    }

    render() {
        const options = this.state.level;
        var defaultValue = localStorage.getItem('levelValue')? localStorage.getItem('levelValue').split(",") : ["2"]; 
        return (
            <Cascader
                style={{ width: "100%"}}
                defaultValue={defaultValue}
                options={options}
                changeOnSelect={this.props.changeOnSelect}  //允许只选中父级选项
                onChange={this.onChange}
                placeholder="请选择" 
                displayRender={label => label.join(' · ')}  //选择后展示的渲染函数
                showSearch={this.filter}
                allowClear={false}  //不支持清除
            />
        );
    }
}

export default withRouter(TopCascader);