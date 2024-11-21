import { useRouter } from 'next/navigation'

import { PlusCircle } from 'lucide-react'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/data-table'
import { columns } from './components/columns'
import { Filters } from './components/filters'

import { Users } from '@/modules/users/types/users'

interface UsersClientProps {
  data: Users[]
  setData: (data: Users[]) => void
}

export const UsersClient = ({ data, setData }: UsersClientProps) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Usuários" description="Gerenciamento de usuários" />

        <Button
          className="text-xs bg-violet-500"
          onClick={() => router.push(`/users/new`)}
        >
          <PlusCircle className="size-4" />
          Novo Usuário
        </Button>
      </div>
      <Separator />
      <Filters setData={setData} />
      <Separator />
      <div className="bg-white rounded-lg p-4">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}
