
const utils = {}

utils.compare = (property, word) => {
    return function(a, b){
        var value1 = Number(a[property].split(word)[1]);
        var value2 = Number(b[property].split(word)[1]);
        return value2 - value1;
    }
}

utils.isNumber = (val) => {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)){
        return true;
    }else{
        return false;
    }

}

// 判断系统
utils.isIOS = function() {
    var isIphone = navigator.userAgent.includes('iPhone')
    var isIpad = navigator.userAgent.includes('iPad');
    return isIphone || isIpad;
};

utils.queryString = () => {
    let _queryString = {};
    const _query = window.location.search.substr(1);
    const _vars = _query.split('&');
    _vars.forEach((v, i) => {
        const _pair = v.split('=');
        if (!_queryString.hasOwnProperty(_pair[0])) {
            _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
        } else if (typeof _queryString[_pair[0]] === 'string') {
            const _arr = [ _queryString[_pair[0]], decodeURIComponent(_pair[1])];
            _queryString[_pair[0]] = _arr;
        } else {
            _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
        }
    });
    return _queryString;
};

// 跳转登录页
utils.toLoginUrl = function(loginUrl) {
    window.location.href = loginUrl
}

// 生成新的导航栏
utils.createMenu = function(firstAuth, listAuth) {
    let itemMenu = {}
    itemMenu.key = firstAuth.value
    itemMenu.title = firstAuth.name
    itemMenu.sub = listAuth.map(function(item) {
        return { key: item.value, title: item.name, icon: '', }
    })
    return itemMenu
}

// 身份证号校验
utils.isShenFenZheng = (id) => {
    var format = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
    //号码规则校验
    if(!format.test(id)){
        return {'status':0,'msg':'身份证号码不合规'};
    }
    return {'status':1,'msg':'校验通过'}
}

// 车牌号校验
utils.isCarNumber = (vehicleNumber) => {
    var xreg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    var creg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if(vehicleNumber.length == 7){
        return creg.test(vehicleNumber);
    } else if(vehicleNumber.length == 8){
        return xreg.test(vehicleNumber);
    } else{
        return false;
    }
}

utils.howOld = (birthDate) => {
    let now = new Date().getFullYear();
    let birthDateYear = birthDate.split('-')[0]
    let old = now - birthDateYear
    return old
    // let now = new Date().getTime();
    // let hours = (now - birthDate)/1000/60/60;
    // let year = Math.floor(hours / (24 * 30 * 12));
    // hours = hours % (24 * 30 * 12);
    // let months = Math.floor(hours / (24 * 30 ));
    // hours = hours % (24 * 30 );
    // let days = Math.floor(hours / (24));
    // return {
    //     years: year,
    //     months: months,
    //     days: days
    // }
}

