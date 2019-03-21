import React, {Component} from 'react';
import echarts from 'echarts'

class XQHouseTypePie extends Component {
  constructor(props) {
    super(props)
    this.initOptions = this.initOptions.bind(this)
    this.state = {
      equipmentInfo: null,
      data: null
    }
  }

  initOptions = () => {
    const equipmentInfo = this.state.equipmentInfo
    if(equipmentInfo) {
        let residentChart = echarts.init(document.getElementById('serve_bar_wrap'));
        window.removeEventListener( 'resize', residentChart.resize() );
        residentChart.setOption({
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
              subtext: '(总计'+ equipmentInfo.equipmentTotal +'万)'
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
            yAxis: {
                type: 'category',
                data: ['监控', '门禁', '车闸', '人闸', '人脸', '探针']
            },
            legend: {
                data:['设备正常', '设备故障'],
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
                    equipmentInfo.monitor.monitorOnline, 
                    equipmentInfo.entranceGuard.entranceGuardOnline, 
                    equipmentInfo.carLock.carLockOnline, 
                    equipmentInfo.entranceGuard.manLockOnline, 
                    equipmentInfo.manFace.manFaceOnline, 
                    equipmentInfo.mac.macOnline]
                  // data:FbarData
              },
              {
                  name:'设备故障',
                  type:'bar',
                  stack: '总量',
                  barWidth:'20%',
                  label: {
                      normal: {
                          show: false,
                          position: 'center',
                         formatter:function(v){return Math.abs(v.data)}
                      }
                  },
                  itemStyle: {
                    emphasis: {
                        barBorderRadius: [5, 0, 0, 5],
                        borderType: 'solid',
                        borderWidth: '1',
                        borderColor: '#ccc',
                    },
                    normal: {
                        barBorderRadius: [5, 0, 0, 5],
                        borderType: 'solid',
                        borderWidth: '1',
                        borderColor: '#ccc',
                    }
                  },
                  data:[                    
                    -equipmentInfo.monitor.monitorOffline, 
                    -equipmentInfo.entranceGuard.entranceGuardOffline, 
                    -equipmentInfo.carLock.carLockOffline, 
                    -equipmentInfo.entranceGuard.manLockOffline, 
                    -equipmentInfo.manFace.manFaceOffline, 
                    -equipmentInfo.mac.macOffline]
                  // data:MbarData
              }
            ]

        })
    }   
  }

  componentWillReceiveProps(nextProps) {
    if ('equipmentInfo' in nextProps) {
        if(nextProps.equipmentInfo) {
            this.setState({
              equipmentInfo: nextProps.equipmentInfo,
            }, () => {
                this.initOptions()
            })
        }
    }
  }

  componentDidMount() {
      const equipmentInfo = this.props.equipmentInfo
      if(equipmentInfo && equipmentInfo) {
          this.setState({
            equipmentInfo: equipmentInfo,
          }, () => {
              this.initOptions()
          })
      }
  }

  render() {
    return (
      <div id="serve_bar_wrap" className="serve_bar_wrap"></div>
    );
  }
}

export default XQHouseTypePie;