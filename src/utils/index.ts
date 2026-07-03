// 工具函数

/**
 * 格式化日期
 */
export function formatDate(date: Date | string | number, fmt = "YYYY-MM-DD HH:mm:ss"): string {
  const d = new Date(date);
  const o: Record<string, number> = {
    "Y+": d.getFullYear(),
    "M+": d.getMonth() + 1,
    "D+": d.getDate(),
    "H+": d.getHours(),
    "m+": d.getMinutes(),
    "s+": d.getSeconds(),
  };
  let result = fmt;
  for (const [k, v] of Object.entries(o)) {
    const match = new RegExp(`(${k})`).exec(result);
    if (match) {
      result = result.replace(match[1], String(v).padStart(match[1].length, "0"));
    }
  }
  return result;
}

/**
 * 生成随机 ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

/**
 * 深拷贝
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 防抖
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
