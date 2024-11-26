import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { PaginationMeta } from '.'

describe('PaginationMeta', () => {
  const handleNextPage = jest.fn()
  const handlePreviousPage = jest.fn()
  const meta = { total: 100, page: 1, limit: 10 }

  const renderComponent = (page: number) => {
    render(
      <PaginationMeta
        page={page}
        meta={meta}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    )
  }

  test('renders correctly', () => {
    renderComponent(1)
    expect(screen.getByText('Página 1 de 10')).toBeInTheDocument()
    expect(screen.getByText('Total: 100 registro(s)')).toBeInTheDocument()
  })

  test('previous button is disabled on first page', () => {
    renderComponent(1)
    expect(
      screen.getByRole('button', { name: /arrowlefticon/i })
    ).toBeDisabled()
  })

  test('next button is disabled on last page', () => {
    renderComponent(10)
    expect(
      screen.getByRole('button', { name: /arrowrighticon/i })
    ).toBeDisabled()
  })

  test('calls handleNextPage when next button is clicked', () => {
    renderComponent(1)
    const nextButton = screen.getByRole('button', { name: /arrowrighticon/i })
    fireEvent.click(nextButton)
    expect(handleNextPage).toHaveBeenCalledTimes(1)
  })

  test('calls handlePreviousPage when previous button is clicked', () => {
    renderComponent(2)
    const prevButton = screen.getByRole('button', { name: /arrowlefticon/i })
    fireEvent.click(prevButton)
    expect(handlePreviousPage).toHaveBeenCalledTimes(1)
  })
})
