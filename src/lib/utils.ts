import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMonth(month: number): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
  return months[month - 1] || 'Jan'
}

export function duplicateValidation(array: string[], item: string): string[] {
  if (array.includes(item)) {
    return array.filter(existingItem => existingItem !== item)
  }
  return [...array, item]
}
