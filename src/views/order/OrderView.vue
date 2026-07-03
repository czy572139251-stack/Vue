<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getOrders } from "@/api/modules/order"
import type { Order } from "@/types"
import { formatDate } from "@/utils"

const loading = ref(false)
const orderList = ref<Order[]>([])
const total = ref(0)
const searchForm = ref({ keyword: "", status: "" })
const pagination = ref({ page: 1, pageSize: 10 })

const statusOptions = [
  { label: "全部", value: "" },
  { label: "待处理", value: "pending" },
  { label: "处理中", value: "processing" },
  { label: "已完成", value: "completed" },
  { label: "已取消", value: "cancelled" },
]

const statusMap: Record<string, string> = {
  pending: "待处理",
  processing: "处理中",
  completed: "已完成",
  cancelled: "已取消",
}

const statusTypes: Record<string, string> = {
  pending: "warning",
  processing: "primary",
  completed: "success",
  cancelled: "info",
}

async function fetchOrders() {
  loading.value = true
  try {
    const res = await getOrders({
      ...pagination.value,
      ...searchForm.value,
    })
    orderList.value = res.data.list
    total.value = res.data.total
  } catch {
    // 模拟数据
    const mockOrders: Order[] = []
    for (let i = 0; i < 10; i++) {
      mockOrders.push({
        id: i + 1,
        orderNo: `ORD${Date.now().toString(36).toUpperCase()}${i}`,
        userName: `用户${i + 1}`,
        productName: `商品${i + 1}`,
        amount: Math.floor(Math.random() * 10000) / 100,
        status: ["pending", "processing", "completed", "cancelled"][Math.floor(Math.random() * 4)] as Order["status"],
        createTime: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
        updateTime: new Date().toISOString(),
      })
    }
    orderList.value = mockOrders
    total.value = 156
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  pagination.value.page = 1
  fetchOrders()
}

function handlePageChange(page: number) {
  pagination.value.page = page
  fetchOrders()
}

onMounted(fetchOrders)
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2>订单管理</h2>
      <p>查看和管理所有订单信息</p>
    </div>

    <div class="page-card">
      <el-form :model="searchForm" inline class="search-form" @keyup.enter="handleSearch">
        <el-form-item label="关键词">
          <el-input v-model="searchForm.keyword" placeholder="订单号/用户名" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" style="width: 120px">
            <el-option v-for="opt in statusOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="searchForm = { keyword: '', status: '' }; handleSearch()">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="orderList" v-loading="loading" stripe border style="width: 100%">
        <el-table-column prop="orderNo" label="订单号" min-width="160" />
        <el-table-column prop="userName" label="用户" width="120" />
        <el-table-column prop="productName" label="商品" min-width="140" />
        <el-table-column prop="amount" label="金额" width="120">
          <template #default="{ row }">
            ¥{{ row.amount.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="statusTypes[row.status] as any">
              {{ statusMap[row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="170">
          <template #default="{ row }">
            {{ formatDate(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default>
            <el-button size="small" type="primary" link>详情</el-button>
            <el-button size="small" type="warning" link>处理</el-button>
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
