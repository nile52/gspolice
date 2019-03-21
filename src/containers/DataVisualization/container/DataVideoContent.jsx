import React, {Component} from 'react';
import { findDOMNode } from 'react-dom'
import {Row, Col} from 'antd';
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import '../style/DataVisualization.less'

class DataVideoContent extends Component {
  constructor(props) {
    super(props)
    this.reload = this.reload.bind(this)
    this.state = {
      url: 'http://60.191.94.122:9952/live/cameraid/1000090%240/substream/1.m3u8',
      playing: true,
    }
  }

  playPause = (playing) => {
    this.setState({ [playing]: !this.state[playing] })
  }

  reload = (type) => {
    clearTimeout(timer)
    var timer = setTimeout(() => {
      this.setState({
        url: 'http://60.191.94.122:9952/live/cameraid/1000090%240/substream/1.m3u8',
        playing: true
      })
    }, 100)
    this.setState({ url: null, playing: false })
  }

  onClickFullscreen = (player) => {
    screenfull.request(findDOMNode(this.player))
  }

  ref = player => {
    this.player = player
  }

  componentDidMount() {
  }

  render() {
    const { url, playing } = this.state
    const {handleCancel, homePlayUrl} = this.props
    return (
      <div className="video_content">
        <div>
          <div className="video_content_title">
            直播视频
          </div>
          <div className="video_content_close" onClick={(type) => handleCancel('videoContentVisible')}>x</div>
          <Row>
            <div className="video_content_wrap">
              <ReactPlayer 
                ref={this.ref}
                url={homePlayUrl}
                playing={playing}
                width='100%'
                height='100%'  
              />
            </div>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span={8} className="home_pause_btn_left">
              <button className="home_pause_btn" onClick={(playing) => this.playPause('playing')}>{playing ? 
                <i className="icon iconfont icon-pause select_up_icon" ></i> : 
                <i className="icon iconfont icon-play select_up_icon" ></i>}
              </button>
              <button className="home_pause_btn" onClick={this.reload}> 
                <i className="icon iconfont icon-reload" ></i>
              </button>
            </Col>
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

export default DataVideoContent;