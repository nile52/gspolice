import React, {Component} from 'react';
import echarts from 'echarts'

class FloatingInPieCharts extends Component {
    constructor(props) {
        super(props)
        this.initOptions = this.initOptions.bind(this)
        this.state = {
            innerRing: null
        }
    }

    initOptions = () => {
        let _this = this
        const innerRing = this.state.innerRing
        if(innerRing) {
            let floatingInChart = echarts.init(document.getElementById('floatinginpie'));
        
            floatingInChart.setOption({
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    left: '5%',
                    top: '15%',
                    textStyle: {
                    fontSize: 12,
                    color: 'rgb(159, 190, 202)',
                    },
                    data:['学龄前儿童','其他','老年人']
                },
                series: [
                    {
                        name: '',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '40%'],
                        center : ['60%', '38%'],
                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value: innerRing.childrenFlow, name:'学龄前儿童', selected:true},
                            {value: innerRing.otherFlow, name:'其他'},
                            {value: innerRing.oldManFlow, name:'老年人'}
                        ]
                    }
                ]
            })
            floatingInChart.off('click')
            floatingInChart.on('click', function(params) {
                let value = params.data.name
                let dataJson = {}
                dataJson.residentListTitle = value
                dataJson.flow = true
                switch(value) {
                    case "学龄前儿童":
                        dataJson.key = 'children'
                        break
                    case "老年人":
                        dataJson.key = 'oldMan'
                        break
                    case "其他":
                        dataJson.key = 'other'
                        break
                }
                _this.props.getAge(dataJson, 1, () => {
                    if(!_this.props.residentListVisible) {
                        _this.props.handleOk('residentListVisible')
                    }
                })
            })  
        }
        
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if('pieList' in nextProps) {
            if(nextProps.pieList && nextProps.pieList.innerRing) {
                this.setState({
                    innerRing: nextProps.pieList.innerRing,
                }, () => {
                    this.initOptions()
                })
            }
        }
    }

    componentDidMount() {
        const pieList = this.props.pieList
        if(pieList && pieList.innerRing) {
            this.setState({
                innerRing: pieList.innerRing
            }, () => {
                this.initOptions()
            })
        }
        
    }

    render() {
        return (
        <div id="floatinginpie" className="floatinginpie"></div>
        )  
    }
}

export default FloatingInPieCharts;