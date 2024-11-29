import React from 'react'
import { render, screen } from '@testing-library/react'
import { LoadingState } from '.'

describe('LoadingState', () => {
  const mockColumns = [{}, {}, {}]

  test('renders loading spinner', () => {
    render(<LoadingState columns={mockColumns} />)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
  })

  test('renders loading text', () => {
    render(<LoadingState columns={mockColumns} />)
    const loadingText = screen.getByText('Carregando...')
    expect(loadingText).toBeInTheDocument()
  })

  test('renders correct number of skeletons in table header', () => {
    render(<LoadingState columns={mockColumns} />)
    const headerSkeletons = screen.getAllByRole('columnheader')
    expect(headerSkeletons).toHaveLength(mockColumns.length)
  })

  test('renders correct number of skeletons in table body', () => {
    render(<LoadingState columns={mockColumns} />)
    const bodySkeletons = screen.getAllByRole('cell')
    expect(bodySkeletons).toHaveLength(mockColumns.length * 5)
  })
})
