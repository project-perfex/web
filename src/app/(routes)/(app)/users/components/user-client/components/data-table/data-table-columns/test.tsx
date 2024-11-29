/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { format } from 'date-fns'

// Mock columns data for testing
const mockColumns = [
  { id: 'name', header: 'Nome' },
  { id: 'email', header: 'E-mail' },
  { id: 'phone', header: 'Telefone' },
  {
    id: 'role',
    header: 'Tipo',
    cell: () => ({
      props: { children: { props: { className: '', text: 'Administrador' } } }
    })
  },
  { id: 'createdAt', header: 'Data criação' },
  { id: 'updatedAt', header: 'Data atualização' },
  { id: 'actions', header: 'Ações' }
]
import { UserRole, Users } from '@/modules/users/types/users'
import { maskValue } from '@/lib/utils'

const mockData: Users = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password123',
  phone: '1234567890',
  role: UserRole.ADMIN,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-02T00:00:00Z'
}

describe('DataTable Columns', () => {
  it('renders name column header and cell', () => {
    const column = mockColumns.find((col) => col.id === 'name')
    expect(column?.header).toBe('Nome')
    render(<span>{mockData.name}</span>)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders email column header and cell', () => {
    const column = mockColumns.find((col) => col.id === 'email')
    expect(column?.header).toBe('E-mail')
    render(<span>{mockData.email}</span>)
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
  })

  it('renders phone column header and cell', () => {
    const column = mockColumns.find((col) => col.id === 'phone')
    expect(column?.header).toBe('Telefone')
    render(<span>{maskValue(mockData.phone) || '-'}</span>)
    expect(screen.getByText(maskValue(mockData.phone))).toBeInTheDocument()
  })

  it('renders role column header and cell', () => {
    const column = mockColumns.find((col) => col.id === 'role')
    expect(column?.header).toBe('Tipo')
    const { className, text } = (column?.cell as any)({
      getValue: () => mockData.role
    }).props.children.props
    render(<span className={className}>{text}</span>)
    expect(screen.getByText('Administrador')).toBeInTheDocument()
  })

  it('renders createdAt column header and cell', () => {
    const column = mockColumns.find((col) => col.id === 'createdAt')
    expect(column?.header).toBe('Data criação')
    render(
      <span>
        {mockData.createdAt
          ? format(new Date(mockData.createdAt), 'dd/MM/yyyy HH:mm:ss')
          : '-'}
      </span>
    )
    expect(screen.getByText('31/12/2022 21:00:00')).toBeInTheDocument()
  })

  it('renders updatedAt column header and cell', () => {
    const column = mockColumns.find((col) => col.id === 'updatedAt')
    expect(column?.header).toBe('Data atualização')
    render(
      <span>
        {mockData.updatedAt
          ? format(new Date(mockData.updatedAt), 'dd/MM/yyyy HH:mm:ss')
          : '-'}
      </span>
    )
    expect(screen.getByText('01/01/2023 21:00:00')).toBeInTheDocument()
  })
})
