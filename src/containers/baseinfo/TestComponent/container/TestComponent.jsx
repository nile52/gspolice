/* eslint-disable */
import React, {Component} from 'react';
import renderBubbleChart from '../../../../static/js/bubbleUtil.min.js'
import echarts from 'echarts'

class TestComponent extends Component {
  constructor(props) {
    super(props)
    this.initOptions = this.initOptions.bind(this)
    this.state = {
        innerRing: null
    }
  }

  initOptions = () => {}

  componentDidMount() {	
    
          var data = [ 
            {"name":"黄瓜", "value":12345},
            {"name":"猕猴桃", "value":7345},
            {"name":"红提", "value":13456},
            {"name":"枣子", "value":2345}, 			
        ]; 	
        
        renderBubbleChart(data, document.getElementById('floatingfromarea'));
      	
  }
  render() {
    return (
      <div id="floatingfromarea"  style={{width:'1000px', height: '700px'}} className="floatingfromarea"></div>
    )  
  }
}

export default TestComponent;