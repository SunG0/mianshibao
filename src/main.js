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
// 导入 导航栏组件
import navbar from './components/navbar.vue'
import mycell from './components/mycell.vue'
import technicItem from './components/technicItem.vue'
// 时间插件
import moment from 'moment'
// 转中文
import 'moment/locale/zh-cn'

// 导入flexible
import 'amfe-flexible'
Vue.use(Vant)
// 全局注册组件
Vue.component(navbar.name, navbar)
Vue.component(mycell.name, mycell)
Vue.component(technicItem.name, technicItem)

// 注册全局过滤器
Vue.filter('formatTime', function (value) {
  return moment(value, 'YYYYMMDD').fromNow()
})
// var myFilter = Vue.filter('my-filter')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
