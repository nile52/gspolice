import {combineReducers} from 'redux'

import Page from '../containers/Page/reducer/Page'
import App from '../containers/App/reducer/App'
import DataVisualization from '../containers/DataVisualization/reducer/DataVisualization'
import BuildingArea from '../containers/baseinfo/BuildingArea/reducer/BuildingArea'
import HousesManage from '../containers/baseinfo/HousesManage/reducer/HousesManage'
import ServicesManageSearch from '../containers/baseinfo/ServicesManageSearch/reducer/ServicesManageSearch'
import Resident from '../containers/baseinfo/Resident/reducer/Resident'
import ServicesManage from '../containers/baseinfo/ServicesManage/reducer/ServicesManage'
import ParkingManage from '../containers/baseinfo/ParkingManage/reducer/ParkingManage'
import CarsManage from '../containers/baseinfo/CarsManage/reducer/CarsManage'
import CardManage from '../containers/baseinfo/CardManage/reducer/CardManage'
import VisitorManage from '../containers/baseinfo/VisitorManage/reducer/VisitorManage'
import LogQueryList from '../containers/baseinfo/LogQueryList/reducer/LogQueryList'
import RegisterManage from '../containers/baseinfo/RegisterManage/reducer/RegisterManage'
import HistoryCaseManage from '../containers/baseinfo/HistoryCaseManage/reducer/HistoryCaseManage'
import CompanyManage from '../containers/baseinfo/CompanyManage/reducer/CompanyManage'
import AlarmSystem from '../containers/AlarmSystem/reducer/AlarmSystem'
import XQDataInfo from '../containers/XQDataInfo/reducer/XQDataInfo'
import XQDetailInfo from '../containers/XQDetailInfo/reducer/XQDetailInfo'
import XQBuildDetailInfo from '../containers/XQBuildDetailInfo/reducer/XQBuildDetailInfo'
import XQHouseDetailInfo from '../containers/XQHouseDetailInfo/reducer/XQHouseDetailInfo'

import GSIndex from '../containers/gsdata/Index/reducer/Index'
import GSFace from '../containers/gsdata/Face/reducer/Face'
import GSMac from '../containers/gsdata/Mac/reducer/Mac'
import GSMonitor from '../containers/gsdata/Monitor/reducer/Monitor'
import GSCar from '../containers/gsdata/Car/reducer/Car'
import GSHouse from '../containers/gsdata/House/reducer/House'
import GSPeople from '../containers/gsdata/People/reducer/People'
import GSDoor from '../containers/gsdata/Door/reducer/Door'
import GSRealTime from '../containers/gsdata/RealTime/reducer/RealTime'

import ZHAFIndex from '../containers/zhafsq/NewIndex/reducer/NewIndex'
import ZHAFOld from '../containers/zhafsq/Old/reducer/Old'
import ZHAFGale from '../containers/zhafsq/Gale/reducer/Gale'
import ZHAFZone from '../containers/zhafsq/Zone/reducer/Zone'
import ZHAFZonePOP from '../containers/zhafsq/ZonePOP/reducer/ZonePOP'

import ZHAFPopulation from '../containers/zhafsq/Population/reducer/Population'
import ZHAFHouse from '../containers/zhafsq/House/reducer/House'
import ZHAFInstitution from '../containers/zhafsq/Institution/reducer/Institution'
import ZHAFStrength from '../containers/zhafsq/Strength/reducer/Strength'
import ZHAFSecurity from '../containers/zhafsq/Security/reducer/Security'

export default combineReducers({
    Page,
    App,
    BuildingArea,
    HousesManage,
    ServicesManageSearch,
    Resident,
    DataVisualization,
    ServicesManage,
    ParkingManage,
    CarsManage,
    CardManage,
    VisitorManage,
    LogQueryList,
    RegisterManage,
    AlarmSystem,
    XQDataInfo,
    XQDetailInfo,
    XQBuildDetailInfo,
    XQHouseDetailInfo,
    HistoryCaseManage,
    CompanyManage,
    GSIndex,
    GSFace,
    GSMac,
    GSMonitor,
    GSCar,
    GSHouse,
    GSPeople,
    GSDoor,
    GSRealTime,
    ZHAFIndex,
    ZHAFZone,
    ZHAFZonePOP,
    ZHAFPopulation,
    ZHAFHouse,
    ZHAFInstitution,
    ZHAFStrength,
    ZHAFOld,
    ZHAFGale,
    ZHAFSecurity,
});