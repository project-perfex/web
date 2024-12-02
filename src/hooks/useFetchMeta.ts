import { useState, useEffect } from 'react'

const useFetchMeta = <T>(getDataFetch: () => Promise<{ meta: T }>) => {
  const [meta, setMeta] = useState<T | undefined>()

  useEffect(() => {
    const fetchMeta = async () => {
      const response = await getDataFetch()
      setMeta(response.meta)
    }

    fetchMeta()
  }, [getDataFetch])

  return meta
}

export default useFetchMeta
