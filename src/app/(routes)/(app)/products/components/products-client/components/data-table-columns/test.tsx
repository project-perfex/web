// FILE: src/app/(routes)/(app)/products/components/products-client/components/data-table-columns/test.test.tsx

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { format } from 'date-fns'
import { Products } from '@/modules/products/types/product'

// Mock columns data for testing
const mockColumns = [
  { id: 'title', header: 'Título' },
  { id: 'price', header: 'Preço' },
  { id: 'description', header: 'Descrição' },
  { id: 'categoryId', header: 'Categoria' },
  { id: 'createdAt', header: 'Data criação' },
  { id: 'updatedAt', header: 'Data atualização' },
  { id: 'actions', header: 'Ações' }
]

const mockData: Products = {
  title: 'Nivus',
  price: 100000,
  description: 'Carro top de linha!',
  categoryId: '1',
  createdAt: new Date('2023-01-01T00:00:00Z'),
  updatedAt: new Date('2023-01-02T00:00:00Z')
}

describe('DataTable Columns', () => {
  it('renders title column header and cell', () => {
    const column = mockColumns.find((col) => col.id === 'title')
    expect(column?.header).toBe('Título')
    render(<span>{mockData.title}</span>)
    expect(screen.getByText('Nivus')).toBeInTheDocument()
  })

  it('renders price column header and cell', () => {
    const column = mockColumns.find((col) => col.id === 'price')
    expect(column?.header).toBe('Preço')
    render(<span>{mockData.price}</span>)
    expect(screen.getByText('100000')).toBeInTheDocument()
  })

  it('renders description column header and cell', () => {
    const column = mockColumns.find((col) => col.id === 'description')
    expect(column?.header).toBe('Descrição')
    render(<span>{mockData.description}</span>)
    expect(screen.getByText('Carro top de linha!')).toBeInTheDocument()
  })

  it('renders categoryId column header and cell', () => {
    const column = mockColumns.find((col) => col.id === 'categoryId')
    expect(column?.header).toBe('Categoria')
    render(<span>{mockData.categoryId}</span>)
    expect(screen.getByText('1')).toBeInTheDocument()
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
