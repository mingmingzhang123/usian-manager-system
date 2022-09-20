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
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >立即创建</el-button
      >
    </div>
  </div>
</template>
<script>
import { getLogin } from "../api/login";
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
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用登录的api
          getLogin(this.form)
            .then((res) => {
              console.log(res);
              localStorage.setItem('token',res.data.data.token)
            })
            .catch((error) => {
              console.log(error);
            });
            this.$router.push('/')
        } else {
          console.log("请输入账号或密码");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  background-image: url("../assets/1.png");
  height: 100vh;
  padding-top: 200px;
  .box {
    width: 300px;
    padding: 60px;
    background-color: aqua;
    color: #000;
    margin: auto;
  }
}
</style>