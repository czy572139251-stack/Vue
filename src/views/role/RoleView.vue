<script setup lang="ts">
import { ref, reactive } from "vue"
import type { Role } from "@/types"
import { ElMessage, ElMessageBox } from "element-plus"

const roles = ref<Role[]>([
  { id: 1, name: "admin", label: "超级管理员", description: "拥有全部权限", userCount: 1, status: 1, permissions: ["dashboard", "order", "user", "role", "profile", "vue-flow"] },
  { id: 2, name: "editor", label: "编辑者", description: "可查看和管理大部分内容", userCount: 3, status: 1, permissions: ["dashboard", "order", "profile"] },
  { id: 3, name: "user", label: "普通用户", description: "仅有查看权限", userCount: 12, status: 1, permissions: ["dashboard", "profile"] },
])

const allPermissions = [
  { key: "dashboard", name: "仪表盘", desc: "查看系统概览数据" },
  { key: "order", name: "订单管理", desc: "查看和管理订单信息" },
  { key: "user", name: "用户管理", desc: "管理系统用户账号" },
  { key: "role", name: "角色管理", desc: "管理角色和权限分配" },
  { key: "profile", name: "个人中心", desc: "访问个人设置页面" },
  { key: "vue-flow", name: "流程图", desc: "使用流程图编辑器" },
]

const dialogVisible = ref(false)
const editingRole = ref<Role | null>(null)
const checkedPerms = ref<string[]>([])

function openEdit(role: Role) {
  editingRole.value = role
  checkedPerms.value = [...role.permissions]
  dialogVisible.value = true
}

function savePermissions() {
  if (editingRole.value) {
    editingRole.value.permissions = [...checkedPerms.value]
    ElMessage.success("权限已更新")
  }
  dialogVisible.value = false
}

async function toggleStatus(role: Role) {
  try {
    await ElMessageBox.confirm("确定要" + (role.status === 1 ? "禁用" : "启用") + "该角色吗？", "确认")
    role.status = role.status === 1 ? 0 : 1
    ElMessage.success(role.status === 1 ? "已启用" : "已禁用")
  } catch { }
}
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2>角色管理</h2>
      <p>管理系统角色和权限分配</p>
    </div>

    <div class="page-card">
      <el-table :data="roles" stripe border style="width:100%">
        <el-table-column prop="label" label="角色名称" width="140" />
        <el-table-column prop="description" label="描述" min-width="200" />
        <el-table-column prop="userCount" label="用户数" width="100" />
        <el-table-column label="权限" min-width="300">
          <template #default="{ row }">
            <el-tag v-for="p in row.permissions" :key="p" size="small" style="margin:2px">
              {{ allPermissions.find(ap => ap.key === p)?.name || p }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'" size="small">
              {{ row.status === 1 ? "正常" : "禁用" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" link @click="openEdit(row)">编辑权限</el-button>
            <el-button size="small" :type="row.status === 1 ? 'warning' : 'success'" link @click="toggleStatus(row)">
              {{ row.status === 1 ? "禁用" : "启用" }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="dialogVisible" :title="'编辑权限 - ' + (editingRole?.label || '')" width="500px">
      <el-checkbox-group v-model="checkedPerms">
        <div v-for="perm in allPermissions" :key="perm.key" style="padding:8px 0;border-bottom:1px solid #f0f0f0">
          <el-checkbox :value="perm.key" :label="perm.name" />
          <p style="font-size:12px;color:#909399;margin:2px 0 0 24px">{{ perm.desc }}</p>
        </div>
      </el-checkbox-group>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="savePermissions">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>