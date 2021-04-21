import React from 'react';
import Checkbox from '@components/Shared/Checkbox/Checkbox';
import { UpdateUrlQueryFunction } from '@views/RecommendPage/RecommendListPage/RecommendListPage';
import {
  ExamFilterContainer,
  ExamFilterIcon,
  ExamFilterCheckboxShort,
  ExamFilterShortContainer,
  ExamFilterTitle,
  ExamFilterCheckbox,
} from './ExamFilter.style';
import { CoverImage } from '@views/SolutionPage/SolutionSelectPage/SolutionSelectPage.style';

export interface ExamFilterRef {
  topikValue: Array<number>;
  testValue: boolean | null;
}

interface ExamFilterProps {
  initialTopikValue: Array<number>;
  initialTestValue: boolean | null;
  updateUrlQuery: UpdateUrlQueryFunction;
}

const topik: Array<{ name: string; value: number }> = [
  { name: '1급', value: 1 },
  { name: '2급', value: 2 },
  { name: '3급', value: 3 },
  { name: '4급', value: 4 },
  { name: '5급', value: 5 },
  { name: '6급', value: 6 },
];

const useTopikFilter = (
  initialTopikValue: Array<number>,
  updateUrlQuery: UpdateUrlQueryFunction,
): [Array<number>, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [topikValue, setTopikValue] = React.useState<Array<number>>(initialTopikValue);
  const handleClickTopikCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newTopikValue: Array<number>;
    const {
      target: { value },
    } = event;
    const currentTopikValue = Number(value);
    if (topikValue.includes(currentTopikValue)) {
      newTopikValue = Array.from(topikValue);
      const targetIndex = newTopikValue.indexOf(currentTopikValue);
      newTopikValue.splice(targetIndex, 1);
    } else {
      newTopikValue = topikValue.concat(currentTopikValue);
    }
    setTopikValue(newTopikValue);
    updateUrlQuery('topik', newTopikValue);
  };

  return [topikValue, handleClickTopikCheckbox];
};

const useTestFilter = (
  initialTestValue: boolean | null,
  updateUrlQuery: UpdateUrlQueryFunction,
): [boolean | null, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [testValue, setTestValue] = React.useState<boolean | null>(initialTestValue);
  const handleClickTestCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newTestValue: boolean | null;
    const {
      target: { value },
    } = event;

    if (value === 'true') {
      newTestValue = false;
    } else {
      newTestValue = true;
    }

    setTestValue(newTestValue);
    updateUrlQuery('has_own_exam', newTestValue);
  };

  return [testValue, handleClickTestCheckbox];
};

const ExamFilter = React.forwardRef<ExamFilterRef, ExamFilterProps>(
  ({ lang, initialTopikValue, initialTestValue, updateUrlQuery }, ref) => {
    const [topikValue, handleClickTopikCheckbox] = useTopikFilter(initialTopikValue, updateUrlQuery);
    const [testValue, handleClickTestCheckbox] = useTestFilter(initialTestValue, updateUrlQuery);

    React.useImperativeHandle<ExamFilterRef, ExamFilterRef>(
      ref,
      () => ({
        topikValue,
        testValue,
      }),
      [topikValue, testValue],
    );

    return (
      <ExamFilterContainer>
        <ExamFilterIcon />
        <ExamFilterTitle>
          {lang === 'ko' ? '어학시험' : 'Yêu cầu ngôn ngữ'}
          <br />
          TOPIK
        </ExamFilterTitle>
        <ExamFilterShortContainer lang={lang}>
          {topik.map((topikInfoValue) => (
            <ExamFilterCheckboxShort key={topikInfoValue.value}>
              <Checkbox
                id={`topik${String(topikInfoValue.value)}`}
                value={String(topikInfoValue.value)}
                checked={topikValue.includes(topikInfoValue.value)}
                onChange={handleClickTopikCheckbox}
              >
                {lang === 'vn' && 'Cấp '}
                {`${topikInfoValue.value}`}
                {lang === 'ko' && '급'}
              </Checkbox>
            </ExamFilterCheckboxShort>
          ))}
          <ExamFilterCheckbox>
            <Checkbox id="topik-7" value="7" checked={topikValue.includes(7)} onChange={handleClickTopikCheckbox}>
              {lang === 'ko' ? '토픽 급수제한 없음' : 'Không giới hạn cấp độ'}
            </Checkbox>
          </ExamFilterCheckbox>
          <ExamFilterCheckbox>
            <Checkbox id="topik-8" value="8" checked={topikValue.includes(8)} onChange={handleClickTopikCheckbox}>
              {lang === 'ko' ? '토픽 필요 없음' : 'Không yêu cầu TOPIK'}
            </Checkbox>
          </ExamFilterCheckbox>
          <ExamFilterCheckbox>
            <Checkbox
              id="has_own_exam"
              value={testValue || testValue === null ? true : false}
              checked={testValue || testValue === null}
              onChange={handleClickTestCheckbox}
            >
              {lang === 'ko' ? '학교 자체시험' : 'Bài thi của trường'}
            </Checkbox>
          </ExamFilterCheckbox>
        </ExamFilterShortContainer>
      </ExamFilterContainer>
    );
  },
);

export default ExamFilter;
