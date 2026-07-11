<script setup>
import Logo from '@/assets/images/logo.png'
import { House, User } from '@element-plus/icons-vue'
</script>

<template>
  <div class="container">
    <div class="top">
      <img :src="Logo" />
    </div>
    <div class="nav">
      <el-menu default-active="2" router>
        <el-menu-item index="/backend/console">
          <template #title>
            <el-icon><House /></el-icon>
            <span>主控台</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/backend/user">
          <template #title>
            <el-icon><User /></el-icon>
            <span>个人中心</span>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .top {
    width: 230px;
    height: 80px;
    // background-color: skyblue;
    border-bottom: 1px solid #b2bac8;
    border-right: 1px solid #b2bac8;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 200px;
    }
  }
}
</style>
