'use client'

import { ColumnDef } from '@tanstack/react-table'

import { format } from 'date-fns'

import { CellAction } from '../data-table-cell-action'
import { Products } from '@/modules/products/types/product'
import { formatPrice } from '@/lib/utils'

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: 'title',
    header: 'Título'
  },
  {
    accessorKey: 'price',
    header: 'Preço',
    cell: ({ row }) => {
      return <span>{formatPrice(row.original.price)}</span>
    }
  },
  {
    accessorKey: 'description',
    header: 'Descrição'
  },
  {
    accessorKey: 'categoryId',
    header: 'Categoria',
    cell: ({ row }) => {
      return <span>{row.original.category?.title ?? 'Sem categoria'}</span>
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
