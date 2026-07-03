<script setup lang="ts">
import { useRouter, useRoute } from "vue-router"
import { useAppStore } from "@/stores/app"
import { Document } from "@element-plus/icons-vue"

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()

function handleMenuSelect(index: string) {
  router.push(index)
}
</script>

<template>
  <div class="sidebar" :class="{ collapsed: appStore.sidebarCollapsed }">
    <div class="sidebar-logo">
      <el-icon :size="24" color="#409eff"><Document /></el-icon>
      <span v-show="!appStore.sidebarCollapsed" class="sidebar-title">管理系统</span>
    </div>

    <el-menu
      :default-active="route.path"
      :collapse="appStore.sidebarCollapsed"
      :router="false"
      background-color="transparent"
      @select="handleMenuSelect"
    >
      <template v-for="item in appStore.menuList" :key="item.path">
        <el-menu-item :index="item.path">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: $sidebar-width;
  height: 100vh;
  background: $color-bg-white;
  border-right: 1px solid $color-border-lighter;
  transition: width $transition-duration-base $transition-function;
  overflow: hidden;
  z-index: 100;
  display: flex;
  flex-direction: column;

  &.collapsed {
    width: $sidebar-collapsed-width;
  }
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  height: $navbar-height;
  padding: 0 $spacing-base;
  border-bottom: 1px solid $color-border-lighter;
  flex-shrink: 0;

  .sidebar-title {
    font-size: $font-size-medium;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    white-space: nowrap;
    overflow: hidden;
  }
}

.el-menu {
  border-right: none;
  flex: 1;
  overflow-y: auto;
}
</style>
