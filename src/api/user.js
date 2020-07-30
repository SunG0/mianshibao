import _axios from './request'

function getUserInfo () {
  return _axios({
    url: '/au/info',
    method: 'get',
    // 需要携带token
    needToken: true
  })
}

export { getUserInfo }
