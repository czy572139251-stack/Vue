<script setup lang="ts">
import { watch } from "vue"
import { useRoute } from "vue-router"
import Sidebar from "./components/Sidebar.vue"
import Navbar from "./components/Navbar.vue"
import TagsView from "./components/TagsView.vue"
import { useAppStore } from "@/stores/app"

const route = useRoute()
const appStore = useAppStore()

watch(() => route.name, (name) => {
  if (name) appStore.addVisitedView(name as string)
}, { immediate: true })
</script>

<template>
  <div class="layout" :class="{ collapsed: appStore.sidebarCollapsed }">
    <Sidebar />
    <div class="layout-main">
      <Navbar />
      <TagsView />
      <main class="layout-content">
        <router-view v-slot="{ Component }">
          <keep-alive :include="appStore.visitedViews">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;
.layout { min-height: 100vh; }
.layout-main { margin-left: $sidebar-width; transition: margin-left $transition-duration-base $transition-function; min-height: 100vh; display: flex; flex-direction: column; }
.layout.collapsed .layout-main { margin-left: $sidebar-collapsed-width; }
.layout-content { flex: 1; background: var(--bg-page); overflow-y: auto; }
</style>
