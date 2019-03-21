import React, {Component} from 'react';
import { Row, Col } from 'antd';
import '../style/DataVisualization.less'

class DataHeaderRight extends Component {
  render() {
    return (
      <div className="data_header_right">
        <div className="header_right">
          <Row>
            <Col span={8}>
              <div className="header_right_num_item" style={{marginLeft: '2rem'}} onClick={() => {
                  this.props.handleOk('huxingtuContentVisible')
                }}>
                {/* {this.props.homePageTotal&&this.props.homePageTotal.housingTotal} */}
                <span className="header_right_num_up">{this.props.homePageTotal&&this.props.homePageTotal.housingTotal-1}</span>
                <span className="header_right_num_down">住房总量</span>
              </div>
            </Col>
            <Col span={8}>
              <div className="header_right_num_item">
                <span className="header_right_num_up">{this.props.homePageTotal&&this.props.homePageTotal.userTotal}</span>
                <span className="header_right_num_down">居住人口</span>
              </div>
            </Col>
            <Col span={8}>
              <div className="header_right_num_item" style={{border: 'none'}}>
                <span className="header_right_num_up">{this.props.caseTotal}</span>
                <span className="header_right_num_down">历史案件</span>
              </div>
            </Col>
          </Row> 
        </div>  
      </div>
    )
  }
}

export default DataHeaderRight;