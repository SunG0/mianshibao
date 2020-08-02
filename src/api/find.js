import _axios from './request'

// 面试技巧
function technicList (params) {
  return _axios({
    url: '/articles/technic',
    method: 'get',
    needToken: true,
    params
  })
}
// 面试技巧热搜
function technicTopSearch () {
  return _axios({
    url: '/articles/technicTopSearch',
    method: 'get'
  })
}

// 面试技巧详情接口
function technicdtil (params) {
  return _axios({
    url: '/articles/technic/:id',
    method: 'get',
    params
  })
}

// 市场数据
function hotData () {
  return _axios({
    url: '/chart-data/hot',
    method: 'get'
  })
}

// 面经分享
function shareList (params) {
  return _axios({
    url: '/articles/share',
    method: 'get',
    needToken: true,
    params
  })
}

export { technicList, shareList, hotData, technicTopSearch, technicdtil }
