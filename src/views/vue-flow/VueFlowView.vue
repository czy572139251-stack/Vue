<script setup lang="ts">
import { ref, markRaw, nextTick } from "vue"
import { VueFlow, useVueFlow, type Node, type Edge } from "@vue-flow/core"
import { Controls } from "@vue-flow/controls"
import { Background, BackgroundVariant } from "@vue-flow/background"
import InputNode from "./components/InputNode.vue"
import DefaultNode from "./components/DefaultNode.vue"
import OutputNode from "./components/OutputNode.vue"

import "@vue-flow/core/dist/style.css"
import "@vue-flow/core/dist/theme-default.css"
import "@vue-flow/controls/dist/style.css"

const nodeTypes = markRaw({
  inputNode: InputNode,
  defaultNode: DefaultNode,
  outputNode: OutputNode,
}) as any

const initialNodes: Node[] = [
  { id: "1", type: "inputNode", position: { x: 250, y: 0 }, data: { label: "用户输入" } },
  { id: "2", type: "defaultNode", position: { x: 250, y: 120 }, data: { label: "数据处理" } },
  { id: "3", type: "defaultNode", position: { x: 350, y: 240 }, data: { label: "API 调用" } },
  { id: "4", type: "defaultNode", position: { x: 150, y: 240 }, data: { label: "数据验证" } },
  { id: "5", type: "outputNode", position: { x: 250, y: 360 }, data: { label: "输出结果" } },
]

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, label: "提交" },
  { id: "e2-3", source: "2", target: "3", animated: true, label: "转发" },
  { id: "e2-4", source: "2", target: "4", animated: true, label: "校验" },
  { id: "e3-5", source: "3", target: "5", animated: true, label: "返回" },
  { id: "e4-5", source: "4", target: "5", animated: true, label: "结果" },
]

const nodes = ref<Node[]>(JSON.parse(JSON.stringify(initialNodes)))
const edges = ref<Edge[]>(JSON.parse(JSON.stringify(initialEdges)))
const showGrid = ref(true)

const pageTitle = ref("流程图")
const pageDesc = ref("可视化流程编辑器，节点可拖拽")
const editingTitle = ref(false)
const editingDesc = ref(false)
const isEditing = ref(false)

import { ElMessageBox } from "element-plus"

