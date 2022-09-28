<!--
 * @Description:
 * @Autor: 王敏
 * @LastEditTime: 2022-09-28 15:41:41
-->
<template>
  <div>
    <h2>我是vue子应用</h2>
    <div @click="_getApi">哈哈哈，我获取个接口试试</div>
    <div v-if="$env === 'qiankun'" @click="$microAppFun('backMain')">
      返回主应用
    </div>
    <div v-if="$env === 'qiankun'" @click="$microAppFun('logout')">
      退出登录
    </div>
    <h3 v-if="$env === 'qiankun'" @click="getData">
      获取父组件传过来的数据（控制台可打印）
    </h3>
  </div>
</template>

<script>
import api from "@api";
const { getMenu } = api.user;
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    _getApi() {
      getMenu().then((msg) => {});
    },
    getData() {
      console.log(11, window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__);
      console.log("subMenu:", this.$globalState("subMenu"));
      console.log("token:", this.$globalState("token"));
    },
  },
};
</script>
<style lang='less' scoped>
</style>
