<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()
</script>

<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-illustration">
        <svg width="320" height="240" viewBox="0 0 320 240" fill="none">
          <rect x="60" y="20" width="200" height="180" rx="16" fill="#fef0f0" stroke="#fde2e2" stroke-width="2"/>
          <text x="160" y="140" text-anchor="middle" font-size="72" font-weight="700" fill="#f56c6c">500</text>
          <text x="160" y="170" text-anchor="middle" font-size="16" fill="#909399">Internal Server Error</text>
          <path d="M100 190 Q120 200 140 190 Q160 180 180 190 Q200 200 220 190" stroke="#f56c6c" stroke-width="2" fill="none" stroke-linecap="round"/>
          <circle cx="90" cy="50" r="8" fill="#f56c6c" opacity="0.3"/>
          <circle cx="230" cy="55" r="6" fill="#f56c6c" opacity="0.3"/>
          <circle cx="260" cy="100" r="5" fill="#f56c6c" opacity="0.2"/>
          <circle cx="55" cy="130" r="7" fill="#f56c6c" opacity="0.2"/>
        </svg>
      </div>
      <h2 class="error-title">服务器错误</h2>
      <p class="error-desc">抱歉，服务器遇到了一些问题，请稍后重试</p>
      <el-button type="danger" size="large" @click="router.push('/')">返回首页</el-button>
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
