import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind class names safely.
 * `cn('px-4', condition && 'px-8')` → resolves conflicts so px-8 wins.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
