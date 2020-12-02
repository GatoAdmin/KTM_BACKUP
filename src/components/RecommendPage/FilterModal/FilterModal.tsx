import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import {
  FilterModalButton,
  FilterModalButtonContainer,
  FilterModalDoneButton,
  FilterModalContainer,
  FilterModalDescription,
} from '@components/RecommendPage/FilterModal/FilterModal.style';

export type FilterModalRef = HTMLDivElement;

interface FilterModalProps {
  visible: boolean;
  toggleVisible: () => void;
  submitFilter: () => void;
  width: string;
  height: string;
  description?: string;
  children: React.ReactNode;
}

const FilterModal = React.forwardRef<FilterModalRef, FilterModalProps>(
  ({ visible, toggleVisible, submitFilter, width, height, description, children }, ref) => {
    const onClose = () => {
      toggleVisible();
    };
    const onSubmit = () => {
      submitFilter();
      toggleVisible();
    };
    return (
      <FilterModalContainer ref={ref} width={width} height={height} show={visible} hasDescription={!!description}>
        {description ? <FilterModalDescription>{description}</FilterModalDescription> : null}
        {children}
        <FilterModalButtonContainer>
          <FilterModalDoneButton onClick={onSubmit}>완료</FilterModalDoneButton>
          <FilterModalButton onClick={onClose}>취소</FilterModalButton>
        </FilterModalButtonContainer>
      </FilterModalContainer>
    );
  },
);

export default FilterModal;
