import * as React from 'react';
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
  closeModal: () => void;
  width: string;
  height: string;
  description?: string;
  children: React.ReactNode;
}

const FilterModal = React.forwardRef<FilterModalRef, FilterModalProps>(
  ({
    visible,
    toggleVisible,
    submitFilter,
    closeModal,
    width,
    height,
    description,
    children,
  }, ref) => (
    <FilterModalContainer ref={ref} width={width} height={height} show={visible} hasDescription={!!description}>
      {description ? <FilterModalDescription>{description}</FilterModalDescription> : null}
      {children}
      <FilterModalButtonContainer>
        <FilterModalDoneButton onClick={submitFilter}>완료</FilterModalDoneButton>
        <FilterModalButton onClick={closeModal}>취소</FilterModalButton>
      </FilterModalButtonContainer>
    </FilterModalContainer>
  ),
);

export default FilterModal;
