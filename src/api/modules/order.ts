import request from "../request"
import type { PaginationParams, PaginatedData, Order } from "@/types"

export function getOrders(params: PaginationParams & { keyword?: string; status?: string }) {
  return request<PaginatedData<Order>>({
    url: "/orders",
    method: "get",
    params,
  })
}

export function getOrderDetail(id: number) {
  return request<Order>({
    url: `/orders/${id}`,
    method: "get",
  })
}

export function updateOrderStatus(id: number, status: string) {
  return request({
    url: `/orders/${id}/status`,
    method: "put",
    data: { status },
  })
}
