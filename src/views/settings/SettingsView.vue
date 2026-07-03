<script setup lang="ts">
import { reactive } from "vue"
import { ElMessage } from "element-plus"

const form = reactive({
  siteName: "管理系统",
  siteDesc: "新一代企业级后台管理平台",
  logoUrl: "",
  loginBg: "linear-gradient(135deg, #409eff 0%, #6366f1 100%)",
  recordNumber: "",
  enableRegister: false,
  pageSize: 10,
})

function save() {
  ElMessage.success("设置已保存")
}
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2>系统设置</h2>
      <p>管理系统基本配置和偏好</p>
    </div>

    <div class="page-card">
      <el-form :model="form" label-width="140px" style="max-width:600px">
        <h3 style="font-size:15px;font-weight:600;margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid #ebeef5">基本设置</h3>

        <el-form-item label="站点名称">
          <el-input v-model="form.siteName" />
        </el-form-item>
        <el-form-item label="站点描述">
          <el-input v-model="form.siteDesc" type="textarea" :rows="2" />
        </el-form-item>
        <el-form-item label="Logo URL">
          <el-input v-model="form.logoUrl" placeholder="留空使用默认 Logo" />
        </el-form-item>
        <el-form-item label="备案号">
          <el-input v-model="form.recordNumber" placeholder="如：沪ICP备xxxxxx号" />
        </el-form-item>

        <h3 style="font-size:15px;font-weight:600;margin:24px 0 16px;padding-bottom:8px;border-bottom:1px solid #ebeef5">功能设置</h3>

        <el-form-item label="允许注册">
          <el-switch v-model="form.enableRegister" />
        </el-form-item>
        <el-form-item label="每页条数">
          <el-select v-model="form.pageSize" style="width:120px">
            <el-option :value="10" label="10 条" />
            <el-option :value="20" label="20 条" />
            <el-option :value="50" label="50 条" />
            <el-option :value="100" label="100 条" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="save">保存设置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>