import { defineStore } from "pinia"
import { ref, computed } from "vue"
import type { User } from "@/types"

export const useUserStore = defineStore("user", () => {
  const token = ref(localStorage.getItem("token") || "")
  const userInfo = ref<Partial<User>>({
    id: 1,
    username: "admin",
    nickname: "管理员",
    email: "admin@example.com",
    phone: "13800000001",
    avatar: "",
    role: "admin",
    roleLabel: "超级管理员",
    permissions: ["dashboard", "order", "user", "role", "profile", "vue-flow"],
    status: 1,
  })

  const isLoggedIn = computed(() => !!token.value)
  const userRole = computed(() => userInfo.value.role || "")
  const userPermissions = computed(() => userInfo.value.permissions || [])

  function hasPermission(perm: string): boolean {
    return userPermissions.value.includes(perm)
  }

  function setToken(val: string) {
    token.value = val
    localStorage.setItem("token", val)
  }

  function setUserInfo(info: Partial<User>) {
    userInfo.value = { ...userInfo.value, ...info }
  }

  function updateProfile(data: Partial<User>) {
    userInfo.value = { ...userInfo.value, ...data }
  }

  function logout() {
    token.value = ""
    userInfo.value = {}
    localStorage.removeItem("token")
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    userRole,
    userPermissions,
    hasPermission,
    setToken,
    setUserInfo,
    updateProfile,
    logout,
  }
})
