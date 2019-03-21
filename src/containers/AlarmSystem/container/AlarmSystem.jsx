/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'

import * as actions from '../actions/AlarmSystem'
import '../style/AlarmSystem.less'
import {
  WEI_SERVICE
} from '../../../fetch/apis'
import axios from 'axios'



@connect(
    state => state,
    {...actions}
)

class AlarmSystem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  componentDidMount() {
    this.props.getServicesList()
    // 掉接口
    // 获取数据
   
  }
  
  render() {
    const {data} = this.props.AlarmSystem
    return (
      <div>{data}</div>
    )
  }
}

export default AlarmSystem;
