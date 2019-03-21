import React, { Component } from 'react';
import { 
    Modal
} from 'antd';
import { withRouter } from 'react-router-dom'
import './TopCascaderModal.less'
import TopCascaderModalContent from '../TopCascaderModalContent/TopCascaderModalContent';

@withRouter

class TopCascader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedValue: [],
            visible: false,
            label: 'Open Modal'
        }
    }

    // onChange = (value, selectedOptions) => {
    //     let len = value.length;
    //     let levelId = value[len-1];
    //     let level = selectedOptions[len-1].level;       
    //     this.props.changev({
    //         level: level,
    //         levelId: levelId,
    //     })
    //     localStorage.setItem('levelValue', value)
    //     localStorage.setItem('level', level)
    //     localStorage.setItem('levelId', levelId)
    //     if (this.props.location.pathname == '/gsdata/house') {
    //         if (level != 'zoneId') {
    //             alert('请选择小区')
    //         } else {
    //             this.props.allPost()
    //         }
    //     } else {
    //         this.props.allPost()
    //     }
    // }

    filter = (inputValue, path) => {
        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
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

    render() {
        var defaultValue = localStorage.getItem('levelValue')? localStorage.getItem('levelValue').split(",") : ["2"]; 
        var label = this.props.label
        const options = {
            level: this.props.level,
            levelValue: defaultValue,
            onCascaderChange: this.onCascaderChange
        }
        // console.log(this.state.label)
        return (
            <div>
                <div class="cascader_title" onClick={this.showModal}>{label}</div>
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
            
        );
    }
}

export default withRouter(TopCascader);