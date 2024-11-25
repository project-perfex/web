import { useState, useEffect } from 'react'
import { getUsers } from '@/modules/users/services/users'
import { GetUsersPagination } from '@/modules/users/types/users'

const useFetchMeta = () => {
  const [meta, setMeta] = useState<GetUsersPagination>()

  useEffect(() => {
    const fetchMeta = async () => {
      const response = await getUsers()
      setMeta(response.meta)
    }

    fetchMeta()
  }, [])

  return meta
}

export default useFetchMeta
