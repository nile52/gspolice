/* eslint-disable */
import React, { Component } from 'react';
import { Button, Form, Row, Col} from 'antd';
const FormItem = Form.Item;
import utils from '../../../../util/util.js'
import {
    relationHouseJson,
    formItemLayout1,
    formItemLayout2,
} from './residentDatas'
import '../style/Resident.less'

class HouseInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  render() {
    const {singleHouseList} = this.props;
    
    return (
        <div>
            {singleHouseList.length > 0 ? singleHouseList.map((item, index) => {
                let newName = ''
                let newNameArr = item.name.split('-')
                let newNameArrLength = newNameArr.length
                if( newNameArrLength > 1) {
                    newName = newNameArr[newNameArrLength -1]
                } else {
                    newName = item.name
                }
                return (
                    <Row key={index}>
                        <Col span={24}>
                            <Col span={9}>
                                <FormItem 
                                    label={'房屋位置:'}
                                    {...formItemLayout1}
                                >
                                    <span>{newName + item.unit + '单元' + item.layer + '层' + item.room + '室'}</span>
                                </FormItem> 
                            </Col>
                            <Col span={6}>
                                <FormItem 
                                    label={'与房主关系:'}
                                    {...formItemLayout1}
                                >
                                    <span>{relationHouseJson[item.relation]}</span>
                                </FormItem> 
                            </Col>
                        </Col> 
                    </Row>
                )
                
            }): <p style={{textAlign: 'center'}}>暂无房屋数据</p>    }
       </div>
    )
  }
}

export default HouseInfo;
