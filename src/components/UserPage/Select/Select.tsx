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
  lang: string;
  placeholder: string;
  options: Array<string | number>;
  name: string;
  handleFormContent: (
    e?: React.ChangeEvent<HTMLInputElement> | undefined,
    t?: string | undefined,
    v?: string | number | undefined,
  ) => void;
}

const countryArr = [
  ['베트남', 'VN'],
  ['대한민국', 'KR'],
  ['미국', 'US'],
  ['일본', 'JP'],
  ['아르헨시나', 'AR'],
  ['호주', 'AU'],
  ['벨기에', 'BE'],
  ['캐나다', 'CA'],
  ['캄보디아', 'KH'],
  ['중국', 'CN'],
  ['체코', 'CZ'],
  ['이집트', 'EG'],
  ['프랑스', 'FR'],
  ['독일', 'DE'],
  ['그리스', 'GR'],
  ['홍콩', 'HK'],
  ['헝가리', 'HU'],
  ['인도', 'IN'],
  ['인도네시아', 'ID'],
  ['이란', 'IR'],
  ['이라크', 'IQ'],
  ['이탈리아', 'IT'],
  ['네덜란드', 'NL'],
  ['멕시코', 'MX'],
  ['뉴질랜드', 'NZ'],
  ['노르웨이', 'NO'],
  ['페루', 'PE'],
  ['필리핀', 'PH'],
  ['포르투갈', 'PT'],
  ['폴란드', 'PL'],
  ['싱가포르', 'SG'],
  ['스페인', 'ES'],
  ['스웨덴', 'SE'],
  ['대만', 'TW'],
  ['터키', 'TR'],
  ['영국', 'GB'],
];
const reasonArr = [
  ['한국유학에 관심이 있거나 준비 중입니다.', 0],
  ['한국어학원에서 공부하며 대학교 입학을 준비 중입니다.', 1],
  ['한국의 대학교에서 공부하는 대학생입니다.', 2],
  ['일반인', 3],
];
const topikArr = [
  ['없음', 0],
  ['1급', 1],
  ['2급', 2],
  ['3급', 3],
  ['4급', 4],
  ['5급', 5],
  ['6급', 6],
];

const arrayChooser = (name: string) => {
  let targetArr: (string | number)[][] = [];

  if (name === 'nationality') {
    targetArr = countryArr;
  } else if (name === 'identity') {
    targetArr = reasonArr;
  } else if (name === 'topik_level') {
    targetArr = topikArr;
  }

  return targetArr;
};

const changeValue = (name: string, optionVal: string | number) => {
  if (!['year', 'month', 'day'].includes(name)) {
    arrayChooser(name).forEach(([str, val]) => {
      if (str === optionVal) {
        optionVal = val;
      }
    });
  }

  return optionVal;
};

const Select: React.VFC<SelectProps> = ({
  lang, options, placeholder, name, handleFormContent,
}) => {
  const [inputValue, setInputValue] = React.useState<string | number>(placeholder);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visible, toggleVisible] = useVisible(containerRef);
  const getTriggerChangeOption = (optionValue: string | number) => () => {
    const changedVal = changeValue(lang, name, optionValue);
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
        {options.map((value) => (
          <Option key={value} onClick={getTriggerChangeOption(value)}>
            {value}
          </Option>
        ))}
      </OptionContainer>
    </SelectContainer>
  );
};

export default Select;
