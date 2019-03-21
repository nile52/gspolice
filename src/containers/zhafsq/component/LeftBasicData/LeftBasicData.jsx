import React ,{Component} from 'react'
import $ from 'jquery'
import  './LeftBasicData.less'


class LeftBasicData extends  Component{
    constructor(props){
        super(props)
        this.state={}
    }

    componentDidMount(){
        // 鼠标跟随
        $('.population_bar_block').on('mousemove', '.population_bar', function (e) {
            var xPos = parseInt(e.pageX+12) + "px";
            var yPos = e.pageY-50 + "px";
            $(".legend").css("left", xPos)
            $(".legend").css("top", yPos);
        });       
    }

    render(){
        const subdistrictData = this.props.subdistrictData ? this.props.subdistrictData : []
        const subdistrictDataColor = this.props.subdistrictDataColor
        const subdistrictDatalength = this.props.subdistrictDataColor.length

        var maxTotal = Math.max.apply(Math, subdistrictData.map(function(o) {return o.total}))

        // console.log(maxTotal);
        
        return(
            <div>
                <div className="color_tags">
                    {subdistrictDataColor.map((item, key) => {
                        return(
                            <div key={key} className="color_tag">{item.label}<div className="tag" style={{background: item.color}}></div></div>
                        )
                    })}
                </div>
                <div className="population_bar_block">
                    {subdistrictData.map((item, key) => {
                        return(
                            <div key={key} className="bar_data">
                                <p>{item.name} <span>总数：{item.total}</span></p>
                                <div className="population_bar">
                                    {subdistrictDataColor.map((value, index) => {
                                        var vv = value.value
                                        var width = item[vv] ? item[vv]/maxTotal*360 + 'px' : 0
                                        return(
                                            <div key={index} style={{width: width, background: value.color}} className="bar_item">{item[vv] ? item[vv] : ''}</div>
                                        )
                                    })}
                                    <div className="legend">
                                        {subdistrictDataColor.map((value, index) => {
                                            var vv = value.value
                                            return(
                                                <div  key={index} className="legend_item"><div className="tag" style={{background: value.color}} ></div>{value.label}：{item[vv] ? item[vv] : 0}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default LeftBasicData 