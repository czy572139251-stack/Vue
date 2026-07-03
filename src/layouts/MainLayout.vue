<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue"
import Navbar from "./components/Navbar.vue"
import { useAppStore } from "@/stores/app"

const appStore = useAppStore()
</script>

<template>
  <div class="layout" :class="{ collapsed: appStore.sidebarCollapsed }">
    <Sidebar />
    <div class="layout-main">
      <Navbar />
      <main class="layout-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.layout {
  min-height: 100vh;

  .layout-main {
    margin-left: $sidebar-width;
    transition: margin-left $transition-duration-base $transition-function;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  &.collapsed .layout-main {
    margin-left: $sidebar-collapsed-width;
  }
}

.layout-content {
  flex: 1;
  background: var(--bg-page);
  overflow-y: auto;
}
</style>
