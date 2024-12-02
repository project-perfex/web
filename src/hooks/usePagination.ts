import { useState } from 'react'

interface PaginationMeta {
  total: number
}

const usePagination = <T extends PaginationMeta>(meta: T | undefined) => {
  const [page, setPage] = useState(1)

  const handleNextPage = () => {
    if (meta && page < meta.total) {
      setPage(page + 1)
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  return { page, handleNextPage, handlePreviousPage, setPage }
}

export default usePagination
