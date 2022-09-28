# 微前端应用接入指南

## 背景

**使用背景：**由于项目规划为：该系统可能有上百个模块，开发周期一年以上，可能涉及**多团队开发**，故选用了**微前端**进行这个项目开发。之前做的是react接入微前端主子应用，考虑到其他团队都以`vue`为技术栈，故重构为`vue`接入微前端主应用基座，子应用可用`react`、`vue`。

**选用微前端原因：**

- 技术栈无关 主框架不限制接入应用的技术栈，子应用具备完全自主权

- 独立开发、独立部署 子应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新

- 独立运行时 每个子应用之间状态隔离，运行时状态不共享

## 参考链接

- **选用微前端框架**：

  [qiankun](https://qiankun.umijs.org/zh)

- **仓库地址：**

  [主应用demo(vue为基座)](https://github.com/miaDemos/platform-vue.git)

  [子应用demo(vue子应用)](https://github.com/miaDemos/vue-child-app.git)

  [子应用demo(react子应用基于umi)](https://github.com/miaDemos/umi-child-app.git)

- **其他语言`qiankun`接入文档：**

  [qiankun接入](https://qiankun.umijs.org/zh/guide/tutorial)

  [umi主子应用接入文档](https://umijs.org/zh-CN/plugins/plugin-qiankun)

- **页面效果查看**(后期可能地址迁移)

  [主应用](http://124.222.39.213:7100/mainApp)

  [vue子应用](http://101.132.194.174:7830/subvue)

  [react子应用](http://124.222.39.213:7100/subReact)

- **更多知识可参考:**

  [微前端解决方案](https://segmentfault.com/a/1190000040275586)

<span style="color:red">注：以下示例是以我公司以前一个项目（民宗）为产品原型做的一些定制化配置以及封装，其他业务需求可参考此配置展开</span>

## 实现功能

**主应用：**以`vue`作为主应用基座，可实现主应用登录、退登、角色权限下模块信息获取，有登录、主页面2个页面。其中登录获取的`token`传给子应用，主应用可根据登录角色获取该角色权限可展示模块，点击模块可根据模块名跳转相应的子应用，并把该模块路由数据传给子应用自行处理。

**子应用：**可获取主应用传递过来的`token`、`subMenu`（该模块的路由信息）这些静态参数，以及`backMain`（返回主应用）、`logout`（退登）这些方法，有登录、`demo`2个页面。子应用写了`vue`、`react`（基于`umi`开发）的`demo`，子应用搭建其他语言也可以，可参考`qiankun`文档做相应配置。

## 选用`qiankun`原因

- 📦 **基于 [single-spa](https://github.com/CanopyTax/single-spa)** 封装，提供了更加开箱即用的 `API`。
- 📱 **技术栈无关**，任意技术栈的应用均可 使用/接入，不论是 `React/Vue/Angular/JQuery `还是其他等框架。
- 💪 **HTML Entry 接入方式**，让你接入微应用像使用 `iframe `一样简单。
- 🛡 **样式隔离**，确保微应用之间样式互相不干扰。
- 🧳 **JS 沙箱**，确保微应用之间 全局变量/事件 不冲突。
- ⚡️ **资源预加载**，在浏览器空闲时间预加载未打开的微应用资源，加速微应用打开速度。
- 🔌 **umi 插件**，提供了 [@umijs/plugin-qiankun](https://github.com/umijs/plugins/tree/master/packages/plugin-qiankun) 供 `umi `应用一键切换成微前端架构系统。

## 主应用（`vue`作为基座）

> [参考文档](https://qiankun.umijs.org/zh/guide/tutorial#%E4%B8%BB%E5%BA%94%E7%94%A8)

### 1. 安装 `qiankun`

```
$ yarn add qiankun # 或者 npm i qiankun -S
```

### 2.配置环境变量和发包地址

> 注：主要是`VUE_APP_BASE`这个环境变量影响**发包地址**和**router的base**

- 在根目录新建`.env.development`文件

```bash
# 开发环境配置
ENV = development

#接口
# VUE_APP_BASEURL=/api
VUE_APP_BASEURL=http://101.132.194.174:7830/national

# BASE路由
VUE_APP_BASE=

#子应用路径1
VUE_APP_SUB1=http://124.222.39.213:7100/subVue

#子应用路径2
VUE_APP_SUB2=http://124.222.39.213:7100/subReact
```

- 在根目录新建`.env.production`文件

```bash
# 生产环境配置
ENV = production

# 生产环境:接口
VUE_APP_BASEURL=http://101.132.194.174:7830/national

# BASE路由
VUE_APP_BASE=/mainApp


#子应用路径1
VUE_APP_SUB1=http://124.222.39.213:7100/subVue

#子应用路径2
VUE_APP_SUB2=http://124.222.39.213:7100/subReact
```

- 在根目录`vue.config.js`中配置：

```bash
publicPath: process.env.VUE_APP_BASE + '/', // 主应用静态资源路径
```

- 在根目录`router.js`中配置`base`和`history`模式（`qiankun`推荐`history`模式）：

```js
const createRouter = () => new Router({
  base: process.env.VUE_APP_BASE,
  mode: 'history',
  routes: Routes
})
```

- 我们项目`ngnix`配置(主、子应用均可参考)

  <span style="color:red">注：以前我们公司需要配置，但是这次我再去梳理部署主、子应用发现不用配置也ok，后面我会贴出此次主、应用nginx配置</span>

> 需配置：可跨域（`qiankun`微应用要求）、可重定向（`history`模式）

```nginx
location /minzong/mainApp {
    proxy_cookie_path ~/(.*) ";Secure;SameSite=None;";
    add_header 'Access-Control-Allow-Origin' "$http_origin";
    add_header Access-Control-Allow-Credentials 'true';
    add_header Access-Control-Allow-Headers 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Mx-ReqToken,X-Requested-With,authorization,Set-Cookie,Cookie';
    alias /home/workspace/national-religion/html/mainApp/dist;

    index index.html;
    try_files $uri $uri/ /minzong/mainApp/index.html;
}
```

> 接口跨域配置可参考

```nginx
location /national/ {
    add_header Access-Control-Allow-Origin '$http_origin';
    add_header Access-Control-Allow-Credentials 'true';
    add_header Access-Control-Allow-Methods 'POST, GET, PUT, OPTIONS, DELETE, PATCH';
    add_header Access-Control-Allow-Headers 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Mx-ReqToken,X-Requested-With,authorization,Set-Cookie,Cookie';
    if ($request_method = 'OPTIONS') {
        return 200;
    }
    root html;
    proxy_set_header X-Real-IP $remote_addr;

    proxy_pass http://127.0.0.1:9999/;
}
```



### 3. 缓存一些全局状态

> 注：可在这里缓存一些父子组件通信的数据，为了刷新页面不丢失数据，将这些全局状态缓存到了`localstorage`，我存了`token`、`subMenu`(当前模块菜单，由于是对象将其转换为`string`缓存)。

> 在`src/globalStore.js`新建文件：

```javascript
import { initGlobalState } from 'qiankun'
import Vue from 'vue'

// 父应用的初始state
// Vue.observable是为了让initialState变成可响应：https://cn.vuejs.org/v2/api/#Vue-observable。
const initialState = Vue.observable({
  token: localStorage.getItem('token') || null,
  subMenu: JSON.parse(localStorage.getItem('subMenu')) || null
})

const actions = initGlobalState(initialState)

actions.onGlobalStateChange((newState, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  const stringifyArr = ['subMenu']
  for (const key in newState) {
    initialState[key] = newState[key]
    if (stringifyArr.includes(key)) localStorage.setItem(key, JSON.stringify(newState[key]))
    else localStorage.setItem(key, newState[key])
  }
})

// 定义一个获取state的方法下发到子应用
actions.getGlobalState = (key) => {
  // 有key，表示取globalState下的某个子级对象
  // 无key，表示取全部
  return key ? initialState[key] : initialState
}
export default actions

```

### 4. 创建子应用并配置公共方法

> 注：`microApps`可配置多个子应用，`activeRule`是这个子应用的路由，注意别重了。
>
> 下发给子组件的方法和状态在`props`里头：
>
> `routerBase`为下发的基础路由；
>
> `globalState`为下发的全局公共状态：`token`、`subMenu`（该模块的路由信息）;
>
> <span style="color:red">注：</span>`subMenu`为该模块的所有路由，子组件需要根据环境判断，决定是否渲染其他路由。实现方式多样，可写路由环境、权限判断，可写动态路由。
>
> `globalFun`为下发的全局公共方法：`backMain`（返回主应用）、`logout`（退登）

```js
/*
 * @Description:配置子应用
 * @Autor: 王敏
 * @LastEditTime: 2021-12-16 17:23:41
 */
import globalStore from './globalStore'
import { message } from 'ant-design-vue'
import router from './router'

const microApps = [// entryDev：本地调试子应用地址  entryPro：发包后子应用访问地址
  { // 子应用1（杭州）
    name: 'subapp1',
    entryDev: '//localhost:7100',
    entryPro: process.env.VUE_APP_SUB1,
    activeRule: '/subapp1'
  },
  { // 子应用2（台州）
    name: 'subapp2',
    entryDev: '//localhost:7200',
    entryPro: process.env.VUE_APP_SUB2,
    activeRule: '/subapp2'
  }
]

// 退登方法
let canLogout = true
const _logoutFun = () => {
  // TODO:调退出登录接口
  Promise.resolve().then(() => {
    localStorage.clear()
    router.push('/login')
    canLogout = true
  })
}

const apps = microApps.map(item => {
  let { name, entryDev, entryPro, activeRule } = item
  activeRule = process.env.VUE_APP_BASE + activeRule
  return {
    name,
    entry: process.env.NODE_ENV === 'development' ? entryDev : entryPro,
    activeRule,
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: activeRule, // 下发基础路由
      globalState: (key) => globalStore.getGlobalState(key), // 下发getGlobalState方法
      globalFun: (name) => {
        switch (name) {
          case 'backMain':
            router.push('/home')
            break
          case 'logout':
            if (!canLogout) return message.info('正在退登，请稍后')
            canLogout = false
            _logoutFun()
            break
        }
      }

    }
  }
})

export default apps
```

## 子应用（`vue`）

### 1.在 `src` 目录新增 `public-path.js`：

```js
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

### 2.配置环境变量和发包地址

- 在根目录新建`.env.development`文件

```bash
# 开发环境配置
ENV = development

#接口
VUE_APP_BASEURL=/api

# BASE路由
VUE_APP_BASE=
```

- 在根目录新建`.env.production`文件

```bash
# 生产环境配置
ENV = production

# 生产环境:接口
VUE_APP_BASEURL=http://101.132.194.174:7830/national

# BASE路由
VUE_APP_BASE=/subVue
```

- 在根目录`vue.config.js`中配置

```bash
publicPath: process.env.VUE_APP_BASE + '/',
```

- 在根目录`router.js`中配置`base`和`history`模式（后面在`main.js`里头配置有讲到）：

### 3.入口文件 `main.js` 修改

> 注：为了避免根 id `#app` 与其他的 DOM 冲突，需要限制查找范围。
>
> 写`localStorage.setItem('token', globalState('token'))`这个是为了缓存token，主、子应用可通用。
>
> 在`vue`原型上挂载一些参数和方法：
>
> `$env`用于环境判断：其值为`qiankun`（`qiankun`环境）、`vue`（`vue`环境）；
>
> `$microAppFun`用于接收父组件传过来的方法`globalFun`；
>
> `$globalState`用于接收父组件传过来的状态`globalState`。
>
> 对`router`配置`base`(根据是否为`qiankun`环境配置)和`history`模式
>
> 还有一些是根据`qiankun`要求需要暴露子应用的生命周期。

```js
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
function render (props = {}) {
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

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}
export async function mount (props) {
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}
```

### 4.打包配置修改（`vue.config.js`）：

```js
const { name } = require('./package');
module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
```

### 5.登录配置（`router.js`）:

> 注：根据环境判断，`qiankun`环境没有登录，子应用登录页会返回首页；当该应用独立运行时，有登录路由，随便乱写路由跳转登录页。

```js
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
```

### 6.主子通信（方法调用）

```vue
<!--
 * @Description:
 * @Autor: 王敏
 * @LastEditTime: 2021-12-16 10:08:43
-->
<template>
  <div>
    <h2>我是vue子应用</h2>
    <div @click="_getApi">
      哈哈哈，我获取个接口试试
    </div>
    <div
      v-if="$env === 'qiankun'"
      @click="$microAppFun('backMain')"
    >
      返回主应用
    </div>
    <div
      v-if="$env === 'qiankun'"
      @click="$microAppFun('logout')"
    >
      退出登录
    </div>
    <h3
      v-if="$env === 'qiankun'"
      @click="getData"
    >
      获取父组件传过来的数据（控制台可打印）
    </h3>
  </div>
</template>

<script>
import api from '@api'
const { getMenu } = api.user
export default {
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    _getApi () {
      getMenu().then(msg => {

      })
    },
    getData () {
      console.log('subMenu:', this.$globalState('subMenu'))
      console.log('token:', this.$globalState('token'))
    }

  }
}

</script>
<style lang='less' scoped>
</style>
```

## 子应用（`react`）

> 注：由于我们之前最开始开发的时候，主、子应用都用的`react`，基于`umi3.x`开发（为了用其脚手架和路由配置），这里举得例子也是基于`umi`开发的`react`。
>
> [`umi`的`qiankun`文档](https://umijs.org/zh-CN/plugins/plugin-qiankun)

### 1.安装`qiankun`

```bash
yarn add @umijs/plugin-qiankun -D
```

### 2.配置`config.js`

> 注：在根目录新建`config/config.js`需配置`qiankun`对象(进行插件注册)；
>
> `publicPath`填写部署是资源访问路径;
>
> `routes`引入路由；

```js
import routes from './routes';

export default {
  routes, // 配置式路由
  title: '我是react子应用',
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/subReact/',// 资源存放路径
  qiankun: {
    slave: {},
  },
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  fastRefresh: {},
};
```

### 

### 4.配置`src/app.js`

> 注：写`localStorage.setItem('token', globalState('token'))`这个是为了缓存token，主、子应用可通用；`patchRoutes`根据环境判断配置动态路由，`qiankun`环境没有登录，子应用登录页会返回首页；当该应用独立运行时，有登录路由，默认登录页。

新建`src/app.js`：

```js
//配置路由base：修改window.routerBase即为修改路由base，写到乾坤bootstrap改这个值有点太晚了，才会把开发阶段、生产阶段以及本地、线上列个map说明
let routerbase = {
  development: {
    qiankun: '/subapp2',
    local: '/'
  },
  production: {
    qiankun: '/mainApp/subapp2',
    local: '/subReact'
  },
}
window.routerBase = routerbase[process.env.NODE_ENV][location.href.includes("subapp") ? 'qiankun' : 'local'];

if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
let globalProps={}
export const qiankun = {
  // 应用加载之前
  async bootstrap(props) {
    console.log('app1 bootstrap', props,window.routerBase);
    if (window.__POWERED_BY_QIANKUN__){
      globalProps=props
      localStorage.setItem("token",props.globalState('token'))
    }
  },
  globalProps:()=>globalProps,
  // 应用 render 之前触发
  async mount(props) {
    console.log('app1 mount', props);
  },
  // 应用卸载之后触发
  async unmount(props) {
    console.log('app1 unmount', props);
  },
};


export function patchRoutes({ routes }) {
  if(window.__POWERED_BY_QIANKUN__){//乾坤环境
    routes.shift()
    routes.push({
      path: '*',
      redirect:'/home',
    })
  }else{
    routes.push({
      path: '/',
      redirect:'/login',
    })
  }
}
```

原本的根目录`config/routes.js`:

```js
export default [
  {
    path: '/login',
    component: '@/pages/Login',
  },
  {
    path: '/home',
    component: '@/pages/Home',
  },
];
```

### 5.主子通信（方法调用）

```js
import styles from './index.less';
import  { useCallback, } from 'react';
import { useModel } from 'umi';

import {qiankun} from '@/app'

export default function IndexPage() {
  const masterProps = useModel('@@qiankunStateFromMaster');
  const getMenuData=useCallback(()=>{
    console.log('subMenu:', masterProps?.globalState('subMenu'))
    console.log('token:', masterProps?.globalState('token'))
  },[])
  const getMenuData2=useCallback(()=>{
    console.log('subMenu:', qiankun.globalProps().globalState('subMenu'))
    console.log('token:', qiankun.globalProps().globalState('token'))
  },[])
  return (
    <div>
      <h1 className={styles.title}>我是react的umi子应用</h1>
      {window.__POWERED_BY_QIANKUN__ ? 
      (<>
        <div onClick={()=>masterProps?.globalFun('backMain')}>返回主应用</div>
        <div onClick={()=>masterProps?.globalFun('logout')}>退出登录</div>
        <h3 onClick={()=>getMenuData()}>通过useModel从获取父组件传过来的数据（控制台可打印）</h3>
        <h3 onClick={()=>getMenuData2()}>通过引入js从获取父组件传过来的数据（控制台可打印）</h3>
      </>) 
      : null}
      
    </div>
  );
}
```

