<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { Delete, Edit, Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, ref } from 'vue'

const formDate = ref({
  username: '',
  nickname: '',
  mobile: '',
})

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 对话框相关
const dialogVisible = ref(false)
const userFormRef = ref(null)
const userForm = ref({
  username: '',
  nickname: '',
  mobile: '',
  email: '',
  avatar: '',
})
const userFormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
}

// 模拟数据
const allTableData = ref([
  {
    id: 1,
    avatar: 'https://c-ssl.dtstatic.com/uploads/blog/202309/22/YxSQDd7zTqyeoN0.thumb.400_0.jpg',
    username: 'admin',
    nickname: '真ikun',
    mobile: '18488039825',
    email: 'admin@sfzy.com',
  },
  {
    id: 2,
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    username: 'zhangsan',
    nickname: '张三',
    mobile: '13800138001',
    email: 'zhangsan@sfzy.com',
  },
  {
    id: 3,
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    username: 'lisi',
    nickname: '李四',
    mobile: '13800138002',
    email: 'lisi@sfzy.com',
  },
  {
    id: 4,
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    username: 'wangwu',
    nickname: '王五',
    mobile: '13800138003',
    email: 'wangwu@sfzy.com',
  },
])

// 前端分页
total.value = allTableData.value.length
const pagedTableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return allTableData.value.slice(start, start + pageSize.value)
})

// 编辑索引
const editingIndex = ref(-1)

// 多选
const selectedRows = ref([])
const handleSelectionChange = (rows) => {
  selectedRows.value = rows
}

// 批量删除
const onBatchDelete = async () => {
  try {
    await ElMessageBox.confirm(
      `确定要删除选中的 ${selectedRows.value.length} 个用户吗？`,
      '批量删除确认',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' },
    )
    const ids = new Set(selectedRows.value.map((row) => row.id))
    allTableData.value = allTableData.value.filter((item) => !ids.has(item.id))
    selectedRows.value = []
    ElMessage.success('删除成功')
  } catch {
    // 取消
  }
}

// 搜索
const onSearch = () => {
  currentPage.value = 1
}

// 重置
const onReset = () => {
  formDate.value = { username: '', nickname: '', mobile: '' }
  currentPage.value = 1
}

// page-size 变化
const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
}

// current-page 变化
const handleCurrentChange = (page) => {
  currentPage.value = page
}

// 新增
const onAdd = () => {
  editingIndex.value = -1
  userForm.value = { username: '', nickname: '', mobile: '', email: '', avatar: '' }
  dialogVisible.value = true
}

// 编辑
const onEdit = (row) => {
  editingIndex.value = allTableData.value.findIndex((item) => item.id === row.id)
  userForm.value = { ...row }
  dialogVisible.value = true
}

// 提交
const submitLoading = ref(false)
const onSubmit = async () => {
  const valid = await userFormRef.value?.validate().catch(() => false)
  if (!valid) return

  submitLoading.value = true
  try {
    if (editingIndex.value >= 0) {
      allTableData.value[editingIndex.value] = {
        ...allTableData.value[editingIndex.value],
        ...userForm.value,
      }
      ElMessage.success('修改成功')
    } else {
      userForm.value.id = Date.now()
      allTableData.value.unshift({ ...userForm.value })
      ElMessage.success('添加成功')
    }
    dialogVisible.value = false
  } finally {
    submitLoading.value = false
  }
}

// 删除
const onDelete = async (row) => {
  try {
    await ElMessageBox.confirm(`确定要删除用户【${row.nickname}】吗？`, '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    const idx = allTableData.value.findIndex((item) => item.id === row.id)
    if (idx >= 0) allTableData.value.splice(idx, 1)
    ElMessage.success('删除成功')
  } catch {
    // 取消
  }
}
</script>

<template>
  <page-container title="用户列表">
    <!-- 页面头部区域 -->
    <template #headerContent>
      <el-button type="primary" @click="onAdd">
        新增<el-icon><plus /></el-icon>
      </el-button>
    </template>

    <!-- 页面内容区域 -->
    <template #default>
      <!-- 搜索区域 -->
      <div class="content-top">
        <el-form inline :model="formDate">
          <el-form-item label="用户名：">
            <el-input v-model="formDate.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="昵称：">
            <el-input v-model="formDate.nickname" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="formDate.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-button @click="onReset">
            重置
            <el-icon><refresh-right /></el-icon>
          </el-button>
          <el-button type="primary" @click="onSearch">
            搜索
            <el-icon><search /></el-icon>
          </el-button>
        </el-form>
        <el-button
          :type="selectedRows.length ? 'danger' : ''"
          :plain="!selectedRows.length"
          :disabled="!selectedRows.length"
          @click="onBatchDelete"
        >
          批量删除{{ selectedRows.length ? `（${selectedRows.length}）` : '' }}
        </el-button>
      </div>

      <!-- 表格区域 -->
      <el-table
        :data="pagedTableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="50" />
        <el-table-column type="index" label="序号" align="center" width="60" />
        <el-table-column
          prop="avatar"
          label="头像"
          width="100"
          align="center"
          class-name="avatar-col"
        >
          <template #default="scope">
            <el-avatar :src="scope.row.avatar" :size="50" />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="250" />
        <el-table-column prop="nickname" label="昵称" width="250" />
        <el-table-column prop="mobile" label="手机号" width="250" />
        <el-table-column prop="email" label="邮箱" min-width="200" />
        <el-table-column label="操作" width="200" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              :icon="Edit"
              plain
              circle
              @click="onEdit(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              :icon="Delete"
              plain
              circle
              @click="onDelete(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="暂无用户数据" />
        </template>
      </el-table>
    </template>

    <!-- 底部分页 -->
    <template #footerContent>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </page-container>

  <!-- 自定义弹窗 -->
  <div v-if="dialogVisible" class="custom-overlay" @click.self="dialogVisible = false">
    <div class="custom-dialog">
      <div class="custom-dialog__header">
        <span>{{ editingIndex >= 0 ? '编辑用户' : '新增用户' }}</span>
      </div>
      <div class="custom-dialog__body">
        <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="userForm.nickname" placeholder="请输入昵称" />
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="userForm.mobile" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userForm.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <el-input v-model="userForm.avatar" placeholder="请输入头像URL" />
          </el-form-item>
        </el-form>
      </div>
      <div class="custom-dialog__footer">
        <el-button :disabled="submitLoading" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="onSubmit">确定</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-top {
  display: flex;
  justify-content: space-between;
  :deep(.el-form) {
    margin-bottom: 15px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}

:deep(.el-card__footer) {
  display: flex;
  justify-content: flex-end;
}

/* 头像列压缩内边距，给头像更多空间 */
:deep(td.avatar-col) {
  padding: 4px 0;
}

/* 自定义弹窗 */
.custom-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.custom-dialog {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  width: 500px;
  max-height: 80vh;
  overflow: auto;
}
.custom-dialog__header {
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #eee;
}
.custom-dialog__body {
  padding: 20px;
}
.custom-dialog__footer {
  padding: 12px 20px;
  text-align: right;
  border-top: 1px solid #eee;
}
</style>
