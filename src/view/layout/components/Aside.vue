<script setup>
import Logo from '@/assets/images/logo.png'
import {
  ChatDotRound,
  Clock,
  Collection,
  Document,
  Edit,
  Expand,
  House,
  Notebook,
  Position,
  User,
} from '@element-plus/icons-vue'
</script>

<template>
  <div class="container">
    <div class="top">
      <img :src="Logo" />
    </div>
    <div class="nav">
      <el-menu default-active="2" router accordion>
        <el-menu-item index="/backend/console">
          <template #title>
            <el-icon><House /></el-icon>
            <span>主控台</span>
          </template>
        </el-menu-item>
        <el-sub-menu index="user">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>用户中心</span>
          </template>
          <el-menu-item index="/backend/role">角色管理</el-menu-item>
          <el-menu-item index="/backend/user">用户列表</el-menu-item>
          <el-menu-item index="/backend/point">用户积分</el-menu-item>
          <el-menu-item index="/backend/company">公司信息</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="course">
          <template #title>
            <el-icon><Notebook /></el-icon>
            <span>课程管理</span>
          </template>
          <el-menu-item index="/backend/category">课程分类</el-menu-item>
          <el-menu-item index="/backend/comment">课程信息</el-menu-item>
          <el-menu-item index="/backend/favorite">课程视频</el-menu-item>
          <el-menu-item index="/backend/info">收藏课程</el-menu-item>
          <el-menu-item index="/backend/order">课程订单</el-menu-item>
          <el-menu-item index="/backend/video">课程评价</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="counselor">
          <template #title>
            <el-icon><Position /></el-icon>
            <span>咨询管理</span>
          </template>
          <el-menu-item index="/backend/counselor">咨询师信息</el-menu-item>
          <el-menu-item index="/backend/level">咨询师等级</el-menu-item>
          <el-menu-item index="/backend/field">擅长领域</el-menu-item>
          <el-menu-item index="/backend/charge">收费分类</el-menu-item>
          <el-menu-item index="/backend/standard">收费标准</el-menu-item>
          <el-menu-item index="/backend/leave">咨询留言</el-menu-item>
          <el-menu-item index="/backend/counselorComment">咨询评价</el-menu-item>
          <el-menu-item index="/backend/counselorOrder">咨询订单</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="content">
          <template #title>
            <el-icon><Collection /></el-icon>
            <span>内容中心</span>
          </template>
          <el-menu-item index="/backend/articleCategory">文章分类</el-menu-item>
          <el-menu-item index="/backend/articleList">文章管理</el-menu-item>
          <el-menu-item index="/backend/fmCategory">FM分类</el-menu-item>
          <el-menu-item index="/backend/fmList">FM列表</el-menu-item>
          <el-menu-item index="/backend/fmAudio">FM音频</el-menu-item>
          <el-menu-item index="/backend/Konwledge">心理知识</el-menu-item>
          <el-menu-item index="/backend/welfare">公益中心</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="assessment">
          <template #title>
            <el-icon><Expand /></el-icon>
            <span>心理测评</span>
          </template>
          <el-menu-item index="/backend/assessCategory">测评分类</el-menu-item>
          <el-menu-item index="/backend/assessList">测评列表</el-menu-item>
          <el-menu-item index="/backend/bank">测评题库</el-menu-item>
          <el-menu-item index="/backend/select">测评选项</el-menu-item>
          <el-menu-item index="/backend/result">测评结果</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="interation">
          <template #title>
            <el-icon><Edit /></el-icon>
            <span>问题回复</span>
          </template>
          <el-menu-item index="/backend/question">问题列表</el-menu-item>
          <el-menu-item index="/backend/replay">回复列表</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/backend/appointment">
          <template #title>
            <el-icon><Clock /></el-icon>
            <span>咨询预约</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/backend/notice">
          <template #title>
            <el-icon><ChatDotRound /></el-icon>
            <span>系统通知</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/backend/person">
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
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .top {
    width: 230px;
    height: 80px;
    border-bottom: 1px solid #b2bac8;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    img {
      width: 200px;
    }
  }
  .nav {
    flex: 1;
    overflow-y: auto;
    // 隐藏滚动条
    scrollbar-width: none; // Firefox
    -ms-overflow-style: none; // IE/Edge
    &::-webkit-scrollbar {
      display: none; // Chrome/Safari
    }
  }
}
</style>

<style lang="scss">
// 去掉 el-menu 默认右侧边框，隐藏 el-aside 滚动条
.el-menu {
  border-right: none !important;
}
.el-aside {
  // 由内部 .nav 处理滚动，外层隐藏滚动条
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
