import * as React from 'react';
import {
  CheckboxIconContainer,
  CheckboxInput,
  CheckboxLabel,
  CheckedIcon,
  UnCheckedIcon,
} from '@components/Shared/Checkbox/Checkbox.style';

interface CheckboxProps {
  id: string | number;
  value?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  value,
  checked,
  onChange,
  children,
}) => (
  <>
    <CheckboxInput id={String(id)} value={value} checked={checked} onChange={onChange} />
    <CheckboxLabel htmlFor={String(id)}>
      <CheckboxIconContainer>
        <CheckedIcon />
        <UnCheckedIcon />
      </CheckboxIconContainer>
      {children}
    </CheckboxLabel>
  </>
);

export default Checkbox;
