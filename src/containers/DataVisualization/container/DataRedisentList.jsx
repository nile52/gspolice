import React, {Component} from 'react';
import {Row, Col, Pagination, Popover} from 'antd';
import testResident from '../../../static/images/test_redisent.jpg'
import utils from '../../../util/util.js'

class DataRedisentList extends Component {
  constructor() {
    super()
    this.onPageChange = this.onPageChange.bind(this)
    this.getHousingAddress = this.getHousingAddress.bind(this)
    this.state = {
      current: 1
    }
  }

  onPageChange = (num) => {
    let _this = this
    this.setState({
      current: num
    }, () => {
      switch(_this.props.residentListType) {
        case "area":
          _this.props.getArea(_this.props.residentListParams, num)
          break
        case "age":
          _this.props.getAge(_this.props.residentListParams, num)
          break
        case "label":
          _this.props.getLabel(_this.props.residentListParams, num)
          break
      }
    })
  }

  getHousingAddress = (value) => {
    this.props.getHousingAddress(value)
  }

  itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return null;
    } else if (type === 'next') {
      return null;
    }
    return originalElement;
  }

  render() {
    const {
      handleCancel,
      residentList,
      flow,
      residentListTitle,
      residentTogal,
      housingAddressList
    } = this.props
    const content = housingAddressList.length > 0? <div>{housingAddressList.map((item) => {
      let newName = ''
      let newRoom = ''
      let newNameArr = item.name.split('-')
      let newRoomArr = item.room.split('-')
      let newNameArrLength = newNameArr.length
      let newRoomArrLength = newRoomArr.length
      if( newNameArrLength > 1) {
        newName = newNameArr[newNameArrLength -1]
      } else {
        newName = item.name
      }
      if( newRoomArrLength > 1) {
        newRoom = newRoomArr[newRoomArrLength -1]
      } else {
        newRoom = item.room
      }
      let unit = item.unit
      let layer = item.layer
      let address = newName + unit + '单元' + layer + '层' + newRoom + '室'
      return <p>{address}</p>
    })}</div>:null
    return (
      <div className="data_resident_list">
        <div className="resident_list_title">{flow?'流动':'常住'}人员分类信息<span className="resident_list_title_hr">-</span>{residentListTitle}</div>
        <div className="resident_list_close" onClick={(type) => handleCancel(['residentListVisible'])}>x</div>
        <div className="resident_list_wrap">
          {residentList.length>0?residentList.map((item) => {
            return (
              <div className="resident_list_item">
                <Row>
                  <Col span={4}>
                    <img src={item.personalPicture?item.personalPicture:testResident} alt="" className="resident_list_img"/>
                  </Col>
                  <Col span={20}>
                    <div className="resident_list_row_item">
                      <Row>
                        <Col span={6}>姓名: {item.name}</Col>
                        <Col span={6}>性别: {item.gender == 'male'?'男':'女'}</Col>
                        <Col span={6}>民族: {item.racial}</Col>
                        <Col span={6}>政治面貌: {item.politicsStatus}</Col>
                      </Row>
                    </div>
                    <div className="resident_list_row_item">
                      <Row>
                        <Col span={12}>手机: {item.mobile}</Col>
                        <Col span={12}>身份证号: {utils.plusXing(item.idCard, 9, 0)}</Col>
                      </Row>
                    </div>
                    <div className="resident_list_row_item">
                      <Row>
                        <Col span={18} className="address_list" id="address_list">                                                                        
                          <Popover 
                            content={content} 
                            title="房屋详细地址"
                            getPopupContainer={() => document.getElementById('address_list')}
                            onVisibleChange={(visible) => {
                              if(visible) {
                                this.getHousingAddress(item.id)
                              } else {
                                this.props.changev({
                                  housingAddressList: []
                                })
                              }
                            }}
                          >
                            住址: 查看房屋详细地址<i className="icon iconfont icon-ellipsis select_up_icon" ></i>
                          </Popover>
                        </Col>
                        <Col span={6}>婚姻状况: {item.marriage}</Col>
                      </Row>
                    </div>
                    <div className="resident_list_row_item">
                      <Row>
                        <Col span={18}>                                                                        
                            户籍：{item.address}
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            )
          }):<span className="resident_no_people">暂无人员数据</span>}
          {residentTogal>1? <div className="sider_list_pagination">
              <Pagination 
                // simple  
                itemRender={this.itemRender}
                current={this.state.current} 
                onChange={this.onPageChange}
                total={residentTogal} 
                pageSize={20}
              />
              </div>:null}
        </div>
      </div>
    )  
  }
}

export default DataRedisentList;