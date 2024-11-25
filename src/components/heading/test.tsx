import { render } from '@testing-library/react'

import { Heading } from '.'

describe('Heading Component', () => {
  it('renders the title correctly', () => {
    const { getByText } = render(
      <Heading title="Heading" description="Description" />
    )

    expect(getByText(/heading/i)).toBeInTheDocument()
    expect(getByText(/description/i)).toBeInTheDocument()
  })
})
