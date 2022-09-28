/*
 * @Description:
 * @Autor: 王敏
 * @LastEditTime: 2021-12-10 14:19:59
 */

/* eslint-disable eqeqeq */
import axios from 'axios'
import { message } from 'ant-design-vue'
import qs from 'qs'
import router from '@/router'

const BASEURL = process.env.VUE_APP_BASEURL
const BASEURL2 = ''
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  error => {
    return Promise.reject(error)
  })

/**
 * @description:
 * @param 必传：url(接口地址)、method(方法)
 * @param 非必传： data(请求参数)、useFormData(是否是formdata传参)、checkCode(是否需要校验回执参数是否为200)、type(2是访问纪委的服务器)
 * 参考：@/pages/modules/components/echartsMap.vue getMap().then
 *      @/pages/modules/components/js/req.js
 * 接口前缀：@/assets/js/config.js 里的BASEURL
 * @author: 王敏
 */
export const myAxios = (options = {}) => {
  const { url, method, data = {}, type = 1, useFormData = false, checkCode = true } = options

  if (!url) return Promise.reject(new Error('url is required'))
  const base = {
    1: BASEURL,
    2: BASEURL2
  }
  let request = {
    method: method,
    url: base[type] + url,
    [method === 'get' ? 'params' : 'data']: data
  }

  if (useFormData) {
    request = {
      ...request,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(request.data)
    }
  }
  return axios(request)
    .then(function (response) {
      if (!checkCode) response.data = { code: 200, ...response.data }
      if (response.data.code === 200) {
        return response.data
      } else if (response.data.code === 401) {
        message.error(response.data.msg)
        localStorage.clear()
        router.push('/login')
      } else {
        const { msg, message } = response.data
        const error = new Error(msg || message)
        error.isApiCodeError = true
        throw error
      }
    })
    .catch(function (err) {
      message.error(err.isApiCodeError ? String(err) : '获取信息失败')
      return Promise.reject(err)
    })
}
