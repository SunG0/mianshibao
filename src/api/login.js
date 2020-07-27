import _axios from './request'

function getCode (data) {
  return _axios({
    url: '/au/code',
    method: 'post',
    data
  })
}

export { getCode }
