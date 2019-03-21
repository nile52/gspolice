import React, {Component} from 'react';
import echarts from 'echarts'
import $ from 'jquery'


class XQHouseGauge extends Component {
  constructor(props) {
    super(props)
    this.initOptions = this.initOptions.bind(this)
    this.state = {
        populationInfo: null,
        data: null
    }
  }

  initOptions = () => {
    const populationInfo = this.state.populationInfo
    
    if(populationInfo) {
        let residentGuageChart = echarts.init(document.getElementById('house_guage_wrap'));
        window.removeEventListener( 'resize', residentGuageChart.resize() );
        residentGuageChart.setOption({
                title : {
                    text: '居住人口：'+ populationInfo.userTotal +'人',
                    x:'center',
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'normal'
                    }
                },
                tooltip : {
                    formatter: "{b} {c}"
                },
                series : [
                    {
                        name: '常住人口',
                        type: 'gauge',
                        z: 3,
                        min: 0,
                        max: populationInfo.userTotal,
                        splitNumber: 11,
                        radius: '80%',
                        center : ['50%', '60%'],    // 默认全局居中
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: [[1, '#7ecdf4']],
                                width: 2,
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 5
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length: 7,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto'
                            }
                        },
                        splitLine: {           // 分隔线
                            length: 7,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: 'auto'
                            }
                        },
                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            width:2
                        },
                        title : {
                            offsetCenter: [0, '30%'], 
                            fontSize: 14,
                            color: '#fff'
                        },
                        detail : {
                            offsetCenter: [0, '60%'], 
                            textStyle: {      
                                color: '#fff',
                                fontSize: 14
                            }
                        },
                        data:[{value: populationInfo.temporaryTotal, name: '常住人口'}]
                    },
                    {
                        name: '暂住人口',
                        type: 'gauge',
                        center: ['20%', '60%'],    // 默认全局居中
                        radius: '60%',
                        min:0,
                        max:populationInfo.userTotal,
                        endAngle:45,
                        splitNumber:7,
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: [[1, '#7ecdf4']],
                                width: 2,
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 5
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length:7,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto'
                            }
                        },
                        axisLabel: {
                            show: false
                        },
                        splitLine: {           // 分隔线
                            length:7,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: 'auto'
                            }
                        },
                        pointer: {
                            width:2
                        },
                        title: {
                            offsetCenter: [0, '30%'],       // x, y，单位px
                            fontSize: 14,
                            color: '#fff'
                        },
                        detail: {
                            offsetCenter: [0, '60%'], 
                            textStyle: {      
                                color: '#fff',
                                fontSize: 14
                            }
                        },
                        data:[{value: populationInfo.flowTotal, name: '暂住人口'}]
                    },
                    {
                        name: '居住证',
                        type: 'gauge',
                        center : ['80%', '60%'],    // 默认全局居中
                        radius : '60%',
                        min: 0,
                        max: populationInfo.userTotal,
                        startAngle:135,
                        splitNumber: 7,
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: [[1, '#7ecdf4']],
                                width: 2,
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 5
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length:7,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto'
                            }
                        },
                        axisLabel: {
                            show: false
                        },
                        splitLine: {           // 分隔线
                            length: 7,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: 'auto'
                            }
                        },
                        pointer: {
                            width:2
                        },
                        title: {
                            offsetCenter: [0, '30%'], 
                            fontSize: 14,
                            color: '#fff'
                        },
                        detail: {
                            offsetCenter: [0, '60%'], 
                            textStyle: {      
                                color: '#fff',
                                fontSize: 14
                            }
                        },
                        data:[{value: populationInfo.residencePermitTotal, name: '居住证'}]
                    }
                ],
        })
    }   
  }

  componentWillReceiveProps(nextProps) {
    if ('populationInfo' in nextProps) {
        if(nextProps.populationInfo) {
            this.setState({
                populationInfo: nextProps.populationInfo,
            }, () => {
                this.initOptions()
            })
        }
    }
  }

  componentDidMount() {
      const populationInfo = this.props.populationInfo
      if(populationInfo && populationInfo) {
          this.setState({
            populationInfo: populationInfo,
          }, () => {
              this.initOptions()
          })
      }
  }

  render() {
    return (
      <div id="house_guage_wrap" className="house_guage_wrap"></div>
    );
  }
}

export default XQHouseGauge;