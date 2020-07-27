import axios from 'axios'

const _axios = axios.create({
  baseURL: 'http://localhost:1337',
  withCredentials: true
})

// 添加请求拦截器
_axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    console.log(config)
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
      return Promise.reject(new Error('error'))
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default _axios
