/* eslint-disable */
import React, {Component} from 'react';
import { Form, Select, Input } from 'antd';
import { phoneNumber } from './Phone'
const InputGroup = Input.Group;

class InputSelectForm extends React.Component {
  constructor(props) {
    super(props)
    const value = props.value || {};
    this.state = {
      input: '',
      select: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }

  handleInputChange = (e) => {
    const input = e.target.value
    if (!('value' in this.props)) {
      this.setState({ input });
    }
    this.triggerChange({ input });
  }
  handleSelectChange = (select) => {
    if (!('value' in this.props)) {
      this.setState({ select });
    }
    this.triggerChange({ select });
  }
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render () {
    let phoneNumOptions;
    if (phoneNumber && phoneNumber.length > 0) {
      phoneNumOptions = phoneNumber.map((item) => {
          return <Select.Option key={`+${item}`}>{`+${item}`}</Select.Option>;
      });
    } else {
      phoneNumOptions = [];
    }
    const {input, select} = this.props.value
    return (
      <InputGroup compact>
          <Select showSearch style={{ width: '30%' }} value={select} onChange={this.handleSelectChange}>
              {phoneNumOptions}
          </Select>
          <Input style={{ width: '70%' }} placeholder="请输入手机号码" value={input} onChange={this.handleInputChange}/>   
      </InputGroup>  
    ) 
  }
}

export default InputSelectForm;