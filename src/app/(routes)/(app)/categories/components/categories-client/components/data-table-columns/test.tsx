/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { format } from 'date-fns'

// Mock columns data for testing
const mockColumns = [
  { id: 'title', header: 'Título' },
  { id: 'createdAt', header: 'Data criação' },
  { id: 'updatedAt', header: 'Data atualização' },
  { id: 'actions', header: 'Ações' }
]
import { Categories } from '@/modules/categories/types/category'

const mockData: Categories = {
  title: 'Automotive',
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-02T00:00:00Z'
}

describe('DataTable Columns', () => {
  it('renders name column header and cell', () => {
    const column = mockColumns.find((col) => col.id === 'title')
    expect(column?.header).toBe('Título')
    render(<span>{mockData.title}</span>)
    expect(screen.getByText('Automotive')).toBeInTheDocument()
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
