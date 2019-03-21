/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/Gale'
import IndexTopHeader from '../../component/IndexTopHeaderOld/IndexTopHeader'
import '../style/Gale.less'

import days from '../../../../static/images/zhafsq/gale_7days.png'
import map from '../../../../static/images/zhafsq/gale_map.png'
import flow from '../../../../static/images/zhafsq/gale_flow.png'
import yujing from '../../../../static/images/zhafsq/gale_yujing.png'

@connect(
    state => state,
    {...actions}
)

class Gale extends Component {
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
    this.allPost()
    this.restartWebSocket()
  }

  
  componentWillMount(){
    this.props.getLevel()
  }

  componentDidMount() {

  }

  render() {
    const {
      cascaderLabel,
    } = this.state
    const {
      level
    } = this.props.ZHAFGale

    
    let indexTopHeaderProps = null
    if (level) {
      indexTopHeaderProps = {
        confirmCascaderChange: this.confirmCascaderChange,
        changeOnSelect: true,
        level: level,
        label: cascaderLabel,      
        titleType: 'type2',
        title: '陌生人活动预警',
        subTitle: '蔡马人家',
      }      
    }
  
    return (
      <div className="page-container">
        <div className="top_fix">
          <IndexTopHeader {...indexTopHeaderProps}/>
        </div> 
        <div className="bottom_fix">
          <img style={{marginLeft: '463px'}} src={map}/>
          <img style={{marginTop: '9px'}} src={yujing}/>
        </div>    
        <div className="left_fix">
          <img src={flow}/>
        </div>
        <div className="right_fix">
          
          <img src={days}/>
        </div>
      </div>
    )
  }
}

export default Gale;