import _axios from './request'

// 获取验证码
function getCode (data) {
  return _axios({
    url: '/au/code',
    method: 'post',
    data
  })
}

// 用户登录
function userLogin (data) {
  return _axios({
    url: '/au/login',
    method: 'post',
    data
  })
}
export { getCode, userLogin }
