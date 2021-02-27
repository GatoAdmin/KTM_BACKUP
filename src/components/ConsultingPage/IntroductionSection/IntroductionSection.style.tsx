import styled, { css } from 'styled-components';
import { fontColor } from '@util/style/color';

export const IntroductionSectionContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 340px;
  overflow: hidden;
`;

export const LinearBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;

  background: linear-gradient(90deg, #E8E8E8 31.91%, rgba(245, 245, 245, 0.435897) 37.27%, rgba(255, 255, 255, 0) 42.55%);
`;

export const IntroductionSectionBackground = styled.img.attrs({
  src: '/images/consult_main_image.jpg',
  alt: 'background image',
})`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 47%;
`;

export const IntroductionSectionImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Title = styled.h2`
  position: relative;
  width: 300px;
  color: ${fontColor};
  font-family: inherit;
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
  text-align: left;
  user-select: none;
  transition-property: opacity, transform;
  transition: 0.5s ease 0.3s;
`;

interface IntroductionProps {
  show: boolean;
}

export const TitleWrapBox = styled.div<IntroductionProps>`
  display: flex;
  justify-content: flex-start;
  width: 1000px;
  ${(props) => (props.show
    ? css`
          ${Title} {
            opacity: 1;
            transform: translateY(0);
          }
        `
    : css`
          ${Title} {
            opacity: 0;
            transform: translateY(-20px);
          }
        `)}
`;
