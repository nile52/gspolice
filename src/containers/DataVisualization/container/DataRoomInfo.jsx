import React, {Component} from 'react';
import {Spin, Col, Tag} from 'antd';
import Fang from '../../../static/images/fang.png'
import DataRedisentItem from './DataRedisentItem'
import utils from '../../../util/util';
class DataRoomInfo extends Component {
  
  render() {
    const {
      homeBuild,
      homeUnit,
      homeRoom,
      homeBuildListJson,
      homeRoomListJson,
      homeHousingInfo,
      handleCancel,
      roomLoading,
      homeResidentList,
    } = this.props

    let newName = ''
    let newRoom = ''
    let newNUR = ''
    let newNameArr = homeBuildListJson[homeBuild].name.split('-')
    let newRoomArr = homeRoomListJson[homeRoom].room.split('-')
    let newNameArrLength = newNameArr.length
    let newRoomArrLength = newRoomArr.length
    if( newNameArrLength > 1) {
      newName = newNameArr[newNameArrLength -1]
    } else {
      newName = homeBuildListJson[homeBuild].name
    }
    if( newRoomArrLength > 1) {
      newRoom = newRoomArr[newRoomArrLength -1]
    } else {
      newRoom = homeRoomListJson[homeRoom].room
    }
    newNUR = `${newName}${homeUnit}单元${newRoom}室`

    const mobileWithXing = homeHousingInfo ? homeHousingInfo.mobile ? utils.plusXingDe86(homeHousingInfo.mobile, 7, 4, 4) : '' : '';
    const pictureAddress = homeHousingInfo ? homeHousingInfo.pictureAddress ? homeHousingInfo.pictureAddress : '' : '';
    return (
      <div className="data_room_info">
        <div className="room_title_text">{newNUR}</div>
        <div className="layer_unit_room_close" onClick={(type) => handleCancel(['roomVisible', 'inOutVisible'])}>x</div>
        <div className="room_info_wrap">
          <div className="room_info_content">
            <Col span={14}>
              <img src={pictureAddress} className="room_info_content_left" />
            </Col>
            <Col span={10}>
              <div className="room_info_content_right">
                <ul>
                    <li>
                      <label>房屋名称:</label>
                      <span className="room_info_text_item" title={`${newRoom}室`}>{newRoom}室</span> 
                    </li>
                    <li>
                      <label>建筑形制:</label>
                      <span className="room_info_text_item"></span> 
                    </li>
                    <li>
                      <label>建筑面积:</label>
                      <span className="room_info_text_item" title={`${homeRoomListJson[homeRoom].area}m2`}>{homeRoomListJson[homeRoom].area}㎡</span> 
                    </li>
                    <li>
                      <label>房屋用途:</label>
                      <span className="room_info_text_item"></span>
                    </li>
                    {homeHousingInfo?
                        <li>
                      <label>居住人数:</label>
                      <span className="room_info_text_item" title={`${homeHousingInfo.total}人`}>{homeHousingInfo.total}人</span>
                    </li>:null}
                    {homeHousingInfo?<li>
                      <label>房主:</label>
                      <span className="room_info_text_item" title={homeHousingInfo.name}>{homeHousingInfo.name}</span>
                    </li>:null}
                    {homeHousingInfo?<li>
                      <label>联系方式:</label>
                      <span className="room_info_text_item" title={mobileWithXing}>{mobileWithXing}</span>
                    </li>:null}
                    <li>
                      <Tag color="red" className="house_tag_item" style={{display: 'none'}}>烈性犬饲养户</Tag>
                    </li>
                  </ul>
              </div>
            </Col>
          </div>
        </div>
        <Spin spinning={roomLoading}>
          {homeResidentList.length>0?<DataRedisentItem {...this.props} />:null}
        </Spin>
      </div>
    )  
  }
}

export default DataRoomInfo;