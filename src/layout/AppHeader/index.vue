<template>
  <div>
    <!-- 左侧logo -->
    <router-link to="/" class="link">
      <img
        class="logo"
        src="http://vue.mengxuegu.com/img/logo.7156be27.png"
        alt="logo"
      />
      <span class="header-size">积云会员后台系统</span>
    </router-link>
    <!-- 下拉菜单 -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ $store.getters.userInfo.name
        }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="changePass"
          >修改密码</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-s-fold" command="logout"
          >退出系统</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  methods: {
    // 下拉点击
    handleCommand(command) {
      // 判断下拉框选中的是哪个
      // switch(判断的条件)
      switch (command) {
        // 如果是修改密码就执行修改密码的方法
        // case "值"
        case "changePass":
          this.handlechangePass();
          //break // 如果不是就结束当前语句继续执行
          break;
        case "logout":
          this.handelogout();
      }
    },
    // 修改密码
    handlechangePass() {
      alert("修改密码");
    },
    // 退出登录
    async handelogout() {
      try {
        const response = await this.$store.dispatch("handlelogout");
        //    设置个定时器
        setTimeout(() => {
          this.$router.push("/login");
        }, 300);
        //    给个提示
        this.$message.success("退出成功");
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// 左侧logo
.link {
  margin-left: 20px;
  .logo {
    width: 25px;
    vertical-align: middle;
  }
  .header-size {
    margin-left: 10px;
    font-size: 16px;
    color: #fff;
    vertical-align: middle;
  }
}
// 右侧下拉菜单
.el-dropdown {
  float: right;
  margin-right: 20px;
  color: #fff;
}
</style>