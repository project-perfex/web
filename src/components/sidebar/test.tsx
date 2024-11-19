import { render, screen } from '@testing-library/react'
import { Sidebar } from '../sidebar'

jest.mock('../header', () => ({
  Header: () => <div data-testid="header-mock">Header Mock</div>
}))

jest.mock('../nav-links', () => ({
  NavLinks: () => <div data-testid="navlinks-mock">NavLinks Mock</div>
}))

describe('Sidebar Component', () => {
  it('should render the Header and NavLinks components', () => {
    render(<Sidebar />)

    expect(screen.getByTestId('header-mock')).toBeInTheDocument()

    expect(screen.getByTestId('navlinks-mock')).toBeInTheDocument()
  })

  it('should have the correct class for styling', () => {
    const { container } = render(<Sidebar />)
    expect(container.firstChild).toHaveClass('w-[300px] m-4')
  })
})
