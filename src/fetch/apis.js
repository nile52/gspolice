const IP_URL = "http://192.168.0.111"
const DAHUA_URL = "http://41.198.192.4"
// const ALIYUN_URL = "http://consume.zjqrkj.cn"
const ALIYUN_URL = "http://192.168.0.26:8082" //阿里云 http://47.100.230.100 http://192.168.0.25 http://consume.zjqrkj.cn  //http://41.198.198.31:8082/
const ALIYUN_ADMIN = "http://admin.zjqrkj.cn" //阿里云 http://47.100.230.100 http://192.168.0.25 http://admin.zjqrkj.cn
const HTTP_ALIYUN_URL = "http://192.168.0.26:8081" // http://192.168.1.100:8081    //http://112.17.160.151:50001
// const HTTP_ALIYUN_URL = "http://www.zjqrkj.cn" //http+域名 阿里云 http://www.zjqrkj.cn
const HTTPS_ALIYUN_URL = "https://www.zjqrkj.cn" //https+域名 阿里云
const HTTPS_WEI_ALIYUN_URL = "https://zjqrkj.cn:8088/consume"
// 智慧小区后台接口
export const WS_URL = 'ws://47.100.230.100:8084/websocket'
// export const CAS_URL = HTTP_ALIYUN_URL + ':8081'
// export const WEI_URL = ALIYUN_URL + ':8084'
export const CAS_URL = HTTP_ALIYUN_URL
export const WEI_URL = ALIYUN_URL
export const CAS_LOGIN = CAS_URL + "/"
// 用户授权码是否可用
export const CAS_CASCHECK = CAS_URL + '/casCheck'
// 用户内容获取
export const CAS_USERNAME = CAS_URL + '/userName'
// 用户拥有小区数量
export const CAS_XQLIST = WEI_URL + '/rpc/zoneController/getZone'
// 用户退出登录
export const CAS_LOGOUT = CAS_URL + '/logoutUser'
// 获取大华url
export const WEI_ZONE_SYSTEM = WEI_URL + '/rpc/zoneController/zoneSystem'
// 楼房查询
export const WEI_BUILD = WEI_URL + '/rpc/archController/selectStoriedBuilding'
// 房屋查询
export const WEI_HOUSE = WEI_URL + '/rpc/archController/selectHousing'
// 房屋修改
export const WEI_UPDATEHOUSE = WEI_URL + '/rpc/archController/updateLocalHousing'
// 在地单位新增
export const WEI_COMPANY_INSERT = WEI_URL + '/rpc/CompanyController/insert'
// 在地单位查询
export const WEI_COMPANY_SELECT = WEI_URL + '/rpc/CompanyController/select'
// 在地单位查询（单条）
export const WEI_COMPANY_SELECT_ID = WEI_URL + '/rpc/CompanyController/selectCompany'
// 在地单位修改
export const WEI_COMPANY_UPDATE = WEI_URL + '/rpc/CompanyController/update'
// 在地单位删除
export const WEI_COMPANY_DELETE = WEI_URL + '/rpc/CompanyController/delete'
// 设备查询
export const WEI_SERVICE = WEI_URL + '/rpc/eqptController/selectEqptEquipment'
// 设备品牌查询
export const WEI_SERVICE_BRAND = WEI_URL + '/rpc/eqptController/selectEqptEquipmentBrand'
// 居民查询
export const WEI_RESIDENT = WEI_URL + '/rpc/userController/selectUser'
// 居民导出
export const WEI_EXPORTUSER = WEI_URL + '/rpc/excelController/exportUser'
// 人员插入
export const WEI_RESIDENT_INSERT = WEI_URL + '/rpc/userController/insertUser'
// 人员删除
export const WEI_RESIDENT_DELETE = WEI_URL + '/rpc/userController/deleteUser'
// 单条居民信息查询
export const WEI_SINGLE_RESIDENT = WEI_URL + '/rpc/userController/select'
// 单条居民信息修改
export const WEI_MODIFY_RESIDENT = WEI_URL + '/rpc/userController/updateUser'
// 单条居民房屋关联
export const WEI_SELECT_USER_HOUSING = WEI_URL + '/rpc/userController/selectUserHousing'
// 停车场查询
export const WEI_SELECT_PARKING_LOT = WEI_URL + '/rpc/vmController/selectParkingLot'
// 停车位查询
export const WEI_SELECT_PARKING_SPACE = WEI_URL + '/rpc/vmController/selectParkingSpace'
// 新增停车场
export const WEI_ADD_PARKING_LOT = WEI_URL + '/rpc/vmController/insertParkingLot'
// 新增停车位
export const WEI_ADD_PARKING_SPACE = WEI_URL + '/rpc/vmController/insertParkingSpace'
// 修改停车位
export const WEI_UPDATE_PARKING_SPACE = WEI_URL + '/rpc/vmController/updateParkingSpace'
// 停车场清空车位
export const WEI_DELETE_PARKING_SPACE = WEI_URL + '/rpc/vmController/delParkingSpace'
// 房屋总数
export const WEI_HOME_PAGE_TOGAL = WEI_URL + '/rpc/homePageController/homePageTotal'
// 楼统计
export const WEI_BUILD_TOGAL = WEI_URL + '/rpc/homePageController/homePageStoriedBuilding'
// 设备通道
export const WEI_SERVICE_CHANNEL = WEI_URL + '/rpc/eqptController/selectEqptEquipmentChannel'
// 车辆出入记录
export const WEI_SELECT_RECVEHICLE_RECORD = WEI_URL + '/rpc/recController/selectRecVehicleRecord'
// 房屋信息
export const WEI_GET_HOUSING = WEI_URL + '/rpc/homePageController/getHousing'
// 获取头像地址
export const WEI_RESIDENT_PICTURE = WEI_URL + '/rpc/userController/picture'
// 获取视频流
export const WEI_PLAY = WEI_URL + '/rpc/eqptController/play'
// 获取人员出入记录
export const WEI_PERSONNEL_RECORD = WEI_URL + '/rpc/recController/selectRecPersonnelRecord'
// 获取访客列表
export const WEI_SELECT_USER_GUEST = WEI_URL + '/rpc/userController/selectUserGuest'
// 系统类型大全
export const WEI_KEY_AND_VALUE = WEI_URL + '/rpc/homePageController/keyAndValue'
// 获取第三方页面token
export const GET_THIRD_TOKEN = WEI_URL + '/rpc/userController/getToken'
// 获取省地址
// 获取市地址
// 获取区地址
// 获取具体地址
export const GET_LKB_ADDRESS = WEI_URL + '/rpc/userController/getZjjzzgl'
// 标签详细人员
export const WEI_GET_LABEL = WEI_URL + '/rpc/homePageController/label'
// 年龄用户详细
export const WEI_GET_AGE = WEI_URL + '/rpc/homePageController/age'
// 饼图接口
export const WEI_PIE_CHART = WEI_URL + '/rpc/homePageController/pieChart'
// 柱状图接口
export const WEI_BAR_CHART = WEI_URL + '/rpc/homePageController/histogram'
// 认证接口
export const WEI_GET_ID_CARD = WEI_URL + '/rpc/hardwareController/getIdCard'
// 日志查询
export const WEI_GET_LOG_LIST = WEI_URL + '/rpc/logController/selectList'
// Api详细
export const WEI_GET_LOG_API = WEI_URL + '/rpc/logController/selectApi'
// 用户房屋列表
export const WEI_HOUSING_ADDRESS = WEI_URL + '/rpc/userController/selectUserHousing'
// 小区默认监控
export const WEI_DEFAULT_PLAY = WEI_URL + '/rpc/homePageController/getDefaultMonitoring'
// 公安页面柱状图数据/小区-楼列表
export const WEI_HISTOGRAM = WEI_URL + '/rpc/homePageController/histogram'
// 小区详细数据
export const WEI_ZONETOTAL = WEI_URL + '/rpc/homePageController/zoneTotal'
// 车辆详细数据
export const WEI_VEHICLE = WEI_URL + '/rpc/vmController/selectVehicle'
// 楼幢房屋列表
export const WEI_HOUSING = WEI_URL + '/rpc/homePageController/homePageHousing'
// 楼幢房屋信息
export const WEI_USER = WEI_URL + '/rpc/homePageController/homePageUser'
// 新增案件
export const WEI_CASE_INSERT = WEI_URL + '/rpc/legalCaseController/insert'
// 查询案件
export const WEI_CASE_SELECT = WEI_URL + '/rpc/legalCaseController/select'
// 修改
export const WEI_CASE_UPDATE = WEI_URL + '/rpc/legalCaseController/update'
// 删除--只需 案件ID
export const WEI_CASE_DELETE = WEI_URL + '/rpc/legalCaseController/delLegalCase'
// 案件总数查询 大屏
export const WEI_CASE_TOTAL = WEI_URL + '/rpc/legalCaseController/selectTotal'
//户主查询
export const WEI_SELECTHOUSEINGMASTER = WEI_URL + '/rpc/userController/selectHousingMaster'

