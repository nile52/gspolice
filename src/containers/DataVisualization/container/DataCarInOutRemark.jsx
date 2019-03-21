import React, {Component} from 'react';
import {Form, Row, Col, Select, DatePicker} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import utils from '../../../util/util'
const Option = Select.Option;
const { RangePicker } = DatePicker;

moment.locale('zh-cn');
const dateFormat = 'YYYY-MM-DD hh:mm:ss';

class DataCarInOutRemark extends Component {
  
  render() {
    const {
      selectRecVehicleRecordList,
      handleOk,
      handleCancel
    } = this.props
    const dateFormat = 'YYYY/MM/DD hh:';
    let isHasInOutRemark = selectRecVehicleRecordList.length>0?true:true
    return (
      <div className="data_car_in_out">
        <div className="data_in_out_wrap">
          <div className="data_in_out_form">
            <Row>
                <Col span={1} ></Col>
                <Col span={2} >
                  <span className="data_in_out_title">类型:</span>
                </Col>
                <Col span={6} className="data_in_out_select select_qr_style" >
                  <Select defaultValue="all" style={{width: '8rem'}} disabled={isHasInOutRemark} getPopupContainer={() => document.getElementById('datavisualization')}>
                    <Option value="all" className="house_lay_select_option table_info_select_option">全部</Option>
                    <Option value="true" className="house_lay_select_option table_info_select_option">进</Option>
                    <Option value="false"  className="house_lay_select_option table_info_select_option">出</Option>
                  </Select>
                </Col>
                <Col span={2}>
                  <span className="data_in_out_title">日期:</span>
                </Col>
                <Col span={11} className="data_in_out_picker">
                  <RangePicker
                    size="small"
                    format={dateFormat}
                    disabled={isHasInOutRemark}
                  />
                </Col> 
              </Row>
          </div>
          <div className="data_in_out_close" onClick={(type) => handleCancel('inOutVisible')}>x</div>
          <div className="in_out_table_wrap">
            <div className="in_out_table_content">
              <table 
                border="1" 
                align="center"
                width="100%"
                frame="void"
                cellspacing="0"
                >
                <tr>
                  <th>类型</th>
                  <th>时间</th>
                  <th>门禁</th>
                  <th>查看</th>
                </tr>
                {selectRecVehicleRecordList.length>0?
                  selectRecVehicleRecordList.map((item, index) => {
                    return (
                      <tr>
                        <td>{item.passageWay}</td>
                        <td>{utils.timeToHMS(item.inOutDate)}</td>
                        <td>{item.equipmentChannelName}</td>
                        <td>
                          <div className="table_info_btn"
                            onClick={() => {
                              this.props.changev({
                                homePictureUrl: item.pictureUrlCatch
                              })
                              this.props.handleOk('pictureContentVisible')
                            }}
                          >查看</div>
                        </td>
                      </tr>
                    )
                  })
                :<tr><td>暂无数据</td></tr>}
              </table>
            </div>
          </div>
        </div>
      </div>
    )  
  }
}

export default DataCarInOutRemark;