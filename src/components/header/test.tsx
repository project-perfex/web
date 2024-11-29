import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { Header } from '.'
import { useAuth } from '@/hooks/useAuth'

// Mocking dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  remove: jest.fn()
}))

jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn()
}))

jest.mock('../ui/button', () => ({
  Button: ({
    children,
    onClick
  }: {
    children: React.ReactNode
    onClick: () => void
  }) => <button onClick={onClick}>{children}</button>
}))

jest.mock('../ui/skeleton', () => ({
  Skeleton: ({ className }: { className: string }) => (
    <div className={className}></div>
  )
}))

describe('Header', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    jest.clearAllMocks()
  })

  it('renders correctly with userData', () => {
    ;(useAuth as jest.Mock).mockReturnValue({ userData: { name: 'John Doe' } })

    render(<Header />)

    expect(
      screen.getByText((content) => content.startsWith('Olá,'))
    ).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(
      screen.getByText((content) => content.includes('bem vindo!'))
    ).toBeInTheDocument()
  })

  it('renders correctly without userData', () => {
    ;(useAuth as jest.Mock).mockReturnValue({ userData: null })

    render(<Header />)

    expect(
      screen.getByText((content) => content.startsWith('Olá,'))
    ).toBeInTheDocument()
    expect(
      screen.getByText((content) => content.includes('bem vindo!'))
    ).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles logout correctly', () => {
    ;(useAuth as jest.Mock).mockReturnValue({ userData: { name: 'John Doe' } })
    ;(Cookies.get as jest.Mock).mockReturnValue('perfex-cookie')

    render(<Header />)

    fireEvent.click(screen.getByRole('button'))

    expect(Cookies.remove).toHaveBeenCalledWith(
      process.env.NEXT_PUBLIC_COOKIE_SECRET
    )
    expect(mockPush).toHaveBeenCalledWith('/')
  })
})
