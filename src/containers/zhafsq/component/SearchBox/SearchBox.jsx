import React, { Component } from 'react';
import { 
    Layout,
    Row,
    Col, 
    DatePicker,
    Input,
    Button,
    Form,
} from 'antd';
import { withRouter } from 'react-router-dom';

import './SearchBox.less'

import SearchBtn from '../../../../static/images/gawing/search_btn_icon.png'

import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;

class SearchBox extends Component {
    constructor(props) {
        super(props)
        const value = props.value || {};
        this.state = {
            collapsed: false,
            mode: 'inline',
            openKey: '',
            selectedKey: '',
            firstHide: true,        // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
            menuAuth: null
        };
    }

  componentWillMount() {
    // const resource = this.props.userInfo.resource
    let menuList = []
    let newResource = []
    let itemMenu = {}
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.startTime = values.startTime ? values.startTime.format('YYYY-MM-DD') : ''
      values.endTime = values.endTime ? values.endTime.format('YYYY-MM-DD') : ''
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.handleSubmit(values)
      }
    });
  }
  
  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  render() {
      const {
        getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
      } = this.props.form;
  

      return (
          <div className="search_box">
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem style={{ width: '40%', marginRight: '5px'}}>
                    {getFieldDecorator(this.props.from1, {
                    })(
                    <Input style={{ width: '100%'}} placeholder={this.props.placeholder} />
                    )}
                </FormItem>
                <FormItem  style={{ width: '20%', marginRight: '5px'}}>
                    {getFieldDecorator('startTime', {
                    })(
                    <DatePicker style={{ width: '100%'}} className="search_form" locale={locale} />
                    )}
                </FormItem>
                <FormItem  style={{ width: '20%', marginRight: '5px'}}>
                    {getFieldDecorator('endTime', {
                    })(
                    <DatePicker style={{ width: '100%'}} className="search_form" locale={locale} />
                    )}
                </FormItem>
                <FormItem  style={{ width: '10%', marginRight: 0}}>
                    <Button
                    type="primary"
                    htmlType="submit"
                    disabled={this.hasErrors(getFieldsError())}
                    >
                    <img src={SearchBtn} style={{ marginTop: '-4px'}} />
                    </Button>
                </FormItem>
            </Form>
          </div>
      )
  }
}

// export default withRouter(SearchBox);
export default Form.create()(SearchBox);