import React from 'react';
import {
  TapInput,
  TapLabel
} from './TapItem.style';

interface TapItemProps {
  id: string | number;
  value?: string;
  checked?: boolean;
  group?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TapItem: React.FC<TapItemProps> = ({
  id,
  value,
  checked,
  group,
  onChange,
  children,
}) => (
  <>
    <TapInput id={String(id)} value={value} name={group} checked={checked} onChange={onChange} />
    <TapLabel htmlFor={String(id)}>
      {children}
    </TapLabel>
  </>
);

export default TapItem;
