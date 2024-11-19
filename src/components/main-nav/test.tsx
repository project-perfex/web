// src/components/nav-links/test.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { MainNav } from '.'

// Mock the usePathname function from Next.js
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}))

describe('MainNav Component', () => {
  it('renders the correct links and highlights the active one', () => {
    // Simulate the pathname value
    ;(usePathname as jest.Mock).mockReturnValue('/analytics')

    // Render the component
    render(<MainNav />)

    // Verify the main links are rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Clientes')).toBeInTheDocument()
    expect(screen.getByText('Financeiro')).toBeInTheDocument()
    expect(screen.getByText('E-commerce')).toBeInTheDocument()

    // Verify the active link is highlighted
    const activeLink = screen.getByText('Analytics')
    expect(activeLink).toHaveClass(
      'font-medium text-sm flex items-center gap-2 p-3 rounded-lg hover:bg-violet-500 hover:text-white bg-violet-500 text-white'
    )
  })

  it('renders the dropdown items for E-commerce', async () => {
    // Simulate the pathname value
    ;(usePathname as jest.Mock).mockReturnValue('/categories')

    // Render the component
    render(<MainNav />)

    // Verify the main E-commerce link exists
    const eCommerceLink = screen.getByText('E-commerce')
    expect(eCommerceLink).toBeInTheDocument()

    // Simulate opening the dropdown
    fireEvent.click(eCommerceLink)
    eCommerceLink.setAttribute('aria-expanded', 'true')
    const categoryLinks = await screen.findAllByText((content, element) => {
      return element?.textContent?.includes('Categorias') ?? false
    })
    expect(categoryLinks.length).toBeGreaterThan(0)

    // Verify the active link is highlighted
    const activeLink = screen.getByText('Categorias')
    expect(activeLink).toHaveClass('bg-violet-500 text-white')
  })
})