// 拱墅-获取层级结构
export const WEI_ZONE_INFO = WEI_URL + '/rpc/indexController/zoneInfo'
// 拱墅-人口统计
export const WEI_INDEX_POPULATION = WEI_URL + '/rpc/indexController/populationInfo'
// 拱墅-房屋分类统计
export const WEI_INDEX_HOUSING = WEI_URL + '/rpc/indexController/housingInfo'
// 拱墅-设备数量统计
export const WEI_INDEX_EQUIPMENT = WEI_URL + '/rpc/indexController/equipmentInfo'
// 拱墅-首页-地图点位
export const WEI_POINT_POSITION = WEI_URL + '/rpc/indexController/pointPositionInfo'
// 拱墅-房屋-详情
export const WEI_HOUSING_BUILDING = WEI_URL + '/rpc/housingController/housingBuildingData'
// 拱墅-房屋-房间-详情
export const WEI_HOUSING_PERSONNEL = WEI_URL + '/rpc/housingController/housingPersonnelInfo'
// 拱墅-住户-搜索
export const WEI_HOUSE_SEARCH = WEI_URL + '/rpc/householdController/search'
// 拱墅-设备数据(实时监控:1,车闸:5,Mac探针:40,门闸:8)
export const WEI_EQPT_TOTAL = WEI_URL + '/rpc/equipmentController/equipmentTotal'
// 拱墅-门闸记录数据(门闸:2,Mac探针:3,车闸:4)
export const WEI_EQUIPMENT = WEI_URL + '/rpc/equipmentController/searchEquipment'
// 拱墅-布控-新增
export const WEI_DISTRIBUTION_INSERT = WEI_URL + '/rpc/DistributionControlController/insert'
// 拱墅-布控-修改
export const WEI_DISTRIBUTION_UPDATE = WEI_URL + '/rpc/DistributionControlController/update'
// 拱墅-布控-删除
export const WEI_DISTRIBUTION_DELETE = WEI_URL + '/rpc/DistributionControlController/delete'
// 拱墅-布控-列表
export const WEI_DISTRIBUTION_TOTAL = WEI_URL + '/rpc/distributionController/distributionTotal'
// 拱墅-布控数据(门闸:2,Mac探针:3,车闸:4)
export const WEI_DISTRIBUTION_DATA = WEI_URL + '/rpc/distributionController/distributionData'
// 拱墅-布控结果
export const WEI_DISTRIBUTION_RESULT = WEI_URL + '/rpc/distributionController/distributionResult'
// 拱墅-人脸(8张图片)
export const WEI_FACE_PICRTUE = WEI_URL + '/rpc/faceMonitorController/facePicture'
// 拱墅-人脸(8张图片)
export const WEI_FACE_PICRTUESEARCH = WEI_URL + '/rpc/faceMonitorController/facePictureSearch'
// 拱墅-设备搜索(实时监控:1)
export const WEI_EQPT_SERACH = WEI_URL + '/rpc/equipmentController/searchEquipment'
// 拱墅-上传图片至图片服务器
export const WEI_UPLOAD = ALIYUN_ADMIN + '/sys/oss/upload'
// 拱墅-大华-采集人脸数
export const WEI_FACE_QUERYRECORDTOTAL = DAHUA_URL + '/fias/rest/face/queryRecordTotal'
// 拱墅-大华-查询最新一页人脸图片
export const WEI_FACE_QUERY = DAHUA_URL + '/fias/rest/viasFace/query'
// 拱墅-大华-查询最新一页人脸图片
export const WEI_FACEALARM_TOTAL = DAHUA_URL + '/fias/rest/faceAlarm/getTotalAmount'
// 拱墅-实时监控页
export const WEI_MQ = 'http://41.196.1.112:8085/m/q'

