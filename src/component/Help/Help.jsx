/* eslint-disable */
import React, { Component } from 'react';
import './Help.less'

import start1 from '../../static/images/start1@2x.png'
import start2 from '../../static/images/start2@2x.png'
import start3 from '../../static/images/start3@2x.png'

class Help extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guide1: true,
      guide2: true,
      guide3: true
    }
  }

  nextPage(page) {
    if(page != 'guide3') {
      this.setState({
        [page]: false
      })
    } else {
      this.props.close('help')()
    }
  }

  render() {
    return (
      <div className="help_mask_wrap">
        <ul>
          {this.state.guide1?<li onClick={() => {
            this.nextPage('guide1')
          }}><img src={start1} alt=""/></li>:null}
          {this.state.guide2?<li onClick={() => this.nextPage('guide2')}><img src={start2} alt=""/></li>:null}
          {this.state.guide3?<li onClick={() => this.nextPage('guide3')}><img src={start3} alt=""/></li>:null}
        </ul>
      </div>
    )
    
  }
}

export default Help;