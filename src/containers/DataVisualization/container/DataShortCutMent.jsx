import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Row, Col, Carousel} from 'antd';
import '../style/DataVisualization.less'

class DataShortCutMent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    let mainDom =  document.querySelector('.short_cut_content')
    // document.documentElement.clientHeight
    let screenH = document.documentElement.clientHeight
    let headerH = 11*12
    let mainH = (screenH-headerH)
    mainDom.style.minHeight = mainH/12 + 'rem'
    window.onresize = function() {
      let screenH = document.documentElement.clientHeight
      let headerH = 11*12
      let mainH = (screenH-headerH)
      mainDom.style.minHeight = mainH/12 + 'rem'
    }
  }

  render() {
    // let adminLink = "/developing"
    // let adminText = "治安安全"
    let adminLink = "/xqdatainfo"
    let adminText = "拱墅小区数据概览"
    console.log(this.props.DataVisualization.userInfo.userName)
    if(this.props.DataVisualization && this.props.DataVisualization.userInfo && (this.props.DataVisualization.userInfo.userName == "admin" || this.props.DataVisualization.userInfo.userName == "qirong" || this.props.DataVisualization.userInfo.userName == "test")) {
      adminLink = "/xqdatainfo"
      adminText = "拱墅小区数据概览"
    }
    return (
      <div className="short_cut_content">
        <div>
          <Carousel autoplay
            dots={false}
            speed={10000}
          >
            <div><h3>党政动手，依靠群众，预防纠纷，化解矛盾，维护稳定，促进发展</h3></div>
            <div><h3>做到了"矛盾不上交、平安不出事、服务不缺位"</h3></div>
          </Carousel>
        </div>
        <div className="short_cut_item_wrap">
          <Row type="flex" justify="space-around">
            <Col span={7}>
              <div className="short_cut_item">
                <Row>
                  <div className="short_cut_item_title">安全中心</div>
                </Row>
                <Row type="flex" justify="space-around" className="short_cut_item_row">
                  <Col span={10}>
                  {/* 治安安全 */}
                    <Link to={adminLink}><div className="short_cut_item_item short_cut_item_48">{adminText}</div></Link>
                  </Col>
                  <Col span={10}>
                    <Link to="developing"><div className="short_cut_item_item short_cut_item_49">消防安全</div></Link>
                  </Col>
                </Row>
                <Row type="flex" justify="space-around">
                  <Col span={10}>
                    <Link to="/zhaf/old"><div className="short_cut_item_item short_cut_item_50">老年人活动预警</div></Link>
                  </Col>
                  {/* 食品安全 */}
                  <Col span={10}>
                    <Link to="/zhaf/gale"><div className="short_cut_item_item short_cut_item_51">陌生人活动预警</div></Link>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={7}>
              <div className="short_cut_item">
                <Row>
                  <div className="short_cut_item_title">社区服务</div>
                </Row>
                <Row type="flex" justify="space-around" className="short_cut_item_row">
                  <Col span={10}>
                    <Link to="developing"><div className="short_cut_item_item short_cut_item_52">线上党建</div></Link>
                  </Col>
                  <Col span={10}>
                    <Link to="developing"><div className="short_cut_item_item short_cut_item_56_2">网格管理</div></Link>
                  </Col>
                </Row>
                <Row type="flex" justify="space-around" >
                  <Col span={10}>
                    <Link to="developing"><div className="short_cut_item_item short_cut_item_54">社工管理</div></Link>
                  </Col>
                  <Col span={10}>
                    <Link to="developing"><div className="short_cut_item_item short_cut_item_58">民情民意</div></Link>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={7}>
              <div className="short_cut_item">
                <Row>
                  <div className="short_cut_item_title">物业服务</div>
                </Row>
                <Row type="flex" justify="space-around" className="short_cut_item_row">
                  <Col span={10}>
                    <Link to="developing"><div className="short_cut_item_item short_cut_item_57">物业服务</div></Link>
                  </Col>
                  <Col span={10}>
                    <Link to="developing"><div className="short_cut_item_item short_cut_item_55">工单管理</div></Link>
                  </Col>
                </Row>
                <Row type="flex" justify="space-around">
                  <Col span={10}>
                    <Link to="developing"><div className="short_cut_item_item short_cut_item_53">车位管理</div></Link>
                  </Col>
                  <Col span={10}>
                    <Link to="developing"><div className="short_cut_item_item short_cut_item_59">社区公告</div></Link>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col span={23}>
              <div className="short_cut_down">
                <Row type="flex" justify="space-around">
                  <Col span={3}>
                    <Link to="/app/baseinfo/resident">
                      <div className="short_cut_down_item short_cut_down_60">居民管理</div>
                    </Link>
                  </Col>
                  <Col span={3}>
                    <Link to="/app/baseinfo/housesmanage">
                      <div className="short_cut_down_item short_cut_down_61">房屋管理</div>
                    </Link>
                  </Col>
                  <Col span={3}>
                    <Link to="/app/baseinfo/carsmanage">
                      <div className="short_cut_down_item short_cut_down_62">车辆管理</div>
                    </Link>
                  </Col>
                  <Col span={3}>
                    <Link to="/app/baseinfo/servicesmanagesearch">
                      <div className="short_cut_down_item short_cut_down_63">设备管理</div>
                    </Link>
                  </Col>
                  <Col span={3}>
                    <Link to="/">
                      <div className="short_cut_down_item short_cut_down_64">出入记录</div>
                    </Link>
                  </Col>
                  <Col span={3}>
                    <Link to="/">
                      <div className="short_cut_down_item short_cut_down_65">巡更记录</div>
                    </Link>
                  </Col>
                  <Col span={3}>
                    <Link to="/">
                      <div className="short_cut_down_item short_cut_down_66">系统设置</div>
                    </Link>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default DataShortCutMent;