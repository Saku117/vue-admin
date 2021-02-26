<template>
  <el-form :model="registerForm" :rules="rules" class="login-form">
    <h3>注册页面</h3>
    <el-form-item label="账号" prop="name">
      <el-input v-model="registerForm.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="registerForm.password"
        auto-complete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="再次输入密码" prop="password">
      <el-input
        type="password"
        v-model="registerForm.verifPassword"
        auto-complete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="register()" class="register-btn">
        注册
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { reactive } from "vue";
  import { ElMessage } from "element-plus";

  import api from "../api";
  import { useRouter } from "vue-router";
  export default {
    setup() {
      const registerForm = reactive({
        name: "",
        password: "",
        verifPassword: "",
      });
      const router = useRouter();

      async function register() {
        let { name, password, verifPassword } = registerForm;
        if (password !== verifPassword) {
          ElMessage({
            message: `两次输入密码不相同`,
            type: "error",
          });
          return false;
        }
        const resp = await api.user.register(name, password);
        if (resp.data.status === 200) {
          ElMessage({
            message: `注册成功`,
            type: "success",
          });
          router.push('/login')
        }
      }

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
        registerForm,
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
