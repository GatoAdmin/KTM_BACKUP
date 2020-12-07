import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import FilterModal from '@components/RecommendPage/FilterModal/FilterModal';
import useVisible from '@util/hooks/useVisible';
import {
  CheckBox,
  FilterButton,
  FilterIconDescription,
  TuitionFilterContainer,
  TuitionFilterCheckBoxContainer,
  TuitionFilterCheckBoxLabel,
  TuitionFilterCheckLabelBox,
} from './TuitionFilter.style';
import CheckIcon from '../../../assets/check.svg';
import EducationIcon from '../../../assets/education-cost.svg';

const tuitionFee = [100, 200, 300, 400];

interface TuitionFilterProps {
  filterValue: number | null;
  setFilterValue: Dispatch<SetStateAction<number | null>>;
}

const TuitionFilter: React.VFC<TuitionFilterProps> = ({
  filterValue,
  setFilterValue,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visible, toggleVisible] = useVisible(containerRef);
  const [value, setValue] = React.useState<number | null>(filterValue);
  const submitFilter = () => {
    toggleVisible();
    setFilterValue(value);
  };
  const closeModal = () => {
    toggleVisible();
    setValue(filterValue);
  };
  const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (Number(target.value) === value) { setValue(null); } else { setValue(Number(target.value)); }
  };

  return (
    <TuitionFilterContainer ref={containerRef}>
      <FilterButton onClick={toggleVisible}>
        <EducationIcon />
        <FilterIconDescription>등록금</FilterIconDescription>
      </FilterButton>
      <FilterModal
        visible={visible}
        toggleVisible={toggleVisible}
        submitFilter={submitFilter}
        closeModal={closeModal}
        description="한 학기 기준"
        width="634px"
        height="230px"
      >
        {tuitionFee.map((tuitionFeeValue, index) => (
          <TuitionFilterCheckBoxContainer key={tuitionFeeValue}>
            <CheckBox
              id={`tuition-${index}`}
              value={index + 1}
              checked={index + 1 === value}
              onChange={onChangeCheckbox}
            />
            <TuitionFilterCheckBoxLabel htmlFor={`tuition-${index}`}>
              {tuitionFeeValue}
              {' '}
              ~
              {tuitionFeeValue + 100}
              만원
              <TuitionFilterCheckLabelBox>
                <CheckIcon />
              </TuitionFilterCheckLabelBox>
            </TuitionFilterCheckBoxLabel>
          </TuitionFilterCheckBoxContainer>
        ))}
      </FilterModal>
    </TuitionFilterContainer>
  );
};

export default TuitionFilter;
