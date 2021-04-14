import React from 'react';
import {
  RadioInput,
  RadioLabel
} from './ReadyRadioButton.style';

interface RadioButtonProps {
  id: string | number;
  value?: string;
  checked?: boolean;
  group?: string;
  data?:string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReadyRadioButton: React.FC<RadioButtonProps> = ({
  id,
  value,
  checked,
  group,
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

export default ReadyRadioButton;
