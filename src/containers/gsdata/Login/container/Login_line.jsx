/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions/Login'
import $ from 'jquery'
import badge from '../../../../static/images/gawing/login/badge.png'
import avatar from '../../../../static/images/gawing/login/avatar.png'
import '../style/Login.less'

import '../../../../static/css/animate.css';
import CanvasNest from './canvas-nest.js';


@connect(
    state => state,
    {...actions}
)

class Login extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
      
  }

  render() {
    return (
      <div className="body">
        <div id="holder"></div>
        <div id="container">
            <img className="cones-inner" src={badge} />
            <img src={avatar} />
            <p className="user_name">用户名</p>
            <button className="login_btn">KPI 登录</button>
        </div>
    </div>
    )
  }
}

export default Login;
