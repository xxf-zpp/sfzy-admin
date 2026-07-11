<script setup>
import Aside from '@/view/layout/components/Aside.vue'
</script>

<template>
  <div class="layout">
    <el-container>
      <el-aside width="230px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
// 侧边栏蓝色
:deep(.el-aside) {
  //   background-color: #409eff;
  height: 100vh;
}
// 头部橙色
:deep(.el-header) {
  background-color: #ff7d00;
  height: 80px;
}
// 主体区域绿色
:deep(.el-main) {
  background-color: #67c23a;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
}
</style>
