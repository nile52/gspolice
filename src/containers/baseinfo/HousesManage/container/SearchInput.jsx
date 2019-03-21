/* eslint-disable */
import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;
import querystring from 'querystring';


let timeout;
let currentValue;





class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      data: [],
      value: undefined,
    }
  }

  fetch(value, callback) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    var _this = this
    currentValue = value;
    function fake() {
      _this.props.getSelectHousingMaster(value)
    }
    timeout = setTimeout(fake, 300);
  }

  handleSearch = (value) => {
    this.fetch(value, data => this.setState({ data }));
  }

  handleChange = (v) => {
    console.log(v);
    this.setState({ value: v });
    console.log(this.state.value)
  }

  
  render() {

    var data = this.props.HousingMasterData
    var options;

    if(data){
      options = data.map(d => <Option value={d.id}>{d.name}{d.mobile}</Option>);
    }else{
      options = []
    }

    console.log(options)
    
    return (
      <Select
        showSearch
        // value={this.state.value}
        // placeholder={this.props.placeholder}
        style={{width:'100%'}}
        defaultActiveFirstOption={false}
        // showArrow={false}
        filterOption={false}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        // notFoundContent={null}
      >
        {/* {options} */}

        <Option value="4">4</Option>
        <Option value="5">5</Option>
        <Option value="6">6</Option>
        <Option value="7">7</Option>
        <Option value="8">8</Option>
        <Option value="9">9</Option>
      </Select>
    );
  }
}

export default SearchInput;
