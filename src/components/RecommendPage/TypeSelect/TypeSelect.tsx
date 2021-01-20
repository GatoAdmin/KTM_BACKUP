,import React from 'react';
import {
  TypeSelectContainer, TypeSelectLabel,
  TypeSelectOption,
} from '@components/RecommendPage/TypeSelect/TypeSelect.style';

interface IProps {
  name: string;
  types: ReadonlyArray<string>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  typeFooter?: string;
}

const TypeSelect: React.FC<IProps> = ({
  name,
  types,
  value,
  typeFooter,
  onChange,
}) => (
  <TypeSelectContainer>
    {types.map((type) => (
      <React.Fragment key={type}>
        <TypeSelectOption
          name={name}
          id={`${name}-${type}`}
          value={type}
          checked={value === type}
          onChange={onChange}
        />
        <TypeSelectLabel htmlFor={`${name}-${type}`}>
          {`${type} ${typeFooter}`}
        </TypeSelectLabel>
      </React.Fragment>
    ))}
  </TypeSelectContainer>
);

export default TypeSelect;
