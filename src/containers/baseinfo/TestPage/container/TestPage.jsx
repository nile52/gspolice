/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as actions from '../actions/TestPage'
import '../style/TestPage.less'
import SonComponent from './SonComponent'

@connect(
    state => state,
    {...actions}
)

class TestPage extends Component {
    constructor(props) {
        super(props)
        this.change = this.change.bind(this)
        this.state = {
            data: 'testpage_state'
        }
    }
    change = () => {
        this.props.changeProps({
            data: 'has_change_props'
        })
    }
    componentDidMount() {

    }
    render() {
        console.log(this.state.data)
        console.log(this.props)
        const toChildProps = {
            change: this.change,
            data: this.props.TestPage.data
        }
        return (
          <div className="test_page">
            <div>{this.state.data}</div>
            <div>{this.props.TestPage.data}</div>
            <div className="test_page_test">111</div>
            <SonComponent {...toChildProps}/>
          </div>
        );
    }
}
export default TestPage;