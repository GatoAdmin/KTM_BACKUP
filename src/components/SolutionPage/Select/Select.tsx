import React from 'react';
import {
  Option, OptionContainer, SelectContainer, SelectDisplay,
} from '@components/SolutionPage/Select/Select.style';
import useVisible from '@util/hooks/useVisible';

interface option {
  value: string;
  display: string;
}

interface SelectProps {
  placeholder: string;
  options: Array<string | number>;
  name: string;
  defaultValue?: string;
  readOnly?:boolean;
  t:any;
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
  options, placeholder, defaultValue, name, t, handleFormContent, readOnly=false
}) => {
  const [inputValue, setInputValue] = React.useState<string | number>(placeholder);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visible, toggleVisible] = useVisible(containerRef);
  const getTriggerChangeOption = (optionValue: string | number, optionIndex: number) => () => {
    if(!readOnly){
      const changedVal = changeValue(name, optionIndex);
      handleFormContent(undefined, name, changedVal);
      setInputValue(optionValue);
      toggleVisible();
    }
  };

  const getDefaultOptionConvert = (optionValue: string | number) => {
    let changeIndex = 0;
    if(typeof optionValue === "string"){
      if(isNaN(optionValue)){
        changeIndex = arrayKeeper[name].findIndex(value=>value===optionValue);
      }else{
        changeIndex = Number(optionValue);
      }
    }
    const changedVal = options[changeIndex];
    setInputValue(changedVal);
  };

  React.useEffect(() => {
    if(typeof defaultValue === "string"){ 
      getDefaultOptionConvert(defaultValue); 
    }else{
      setInputValue(placeholder);
    }
  }, [placeholder,defaultValue]);

  return (
    <SelectContainer ref={containerRef}>
      <SelectDisplay show={visible} onClick={toggleVisible}>{inputValue}</SelectDisplay>
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
