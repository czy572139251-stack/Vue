import { defineStore } from "pinia"
import { ref, computed } from "vue"
import type { User } from "@/types"

export const useUserStore = defineStore("user", () => {
  const token = ref(localStorage.getItem("token") || "")

  const userInfo = ref<Partial<User>>({
    id: 1, username: "admin", nickname: "管理员",
    email: "admin@example.com", phone: "13800000001",
    avatar: "", role: "admin", roleLabel: "超级管理员",
    permissions: ["dashboard", "order", "user", "role", "profile", "vue-flow", "log", "settings"],
    status: 1,
  })

  const isLoggedIn = computed(() => !!token.value)
  const userRole = computed(() => userInfo.value.role || "")
  const userPermissions = computed(() => userInfo.value.permissions || [])

  function hasPermission(perm: string) { return userPermissions.value.includes(perm) }
  function hasAnyPermission(perms: string[]) { return perms.some(p => userPermissions.value.includes(p)) }

  const rolePermissionMap: Record<string, string[]> = {
    admin: ["dashboard", "order", "user", "role", "profile", "vue-flow", "log", "settings"],
    editor: ["dashboard", "order", "profile", "vue-flow", "log"],
    user: ["dashboard", "profile", "vue-flow"],
  }

  function applyRole(role: string) {
    const perms = rolePermissionMap[role] || []
    userInfo.value.permissions = perms
    userInfo.value.role = role
    const labels: Record<string, string> = { admin: "超级管理员", editor: "编辑者", user: "普通用户" }
    userInfo.value.roleLabel = labels[role] || role
  }

  function setToken(val: string) { token.value = val; localStorage.setItem("token", val) }
  function setUserInfo(info: Partial<User>) { userInfo.value = { ...userInfo.value, ...info } }
  function updateProfile(data: Partial<User>) { userInfo.value = { ...userInfo.value, ...data } }
  function logout() { token.value = ""; userInfo.value = {}; localStorage.removeItem("token") }

  return { token, userInfo, isLoggedIn, userRole, userPermissions, hasPermission, hasAnyPermission, applyRole, setToken, setUserInfo, updateProfile, logout }
})