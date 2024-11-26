import { render, screen } from '@testing-library/react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '.'

interface TestData {
  id: number
  name: string
}

const columns: ColumnDef<TestData, unknown>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  }
]

const data: TestData[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
]

describe('<DataTable />', () => {
  it('renders table with data', async () => {
    render(<DataTable columns={columns} data={data} />)
    expect(await screen.findByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  })

  it('displays no data message when data is empty', async () => {
    render(<DataTable columns={columns} data={[]} />)
    expect(
      await screen.findByText('Nenhuma dado encontrado!')
    ).toBeInTheDocument()
  })
})
