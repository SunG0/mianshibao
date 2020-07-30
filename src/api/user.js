import _axios from './request'

function getUserInfo () {
  return _axios({
    url: '/au/info',
    method: 'get',
    // 需要携带token
    needToken: true
  })
}

function userEdit (data) {
  return _axios({
    url: '/au/edit',
    method: 'post',
    data,
    // 需要携带token
    needToken: true
  })
}

function userUpload (data) {
  return _axios({
    url: '/upload',
    method: 'post',
    data,
    // 需要携带token
    needToken: true
  })
}

export { getUserInfo, userEdit, userUpload }
