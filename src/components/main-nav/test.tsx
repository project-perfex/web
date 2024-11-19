import { render, screen, fireEvent } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { MainNav } from '.'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}))

describe('MainNav Component', () => {
  it('renders the correct links and highlights the active one', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/analytics')

    render(<MainNav />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Financeiro')).toBeInTheDocument()
    expect(screen.getByText('Usuários')).toBeInTheDocument()
    expect(screen.getByText('E-commerce')).toBeInTheDocument()

    const activeLink = screen.getByText('Analytics')
    expect(activeLink).toHaveClass(
      'font-medium text-sm flex items-center gap-2 p-3 rounded-lg hover:bg-violet-500 hover:text-white bg-violet-500 text-white'
    )
  })

  it('renders the dropdown items for E-commerce', async () => {
    ;(usePathname as jest.Mock).mockReturnValue('/categories')

    render(<MainNav />)

    const eCommerceLink = screen.getByText('E-commerce')
    expect(eCommerceLink).toBeInTheDocument()

    fireEvent.click(eCommerceLink)
    eCommerceLink.setAttribute('aria-expanded', 'true')
    const categoryLinks = await screen.findAllByText((content, element) => {
      return element?.textContent?.includes('Categorias') ?? false
    })
    expect(categoryLinks.length).toBeGreaterThan(0)

    const activeLink = screen.getByText('Categorias')
    expect(activeLink).toHaveClass('bg-violet-500 text-white')
  })
})
