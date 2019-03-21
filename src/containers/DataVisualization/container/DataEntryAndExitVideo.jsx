import React, {Component} from 'react';
import { findDOMNode } from 'react-dom'
import {Row, Col, Tag, Pagination} from 'antd';
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import '../style/DataVisualization.less'

class DataEntryAndExitVideo extends Component {
  constructor(props) {
    super(props)
    this.reload = this.reload.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.state = {
      url1: null,
      url2: null,
      playing1: true,
      playing2: true,
      activeTab: "video",
      current: 1,
    }
  }

  playPause = (playing) => {
    this.setState({ [playing]: !this.state[playing] })
  }

  reload = (type) => {
    if(type === 'url1') {
      clearTimeout(timer1)
      var timer1 = setTimeout(() => {
        this.setState({
          url1: 'http://60.191.94.122:9952/live/cameraid/1000090%240/substream/1.m3u8',
          playing1: true
        })
      }, 100)
      this.setState({ url1: null, playing1: false })
    } else if (type === 'url2') {
      clearTimeout(timer2)
      var timer2 = setTimeout(() => {
        this.setState({
          url2: 'http://60.191.94.122:9952/live/cameraid/1000090%240/substream/1.m3u8'
        })
      }, 100)
      this.setState({
        url2: null
      })
    }
  }

  onClickFullscreen = (player) => {
    screenfull.request(findDOMNode(this[player]))
  }

  ref1 = player => {
    this.player1 = player
  }

  ref2 = player => {
    this.player2 = player
  }
  
  itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return null;
    } else if (type === 'next') {
      return null;
    }
    return originalElement;
  }

  onPageChange = (num) => {
    let _this = this
    this.setState({
      current: num
    }, () => {
      _this.props.getServicesList({}, num)
    })
  }

  componentDidMount() {
  }

  componentWillMount() {
    const {
      defaultPlayUrl1,
      defaultPlayUrl2
    } = this.props
    if(defaultPlayUrl1 && defaultPlayUrl2) {
      this.setState({
        url1: defaultPlayUrl1,
        url2: defaultPlayUrl2,
      })
    }
  }
  
  // 离开后，停止视频播放请求
  componentWillUnmount() {
    this.setState({
      url1: null,
      url2: null,
    })
  }

  render() {
    const { url1, url2, playing1, playing2, activeTab, current } = this.state
    const {
      fontServicesList,
      eqTotal
    } = this.props
    return (
      <div className="entry_exit_video">
        
        <div className="entry_exit_video_title">
          <div className={activeTab == "video"?"entry_exit_video_title_tab entry_exit_video_title_tab_active":"entry_exit_video_title_tab"} onClick={() => {
            this.setState({
              activeTab: "video"
            })
          }}>出入口视频</div> 
          <div className={activeTab == "video"?"entry_exit_video_title_tab":"entry_exit_video_title_tab entry_exit_video_title_tab_active"} onClick={() => {
            this.setState({
              activeTab: "equire"
            })
          }}>设备列表</div> 
        </div>
        {
          activeTab === "video" ? <div>
          <Row>
            <div className="entry_exit_video_up">
              <ReactPlayer 
                ref={this.ref1}
                url={url1}
                playing={playing1}
                width='100%'
                height='100%'  
              />
            </div>
          </Row>
          <div>
            <Row type="flex" justify="space-between">
              <Col span={8} className="home_pause_btn_left">
                <button className="home_pause_btn" onClick={(playing) => this.playPause('playing1')}>{playing1 ? 
                  <i className="icon iconfont icon-pause select_up_icon" ></i> : 
                  <i className="icon iconfont icon-play select_up_icon" ></i>}
                </button>
                <button className="home_pause_btn" onClick={(type) => this.reload('url1')}> 
                  <i className="icon iconfont icon-reload" ></i>
                </button>
              </Col>
              <Col span={4} className="home_pause_btn_right">
                <button className="home_pause_btn" onClick={(player) => this.onClickFullscreen('player1')}>
                  <i className="icon iconfont icon-fullscreen-o select_up_icon" ></i>
                </button>
              </Col>
            </Row> 
            <div style={{height: '4rem'}}></div>
            <Row>
              <div className="entry_exit_video_down">
                <ReactPlayer 
                  ref={this.ref2}
                  url={url2}
                  playing={playing2}
                  width='100%'
                  height='100%'
                />
              </div>
            </Row> 
            <Row type="flex" justify="space-between">
              <Col span={8} className="home_pause_btn_left">
                <button className="home_pause_btn" onClick={(playing) => this.playPause('playing2')}>{playing2 ? 
                  <i className="icon iconfont icon-pause select_up_icon" ></i> : 
                  <i className="icon iconfont icon-play select_up_icon" ></i>}
                </button>
                <button className="home_pause_btn" onClick={(type) => this.reload('url2')}> 
                  <i className="icon iconfont icon-reload" ></i>
                </button>
              </Col>
              <Col span={4} className="home_pause_btn_right">
                <button className="home_pause_btn" onClick={(player) => this.onClickFullscreen('player2')}>
                  <i className="icon iconfont icon-fullscreen-o select_up_icon" ></i>
                </button>
              </Col>
            </Row> 
          </div>
        </div>: <div className="eq_list_wrap">
          <Row>
            <Col span={16} className="eq_list_row_wrap">
              <div className="eq_list_row_item">
                <Row>
                  <Col span={8}><span className="eq_list_row_item_text">设备名称</span></Col>
                  <Col span={8}><span className="eq_list_row_item_text">设备类型</span></Col>
                  <Col span={8}><span className="eq_list_row_item_text">设备状态</span></Col>
                </Row>
              </div>
              {fontServicesList.map((item, index) => {
                return (
                  <div className="eq_list_row_item">
                    <Row>
                      <Col span={8}><span className="eq_list_row_item_content" title={item.servicename}>{item.servicename}</span></Col>
                      <Col span={8}><span className="eq_list_row_item_content" title={item.deviceName}>{item.deviceName}</span></Col>
                      <Col span={8}><span className="eq_list_row_item_content"><Tag color={item.state?"#87d068":"red"}>{item.state?"运行中":"离线"}</Tag></span></Col>
                    </Row>
                  </div>
                )
              })}
              <div className="eq_pagination">
                <Pagination 
                  // simple
                  itemRender={this.itemRender}
                  current={current} 
                  pageSize={20} 
                  total={eqTotal} 
                  onChange={this.onPageChange}
                />
              </div>
            </Col>
          </Row>
        </div>
        }
      </div>
    )
  }

}

export default DataEntryAndExitVideo;