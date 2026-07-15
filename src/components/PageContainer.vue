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
      </div>
    </template>
    <slot>内容区域</slot>
    <template #footer>Footer content</template>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  animation: cardKeyframes 0.2s ease-out forwards;
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
</style>
