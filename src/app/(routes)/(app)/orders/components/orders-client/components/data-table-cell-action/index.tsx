'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import toast from 'react-hot-toast'

import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { AlertModal } from '@/components/alert-modal'

import { Orders } from '@/modules/orders/types/orders'
import { deleteOrder } from '@/modules/orders/services/orders'

interface CellActionProps {
  data: Orders
}

export const CellAction = ({ data }: CellActionProps) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const onDelete = async () => {
    try {
      setLoading(true)
      await deleteOrder(`${data.id}`)
      router.refresh()
      router.push(`/orders`)
      toast.success('Registro excluido com sucesso!')
      window.location.reload()
    } catch (error) {
      toast.error('Houve um erro ao excluir o registro!')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              router.push(`/orders/${data.id}`)
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            <span className="sr-only">Editar</span>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-red-500"
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            <span className="sr-only">Excluir</span>
            Excluir
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              router.push(`/orders/order-details/${data.id}`)
            }}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span className="sr-only">Detalhes</span>
            Detalhes
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}