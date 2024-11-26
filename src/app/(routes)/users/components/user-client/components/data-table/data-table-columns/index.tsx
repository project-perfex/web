'use client'

import { ColumnDef } from '@tanstack/react-table'

import { format } from 'date-fns'

import { CellAction } from '../data-table-cell-action'

import { Users } from '@/modules/users/types/users'

import { cn, maskValue } from '@/lib/utils'

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
      return <span>{maskValue(String(getValue())) || '-'}</span>
    }
  },
  {
    accessorKey: 'role',
    header: 'Tipo',
    cell: ({ getValue }) => {
      const getClassName = (value: string) => {
        switch (value) {
          case 'ADMIN':
            return 'bg-emerald-500'
          case 'USER':
            return 'bg-gray-300 text-gray-500'
          case 'MODERATOR':
            return 'bg-orange-500'
          default:
            return '-'
        }
      }

      return (
        <span
          className={cn(
            `
            flex
            justify-center
            p-1
            w-24
            rounded-md
            font-semibold
            text-xs
            uppercase
            text-white
          `,
            getClassName(String(getValue()))
          )}
        >
          {String(getValue())}
        </span>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Data criação',
    cell: ({ getValue }) => {
      return (
        <span>
          {format(new Date(getValue() as string), 'dd/MM/yyyy HH:mm:ss')}
        </span>
      )
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Data atualização',
    cell: ({ getValue }) => {
      return (
        <span>
          {format(new Date(getValue() as string), 'dd/MM/yyyy HH:mm:ss')}
        </span>
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
