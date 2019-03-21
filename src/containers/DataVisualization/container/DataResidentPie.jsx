import React, {Component} from 'react';
import echarts from 'echarts'

class DataResidentPie extends Component {
    constructor(props) {
        super(props)
        this.initOptions = this.initOptions.bind(this)
        this.state = {
            userTypeTotalResident: null,
            innerRing: null
        }
    }

    initOptions = () => {
        let _this = this
        const userTypeTotalResident = this.state.userTypeTotalResident
        const innerRing = this.state.innerRing
        if(userTypeTotalResident && innerRing) {
            let residentChart = echarts.init(document.getElementById('residentpiechart'));
        
            residentChart.setOption({
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    left: '5%',
                    top: '5%',
                    textStyle: {
                        fontSize: 12,
                        color: 'rgb(159, 190, 202)',
                    },
                    data:['党员', '退休','残障','失业','退伍','关怀','学龄前儿童', '老年人', '其他']
                },
                series: [
                    
                    {
                        name: '',
                        type:'pie',
                        radius: ['30%', '45%'],
                        center : ['58%', '45%'],
                        data:[
                            {value: userTypeTotalResident[8], name:'党员'},
                            {value: userTypeTotalResident[2], name:'退休'},
                            {value: userTypeTotalResident[5], name:'残障'},
                            {value: userTypeTotalResident[3], name:'失业'},
                            {value: userTypeTotalResident[4], name:'退伍'},
                            {value: userTypeTotalResident[1], name:'关怀'}
                        ]
                    },
                    {
                        name: '',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '20%'],
                        center : ['58%', '45%'],
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
                            {value: innerRing.childrenResident, name:'学龄前儿童', selected:true},
                            {value: innerRing.otherResident, name:'其他'},
                            {value: innerRing.oldManResident, name:'老年人'}
                        ]
                    }
                ]
            })
            residentChart.off('click')
            residentChart.on('click', function(params) {
                let value = params.data.name
                let dataJson = {}
                dataJson.residentListTitle = value
                dataJson.flow = false
                switch(value) {
                    case "退休":
                        dataJson.valueId = 2
                        break
                    case "残障":
                        dataJson.valueId = 5
                        break
                    case "失业":
                        dataJson.valueId = 3
                        break
                    case "退伍":
                        dataJson.valueId = 4
                        break
                    case "党员":
                        dataJson.valueId = 8
                        break
                    case "关怀":
                        dataJson.valueId = 1
                        break
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
                if(value == '学龄前儿童' || value == '老年人' || value == '其他') {
                    _this.props.getAge(dataJson, 1, () => {
                        if(!_this.props.residentListVisible) {
                            _this.props.handleOk('residentListVisible')
                        }
                    })
                } else {
                    _this.props.getLabel(dataJson, 1, () => {
                        if(!_this.props.residentListVisible) {
                            _this.props.handleOk('residentListVisible')
                        }
                    })
                }
            })
        }
        
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('homePageTotal' in nextProps) {
            if(nextProps.homePageTotal && nextProps.homePageTotal.userTypeTotalResident) {
                this.setState({
                    userTypeTotalResident: nextProps.homePageTotal.userTypeTotalResident,
                }, () => {
                    this.initOptions()
                })
            }
        }
        if ('pieList' in nextProps) {
            if(nextProps.pieList.innerRing) {
                this.setState({
                    innerRing: nextProps.pieList.innerRing,
                }, () => {
                    this.initOptions()
                })
            }
        }
    }

    componentDidMount() {
        const homePageTotal = this.props.homePageTotal
        const pieList = this.props.pieList
        if(homePageTotal && homePageTotal.userTypeTotalResident) {
            this.setState({
                userTypeTotalResident: homePageTotal.userTypeTotalResident,
            }, () => {
                this.initOptions()
            })
        }
        if(pieList && pieList.innerRing) {
            this.setState({
                innerRing: pieList.innerRing,
            }, () => {
                this.initOptions()
            })
        }
    }
    

    render() {
        return (
        <div id="residentpiechart" className="residentpiechart"></div>
        )  
    }
}

export default DataResidentPie;