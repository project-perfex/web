/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from '@testing-library/react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '.'

// Mock components
jest.mock('./data-table-loading', () => ({
  LoadingState: () => <div>Carregando...</div>
}))

jest.mock('./data-table-content', () => ({
  DataTable: ({ data }: { data: TestData[] }) =>
    data.length === 0 ? (
      <div>Carregando...</div>
    ) : (
      <div>
        {data.map((row: TestData, index: number) => (
          <div key={index}>{row.name}</div>
        ))}
      </div>
    )
}))

jest.mock('./data-table-content', () => ({
  DataTableContent: ({ table }: { table: any }) => (
    <div>
      {table
        .getRowModel()
        .rows.map((row: { id: string; original: TestData }) => (
          <div key={row.id}>{row.original.name}</div>
        ))}
    </div>
  )
}))

interface TestData {
  name: string
}

const columns: ColumnDef<TestData, any>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  }
]

const data: TestData[] = [{ name: 'John Doe' }, { name: 'Jane Smith' }]

describe('DataTable', () => {
  it('renders data after loading', async () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.queryByText(/Carregando.../i)).not.toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })
})
