<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

const features = [
  {
    title: "Vue 3",
    desc: "采用 Vue 3 Composition API，组合式逻辑复用，性能更优",
    icon: "vue",
    color: "#42b883",
  },
  {
    title: "TypeScript",
    desc: "全量 TypeScript，类型安全，代码可维护性更强",
    icon: "ts",
    color: "#3178c6",
  },
  {
    title: "Element Plus",
    desc: "基于 Element Plus 组件库，高质量 UI，开箱即用",
    icon: "element",
    color: "#409eff",
  },
  {
    title: "Vite",
    desc: "新一代构建工具，极速冷启动，热更新毫秒级响应",
    icon: "vite",
    color: "#646cff",
  },
  {
    title: "Pinia",
    desc: "Vue 官方推荐状态管理，更简洁的类型安全方案",
    icon: "pinia",
    color: "#ffd859",
  },
  {
    title: "Axios",
    desc: "强大的 HTTP 客户端，拦截器机制，统一错误处理",
    icon: "axios",
    color: "#5a29e4",
  },
]
</script>

<template>
  <div class="welcome-page">
    <!-- Hero 区域 -->
    <div class="hero-section">
      <div class="hero-badge">
        <el-tag type="primary" effect="dark" round>v1.0.0</el-tag>
      </div>
      <h1 class="hero-title">管理系统</h1>
      <p class="hero-subtitle">
        Vue 3 + TypeScript + Element Plus
      </p>
      <p class="hero-desc">
        新一代企业级后台管理平台，开箱即用，高效开发
      </p>
      <div class="hero-actions">
        <el-button type="primary" size="large" @click="router.push('/dashboard')">
          进入仪表盘
        </el-button>
        <el-button size="large" @click="router.push('/order')">
          查看订单
        </el-button>
      </div>
    </div>

    <!-- 特性区域 -->
    <div class="features-section">
      <h2 class="section-title">技术栈</h2>
      <p class="section-desc">基于主流前端技术构建，稳定可靠</p>

      <div class="features-grid">
        <div
          v-for="(item, index) in features"
          :key="index"
          class="feature-card"
          :style="{ '--card-accent': item.color }"
        >
          <div class="feature-icon" :style="{ background: item.color + '15', color: item.color }">
            <template v-if="item.icon === 'vue'">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </template>
            <template v-else-if="item.icon === 'ts'">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <path d="M9 12h6"/>
                <path d="M12 9v6"/>
              </svg>
            </template>
            <template v-else-if="item.icon === 'element'">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="4" y="4" width="16" height="16" rx="3"/>
                <path d="M8 12h8"/>
                <path d="M12 8v8"/>
              </svg>
            </template>
            <template v-else-if="item.icon === 'vite'">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
              </svg>
            </template>
            <template v-else-if="item.icon === 'pinia'">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2C8 2 4 5 4 8c0 3 2 6 8 10 6-4 8-7 8-10 0-3-4-6-8-6z"/>
              </svg>
            </template>
            <template v-else>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </template>
          </div>
          <h3 class="feature-title">{{ item.title }}</h3>
          <p class="feature-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <div class="footer-section">
      <p>管理系统 · 基于 Vue 3 构建</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.welcome-page {
  min-height: 100%;
}

// ---- Hero ----
.hero-section {
  text-align: center;
  padding: 60px 40px 48px;
  background: linear-gradient(180deg, #f0f5ff 0%, $color-bg-white 100%);

  .hero-badge {
    margin-bottom: $spacing-base;
  }

  .hero-title {
    font-size: 40px;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    letter-spacing: 4px;
    margin-bottom: $spacing-sm;
  }

  .hero-subtitle {
    font-size: 18px;
    color: $color-primary;
    font-weight: $font-weight-medium;
    margin-bottom: $spacing-xs;
  }

  .hero-desc {
    font-size: $font-size-base;
    color: $color-text-secondary;
    margin-bottom: $spacing-lg;
  }

  .hero-actions {
    display: flex;
    gap: $spacing-sm;
    justify-content: center;
  }
}

// ---- 特性 ----
.features-section {
  padding: 40px 40px 20px;
  max-width: 1100px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 24px;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: $spacing-xs;
}

.section-desc {
  text-align: center;
  font-size: $font-size-base;
  color: $color-text-secondary;
  margin-bottom: $spacing-xl;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  background: $color-bg-white;
  border-radius: $border-radius-medium;
  padding: $spacing-lg;
  border: 1px solid $color-border-lighter;
  transition: all $transition-duration-base $transition-function;

  &:hover {
    border-color: var(--card-accent);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
}

.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: $border-radius-base;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: $spacing-base;
}

.feature-title {
  font-size: $font-size-medium;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: $spacing-xs;
}

.feature-desc {
  font-size: $font-size-small;
  color: $color-text-secondary;
  line-height: 1.6;
}

// ---- 页脚 ----
.footer-section {
  text-align: center;
  padding: 32px 40px;
  color: $color-text-placeholder;
  font-size: $font-size-small;
}
</style>
