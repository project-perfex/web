import { RenderStatusBadge } from '../data-table-badge'

import { OpportunityStatus } from '@/enums'

interface StatusBadgeProps {
  status: OpportunityStatus
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <RenderStatusBadge status={status} />
}
