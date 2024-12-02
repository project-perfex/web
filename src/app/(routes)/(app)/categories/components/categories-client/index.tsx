import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { PlusCircle } from 'lucide-react'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PaginationMeta } from '@/components/data-table/data-table-pagination'
import { columns } from './components/data-table-columns'

import { useAuth } from '@/hooks/useAuth'
import useFetchMeta from '@/hooks/useFetchMeta'
import useFetchData from '@/hooks/useFetchData'
import usePagination from '@/hooks/usePagination'
import {
  Categories,
  GetCategoriesPagination
} from '@/modules/categories/types/category'
import { getCategories } from '@/modules/categories/services/category'
import { UserRole } from '@/modules/users/types/users'
import { DataTable } from '@/components/data-table'

import { Filters } from './components/data-table-filters'

export const CategoriesClient = () => {
  const router = useRouter()
  const { userData } = useAuth()

  const meta = useFetchMeta<GetCategoriesPagination>(getCategories)
  const { data, fetchData, setData } = useFetchData<Categories>(
    getCategories,
    meta
  )
  const { page, handleNextPage, handlePreviousPage } = usePagination(meta)

  useEffect(() => {
    if (meta) {
      fetchData(page)
    }
  }, [meta, page, fetchData])

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Categorias" description="Gerenciamento de categorias" />

        {userData?.role.includes(UserRole.ADMIN) && (
          <Button
            className="text-xs"
            onClick={() => router.push(`/categories/new`)}
          >
            <PlusCircle className="size-4" />
            Nova Categoria
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
