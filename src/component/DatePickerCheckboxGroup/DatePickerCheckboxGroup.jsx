/* eslint-disable */
import React, {Component} from 'react';
import { Form, Checkbox, DatePicker, Input } from 'antd';
import moment from 'moment'
const InputGroup = Input.Group;
const CheckboxGroup = Checkbox.Group;

class DatePickerCheckboxGroup extends React.Component {
  constructor(props) {
    super(props)
    const value = props.value || {};
    this.state = {
      datepicker: '',
      checkbox: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }

  handlePanelChange = (value, dateString) => {
    let newDate = moment(dateString)
    if (!('value' in this.props)) {

      this.setState({ datepicker: newDate });
    }
    this.triggerChange({ datepicker: newDate });
  }
  handleButtonChange = (checkbox) => {
    if (!('value' in this.props)) {
      this.setState({ checkbox });
    }
    this.triggerChange({ checkbox });
  }
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render () {
    const {datepicker, checkbox} = this.props.value
    const dateFormat = 'YYYY-MM-DD';
    return (
      <InputGroup compact>
        <DatePicker 
          className="resident-basic-date" 
          value={datepicker} 
          style={{ width: '70%' }} 
          format={dateFormat} 
          placeholder="身份证有效期"
          onChange={this.handlePanelChange}
        />
        <CheckboxGroup className="resident-basic-checkbox" value={checkbox} style={{ width: '30%' }} options={[{
          label: '永久', value: '永久'
        }]} /> 
      </InputGroup>  
    ) 
  }
}

export default DatePickerCheckboxGroup;