// 首页-左侧数据
export const INDEX_LEFT = ALIYUN_URL + '/police/indexController/leftData'
// 首页-今日感知数
export const POLICE_INDEX_PERCEPTION = ALIYUN_URL + '/police/indexController/perceptionData'
// 首页-探针实时数据
export const POLICE_INDEX_REALTIME_MAC = ALIYUN_URL + '/police/indexController/macDataRealTime'
// 首页-人脸实时数据
export const POLICE_INDEX_REALTIME_FACE = ALIYUN_URL + '/police/indexController/faceDataRealTime'
// 首页-门禁实时数据
export const POLICE_INDEX_REALTIME_DOOR = ALIYUN_URL + '/police/indexController/doorDataRealTime'
// 首页-车闸实时数据
export const POLICE_INDEX_REALTIME_CAR = ALIYUN_URL + '/police/indexController/carDataRealTime'
// 首页-地图打点数据
export const MARKER_DATA = ALIYUN_URL + '/police/indexController/pointPositions'
// 级联小区数据
export const POLICE_ZONE_LEVEL = ALIYUN_URL + '/police/indexController/zoneInfo'
// 小区首页-设备类型-右侧数据
export const POLICE_DEV_DATA = ALIYUN_URL + '/police/indexController/devData'
// 小区首页-设备类型点位
export const POLICE_DEV_POINT = ALIYUN_URL + '/police/indexController/devPointpPosition'
// 首页-车闸实时数据
export const DATA_CAR = ALIYUN_URL + '/police/indexController/carDataRealTime'
// 实有房屋-小区房屋数排名
export const DATA_HOUSE = ALIYUN_URL + '/police/housingController/housingTop'
// 实有单位页面-企业数据
export const POLICE_COMPANY_LIST = ALIYUN_URL + '/police/companyController/companyInfo'
// 实有单位页面-企业数据-搜索
export const POLICE_COMPANY_SEARCH = ALIYUN_URL + '/police/companyController/searchCompany'
// 实有单位页面-基础数据
export const POLICE_COMPANY_BASE = ALIYUN_URL + '/police/companyController/basicsInfo'
// 实有设备页面-基础数据
export const POLICE_EQUIPMENT_BASE = ALIYUN_URL + '/police/equipmentController/basicsInfo'
// 实有设备页面-设备数据
export const POLICE_EQUIPMENT_LIST = ALIYUN_URL + '/police/equipmentController/searchInfo'
// 实有设备页面-设备数据(点位，不分页)
export const POLICE_EQUIPMENT_POINT = ALIYUN_URL + '/police/equipmentController/queryAllDevInfo'
// 实有设备页面-点位总数
export const POLICE_EQUIPMENT_TOTAL = ALIYUN_URL + '/police/equipmentController/devTotal'
// 实有房屋-房屋查询
export const HOUSE_SEL = ALIYUN_URL + '/police/housingController/searchHousingData'
// 实有房屋-基础数据
export const POLICE_HOUSE_BASE = ALIYUN_URL + '/police/housingController/basicsInfo'
// 实有房屋-基础数据
export const POLICE_HOUSE_CLASS = ALIYUN_URL + '/police/housingController/classifyInfo'
// 全区-实有人口页面-重点关注信息
export const POLICE_PEOPLE_FOCUS = ALIYUN_URL + '/police/personController/followPersonnel'
// 全区-实有人口页面-基础数据
export const POLICE_PEOPLE_BASE = ALIYUN_URL + '/police/personController/basicsInfoGS'
// 全区-实有人口页面-人口查询
export const REN_SELECT = ALIYUN_URL + '/police/personController/searchPersonData'
//实有人口页面-小区-基础数据
export const POLICE_PEOPLE_BASE_ZONE = ALIYUN_URL+'/police/personController/basicsInfo'
//实有人口页面-小区-流动人口全局分布
export const POLICE_PEOPLE_NATIVE = ALIYUN_URL+'/police/personController/nativePlace'
// 实有力量与装备-基础数据-小区
export const POLICE_FORCES_BASE = ALIYUN_URL + '/police/PoliceForcesController/basicsInfo'
// 实有力量与装备-查询警力
export const POLICE_FORCES_POLICE = ALIYUN_URL + '/police/PoliceForcesController/queryPolice'
// 实有力量与装备-查询警力(不分页)
export const POLICE_FORCES_POLICE_ALL = ALIYUN_URL + '/police/PoliceForcesController/queryAllPolice'
// 实有力量与装备-查询警员单位信息
export const POLICE_FORCES_POLICEUNIT = ALIYUN_URL + '/police/PoliceForcesController/queryPoliceUnit'
// 实有力量与装备-查询轨迹（警员警车）
export const POLICE_FORCES_TRAJECTORY = ALIYUN_URL + '/police/PoliceForcesController/trajectoryPolice'
// 实有力量与装备-查询警员轨迹（天翼）
export const POLICE_FORCES_TRAJECTORY_TIANYI = ALIYUN_URL + '/police/PoliceForcesController/trajectoryZone'
// 实有力量与装备-轨迹总数
export const POLICE_FORCES_TRAJECTORY_TOTAL = ALIYUN_URL + '/police/PoliceForcesController/trajectoryTotal'
// 地图打点数据（天翼）
export const POLICE_FORCES_POINT_TIANYI = ALIYUN_URL + '/police/PoliceForcesController/zoneGPSInfo'

// 查询小区热区点
export const POLICE_BOUNDARIES = ALIYUN_URL + '/police/ZoneRegionController/queryZone'
// 查询小区列表
export const POLICE_XQLIST = ALIYUN_URL + '/police/ZoneRegionController/queryZoneInfo'