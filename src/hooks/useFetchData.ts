import { useState, useCallback } from 'react'
import { getUsers } from '@/modules/users/services/users'
import { Users } from '@/modules/users/types/users'
import { GetUsersPagination } from '@/modules/users/types/users'

const useFetchData = (meta: GetUsersPagination | undefined) => {
  const [data, setData] = useState<Users[]>([])

  const fetchData = useCallback(
    async (page: number) => {
      if (!meta) return
      const response = await getUsers({
        page: page,
        limit: meta.limit,
        total: meta.total
      })
      setData(response.data)
    },
    [meta]
  )

  return { data, fetchData, setData }
}

export default useFetchData
