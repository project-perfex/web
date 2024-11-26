/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import { DataTable } from '.'

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info: any) => info.getValue() as string | number
  },
  {
    accessorKey: 'age',
    header: 'Age',
    cell: (info: any) => info.getValue()
  }
]

const data = [
  { name: 'John Doe', age: 28 },
  { name: 'Jane Doe', age: 32 }
]

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('28')).toBeInTheDocument()
    expect(screen.getByText('32')).toBeInTheDocument()
  })

  it('displays no data message when data is empty', () => {
    render(<DataTable columns={columns} data={[]} />)
    expect(screen.getByText('Nenhuma dado encontrado!')).toBeInTheDocument()
  })
})
