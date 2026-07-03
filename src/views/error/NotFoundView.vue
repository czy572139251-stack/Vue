<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()
</script>

<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-illustration">
        <svg width="320" height="240" viewBox="0 0 320 240" fill="none">
          <rect x="60" y="20" width="200" height="180" rx="16" fill="#f0f5ff" stroke="#d9e4ff" stroke-width="2"/>
          <text x="160" y="140" text-anchor="middle" font-size="72" font-weight="700" fill="#409eff">404</text>
          <text x="160" y="170" text-anchor="middle" font-size="16" fill="#909399">Page Not Found</text>
          <path d="M80 200 L120 180 L160 200 L200 180 L240 200" stroke="#409eff" stroke-width="2" fill="none" stroke-linecap="round"/>
          <circle cx="100" cy="50" r="8" fill="#409eff" opacity="0.3"/>
          <circle cx="230" cy="60" r="6" fill="#6366f1" opacity="0.3"/>
          <circle cx="50" cy="100" r="5" fill="#67c23a" opacity="0.2"/>
          <circle cx="270" cy="140" r="7" fill="#e6a23c" opacity="0.2"/>
        </svg>
      </div>
      <h2 class="error-title">页面不存在</h2>
      <p class="error-desc">抱歉，您访问的页面不存在或已被移除</p>
      <el-button type="primary" size="large" @click="router.push('/')">返回首页</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: $color-bg-white;
}

.error-content {
  text-align: center;
}

.error-illustration {
  margin-bottom: $spacing-lg;
}

.error-title {
  font-size: 28px;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: $spacing-sm;
}

.error-desc {
  font-size: $font-size-base;
  color: $color-text-secondary;
  margin-bottom: $spacing-lg;
}
</style>
