/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/Old'
import IndexTopHeader from '../../component/IndexTopHeaderOld/IndexTopHeader'
import '../style/Old.less'

import community from '../../../../static/images/zhafsq/old_community.png'
import manAge from '../../../../static/images/zhafsq/old_man_age.png'
import paixu from '../../../../static/images/zhafsq/old_paixu.png'
import yujing from '../../../../static/images/zhafsq/old_yujing.png'

@connect(
    state => state,
    {...actions}
)

class Old extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cascaderLabel: localStorage.getItem('label') ? localStorage.getItem('label') : '拱墅区',
    }
  }

  // 拿到TopCascaderModalContent组件级联选择的数据
  confirmCascaderChange = (value) => {
    this.props.changev({
      levelValue: value.levelValue,
      level: value.level,
      levelId: value.levelId,
    })
    localStorage.setItem('levelValue', value.levelValue)
    localStorage.setItem('level', value.level)
    localStorage.setItem('levelId', value.levelId)
    localStorage.setItem('label', value.label)
    this.setState({
      cascaderLabel: value.label
    })
    // this.allPost()
    // this.restartWebSocket()
  }
  
  componentWillMount(){
    this.props.getLevel()
  }

  componentDidMount() {}

  render() {
    const {
      cascaderLabel,
    } = this.state
    const {
      level
    } = this.props.ZHAFOld
    
    let indexTopHeaderProps = null
    if (level) {
      indexTopHeaderProps = {
        confirmCascaderChange: this.confirmCascaderChange,
        changeOnSelect: true,
        level: level,
        label: cascaderLabel,      
        titleType: 'type2',
        title: '老年人活动预警',
        subTitle: '蔡马人家',
      }      
    }

    return (
        <div className="page-container">
          <div className="top_fix">
            <IndexTopHeader {...indexTopHeaderProps}/>
          </div> 
          <div className="bottom_fix">
            <img src={manAge}/>
            <img style={{marginTop: '10px'}} src={paixu}/>
          </div>    
          <div className="left_fix">
            <img src={yujing}/>
          </div>
          <div className="right_fix">
            <img src={community}/>
          </div>
        </div>
    )
  }
}

export default Old;