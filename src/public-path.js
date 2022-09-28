/* eslint-disable no-undef */
/*
 * @Description:
 * @Autor: 王敏
 * @LastEditTime: 2021-12-13 15:02:47
 */
// 微前端接入
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line camelcase
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ + process.env.VUE_APP_BASE + '/'
}
