import { render, fireEvent } from '@testing-library/react'
import { CustomInput } from '.'

describe('CustomInput Component with defaultProps', () => {
  const mockOnChange = jest.fn()
  const mockOnBlur = jest.fn()
  const defaultProps = {
    onChange: mockOnChange,
    onBlur: mockOnBlur,
    value: '',
    name: 'test-input',
    ref: jest.fn()
  }

  it('applies defaultProps correctly', () => {
    const { getByPlaceholderText } = render(
      <CustomInput {...defaultProps} placeholder="Enter text" />
    )
    const inputElement = getByPlaceholderText('Enter text')
    expect(inputElement).toHaveAttribute('name', 'test-input')
    expect(inputElement).toHaveAttribute('value', '')
  })

  it('triggers onChange event with defaultProps', () => {
    const { getByPlaceholderText } = render(
      <CustomInput {...defaultProps} placeholder="Enter text" />
    )
    const inputElement = getByPlaceholderText('Enter text')
    fireEvent.change(inputElement, { target: { value: '123' } })
    expect(mockOnChange).toHaveBeenCalled()
  })

  it('triggers onBlur event with defaultProps', () => {
    const { getByPlaceholderText } = render(
      <CustomInput {...defaultProps} placeholder="Enter text" />
    )
    const inputElement = getByPlaceholderText('Enter text')
    fireEvent.blur(inputElement)
    expect(mockOnBlur).toHaveBeenCalled()
  })
})
