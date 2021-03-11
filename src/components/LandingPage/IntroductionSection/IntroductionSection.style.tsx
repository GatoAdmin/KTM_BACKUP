import styled, { css } from 'styled-components';
import { fontColor } from '@util/style/color';
import Search from '@assets/svg/search_icon.svg';

export const IntroductionSectionContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 85vh;
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
  object-position: 50% 40%;
`;

export const IntroductionContent = styled.div`
  width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const Title = styled.h2`
  margin: 0 0 25px;
  color: ${fontColor};
  font-family: inherit;
  font-weight: bold;
  font-size: 32px;
  line-height: 46px;
  text-align: center;
  transition-property: opacity, transform;
  transition: 0.5s ease 1s;
`;

export const SubTitle = styled.h3`
  margin: 0 auto 60px;
  color: ${fontColor};
  font-family: Noto Sans KR;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  text-align: center;
  transition-property: opacity, transform;
  transition: 0.5s ease 1.3s;
`;

export const InputWrap = styled.div`
  position: relative;
  transition-property: opacity, transform;
  transition: 0.5s ease 1.6s;
`;

export const InputUniversity = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 100px;
  width: 540px;
  height: 50px;
  padding: 0 30px;
  outline: none;
`;

export const SearchIcon = styled(Search)`
  position: absolute;
  right: 30px;
  top: 15px;
  color: #232323;
  cursor: pointer;
`;

interface IntroductionProps {
  show: boolean;
}

export const Introduction = styled.div<IntroductionProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: calc(50% - 238px);
  width: 100%;
  height: 476px;
  ${(props) => (props.show
    ? css`
          ${Title} {
            opacity: 1;
            transform: translateY(0);
          }
          ${SubTitle} {
            opacity: 1;
            transform: translateY(0);
          }
          ${InputWrap} {
            opacity: 1;
            transform: translateY(0);
          }
        `
    : css`
          ${Title} {
            opacity: 0;
            transform: translateY(-20px);
          }
          ${SubTitle} {
            opacity: 0;
            transform: translateY(-20px);
          }
          ${InputWrap} {
            opacity: 0;
            transform: translateY(-20px);
          }
        `)}
`;
