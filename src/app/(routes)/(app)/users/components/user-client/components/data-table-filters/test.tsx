import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useSearchParams } from 'next/navigation'
import { getUsers } from '@/modules/users/services/users'
import { Filters } from '.'

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn()
}))

jest.mock('@/modules/users/services/users', () => ({
  getUsers: jest.fn()
}))

describe('<Filters />', () => {
  const setData = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the Filters component', () => {
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams())
    render(<Filters setData={setData} />)
    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument()
    expect(screen.getByText('Buscar')).toBeInTheDocument()
    expect(screen.getByText('Remover')).toBeInTheDocument()
  })

  it('submits the form with user input', async () => {
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams())
    ;(getUsers as jest.Mock).mockResolvedValue({ data: [] })

    render(<Filters setData={setData} />)

    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: 'John' }
    })
    fireEvent.change(screen.getByPlaceholderText('E-mail'), {
      target: { value: 'john@example.com' }
    })
    fireEvent.click(screen.getByText('Buscar'))

    await waitFor(() => {
      expect(getUsers).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
        name: 'John',
        email: 'john@example.com'
      })
      expect(setData).toHaveBeenCalledWith([])
    })
  })

  it('clears the filter', async () => {
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams())
    ;(getUsers as jest.Mock).mockResolvedValue({ data: [] })

    render(<Filters setData={setData} />)

    fireEvent.click(screen.getByText('Remover'))

    await waitFor(() => {
      expect(getUsers).toHaveBeenCalledWith({
        page: 1,
        limit: 10
      })
      expect(setData).toHaveBeenCalledWith([])
    })
  })
})
