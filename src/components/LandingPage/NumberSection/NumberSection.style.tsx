import styled, { css } from 'styled-components';
import { mainColor, secondColor } from '@util/style/color';

interface IsNumberEvenProp {
  isNumberEven: boolean;
}

export const NumberSectionContainer = styled.div<IsNumberEvenProp>`
  padding: 240px 0;
  background: ${(props) => (props.isNumberEven ? secondColor : 'transparent')};
`;

export const TextContainer = styled.div`
  padding-top: 138px;
`;

export const Title = styled.h2`
  margin: 0;
  padding-left: 31px;
  border-left: 11px solid ${mainColor};
  font-family: inherit;
  font-weight: bold;
  font-size: 30px;
  line-height: 60px;
  transition-property: opacity, transform;
  transition: 1s ease;
`;

export const Description = styled.div`
  padding-left: 42px;
  margin-top: 50px;
  font-family: inherit;
  font-size: 24px;
  line-height: 40px;
  transition-property: opacity, transform;
  transition: 1s ease 0.3s;
`;

export const RouteButton = styled.a`
  display: block;
  width: 266px;
  height: 63px;
  margin: 50px auto 0 42px;
  border: 2px solid #df4d3e;
  border-radius: 20px;
  font-family: inherit;
  font-size: 20px;
  line-height: 63px;
  color: ${mainColor};
  background: white;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s, color 0.3s;

  :hover {
    background: ${mainColor};
    color: white;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
`;

export const BackgroundNumber = styled.div<IsNumberEvenProp>`
  position: absolute;
  top: 0;
  right: 0;
  width: 326px;
  height: 288px;
  font-family: inherit;
  font-weight: bold;
  font-size: 250px;
  line-height: 288px;
  color: ${mainColor};
  opacity: ${(props) => (props.isNumberEven ? '0.3' : '0.2')};
`;

export const NumberSectionContent = styled.div<{ show: boolean }>`
  display: flex;
  justify-content: space-between;
  width: 1400px;
  margin: 0 auto;

  ${(props) => (props.show
    ? css`
          ${Title} {
            opacity: 1;
            transform: translateX(0);
          }
          ${Description} {
            opacity: 1;
            transform: translateX(0);
          }
        `
    : css`
          ${Title} {
            opacity: 0;
            transform: translateX(-50px);
          }
          ${Description} {
            opacity: 0;
            transform: translateX(-50px);
          }
        `)}
`;
