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
  watch: {
    $route: {
      handler() {
        let info = localStorage.getItem("userInfo");
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