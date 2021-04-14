import React from 'react';
import {
  CheckboxIconContainer,
  CheckboxInput,
  CheckboxLabel,
  CheckedIcon,
  UnCheckedIcon,
  CheckboxContainer
} from './BigCheckbox.style';

interface BigCheckboxProps {
  id: string | number;
  value?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BigCheckbox: React.FC<BigCheckboxProps> = ({
  id,
  value,
  checked,
  onChange,
  children,
}) => (
  <CheckboxContainer>
    <CheckboxInput id={String(id)} value={value} checked={checked} onChange={onChange} />
    <CheckboxLabel htmlFor={String(id)}>
      <CheckboxIconContainer>
        <CheckedIcon />
        <UnCheckedIcon />
      </CheckboxIconContainer>
      {children}
    </CheckboxLabel>
  </CheckboxContainer>
);

export default BigCheckbox;
