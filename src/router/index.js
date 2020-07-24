import Vue from 'vue'
import VueRouter from 'vue-router'
import Company from '@/views/Company'
import Question from '@/views/Question'
import My from '@/views/My'
import Find from '@/views/Find'
Vue.use(VueRouter)

const routes = [
  {
    path: '/Company',
    component: Company
  },
  {
    path: '/Question',
    component: Question
  },
  {
    path: '/My',
    component: My
  },
  {
    path: '/Find',
    component: Find
  }
]

const router = new VueRouter({
  routes
})

export default router
