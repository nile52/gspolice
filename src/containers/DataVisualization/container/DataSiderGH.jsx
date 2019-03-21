import React, {Component} from 'react';
import { 
  Form, 
  Row, 
  Col, 
  Checkbox, 
  Tag,
  Pagination,
  Spin
} from 'antd';
import utils from '../../../util/util.js'
import Redisent from '../../../static/images/test_redisent.jpg'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;


class DataSiderGH extends Component {
  constructor(props) {
    super(props)
    this.checkBoxChange = this.checkBoxChange.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.state={
      GHParams: 1,
      current: 1
    }
  }

  checkBoxChange = (checkedValues) => {
    console.log(checkedValues)
    let _this = this
    let newCheckedValues = null
    if(checkedValues.length>0) {
      newCheckedValues = checkedValues.join(',')
    }
    this.setState({
      GHParams: newCheckedValues
    }, () => {
      _this.props.getGHResidentList({
        userTypeId: newCheckedValues
      })
    })
  }

  onPageChange = (num) => {
    let _this = this
    this.setState({
      current: num
    }, () => {
      _this.props.getGHResidentList({
        userTypeId: _this.state.GHParams
      }, num)
    })
  }

  itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return null;
    } else if (type === 'next') {
      return null;
    }
    return originalElement;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      userTypeList,
      siderResidentList,
      GHTogal,
      ghLoading
    } = this.props
    const userTypeOptions = []
    if (userTypeList &&  userTypeList.length > 0) {
        userTypeList.forEach((item) => {
            userTypeOptions.push({
                label: item.name,
                value: item.id+''
            })
        })
    }
    console.log(userTypeOptions)

    return (
      <div className="sider_gh">
        <Spin spinning={ghLoading}>
        <h3 className="sider_gh_title">人员类型:</h3>
        <div className="sider_gh_form_wrap">
          <Row>
            <Col span={24}>
              <FormItem 
              >
                {getFieldDecorator(`form_userType`, {
                    initialValue: ['1']
                })(
                    <CheckboxGroup options={userTypeOptions}
                      onChange={this.checkBoxChange} 
                    />  
                )}
              </FormItem>
            </Col> 
          </Row>
        </div>
        <div className="sider_gh_list_wrap">
          {
            siderResidentList.length > 0? siderResidentList.map((item, index) => {
              return (<div className="sider_gh_list_item" key={index+'sider_gh_list_item'}>
              <Row>
                <Col span={8}>
                  <img src={item.file?item.file:Redisent} alt="" className="sider_gh_list_img"/>
                </Col>
                <Col span={16} className="gh_list_row_wrap">
                  <div className="sider_gh_list_row_item">
                    <Row>
                      <Col span={24}>姓名: <span className="gh_list_row_item_text">{item.name}</span></Col>
                    </Row>
                  </div>
                  <div className="sider_gh_list_row_item">
                    <Row>
                      <Col span={24}>人员类型:{item.flowIsPermanent?<div className="gh_list_row_item_tag"><Tag color={item.flowIsPermanent=="常住人员"?"#2db7f5":"#f50"}>{item.flowIsPermanent}</Tag></div>:null}</Col>
                    </Row>
                  </div>
                  <div className="sider_gh_list_row_item">
                    <Row>
                      <Col span={12}>性别: <span className="gh_list_row_item_text">{item.gender == 'male'?'男':'女'}</span></Col>
                      <Col span={12}>民族: <span className="gh_list_row_item_text_s">{item.racial}</span></Col>
                    </Row>
                  </div>
                  <div className="sider_gh_list_row_item">
                    <Row>
                      <Col span={24}>身份证: <span className="gh_list_row_item_text">{utils.plusXing(item.idCard, 10, 0)}</span></Col>
                    </Row>
                  </div>
                  <div className="sider_gh_list_row_item">
                    <Row>
                      <Col span={24}>电话: <span className="gh_list_row_item_text">{item.mobile ? utils.plusXingDe86(item.mobile, 7, 4, 4) : ''}</span></Col>
                    </Row>
                  </div>
                  <div className="sider_gh_list_row_item">
                    <Row>
                      <Col span={24}>地址: <span className="gh_list_row_item_text">{item.housingAddress}</span></Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>)
            }):null
          }
          {
            GHTogal>1?<div className="sider_gh_pagination">
            <Pagination 
              // simple
              itemRender={this.itemRender}
              current={this.state.current} 
              pageSize={20} 
              total={GHTogal} 
              onChange={this.onPageChange}
            />
          </div>:null
          }
        </div>
        </Spin>
      </div>
    )  
  }
}

export default Form.create()(DataSiderGH);