import React from 'react';
import {
    InputArea
} from './Input.style';
import Checkbox from '@components/Shared/Checkbox/Checkbox';

interface InputProps {
  id?: string;
  value?: string;
  name?:string;
  type?: string|"text";
  placeholder?:string;
  readonly?:boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  name,
  placeholder,
  readonly = false,
  onChange,
  children,
}) => (
  <InputArea>
    <input id={id} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} readOnly={readonly}></input>
  </InputArea>
);

export default Input;
