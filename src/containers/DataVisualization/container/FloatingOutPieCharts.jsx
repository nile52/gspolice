import React, {Component} from 'react';
import echarts from 'echarts'

class FloatingOutPieCharts extends Component {
  constructor(props) {
    super(props)
    this.initOptions = this.initOptions.bind(this)
    this.state = {
        userTypeTotalFlow: null
    }
  }

  initOptions = () => {
    let _this = this
    let userTypeTotalFlow = this.state.userTypeTotalFlow
    if(userTypeTotalFlow) {
      let floatingOutChart = echarts.init(document.getElementById('floatingoutpie'));
    
      floatingOutChart.setOption({
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          left: '5%',
          top: '10%',
          textStyle: {
            fontSize: 12,
            color: 'rgb(159, 190, 202)',
          },
          data:['党员','退休','残障','失业','退伍','关怀']
        },
        series: [
            {
              name: '',
              type:'pie',
              radius: ['30%', '45%'],
              center : ['60%', '38%'],
              data:[
                {value: userTypeTotalFlow[8], name:'党员'},
                {value: userTypeTotalFlow[2], name:'退休'},
                {value: userTypeTotalFlow[5], name:'残障'},
                {value: userTypeTotalFlow[3], name:'失业'},
                {value: userTypeTotalFlow[4], name:'退伍'},
                {value: userTypeTotalFlow[1], name:'关怀'}
              ]
            }
        ]
      })
      floatingOutChart.off('click')
      floatingOutChart.on('click', function(params) {
        let value = params.data.name
        let dataJson = {}
        dataJson.residentListTitle = value
        switch(value) {
            case "退休":
                dataJson.valueId = 2
                break
            case "残障":
                dataJson.valueId = 5
                break
            case "失业":
                dataJson.valueId = 3
                break
            case "退伍":
                dataJson.valueId = 4
                break
            case "党员":
                dataJson.valueId = 8
                break
            case "关怀":
                dataJson.valueId = 1
                break
        }
        dataJson.flow = true
        _this.props.getLabel(dataJson, 1, () => {
            if(!_this.props.residentListVisible) {
                _this.props.handleOk('residentListVisible')
            }
        })
      })
    }
    
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('homePageTotal' in nextProps) {
      if(nextProps.homePageTotal && nextProps.homePageTotal.userTypeTotalFlow) {
        this.setState({
          userTypeTotalFlow: nextProps.homePageTotal.userTypeTotalFlow,
        }, () => {
            this.initOptions()
        })
      }
        
    }
  }

  componentDidMount() {
    const homePageTotal = this.props.homePageTotal
    if(homePageTotal && homePageTotal.userTypeTotalFlow) {
        this.setState({
          userTypeTotalFlow: homePageTotal.userTypeTotalFlow
        }, () => {
            this.initOptions()
        })
    }
  }

  render() {
    return (
      <div id="floatingoutpie" className="floatingoutpie"></div>
    )  
  }
}

export default FloatingOutPieCharts;