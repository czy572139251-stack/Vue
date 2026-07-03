<script setup lang="ts">
import { ref, onMounted, shallowRef } from "vue"
import { useRouter } from "vue-router"
import VChart from "vue-echarts"
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { LineChart, PieChart, BarChart } from "echarts/charts"
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components"

use([CanvasRenderer, LineChart, PieChart, BarChart, GridComponent, TooltipComponent, LegendComponent])

const router = useRouter()
const loading = ref(true)

const statCards = [
  { label: "总用户数", value: "1,286", change: "+12%", color: "#409eff" },
  { label: "总订单数", value: "356", change: "+8%", color: "#67c23a" },
  { label: "总收入", value: "¥89,200", change: "+15%", color: "#e6a23c" },
  { label: "活跃用户", value: "458", change: "+5%", color: "#f56c6c" },
]

const lineOpt = shallowRef({
  tooltip: { trigger: "axis" },
  grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
  xAxis: { type: "category", data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"], axisLabel: { fontSize: 11 } },
  yAxis: { type: "value" },
  series: [
    { name: "订单量", type: "line", smooth: true, data: [24,31,28,42,38,52,48,61,55,68,72,81], areaStyle: { opacity: 0.15 }, itemStyle: { color: "#409eff" } },
    { name: "收入(千元)", type: "line", smooth: true, data: [12,18,15,24,21,32,28,35,31,40,44,52], itemStyle: { color: "#67c23a" } }
  ],
  legend: { bottom: 0, icon: "circle", itemWidth: 8 }
})

const pieOpt = shallowRef({
  tooltip: { trigger: "item" },
  series: [{
    name: "订单状态", type: "pie", radius: ["40%", "65%"], center: ["50%", "45%"],
    data: [
      { value: 128, name: "已完成", itemStyle: { color: "#67c23a" } },
      { value: 86, name: "处理中", itemStyle: { color: "#409eff" } },
      { value: 52, name: "待处理", itemStyle: { color: "#e6a23c" } },
      { value: 18, name: "已取消", itemStyle: { color: "#909399" } },
    ],
    label: { fontSize: 11 },
    emphasis: { itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.2)" } }
  }]
})

const barOpt = shallowRef({
  tooltip: { trigger: "axis" },
  grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
  xAxis: { type: "category", data: ["管理员","编辑者","普通用户"], axisLabel: { fontSize: 11 } },
  yAxis: { type: "value" },
  series: [{ type: "bar", data: [1,3,12], itemStyle: { color: "#409eff", borderRadius: [4,4,0,0] }, barWidth: "40%" }]
})

onMounted(() => { setTimeout(() => loading.value = false, 300) })
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2>仪表盘</h2>
      <p>系统运营数据概览</p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;margin-bottom:20px">
      <el-card v-for="card in statCards" :key="card.label" shadow="hover">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <p style="font-size:13px;color:#909399;margin-bottom:6px">{{ card.label }}</p>
            <p style="font-size:24px;font-weight:700;color:#303133">{{ card.value }}</p>
          </div>
          <div>
            <el-tag :color="card.color + '15'" :style="{ color: card.color, border: 'none' }" size="small">{{ card.change }}</el-tag>
          </div>
        </div>
      </el-card>
    </div>

    <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;margin-bottom:20px">
      <el-card shadow="hover">
        <template #header><span style="font-weight:600;font-size:14px">收入与订单趋势</span></template>
        <VChart :option="lineOpt" style="height:280px" autoresize />
      </el-card>
      <el-card shadow="hover">
        <template #header><span style="font-weight:600;font-size:14px">订单分布</span></template>
        <VChart :option="pieOpt" style="height:280px" autoresize />
      </el-card>
    </div>

    <el-card shadow="hover">
      <template #header><span style="font-weight:600;font-size:14px">快捷操作</span></template>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <el-button type="primary" @click="router.push('/order')">订单管理</el-button>
        <el-button type="success" @click="router.push('/user')">用户管理</el-button>
        <el-button type="warning" plain @click="router.push('/role')">角色管理</el-button>
      </div>
    </el-card>
  </div>
</template>