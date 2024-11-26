import React from 'react'
import InputMask from 'react-input-mask-next'
import { Input } from '../ui/input'

interface CustomInputProps {
  mask?: string
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  value?: string
  disabled?: boolean
  type?: string
  name?: string
}

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    { mask, placeholder, onChange, onBlur, value, disabled, type, name },
    ref
  ) => {
    return mask ? (
      <InputMask
        mask={mask}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
      >
        <Input type={type} name={name} ref={ref} />
      </InputMask>
    ) : (
      <Input
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        name={name}
        ref={ref}
        type={type}
        placeholder={placeholder}
      />
    )
  }
)

CustomInput.displayName = 'CustomInput'
