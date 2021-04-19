import styled from 'styled-components';
import UnderArrow from '@assets/svg/under_arrow.svg';

export const Wrapper = styled.div`
  position: absolute;
  top: 42px;
  right: 0;
`;

export const CurrentSortBox = styled.div`
  width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;

  line-height: 1;

  padding: 12px;
  border: 0.8px solid #c4c4c4;
  border-radius: 12px;

  background-color: #fff;

  cursor: pointer;
`;

export const UnivSortSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9998;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 178px;
  height: 143px;

  padding: 12px;
  border: 0.8px solid #c4c4c4;
  border-radius: 12px;

  background-color: #fff;
`;

export const SortBox = styled.div`
  width: 140px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  line-height: 1;
`;

export const SortLabel = styled.span`
  font-size: 14px;
  color: #232323;
  color: ${({ current }) => (current ? '#df4d3d' : '#232323')};
  cursor: pointer;

  :hover {
    color: #df4d3d;
  }
`;

export const CurrentLabel = styled(SortLabel)`
  color: #df4d3d !important;
  margin-right: 18px;
`;

export const UpperArrow = styled(UnderArrow)`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 10px;
  transform: rotate(180deg);
`;

export const BelowArrow = styled(UnderArrow)`
  position: absolute;
  top: 17px;
  right: 20px;
  width: 10px;

  cursor: pointer;
`;
