// 导入 导航栏组件
import navbar from '@/components/navbar.vue'
import mycell from '@/components/mycell.vue'
import technicItem from '@/components/technicItem.vue'
import shareItem from '@/components/shareItem.vue'

// 全局注册组件

const myPlugin = {
  install (Vue) {
    Vue.component(navbar.name, navbar)
    Vue.component(mycell.name, mycell)
    Vue.component(technicItem.name, technicItem)
    Vue.component(shareItem.name, shareItem)
  }
}

export default myPlugin
