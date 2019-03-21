import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import $ from 'jquery'

class NativePlaceBar extends Component {
  constructor(props) {
    super(props)
    this.initOptions = this.initOptions.bind(this)
    this.state = {
      housingInfo: null,
    }
  }

  initOptions = () => {

    var compare = function (obj1, obj2) {
        var val1 = obj1.value;
        var val2 = obj2.value;
        if (val1 > val2) {
            return -1;
        } else if (val1 < val2) {
            return 1;
        } else {
            return 0;
        }            
    } 
 
    let nativeArr = this.props.nativeArr ? this.props.nativeArr.sort(compare).slice(0,20).reverse() : null;

    let nativeName = nativeArr ? nativeArr.map((item) => (item.name)) : null

    if(nativeArr) {
        let barChart = echarts.init(document.getElementById('native_bar_wrap'));

        window.removeEventListener( 'resize', barChart.resize() );

        barChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
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
                data: nativeName,
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
                    barWidth: '16px',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideLeft'
                        },
                    },
                    itemStyle: {
                        normal: { color: '#eb8401' }
                    },
                    data: nativeArr
                },
            ]
        })

    }   
  }

  componentWillReceiveProps(nextProps) {
    this.initOptions()
  }

  componentDidMount() {
      this.initOptions()
  }

  render() {
    return (
        <div className="map_bar_block">
            <div className="native_bar_wrap" id="native_bar_wrap"></div>
        </div>
      
    );
  }
}

export default NativePlaceBar;