import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useSearchParams } from 'next/navigation'
import { getCategories } from '@/modules/categories/services/category'
import { Filters } from '.'

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn()
}))

jest.mock('@/modules/categories/services/category', () => ({
  getCategories: jest.fn()
}))

describe('<Filters />', () => {
  const setData = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the Filters component', () => {
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams())
    render(<Filters setData={setData} />)
    expect(screen.getByPlaceholderText('Título')).toBeInTheDocument()
    expect(screen.getByText('Buscar')).toBeInTheDocument()
    expect(screen.getByText('Remover')).toBeInTheDocument()
  })

  it('submits the form with category input', async () => {
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams())
    ;(getCategories as jest.Mock).mockResolvedValue({ data: [] })

    render(<Filters setData={setData} />)

    fireEvent.change(screen.getByPlaceholderText('Título'), {
      target: { value: 'Automotive' }
    })

    fireEvent.click(screen.getByText('Buscar'))

    await waitFor(() => {
      expect(getCategories).toHaveBeenCalledWith({
        page: 1,
        limit: 5,
        title: 'Automotive'
      })
      expect(setData).toHaveBeenCalledWith([])
    })
  })

  it('clears the filter', async () => {
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams())
    ;(getCategories as jest.Mock).mockResolvedValue({ data: [] })

    render(<Filters setData={setData} />)

    fireEvent.click(screen.getByText('Remover'))

    await waitFor(() => {
      expect(getCategories).toHaveBeenCalledWith({
        page: 1,
        limit: 5
      })
      expect(setData).toHaveBeenCalledWith([])
    })
  })
})
