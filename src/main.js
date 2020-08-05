import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入vant组件库
import Vant from 'vant'
// 导入vant的css样式
import 'vant/lib/index.css'
import 'normalize.css'
// 导入字体图标
import './style/iconfont.css'
// 导入基础样式
import './style/base.less'
// 导入组件库
import myPlugin from '@/components'
// 时间插件
import moment from 'moment'
// 时间转中文
import 'moment/locale/zh-cn'
// 导入自定义插件
import plugin from '@/plugin'

// 导入flexible
import 'amfe-flexible'
Vue.use(Vant)
// 注册组件库
Vue.use(myPlugin)
// 注册自定义插件
Vue.use(plugin)

// 注册全局过滤器
Vue.filter('formatTime', value => {
  // return moment(value, 'YYYYMMDD').fromNow()
  // value = value.slice(0, value.length - 1)
  // 计算时间差
  const delayTime = moment().diff(moment(value), 'days')
  if (delayTime > 1) {
    return moment(value).format('YYYY-MM-DD')
  } else {
    return moment(value).fromNow()
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
