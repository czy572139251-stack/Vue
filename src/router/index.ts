import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import { useUserStore } from "@/stores/user"
import MainLayout from "@/layouts/MainLayout.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    redirect: "/welcome",
    children: [
      { path: "welcome", name: "Welcome", component: () => import("@/views/welcome/WelcomeView.vue"), meta: { title: "首页", icon: "HomeFilled" } },
      { path: "dashboard", name: "Dashboard", component: () => import("@/views/dashboard/DashboardView.vue"), meta: { permission: "dashboard", title: "仪表盘", icon: "Odometer" } },
      { path: "profile", name: "Profile", component: () => import("@/views/profile/ProfileView.vue"), meta: { permission: "profile", title: "个人中心", icon: "UserFilled" } },
      { path: "vue-flow", name: "VueFlow", component: () => import("@/views/vue-flow/VueFlowView.vue"), meta: { title: "流程图", icon: "Connection" } },
      { path: "order", name: "Order", component: () => import("@/views/order/OrderView.vue"), meta: { permission: "order", title: "订单管理", icon: "List" } },
      { path: "user", name: "User", component: () => import("@/views/user/UserView.vue"), meta: { permission: "user", title: "用户管理", icon: "User" } },
      { path: "role", name: "Role", component: () => import("@/views/role/RoleView.vue"), meta: { permission: "role", title: "角色管理", icon: "Setting" } },
      { path: "log", name: "Log", component: () => import("@/views/log/LogView.vue"), meta: { permission: "log", title: "操作日志", icon: "Document" } },
      { path: "settings", name: "Settings", component: () => import("@/views/settings/SettingsView.vue"), meta: { permission: "settings", title: "系统设置", icon: "Tools" } },
      { path: "error/404", name: "NotFound", component: () => import("@/views/error/NotFoundView.vue"), meta: { title: "404" } },
      { path: "error/500", name: "ServerError", component: () => import("@/views/error/ServerErrorView.vue"), meta: { title: "500" } },
    ],
  },
  { path: "/login", name: "Login", component: () => import("@/views/login/LoginView.vue"), meta: { title: "登录" } },
  { path: "/:pathMatch(.*)*", redirect: "/error/404" },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()
  const perm = to.meta.permission as string
  if (perm && !userStore.hasPermission(perm)) {
    return next({ name: "Welcome" })
  }
  const title = (to.meta.title as string) || ""
  document.title = title ? title + " — 管理系统" : "管理系统"
  const token = localStorage.getItem("token")
  if (to.name !== "Login" && !token) next({ name: "Login" })
  else next()
})

export default router