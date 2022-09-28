/*
 * @Description:
 * @Version: 2.0
 * @Autor: 王敏
 * @Date: 2021-07-01 16:56:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-28 15:24:44
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-trailing-spaces': 1,
    // 后面查看的时候eslint报错，先注释掉
    quotes: 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    semi: 0
  }
}
