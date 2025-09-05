import axios from 'axios'
import store from '@/store'

const myAxios = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api'
})

// 请求拦截器
myAxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
myAxios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default myAxios
