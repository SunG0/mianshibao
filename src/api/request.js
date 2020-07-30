import axios from 'axios'
import { Toast } from 'vant'
import { getToken } from '@/utils/local.js'
const _axios = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true
})

// 添加请求拦截器
_axios.interceptors.request.use(
  function (config) {
    console.log(config)
    // 判断请求是否需要携带token
    if (config.needToken) {
      // 是  在请求头中添加token
      if (getToken()) {
        // 这个判断为，需要携带token 并且 存在token的情况
        config.headers.authorization = `Bearer ${getToken()}`
      }
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
_axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.data.code === 200) {
      return response.data
    } else {
      // 人为添加弹框，处理出错后的bug,或者可以在请求的后面添加.catch进行处理
      Toast.fail(response.data.message)
      return Promise.reject(new Error(response.data.message))
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default _axios
