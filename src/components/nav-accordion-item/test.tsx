import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { NavAccordionItem } from '.'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}))

const mockRoute = {
  icon: () => <svg data-testid="icon" />,
  href: '/test',
  name: 'Test Route',
  children: [
    {
      icon: () => <svg data-testid="child-icon" />,
      href: '/test/child',
      name: 'Child Route'
    }
  ]
}

describe('NavAccordionItem', () => {
  beforeEach(() => {
    ;(usePathname as jest.Mock).mockReturnValue('/test')
  })

  it('renders correctly', () => {
    render(<NavAccordionItem route={mockRoute} />)

    expect(screen.getByText('Test Route')).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('applies active class when pathname matches route href', () => {
    render(<NavAccordionItem route={mockRoute} />)

    const trigger = screen.getByText('Test Route')
    expect(trigger).toHaveClass('flex items-start gap-2')
  })

  it('displays child routes when accordion is expanded', () => {
    render(<NavAccordionItem route={mockRoute} />)

    const trigger = screen.getByText('Test Route')
    fireEvent.click(trigger)

    expect(screen.getByText('Child Route')).toBeInTheDocument()
    expect(screen.getByTestId('child-icon')).toBeInTheDocument()
  })
})
