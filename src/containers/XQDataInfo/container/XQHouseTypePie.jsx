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
        let residentChart = echarts.init(document.getElementById('house_pie_wrap'));
        residentChart.setOption({
            title : {
                text: '房屋分类汇总',
                subtext: '(总计'+ zoneTotal.housingTotal +')',
                x:'center',
                textStyle: {
                    color: '#fff',
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['自住', '群租','网约','出租'],
                left: '5%',
                top: '5%',
                textStyle: {
                    fontSize: 12,
                    color: 'rgb(159, 190, 202)',
                },
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    // radius: ['50%', '70%'],
                    radius: ['30%', '45%'],
                    center : ['50%', '60%'],

                    data:[
                      {value: zoneTotal['personalUse'], name:'自住'},
                      {value: zoneTotal['groupLive'], name:'群租'},
                      {value: zoneTotal['Internet'], name:'网约'},
                      {value: zoneTotal['rentOut'], name:'出租'},
                    ]
                }
            ],
        })
    }   
  }
 
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    // Should be a controlled component.
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
      // console.log(this.props)
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
      <div className="house_pie_wrap" id="house_pie_wrap"></div>
    );
  }
}

export default XQHouseTypePie;