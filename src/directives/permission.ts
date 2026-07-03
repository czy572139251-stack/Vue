import { useUserStore } from "@/stores/user"

export const permission = {
  mounted(el: HTMLElement, binding: { value: string | string[] }) {
    const userStore = useUserStore()
    const perms = Array.isArray(binding.value) ? binding.value : [binding.value]
    if (!perms.some(p => userStore.hasPermission(p))) {
      el.parentNode?.removeChild(el)
    }
  },
}
