import Vue from 'vue'
import VueRouter from 'vue-router'
import Company from '@/views/Company'
import Question from '@/views/Question'
import My from '@/views/My'
import Find from '@/views/Find'
import login from '@/views/Login'
import userInfo from '@/views/userInfo'
import technic from '@/views/technic'
import technicSearch from '@/views/technicSearch'
import share from '@/views/share'
import shareSearch from '@/views/shareSearch'
import edit from '@/views/edit'
import store from '@/store'
import { Toast } from 'vant'
import { getToken, removeToken } from '@/utils/local.js'
import { getUserInfo } from '@/api/user.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/Company',
    component: Company,
    meta: {
      showTabbar: true
    }
  },
  {
    path: '/Question',
    component: Question,
    meta: {
      showTabbar: true
    }
  },
  {
    path: '/My',
    component: My,
    meta: {
      // 标记是否显示导航栏
      showTabbar: true,
      // 标记是否需要登录
      needLogin: true
    }
  },
  {
    path: '/Find',
    component: Find,
    meta: {
      showTabbar: true
    }
  },
  {
    path: '/login',
    component: login
  },
  // 用户信息
  {
    path: '/userInfo',
    component: userInfo,
    meta: {
      needLogin: true
    }
  },
  // 用户信息编辑
  {
    path: '/edit',
    component: edit
  },
  // 面试技巧
  {
    path: '/technic',
    component: technic
  },
  // 面试技巧搜索
  {
    path: '/technicSearch',
    component: technicSearch
  },
  // 面经分享
  {
    path: '/share',
    component: share
  },
  // 面经分享搜索
  {
    path: '/shareSearch',
    component: shareSearch
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 判断是否需要登录
  if (to.meta.needLogin) {
    // 判断 vuex中得登录状态
    if (store.state.isLogin) {
      // 为true  继续
      next()
    } else {
      // 没登陆  但是可能有token
      if (getToken()) {
        // token 存在，但是没有信息 再调用接口获取一次
        getUserInfo()
          .then(res => {
            // 进到这里，则说明获取成功，token为正确的
            // 将获取的信息保存到仓库中
            res.data.avatar = process.env.VUE_APP_URL + res.data.avatar
            store.commit('SETUSERINFO', res.data)
            // 修改仓库中的登录状态
            store.commit('SETISLOGIN', true)
            // 放走
            next()
          })
          .catch(() => {
            // 进到这里说明 token是错的
            // 移除token
            removeToken()
            // 提示 跳转到登录页
            Toast.fail('请登录')
            // 由于有多个需要登录才能访问的页面，故登录完成后要回到之前访问的页面，将信息添加到url中
            next(`/login?redirect=${to.fullPath}`)
            // next('/login')
          })
      } else {
        // 没有token
        Toast.fail('请先登录')
        next(`/login?redirect=${to.fullPath}`)
        // next('/login')
      }
    }
  } else {
    // 不需要登录
    next()
  }
})

export default router
