import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { withRouter, Link } from 'react-router-dom'

@withRouter

class GSHeader extends Component {
    constructor() {
        super()
        this.state = {
            time: '',
            visible: false,
        }
    }

    render() {
        const {path} = this.props;
        return (
            <Row>
                <Col span={24} className="data_info_left_top">
                <div className="data_info_header_center">
                    <div className="data_info_header_center_bg">
                    拱墅区公安网数据概览
                        <Link to={path}>
                        <div className="data_info_header_center_left" >
                            <span className="data_info_header_center_text">
                            {/* 数据可视化 */}
                            </span>
                        </div>
                        </Link>
                        <Link to="/app/baseinfo/buildingarea">
                        <div className="data_info_header_center_right">
                            <span className="data_info_header_center_text">
                            {/* 后台视图 */}
                            </span>
                        </div>
                        </Link>
                        <div className="data_info_header_center_time">{this.state.time}</div>
                    </div>
                </div>
                </Col>  
            </Row> 
        );
    }
}

export default GSHeader;