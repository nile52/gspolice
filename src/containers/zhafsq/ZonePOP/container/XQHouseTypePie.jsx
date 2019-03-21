import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/pie';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import $ from 'jquery'

class XQHouseTypePie extends Component {
  constructor(props) {
    super(props)
    this.initOptions = this.initOptions.bind(this)
    this.state = {
      housingInfo: null,
    }
  }

    // 0: {num: 54, name: "重点关注"}
    // 1: {num: 2, name: "民主党派"}
    // 2: {num: 490, name: "退休"}
    // 3: {num: 2, name: "失业"}
    // 4: {num: 24, name: "退伍军人"}
    // 5: {num: 14, name: "残疾"}
    // 6: {num: 129, name: "党员"}
    // 7: {num: 13, name: "团员"}


  initOptions = () => {
    const housingInfo = this.state.housingInfo
    if(housingInfo) {

        var data = housingInfo.map((item, key)=>{
            return {
                value: item.num, 
                name: item.name
            }
        })

        var ydata = housingInfo.map((item, key)=>(item.name))
        
        let pieChart = echarts.init(document.getElementById('house_pie_wrap'));
        let barChart = echarts.init(document.getElementById('house_bar_wrap'));

        window.removeEventListener( 'resize', pieChart.resize() );
        window.removeEventListener( 'resize', barChart.resize() );

        pieChart.setOption({
            title : {
                show: false,
                text: '人口分类汇总',
                subtext: '(总计'+ housingInfo.housingTotal +')',
                x:'center',
                textStyle: {
                    color: '#fff',
                    fontWeight: 'normal'
                }
            },
            color: [ '#d7000f', '#eb8401', '#fff33f', '#74b853', '#0090e6', '#013974', '#53004e', '#948068', '#5d5d5d' ],
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show: false,
                orient: 'vertical',
                x: 'left',
                data:['过车感知', '开门记录','人脸抓拍','事件感知'],
                left: '5%',
                top: '5%',
                textStyle: {
                    fontSize: 12,
                    color: 'rgb(159, 190, 202)',
                },
            },
            series: [
                {
                    name:'房屋分类汇总',
                    type:'pie',
                    radius : ['45%', '70%'],
                    avoidLabelOverlap: false,
                    // radius: ['30%', '45%'],
                    center : ['50%', '50%'],
                    // roseType: 'radius',
                    // minAngle: 15,
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: 'rgba(255, 255, 255, 1)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                        }
                    },
                    // itemStyle: {
                    //     normal: {
                    //         color: '#40a9ff',
                    //         shadowBlur: 200,
                    //         shadowColor: 'rgba(0, 0, 0, 0.5)'
                    //     }
                    // },
                    // animationType: 'scale',
                    // animationEasing: 'elasticOut',
                    // animationDelay: function (idx) {
                    //     return Math.random() * 200;
                    // },
                    data: data                
                }
            ],
        })

        barChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                // left: '3%',
                top: 0,
                bottom: 0,
                containLabel: true
            },
            xAxis: {
                type: 'value',
                textStyle: {
                    color: '#fff'
                },
                show: false,
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                data: ydata,
                show: true,
                axisLine: {       //y轴
                    show: false
                },
                axisTick: {       //y轴刻度线
                    show: false
                },
                splitLine: {     //网格线
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },

            series: [
                {
                    type: 'bar',
                    // barCategoryGap: '30%',
                    barWidth: '16px',
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                var colorList = ['#d7000f', '#eb8401', '#fff33f', '#74b853', '#0090e6', '#013974', '#53004e', '#948068', '#5d5d5d'];
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    data: data
                }
            ]
        })
    }   
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    // Should be a controlled component.
    if ('housingInfo' in nextProps) {
        if(nextProps.housingInfo) {
            this.setState({
              housingInfo: nextProps.housingInfo,
            }, () => {
                this.initOptions()
            })
        }
    }
  }

  componentDidMount() {
      // console.log(this.props)
      const housingInfo = this.props.housingInfo
      if(housingInfo && housingInfo) {
          this.setState({
            housingInfo: housingInfo,
          }, () => {
              this.initOptions()
          })
      }
  }

  render() {
    return (
        <div className="left_pie_block">
            <div className="house_pie_wrap" id="house_pie_wrap"></div>
            <div className="house_bar_wrap" id="house_bar_wrap"></div>
        </div>
      
    );
  }
}

export default XQHouseTypePie;