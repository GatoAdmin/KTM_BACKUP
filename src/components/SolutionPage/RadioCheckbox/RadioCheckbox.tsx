import React from 'react';
import {
  RadioCheckboxContainer,
  CheckboxIconContainer,
  CheckboxInput,
  CheckboxLabel,
  CheckedIcon,
  UnCheckedIcon,
} from './RadioCheckbox.style';

interface RadioCheckboxProps {
  id: string | number;
  value?: string;
  checked?: boolean;
  group?: string;
  data?:string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioCheckbox: React.FC<RadioCheckboxProps> = ({
  id,
  value,
  checked,
  group,
  onChange,
  children,
}) => (
  <RadioCheckboxContainer>
    <CheckboxInput id={String(id)} value={value} name={group} checked={checked} onChange={onChange} />
    <CheckboxLabel htmlFor={String(id)}>
      <CheckboxIconContainer>
        <CheckedIcon />
        <UnCheckedIcon />
      </CheckboxIconContainer>
      {children}
    </CheckboxLabel>
  </RadioCheckboxContainer>
);

export default RadioCheckbox;
