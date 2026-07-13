<script setup>
import loginBG from '@/assets/images/login-bg.png'
import { ref } from 'vue'

const formdate = ref({
  username: '',
  userpwd: '',
  reuserpwd: '',
})

// 自定义校验：两次密码一致
const validateSamePwd = (rule, value, callback) => {
  if (value !== formdate.value.userpwd) {
    return callback(new Error('两次输入密码不一致'))
  }
  callback()
}

const rules = ref({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 3, max: 16, message: '用户名长度3~16位', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: '用户名仅支持字母、数字、下划线',
      trigger: 'blur',
    },
  ],
  userpwd: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度6~20位', trigger: 'blur' },
    {
      pattern: /^[A-Za-z0-9]+$/,
      message: '密码仅可包含字母、数字',
      trigger: 'blur',
    },
  ],
  reuserpwd: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateSamePwd, trigger: 'blur' },
  ],
})

const isLogin = ref(true)

// 切换登录注册
const switchLogin = () => {
  isLogin.value = !isLogin.value
}
</script>

<template>
  <el-row>
    <el-col :span="13" class="left-bg"><img :src="loginBG" alt="" /></el-col>
    <el-col :span="11" class="right-login">
      <div class="login-box">
        <!-- 登录区域 -->
        <el-form v-if="isLogin" :model="formdate" :rules="rules">
          <h1>欢迎登录十方智育心理健康管理系统</h1>
          <el-form-item label="账号：" prop="username">
            <el-input
              v-model="formdate.username"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="userpwd">
            <el-input
              v-model="formdate.userpwd"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-button type="primary" class="btn">登录</el-button>
          <div class="bottom-text">
            <el-link type="primary">忘记密码？</el-link>
            <span class="to-register" @click="switchLogin">去注册-&gt;</span>
          </div>
        </el-form>
        <!-- 注册区域 -->
        <el-form v-else :model="formdate" :rules="rules">
          <h1>美好起源于注册</h1>
          <el-form-item label="账号：" prop="username">
            <el-input
              v-model="formdate.username"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="userpwd">
            <el-input
              v-model="formdate.userpwd"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="reuserpwd">
            <el-input
              v-model="formdate.reuserpwd"
              type="password"
              placeholder="请再次输入密码"
            ></el-input>
          </el-form-item>
          <el-button type="primary" class="btn">注册</el-button>
          <div class="bottom-text">
            <span class="to-register" @click="switchLogin">&lt;-去登录</span>
          </div>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.left-bg {
  height: 100vh;
  background: url('@/assets/images/login_bg_i.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 500px;
  }
}

.right-login {
  height: 100vh;
  background-color: #f8f4f1;
  display: flex;
  justify-content: center;
  .login-box {
    width: 500px;
    height: 100vh;
    // background-color: skyblue;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
      font-size: 40px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }
    .btn {
      width: 100%;
      margin-top: 10px;
      margin: 5px;
    }
    .bottom-text {
      display: flex;
      justify-content: space-between;
      .to-register {
        font-size: 14px;
        color: #606266;
        cursor: pointer;
      }
    }
  }
}
</style>
