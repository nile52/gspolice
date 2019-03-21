import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
});

// axios.interceptors.request.use(function(config) {
//     // if(!config.url.match(/updSessionId/ig)) {
//     //     Toast.loading('加载中', 0)
//     // }
//     // debugger
    
//     return config
// })

// axios.interceptors.response.use(function(config) {
//     return config
// })