import React, {Component} from 'react';
import echarts from 'echarts'
import $ from 'jquery'

class XQHouseTypePie extends Component {
  constructor(props) {
    super(props)
    this.initOptions = this.initOptions.bind(this)
    this.state = {
      housingInfo: null,
      data: null
    }
  }

  initOptions = () => {
    const housingInfo = this.state.housingInfo
    if(housingInfo) {
        let pieChart = echarts.init(document.getElementById('house_pie_wrap'));

        var data = [
            // {value: housingInfo.personalUse, name:'自住'},
            // {value: housingInfo.groupLive, name:'群租'},
            // {value: housingInfo.Internet, name:'网约'},
            // {value: housingInfo.rentOut, name:'出租'},
          //   {value: 315, name:'自住'},
          //   {value: 310, name:'群租'},
          //   {value: 274, name:'网约'},
          //   {value: 235, name:'出租'},
        ]

        if(housingInfo.personalUse && housingInfo.personalUse>0){
            data.push( {value: housingInfo.personalUse, name:'自住'})
        }

        if(housingInfo.groupLive && housingInfo.groupLive>0){
            data.push( {value: housingInfo.groupLive, name:'群租'})
        }

        if(housingInfo.Internet && housingInfo.Internet>0){
            data.push( {value: housingInfo.Internet, name:'网约'})
        }

        if(housingInfo.rentOut && housingInfo.rentOut>0){
            data.push( {value: housingInfo.rentOut, name:'出租'})
        }

        window.removeEventListener( 'resize', pieChart.resize() );
        pieChart.setOption({
            title : {
                show: false,
                text: '房屋分类汇总',
                subtext: '(总计'+ housingInfo.housingTotal +')',
                x:'center',
                textStyle: {
                    color: '#fff',
                    fontWeight: 'normal'
                }
            },
            color: [ '#2e9f23','#ffef00',  '#0055aa','#d7000e','#df4900' ],

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
    

            legend: {
                show: false,
                orient: 'vertical',
                x: 'left',
                data:['过车感知', '开门记录','人脸抓拍','事件感知','MAC感知'],
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
                    // center : ['50%', '50%'],
                    // roseType: 'radius',
                    minAngle: 15,
                    label: {
                        normal: {
                            show: false,
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.7)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false,
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.7)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
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
                    data: [
                        {value: 315, name:'过车感知'},
                        {value: 310, name:'开门记录'},
                        {value: 274, name:'人脸抓拍'},
                        {value: 235, name:'事件感知'},
                        {value: 335, name:'MAC感知'},
                    ]                  
                }
            ],
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
      <div className="house_pie_wrap" id="house_pie_wrap"></div>
    );
  }
}

export default XQHouseTypePie;