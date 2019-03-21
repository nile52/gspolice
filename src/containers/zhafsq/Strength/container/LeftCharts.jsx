import React, {Component} from 'react';
import echarts from 'echarts'
import $ from 'jquery'

class LeftCharts extends Component {
  constructor(props) {
    super(props)
    this.initOptions = this.initOptions.bind(this)
    this.state = {
      housingInfo: null,
      data: null
    }
  }

  initOptions = () => {
    const pieData = this.state.pieData
    const barData = this.state.barData

    if(pieData && barData) {
        let pieChart = echarts.init(document.getElementById('pie_wrap'));
        let barChart = echarts.init(document.getElementById('bar_wrap'));

        window.removeEventListener( 'resize', pieChart.resize() );

        pieChart.setOption({
            color: [ '#2e9f23','#ffef00','#0055aa','#d7000e','#df4900' ],
            title : {
                text: '同名数量统计',
                textStyle: {
                    color: '#fff',
                    fontWeight: 'normal'
                },
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                type: 'scroll',
                bottom: 10,
                left: 'center',
                textStyle: {
                    color: '#fff',
                },
                data: ['警员', '警车', '天翼对讲机'],
        
            },
            series : [
                {
                    name: '姓名',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data: [
                        {value: pieData.policeNum, name:'警员'},
                        {value: pieData.carNum, name:'警车'},
                        {value: pieData.tyTotal, name:'天翼对讲机'},
                    ],   
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        })

        barChart.setOption({
            // color: ['#87B4E7', '#E36561'],
            color: ['#1890ff','#E36561'],
            textStyle: {
              color: '#fff',
              fontWeight: 'normal',
            },
            tooltip : {
                formatter: "{b} {c}"
            },
            title: {
              text: '设备数量汇总',
              x:'center',
              textStyle: {
                color: '#fff',
                fontWeight: 'normal',
              },
            },
            grid: {
              left: '10%',
              right: '10%',
              bottom: '10%',
              containLabel: true
            },
            xAxis: {
                type: 'value',
                axisLabel : { formatter: function (value){return Math.abs(value)} },
                // max: 250,
            },
            // pcs 派出所 ld 联动 gt 岗亭 tx 特巡
            yAxis: {
                type: 'category',
                data: ['派出所', '联动', '岗亭', '特巡']
            },
            legend: {
                show: false,
                data:['设备正常'],
                bottom: 0,
                textStyle: {
                    fontSize: 12,
                    color: '#fff',
                },
            },
            series : [
              {
                  name:'设备正常',
                  type:'bar',
                  stack: '总量',
                  barWidth:'20%',
                  barCategoryGap: '5%',
                  label: {
                      normal: {
                          show: false,
                          position: 'center',

                      }
                  },
                  itemStyle: {
                    emphasis: {
                        barBorderRadius: [0, 5, 5, 0],
                        borderType: 'solid',
                        borderWidth: '1',
                        borderColor: '#ccc',
                        
                    },
                    normal: {
                        barBorderRadius: [0, 5, 5, 0],
                        borderType: 'solid',
                        borderWidth: '1',
                        borderColor: '#ccc',
                    }
                  },

                 data:[
                    barData.pcs,
                    barData.ld,
                    barData.gt,
                    barData.tx,
                 ]
              },
            ]

        })
    }   
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    // Should be a controlled component.
    const pieData = nextProps.pieData
    const barData = nextProps.barData
    if (pieData && barData) {
        this.setState({
            barData: barData,
            pieData: pieData,
        }, () => {
            this.initOptions()
        })  
    }
  }

  componentDidMount() {
      // console.log(this.props)
      const pieData = this.props.pieData
      const barData = this.props.barData
      if(pieData && barData) {
          this.setState({
            barData: barData,
            pieData: pieData,
          }, () => {
              this.initOptions()
          })
      }
  }

  render() {
    return (
        <div>
            <div className="pie_wrap" id="pie_wrap"></div>
            <div className="bar_wrap" id="bar_wrap"></div>
        </div>
    );
  }
}

export default LeftCharts;