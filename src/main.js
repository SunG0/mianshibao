import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入vant组件库
import Vant from 'vant'

// 导入vant的css样式
import 'vant/lib/index.css'
import 'normalize.css'
import './style/iconfont.css'
import './style/base.less'

// 导入flexible
import 'amfe-flexible'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
