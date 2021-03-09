import React from 'react';
import {
    InputArea
} from './Input.style';
import Checkbox from '@components/Shared/Checkbox/Checkbox';

interface InputProps {
  id?: string;
  value?: string|boolean;
  name?:string;
  type?: string|"text";
  min?:number;
  max?:number;
  placeholder?:string;
  readonly?:boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  name,
  min,
  max,
  placeholder,
  readonly = false,
  onChange,
  children,
}) => (
  <InputArea>
    <input id={id} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} readOnly={readonly} minLength={min} maxLength={max}></input>
  </InputArea>
);

export default Input;
