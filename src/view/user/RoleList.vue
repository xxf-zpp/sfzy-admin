<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { Delete, Edit, Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { addRole, deleteRole, fetchRoleList, updateRole } from '@/api/role'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, onMounted, ref, watch } from 'vue'

const formDate = ref({
  roleCode: '',
  roleName: '',
})

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)

// 对话框相关
const dialogVisible = ref(false)
const roleFormRef = ref(null)
const roleForm = ref({
  roleCode: '',
  roleName: '',
  description: '',
})
const roleFormRules = {
  roleCode: [{ required: true, message: '请输入角色代码', trigger: 'blur' }],
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }],
}

// 表格数据（从接口获取）
const tableData = ref([])

// 获取角色列表
const fetchRoles = async () => {
  loading.value = true
  try {
    const res = await fetchRoleList({
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      roleCode: formDate.value.roleCode,
      roleName: formDate.value.roleName,
    })
    tableData.value = res.data.records || res.data.list || []
    total.value = res.data.total || 0
  } catch (error) {
    console.error('获取角色列表失败', error)
  } finally {
    loading.value = false
  }
}

// 分页变化时重新请求
watch([currentPage, pageSize], () => {
  fetchRoles()
})

// 搜索
const onSearch = () => {
  currentPage.value = 1
  fetchRoles()
}

// 重置
const onReset = () => {
  formDate.value = { roleCode: '', roleName: '' }
  currentPage.value = 1
  fetchRoles()
}

// 根据分页切片后的表格数据（前端分页 → 改为后端分页后直接返回 tableData）
const pagedTableData = computed(() => tableData.value)

// page-size 变化时重置到第一页
const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
}

// current-page 变化
const handleCurrentChange = (page) => {
  currentPage.value = page
}

// 编辑索引
const editingIndex = ref(-1)

// 是否管理员角色（仅描述可改）
const isAdmin = computed(() => roleForm.value.roleCode === 'admin')

// 新增
const onAdd = () => {
  editingIndex.value = -1
  roleForm.value = { roleCode: '', roleName: '', description: '' }
  dialogVisible.value = true
}

// 编辑角色
const onEdit = (row) => {
  editingIndex.value = tableData.value.findIndex((item) => item.id === row.id)
  roleForm.value = { ...row }
  dialogVisible.value = true
}

// 提交新增/编辑
const submitLoading = ref(false)
const onSubmit = async () => {
  const valid = await roleFormRef.value?.validate().catch(() => false)
  if (!valid) return

  submitLoading.value = true
  try {
    if (editingIndex.value >= 0) {
      // 编辑
      await updateRole({
        id: tableData.value[editingIndex.value].id,
        ...roleForm.value,
      })
      ElMessage.success('修改成功')
    } else {
      // 新增
      await addRole(roleForm.value)
      ElMessage.success('添加成功')
    }
    dialogVisible.value = false
    fetchRoles()
  } catch (error) {
    ElMessage.error(error.message || '操作失败')
  } finally {
    submitLoading.value = false
  }
}

// 删除角色
const onDelete = async (row) => {
  try {
    await ElMessageBox.confirm(`确定要删除角色【${row.roleName}】吗？`, '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await deleteRole(row.roleName)
    ElMessage.success('删除成功')
    fetchRoles()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || '删除失败')
    }
  }
}

onMounted(() => {
  fetchRoles()
})
</script>

<template>
  <page-container title="角色管理">
    <!-- 页面头部区域 -->
    <template #headerContent>
      <el-button type="primary" @click="onAdd">
        新增<el-icon><plus /></el-icon>
      </el-button>
    </template>
    <!-- 页面内容区域 -->
    <template #default>
      <!-- 页面顶部区域 -->
      <div class="content-top">
        <el-form inline :model="formDate">
          <el-form-item label="角色代码：">
            <el-input v-model="formDate.roleCode" placeholder="请输入角色代码"></el-input>
          </el-form-item>
          <el-form-item label="角色名称：">
            <el-input v-model="formDate.roleName" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-button @click="onReset">
            重置
            <el-icon><refresh-right /> </el-icon>
          </el-button>
          <el-button type="primary" @click="onSearch">
            搜索
            <el-icon><search /></el-icon>
          </el-button>
        </el-form>
      </div>
      <!-- 表格区域 -->
      <el-table
        v-loading="loading"
        :data="pagedTableData"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="60" />
        <el-table-column prop="roleCode" label="角色代码" width="380" />
        <el-table-column prop="roleName" label="角色名称" width="480" />
        <el-table-column prop="description" label="角色描述" width="450" />
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
          <el-empty description="暂无角色数据" />
        </template>
      </el-table>
    </template>

    <!-- 底部区域 -->
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
        <span>{{ editingIndex >= 0 ? '编辑角色' : '新增角色' }}</span>
      </div>
      <div class="custom-dialog__body">
        <el-form ref="roleFormRef" :model="roleForm" :rules="roleFormRules" label-width="80px">
          <el-form-item label="角色代码" prop="roleCode">
            <el-input
              v-model="roleForm.roleCode"
              placeholder="请输入角色代码"
              :disabled="editingIndex >= 0 && isAdmin"
            />
          </el-form-item>
          <el-form-item label="角色名称" prop="roleName">
            <el-input
              v-model="roleForm.roleName"
              placeholder="请输入角色名称"
              :disabled="editingIndex >= 0 && isAdmin"
            />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleForm.description" type="textarea" placeholder="请输入角色描述" />
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

:deep(.el-table) {
  .el-table__body tr td:nth-child(5) .cell {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #999;
  }
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
