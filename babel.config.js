/*
 * @Description:
 * @Version: 2.0
 * @Autor: 王敏
 * @Date: 2021-07-06 13:48:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-02 20:15:45
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  env: {
    development: {
      plugins: ['dynamic-import-node']
    }
    // production: {
    //   plugins: ['transform-remove-console']
    // }
  }
}
