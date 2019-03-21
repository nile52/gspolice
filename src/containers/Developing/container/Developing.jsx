/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Button} from 'antd'
import '../style/Developing.less'

class Developing extends Component {
  constructor(props) {
    super(props)
      this.state = {
    }
  }

  componentDidMount() {
    let mainDom =  document.querySelector('.developing_wrap')
    // document.documentElement.clientHeight
    let screenH = document.documentElement.clientHeight
    mainDom.style.height = screenH + 'px'
    window.onResize = function () {
      let mainDom =  document.querySelector('.developing_wrap')
      // document.documentElement.clientHeight
      let screenH = document.documentElement.clientHeight
      mainDom.style.height = screenH + 'px'
    }
  }

  render() {
    return (
      <div className="developing_wrap">
        <div className="developing_top"></div>
        <div className="developing_middle"></div>
        <div className="develop">正在<span className="develop_text_big">建设</span>中…</div>
        <div className="go_home"><Link to="/datavisualization"><Button type="primary" size='large'>回到首页</Button></Link></div>
      </div>
    );
  }
}

export default Developing;