function handleNodeClick(event: any) {
  if (!isEditing.value) return
  const node = event.node
  ElMessageBox.prompt("编辑节点名称", "节点编辑", {
    inputValue: node.data.label,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(({ value }: { value: string }) => {
    const n = nodes.value.find((n: any) => n.id === node.id)
    if (n) (n.data as any).label = value
  }).catch(() => {})
}

function toggleEditing() {
  isEditing.value = !isEditing.value
  ;(nodes.value as any).forEach(function(n: any) { n.data.editing = isEditing.value })
  if (!isEditing.value) {
    editingTitle.value = false
    editingDesc.value = false
  }
}

function startEditTitle() {
  editingTitle.value = true
  nextTick(() => {
    const el = document.querySelector('.editable-title input')
    if (el) (el as HTMLElement).focus()
  })
}

function startEditDesc() {
  editingDesc.value = true
  nextTick(() => {
    const el = document.querySelector('.editable-desc input')
    if (el) (el as HTMLElement).focus()
  })
}

const { fitView, zoomIn, zoomOut, zoomTo } = useVueFlow({ id: "vue-flow" })

function handleFitView() {
  fitView({ duration: 300 })
}

function handleZoomIn() {
  zoomIn({ duration: 200 })
}

function handleZoomOut() {
  zoomOut({ duration: 200 })
}

function handleZoomReset() {
  zoomTo(1, { duration: 200 })
  fitView({ duration: 300 })
}

function handleReset() {
  nodes.value = JSON.parse(JSON.stringify(initialNodes))
  edges.value = JSON.parse(JSON.stringify(initialEdges))
  setTimeout(() => {
    /* labels preserved */
    fitView({ duration: 300 })
  }, 50)
}
</script>

<template>
  <div class="page-container" style="display:flex;flex-direction:column;height:calc(100vh - 56px);padding:0">
    <div style="flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:20px 24px 0">
      <div>
        <template v-if="isEditing && editingTitle">
          <el-input v-model="pageTitle" size="small" style="width:200px;margin-bottom:4px" ref="titleInput"
            @keyup.enter="editingTitle = false" @blur="editingTitle = false" class="editable-title" />
        </template>
        <template v-else>
          <h2 style="font-size:18px;font-weight:600;color:#303133;margin-bottom:4px;cursor:pointer" @click="startEditTitle">{{ pageTitle }}</h2>
        </template>
        <template v-if="isEditing && editingDesc">
          <el-input v-model="pageDesc" size="small" style="width:300px" @keyup.enter="editingDesc = false" @blur="editingDesc = false" class="editable-desc" />
        </template>
        <template v-else>
          <p style="font-size:13px;color:#909399;cursor:pointer" @click="startEditDesc">{{ pageDesc }}</p>
        </template>
      </div>
    </div>

    <div style="flex:1;display:flex;flex-direction:column;padding:12px 24px 20px;min-height:0">
      <div style="flex-shrink:0;display:flex;align-items:center;gap:6px;padding:10px 0 12px;border-bottom:1px solid #ebeef5;margin-bottom:10px">
        <el-button-group>
          <el-tooltip content="自适应" placement="bottom">
            <el-button size="small" @click="handleFitView">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </el-button>
          </el-tooltip>
          <el-tooltip content="放大" placement="bottom">
            <el-button size="small" @click="handleZoomIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
              </svg>
            </el-button>
          </el-tooltip>
          <el-tooltip content="缩小" placement="bottom">
            <el-button size="small" @click="handleZoomOut">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35M8 11h6"/>
              </svg>
            </el-button>
          </el-tooltip>
          <el-tooltip content="编辑文字" placement="bottom">
            <el-button size="small" :type="isEditing ? 'primary' : ''" @click="toggleEditing">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
              </svg>
              <span style="margin-left:4px;font-size:12px">编辑</span>
            </el-button>
          </el-tooltip>

          <div style="width:1px;height:20px;background:var(--border-color);margin:0 4px"></div>

          <el-tooltip content="重置视图" placement="bottom">
            <el-button size="small" @click="handleZoomReset">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 4v6h6M23 20v-6h-6"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
            </el-button>
          </el-tooltip>
        </el-button-group>

        <div style="width:1px;height:20px;background:#dcdfe6;margin:0 4px"></div>

        <el-tooltip content="显示网格" placement="bottom">
          <el-button size="small" @click="showGrid = !showGrid">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
            </svg>
            <span style="margin-left:4px;font-size:12px">网格</span>
          </el-button>
        </el-tooltip>

        <div style="flex:1"></div>

        <el-tooltip content="重置布局" placement="bottom">
          <el-button size="small" @click="handleReset">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="23 4 23 10 17 10"/>
              <polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            <span style="margin-left:4px;font-size:12px">重置</span>
          </el-button>
        </el-tooltip>
      </div>

      <div style="flex:1;min-height:0;background:var(--bg-card);border:1px solid var(--border-color);border-radius:8px;overflow:hidden;position:relative">
        <VueFlow
          id="vue-flow"
          v-model:nodes="nodes"
          v-model:edges="edges"
          :node-types="nodeTypes"
          :fit-view-on-init="true"
          :default-edge-options="{ type: 'smoothstep', style: { stroke: '#bcc3cd', strokeWidth: 2 } }"
          @node-click="handleNodeClick"
        >
          <Controls />
          <Background v-if="showGrid" :variant="BackgroundVariant.Dots" :gap="16" :size="1" />
        </VueFlow>
      </div>
    </div>
  </div>
</template>