'use client'

import { ColumnDef } from '@tanstack/react-table'

import { format } from 'date-fns'

import { CellAction } from '../data-table-cell-action'

import { Opportunities } from '@/modules/opportunities/types/opportunities'

import { formatPrice } from '@/lib/utils'
import { OpportunityStatus } from '@/enums'
import { StatusBadge } from '../data-table-status-badge'

export const columns: ColumnDef<Opportunities>[] = [
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
    accessorKey: 'status',
    header: 'Staus',
    cell: ({ row }) => {
      switch (row.original.status) {
        case OpportunityStatus.OPEN:
        case OpportunityStatus.INPROGRESS:
        case OpportunityStatus.ONHOLD:
        case OpportunityStatus.CLOSED:
          return (
            <StatusBadge status={row.original.status as OpportunityStatus} />
          )
        default:
          return <span>Desconhecido</span>
      }
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
