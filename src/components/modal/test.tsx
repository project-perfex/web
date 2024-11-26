import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Modal from '.'

describe('Modal Component', () => {
  const title = 'Test Title'
  const description = 'Test Description'
  const children = <div>Test Children</div>
  const onClose = jest.fn()

  it('should render correctly with given props', () => {
    render(
      <Modal
        title={title}
        description={description}
        isOpen={true}
        onClose={onClose}
      >
        {children}
      </Modal>
    )

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
    expect(screen.getByText('Test Children')).toBeInTheDocument()
  })

  it('should call onClose when closed', () => {
    render(
      <Modal
        title={title}
        description={description}
        isOpen={true}
        onClose={onClose}
      >
        {children}
      </Modal>
    )

    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalled()
  })

  it('should display the correct title and description', () => {
    render(
      <Modal
        title={title}
        description={description}
        isOpen={true}
        onClose={onClose}
      >
        {children}
      </Modal>
    )

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })
})
