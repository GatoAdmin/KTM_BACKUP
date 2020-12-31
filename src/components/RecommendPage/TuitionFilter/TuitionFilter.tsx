import * as React from 'react';
import Checkbox from '@components/Shared/Checkbox/Checkbox';
import {
  TuitionCheckbox, TuitionCheckboxList, TuitionDescription,
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
}

const useTuitionFilter = (initialTuitionValue: number | null)
  : [number | null, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [filterValue, setFilterValue] = React.useState<number | null>(() => initialTuitionValue);
  const handleClickTuitionCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    if (String(filterValue) === value) {
      setFilterValue(null);
    } else {
      setFilterValue(Number(value));
    }
  };
  return [filterValue, handleClickTuitionCheckbox];
};

const TuitionFilter: React.ForwardRefRenderFunction<TuitionFilterRef, TuitionFilterProps> = ({
  initialTuitionValue,
}, ref) => {
  const [filterValue, handleClickTuitionCheckbox] = useTuitionFilter(initialTuitionValue);

  React.useImperativeHandle<TuitionFilterRef, TuitionFilterRef>(ref, () => ({
    value: filterValue,
  }), [filterValue]);

  return (
    <TuitionFilterContainer>
      <TuitionIcon />
      <TuitionFilterTitle>등록금</TuitionFilterTitle>
      <TuitionCheckboxList>
        <TuitionDescription>(한 학기 기준)</TuitionDescription>
        {tuitionArray.map((value) => (
          <TuitionCheckbox key={value}>
            <Checkbox
              id={value}
              value={String(value)}
              checked={filterValue === value}
              onChange={handleClickTuitionCheckbox}
            >
              {value}
              백만원 ~
              {value + 1}
              백만원
            </Checkbox>
          </TuitionCheckbox>
        ))}
      </TuitionCheckboxList>

    </TuitionFilterContainer>
  );
};

export default React.forwardRef(TuitionFilter);
