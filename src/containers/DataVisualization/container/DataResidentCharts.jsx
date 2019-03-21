import React, {Component} from 'react';
import {Row, Col} from 'antd';
import DataResidentBar from './DataResidentBar'
import DataResidentPie from './DataResidentPie'
import '../style/DataVisualization.less'

class DataResidentCharts extends Component {
  render() {
    
    return (
      <div className="data_resident_charts">
        <div className="resident_charts_title">辖区常住人员结构</div>
        <div className="resident_charts_wrap">
          <div className="resident_charts_bar">
            <DataResidentBar {...this.props}/>
          </div>
          <div className="resident_charts_pie">
            <DataResidentPie {...this.props}/>
          </div>
        </div>
      </div>
    )
  }

}

export default DataResidentCharts;