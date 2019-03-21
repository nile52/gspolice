import React, {Component} from 'react';
import renderBubbleChart from '../../../static/js/bubbleUtil.js'

class FloatingFromArea extends Component {
    constructor(props) {
        super(props)
        this.initOptions = this.initOptions.bind(this)
        this.state = {
            nativePlace: null
        }
    }

    initOptions = () => {
        let _this = this
        const nativePlace = this.state.nativePlace
        if(nativePlace) {
            let data = []
            nativePlace.map((item) => {
                data.push({
                    "name": item.native_place,
                    "value": item.number
                })
            })
            renderBubbleChart(data, document.getElementById('floatingfromarea'), (params) => {
                let index = params.id.charAt(params.id.length -1)
                let value = nativePlace[index].native_place
                _this.props.getArea(value, 1,() => {
                    if(!_this.props.residentListVisible) {
                        _this.props.handleOk('residentListVisible')
                    }
                })
            });
        }
        
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('homePageTotal' in nextProps) {
            if(nextProps.homePageTotal && nextProps.homePageTotal.nativePlace) {
                
                nextProps.homePageTotal.nativePlace.sort((a, b) => {
                    return b.number - a.number
                })
                let newNativePlace = nextProps.homePageTotal.nativePlace.slice(0,10)
                this.setState({
                    nativePlace: newNativePlace,
                }, () => {
                    this.initOptions()
                })
            }
        }
    }

    componentDidMount() {	
        const homePageTotal = this.props.homePageTotal
        if(homePageTotal && homePageTotal.nativePlace) {
            homePageTotal.nativePlace.sort((a, b) => {
                return b.number - a.number
            })
            let newNativePlace = homePageTotal.nativePlace.slice(0,10)
            this.setState({
                nativePlace: newNativePlace
            }, () => {
                this.initOptions()
            })
        }
    }

    render() {
        return (
            <div id="floatingfromarea"  style={{width:'260px', height: '180px'}} className="floatingfromarea"></div>
        )  
    }
}

export default FloatingFromArea;