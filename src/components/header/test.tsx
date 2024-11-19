import { render, screen } from '@testing-library/react'
import { Header } from '.'

describe('<Header />', () => {
  it('should render the logo', () => {
    render(<Header />)
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument()
  })

  it('should render the link', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /logo/i })).toHaveAttribute(
      'href',
      '/'
    )
  })
})
