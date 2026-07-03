<script setup lang="ts">
import { ref, reactive } from "vue"
import { useUserStore } from "@/stores/user"
import { ElMessage } from "element-plus"

const userStore = useUserStore()
const activeTab = ref("info")

const form = reactive({
  nickname: userStore.userInfo.nickname || "",
  email: userStore.userInfo.email || "",
  phone: userStore.userInfo.phone || "",
})

const passwordForm = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
})

function saveInfo() {
  userStore.updateProfile({ nickname: form.nickname, email: form.email, phone: form.phone })
  ElMessage.success("保存成功")
}

function changePassword() {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    ElMessage.error("两次输入的密码不一致")
    return
  }
  ElMessage.success("密码修改成功")
  passwordForm.oldPassword = ""
  passwordForm.newPassword = ""
  passwordForm.confirmPassword = ""
}
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2>个人中心</h2>
      <p>管理您的个人信息和账号安全</p>
    </div>

    <div style="display:flex;gap:24px;flex-wrap:wrap">
      <el-card style="width:280px;flex-shrink:0;text-align:center">
        <el-avatar :size="80" icon="UserFilled" style="margin:16px auto;display:block" />
        <h3 style="margin-bottom:4px;font-size:16px">{{ userStore.userInfo.nickname }}</h3>
        <p style="font-size:13px;color:#909399;margin-bottom:8px">{{ userStore.userInfo.roleLabel }}</p>
        <el-tag :type="userStore.userInfo.status === 1 ? 'success' : 'danger'" size="small" effect="plain">
          {{ userStore.userInfo.status === 1 ? "正常" : "禁用" }}
        </el-tag>
      </el-card>

      <el-card style="flex:1;min-width:400px">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="基本信息" name="info">
            <el-form :model="form" label-width="80px" style="max-width:460px;margin-top:16px">
              <el-form-item label="用户名">
                <el-input :model-value="userStore.userInfo.username" disabled />
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="form.nickname" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.email" />
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="form.phone" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveInfo">保存修改</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="password">
            <el-form :model="passwordForm" label-width="100px" style="max-width:460px;margin-top:16px">
              <el-form-item label="当前密码">
                <el-input v-model="passwordForm.oldPassword" type="password" show-password />
              </el-form-item>
              <el-form-item label="新密码">
                <el-input v-model="passwordForm.newPassword" type="password" show-password />
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input v-model="passwordForm.confirmPassword" type="password" show-password />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="changePassword">修改密码</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>