import { render, screen, fireEvent } from '@testing-library/react'
import { AlertModal } from '.'

describe('AlertModal', () => {
  const onClose = jest.fn()
  const onConfirm = jest.fn()

  it('renders the modal when isOpen is true', () => {
    render(
      <AlertModal
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
        loading={false}
      />
    )
    expect(screen.getByText('Deseja excluir?')).toBeInTheDocument()
    expect(
      screen.getByText('Está ação não poderá ser desfeita.')
    ).toBeInTheDocument()
  })

  it('does not render the modal when isOpen is false', () => {
    render(
      <AlertModal
        isOpen={false}
        onClose={onClose}
        onConfirm={onConfirm}
        loading={false}
      />
    )
    expect(screen.queryByText('Deseja excluir?')).not.toBeInTheDocument()
  })

  it('calls onClose when the Cancelar button is clicked', () => {
    render(
      <AlertModal
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
        loading={false}
      />
    )
    fireEvent.click(screen.getByText('Cancelar'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onConfirm when the Continuar button is clicked', () => {
    render(
      <AlertModal
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
        loading={false}
      />
    )
    fireEvent.click(screen.getByText('Continuar'))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('disables buttons when loading is true', () => {
    render(
      <AlertModal
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
        loading={true}
      />
    )
    expect(screen.getByText('Cancelar')).toBeDisabled()
    expect(screen.getByText('Continuar')).toBeDisabled()
  })
})
