<script setup>
import loginBG from '@/assets/images/login-bg.png'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login, register, sendCode } from '@/api/user'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const formdate = ref({
  username: '',
  userpwd: '',
  reuserpwd: '',
  mobile: '',
  email: '',
  smsCode: '',
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
  mobile: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  smsCode: [
    { required: true, message: '验证码不能为空', trigger: 'blur' },
    { len: 6, message: '验证码为6位', trigger: 'blur' },
  ],
})

// 验证码倒计时
const countdown = ref(0)
let timer = null
const sendSmsCode = async () => {
  // 先校验手机号
  if (!/^1[3-9]\d{9}$/.test(formdate.value.mobile)) {
    ElMessage.warning('请先输入正确的手机号')
    return
  }
  try {
    await sendCode(formdate.value.mobile)
    ElMessage.success('验证码已发送')
    countdown.value = 60
  } catch (err) {
    ElMessage.error(err.message || '发送失败')
    return
  }
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      timer = null
    }
  }, 1000)
}

const loginFormRef = ref(null)
const registerFormRef = ref(null)
const isLogin = ref(true)

// 登录提交
const loginSubmit = async () => {
  // 表单校验
  try {
    await loginFormRef.value?.validate()
  } catch {
    return
  }

  try {
    const res = await login({
      username: formdate.value.username,
      userpwd: formdate.value.userpwd,
    })
    const token = res.data?.token
    if (!token) {
      ElMessage.error('登录返回数据异常，未获取到 token')
      return
    }
    // 将用户信息存入 Pinia store（内部会同步 localStorage）
    userStore.setUserInfo(res.data)
    ElMessage.success('登录成功')
    router.push('/backend')
  } catch (err) {
    ElMessage.error(err.message || '登录失败')
  }
}

// 注册提交
const registerSubmit = async () => {
  try {
    await registerFormRef.value?.validate()
  } catch {
    return
  }

  try {
    await register({
      mobile: formdate.value.mobile,
      code: formdate.value.smsCode,
      userpwd: formdate.value.userpwd,
      reuserpwd: formdate.value.reuserpwd,
      email: formdate.value.email,
    })
    ElMessage.success('注册成功，请登录')
    // 清空注册表单
    formdate.value = { username: '', userpwd: '', reuserpwd: '', mobile: '', email: '', smsCode: '' }
    isLogin.value = true
  } catch (err) {
    ElMessage.error(err.message || '注册失败')
  }
}

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
        <el-form
          v-if="isLogin"
          ref="loginFormRef"
          :model="formdate"
          :rules="rules"
          @keyup.enter="loginSubmit"
        >
          <h1>欢迎登录十方智育心理健康管理系统</h1>
          <el-form-item label="账号：" prop="username">
            <el-input v-model="formdate.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="userpwd">
            <el-input
              v-model="formdate.userpwd"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-button type="primary" class="btn" @click="loginSubmit">登录</el-button>
          <div class="bottom-text">
            <el-link type="primary">忘记密码？</el-link>
            <span class="to-register" @click="switchLogin">去注册-&gt;</span>
          </div>
        </el-form>
        <!-- 注册区域 -->
        <el-form
          v-else
          ref="registerFormRef"
          :model="formdate"
          :rules="rules"
          label-width="100px"
          @keyup.enter="registerSubmit"
        >
          <h1>美好起源于注册</h1>
          <el-form-item label="手机号：" prop="mobile">
            <el-input v-model="formdate.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="formdate.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="验证码：" prop="smsCode">
            <el-input v-model="formdate.smsCode" placeholder="请输入验证码" maxlength="6">
              <template #append>
                <el-button
                  v-if="!countdown"
                  type="primary"
                  class="sms-btn"
                  @click="sendSmsCode"
                >
                  发送验证码
                </el-button>
                <el-button v-else disabled class="sms-btn"> {{ countdown }}s </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="userpwd">
            <el-input
              v-model="formdate.userpwd"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="reuserpwd">
            <el-input
              v-model="formdate.reuserpwd"
              type="password"
              placeholder="请再次输入密码"
            ></el-input>
          </el-form-item>
          <el-button type="primary" class="btn" @click="registerSubmit">注册</el-button>
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
    .sms-btn {
      width: 80px;
      font-size: 12px;
      padding: 0 4px;
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
