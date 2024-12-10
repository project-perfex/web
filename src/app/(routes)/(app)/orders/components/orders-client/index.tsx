import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { PlusCircle } from 'lucide-react'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PaginationMeta } from '@/components/data-table/data-table-pagination'

import { DataTable } from '@/components/data-table'

import { useAuth } from '@/hooks/useAuth'
import useFetchMeta from '@/hooks/useFetchMeta'
import useFetchData from '@/hooks/useFetchData'
import usePagination from '@/hooks/usePagination'

import { UserRole } from '@/modules/users/types/users'
import { GetOrdersPagination, Orders } from '@/modules/orders/types/orders'
import { getOrders } from '@/modules/orders/services/orders'

import { Filters } from './components/data-table-filters'
import { columns } from './components/data-table-columns'

export const OrdersClient = () => {
  const router = useRouter()
  const { userData } = useAuth()

  const meta = useFetchMeta<GetOrdersPagination>(getOrders)
  const { data, fetchData, setData } = useFetchData<Orders>(getOrders, meta)
  const { page, handleNextPage, handlePreviousPage } = usePagination(meta)

  useEffect(() => {
    if (meta) {
      fetchData(page)
    }
  }, [meta, page, fetchData])

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Pedidos" description="Gerenciamento de pedidos" />

        {userData?.role.includes(UserRole.ADMIN) && (
          <Button
            className="text-xs"
            onClick={() => router.push(`/orders/new`)}
          >
            <PlusCircle className="size-4" />
            Novo pedido
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
