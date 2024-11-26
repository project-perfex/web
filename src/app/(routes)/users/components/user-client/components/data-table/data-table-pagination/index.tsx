import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { GetUsersPagination } from '@/modules/users/types/users'

interface PaginationMetaProps {
  page: number
  meta: GetUsersPagination
  handleNextPage: () => void
  handlePreviousPage: () => void
}

export const PaginationMeta = ({
  page,
  meta,
  handleNextPage,
  handlePreviousPage
}: PaginationMetaProps) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 bg-white p-4 rounded-lg">
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-gray-500">
            Página {page} de {Math.ceil(meta.total / meta.limit)}
          </span>
          <span className="text-sm text-gray-500 font-bold">
            Total: {meta.total} registro(s)
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            onClick={handlePreviousPage}
            disabled={page === 1}
            aria-label="arrowlefticon"
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
          <Button
            size="icon"
            onClick={handleNextPage}
            disabled={meta && page === Math.ceil(meta.total / meta.limit)}
            aria-label="arrowrighticon"
          >
            <ArrowRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
