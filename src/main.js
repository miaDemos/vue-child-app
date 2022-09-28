/*
 * @Description:
 * @Autor: 王敏
 * @LastEditTime: 2022-09-28 15:35:53
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import './css/init.less'
import Antd, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// 微前端接入
import './public-path'

Vue.use(Antd)

Vue.config.productionTip = false
Vue.prototype.$message = message

// 微前端接入
let router = null
let instance = null
function render(props = {}) {
  const { container, routerBase, globalFun, globalState } = props
  // 乾坤环境(注意：这里注入一些全局变量、方法)
  if (window.__POWERED_BY_QIANKUN__) {
    Vue.prototype.$env = 'qiankun'
    Vue.prototype.$microAppFun = globalFun
    Vue.prototype.$globalState = globalState
    localStorage.setItem('token', globalState('token'))
  }
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.VUE_APP_BASE,
    mode: 'history',
    routes
  })
  instance = new Vue({
    router,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  Vue.prototype.$env = 'vue'
  render()
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}
export async function mount(props) {
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}
