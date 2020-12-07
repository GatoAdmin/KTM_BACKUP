import styled, { css, keyframes } from 'styled-components';
import { fontColor, mainColor } from '@util/style/color';

export const IntroductionSectionContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const SubTitleContainer = styled.div`
  display: inline;
`;

export const IntroductionSectionBackground = styled.img.attrs({
  src: '/images/main_image.jpg',
  alt: 'background image',
})`
  display: block;
  position: relative;
  width: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`;

export const IntroductionContent = styled.div`
  width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const CompanyName = styled.h1`
  display: block;
  width: 320px;
  margin: 0 auto 44px;
  color: ${mainColor};
  font: 900 80px/109px Nunito, sans-serif;
  text-align: center;
  transition-property: opacity, transform;
  transition: 0.5s ease 0.5s;
`;

export const Title = styled.h2`
  margin: 0 0 67px;
  color: ${fontColor};
  font-family: inherit;
  font-weight: bold;
  font-size: 45px;
  line-height: 40px;
  text-align: center;
  transition-property: opacity, transform;
  transition: 0.5s ease 1s;
`;

export const SubTitle = styled.h3`
  margin: 0 auto 75px;
  color: ${fontColor};
  font-family: inherit;
  font-weight: normal;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  transition-property: opacity, transform;
  transition: 0.5s ease 1.3s;
`;

export const EmphasisTitle = styled.span`
  color: ${mainColor};
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
  25% {
    transform: rotate(3deg) translate3d(0, 0, 0);
  }
  50% {
    transform: rotate(-3deg) translate3d(0, 0, 0);
  }
  75% {
    transform: rotate(1deg) translate3d(0, 0, 0);
  }
  100% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
`;

const storm = keyframes`
  0% {
    transform: translate3d(0, 0, 0) translateZ(0);
  }
  25% {
    transform: translate3d(4px, 0, 0) translateZ(0);
  }
  50% {
    transform: translate3d(-3px, 0, 0) translateZ(0);
  }
  75% {
    transform: translate3d(2px, 0, 0) translateZ(0);
  }
  100% {
    transform: translate3d(0, 0, 0) translateZ(0);
  }
`;

export const StormAnimatedText = styled.span``;

export const RouteIntroductionButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 266px;
  height: 63px;
  margin: 0 auto;
  border: 2px solid #df4d3e;
  border-radius: 20px;
  font-family: inherit;
  font-weight: bold;
  font-size: 20px;
  color: ${mainColor};
  background: white;
  text-decoration: none;
  text-align: center;
  line-height: 63px;
  transition-property: opacity, transform;
  transition: 0.5s ease 1.6s;

  &:hover {
    animation: ${rotate} 0.7s ease-in-out both;

    ${StormAnimatedText} {
      animation: ${storm} 0.7s ease-in-out both;
      animation-delay: 0.06s;
    }
  }
`;

interface IntroductionProps {
  show: boolean;
}

export const Introduction = styled.div<IntroductionProps>`
  position: absolute;
  top: calc(50% - 238px);
  width: 100%;
  height: 476px;
  ${(props) => (props.show
    ? css`
          ${CompanyName} {
            opacity: 1;
            transform: translateY(0);
          }
          ${Title} {
            opacity: 1;
            transform: translateY(0);
          }
          ${SubTitle} {
            opacity: 1;
            transform: translateY(0);
          }
          ${RouteIntroductionButton} {
            opacity: 1;
            transform: translateY(0);
          }
        `
    : css`
          ${CompanyName} {
            opacity: 0;
            transform: translateY(-20px);
          }
          ${Title} {
            opacity: 0;
            transform: translateY(-20px);
          }
          ${SubTitle} {
            opacity: 0;
            transform: translateY(-20px);
          }
          ${RouteIntroductionButton} {
            opacity: 0;
            transform: translateY(-20px);
          }
        `)}
`;
