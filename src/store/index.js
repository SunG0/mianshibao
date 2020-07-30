import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: '',
    // 定义一个变量来存储页面是否登录，因为userinfo不好判断
    isLogin: false
  },
  mutations: {
    SETUSERINFO (state, newUserInfo) {
      state.userInfo = newUserInfo
    },
    SETNICKNAME (state, newNickName) {
      state.userInfo.nickname = newNickName
    },
    SETISLOGIN (state, newIsLogin) {
      state.isLogin = newIsLogin
    },
    SETUSERSOME (state, { key, value }) {
      state.userInfo[key] = value
    }
  },
  actions: {},
  modules: {},
  getters: {
    SETGENDER (state) {
      const map = { 0: '未知', 1: '男', 2: '女' }
      return map[state.userInfo.gender]
    }
    // userArea (state) {
    //   // 如果用户信息存在
    //   if (state.userInfo) {
    //     // 根据对应关系返回数据
    //     return area.city_list[state.userInfo.area]
    //   }
    //   // 如果不存在，返回空字符串
    //   return ''
    // }
  }
})
