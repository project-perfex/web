import { OpportunityStatus } from '@/enums'
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

export const RenderStatusBadge = ({
  status
}: {
  status: OpportunityStatus
}) => {
  const getStatusBadgeProps = (status: OpportunityStatus): StatusBadgeProps => {
    switch (status) {
      case OpportunityStatus.OPEN:
        return { bgColor: 'emerald-500', label: 'Aberto' }
      case OpportunityStatus.INPROGRESS:
        return { bgColor: 'orange-500', label: 'Em progresso' }
      case OpportunityStatus.ONHOLD:
        return { bgColor: 'violet-500', label: 'Em analise' }
      case OpportunityStatus.CLOSED:
        return { bgColor: 'rose-500', label: 'Fechado' }
      default:
        return { bgColor: 'gray-500', label: 'Desconhecido' }
    }
  }

  const badgeProps = getStatusBadgeProps(status)

  return <StatusBadge {...badgeProps} />
}
