<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/stores/user"
import { ElMessage } from "element-plus"

const router = useRouter()
const userStore = useUserStore()

const loginForm = ref({
  username: "admin",
  password: "123456",
})
const remember = ref(false)
const loading = ref(false)

function handleLogin() {
  loading.value = true
  setTimeout(() => {
    userStore.setToken("mock_token_" + Date.now())
    userStore.applyRole(loginForm.value.username === "admin" ? "admin" : "user")
      userStore.setUserInfo({
      id: 1,
      username: loginForm.value.username,
      nickname: "管理员",
      email: "admin@example.com",
      phone: "13800000001",
      role: "admin",
      roleLabel: "超级管理员",
      permissions: ["dashboard", "order", "user", "role", "profile", "vue-flow"],
      status: 1,
    })
    ElMessage.success("登录成功")
    router.push("/")
    loading.value = false
  }, 800)
}
</script>

<template>
  <div class="login-page">
    <div class="login-brand">
      <div class="brand-content">
        <div class="brand-logo">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect width="64" height="64" rx="16" fill="white" fill-opacity="0.2"/>
            <path d="M20 44V24L32 18L44 24V44H36V34H28V44H20Z" stroke="white" stroke-width="2.5" stroke-linejoin="round"/>
            <path d="M20 28L32 34L44 28" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="brand-title">管理系统</h1>
        <p class="brand-desc">新一代企业级后台管理平台</p>
        <div class="brand-illustration">
          <svg width="280" height="200" viewBox="0 0 280 200" fill="none">
            <circle cx="140" cy="100" r="60" stroke="white" stroke-opacity="0.15" stroke-width="2"/>
            <circle cx="140" cy="100" r="40" stroke="white" stroke-opacity="0.15" stroke-width="2"/>
            <circle cx="140" cy="100" r="20" stroke="white" stroke-opacity="0.15" stroke-width="2"/>
            <path d="M140 40V160M60 100H220" stroke="white" stroke-opacity="0.1" stroke-width="1"/>
            <rect x="110" y="70" width="60" height="60" rx="12" fill="white" fill-opacity="0.12"/>
            <path d="M130 100H150M140 90V110" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="login-form-wrapper">
      <div class="login-form-card">
        <h2 class="form-title">欢迎回来</h2>
        <p class="form-subtitle">请登录您的账号以继续</p>

        <el-form :model="loginForm" label-width="0" class="login-form" @keyup.enter="handleLogin">
          <el-form-item>
            <el-input
              v-model="loginForm.username"
              placeholder="用户名"
              size="large"
              clearable
              prefix-icon="User"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              size="large"
              show-password
              prefix-icon="Lock"
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="remember" size="default">记住我</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" :loading="loading" @click="handleLogin" class="login-btn">
              登 录
            </el-button>
          </el-form-item>
        </el-form>

        <div class="login-footer">
          <span class="demo-info">演示账号: admin / 123456</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.login-page {
  display: flex;
  min-height: 100vh;
  background: $color-bg-white;
}

.login-brand {
  flex: 1;
  background: linear-gradient(135deg, #409eff 0%, #6366f1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.04);
    top: -200px;
    right: -200px;
  }

  &::after {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.04);
    bottom: -100px;
    left: -100px;
  }
}

.brand-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.brand-logo {
  margin-bottom: $spacing-lg;
}

.brand-title {
  font-size: 36px;
  font-weight: $font-weight-bold;
  color: white;
  margin-bottom: $spacing-sm;
  letter-spacing: 2px;
}

.brand-desc {
  font-size: $font-size-medium;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: $spacing-xxl;
}

.brand-illustration {
  margin-top: $spacing-xl;
  display: flex;
  justify-content: center;
}

.login-form-wrapper {
  width: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-xxl;
  flex-shrink: 0;
}

.login-form-card {
  width: 100%;
  max-width: 380px;
}

.form-title {
  font-size: 28px;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: $spacing-xs;
}

.form-subtitle {
  font-size: $font-size-base;
  color: $color-text-secondary;
  margin-bottom: $spacing-xl;
}

.login-form {
  margin-top: $spacing-base;

  :deep(.el-input__wrapper) {
    height: 48px;
  }
}

.login-btn {
  width: 100%;
  height: 48px;
  font-size: $font-size-medium;
  letter-spacing: 1px;
}

.login-footer {
  text-align: center;
  margin-top: $spacing-lg;
}

.demo-info {
  font-size: $font-size-small;
  color: $color-text-placeholder;
}

@media (max-width: $breakpoint-md) {
  .login-brand {
    display: none;
  }

  .login-form-wrapper {
    width: 100%;
  }
}
</style>
