<template>
  <el-form :model="userForm" :rules="rules" class="login-form">
    <h3>管理员登录</h3>
    <el-form-item label="账号" prop="name">
      <el-input v-model="userForm.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="userForm.password"
        auto-complete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.once="login()" class="login-btn">
        登录
      </el-button>
      <el-button @click="resetForm('ruleForm')" class="register-btn">
        注册
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { reactive } from "vue";
  import api from "../api";
  import { useRouter } from "vue-router";
  export default {
    setup() {
      const userForm = reactive({
        name: "",
        password: "",
      });
      const router = useRouter();

      async function login() {
        let { name, password } = userForm;

        const resp = await api.user.Login(name, password);
        if (resp.status === 200) {
          router.push("/home");
        }
      }

      function register() {}

      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("用户名不能为空"));
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        }
      };

      return {
        userForm,
        login,
        register,

        rules: {
          password: [{ validator: validatePassword, trigger: "blur" }],
          name: [{ validator: checkName, trigger: "blur" }],
        },
      };
    },
  };
</script>

<style>
  .login-form {
    margin: 150px auto;
    width: 400px;
  }
  .login-btn {
    margin-left: 40px;
    margin-right: 50px;
  }
  .register-btn {
  }
</style>
