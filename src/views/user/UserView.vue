<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getUsers, deleteUser } from "@/api/modules/user"
import type { User } from "@/types"
import { formatDate } from "@/utils"
import { ElMessage, ElMessageBox } from "element-plus"

const loading = ref(false)
const userList = ref<User[]>([])
const total = ref(0)
const searchForm = ref({ keyword: "" })
const pagination = ref({ page: 1, pageSize: 10 })

async function fetchUsers() {
  loading.value = true
  try {
    const res = await getUsers({ ...pagination.value, ...searchForm.value })
    userList.value = res.data.list
    total.value = res.data.total
  } catch {
    const mockUsers: User[] = []
    for (let i = 0; i < 10; i++) {
      mockUsers.push({
        id: i + 1,
        username: `user_${i + 1}`,
        nickname: `用户${i + 1}`,
        email: `user${i + 1}@example.com`,
        phone: `1380000${String(i + 1).padStart(4, "0")}`,
        avatar: "",
        role: i === 0 ? "admin" : "user",
        status: (i % 5 !== 0 ? 1 : 0) as 0 | 1,
        createTime: new Date(Date.now() - Math.random() * 86400000 * 90).toISOString(),
        lastLoginTime: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
      })
    }
    userList.value = mockUsers
    total.value = 86
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  pagination.value.page = 1
  fetchUsers()
}

async function handleDelete(id: number) {
  try {
    await ElMessageBox.confirm("确定要删除该用户吗？", "确认", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
    await deleteUser(id)
    ElMessage.success("删除成功")
    fetchUsers()
  } catch {
    // 取消删除
  }
}

function handlePageChange(page: number) {
  pagination.value.page = page
  fetchUsers()
}

onMounted(fetchUsers)
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2>用户管理</h2>
      <p>管理系统用户账号和权限</p>
    </div>

    <div class="page-card">
      <div class="table-toolbar">
        <el-form :model="searchForm" inline @keyup.enter="handleSearch">
          <el-form-item>
            <el-input v-model="searchForm.keyword" placeholder="用户名/昵称" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="searchForm = { keyword: '' }; handleSearch()">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary">新增用户</el-button>
      </div>

      <el-table :data="userList" v-loading="loading" stripe border style="width: 100%">
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column prop="username" label="用户名" width="130" />
        <el-table-column prop="nickname" label="昵称" width="130" />
        <el-table-column prop="email" label="邮箱" min-width="190" />
        <el-table-column prop="phone" label="手机号" width="140" />
        <el-table-column prop="role" label="角色" width="100">
          <template #default="{ row }">
            <el-tag :type="row.role === 'admin' ? 'danger' : 'info'" size="small">
              {{ row.role === "admin" ? "管理员" : "普通用户" }}
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
        <el-table-column prop="createTime" label="创建时间" min-width="170">
          <template #default="{ row }">
            {{ formatDate(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" link>编辑</el-button>
            <el-button size="small" type="danger" link @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :total="total"
          layout="total, prev, pager, next"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: $spacing-base;
}
</style>
