import { render, screen } from '@testing-library/react'
import { Logo } from '.'

describe('<Header />', () => {
  it('should render the logo', () => {
    render(<Logo />)
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument()
  })

  it('should render the link', () => {
    render(<Logo />)
    expect(screen.getByRole('link', { name: /logo/i })).toHaveAttribute(
      'href',
      '/'
    )
  })
})
