<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { useAppStore } from "@/stores/app"
import { useUserStore } from "@/stores/user"
import { Expand, Fold, FullScreen, Setting } from "@element-plus/icons-vue"

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

function goToSettings() {
  router.push('/settings')
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
</script>

<template>
  <div class="navbar">
    <div class="navbar-left">
      <el-button :icon="appStore.sidebarCollapsed ? Expand : Fold" text @click="appStore.toggleSidebar" />
      <el-breadcrumb separator="/" class="navbar-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.meta.title">
          {{ route.meta.title as string }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="navbar-right">
      <el-dropdown trigger="click" style="margin-right:4px">
        <el-button text>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu style="width:280px">
            <el-dropdown-item>
              <div style="display:flex;flex-direction:column;gap:8px;padding:4px 0">
                <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:600;color:var(--el-text-color-primary)">消息通知</span><el-tag size="small" type="danger" round>3</el-tag></div>
                <div style="padding:8px;background:var(--el-fill-color-light);border-radius:4px;font-size:12px;color:var(--el-text-color-regular);line-height:1.5">
                  <div style="font-weight:500">系统提醒</div>
                  <div>账号将于7天后过期</div>
                  <div style="font-size:11px;color:var(--el-text-color-secondary);margin-top:2px">2分钟前</div>
                </div>
                <div style="padding:8px;background:var(--el-fill-color-light);border-radius:4px;font-size:12px;color:var(--el-text-color-regular);line-height:1.5">
                  <div style="font-weight:500">订单提醒</div>
                  <div>5笔订单待处理</div>
                  <div style="font-size:11px;color:var(--el-text-color-secondary);margin-top:2px">1小时前</div>
                </div>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown><el-tooltip :content="appStore.darkMode ? '亮色模式' : '暗色模式'" placement="bottom">
        <el-button text @click="appStore.toggleDarkMode()">
          <svg v-if="!appStore.darkMode" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        </el-button>
      </el-tooltip>
      <el-tooltip content="全屏" placement="bottom">
        <el-button :icon="FullScreen" text />
      </el-tooltip>
      <el-tooltip content="全屏" placement="bottom">
        <el-button text @click="toggleFullscreen">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        </el-button>
      </el-tooltip>
      <el-tooltip content="系统设置" placement="bottom">
        <el-button :icon="Setting" text @click="goToSettings()" />
      </el-tooltip>
      <el-dropdown trigger="click">
        <span class="navbar-user">
          <el-avatar :size="28" icon="UserFilled" />
          <span class="navbar-username">{{ userStore.userInfo.nickname || "管理员" }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided @click="userStore.logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $navbar-height;
  padding: 0 $spacing-base;
  background: $color-bg-white;
  border-bottom: 1px solid $color-border-lighter;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.navbar-breadcrumb {
  margin-left: $spacing-xs;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
}

.navbar-user {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  cursor: pointer;
  padding: $spacing-xxs $spacing-xs;
  border-radius: $border-radius-base;
  transition: background $transition-duration-fast;

  &:hover {
    background: $color-bg-base;
  }
}

.navbar-username {
  font-size: $font-size-base;
  color: $color-text-primary;
}
</style>