utils.dealPlainTime= (time) => {
    let year = time.slice(0,2)
    let month = time.slice(2,4)
    let day = time.slice(4,6)
    let hour = time.slice(6,8)
    let minute = time.slice(8,10)
    let second = time.slice(10,12)
    return '20' + year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

utils.timeToMD= (time) => {
    let date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let year = date.getFullYear();
    let month = date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth() + 1;
    let day = date.getDate()< 10 ? '0' + date.getDate() : date.getDate();
    let hour = date.getHours()< 10 ? '0' + date.getHours() : date.getHours();
    let minute = date.getMinutes()< 10 ? '0' + date.getMinutes() : date.getMinutes();
    let second = date.getSeconds()< 10 ? '0' + date.getSeconds() : date.getSeconds();
    return month + '月' + day + '日'
}


utils.timeToDate = (time) => {
    let date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let year = date.getFullYear()
    let month = date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth() + 1;
    let day = date.getDate()
    return year + '-' + month + '-' + day;
}

utils.timeToHMS= (time) => {
    let date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let year = date.getFullYear();
    let month = date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth() + 1;
    let day = date.getDate()< 10 ? '0' + date.getDate() : date.getDate();
    let hour = date.getHours()< 10 ? '0' + date.getHours() : date.getHours();
    let minute = date.getMinutes()< 10 ? '0' + date.getMinutes() : date.getMinutes();
    let second = date.getSeconds()< 10 ? '0' + date.getSeconds() : date.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

utils.timeToHMSt= (time) => {
    let date = new Date(parseInt(time));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let year = date.getFullYear();
    let month = date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth() + 1;
    let day = date.getDate()< 10 ? '0' + date.getDate() : date.getDate();
    let hour = date.getHours()< 10 ? '0' + date.getHours() : date.getHours();
    let minute = date.getMinutes()< 10 ? '0' + date.getMinutes() : date.getMinutes();
    let second = date.getSeconds()< 10 ? '0' + date.getSeconds() : date.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

utils.timeToMDHI= (time) => {
    let date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let year = date.getFullYear();
    let month = date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth() + 1;
    let day = date.getDate()< 10 ? '0' + date.getDate() : date.getDate();
    let hour = date.getHours()< 10 ? '0' + date.getHours() : date.getHours();
    let minute = date.getMinutes()< 10 ? '0' + date.getMinutes() : date.getMinutes();
    let second = date.getSeconds()< 10 ? '0' + date.getSeconds() : date.getSeconds();
    return month + '-' + day + ' ' + hour + ':' + minute;
}

// 居民房屋信息关联-本地数据转成服务端要求的格式
utils.houseLocalToServer = (houstList, type, addType) => {

    console.log(addType);
    
    const relationHouseJson = {0:'本人', 6:'租客', 2:'配偶', 3:'子女', 4:'孙子女', 5:'祖父母', 7:'其他亲属', 8:'朋友', 9:'其他', 10:'二房东', 11:'退租', 1000:'网约房租客'}
    if(houstList.length > 0) {
        if(type == 'edit') {
            if (addType == 'net') {
                return houstList.map((item, index) => {
                    if(!(item.isAdd && item.delete)) {
                        return {
                            "housingId": item.housingId,
                            "consistent": item.consistent == '1' ? true : false,
                            "dwell": item.dwell == '1' ? true : false,
                            "id": item.id,
                            "userId": item.userId,
                            "delete": item.delete?true:false,
                            "relation": relationHouseJson[item.relation],
                            "liveStart": item.liveStart,
                            "liveEnd": item.liveEnd
                        }
                    }
                    
                })                      
            } else {
                return houstList.map((item, index) => {
                    if(!(item.isAdd && item.delete)) {
                        return {
                            "housingId": item.housingId,
                            "consistent": item.consistent == '1' ? true : false,
                            "dwell": item.dwell == '1' ? true : false,
                            "id": item.id,
                            "userId": item.userId,
                            "delete": item.delete?true:false,
                            "relation": relationHouseJson[item.relation]
                        }
                    }
                })
            }


        } else if (type == 'add') {
            if (addType == 'net') {
                return houstList.map((item, index) => {
                    if(item.isAdd && !item.id) {
                        return {
                            "housingId": item.housingId,
                            "consistent": item.consistent == '1' ? true : false,
                            "dwell": item.dwell == '1' ? true : false,
                            "delete": item.delete?true:false,
                            "relation": relationHouseJson[item.relation],
                            "liveStart": item.liveStart,
                            "liveEnd": item.liveEnd
                        }
                    }
                })                         
            } else {
                return houstList.map((item, index) => {
                    if(item.isAdd && !item.id) {
                        return {
                            "housingId": item.housingId,
                            "consistent": item.consistent == '1' ? true : false,
                            "dwell": item.dwell == '1' ? true : false,
                            "delete": item.delete?true:false,
                            "relation": relationHouseJson[item.relation]
                        }
                    }
                })                
            }

        }
    } else {
        return []
    }
    
    
}

// 居民车位信息关联-本地数据转成服务端要求的格式
utils.parkLocalToServer = (parkList, type) => {
    console.log(parkList);
    
    const positionTypeJson = {'0': '公有', '1': '专属', '2': '自有', '3': '私有', '4': '其他'}
    if (type == 'edit') {
        //{"positionType":"自有","id":55,"userId":0}
        return parkList.map((item, index) => {
            return {
                "id": item.id,
                "userId": item.userId,
                "positionType": positionTypeJson[item.positionType],
                "parkingLotId": item.parkingLotId,
                "parkingSpaceCoding": item.parkingSpaceCoding,
                "expireDate": item.expireDate,
            }
        })
    } else if (type == 'add') {
        return parkList.map((item, index) => {
            return {
                "positionType": positionTypeJson[item.positionType],
                "parkingLotId": item.parkingLotId,
                "parkingSpaceCoding": item.parkingSpaceCoding,
                "expireDate": item.expireDate,
            }
        })
    }  
}

// 转化房屋状态
utils.getHouseUsage = (usage) => {
    const positionTypeJson = {
        'rentOut': '出租', 
        'personalUse': '自住', 
        'other': '其他', 
        'groupLive': '群租', 
        'idle': '闲置', 
        'closeDown': '查封', 
        'Internet': '网约'
    }
    return positionTypeJson[usage]
}

utils.getCompanyType = (usage) => {
    const typeJson = {
        '0': '有限责任公司', 
        '1': '个体工商户', 
        '2': '个体独资企业', 
        '3': '一人有限公司', 
        '4': '机关单位', 
        '5': '事业单位', 
        '6': '社会群体单位',
        '7': '法人',
        '8': '其他',
    }
    return typeJson[usage]
}

utils.getEquipmentType = (usage) => {
    const typeJson = {
        'gate_barrier': '道闸设备',
        'gate_lot': '车闸设备',
        'mac': 'mac设备',
        'monitor': '监控设备',
        'witness': '人证设备',
        'guest': '访客机设备',
        'video_intercom': '可视对讲设备',
        'etc_guard': '人脸闸机设备',
        'face_camera': '人脸摄像机',        
    }
    return typeJson[usage]
}

// status 设备状态 0:失效 1:有效 2:在建
utils.getEquipmentStatus = (usage) => {
    const typeJson = {
        '0': '失效', 
        '1': '有效', 
        '2': '在建', 
    }
    return typeJson[usage]
}

// 身份证、手机号加*
utils.plusXing = (str, frontLen, endLen) => {
    var len = str.length - frontLen - endLen
    var xing = ''
    for(let i = 0; i < len; i++) {
        xing += "*"
    }
    return str.substr(0, frontLen) + xing + str.substr(str.length - endLen)
}

// 手机号砍+86，加星
utils.plusXingDe86 = (str, frontLen, endLen, saveLen) => {
    var len = str.length - frontLen - endLen
    var xing = ''
    for(let i = 0; i < len; i++) {
        xing += "*"
    }
    var xingStr = str.substr(0, frontLen) + xing + str.substr(str.length - endLen)
    return xingStr.slice(saveLen); 
}

utils.IdCardBGY = (UUserCard,num) => {
    if(num==1){
        //获取出生日期
        var birth=UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
        return birth;
    }
    if(num==2){
        //获取性别
        if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
            //男
            return "男";
        } else {
            //女
            return "女";
        }
    }
    if(num==3){
        //获取年龄
        var myDate = new Date();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
        if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
            age++;
        }
        return age;
    }
    if(num==4) {
        var area = { 11: "北京市", 12: "天津市", 13: "河北省", 14: "山西省", 15: "内蒙古自治区",
            21: "辽宁省", 22: "吉林省", 23: "黑龙江省", 31: "上海市", 32: "江苏省",
            33: "浙江省", 34: "安徽省", 35: "福建省", 36: "江西省", 37: "山东省", 41: "河南省", 42: "湖北省",
            43: "湖南省", 44: "广东省", 45: "广西壮族自治区",
            46: "海南省", 50: "重庆市", 51: "四川省", 52: "贵州省", 53: "云南省", 54: "西藏自治区", 61: "陕西省",
            62: "甘肃省", 63: "青海省", 64: "宁夏回族自治区",
            65: "新疆维吾尔自治区", 71: "台湾省", 81: "香港特别行政区", 82: "澳门特别行政区", 91: "国外"
        }
        var provinceName = "";
        var provinceNo = UUserCard.substr(0, 2);
        if (area[parseInt(provinceNo)] != null) {
            provinceName = area[parseInt(provinceNo)];
        }
        return provinceName;
    }
}

utils.getStyle = (el, name) => {　　
    if (window.getComputedStyle) {　　　
      return window.getComputedStyle(el, null);　　
    } else {　　　
      return el.currentStyle;　　
    }　
}

// JS获取url参数
utils.getQueryVariable = (variable) => {
    var query = window.location.pathname;
    var vars = query.split(variable+"/");
    if (vars && vars[1]) {
        var pair = vars[1].split("/");
        return pair[0];        
    } else {
        return (false);   
    }
}

// 小区名称
utils.getZoneName = (variable) => {
    let name = ''
    switch (variable) {
        case 3: 
            name = '蔡马人家'
            break;
        case 21: 
            name = '中铁建'
            break;
        case 22: 
            name = '中天西城纪'
            break;   
        default:
            break;
    }
    return name
}

// 楼幢名称简化(单个)
utils.getStoriedBuildingName = (ever) => {  
    let newEver = ''
    let newEverArr = ever.split('-')
    let newEverArrLength = newEverArr.length
    if( newEverArrLength > 1) {
      newEver = newEverArr[newEverArrLength -1]
    } else {
      newEver = ever
    }
    return newEver;  
} 

export default utils