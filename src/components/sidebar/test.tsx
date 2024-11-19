import { render, screen } from '@testing-library/react'
import { Sidebar } from '.'

jest.mock('../header', () => ({
  Header: () => <div data-testid="header-mock">Header Mock</div>
}))

jest.mock('../main-nav', () => ({
  MainNav: () => <div data-testid="mainnav-mock">Mainnav Mock</div>
}))

describe('Sidebar Component', () => {
  it('should render the Header and mainnav components', () => {
    render(<Sidebar />)

    expect(screen.getByTestId('header-mock')).toBeInTheDocument()

    expect(screen.getByTestId('mainnav-mock')).toBeInTheDocument()
  })

  it('should have the correct class for styling', () => {
    const { container } = render(<Sidebar />)
    expect(container.firstChild).toHaveClass('w-[300px] m-4')
  })
})
