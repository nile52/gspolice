import React, {Component} from 'react';
import {Row, Col} from 'antd';
import FloatingOutPieCharts from './FloatingOutPieCharts'
import FloatingInPieCharts from './FloatingInPieCharts'
import FloatingFromArea from './FloatingFromArea'
import '../style/DataVisualization.less'

class FloatingPopulationCharts extends Component {
  render() {
    
    return (
      <div className="floating_population_charts">
        <div className="floating_population_title">辖区流动人员结构</div>
        <div className="floating_population_wrap">
          <Row>
            <Col span={8}>
              <div className="floating_population_out">
                <FloatingOutPieCharts {...this.props}/>
              </div>
            </Col>
            <Col span={8}>
              <div className="floating_population_in">
                <FloatingInPieCharts {...this.props}/>
              </div>
            </Col>
            <Col span={8}>
              <div className="location_in">
                <FloatingFromArea {...this.props}/>
              </div>
            </Col>
          </Row>
          
        </div>
      </div>
    )
  }

}

export default FloatingPopulationCharts;