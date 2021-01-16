import axios from 'axios'
import qs from 'qs'
import config from '../config'
import router from '@/router'

const { api_base_url } = config

let instance = axios.create({  // 创建axios 实例
  time: 1000 * 60,
  baseURL: api_base_url
})

instance.defaults.responseType = 'json'    // `responseType` 表示服务器响应的数据类型
instance.defaults.withCredentials = true   // `withCredentials` 表示跨域请求时是否需要使用凭证
instance.defaults.transformRequest = [     // `transformRequest` 允许在向服务器发送前，修改请求数据
  data => {
    return qs.stringify(data)
  }
]

// 定义可获得的http响应状态码
// return true、设置为null或者undefined，promise将resolved,否则将rejected
instance.defaults.validateStatus = function () {
  return true
}

// 请求拦截器
instance.interceptors.response.use(response => {
  let data = response.data
  let status = response.status

  if (status === 200) {
    return Promise.resolve(data)
  } else if (status === 301) {
    console.log('未登录')
    router.replace({
      name: 'login'
    })
  } else {
    return Promise.reject(response)
  }
}, error => {
  console.log(error);
})



// 下面代码的作用是 将instance 换个名字调用 换成api
let ajaxMethod = ['get', 'post'];
let api = {}
ajaxMethod.forEach(method => {
  api[method] = function (url, data, config) {
    return new Promise(function (resolve, reject) {
      // 调用axios 实例发送网络请求
      instance[method](url, data, config)
        .then(response => {
          if (response.code === 200) {
            resolve(response)
          } else {
            reject(response)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }
})

export default api