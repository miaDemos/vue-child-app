/*
 * @Description:
 * @Version: 2.0
 * @Autor: 王敏
 * @Date: 2021-07-06 11:55:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-15 16:46:51
 */
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const { name } = require('./package')
const name2 = '民宗主应用' // 标题
module.exports = {
  publicPath: process.env.VUE_APP_BASE + '/',
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件
    extract: process.env.NODE_ENV === 'production',
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false
  },
  devServer: {
    port: 7100, // 端口号
    https: false, // https:{type:Boolean}
    hot: true, // 配置热更新
    open: true, // 配置自动启动浏览器
    headers: { // 微前端接入
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '^/api': {
        target: 'http://101.132.194.174:7830/national', // 测试
        changeOrigin: true,
        // ws: true,//是否启用websocket
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 微前端接入
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`
    },
    name: name2,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@img': resolve('src/img'),
        '@css': resolve('src/css'),
        '@utils': resolve('src/utils'),
        '@api': resolve('src/api')
      }
    }
  }
}
