import React from 'react';
import {
  RadioInput,
  RadioLabel
} from './RadioButton.style';

interface RadioButtonProps {
  id: string | number;
  value?: string;
  checked?: boolean;
  group?: string;
  data?:string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  value,
  checked,
  group,
  data,
  onChange,
  children,
}) => (
  <>
    <RadioInput id={String(id)} value={value} name={group} checked={checked} onChange={onChange} />
    <RadioLabel htmlFor={String(id)}>
      {children}
    </RadioLabel>
  </>
);

export default RadioButton;
