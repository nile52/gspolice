import React, {Component} from 'react';
import DataSiderGH from './DataSiderGH'
import DataSiderPP from './DataSiderPP'
import DataSiderZH from './DataSiderZH'
import DataSiderCL from './DataSiderCL'
import TweenOne from 'rc-tween-one';

class DataSiderResident extends Component {
  constructor(props) {
    super(props)
    this.animation = { left: '0', duration: 500 };
    this.state={
      paused: true,
      reverse: false,
      moment: null,
      isClick: false,
      type: 'guanhuai'
    }
  }

  onPlay = () => {
    this.setState({
      paused: false,
      reverse: false,
      moment: null,
      isClick: true
    });
  }

  onReverse = () => {
    this.setState({
      paused: false,
      reverse: true,
      moment: 0,
      isClick: false
    }, () => {
      this.setState({
        moment: null,
      });
    });
  }

  changeTab = (type, cb) => {
    this.setState({
      type: type
    }, () => {
      if(cb) cb()
    })
  }

  render() {
    const { 
      isClick,
      paused,
      moment,
      reverse,
      type
    } = this.state 
    const {
      changev
    } = this.props
    return (
      <TweenOne 
        animation={this.animation}
        moment={moment}
        reverse={reverse}
        paused={paused}
        className="sider_resident">
         <div className="sider_resident_tab">
            <ul>
              <li  onClick={() => this.changeTab('guanhuai', () => {
                this.onPlay()
                this.props.getGHResidentList({
                  userTypeId: 1
                })
              })}>关怀人员</li>
              <li  onClick={() => this.changeTab('point', () => {
                this.onPlay()
                // this.props.getPPResidentList({
                //   userTypeId: 1
                // })
              })}>重点关注</li>
              <li  onClick={() => this.changeTab('zhuhu', () => {
                this.onPlay()
                this.props.getZHBuildList()
                this.props.getZHPersonnelRecord({},1,() => {
                  changev({
                    siderZHIdCard: undefined,
                    siderZHType: 'all',
                    siderZHInOutDateStart: undefined,
                    siderZHInOutDateEnd: undefined,
                  })
                })
              })}>住户进出</li>
              <li  onClick={() => this.changeTab('cheliang', () => {
                this.onPlay()
                this.props.getCLBuildList()
                this.props.getCLSelectRecVehicleRecord({},1,() => {
                  changev({
                    siderCLIdCard: undefined,
                    siderCLCarNumber: undefined,
                    siderCLType: 'all',
                    siderCLInOutDateStart: undefined,
                    siderCLInOutDateEnd: undefined,
                  })
                })
              })}>车辆进出</li>
              <li className="sider_resident_tab_search" onClick={this.onPlay}>
                <span className="sider_resident_tab_search_icon"></span>
              </li>
            </ul>
         </div>
         <div className="sider_resident_btn" onClick={isClick?this.onReverse:this.onPlay}>
          {isClick?'<':'>'}
         </div>
         <div>
           {type == 'guanhuai'?<DataSiderGH {...this.props}/>:null}
           {type == 'point'?<DataSiderPP {...this.props}/>:null}
           {type == 'zhuhu'?<DataSiderZH {...this.props}/>:null}
           {type == 'cheliang'?<DataSiderCL {...this.props}/>:null}
         </div>
      </TweenOne>
    )  
  }
}

export default DataSiderResident;