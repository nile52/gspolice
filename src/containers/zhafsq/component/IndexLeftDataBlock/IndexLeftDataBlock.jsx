import React ,{Component} from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import {
    Modal
} from 'antd'
import  './IndexLeftDataBlock.less'
import pic00 from '../../../../static/images/zhafsq/pic00.png'
import pic01 from '../../../../static/images/zhafsq/pic01.png'
import pic02 from '../../../../static/images/zhafsq/pic02.png'
import pic03 from '../../../../static/images/zhafsq/pic03.png'
import pic04 from '../../../../static/images/zhafsq/pic04.png'
import pic05 from '../../../../static/images/zhafsq/pic05.png'
import pic06 from '../../../../static/images/zhafsq/pic06.png'

@connect(
    state => state,
)

class IndexLeftDataBlock extends  Component{

    constructor(props) {
        super(props)
        this.state = {
            xqVisible: false,
            pcsVisible: false,
        }
    }

    goXqPage = (e) => {
        var thisId = $(e.target).attr('data-id')
        var thisValue = $(e.target).text()        
        if (thisId) {
            localStorage.setItem('zoneId', thisId)
            localStorage.setItem('level','zoneId')
            localStorage.setItem('levelId', thisId)
            localStorage.setItem('label', thisValue)
            window.location.href = "/zhaf/zone"
        }
    }

    goPcsPage = (e) => {
        var thisValue = $(e.target).text()        
        if (thisValue) {
            localStorage.setItem('pcsName', thisValue)
            window.location.href = "/zhaf/strength"
        }
    }

    handleOk = (e) => {
        this.setState({
            xqVisible: false,
            pcsVisible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            xqVisible: false,
            pcsVisible: false,
        });
    }
    
    componentDidMount(){
        var _this = this
        $('.galeftmidList').on('click', 'a:eq(0)', function (e) {
            e.preventDefault();
            _this.setState({
                xqVisible: true,
            });
        })

        $('.galeftmidList').on('click', 'a:eq(5)', function (e) {
            e.preventDefault();
            _this.setState({
                pcsVisible: true,
            });
        })
    }
    
    render(){
        let leftDataArr = [
            {
                pic: pic00,
                title: "实有小区",
                href: "/zhaf/zone",
                value: this.props.leftdata ? this.props.leftdata.zoneTotal : ""
            },{
                pic: pic01,
                title: "实有人口",
                href: "/zhaf/population",
                value: this.props.leftdata ? this.props.leftdata.userTotal : ""
            },{
                pic: pic02,
                title: "实有房屋",
                href: "/zhaf/house",
                value: this.props.leftdata ? this.props.leftdata.housingTotal : ""
            },{
                pic: pic03,
                title: "实有单位",
                href: "/zhaf/institution",
                value:this.props.leftdata ? this.props.leftdata.organization : ""
            },{
                pic: pic04,
                title: "实有安防设施",
                href: "/zhaf/security",
                value:this.props.leftdata ? this.props.leftdata.securityEquipment : ""
            },{
                pic: pic05,
                title: "实有力量与装备",
                href: "/zhaf/strength",
                value: this.props.leftdata ? this.props.leftdata.powerEquipment : ""
            },{
                pic: pic06,
                title: "实有警情事件",
                href: "/zhaf/alarm",
                value: this.props.leftdata ? this.props.leftdata.alarm : ""
            },
        ]

        var xqlist = this.props.xqlist
        var pcslist = this.props.pcslist
 
        return(
            <div className="galeftmid">
                <div className="galeftmidList">
                    <ul>                                   
                        {   
                            leftDataArr.map((item, index)=>{
                                return(
                                    <a key={index} href={item.href}>
                                        <li >
                                            <img src={item.pic} alt={item.title}/>
                                            <em>{item.title}</em>
                                            <span>{item.value}</span>
                                        </li> 
                                    </a> 
                                )
                            })
                        }
                    </ul>
                </div>
                <Modal
                    className="top-cascader-modal"
                    title="请选择小区"
                    visible={this.state.xqVisible}
                    footer={false}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    { xqlist ? xqlist.map((item, index)=>(
                        <li><a key={item.id} data-id={item.id} onClick={this.goXqPage}>{item.name}</a></li>
                    )) : <p style={{color: "#fff"}}>暂无小区</p> }
                </Modal>

                <Modal
                    className="top-cascader-modal"
                    title="请选择派出所"
                    visible={this.state.pcsVisible}
                    footer={false}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    { pcslist ? pcslist.map((item, index)=>(
                        <li><a key={index}  onClick={this.goPcsPage}>{item}</a></li>
                    )) : <p style={{color: "#fff"}}>暂无数据</p> }
                </Modal>
            </div>
        )
    }
}
export default  IndexLeftDataBlock 