import styled, { css } from 'styled-components';
import LeftArrowSVG from '@assets/svg/arrow_left_icon.svg';
import RightArrowSVG from '@assets/svg/arrow_right_icon.svg';
import { fontColor } from '@util/style/color';

export const ImageCarouselContainer = styled.section`
  position: relative;
  /* width: 1100px; */
  height: 450px;
  margin: 30px 0 40px;
  margin-top: 120px;
  perspective: 500px;
  perspective-origin: center;
  overflow: hidden;
`;

interface ImageCarouselButtonProps {
  isRight?: boolean;
}

export const ImageCarouselButton = styled.button<ImageCarouselButtonProps>`
  position: absolute;
  top: calc(50% - 50px);
  ${(props) => (props.isRight ? 'right' : 'left')}: 60px;
  width: 78px;
  height: 100px;
  /* width: 78px;
  height: 78px; */
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  z-index: 3;
  outline: none;
`;

interface CarouselImageProps {
  index: number;
}

export const CarouselImage = styled.img<CarouselImageProps>`
  position: absolute;
  top: 0;
  left: calc(50% - 400px);
  width: 800px;
  height: 450px;
  object-fit: cover;

  ${({ index }) => {
    if (index === 0) {
      return css`
        transform: translateZ(-150px) translateX(-800px);
        filter: opacity(0.5);
        z-index: 1;
      `;
    }
    if (index === 1) {
      return css`
        transform: translateZ(0) translateX(0);
        z-index: 2;
      `;
    }
    if (index == 2) {
      return css`
        transform: translateZ(-150px) translateX(800px);
        filter: opacity(0.5);
        z-index: 1;
      `;
    }
    return null;
  }}
`;

export const LeftArrow = styled(LeftArrowSVG)`
  /* height: 25px; */

  path {
    stroke: ${fontColor};
    stroke-width: 2px;
  }
`;

export const RightArrow = styled(RightArrowSVG)`
  /* height: 25px; */
  path {
    stroke: ${fontColor};
    stroke-width: 2px;
  }
`;

export const ButtonWrapper = styled.div`
  position: relative;
  width: 1100px;
  height: 100%;
  margin: 0 auto;
`;
