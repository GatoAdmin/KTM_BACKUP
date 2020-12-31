import * as React from 'react';
import {
  ScholarshipCheckboxContainer,
  ScholarshipFilterContainer, ScholarshipFilterTitle,
  ScholarshipIcon,
} from '@components/RecommendPage/ScholarshipFilter/ScholarshipFilter.style';
import BadgeCheckbox from '@components/RecommendPage/BadgeCheckbox/BadgeCheckbox';

export type ScholarshipFilterValue = boolean | null;

export interface ScholarShipFilterRef {
  value: ScholarshipFilterValue;
}

interface ScholarshipProps {
  initialScholarshipValue: ScholarshipFilterValue;
}

const useScholarshipFilter = (initialScholarshipValue: ScholarshipFilterValue)
  : [ScholarshipFilterValue, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [
    scholarshipValue,
    setScholarshipValue
  ] = React.useState<ScholarshipFilterValue>(initialScholarshipValue);
  const handleChangeScholarshipCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    if (String(scholarshipValue) === value) {
      setScholarshipValue(null);
    } else {
      setScholarshipValue(value === 'true');
    }
  };
  return [scholarshipValue, handleChangeScholarshipCheckbox];
};

const ScholarshipFilter: React.ForwardRefRenderFunction<
  ScholarShipFilterRef,
  ScholarshipProps
  > = ({
  initialScholarshipValue,
}, ref) => {
  const [scholarshipValue, handleChangeScholarshipCheckbox] = useScholarshipFilter(initialScholarshipValue);

  React.useImperativeHandle<ScholarShipFilterRef, ScholarShipFilterRef>(ref, () => ({
    value: scholarshipValue,
  }), [scholarshipValue]);

  return (
    <ScholarshipFilterContainer>
      <ScholarshipIcon />
      <ScholarshipFilterTitle>
        외국인 장학금
      </ScholarshipFilterTitle>
      <ScholarshipCheckboxContainer>
        <BadgeCheckbox
          id="scholarship-true"
          value="true"
          checked={scholarshipValue === true}
          onChange={handleChangeScholarshipCheckbox}
        >
          있음
        </BadgeCheckbox>
        <BadgeCheckbox
          id="scholarship-false"
          value="false"
          checked={scholarshipValue === false}
          onChange={handleChangeScholarshipCheckbox}
        >
          없음
        </BadgeCheckbox>
      </ScholarshipCheckboxContainer>
    </ScholarshipFilterContainer>
  );
};

export default React.forwardRef(ScholarshipFilter);
