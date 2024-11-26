import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const maskValue = (value: string): string => {
  // Exemplo de máscara para número de telefone (formato: (XX) XXXX-XXXX)
  return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
}
