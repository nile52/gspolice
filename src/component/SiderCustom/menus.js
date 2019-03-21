export const menus = [
  {
      key: '/app/baseinfo', title: '基本信息管理', icon: 'switcher',
      sub: [
          { key: '/app/baseinfo/buildingarea', title: '楼栋/单元/区域管理', icon: '', },
          { key: '/app/baseinfo/housesmanage', title: '房屋信息管理', icon: '', },
          { key: '/app/baseinfo/servicesmanagesearch', title: '设备信息管理-查询', icon: '', },
          { key: '/app/baseinfo/servicesmanage', title: '设备信息管理', icon: '', },
          { key: '/app/baseinfo/resident', title: '居民信息管理', icon: '', },
          { key: '/app/baseinfo/carsmanage', title: '车辆信息管理', icon: '', },
          { key: '/app/baseinfo/parkingmanage', title: '停车场（位）管理', icon: '', },
          { key: '/app/baseinfo/cardmanage', title: '卡信息管理', icon: '', },
          { key: '/app/baseinfo/historycasemanage', title: '本月发案管理', icon: '', },
          { key: '/app/baseinfo/companymanage', title: '在地单位管理', icon: '', },
      ],
  },
  
  {
      key: '/app/communityinfo', title: '社区工作管理', icon: 'rocket',
      sub: [
          { key: '/developing', title: '社工信息管理', icon: '', },
          { key: '/developing', title: '社工工作', icon: '', },
          { key: '/developings', title: '抽查回访', icon: '', },
          { key: '/developings', title: '统计报表', icon: '', },
          { key: '/developing', title: '工作考核', icon: '', },
          { key: '/developing', title: '基础配置', icon: '', },
      ],
  },
  {
      key: '/app/commercialservice', title: '物业服务管理', icon: 'copy',
      sub: [
          { key: '/developing', title: '物业保修', icon: '', },
          { key: '/developing', title: '物业缴费', icon: '', },
          { key: '/developing', title: '快递代收', icon: '', },
          { key: '/developing', title: '小区公告', icon: '', },
      ],
  },
  {
      key: '/app/visitorsmanage', title: '小区访客管理', icon: 'edit',
      sub: [
          { key: '/app/visitorsmanage/visitormanage', title: '访客信息管理', icon: '', },
          { key: '/apdeveloping', title: '常往来人员管理', icon: '', },
      ],
  },
  {
      key: '/app/systemmanage', title: '系统管理', icon: 'safety',
      sub: [
        //   { key: '/app/systemmanage/basicAnimations', title: '组织管理', icon: '', },
          { key: '/app/systemmanage/logquerylist', title: '日志查询管理', icon: '', },
        //   { key: '/app/systemmanage/basicAnimations', title: '用户管理', icon: '', },
        //   { key: '/app/systemmanage/exampleAnimations', title: '授权管理', icon: '', },
        //   { key: '/app/systemmanage/basicAnimations', title: '菜单管理', icon: '', },
        //   { key: '/app/systemmanage/exampleAnimations', title: '系统日志', icon: '', },
          { key: '/app/systemmanage/basicAnimations', title: '系统备份', icon: '', },
          { key: '/app/systemmanage/accountManage', title: '账号管理', icon: '', },
          { key: '/app/systemmanage/roleManage', title: '角色管理', icon: '', },
          { key: '/app/systemmanage/authManage', title: '权限管理', icon: '', },
      ],
  }
];