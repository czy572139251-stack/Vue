// API 响应结构
export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
}

// 分页参数
export interface PaginationParams {
  page: number
  pageSize: number
}

// 分页响应
export interface PaginatedData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 菜单项
export interface MenuItem {
  path: string
  name: string
  title: string
  icon?: string
  children?: MenuItem[]
}

// 权限定义
export interface Permission {
  key: string
  name: string
  description?: string
}

// 角色
export interface Role {
  id: number
  name: string
  label: string
  permissions: string[]
  description: string
  userCount: number
  status: 0 | 1
}

// 用户
export interface User {
  id: number
  username: string
  nickname: string
  email: string
  phone: string
  avatar: string
  role: string
  roleLabel?: string
  permissions?: string[]
  status: 0 | 1
  createTime: string
  lastLoginTime: string
}

// 订单
export interface Order {
  id: number
  orderNo: string
  userName: string
  productName: string
  amount: number
  status: "pending" | "processing" | "completed" | "cancelled"
  createTime: string
  updateTime: string
}

// 仪表盘统计
export interface DashboardStats {
  totalUsers: number
  totalOrders: number
  totalRevenue: number
  activeUsers: number
}
