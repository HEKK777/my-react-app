import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并 Tailwind CSS 类名的工具函数
 *
 * 结合 clsx 和 tailwind-merge 的功能，用于智能合并 Tailwind CSS 类名
 * 可以处理条件类名、冲突类名等情况
 *
 * @param inputs - 类名数组或对象（支持条件类名）
 * @returns 合并后的类名字符串
 *
 * @example
 * ```tsx
 * cn('px-2 py-1', is_active && 'bg-blue-500', 'hover:bg-blue-600')
 * // 输出: "px-2 py-1 bg-blue-500 hover:bg-blue-600"
 *
 * cn('text-red-500', 'text-blue-500')
 * // 输出: "text-blue-500" (后者覆盖前者)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
