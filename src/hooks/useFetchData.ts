import { useState, useCallback } from 'react'

interface Pagination {
  page: number
  limit: number
  total: number
}

const useFetchData = <T>(
  getDataFetch: (pagination: Pagination) => Promise<{ data: T[] }>,
  meta: Pagination | undefined
) => {
  const [data, setData] = useState<T[]>([])

  const fetchData = useCallback(
    async (page: number) => {
      if (!meta) return
      const response = await getDataFetch({
        page: page,
        limit: meta.limit,
        total: meta.total
      })
      setData(response.data)
    },
    [meta, getDataFetch]
  )

  return { data, fetchData, setData }
}

export default useFetchData
