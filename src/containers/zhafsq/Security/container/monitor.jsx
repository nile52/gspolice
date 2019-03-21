import React, { Component } from 'react'
import './../style/style.less'
import pictitle from '../../../../static/images/zhafsq/border_after_index.png'
import picmonitor from '../../../../static/images/49.png'
import img from '../../../../static/images/zhafsq/monitor.jpg'
import bgleft from '../../../../static/images/zhafsq/0.png'
import bgright from '../../../../static/images/zhafsq/1.png'
import { Table } from 'antd'
import bg from '../../../../static/images/zhafsq/border_after_index.png'
import close from '../../../../static/images/zhafsq/X.png'
class monitor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      monitorDetail: {

        'name': '佳源银座一楼大厅测试设备IPC001R',
        'describe': 'DH-IPC-HE8255F-I超星光',
        'type': '枪机',
        'owner': 'XX业主',
        'publictime': '2019-01-0100:00:01',
        'protect': '浙江启融',
        'lasttime': '2019_01_09 18:00:01',
        'video': img
      }
    }
  }
  
  closebox() {
    var monitor = document.querySelector('.monitor');
    monitor.style.display = 'none'
  }

  render() {
    return (
      <div className="monitor">
        <div className="baseDataTitle">
          <div className="baseDataTitle_left">
            <i>{this.state.monitorDetail.name}</i>
            <img src={bg} />
          </div>
          <div className="baseDataTitle_right">
            <span>{this.state.monitorDetail.describe}</span>
            <em>
              <img src={bgleft} className="bgleft" />
              {this.state.monitorDetail.type}
              <img src={bgright} className="bgright" />
            </em>
          </div>
          <img src={close} onClick={this.closebox.bind(this)} />
        </div>
        <div className="content">
          <div className="content_top">
            <div className="content_left">
              <span className="firsts">业主单位：</span>
              <i className="firsti">{this.state.monitorDetail.owner}</i><br />
              <span className="seconds">维保单位：</span>
              <i className="secondi">{this.state.monitorDetail.protect}</i><br />
            </div>
            <div className="content_right">
              <span className="firsts">上线时间：</span>
              <i className="firsti">{this.state.monitorDetail.publictime}</i><br />
              <span className="seconds">上次检修时间：</span>
              <i className="secondi">{this.state.monitorDetail.lasttime}</i><br />
            </div>
          </div>
          <div className="content_bottom">
            <img src={this.state.monitorDetail.video} />
          </div>
        </div>
      </div>
    )
  }
}
export default monitor;