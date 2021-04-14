import React from 'react';
import {
  CheckboxContainer,
  CheckboxLabel,
  CheckboxInput,
  CheckboxIconContainer,
  CheckedIcon,
  UnCheckedIcon
} from './LabelClickCheckbox.style';

interface LabelClickCheckboxProps {
  id: string | number;
  value?: string;
  checked: boolean;
  onClick?: (event: React.MouseEvent)=>void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelClickCheckbox: React.FC<LabelClickCheckboxProps> = ({
  id,
  value,
  checked,
  onClick,
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
    </CheckboxLabel>
    <CheckboxLabel onClick={onClick}>
      {children}
    </CheckboxLabel>
  </CheckboxContainer>
);

export default LabelClickCheckbox;
