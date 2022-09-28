/*
 * @Description:
 * @Autor: 王敏
 * @LastEditTime: 2021-12-10 10:53:45
 */
import { myAxios } from '@/utils/axios.js'
/**
 * 获取用户模块路由
 */
export const getMenu = () => {
  return myAxios({
    method: 'get',
    url: '/system/menu/getRouters'
  })
}
// 获取用户信息
export const getUserInfo = () => {
  return myAxios({
    method: 'get',
    url: '/system/user/getInfo'
  })
}
