,import React from 'react';
import {
  BadgeCheckboxInput,
  BadgeCheckboxLabel,
} from '@components/RecommendPage/BadgeCheckbox/BadgeCheckbox.style';

interface BadgeCheckboxProps {
  id: string | number;
  value?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BadgeCheckbox: React.FC<BadgeCheckboxProps> = ({
  id,
  value,
  checked,
  onChange,
  children,
}) => (
  <>
    <BadgeCheckboxInput id={String(id)} value={value} checked={checked} onChange={onChange} />
    <BadgeCheckboxLabel htmlFor={String(id)}>
      {children}
    </BadgeCheckboxLabel>
  </>
);

export default BadgeCheckbox;
