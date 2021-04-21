import React from 'react';
import Checkbox from '@components/Shared/Checkbox/Checkbox';
import { UpdateUrlQueryFunction } from '@views/RecommendPage/RecommendListPage/RecommendListPage';
import {
  TuitionCheckbox,
  TuitionCheckboxList,
  TuitionDescription,
  TuitionFilterContainer,
  TuitionFilterTitle,
  TuitionIcon,
} from './TuitionFilter.style';

const tuitionMaxValue = 4;
const tuitionArray = Array.from({ length: tuitionMaxValue }).map((_, index) => index + 1);

export interface TuitionFilterRef {
  value: number | null;
}

interface TuitionFilterProps {
  initialTuitionValue: number | null;
  updateUrlQuery: UpdateUrlQueryFunction;
}

const useTuitionFilter = (
  initialTuitionValue: number | null,
  updateUrlQuery: UpdateUrlQueryFunction,
): [number | null, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [filterValue, setFilterValue] = React.useState<number | null>(() => initialTuitionValue);
  const handleClickTuitionCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newFilterValue: number | null;
    const {
      target: { value },
    } = event;
    if (String(filterValue) === value) {
      newFilterValue = null;
    } else {
      newFilterValue = Number(value);
    }
    setFilterValue(newFilterValue);
    updateUrlQuery('tuition', newFilterValue);
  };
  return [filterValue, handleClickTuitionCheckbox];
};

const TuitionFilter: React.ForwardRefRenderFunction<TuitionFilterRef, TuitionFilterProps> = (
  { t, lang, initialTuitionValue, updateUrlQuery },
  ref,
) => {
  const [filterValue, handleClickTuitionCheckbox] = useTuitionFilter(initialTuitionValue, updateUrlQuery);

  React.useImperativeHandle<TuitionFilterRef, TuitionFilterRef>(
    ref,
    () => ({
      value: filterValue,
    }),
    [filterValue],
  );

  return (
    <TuitionFilterContainer>
      <TuitionIcon />
      {console.log(lang)}
      <TuitionFilterTitle>{t('assign_fee')}</TuitionFilterTitle>
      <TuitionCheckboxList>
        <TuitionDescription>{`(${t('assign_fee_label')})`}</TuitionDescription>
        {tuitionArray.map((value) => (
          <TuitionCheckbox key={value}>
            <Checkbox
              id={value}
              value={String(value)}
              checked={filterValue === value}
              onChange={handleClickTuitionCheckbox}
            >
              {value}
              {lang === 'ko' ? '백만원 ' : ' triệu '}~ {value + 1}
              {lang === 'ko' ? '백만원' : ' triệu (KRW)'}
            </Checkbox>
          </TuitionCheckbox>
        ))}
      </TuitionCheckboxList>
    </TuitionFilterContainer>
  );
};

export default React.forwardRef(TuitionFilter);
