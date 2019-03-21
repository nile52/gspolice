/* eslint-disable */
import React, {Component} from 'react';
import {Button} from 'antd'

class SonComponent extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    render() {
        return (
          <div className="test_page">
            <Button onClick={this.props.change}>修改{this.props.data}</Button>
          </div>
        );
    }
}
export default SonComponent;