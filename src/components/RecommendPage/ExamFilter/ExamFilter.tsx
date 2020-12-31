import * as React from 'react';
import Checkbox from '@components/Shared/Checkbox/Checkbox';
import {
  ExamFilterContainer,
  ExamFilterIcon,
  ExamFilterCheckboxShort,
  ExamFilterShortContainer,
  ExamFilterTitle,
  ExamFilterCheckbox,
} from './ExamFilter.style';

export interface ExamFilterRef {
  topikValue: Array<number>;
  testValue: boolean | null;
}

interface ExamFilterProps {
  initialTopikValue: Array<number>;
  initialTestValue: boolean | null;
}

const topik: Array<{name: string; value: number}> = [
  { name: '1급', value: 1 },
  { name: '2급', value: 2 },
  { name: '3급', value: 3 },
  { name: '4급', value: 4 },
  { name: '5급', value: 5 },
  { name: '6급', value: 6 },
];

const useTopikFilter = (initialTopikValue: Array<number>)
  : [Array<number>, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [topikValue, setTopikValue] = React.useState<Array<number>>(initialTopikValue);
  const handleClickTopikCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    const currentTopikValue = Number(value);
    if (topikValue.includes(currentTopikValue)) {
      const newTopikValue = Array.from(topikValue);
      const targetIndex = newTopikValue.indexOf(currentTopikValue);
      newTopikValue.splice(targetIndex, 1);
      setTopikValue(newTopikValue);
    } else {
      setTopikValue((state) => state.concat(currentTopikValue));
    }
  };

  return [topikValue, handleClickTopikCheckbox];
};

const useTestFilter = (initialTestValue: boolean | null)
  : [boolean | null, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [testValue, setTestValue] = React.useState<boolean | null>(initialTestValue);
  const handleClickTestCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    if (String(testValue) === value) {
      setTestValue(null);
    } else {
      setTestValue(value === 'true');
    }
  };

  return [testValue, handleClickTestCheckbox];
};

const ExamFilter = React.forwardRef<ExamFilterRef, ExamFilterProps>(({
  initialTopikValue,
  initialTestValue,
}, ref) => {
  const [topikValue, handleClickTopikCheckbox] = useTopikFilter(initialTopikValue);
  const [testValue, handleClickTestCheckbox] = useTestFilter(initialTestValue);

  React.useImperativeHandle<ExamFilterRef, ExamFilterRef>(ref, () => ({
    topikValue,
    testValue,
  }), [topikValue, testValue]);

  return (
    <ExamFilterContainer>
      <ExamFilterIcon />
      <ExamFilterTitle>
        어학시험
        <br />
        TOPIK
      </ExamFilterTitle>
      <ExamFilterShortContainer>
        {topik.map((topikInfoValue) => (
          <ExamFilterCheckboxShort key={topikInfoValue.value}>
            <Checkbox
              id={`topik${String(topikInfoValue.value)}`}
              value={String(topikInfoValue.value)}
              checked={topikValue.includes(topikInfoValue.value)}
              onChange={handleClickTopikCheckbox}
            >
              {topikInfoValue.name}
            </Checkbox>
          </ExamFilterCheckboxShort>
        ))}
        <ExamFilterCheckbox>
          <Checkbox
            id="topik-0"
            value="0"
            checked={topikValue.includes(0)}
            onChange={handleClickTopikCheckbox}
          >
            토픽 급수제한 없음
          </Checkbox>
        </ExamFilterCheckbox>
        <ExamFilterCheckbox>
          <Checkbox
            id="test-true"
            value={String(true)}
            checked={testValue === true}
            onChange={handleClickTestCheckbox}
          >
            학교 자체시험
          </Checkbox>
        </ExamFilterCheckbox>
        <ExamFilterCheckbox>
          <Checkbox
            id="test-false"
            value={String(false)}
            checked={testValue === false}
            onChange={handleClickTestCheckbox}
          >
            어학시험 필요 없음
          </Checkbox>
        </ExamFilterCheckbox>
      </ExamFilterShortContainer>
    </ExamFilterContainer>
  );
});

export default ExamFilter;
