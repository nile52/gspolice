import React ,{Component} from 'react'
import  './IndexTopHeader.less'
import { 
    Modal
} from 'antd';
import TopCascaderModalContent from '../TopCascaderModalContent/TopCascaderModalContent';
import iconHomePage from '../../../../static/images/zhafsq/icon_homepage.png';

class gsheader extends  Component{
    constructor(props){
        super(props)
        this.state={}
    }

    onCascaderChange = (value) => {
        this.setState({
            checkedValue: value,
            label: value.levelName
        })
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
    }

    handleOk = (e) => {
        // console.log(e);
        this.props.confirmCascaderChange(this.state.checkedValue)
        this.setState({
            visible: false,
            checkedValue: []
        });
    }

    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
            checkedValue: []
        });
    }

    render(){
        var defaultValue = localStorage.getItem('levelValue')? localStorage.getItem('levelValue').split(",") : ["2"]; 
        var label = this.props.label
        const options = {
            level: this.props.level,
            levelValue: defaultValue,
            onCascaderChange: this.onCascaderChange
        }
        var topDom

        if (this.props.titleType == 'type1') {
            topDom = <div className="gsheader type1">
                        <h2>{this.props.title}</h2>
                    </div>
        } else {
            topDom = <div className="gsheader type2">
                        <div className="title_block">
                            <div className="title">{this.props.title}</div>
                            <div className="subtitle" onClick={this.showModal}>
                                {this.props.subTitle}
                            </div>
                            <a href="/datavisualization">
                                <div className="left_btn">
                                    <img src={iconHomePage} />
                                </div>
                            </a>
                            <div className="right_btn"></div>
                            <Modal
                                title="层级切换"
                                visible={this.state.visible}
                                className="top-cascader-modal"
                                // transitionName="scale-in-out"
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                okText="确定"
                                cancelText="取消"
                            >
                                <TopCascaderModalContent {...options} />
                            </Modal>                                                                                                                                                                                                 
                        </div>
                    </div>
        }
        return(
            topDom
        )
    }
}
export default  gsheader 