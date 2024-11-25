import { render, screen } from '@testing-library/react'
import { Sidebar } from '.'

jest.mock('../logo', () => ({
  Logo: () => <div data-testid="logo-mock">Logo Mock</div>
}))

jest.mock('../main-nav', () => ({
  MainNav: () => <div data-testid="mainnav-mock">Mainnav Mock</div>
}))

describe('Sidebar Component', () => {
  it('should render the Header and mainnav components', () => {
    render(<Sidebar />)

    expect(screen.getByTestId('logo-mock')).toBeInTheDocument()

    expect(screen.getByTestId('mainnav-mock')).toBeInTheDocument()
  })

  it('should have the correct class for styling', () => {
    const { container } = render(<Sidebar />)
    expect(container.firstChild).toHaveClass('w-[300px] m-4')
  })
})
