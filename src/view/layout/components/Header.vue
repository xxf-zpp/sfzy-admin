<script setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { logout } from '@/api/user'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const defIcon = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'

// 退出登录
const onLogout = async () => {
  try {
    await logout()
  } catch {
    // 即使接口失败也清除本地状态
  }
  userStore.clearUserInfo()
  ElMessage.success('退出成功')
  router.push('/login')
}
</script>

<template>
  <!-- 左侧连接 -->
  <div class="header-container">
    <div class="link">
      <el-link>心理测评</el-link>
      <el-link>扩展课程</el-link>
      <el-link>更多资讯</el-link>
      <el-link>关于我们</el-link>
    </div>
    <!-- 右侧头像 -->
    <div class="avatar">
      <!-- 头像图标 -->
      <el-avatar :src="userStore.avatar || defIcon" :size="60" />
      <!-- 选择列表 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.nickname }}（{{ userStore.roleName }}）
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改个人信息</el-dropdown-item>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="onLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .link {
    :deep(.el-link) {
      font-size: 20px;
      margin: 0 10px;
    }
  }
  .avatar {
    margin-right: 10px;
    :deep(.el-avatar) {
      margin-right: 13px;
      margin-top: 10px;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #606266;
      display: flex;
      align-items: center;
      font-size: 17px;
      line-height: 80px;
    }
    :deep(.el-dropdown-link:focus-visible) {
      outline: none;
    }
  }
}
</style>
