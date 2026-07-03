import { defineStore } from "pinia"
import { ref } from "vue"
import type { MenuItem } from "@/types"

export const useAppStore = defineStore("app", () => {
  const sidebarCollapsed = ref(false)
  const breadcrumbs = ref<string[]>([])
  const darkMode = ref(localStorage.getItem("darkMode") === "true")
  const visitedViews = ref<string[]>(["Welcome"])

  function addVisitedView(name: string) { if (!visitedViews.value.includes(name)) visitedViews.value.push(name) }
  function removeVisitedView(name: string) { const idx = visitedViews.value.indexOf(name); if (idx > -1) visitedViews.value.splice(idx, 1) }

  function toggleDarkMode() {
    darkMode.value = !darkMode.value
    localStorage.setItem("darkMode", darkMode.value.toString())
    document.documentElement.classList.toggle("dark", darkMode.value)
  }

  const menuList = ref<MenuItem[]>([
    { path: "/welcome", name: "Welcome", title: "首页", icon: "HomeFilled" },
    { path: "/dashboard", name: "Dashboard", title: "仪表盘", icon: "Odometer" },
    { path: "/profile", name: "Profile", title: "个人中心", icon: "UserFilled" },
    { path: "/vue-flow", name: "VueFlow", title: "流程图", icon: "Connection" },
    { path: "/order", name: "Order", title: "订单管理", icon: "List" },
    { path: "/user", name: "User", title: "用户管理", icon: "User" },
    { path: "/role", name: "Role", title: "角色管理", icon: "Setting" },
    { path: "/log", name: "Log", title: "操作日志", icon: "Document" },
    { path: "/settings", name: "Settings", title: "系统设置", icon: "Tools" },
  ])

  function toggleSidebar() { sidebarCollapsed.value = !sidebarCollapsed.value }
  function setBreadcrumbs(paths: string[]) { breadcrumbs.value = paths }
  return { sidebarCollapsed, breadcrumbs, darkMode, menuList, visitedViews, toggleSidebar, setBreadcrumbs, toggleDarkMode, addVisitedView, removeVisitedView }
})