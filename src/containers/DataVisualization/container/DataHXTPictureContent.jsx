/* eslint-disable */
import React, {Component} from 'react';
import { findDOMNode } from 'react-dom'
import {Row, Col} from 'antd';
import screenfull from 'screenfull'
import '../style/DataVisualization.less'

class DataHXTPictureContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: null,
    }
  }

  onClickFullscreen = (player) => {
    screenfull.request(findDOMNode(this.hxt))
  }

  ref = hxt => {
    this.hxt = hxt
  }

  componentDidMount() {
  }

  render() {
    const {handleCancel, HXTPictureUrl, xqInfo} = this.props
    
    return (
      <div className="video_content">
        <div>
          <div className="video_content_title">
            {xqInfo.name}房屋动态表
          </div>
          <div className="video_content_close" onClick={(type) => handleCancel('huxingtuContentVisible')}>x</div>
          <Row>
            <div className="video_content_wrap">
              <img 
                className="modal_car_picture"
                src={HXTPictureUrl} 
                alt=""  
                ref={this.ref}
              />
            </div>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span={4} className="home_pause_btn_right">
              <button className="home_pause_btn" onClick={this.onClickFullscreen}>
                <i className="icon iconfont icon-fullscreen-o select_up_icon" ></i>
              </button>
            </Col>
          </Row> 
        </div>
      </div>
    )
  }
}

export default DataHXTPictureContent;