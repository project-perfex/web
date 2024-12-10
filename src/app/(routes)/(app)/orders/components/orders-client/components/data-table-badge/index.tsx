import { OrderStatus } from '@/enums'
import { cn } from '@/lib/utils'

export interface StatusBadgeProps {
  bgColor: string
  label: string
}

const StatusBadge = ({ bgColor, label }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        `
          text-white
          text-xs
          font-semibold
          flex
          items-center
          justify-center
          w-[120px]
          p-1
          rounded-full
        `,
        `bg-${bgColor}`
      )}
    >
      {label}
    </span>
  )
}

export const RenderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const getStatusBadgeProps = (status: OrderStatus): StatusBadgeProps => {
    switch (status) {
      case OrderStatus.PENDING:
        return { bgColor: 'violet-500', label: 'Pendente' }
      case OrderStatus.SHIPPED:
        return { bgColor: 'orange-500', label: 'Enviado' }
      case OrderStatus.DELIVERED:
        return { bgColor: 'emerald-500', label: 'Entregue' }
      case OrderStatus.CANCELED:
        return { bgColor: 'rose-500', label: 'Cancelado' }
      default:
        return { bgColor: 'gray-500', label: 'Desconhecido' }
    }
  }

  const badgeProps = getStatusBadgeProps(status)

  return <StatusBadge {...badgeProps} />
}
