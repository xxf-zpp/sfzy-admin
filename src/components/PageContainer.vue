<script setup>
defineProps({
  title: {
    type: String,
    default: '心理健康系统',
  },
})
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <slot name="headerContent"></slot>
      </div>
    </template>
    <slot>内容区域</slot>
    <template #footer>
      <slot name="footerContent"></slot>
    </template>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  animation: cardKeyframes 0.2s ease-out forwards;
  .card-header {
    display: flex;
    justify-content: space-between;
  }
}

@keyframes cardKeyframes {
  from {
    opacity: 0;
    transform: translate(50px, -50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

:deep(.el-card__body) {
  flex: 1;
  overflow: auto;
}

:deep(.el-card__footer) {
  height: 100px;
}
</style>
