import React, {Component} from 'react';
import echarts from 'echarts'

class PeopleInfoBar extends Component {
  componentDidMount() {
    const age = this.props.age
    let ageArr = [age.age0_6, age.age7_17, age.age18_44, age.age45_59, age.age60_74, age.age75_89, age.age90]
    let DATChart = echarts.init(document.getElementById('barchart'));
    DATChart.setOption({
      color: 'rgb(139, 246, 235)',
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      grid: {
          left: '5%',
          right: '14%',
          top: '15%',
          bottom: '-5%',
          containLabel: true
      },
      xAxis: {
          type: 'value',
          show: false,
          splitLine: {show: false},
          boundaryGap: [0, 0.01]
      },
      yAxis: {
          name: '(岁)',
          type: 'category',
          splitLine: {show: false},
          nameTextStyle: {
            color: 'rgb(89, 159, 169)',
            fontSize: '14'
          },
          axisLabel: {
            textStyle: {
                color: 'rgb(89, 159, 169)',
                fontSize: '14'
            }
          },
          data: ['0-6','7-17','18-44','45-59','60-74','75-89', '90+']
      },
      series: [
          {
            type: 'bar',
            barCategoryGap: '60%',
            data: ageArr,
            label: {
              normal: {
                  show: true,
                  position: 'right',
                  textStyle: {
                    color: '#fff'
                  }
              }
           },
          }
      ]
    })
  }
  render() {
    return (
      <div id="barchart" className="barchart"></div>
    )  
  }
}

export default PeopleInfoBar;