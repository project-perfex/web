import InputMask from 'react-input-mask'

import { Input } from '../ui/input'

interface PhoneInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  value: string
  disabled: boolean
  name: string
  ref: React.RefCallback<HTMLInputElement>
}

export const PhoneInput = ({
  onChange,
  onBlur,
  value,
  disabled,
  name,
  ref
}: PhoneInputProps) => {
  return (
    <InputMask
      mask="(99) 99999-9999"
      placeholder="(XX) XXXXX-XXXX"
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      disabled={disabled}
    >
      {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
        <Input {...inputProps} type="tel" name={name} ref={ref} />
      )}
    </InputMask>
  )
}
