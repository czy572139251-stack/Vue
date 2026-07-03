<script setup lang="ts">
import { onMounted } from "vue"
import { useAppStore } from "@/stores/app"
const appStore = useAppStore()
onMounted(() => {
  if (appStore.darkMode) document.documentElement.classList.add("dark")
})
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@use "@/styles/index.scss";
</style>