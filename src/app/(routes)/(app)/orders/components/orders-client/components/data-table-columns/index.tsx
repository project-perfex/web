'use client'

import { ColumnDef } from '@tanstack/react-table'

import { format } from 'date-fns'

import { CellAction } from '../data-table-cell-action'

import { Orders } from '@/modules/orders/types/orders'

import { StatusBadge } from '../data-table-status-badge'

import { OrderStatus } from '@/enums'

export const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: 'title',
    header: 'Título'
  },
  {
    accessorKey: 'status',
    header: 'Staus',
    cell: ({ row }) => {
      switch (row.original.status) {
        case OrderStatus.PENDING:
        case OrderStatus.SHIPPED:
        case OrderStatus.DELIVERED:
        case OrderStatus.CANCELED:
          return <StatusBadge status={row.original.status as OrderStatus} />
        default:
          return <span>Desconhecido</span>
      }
    }
  },
  {
    accessorKey: 'payment',
    header: 'Tipo de pagamento',
    cell: ({ row }) => {
      return <span>{row.original.payment}</span>
    }
  },
  {
    accessorKey: 'userId',
    header: 'Usuário',
    cell: ({ row }) => {
      return <span>{row.original.user?.name ?? 'Sem usuário'}</span>
    }
  },
  {
    accessorKey: 'customerId',
    header: 'Cliente',
    cell: ({ row }) => {
      return <span>{row.original.customer?.name ?? 'Sem cliente'}</span>
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
