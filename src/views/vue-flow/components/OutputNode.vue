<script setup lang="ts">
import { Handle, Position } from "@vue-flow/core"
defineProps<{ data: { label: string; editing?: boolean }; id: string }>()
</script>
<template>
  <div class="output-node" :class="{ editing: data.editing }">
    <Handle type="target" :position="Position.Top" />
    <template v-if="data.editing"><span class="edit-icon">&#9998;</span></template>
    <div class="node-label">{{ data.label }}</div>
  </div>
</template>
<style scoped>
.output-node { background: #fde2e2; border: 2px solid #f56c6c; border-radius: 20px; padding: 10px 24px; color: #333; font-size: 13px; font-weight: 500; min-width: 120px; text-align: center; box-shadow: 0 2px 6px rgba(245,108,108,0.15); }
.output-node.editing { border-color: #409eff; border-style: dashed; }
.node-label { white-space: nowrap; }
.edit-icon { font-style: normal; margin-right: 4px; opacity: 0.6; }
</style>
