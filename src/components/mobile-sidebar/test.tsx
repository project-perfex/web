import React from 'react'
import { render, screen } from '@testing-library/react'
import { MobileSidebar } from './index'

describe('MobileSidebar', () => {
  it('renders Menu component', () => {
    render(<MobileSidebar />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
