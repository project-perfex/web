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
      const getClassNameAndText = (value: string) => {
        switch (value) {
          case 'ADMIN':
            return {
              className: 'bg-violet-500',
              text: 'Administrador'
            }
          case 'USER':
            return {
              className: 'bg-gray-300 text-gray-500',
              text: 'Usuário'
            }
          case 'MODERATOR':
            return {
              className: 'bg-yellow-500',
              text: 'Moderador'
            }
          default:
            return {
              className: '',
              text: '-'
            }
        }
      }

      return (
        <span
          className={cn(
            `
            flex
            justify-center
            p-1
            w-28
            rounded-md
            font-semibold
            text-xs
            uppercase
            text-white
          `,
            getClassNameAndText(String(getValue())).className
          )}
        >
          {getClassNameAndText(String(getValue())).text}
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
