import React from 'react';
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
  name: string;
  handleFormContent: (
    e?: React.ChangeEvent<HTMLInputElement> | undefined,
    t?: string | undefined,
    v?: string | number | undefined,
  ) => void;
}

const arrayKeeper = {
  nationality: [
    'VN',
    'KR',
    'US',
    'JP',
    'AR',
    'AU',
    'BE',
    'CA',
    'KH',
    'CN',
    'CZ',
    'EG',
    'FR',
    'DE',
    'GR',
    'HK',
    'HU',
    'IN',
    'ID',
    'IR',
    'IQ',
    'IT',
    'NL',
    'MX',
    'NZ',
    'NO',
    'PE',
    'PH',
    'PT',
    'PL',
    'SG',
    'ES',
    'SE',
    'TW',
    'TR',
    'GB',
  ],
  identity: [0, 1, 2, 3],
  topik_level: [0, 1, 2, 3, 4, 5, 6],
};

const changeValue = (name: string, optionIndex: string | number) => {
  if (!['year', 'month', 'day'].includes(name)) {
    optionIndex = arrayKeeper[name][optionIndex];
  } else if (name === 'year') {
    optionIndex += 1980;
  } else {
    optionIndex += 1;
  }

  return optionIndex;
};

const Select: React.VFC<SelectProps> = ({
  options, placeholder, name, handleFormContent,
}) => {
  const [inputValue, setInputValue] = React.useState<string | number>(placeholder);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visible, toggleVisible] = useVisible(containerRef);
  const getTriggerChangeOption = (optionValue: string | number, optionIndex: number) => () => {
    const changedVal = changeValue(name, optionIndex);
    handleFormContent(undefined, name, changedVal);
    setInputValue(optionValue);
    toggleVisible();
  };

  React.useEffect(() => {
    setInputValue(placeholder);
  }, [placeholder]);

  return (
    <SelectContainer ref={containerRef}>
      <SelectDisplay onClick={toggleVisible}>{inputValue}</SelectDisplay>
      <OptionContainer show={visible}>
        {options.map((value, index) => (
          <Option key={value} onClick={getTriggerChangeOption(value, index)}>
            {value}
          </Option>
        ))}
      </OptionContainer>
    </SelectContainer>
  );
};

export default Select;
