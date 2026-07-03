<script setup lang="ts">
import { Handle, Position } from "@vue-flow/core"
defineProps<{ data: { label: string; editing?: boolean }; id: string }>()
</script>
<template>
  <div class="default-node" :class="{ editing: data.editing }">
    <Handle type="target" :position="Position.Top" />
    <template v-if="data.editing"><span class="edit-icon">&#9998;</span></template>
    <div class="node-label">{{ data.label }}</div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
<style scoped>
.default-node { background: #d9ecff; border: 2px solid #409eff; border-radius: 8px; padding: 12px 24px; color: #333; font-size: 13px; font-weight: 500; min-width: 140px; text-align: center; box-shadow: 0 2px 6px rgba(64,158,255,0.15); }
.default-node.editing { border-color: #409eff; border-style: dashed; }
.node-label { white-space: nowrap; }
.edit-icon { font-style: normal; margin-right: 4px; opacity: 0.6; }
</style>
