import Vue from 'vue'
import VueRouter from 'vue-router'
import Company from '@/views/Company'
import Question from '@/views/Question'
import My from '@/views/My'
import Find from '@/views/Find'
import login from '@/views/Login'
import userInfo from '@/views/userInfo'
import fixname from '@/views/fixname'
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
      showTabbar: true
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
  {
    path: '/userInfo',
    component: userInfo
  },
  {
    path: '/fixname',
    component: fixname
  }
]

const router = new VueRouter({
  routes
})

export default router
