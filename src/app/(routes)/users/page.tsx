'use client'

import { useEffect, useState } from 'react'

import { UsersClient } from './components/user-client'

import { getUsers } from '@/modules/users/services/users'

import { Users } from '@/modules/users/types/users'

const UsersPage = () => {
  const [data, setData] = useState<Users[]>([])

  const fetchData = async () => {
    const response = await getUsers({
      page: 1,
      limit: 10
    })
    setData(response.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsersClient data={data} setData={setData} />
      </div>
    </div>
  )
}

export default UsersPage
