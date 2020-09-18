import styled from "styled-components";
import { fontColor, mainColor } from "@util/style/color";

interface IntroductionSectionContainerProps {
  backgroundImage: string;
}

export const IntroductionSectionContainer = styled.div<IntroductionSectionContainerProps>`
  width: 100%;
  height: 100vh;
  background: url("${props => props.backgroundImage}") 50%/cover no-repeat;
`;

export const Introduction = styled.div`
  position: absolute;
  top: calc(50% - 238px);
  width: 100%;
  height: 476px;
`;

export const IntroductionContent = styled.div`
  width: 1400px;
  padding: 0 413px;
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
`;

export const Title = styled.h2`
  margin: 0 0 67px;
  color: ${fontColor};
  font: bold 45px/40px "NEXON Lv1 Gothic";
`;

export const SubTitle = styled.h3`
  width: 368px;
  margin: 0 auto 75px;
  color: ${fontColor};
  font: normal 24px/40px "NEXON Lv1 Gothic";
  text-align: center;
`;

export const EmphasisTitle = styled.span`
  color: ${mainColor};
`;

export const RouteIntroductionButton = styled.a`
  display: block;
  width: 266px;
  height: 63px;
  margin: 0 auto;
  border: 2px solid #DF4D3E;
  border-radius: 20px;
  font: bold 20px/23px "NEXON Lv1 Gothic";
  color: ${mainColor};
  background: white;
  text-decoration: none;
  text-align: center;
  line-height: 63px;
`;

