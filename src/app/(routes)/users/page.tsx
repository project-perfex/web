'use client'

import { useEffect } from 'react'

import useFetchData from '@/hooks/useFetchData'
import useFetchMeta from '@/hooks/useFetchMeta'
import usePagination from '@/hooks/usePagination'

import { PaginationMeta } from '@/app/(routes)/users/components/user-client/components/data-table/data-table-pagination'
import { UsersClient } from './components/user-client'

const UsersPage = () => {
  const meta = useFetchMeta()
  const { data, fetchData, setData } = useFetchData(meta)
  const { page, handleNextPage, handlePreviousPage } = usePagination(meta)

  useEffect(() => {
    if (meta) {
      fetchData(page)
    }
  }, [meta, page, fetchData])

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsersClient data={data} setData={setData} />
        <PaginationMeta
          page={page}
          meta={meta || { page: 1, limit: 10, total: 0 }}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </div>
    </div>
  )
}

export default UsersPage
