/*
 * @Description:
 * @Autor: 王敏
 * @LastEditTime: 2021-12-10 10:53:49
 */
import { myAxios } from '@/utils/axios.js'

/**
 * 登录
 */
export const login = (data) => {
  return myAxios({
    method: 'post',
    url: '/auth/login',
    data
  })
}
/**
 * 退出登录
 */
export const logout = () => {
  console.log('wojinlaile')
  return myAxios({
    method: 'delete',
    url: '/auth/logout'
  })
}
