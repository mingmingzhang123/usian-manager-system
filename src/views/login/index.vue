<template>
  <div class="login">
    <div class="box">
      <h1>积云会员后台系统</h1>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="form.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用登录的api
          this.handleLogin()
        } else {
          console.log("请输入账号或密码");
          return false;
        }
      });
    },
    // 调取登录的api
    // 使用async 和await时必须要使用try和catch接收请求的成功或失败
    async handleLogin() {
      // 调用vuex中的登录请求
      const token = await this.$store.dispatch("login", this.form);
      // 如果获取不到token就直接把错误返回出去
      if (!token) return;
      // 调用vuex中的用户请求
      const userinfo = await this.$store.dispatch("handleUserInfo");
      // 如果获取不到用户信息就直接把错误返回出去
      if (!userinfo) return;
      // 给个登录成功的提示
      this.$message.success("登录成功");
      // 跳转到首页
      this.$router.push("/");
      // 将登录请求写在登录页面
      // try {
      //   const response = await getLogin(this.form);
      //   console.log("response=>", response);
      //   console.log("token=>", response.token);
      // } catch (e) {
      //   console.log(e);
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  background-image: url("http://vue.mengxuegu.com/img/login.b665435f.jpg");
  height: 100%;
  padding-top: 200px;
  h1 {
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .box {
    width: 350px;
    padding: 60px;
    background-color: rgba(250, 250, 250, 0.5);
    color: #000;
    margin: auto;
    border-radius: 20px;
  }
}
</style>