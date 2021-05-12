import styled from 'styled-components';
import { fontColor, borderColor, whiteColor, mainColor600 } from '@util/style/color';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UnivListSection = styled.section`
  position: relative;
  width: 1000px;
  margin: 0 auto;
  padding: 42px 0 100px;
`;

export const UnivListTitle = styled.h3`
  display: block;
  margin: 0 0 46px;
  font: normal normal bold 30px/35px NEXON Lv1 Gothic;
  color: ${fontColor};
`;

export const UnivListLoadTrigger = styled.div`
  position: absolute;
  bottom: 490px;
`;

interface FilterModalContainerProps {
  show: boolean;
}

export const FilterModalContainer = styled.div<FilterModalContainerProps>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: absolute;
  top: 298px;
  left: 110px;
  width: 880px;
  height: 280px;
  padding: 20px 0;
  border-radius: 20px;
  background: ${whiteColor};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  z-index: 2;
  cursor: default;
`;

export const FilterSection = styled.div`
  width: 180px;
  height: 100%;
  border-right: 1px solid ${borderColor};
  box-sizing: border-box;

  :last-child {
    border: 0;
  }
`;

export const ImageContainer = styled.div`
  width: 1100px;
  height: auto;
  opacity: 0.9;
  padding-top: 80px;
  position: relative;

  > div {
    width: 510px;
    height: 60px;
    position: absolute;
    left: 490px;
    top: 182px;
    font-weight: bold;
    font-size: 22px;
    line-height: 30px;
    color: #ffffff;
  }
`;
export const CoverImage = styled.img.attrs({
  src: '/images/solution_cover.png',
  alt: 'cover',
})`
  width: 1100px;
  height: auto;
`;

export const Accent = styled.span`
  color: ${mainColor600};
`;
