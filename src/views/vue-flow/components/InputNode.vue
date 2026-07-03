<script setup lang="ts">
import { Handle, Position } from "@vue-flow/core"
defineProps<{ data: { label: string; editing?: boolean }; id: string }>()
</script>
<template>
  <div class="input-node" :class="{ editing: data.editing }">
    <Handle type="source" :position="Position.Bottom" />
    <template v-if="data.editing"><span class="edit-icon">&#9998;</span></template>
    <div class="node-label">{{ data.label }}</div>
  </div>
</template>
<style scoped>
.input-node { background: #e1f3d8; border: 2px solid #67c23a; border-radius: 20px; padding: 10px 24px; color: #333; font-size: 13px; font-weight: 500; min-width: 120px; text-align: center; box-shadow: 0 2px 6px rgba(103,194,58,0.15); }
.input-node.editing { border-color: #409eff; border-style: dashed; }
.node-label { white-space: nowrap; }
.edit-icon { font-style: normal; margin-right: 4px; opacity: 0.6; }
</style>
