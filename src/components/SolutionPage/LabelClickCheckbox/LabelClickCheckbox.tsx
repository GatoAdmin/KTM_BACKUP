import React from 'react';
import {
  CheckboxContainer,
  CheckboxLabel,
} from './LabelClickCheckbox.style';
import Checkbox from '@components/Shared/Checkbox/Checkbox';

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
    <Checkbox id={String(id)} value={value} checked={checked} onChange={onChange} />
    <CheckboxLabel onClick={onClick}>
      {children}
    </CheckboxLabel>
  </CheckboxContainer>
);

export default LabelClickCheckbox;
