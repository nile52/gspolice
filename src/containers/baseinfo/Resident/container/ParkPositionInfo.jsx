/* eslint-disable */
import React, { Component } from 'react';
import { Button, Form, Row, Col} from 'antd';
const FormItem = Form.Item;
import utils from '../../../../util/util.js'
import '../style/Resident.less'
import { 
    positionTypeJson, 
    formItemLayout1,
    formItemLayout2,
  } from './residentDatas'

class ParkPositionInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  render() {
    const {singleParkingLotList} = this.props;
    return (
        <div>
            {singleParkingLotList.length > 0 ? singleParkingLotList.map((item, index) => {
                return (
                    <Row key={'parkinfo'+index}>
                        <Col span={24}>
                            <Col span={6}>
                                <FormItem 
                                    label={'停车场:'}
                                    {...formItemLayout1}
                                >
                                    <span>{item.name}</span>
                                </FormItem> 
                            </Col>
                            <Col span={6}>
                                <FormItem 
                                    label={'车位号:'}
                                    {...formItemLayout1}
                                >
                                    <span>{item.parkingSpaceCoding}</span>
                                </FormItem> 
                            </Col>
                            <Col span={6}>
                                <FormItem 
                                    label={'车位类型:'}
                                    {...formItemLayout1}
                                >
                                    <span>{positionTypeJson[item.positionType]}</span>
                                </FormItem> 
                            </Col>
                        </Col> 
                    </Row>
                )
                
            }): <p style={{textAlign: 'center'}}>暂无车位数据</p>    }
       </div>
    )
  }
}

export default ParkPositionInfo;
