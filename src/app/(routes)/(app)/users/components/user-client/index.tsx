import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { PlusCircle } from 'lucide-react'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  GetUsersPagination,
  UserRole,
  Users
} from '@/modules/users/types/users'
import { getUsers } from '@/modules/users/services/users'

import { Filters } from '@/app/(routes)/(app)/users/components/user-client/components/data-table-filters'
import { columns } from './components/data-table-columns'
import { PaginationMeta } from '@/components/data-table/data-table-pagination'
import { DataTable } from '@/components/data-table'

import { useAuth } from '@/hooks/useAuth'
import useFetchMeta from '@/hooks/useFetchMeta'
import useFetchData from '@/hooks/useFetchData'
import usePagination from '@/hooks/usePagination'

export const UsersClient = () => {
  const router = useRouter()
  const { userData } = useAuth()

  const meta = useFetchMeta<GetUsersPagination>(getUsers)
  const { data, fetchData, setData } = useFetchData<Users>(getUsers, meta)
  const { page, handleNextPage, handlePreviousPage } = usePagination(meta)

  useEffect(() => {
    if (meta) {
      fetchData(page)
    }
  }, [meta, page, fetchData])

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Usuários" description="Gerenciamento de usuários" />

        {userData?.role.includes(UserRole.ADMIN) && (
          <Button className="text-xs" onClick={() => router.push(`/users/new`)}>
            <PlusCircle className="size-4" />
            Novo Usuário
          </Button>
        )}
      </div>
      <Separator />
      <Filters setData={setData} />
      <Separator />
      <div className="bg-white rounded-lg p-4">
        <DataTable columns={columns} data={data} />
        <PaginationMeta
          page={page}
          meta={meta || { page: 1, limit: 10, total: 0 }}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </div>
    </>
  )
}
