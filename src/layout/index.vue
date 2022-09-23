<template>
  <el-container>
    <el-header>
      <app-header></app-header>
    </el-header>
    <el-container>
      <el-aside width="230px">
        <app-aside></app-aside>
      </el-aside>
      <el-main>
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 引入组件
import AppHeader from "./AppHeader";
import AppAside from "./AppAside";
import AppMain from "./AppMain";
export default {
  components: {
    AppHeader,
    AppAside,
    AppMain,
  },
  // 路由监听
  watch: {
    $route: {
      handler() {
        // 获取本地用户信息
        let info = localStorage.getItem("userInfo");
        // 判断本地是否有用户信息如果没有就从新获取用户信息
        if (info == null) {
          this.$store.dispatch("handleUserInfo");
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  height: 50px !important;
  background-color: #2d3a4b;
  color: #fff;
  line-height: 50px;
}

.el-aside {
  background-color: #d3dce6;
  height: 100%;
}

.el-main {
  height: 100%;
  background-color: #fff;
}
</style>