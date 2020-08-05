// 在实例对象中添加一个自定义方法 使用的时候就不需要导入了
// 导入仓库
import store from '@/store'
import { Toast } from 'vant'
import { getToken, removeToken } from '@/utils/local.js'
import { getUserInfo } from '@/api/user.js'
import router from '@/router'
export default function (Vue) {
  // 为Vue原型添加方法
  Vue.prototype.$checkLogin = function () {
    // 首先判断仓库中的islogin状态
    return new Promise((resolve, reject) => {
      if (store.state.isLogin) {
        // 已经登录
        resolve()
      } else {
        // 没有登录
        if (getToken()) {
          // 有token 调用接口
          getUserInfo()
            .then(res => {
              // 成功// 仓库保存数据// 处理用户头像
              res.data.avatar = process.env.VUE_APP_URL + res.data.avatar
              // vuex中保存用户信息
              store.commit('SETUSERINFO', res.data)
              // vuex中保存登录状态
              store.commit('SETISLOGIN', true)
              // 触发外部的.then
              resolve()
            })
            .catch(() => {
              removeToken()
              Toast.fail('请登录')
              router.push(`/login?redirect=${this.$route.fullPath}`)
              reject(new Error('请先登录'))
            })
        } else {
          // 没有token
          Toast.fail('请登录')
          router.push(`/login?redirect=${this.$route.fullPath}`)
          reject(new Error('请先登录'))
        }
      }
      // resolve 对应到外部的.then
      // reject 对应到外部的.catch
    })
  }
}
