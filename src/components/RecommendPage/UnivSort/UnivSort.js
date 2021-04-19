import React from 'react';
import {
  BelowArrow,
  CurrentLabel,
  UpperArrow,
  SortBox,
  SortLabel,
  UnivSortSection,
  Wrapper,
  CurrentSortBox,
} from './UnivSort.style';

const SortList = [
  {
    label: '정확도순',
    value: 'kor_name',
  },
  {
    label: '많은 유학생 순',
    value: '-number_of_student',
  },
  {
    label: '적은 유학생 순',
    value: 'number_of_student',
  },
  {
    label: '높은 학비 순',
    value: '-tuition',
  },
  {
    label: '낮은 학비 순',
    value: 'tuition',
  },
];

const UnivSort = ({ updateUrlQuery }) => {
  const [currentSort, setCurrentSort] = React.useState('정확도순');
  const [isSortSectionVisible, setIsSortSectionVisible] = React.useState(false);

  return (
    <Wrapper>
      <CurrentSortBox onClick={() => setIsSortSectionVisible((prev) => !prev)}>
        <CurrentLabel>{currentSort}</CurrentLabel>
        <BelowArrow />
      </CurrentSortBox>

      {isSortSectionVisible && (
        <UnivSortSection>
          {SortList.map(({ label, value }) => (
            <SortBox
              onClick={() => {
                setCurrentSort(label);
                setIsSortSectionVisible((prev) => !prev);
                updateUrlQuery('sorted_by', value);
              }}
            >
              <SortLabel current={label === currentSort}>{label}</SortLabel>
            </SortBox>
          ))}
          <UpperArrow />
        </UnivSortSection>
      )}
    </Wrapper>
  );
};

export default UnivSort;
