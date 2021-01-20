,import React from 'react';
import {
  ScholarshipCheckboxContainer,
  ScholarshipFilterContainer, ScholarshipFilterTitle,
  ScholarshipIcon,
} from '@components/RecommendPage/ScholarshipFilter/ScholarshipFilter.style';
import BadgeCheckbox from '@components/RecommendPage/BadgeCheckbox/BadgeCheckbox';
import { UpdateUrlQueryFunction } from '@views/RecommendPage/RecommendListPage/RecommendListPage';

export type ScholarshipFilterValue = boolean | null;

export interface ScholarShipFilterRef {
  value: ScholarshipFilterValue;
}

interface ScholarshipProps {
  initialScholarshipValue: ScholarshipFilterValue;
  updateUrlQuery: UpdateUrlQueryFunction;
}

const useScholarshipFilter = (initialScholarshipValue: ScholarshipFilterValue, updateUrlQuery: UpdateUrlQueryFunction)
  : [ScholarshipFilterValue, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [
    scholarshipValue,
    setScholarshipValue,
  ] = React.useState<ScholarshipFilterValue>(initialScholarshipValue);
  const handleChangeScholarshipCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newScholarshipValue: boolean | null;
    const { target: { value } } = event;
    if (String(scholarshipValue) === value) {
      newScholarshipValue = null;
    } else {
      newScholarshipValue = value === 'true';
    }
    setScholarshipValue(newScholarshipValue);
    updateUrlQuery('scholarship', newScholarshipValue);
  };
  return [scholarshipValue, handleChangeScholarshipCheckbox];
};

const ScholarshipFilter: React.ForwardRefRenderFunction<
  ScholarShipFilterRef,
  ScholarshipProps
  > = ({
    initialScholarshipValue,
    updateUrlQuery,
  }, ref) => {
    const [
      scholarshipValue,
      handleChangeScholarshipCheckbox,
    ] = useScholarshipFilter(initialScholarshipValue, updateUrlQuery);

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
