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
function technicdetil (params) {
  return _axios({
    url: `/articles/technic/${params}`,
    method: 'get'
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

// 面经分享详情接口
function shareDetail (params) {
  return _axios({
    url: `/articles/share/${params}`,
    method: 'get'
  })
}

// 面经分享热搜
function shareTopSearch () {
  return _axios({
    url: '/articles/shareTopSearch',
    method: 'get'
  })
}
// 面经分享评论接口
function shareComments (params) {
  const { id, limit, start } = params
  return _axios({
    url: `/articles/comments/${id}`,
    method: 'get',
    params: {
      limit,
      start
    }
  })
}

// 发表评论
function sendComment (data) {
  return _axios({
    url: '/articles/comments',
    method: 'post',
    needToken: true,
    data
  })
}

// 点赞文章
function nicePaper (data) {
  return _axios({
    url: '/articles/star',
    method: 'post',
    needToken: true,
    data
  })
}

export {
  technicList,
  shareList,
  hotData,
  technicTopSearch,
  technicdetil,
  shareTopSearch,
  shareDetail,
  shareComments,
  sendComment,
  nicePaper
}
