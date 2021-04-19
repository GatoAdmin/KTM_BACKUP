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

const UnivSort = ({ updateUrlQuery, t }) => {
  const [currentSort, setCurrentSort] = React.useState('accuracy');
  const [isSortSectionVisible, setIsSortSectionVisible] = React.useState(false);

  // const;

  const SortList = [
    {
      label: 'accuracy',
      value: 'kor_name',
    },
    {
      label: 'large_student_order',
      value: '-number_of_student',
    },
    {
      label: 'small_student_order',
      value: 'number_of_student',
    },
    {
      label: 'large_tuition_order',
      value: '-tuition',
    },
    {
      label: 'small_tuition_order',
      value: 'tuition',
    },
  ];

  return (
    <Wrapper>
      <CurrentSortBox onClick={() => setIsSortSectionVisible((prev) => !prev)}>
        <CurrentLabel>{t(currentSort)}</CurrentLabel>
        <BelowArrow />
      </CurrentSortBox>

      {isSortSectionVisible && (
        <UnivSortSection>
          {SortList.map(({ label, value }) => (
            <SortBox
              key={value}
              onClick={() => {
                setCurrentSort(label);
                setIsSortSectionVisible((prev) => !prev);
                updateUrlQuery('sorted_by', value);
              }}
            >
              <SortLabel current={label === currentSort}>{t(label)}</SortLabel>
            </SortBox>
          ))}
          <UpperArrow />
        </UnivSortSection>
      )}
    </Wrapper>
  );
};

export default UnivSort;
