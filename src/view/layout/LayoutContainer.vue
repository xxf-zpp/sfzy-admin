<script setup>
import Aside from '@/view/layout/components/Aside.vue'
import Header from '@/view/layout/components/Header.vue'
</script>

<template>
  <div class="layout">
    <el-container>
      <el-aside width="230px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
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
  height: 100vh;
}
// 头部橙色
:deep(.el-header) {
  background-color: #fff;
  height: 80px;
}
// 内层容器撑满视口
:deep(.el-container) {
  height: 100vh;
}
// 主体区域 — flex列布局，填充剩余空间
:deep(.el-main) {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  > * {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
