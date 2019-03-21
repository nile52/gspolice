import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux'
import axios from 'axios'
import utils from '../../../util/util.js'
import '../../../static/js/iconfont'
import {CAS_LOGIN, CAS_USERNAME } from '../../../fetch/apis'
import * as actions from '../actions/Page'
import '../style/Page.less'
import asyncComponent from '../../../async-component'
const DataVisualization = asyncComponent(() => import('../../DataVisualization'))
const AlarmSystem = asyncComponent(() => import('../../AlarmSystem'))
const XQDataInfo = asyncComponent(() => import('../../XQDataInfo'))
const XQDetailInfo = asyncComponent(() => import('../../XQDetailInfo'))
const XQBuildDetailInfo = asyncComponent(() => import('../../XQBuildDetailInfo'))
const XQHouseDetailInfo = asyncComponent(() => import('../../XQHouseDetailInfo'))

const GSLogin = asyncComponent(() => import('../../gsdata/Login'))
const GSIndex = asyncComponent(() => import('../../gsdata/Index'))
const GSFace = asyncComponent(() => import('../../gsdata/Face'))
const GSMac = asyncComponent(() => import('../../gsdata/Mac'))
const GSMonitor = asyncComponent(() => import('../../gsdata/Monitor'))
const GSCar = asyncComponent(() => import('../../gsdata/Car'))
const GSRealTime = asyncComponent(() => import('../../gsdata/RealTime'))
const GSHouse = asyncComponent(() => import('../../gsdata/House'))
const GSPeople = asyncComponent(() => import('../../gsdata/People'))
const GSDoor = asyncComponent(() => import('../../gsdata/Door'))

const HouseSituation = asyncComponent(() => import('../../HouseSituation'))
const NotFoundPage = asyncComponent(() => import('../../../component/NotFoundPage/NotFoundPage'))
const Developing = asyncComponent(() => import('../../Developing'))
const App = asyncComponent(() => import('../../App'))


const ZHAFIndex=asyncComponent(()=>import('../../zhafsq/NewIndex'))
const ZHAFOld=asyncComponent(()=>import('../../zhafsq/Old'))
const ZHAFGale=asyncComponent(()=>import('../../zhafsq/Gale'))
const ZHAFPopulation=asyncComponent(()=>import('../../zhafsq/Population'))
const ZHAFHouse=asyncComponent(()=>import('../../zhafsq/House'))
const ZHAFInstitution=asyncComponent(()=>import('../../zhafsq/Institution'))
const ZHAFStrength=asyncComponent(()=>import('../../zhafsq/Strength'))
const ZHAFSecurity=asyncComponent(()=>import('../../zhafsq/Security'))

const ZHAFZone=asyncComponent(()=>import('../../zhafsq/Zone'))
const ZHAFZonePOP=asyncComponent(()=>import('../../zhafsq/ZonePOP'))

@connect(
    state => state.Page,
    {...actions}
)

class Page extends React.Component {

  componentWillMount() {
    const QueryString = utils.queryString();
    console.log(QueryString.userKey)
    const userKey = QueryString.userKey || localStorage.getItem('userKey')
    let _this = this
    if(userKey) {
      // 判断授权码是否可用
      axios.get(`${CAS_USERNAME}?userKey=${userKey}`)
      .then(function (res) {
        let data = res.data
        if(data.msg === "成功" && data.success) {
            let userInfo = data.obj  
            _this.props.changev({
                userKey: userKey,
                userInfo: userInfo
            })
            localStorage.setItem('userKey', userKey)
        } else {
            utils.toLoginUrl(CAS_LOGIN)
            localStorage.setItem('userKey', null)
        }
      })  
      .catch(function (error) {
        utils.toLoginUrl(CAS_LOGIN)
        localStorage.setItem('userKey', null)
      });
    } else {
      utils.toLoginUrl(CAS_LOGIN)
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/zhaf/index" push />} />
          <Route path="/app" component={App}/>
          <Route path="/datavisualization" component={DataVisualization}/>
          <Route path="/alarmsystem" component={AlarmSystem}/>
          <Route path="/xqdatainfo" component={XQDataInfo}/>
          <Route path="/xqdetailinfo" component={XQDetailInfo}/>
          <Route path="/xqbuilddetailinfo" component={XQBuildDetailInfo}/>
          <Route path="/xqhousedetailinfo" component={XQHouseDetailInfo}/>

          <Route path="/gsdata/login" component={GSLogin}/>
          <Route path="/gsdata/index" component={GSIndex}/>
          <Route path="/gsdata/face" component={GSFace}/>
          <Route path="/gsdata/mac" component={GSMac}/>
          <Route path="/gsdata/monitor" component={GSMonitor}/>
          <Route path="/gsdata/car" component={GSCar} />
          <Route path="/gsdata/realtime" component={GSRealTime} />
          <Route path="/gsdata/house" component={GSHouse} />
          <Route path="/gsdata/people" component={GSPeople}/>
          <Route path="/gsdata/door" component={GSDoor}/>

          <Route path="/housesituation" component={HouseSituation}/>
          <Route path="/developing" component={Developing}/>
          <Route path='/404' component={NotFoundPage} />


          <Route path='/zhaf/index' component={ZHAFIndex} />
          <Route path='/zhaf/old' component={ZHAFOld} />
          <Route path='/zhaf/gale' component={ZHAFGale} />
          <Route path='/zhaf/population' component={ZHAFPopulation} />
          <Route path='/zhaf/house' component={ZHAFHouse} />
          <Route path='/zhaf/institution' component={ZHAFInstitution} />
          <Route path='/zhaf/Strength' component={ZHAFStrength} />
          <Route path='/zhaf/zone' component={ZHAFZone} />
          <Route path='/zhaf/zonepop' component={ZHAFZonePOP} />
          <Route path='/zhaf/security' component={ZHAFSecurity} />
          <Redirect from='*' to='/developing' />
        </Switch>
      </BrowserRouter>
  );
  }
}
export default Page