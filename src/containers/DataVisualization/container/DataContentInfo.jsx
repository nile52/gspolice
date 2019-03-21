import React, {Component} from 'react';
import {createForm} from 'rc-form';
import { Form, Button, Row, Col, Select} from 'antd';
import QueueAnim from 'rc-queue-anim';
import DataLayerUnitRoom from './DataLayerUnitRoom';
import DataRoomInfo from './DataRoomInfo'
import DataCarInOutRemark from './DataCarInOutRemark'
const Option = Select.Option;

class DataContentInfo extends Component {
  constructor(props) {
    super(props)
    this.comingFunc = this.comingFunc.bind(this)
  }

  comingFunc = ()  => {
    this.props.handleCancel(['residentVisible', 'floatingVisible', 'videoVisible', 'videoInfoVisible', 'videoInfoVisible', 'residentListVisible'])
    this.props.handleOk('layerVisible')
  }

  render() {
    const {
      layerVisible,
      downVisible,
      upVisible,
      roomVisible,
      inOutVisible,
      residentVisible,
      xqInfo,
      homeBuildList,
      homeBuildListJson,
      homeBuild,
      handleOk,
      handleCancel,
      handleSelectUpDown,
      getBuildTogal,
      changev
    } = this.props
    let buildOptions;
    if (homeBuildList &&  homeBuildList.length > 0) {
      buildOptions = homeBuildList.map((item, index) => {
        let newName = ''
        let newNameArr = item.name.split('-')
        let newNameArrLength = newNameArr.length
        if( newNameArrLength > 1) {
          newName = newNameArr[newNameArrLength -1]
        } else {
          newName = item.name
        }
        return <Option 
          key={index} 
          value={item.id} 
          className="house_lay_select_option"
        >{newName}</Option>;
      });
    } else {
        buildOptions = [];
    }
    return (
      <div className="data_content_info">
          <div className="data_content_select_wrap">
            <QueueAnim 
              type={['top', 'top']}
              // animConfig={[
              //   { translateY: [0, -96] },
              //   { translateY: [0, -720] }
              // ]}
              duration='500'
            >
              {downVisible ? <div className="data_content_select_down">
                <i className="icon iconfont icon-angledoubledown select_down_icon" onClick={handleSelectUpDown}></i>
              </div>: null}
              {upVisible ? <div className="data_content_select_up" key="up">
                <div className="select_left_wrap" onClick={
                  residentVisible?(type) => handleCancel(['residentVisible', 'floatingVisible', 'videoVisible', 'videoInfoVisible', 'residentListVisible']):
                  (type) => handleOk(['residentVisible', 'floatingVisible', 'videoVisible', 'videoInfoVisible'])
                }>{residentVisible?'隐藏图表':'显示图表'}</div>
                <i className="icon iconfont icon-angledoubleup select_up_icon" onClick={handleSelectUpDown}></i>
                <div className="select_right_wrap">
                  <Row type="flex" justify="space-around">
                    <Col span={8}>
                      <div className="demo_community" title={xqInfo?xqInfo.name:''}>{xqInfo?xqInfo.name:''}</div>
                    </Col>
                    <Col span={6} className="house_lay_select" >
                        <Select 
                          value={homeBuild}
                          style={{width: '7rem'}}
                          onChange={(value, option) => {
                            handleCancel(['layerVisible', 'roomVisible', 'inOutVisible'])
                            getBuildTogal(value)
                            let homeUnitList = []
                            for(let i=0; i < homeBuildListJson[value].unit; i++){
                              let num = i
                              num++
                              homeUnitList.push(num)
                            }
                            changev({
                              homeUnitList: homeUnitList,
                              homeRoomList: [],
                              homeBuildInfo: homeBuildList[option.key],
                              homeBuild: value,
                              homeUnit: 'all',
                              homeRoom: 'all',
                            })
                          }}
                          getPopupContainer={() => document.getElementById('datavisualization')}
                        >
                          {buildOptions}
                        </Select>
                    </Col>
                    <Col span={8}>
                      <div className="comingin_layer" onClick={this.comingFunc}>进入楼栋</div>
                    </Col>  
                  </Row> 
                </div>
              </div>: null}
            </QueueAnim>
            <QueueAnim 
              type={['top', 'top']}
              duration='600'
            >
              {layerVisible?<DataLayerUnitRoom {...this.props} key="build" />:null}
            </QueueAnim>
            <QueueAnim 
              type={['right', 'right']}
              duration='600'
            >
              {roomVisible?<DataRoomInfo {...this.props} key="room" />:null}
            </QueueAnim>
            <QueueAnim 
              type={['top', 'top']}
              duration='600'
            >
              {inOutVisible?<DataCarInOutRemark {...this.props} key="inOut" />:null}
            </QueueAnim>
          </div>
          
      </div>
    )
  }
}

export default Form.create()(DataContentInfo);