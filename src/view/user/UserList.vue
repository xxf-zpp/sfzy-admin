<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { Delete, Edit, Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { addUser, fetchUserList, removeUsers, updateUser, uploadUserAvatar } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref, watch } from 'vue'

const formDate = ref({
  username: '',
  nickname: '',
  mobile: '',
})

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)

// 表格数据
const tableData = ref([])

// 获取用户列表
const fetchUsers = async () => {
  loading.value = true
  try {
    const res = await fetchUserList({
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      username: formDate.value.username,
      nickname: formDate.value.nickname,
      mobile: formDate.value.mobile,
    })
    tableData.value = res.data.records || []
    total.value = res.data.total || 0
  } catch {
    tableData.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

// 分页变化时重新请求
watch([currentPage, pageSize], () => {
  fetchUsers()
})

onMounted(() => {
  fetchUsers()
})

// Drawer 相关
const drawerVisible = ref(false)
const drawerTitle = ref('新增用户')
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

// 编辑索引
const editingIndex = ref(-1)

// 多选
const selectedRows = ref([])
const handleSelectionChange = (rows) => {
  selectedRows.value = rows
}

// 禁止选中第一个用户（管理员）
const selectable = (row) => row.id !== 1

// 批量删除
const onBatchDelete = async () => {
  try {
    await ElMessageBox.confirm(
      `确定要删除选中的 ${selectedRows.value.length} 个用户吗？`,
      '批量删除确认',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' },
    )
    await removeUsers(selectedRows.value.map((r) => r.id).join(','))
    selectedRows.value = []
    fetchUsers()
    ElMessage.success('删除成功')
  } catch {
    // 取消
  }
}

// 搜索
const onSearch = () => {
  currentPage.value = 1
  fetchUsers()
}

// 重置
const onReset = () => {
  formDate.value = { username: '', nickname: '', mobile: '' }
  currentPage.value = 1
  fetchUsers()
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
  drawerTitle.value = '新增用户'
  drawerVisible.value = true
}

// 编辑
const onEdit = (row) => {
  editingIndex.value = tableData.value.findIndex((item) => item.id === row.id)
  userForm.value = { ...row }
  drawerTitle.value = '编辑用户'
  drawerVisible.value = true
}

// Drawer 中删除
const onDrawerDelete = async () => {
  try {
    await ElMessageBox.confirm(`确定要删除用户【${userForm.value.nickname}】吗？`, '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await removeUsers(String(userForm.value.id))
    drawerVisible.value = false
    fetchUsers()
    ElMessage.success('删除成功')
  } catch {
    // 取消
  }
}

// 头像上传
const avatarUploading = ref(false)
const handleAvatarUpload = async (options) => {
  avatarUploading.value = true
  try {
    const res = await uploadUserAvatar(options.file)
    userForm.value.avatar = res.data || res.msg
    ElMessage.success('头像上传成功')
  } catch (err) {
    ElMessage.error(err.message || '上传失败')
  } finally {
    avatarUploading.value = false
  }
}

// 提交
const submitLoading = ref(false)
const onSubmit = async () => {
  const valid = await userFormRef.value?.validate().catch(() => false)
  if (!valid) return

  submitLoading.value = true
  try {
    if (editingIndex.value >= 0) {
      await updateUser(userForm.value)
    } else {
      await addUser(userForm.value)
    }
    drawerVisible.value = false
    fetchUsers()
    ElMessage.success(editingIndex.value >= 0 ? '修改成功' : '添加成功')
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
    await removeUsers(String(row.id))
    fetchUsers()
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
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="50" :selectable="selectable" />
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
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="roleName" label="角色" width="216" />
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

  <!-- Drawer 抽屉 -->
  <el-drawer
    v-model="drawerVisible"
    :title="drawerTitle"
    direction="rtl"
    size="40%"
    @close="userFormRef?.resetFields()"
  >
    <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="userForm.nickname" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :http-request="handleAvatarUpload"
          accept="image/*"
        >
          <div v-loading="avatarUploading" class="avatar-uploader__inner">
            <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar-preview" />
            <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="userForm.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item class="drawer-btns">
        <div class="drawer-btns__wrap">
          <div>
            <el-button
              v-if="editingIndex >= 0"
              type="danger"
              :disabled="submitLoading"
              @click="onDrawerDelete"
            >
              删除
            </el-button>
          </div>
          <div class="drawer-btns__right">
            <el-button :disabled="submitLoading" @click="drawerVisible = false">取消</el-button>
            <el-button type="primary" :loading="submitLoading" @click="onSubmit">确定</el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </el-drawer>
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

/* 头像上传组件 */
.avatar-uploader {
  :deep(.el-upload) {
    width: 170px;
    height: 170px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      border-color: #409eff;
    }
  }
  .avatar-preview {
    width: 170px;
    height: 170px;
    object-fit: cover;
    border-radius: 6px;
  }
  &__inner {
    width: 170px;
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
  }
}

.drawer-btns {
  margin-top: 50px;
  &__wrap {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  &__right {
    display: flex;
    gap: 12px;
  }
}

/* 头像列压缩内边距，给头像更多空间 */
:deep(td.avatar-col) {
  padding: 4px 0;
}
</style>
