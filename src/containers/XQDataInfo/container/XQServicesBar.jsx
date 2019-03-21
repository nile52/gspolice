import React, {Component} from 'react';
import echarts from 'echarts'

class XQHouseTypePie extends Component {
  constructor(props) {
    super(props)
    this.initOptions = this.initOptions.bind(this)
    this.state = {
      zoneTotal: null,
      data: null
    }
  }

  initOptions = () => {
    const zoneTotal = this.state.zoneTotal
    if(zoneTotal) {
        let residentChart = echarts.init(document.getElementById('serve_bar_wrap'));
        residentChart.setOption({
            color: ['#3398DB'],
            textStyle: {
              color: '#fff',
              fontWeight: 'normal',
            },
            title: {
              text: '设备数量汇总',
              x:'center',
              textStyle: {
                color: '#fff',
                fontWeight: 'normal',
              },
              subtext: '(总计'+ zoneTotal.EqptEquipmentChannelTotal +'万)'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
                type: 'value'        
            },
            yAxis: {
                type: 'category',
                data: ['故障离线', '正常在线', '探针', '门闸', '监控']
            },
            series: [{
                data: [zoneTotal.EqptEquipmentChannelOfflineTotal, 
                       zoneTotal.EqptEquipmentChannelOnlineTotal,  zoneTotal.EqptEquipmentChannelAlarmTotal, zoneTotal.EqptEquipmentChannelDoorTotal,zoneTotal.EqptEquipmentChannelVideoTotal],
                type: 'bar',
                barWidth: '40%'
            }]
        })
    }   
  }

  componentWillReceiveProps(nextProps) {
    if ('zoneTotal' in nextProps) {
        if(nextProps.zoneTotal) {
            this.setState({
              zoneTotal: nextProps.zoneTotal,
            }, () => {
                this.initOptions()
            })
        }
    }
  }

  componentDidMount() {
      const zoneTotal = this.props.zoneTotal
      if(zoneTotal && zoneTotal) {
          this.setState({
            zoneTotal: zoneTotal,
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