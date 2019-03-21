/* eslint-disable */
import React, {Component} from 'react';
import { findDOMNode } from 'react-dom'
import {Row, Col} from 'antd';
import screenfull from 'screenfull'
import '../style/DataVisualization.less'

class DataPictureContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: null,
    }
  }

  onClickFullscreen = (player) => {
    screenfull.request(findDOMNode(this.picture))
  }

  ref = picture => {
    this.picture = picture
  }

  componentDidMount() {
  }

  render() {
    const {handleCancel, homePictureUrl} = this.props
    return (
      <div className="video_content">
        <div>
          <div className="video_content_title">
            车辆截图
          </div>
          <div className="video_content_close" onClick={(type) => handleCancel('pictureContentVisible')}>x</div>
          <Row>
            <div className="video_content_wrap">
              <img 
                className="modal_car_picture"
                src={homePictureUrl} 
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

export default DataPictureContent;