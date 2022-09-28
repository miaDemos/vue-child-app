/*
 * @Description:
 * @Version: 2.0
 * @Autor: 王敏
 * @Date: 2021-07-05 15:35:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-17 11:25:05
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Routes = [
  {
    path: '*',
    redirect: () => window.__POWERED_BY_QIANKUN__ ? '/home' : '/login'
  },
  {
    path: '/home', // 这里配个id传参，渲染指定模块
    redirect: '/home/a',
    component: () => import('@/Layouts'),
    children: [
      {
        name: 'a页面',
        path: 'a',
        component: () => import('@/pages/A')
      }
    ]
  }
]
if (!window.__POWERED_BY_QIANKUN__) {
  Routes.push({
    path: '/login',
    name: '登录页面',
    component: () => import('@/pages/Login')
  })
}

export default Routes
