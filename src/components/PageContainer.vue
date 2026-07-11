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
:deep(.el-card) {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

:deep(.el-card__body) {
  flex: 1;
  overflow: auto; // 内容超出出现滚动条
}
</style>
