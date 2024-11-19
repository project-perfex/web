import React from 'react'
import { render } from '@testing-library/react'
import { NavItem } from '.'
import { usePathname } from 'next/navigation'

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}))

const MockIcon = () => <svg data-testid="mock-icon" />

describe('NavItem', () => {
  it('renders correctly', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/test-path')

    const route = {
      icon: MockIcon,
      href: '/test-path',
      name: 'Test Name'
    }

    const { getByText, getByTestId } = render(<NavItem route={route} />)

    expect(getByText('Test Name')).toBeInTheDocument()
    expect(getByTestId('mock-icon')).toBeInTheDocument()
    expect(getByText('Test Name').closest('a')).toHaveAttribute(
      'href',
      '/test-path'
    )
  })

  it('applies correct classes based on pathname', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/test-path')

    const route = {
      icon: MockIcon,
      href: '/test-path',
      name: 'Test Name'
    }

    const { getByText } = render(<NavItem route={route} />)

    expect(getByText('Test Name').closest('a')).toHaveClass(
      'bg-violet-500 text-white'
    )
  })

  it('applies hover classes', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/another-path')

    const route = {
      icon: MockIcon,
      href: '/test-path',
      name: 'Test Name'
    }

    const { getByText } = render(<NavItem route={route} />)

    expect(getByText('Test Name').closest('a')).toHaveClass(
      'hover:bg-violet-500 hover:text-white'
    )
  })
})
