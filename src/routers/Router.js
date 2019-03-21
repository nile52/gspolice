import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import asyncComponent from '../async-component'
const BuildingArea = asyncComponent(() => import('../containers/baseinfo/BuildingArea/container/BuildingArea'))
const Resident = asyncComponent(() => import('../containers/baseinfo/Resident/container/Resident'))
const HousesManage = asyncComponent(() => import('../containers/baseinfo/HousesManage/container/HousesManage'))
const ServicesManageSearch = asyncComponent(() => import('../containers/baseinfo/ServicesManageSearch/container/ServicesManageSearch'))
const ServicesManage = asyncComponent(() => import('../containers/baseinfo/ServicesManage/container/ServicesManage'))
const NotFoundPage = asyncComponent(() => import('../component/NotFoundPage/NotFoundPage'))
const TestComponent = asyncComponent(() => import('../containers/baseinfo/TestComponent/container/TestComponent'))
const BasicAnimations = asyncComponent(() => import('../containers/baseinfo/BasicAnimations/container/BasicAnimations'))
const ParkingManage = asyncComponent(() => import('../containers/baseinfo/ParkingManage/container/ParkingManage'))
const CarsManage = asyncComponent(() => import('../containers/baseinfo/CarsManage/container/CarsManage'))
const CardManage = asyncComponent(() => import('../containers/baseinfo/CardManage/container/CardManage'))
const RegisterManage = asyncComponent(() => import('../containers/baseinfo/RegisterManage/container/RegisterManage'))
const HistoryCaseManage = asyncComponent(() => import('../containers/baseinfo/HistoryCaseManage/container/HistoryCaseManage'))
const CompanyManage = asyncComponent(() => import('../containers/baseinfo/CompanyManage/container/CompanyManage'))

const VisitorManage = asyncComponent(() => import('../containers/visitorsmanage/VisitorManage/container/VisitorManage'))

const LogQueryList = asyncComponent(() => import('../containers/systemmanage/LogQueryList/container/LogQueryList'))
const accountManage = asyncComponent(() => import('../containers/systemmanage/accountManage/container/accountManage'))
const authManage = asyncComponent(() => import('../containers/systemmanage/authManage/container/authManage'))
const roleManage = asyncComponent(() => import('../containers/systemmanage/roleManage/container/roleManage'))

const Router = () => {
    return (
        <Switch>
            <Route path="/app/baseinfo/buildingarea" component={BuildingArea}/>
            <Route path="/app/baseinfo/housesmanage" component={HousesManage}/>
            <Route path="/app/baseinfo/servicesmanagesearch" component={ServicesManageSearch}/>
            <Route path="/app/baseinfo/servicesmanage" component={ServicesManage}/>
            <Route path="/app/baseinfo/resident" component={Resident}/>
            <Route path="/app/baseinfo/test" component={TestComponent}/>
            <Route path="/app/baseinfo/basicAnimations" component={BasicAnimations}/>
            <Route path="/app/baseinfo/parkingmanage" component={ParkingManage}/>
            <Route path="/app/baseinfo/carsmanage" component={CarsManage}/>
            <Route path="/app/baseinfo/cardmanage" component={CardManage}/>
            <Route path="/app/baseinfo/registermanage" component={RegisterManage}/>
            <Route path="/app/baseinfo/historycasemanage" component={HistoryCaseManage}/>
            <Route path="/app/baseinfo/companymanage" component={CompanyManage}/>

            <Route path="/app/visitorsmanage/visitormanage" component={VisitorManage}/>

            <Route path="/app/systemmanage/logquerylist" component={LogQueryList}/>
            <Route path="/app/systemmanage/accountmanage" component={accountManage}/>
            <Route path="/app/systemmanage/authmanage" component={authManage}/>
            <Route path="/app/systemmanage/rolemanage" component={roleManage}/>  

            <Route path='/404' component={NotFoundPage} />
            <Redirect from='*' to='/developing' />
        </Switch>
    );
}
export default Router