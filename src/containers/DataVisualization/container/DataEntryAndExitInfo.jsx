/* eslint-disable */
import React, {Component} from 'react';
import {Row, Col, Modal} from 'antd';
import axios from 'axios'
import utils from '../../../util/util.js'
import {
  WEI_PERSONNEL_RECORD,
  CAS_CASCHECK,
  CAS_LOGIN,
  WS_URL
} from '../../../fetch/apis'
import Logo from '../../../static/images/logo.jpg'
import '../style/DataVisualization.less'

class DataEntryAndExitInfo extends Component {
  constructor(props) {
    super(props)
    this.casCheck = this.casCheck.bind(this)
    this.state = {
      stompClient: null,
      homeEntryAndExitList: [],
      nowZoneId: null,
      websocket: null
    }
  }

  casCheck = (userKey) => {
    const PARAMS = {
      userKey: userKey,
    }
    axios.get(CAS_CASCHECK, {
        params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
          toastr.error('网络异常')
            // Modal.info({
            //     title: '异常',
            //     content: "网络异常",
            //     onOk() {},
            // });
        } else {
            utils.toLoginUrl(CAS_LOGIN)
            localStorage.setItem('userKey', null)
            localStorage.setItem('id', null)
        }
    }).catch(function (error) {
      utils.toLoginUrl(CAS_LOGIN)
      localStorage.setItem('userKey', null)
      localStorage.setItem('id', null)
    });
  }

  getPersonnelRecord = () => {
    let _this = this
    const { userKey, id } = this.props
    const localUserKey = localStorage.getItem('userKey')
    const localId = localStorage.getItem('id')
    let p_userKey = ''
    let p_id = localId
    if(userKey) {
        p_userKey = userKey
    } else if (localUserKey) {
        p_userKey = localUserKey
    }
    const PARAMS = {
        userKey: p_userKey,
        zoneId: p_id,
        pages: 1,
        limit: 2,
        fields: 'id',
        rule: 'desc'
    }
    axios.get(WEI_PERSONNEL_RECORD, {
      params: PARAMS
    })
    .then(function (res) {
        if(res.data.msg === "成功" && res.data.success) {
            const data = res.data.obj.data
            if(data.length > 0) {
              _this.setState({
                homeEntryAndExitList: data
              })
            }else {
              _this.setState({
                homeEntryAndExitList: []
              })
            }
        } else if(res.data.msg === "微服务异常" && !res.data.success) {
          _this.casCheck(p_userKey)
        }
    }).catch(function (error) {
      _this.casCheck(p_userKey)
    });
  }

  componentWillMount(){
    let _this = this

    console.log(this.props);

    const localId = localStorage.getItem('id')
    const userId = this.props.userInfo.userId
    let zone_id = localId


    var websocket = new WebSocket(WS_URL)
    websocket.onopen = function () {
        // console.log("socket has been opened");
        var message = {
            action: "register",
            districtId:0,
            streetId:0,
            communityId:0,
            zoneId: zone_id,
            type:"callback"
        };
        message = JSON.stringify(message);
        websocket.send(message);
        _this.setState({
          nowZoneId: zone_id,
        })
        console.log(message + '1111111' + zone_id + userId)
    }
    _this.setState({
      websocket: websocket,
    })    
  }


  componentDidMount() {
    let _this = this
    var websocket = this.state.websocket
    websocket.onmessage = function (event) {
        const res = JSON.parse(event.data);
        console.log(res);
        if(res.obj) {
            _this.setState({
                homeEntryAndExitList: res.obj.data,
            })
        }
    }

  }


  // componentDidUpdate() {
  //   let _this = this
  //   var websocket = this.state.websocket
  //   const nowZoneId = this.state.nowZoneId
  //   const localId = localStorage.getItem('id')
  //   const userId = this.props.userInfo.userId
  //   let zone_id = localId

  //   if ( zone_id != nowZoneId ) {
  //     websocket.close();
  //     var websocket2 = new WebSocket(WS_URL)
  //     websocket2.onopen = function () {
  //       // console.log("socket has been opened");
  //       var message = {
  //           action: "register",
  //           districtId:0,
  //           streetId:0,
  //           communityId:0,
  //           zoneId: zone_id,
  //           type:"callback"
  //       };
  //       message = JSON.stringify(message);
  //       websocket2.send(message);
  //       _this.setState({
  //         nowZoneId: zone_id,
  //       })
  //       console.log(message + '222222' + zone_id + userId)
  //     }

  //     _this.setState({
  //       websocket: websocket2,
  //     })    

  //   }
  // }


  render() {
    const {
      homeEntryAndExitList
    } = this.state
    return (
      <div className="entry_exit_info">
        <div className="entry_exit_info_title">出入口人脸抓取比对</div>
        <div className="entry_exit_resident_wrap">
          {
            homeEntryAndExitList.length == 2 ? homeEntryAndExitList.map((item,index) => {
              let pic1 = item.pictureUrlCatch
              let pic2 = item.pictureUrlLocal
              let name = ''
              let phoneNum = ''
              let label = item.label
              let rigLocal = item.channelName
              let type = ''
              let colorClass = "tag_g"
              switch(item.state) {
                case 0:
                  name = item.guestName
                  type = '访客'
                  phoneNum = item.guestMobile
                break
                case 1:
                  name = item.userName
                  type = '住户'
                  phoneNum = item.userMobile
                  break
                case 2:
                  name = item.userName
                  type = '未知'
                  phoneNum = item.userMobile
                  colorClass = "tag_y"
                  break
              }
              let time = utils.timeToHMS(item.inOutDate)
              let addr = item.equipmentChannelName
              return (
                <div className="entry_exit_resident_item" key={index}>
                  <Row>
                    <Col span={4}>
                      <img src={pic1} alt="" className="entry_exit_resident_img"/>
                      <img src={pic2} alt="" className="entry_exit_resident_img"/>
                    </Col>
                    <Col span={20}>
                      <div className="resident_row_item">
                        <Row>
                          <Col span={4}>{name}</Col>
                          <Col span={8} className="resident_row_item_phone" title={phoneNum}>手机: {phoneNum ? utils.plusXingDe86(phoneNum, 7, 4, 4) : ''}</Col>
                          <Col span={4}><span className="entry_exit_resident_tag tag_g" title={label}>{label}</span></Col>
                          <Col span={8}>登记位置: {rigLocal}</Col>
                        </Row>
                      </div>
                      <div className="resident_row_item">
                        <Row>
                          <Col span={4}><span className={`entry_exit_resident_tag ${colorClass}`} title={type}>{type}</span></Col>
                          <Col span={12} className="resident_row_item_position" title={addr}>抓拍位置: {addr}</Col>
                          <Col span={8}>{time}</Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>
              )
            }): null
          }
        </div>
      </div>
    )
  }

}

export default DataEntryAndExitInfo;