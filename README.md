# 企业级后台管理系统

<div align="center">
  <img src="https://img.shields.io/badge/Vue_3-4FC08D?logo=vue.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Element_Plus-409EFF?logo=element&logoColor=white" />
  <img src="https://img.shields.io/badge/ECharts-FD6B35?logo=echarts&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white" />
</div>

```bash
# 启动方式
npm install && npm run dev
```

## 技术栈

| 层面 | 技术 |
|------|------|
| 框架 | Vue 3 (Composition API) + TypeScript |
| 构建 | Vite |
| UI 组件 | Element Plus |
| 图表 | ECharts + vue-echarts |
| 状态管理 | Pinia |
| 路由 | Vue Router 4 |
| HTTP | Axios |
| 样式 | SCSS + CSS Variables |
| 流程图 | @vue-flow/core |
| 代码规范 | TypeScript strict mode |

## 功能

- **仪表盘** — ECharts 折线图、环形图实时展示运营数据
- **流程编辑器** — 基于 @vue-flow 的可拖拽流程图，支持缩放、网格
- **个人中心** — 头像、昵称、邮箱、改密码
- **角色权限管理** — 角色 CRUD、按角色分配权限、`v-permission` 指令级权限控制
- **系统设置** — 站点名称、描述、Logo、备案号、功能配置
- **操作日志** — 系统操作记录，分页查看
- **消息通知** — 导航栏通知下拉面板
- **暗色模式** — 一键切换亮色/暗色主题，状态持久化
- **多标签导航** — 页面标签页，keep-alive 保持状态
- **全屏模式** — 全屏操作
- **设计 Token 系统** — 统一管理颜色、字号、间距、圆角

## 快速开始

```bash
# 克隆
git clone https://github.com/czy572139251-stack/Vue.git

# 安装依赖
cd admin-system && npm install

# 启动开发服务器
npm run dev

# 构建生产
npm run build
```

默认登录账号：`admin` / `123456`

## 目录结构

```
src/
├── api/           HTTP 请求
├── assets/        静态资源
├── components/    公共组件
├── directives/    自定义指令 (v-permission)
├── layouts/      布局（侧边栏、顶栏、标签栏）
├── router/       路由 + 守卫
├── stores/       状态管理
├── styles/       设计 Tokens + 主题
├── types/        TypeScript 类型
├── utils/        工具函数
└── views/        页面
    ├── dashboard/    仪表盘
    ├── welcome/      欢迎页
    ├── profile/      个人中心
    ├── settings/     系统设置
    ├── role/         角色管理
    ├── log/          操作日志
    ├── vue-flow/     流程图
    ├── order/        订单管理
    ├── user/         用户管理
    ├── login/        登录
    └── error/        404/500
```

## 暗色模式

点击导航栏月亮/太阳图标切换，支持全部页面和 Element Plus 组件，设置保存在 localStorage。
