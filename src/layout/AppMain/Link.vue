<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="item" :to="{ path: '/' }">{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
    computed:{
        title(){
            return this.$route.meta?.title
        }
    }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb{
  height: 10px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  .item{
    border-left: 3px solid #31c17b;
    padding-left: 10px;
  }
}
</style>