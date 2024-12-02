/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { useReactTable, getCoreRowModel } from '@tanstack/react-table'
import { DataTableContent } from '.'

describe('DataTableContent Columns', () => {
  const columns = [
    {
      header: 'Name',
      cell: (info: any) => info.row.original.name
    },
    {
      header: 'Age',
      cell: (info: any) => info.row.original.age
    }
  ]

  it('should have correct column headers', () => {
    expect(columns[0].header).toBe('Name')
    expect(columns[1].header).toBe('Age')
  })

  it('should have cell render functions', () => {
    expect(typeof columns[0].cell).toBe('function')
    expect(typeof columns[1].cell).toBe('function')
  })

  it('should render correct values in cells', () => {
    const data = [
      { name: 'John Doe', age: 28 },
      { name: 'Jane Doe', age: 32 }
    ]

    const TestComponent = () => {
      const instance = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
      })

      return <DataTableContent table={instance} columns={columns} />
    }

    render(<TestComponent />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('28')).toBeInTheDocument()
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('32')).toBeInTheDocument()
  })
})
