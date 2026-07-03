<script setup lang="ts">
import { computed } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useAppStore } from "@/stores/app"

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()

const curName = computed(() => route.name as string)

const tMap: Record<string, string> = {
  Welcome: "首页", Dashboard: "仪表盘", Profile: "个人中心",
  VueFlow: "流程图", Order: "订单管理", User: "用户管理",
  Role: "角色管理", Log: "操作日志", Settings: "系统设置",
}

const views = computed(() =>
  appStore.visitedViews.map(n => ({
    name: n, title: tMap[n] || n,
    active: n === curName.value,
    canClose: n !== "Welcome",
  }))
)

function go(n: string) {
  const r = router.getRoutes().find( rr => rr.name === n)
  if (r) router.push(r.path)
}
function close(n: string) {
  const idx = appStore.visitedViews.indexOf(n)
  appStore.removeVisitedView(n)
  if (n === curName.value) {
    const next = appStore.visitedViews[idx] || appStore.visitedViews[idx - 1] || "Welcome"
    go(next)
  }
}
</script>
<template>
  <div class="tv"><div class="tv-scroll">
    <div v-for="v in views" :key="v.name" class="tv-item" :class="{ active: v.active }" @click="go(v.name)">
      <span class="d" :class="{ active: v.active }"></span>
      <span class="t">{{ v.title }}</span>
      <span v-if="v.canClose" class="x" @click.stop="close(v.name)">&#10005;</span>
    </div>
  </div></div>
</template>
<style scoped>
.tv { height: 34px; background: var(--el-bg-color); border-bottom: 1px solid var(--el-border-color-light); display: flex; align-items: center; padding: 0 8px; flex-shrink: 0; overflow: hidden; }
.tv-scroll { display: flex; gap: 4px; overflow-x: auto; white-space: nowrap; scrollbar-width: none; }
.tv-scroll::-webkit-scrollbar { display: none; }
.tv-item { display: flex; align-items: center; gap: 5px; padding: 2px 10px; font-size: 12px; border-radius: 4px; cursor: pointer; color: var(--el-text-color-regular); background: var(--el-fill-color); border: 1px solid transparent; transition: all .15s; flex-shrink: 0; }
.tv-item:hover { background: var(--el-fill-color-light); }
.tv-item.active { color: var(--el-color-primary); background: var(--el-color-primary-light-9); border-color: var(--el-color-primary-light-7); }
html.dark .tv-item.active { background: rgba(64,158,255,0.1); border-color: rgba(64,158,255,0.3); }
.d { width: 6px; height: 6px; border-radius: 50%; background: var(--el-text-color-placeholder); transition: all .15s; }
.d.active { background: var(--el-color-primary); }
.t { user-select: none; }
.x { font-size: 10px; line-height: 1; opacity: 0; transition: opacity .15s; color: var(--el-text-color-secondary); }
.tv-item:hover .x { opacity: 1; }
.x:hover { color: var(--el-color-danger); }
</style>
