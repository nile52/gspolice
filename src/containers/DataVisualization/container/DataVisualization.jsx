/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Form, Row, Col, Spin} from 'antd';
import DataShortCutMent from './DataShortCutMent'
import DataHeaderLeft from './DataHeaderLeft'
import DataHeaderCenter from './DataHeaderCenter'
import DataHeaderRight from './DataHeaderRight'
import DataContentMap from './DataContentMap'
import DataContentInfo from './DataContentInfo'
import DataResidentCharts from './DataResidentCharts'
import FloatingPopulationCharts from './FloatingPopulationCharts'
import DataEntryAndExitVideo from './DataEntryAndExitVideo'
import DataEntryAndExitInfo from './DataEntryAndExitInfo'
import DataVideoContent from './DataVideoContent'
import DataPictureContent from './DataPictureContent'
import DataRedisentList from './DataRedisentList'
import DataSiderResident from './DataSiderResident'
import DataHXTPictureContent from './DataHXTPictureContent'
import QueueAnim from 'rc-queue-anim'
import {
  CAS_LOGOUT
} from '../../../fetch/apis'
import * as actions from '../actions/DataVisualization'

import '../style/DataVisualization.less'
@connect(
  state => state,
  {...actions}
)

class DataVisualization extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.handleSelectUpDown = this.handleSelectUpDown.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.changeShortCutMenu = this.changeShortCutMenu.bind(this)
    this.state = {
      upVisible: true,
      downVisible: false,
      layerVisible: false,
      roomVisible: false,
      inOutVisible: false,
      residentVisible: true,
      floatingVisible: true,
      videoVisible: true,
      videoInfoVisible: true,
      videoContentVisible: false,
      pictureContentVisible: false,
      isShortCut: false,
      residentListVisible: false,
      huxingtuContentVisible: false
    }
  }

  changeShortCutMenu = (type) => {
    this.setState({
      [type]: !this.state[type]
    })
  }

  handleOk = (type) => {
    if(type.constructor == Array) {
      type.forEach((item) => {
        this.setState({
          [item]: true
        })
      })
    } else if(type.constructor == String) {
      this.setState({
        [type]: true
      })
    }
  }

  handleCancel = (type) => {
    if(type.constructor == Array) {
      type.forEach((item) => {
        this.setState({
          [item]: false
        })
      })
    } else if(type.constructor == String) {
      this.setState({
        [type]: false
      })
    }
  }

  handleSelectUpDown = () => {
    this.setState({
      upVisible: this.state.downVisible,
      downVisible: this.state.upVisible
    });
  }
  componentWillMount() {
  }

  logout() {
    window.location.href=`${CAS_LOGOUT}?userKey=${this.props.userKey}`
    localStorage.setItem('userKey', null)
    localStorage.setItem('id', null)
  }

  componentDidMount() {
    let _this = this
    this.props.getXqList((() => {
      _this.props.getCaseTotal();
      _this.props.getHomePageTotal()
      _this.props.getPieChart()
      _this.props.getBarChart()
      _this.props.getBuildList()
      _this.props.getServicesChannelList()
      _this.props.getKeyAndValue()
      _this.props.getDefaultPlay()
      _this.props.getServicesList()
    }))
  }

  render() {
    let userInfo = this.props.Page.userInfo?this.props.Page.userInfo:{}
    let userKey = this.props.Page.userKey?this.props.Page.userKey:null
    const {
      upVisible,
      downVisible,
      layerVisible,
      roomVisible,
      inOutVisible,
      residentVisible,
      floatingVisible,
      videoVisible,
      videoInfoVisible,
      videoContentVisible,
      pictureContentVisible,
      isShortCut,
      residentListVisible,
      huxingtuContentVisible
    } = this.state
    const toChildProps = {
      upVisible,
      downVisible,
      layerVisible,
      roomVisible,
      inOutVisible,
      residentVisible,
      floatingVisible,
      videoVisible,
      videoInfoVisible,
      videoContentVisible, 
      pictureContentVisible,
      residentListVisible, 
      huxingtuContentVisible,
      // 头部左侧
      userInfo: userInfo,
      userKey: userKey,
      dpLoading: this.props.DataVisualization.dpLoading,
      ghLoading: this.props.DataVisualization.ghLoading,
      zhLoading: this.props.DataVisualization.zhLoading,
      clLoading: this.props.DataVisualization.clLoading,
      xqList:  this.props.DataVisualization.xqList,
      // 中间下拉按钮
      isShortCut: isShortCut,   
      caseTotal: this.props.DataVisualization.caseTotal,
      xqInfo: this.props.DataVisualization.xqInfo,
      homeBuildList: this.props.DataVisualization.homeBuildList,
      homeUnitList: this.props.DataVisualization.homeUnitList,
      homeRoomList: this.props.DataVisualization.homeRoomList,
      homeResidentList: this.props.DataVisualization.homeResidentList,
      homeBuildInfo: this.props.DataVisualization.homeBuildInfo,
      homeBuildTotal: this.props.DataVisualization.homeBuildTotal,
      homeBuild: this.props.DataVisualization.homeBuild,
      homeUnit: this.props.DataVisualization.homeUnit,
      homeRoom: this.props.DataVisualization.homeRoom,
      homeBuildListJson: this.props.DataVisualization.homeBuildListJson,
      homeRoomListJson: this.props.DataVisualization.homeRoomListJson,
      selectRecVehicleRecordList: this.props.DataVisualization.selectRecVehicleRecordList,
      homeHousingInfo: this.props.DataVisualization.homeHousingInfo,
      // 头部右侧
      homePageTotal: this.props.DataVisualization.homePageTotal,
      pieList: this.props.DataVisualization.pieList,
      barList: this.props.DataVisualization.barList,
      // 中间地图
      servicesChannelList: this.props.DataVisualization.servicesChannelList,
      // 弹出层摄像头
      homePlayUrl: this.props.DataVisualization.homePlayUrl,
      // 右侧摄像头
      defaultPlayUrl1: this.props.DataVisualization.defaultPlayUrl1,
      defaultPlayUrl2: this.props.DataVisualization.defaultPlayUrl2,
      // 车辆截图弹出层
      homePictureUrl: this.props.DataVisualization.homePictureUrl,
      // 图表弹出层
      userTypeList: this.props.DataVisualization.userTypeList,
      userTypeJson: this.props.DataVisualization.userTypeJson,
      residentListType: this.props.DataVisualization.residentListType,
      residentListParams: this.props.DataVisualization.residentListParams,
      residentList: this.props.DataVisualization.residentList,
      siderResidentList: this.props.DataVisualization.siderResidentList,
      residentTogal: this.props.DataVisualization.residentTogal,
      GHTogal: this.props.DataVisualization.GHTogal,
      ZHTogal: this.props.DataVisualization.ZHTogal,
      flow: this.props.DataVisualization.flow,
      residentListTitle: this.props.DataVisualization.residentListTitle,
      // 侧边栏
      siderZHBuildList: this.props.DataVisualization.siderZHBuildList,
      siderZHBuildListJson: this.props.DataVisualization.siderZHBuildListJson,
      siderZHUnitList: this.props.DataVisualization.siderZHUnitList,
      siderZHRoomList: this.props.DataVisualization.siderZHRoomList,
      siderZHBuild: this.props.DataVisualization.siderZHBuild,
      siderZHUnit: this.props.DataVisualization.siderZHUnit,
      siderZHRoom: this.props.DataVisualization.siderZHRoom,
      siderZHIdCard: this.props.DataVisualization.siderZHIdCard,
      siderZHType: this.props.DataVisualization.siderZHType,
      siderZHInOutDateStart: this.props.DataVisualization.siderZHInOutDateStart,
      siderZHInOutDateEnd: this.props.DataVisualization.siderZHInOutDateEnd,
      zhEntryAndExitList: this.props.DataVisualization.zhEntryAndExitList,
      siderCLBuildList: this.props.DataVisualization.siderCLBuildList,
      siderCLBuildListJson: this.props.DataVisualization.siderCLBuildListJson,
      siderCLUnitList: this.props.DataVisualization.siderCLUnitList,
      siderCLRoomList: this.props.DataVisualization.siderCLRoomList,
      siderCLBuild: this.props.DataVisualization.siderCLBuild,
      siderCLUnit: this.props.DataVisualization.siderCLUnit,
      siderCLRoom: this.props.DataVisualization.siderCLRoom,
      siderCLIdCard: this.props.DataVisualization.siderCLIdCard,
      siderCLCarNumber: this.props.DataVisualization.siderCLCarNumber,
      siderCLType: this.props.DataVisualization.siderCLType,
      siderCLInOutDateStart: this.props.DataVisualization.siderCLInOutDateStart,
      siderCLInOutDateEnd: this.props.DataVisualization.siderCLInOutDateEnd,
      clselectRecVehicleRecordList: this.props.DataVisualization.clselectRecVehicleRecordList,
      housingAddressList: this.props.DataVisualization.housingAddressList,
      fontServicesList: this.props.DataVisualization.fontServicesList,
      eqTotal: this.props.DataVisualization.eqTotal,
      HXTPictureUrl: this.props.DataVisualization.HXTPictureUrl,
      roomLoading: this.props.DataVisualization.roomLoading,
      handleOk: this.handleOk,
      handleCancel: this.handleCancel,
      handleSelectUpDown: this.handleSelectUpDown,
      logout: this.logout,
      changeShortCutMenu: this.changeShortCutMenu,
      getHomePageTotal: this.props.getHomePageTotal,
      getBuildList: this.props.getBuildList,
      getBuildTogal: this.props.getBuildTogal,
      getRoomList: this.props.getRoomList,
      getResidentList: this.props.getResidentList,
      getHousing: this.props.getHousing,
      getSelectRecVehicleRecord: this.props.getSelectRecVehicleRecord,
      getHomePlay: this.props.getHomePlay,
      getLabel: this.props.getLabel,
      getAge: this.props.getAge,  
      getArea: this.props.getArea,
      getPieChart: this.props.getPieChart,
      getBarChart: this.props.getBarChart,
      getServicesChannelList: this.props.getServicesChannelList,
      getKeyAndValue: this.props.getKeyAndValue,
      getGHResidentList: this.props.getGHResidentList,
      getZHBuildList: this.props.getZHBuildList,
      getZHRoomList: this.props.getZHRoomList,
      getZHPersonnelRecord: this.props.getZHPersonnelRecord,
      getCLBuildList: this.props.getCLBuildList,
      getCLRoomList: this.props.getCLRoomList,
      getCLSelectRecVehicleRecord: this.props.getCLSelectRecVehicleRecord,
      getHousingAddress: this.props.getHousingAddress,
      getServicesList: this.props.getServicesList,
      changev: this.props.changev
    }
    return (
      <div className="data_visualization" id="datavisualization">
        <Spin spinning={this.props.DataVisualization.dpLoading}>
        <Row>
          <Col span="24">
            <Col span="7">
              {/* 头部左侧 */}
              <DataHeaderLeft {...toChildProps}/>
            </Col> 
            <Col span="10">
              {/* 头部中侧 */}
              <DataHeaderCenter {...toChildProps}/>
            </Col> 
            <Col span="7">
              {/* 头部右侧 */}
              <DataHeaderRight {...toChildProps}/>
            </Col> 
          </Col>
        </Row>
        {isShortCut ? <DataShortCutMent {...this.props}/> : <div>

          <Row>
            {/* 百度地图 */}
            {this.props.DataVisualization.xqInfo?<DataContentMap {...toChildProps}/>:null}
          </Row>
          {
            this.props.DataVisualization.homeBuildList.length>0?
            <div>
            
              {/* 中间下拉按钮 */}
              <DataContentInfo {...toChildProps}/> 
              {/* 右侧抽屉 */}
              {/* 主菜单辖区常住人员结构 */}
              <QueueAnim 
                    type={['left', 'left']}
                    duration='600'
                  >
                {residentVisible?<DataResidentCharts {...toChildProps} key="resident" />:null}
              </QueueAnim>
              {/* 辖区流动人员结构 */}
              <QueueAnim 
                    type={['left', 'left']}
                    duration='600'
                  >
                {floatingVisible?<FloatingPopulationCharts {...toChildProps} key="floating" />:null}
              </QueueAnim>
              {/* 出入口人脸抓取比对上 */}
              <QueueAnim 
                    type={['right', 'right']}
                    duration='600'
                  >
                {videoVisible?<DataEntryAndExitVideo {...toChildProps} key="video" />:null}
              </QueueAnim>
              {/* 出入口人脸抓取比对下*/}
              <QueueAnim 
                    type={['right', 'right']}
                    duration='600'
                  >
                {videoInfoVisible?<DataEntryAndExitInfo {...toChildProps} key="videoInfo" />:null}
              </QueueAnim>
              {/* 设备摄像头*/}
              <QueueAnim 
                    type={['top', 'top']}
                    duration='600'
                  >
                {videoContentVisible?<DataVideoContent {...toChildProps} key="videoContent" />:null}
              </QueueAnim>
              {/* 车辆截图 */}
              <QueueAnim 
                    type={['top', 'top']}
                    duration='600'
                  >
                {pictureContentVisible?<DataPictureContent {...toChildProps} key="pictureContent" />:null}
              </QueueAnim>
              {/* 户型图 */}
              <QueueAnim 
                type={['top', 'top']}
                duration='600'
              >
                {huxingtuContentVisible?<DataHXTPictureContent {...toChildProps} key="HXTPictureContent" />:null}
              </QueueAnim>
              <QueueAnim 
                    type={['top', 'top']}
                    duration='600'
                  >
                {residentListVisible?<DataRedisentList {...toChildProps} key="residentList" />:null}
              </QueueAnim>
              <DataSiderResident {...toChildProps} key="siderResident" />
            </div>
            :null
          }
        </div>} 
        </Spin>
      </div>
    )
  }

}

export default Form.create()(DataVisualization);