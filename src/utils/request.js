import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

const request = axios.create({
  baseURL: 'https://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000
})

// 创建请求拦截器
request.interceptors.request.use(function (config) {
  config.headers.platform = 'H5'
  // loading提示
  Toast.loading({
    message: '请求中',
    forbidClick: true, // 加载时禁止点击
    loadingType: 'spinner', // 加载图标样式
    durantion: 0// 不自动消失
  })
  // 设置全局默认请求头
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 创建响应拦截器
request.interceptors.response.use(function (response) {
  const res = response.data
  if (res.status !== 200) {
    Toast(res.message)
    return Promise.reject(res.message)
  } else {
    Toast.clear()
  }
  return res
}, function (error) {
  return Promise.reject(error)
})

export default request
