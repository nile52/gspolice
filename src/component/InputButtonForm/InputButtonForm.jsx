/* eslint-disable */
import React, {Component} from 'react';
import { Form, Button, Input } from 'antd';
const InputGroup = Input.Group;

class InputButtonForm extends React.Component {
  constructor(props) {
    super(props)
    const value = props.value || {};
    this.state = {
      input: '',
      button: false,
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
  handleButtonChange = (button) => {
    if (!('value' in this.props)) {
      this.setState({ button });
    }
    this.triggerChange({ button });
  }
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render () {
    const {input, button} = this.props.value
    return (
      <InputGroup compact>
          <Input style={{ width: '70%' }} value={input} placeholder={this.props.placeholder} 
          onChange={this.handleInputChange}/>   
          <Button style={{ width: '30%' }} disabled={!button} onClick={this.props.btnChange} onChange={this.handleButtonChange}>读取</Button>  
      </InputGroup>  
    ) 
  }
}

export default InputButtonForm;