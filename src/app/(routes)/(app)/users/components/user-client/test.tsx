import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import useFetchMeta from '@/hooks/useFetchMeta'
import useFetchData from '@/hooks/useFetchData'
import usePagination from '@/hooks/usePagination'
import { UserRole } from '@/modules/users/types/users'
import { UsersClient } from '.'

// Mock hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn()
}))
jest.mock('@/hooks/useAuth')
jest.mock('@/hooks/useFetchMeta')
jest.mock('@/hooks/useFetchData')
jest.mock('@/hooks/usePagination')

describe('UsersClient', () => {
  const mockPush = jest.fn()
  const mockFetchData = jest.fn()
  const mockHandleNextPage = jest.fn()
  const mockHandlePreviousPage = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      query: {},
      get: jest.fn(() => undefined)
    })
    ;(useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => null)
    })
    ;(useAuth as jest.Mock).mockReturnValue({
      userData: { role: [UserRole.ADMIN] }
    })
    ;(useFetchMeta as jest.Mock).mockReturnValue({
      page: 1,
      limit: 10,
      total: 0
    })
    ;(useFetchData as jest.Mock).mockReturnValue({
      data: [],
      fetchData: mockFetchData,
      setData: jest.fn()
    })
    ;(usePagination as jest.Mock).mockReturnValue({
      page: 1,
      handleNextPage: mockHandleNextPage,
      handlePreviousPage: mockHandlePreviousPage
    })
  })

  it('renders correctly', () => {
    render(<UsersClient />)
    expect(screen.getByText('Usuários')).toBeInTheDocument()
    expect(screen.getByText('Gerenciamento de usuários')).toBeInTheDocument()
  })

  it('displays "Novo Usuário" button for admin users', () => {
    render(<UsersClient />)
    expect(screen.getByText('Novo Usuário')).toBeInTheDocument()
  })

  it('does not display "Novo Usuário" button for non-admin users', () => {
    ;(useAuth as jest.Mock).mockReturnValue({ userData: { role: [] } })
    render(<UsersClient />)
    expect(screen.queryByText('Novo Usuário')).not.toBeInTheDocument()
  })

  it('calls fetchData on component mount and when meta or page changes', () => {
    render(<UsersClient />)
    expect(mockFetchData).toHaveBeenCalledWith(1)
  })

  it('calls handleNextPage when next page button is clicked', () => {
    render(<UsersClient />)
    fireEvent.click(screen.getByLabelText('arrowrighticon'))
    expect(mockHandleNextPage).toHaveBeenCalled()
  })
})
