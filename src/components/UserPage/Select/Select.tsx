,import React from 'react';
import {
  Option, OptionContainer, SelectContainer, SelectDisplay,
} from '@components/UserPage/Select/Select.style';
import useVisible from '@util/hooks/useVisible';

interface option {
  value: string;
  display: string;
}

interface SelectProps {
  placeholder: string;
  options: Array<string | number>;
}

const Select: React.VFC<SelectProps> = ({ options, placeholder }) => {
  const [inputValue, setInputValue] = React.useState<string | number>(placeholder);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visible, toggleVisible] = useVisible(containerRef);
  const getTriggerChangeOption = (optionValue: string | number) => () => {
    setInputValue(optionValue);
    toggleVisible();
  };

  return (
    <SelectContainer ref={containerRef}>
      <SelectDisplay onClick={toggleVisible}>{inputValue}</SelectDisplay>
      <OptionContainer show={visible}>
        {options.map((value) => (
          <Option key={value} onClick={getTriggerChangeOption(value)}>{value}</Option>
        ))}
      </OptionContainer>
    </SelectContainer>
  );
};

export default Select;
