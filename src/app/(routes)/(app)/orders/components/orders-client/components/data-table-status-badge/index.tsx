import { OrderStatus } from '@/enums'
import { RenderStatusBadge } from '../data-table-badge'

interface StatusBadgeProps {
  status: OrderStatus
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <RenderStatusBadge status={status} />
}
