## 智慧小区
### 启动(端口8000)
```
npm install
npm start
npm run build
serve -s build
```
主题修改theme/index.json
```
"@primary-color": "#001529",
```
公安内网注意点

1. 内网地图层级最大18级，centerAndZoom

2. 修改入口文件资源引用（public/index.html）

3. 地图api文件地图瓦片图片域名地址
- return "http://41.196.1.111/map/" + d + "/" + e + "/" + k + ".png"
- return "https://map.zjqrkj.cn/" + d + "/" + e + "/" + k + ".png"
- return "http://192.168.0.26:81/" + d + "/" + e + "/" + k + ".png"

4. 配置域名地址（fetch/apis.js）

- http://47.100.230.100       // 阿里云IP
- http://consume.zjqrkj.cn    // 阿里云域名
- http://41.198.198.31:8082/  // 公安内网
- http://192.168.0.25:8084    // 公司测试for线上版本
- http://192.168.0.26:8082    // 公司测试for公安内网

5. delete login.html