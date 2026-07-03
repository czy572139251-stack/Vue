<script setup lang="ts">
import { ref } from "vue"
const logs = ref([
  { id: 1, user: "管理员", action: "登录系统", target: "系统", detail: "登录成功", time: new Date(Date.now() - 60000) },
  { id: 2, user: "管理员", action: "查看订单", target: "订单 #ORD001", detail: "查看订单详情", time: new Date(Date.now() - 120000) },
  { id: 3, user: "编辑者", action: "修改用户", target: "用户 #5", detail: "修改了用户角色", time: new Date(Date.now() - 300000) },
])
const page = ref(1)
</script>
<template>
  <div class="page-container">
    <div class="page-header"><h2>操作日志</h2><p>记录系统用户的操作行为</p></div>
    <div class="page-card">
      <el-table :data="logs" stripe border style="width:100%">
        <el-table-column prop="user" label="操作用户" width="120" />
        <el-table-column prop="action" label="操作" width="120" />
        <el-table-column prop="target" label="操作对象" min-width="160" />
        <el-table-column prop="detail" label="详情" min-width="200" />
        <el-table-column label="操作时间" width="180">
          <template #default="{ row }">{{ new Date(row.time).toLocaleString() }}</template>
        </el-table-column>
      </el-table>
      <div style="display:flex;justify-content:flex-end;margin-top:16px">
        <el-pagination v-model:current-page="page" :total="3" layout="total, prev, pager, next" :page-size="10" />
      </div>
    </div>
  </div>
</template>