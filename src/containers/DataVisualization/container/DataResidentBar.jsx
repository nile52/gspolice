import React, {Component} from 'react';
import echarts from 'echarts'

class DataResidentBar extends Component {
  constructor(props) {
    super(props)
    this.initOptions = this.initOptions.bind(this)
    this.state = {
      storiedBuildingTotal: null
    }
  }

  initOptions = () => {
    let storiedBuildingTotal = this.state.storiedBuildingTotal
    if(storiedBuildingTotal) {
      let DATChart = echarts.init(document.getElementById('residentbarchart'));
    let builds = []
    let totals = []
    let longTimeTotals = []
    function getJsonLength(jsonData) {  
      var length = 0; 
      for(var ever in jsonData) { 
        let newEver = ''
        let newEverArr = ever.split('-')
        let newEverArrLength = newEverArr.length
        if( newEverArrLength > 1) {
          newEver = newEverArr[newEverArrLength -1]
        } else {
          newEver = ever
        }
        builds.push(newEver+'')
        totals.push(jsonData[ever].Total)
        longTimeTotals.push(jsonData[ever].longTimeTotal)
        length++;  
      }  
      return length;  
    } 
    if(getJsonLength(storiedBuildingTotal)>0) {
      DATChart.setOption({
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: true,
          left: '10%',
          top: '5%',
          textStyle: {
            color: 'rgb(159, 190, 202)',
          },
          data: ['常住居民','本幢居民总量']
        },
        grid: {
          left: '10%',
          right: '15%',
          top: '15%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
                color: 'rgb(89, 159, 169)',
                fontSize: 12
            }
          },
          splitLine: {show: false},
        },
        yAxis: {
          type: 'category',
          splitLine: {show: false},
          axisLabel: {
            textStyle: {
                color: 'rgb(89, 159, 169)',
                fontSize: 12
            }
          },
          data: builds
        },
        series: [
          {
            name: '本幢居民总量',
            type: 'bar',
            label: {
              normal: {
                  show: true,
                  position: 'right',
                  textStyle: {
                    color: '#fff',
                    fontSize: 10,
                  }
              }
            },
            itemStyle: {
                normal: {
                  color: 'rgb(54, 119, 204)',
                  barBorderRadius:[10, 10, 10, 10],
                }
            },
            barWidth: 8,
            barGap: '-100%',
            data: totals
          }, 
          {
            name: '常住居民',
            type: 'bar',
            label: {
              normal: {
                  show: true,
                  position: 'right',
                  textStyle: {
                    color: '#fff',
                    fontSize: 10,
                  }
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(110, 226, 223)',
                barBorderRadius:[10, 10, 10, 10],
              }
            },
            barWidth: 8,
            data: longTimeTotals
          }
        ]
      })
    }
    }
    
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('barList' in nextProps) {
      if(nextProps.barList && nextProps.barList.storiedBuildingTotal) {
        this.setState({
          storiedBuildingTotal: nextProps.barList.storiedBuildingTotal
        }, () => {
          this.initOptions()
        })
      }
    }
  }

  componentDidMount() {
    const barList = this.props.barList
    if(barList && barList.storiedBuildingTotal) {
        this.setState({
          storiedBuildingTotal: barList.storiedBuildingTotal
        }, () => {
            this.initOptions()
        })
    }
  }
  
  render() {
    return (
      <div id="residentbarchart" className="residentbarchart"></div>
    )  
  }
}

export default DataResidentBar;