import { memo } from 'react'

import { OrderStatus } from '@/enums'

import { cn } from '@/lib/utils'

export interface StatusBadgeProps {
  bgColor: string
  label: string
}

const StatusBadge = memo(({ bgColor, label }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        'text-white text-xs font-semibold flex items-center justify-center w-[120px] p-1 rounded-full',
        `bg-${bgColor}`
      )}
    >
      {label}
    </span>
  )
})

StatusBadge.displayName = 'StatusBadge'

const statusBadgeMap: Record<OrderStatus, StatusBadgeProps> = {
  [OrderStatus.PENDING]: { bgColor: 'violet-500', label: 'Pendente' },
  [OrderStatus.SHIPPED]: { bgColor: 'orange-500', label: 'Enviado' },
  [OrderStatus.DELIVERED]: { bgColor: 'emerald-500', label: 'Entregue' },
  [OrderStatus.CANCELED]: { bgColor: 'rose-500', label: 'Cancelado' }
}

export const RenderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const badgeProps = statusBadgeMap[status] || {
    bgColor: 'gray-500',
    label: 'Desconhecido'
  }

  return <StatusBadge {...badgeProps} />
}
