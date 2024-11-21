'use client'

import { ColumnDef } from '@tanstack/react-table'

import { format } from 'date-fns'

import { CellAction } from './cell-action'

import { Users } from '@/modules/users/types/users'
import { cn } from '@/lib/utils'

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: 'name',
    header: 'Nome'
  },
  {
    accessorKey: 'email',
    header: 'E-mail'
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
    cell: ({ getValue }) => {
      return <span>{String(getValue()) || '-'}</span>
    }
  },
  {
    accessorKey: 'role',
    header: 'Tipo',
    cell: ({ getValue }) => {
      return (
        <span
          className={cn(
            `
            flex
            justify-center
            p-1
            w-16
            rounded-md
            font-semibold
            text-xs
            uppercase
            text-white
        `,
            getValue() === 'ADMIN' && 'bg-emerald-500',
            getValue() === 'USER' && 'bg-gray-500'
          )}
        >
          {String(getValue()) === 'ADMIN' ? 'Admin' : 'Usuário'}
        </span>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Data criação',
    cell: ({ getValue }) => {
      return <span>{format(new Date(getValue() as string), 'dd/MM/yyyy')}</span>
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Data atualização',
    cell: ({ getValue }) => {
      return <span>{format(new Date(getValue() as string), 'dd/MM/yyyy')}</span>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
