import request from "../request"
import type { PaginationParams, PaginatedData, User } from "@/types"

export function getUsers(params: PaginationParams & { keyword?: string }) {
  return request<PaginatedData<User>>({
    url: "/users",
    method: "get",
    params,
  })
}

export function createUser(data: Partial<User>) {
  return request({
    url: "/users",
    method: "post",
    data,
  })
}

export function updateUser(id: number, data: Partial<User>) {
  return request({
    url: `/users/${id}`,
    method: "put",
    data,
  })
}

export function deleteUser(id: number) {
  return request({
    url: `/users/${id}`,
    method: "delete",
  })
}
