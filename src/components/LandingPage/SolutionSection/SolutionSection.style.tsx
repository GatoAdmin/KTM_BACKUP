import { fontColor } from '@util/style/color';
import styled from 'styled-components';

export const SolutionSectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600px;
  background: rgba(213, 202, 189, 0.25);
`;

export const SolutionSectionInnerBox = styled.div`
  display: flex;
  width: 1000px;
  height: 100%;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 500px;
  height: 100%;
`;

export const BackSolutionImg = styled.img.attrs({
  src: '/images/solution_Instruction_1.png',
  alt: 'Solution image 1',
})`
  position: absolute;
  top: 87px;
  left: 0px;
  width: 409px;
  height: 255px;
  object-fit: cover;
  object-position: 50% 0%;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  box-shadow: 5px 8px 35px rgba(213, 202, 189, 0.3);
  border-radius: 20px;
`;

export const FrontSolutionImg = styled.img.attrs({
  src: '/images/solution_Instruction_2.png',
  alt: 'Solution image 2',
})`
  position: absolute;
  top: 260px;
  left: 101px;
  width: 409px;
  height: 255px;
  object-fit: cover;
  object-position: 50% 0%;
  z-index: 1;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  box-shadow: 5px 8px 35px rgba(213, 202, 189, 0.3);
  border-radius: 20px;
`;

export const TextWrap = styled.div`
  margin: 0 0 0 40px;
  width: 420px;
`;

export const Title = styled.p`
  margin: 0 0 31px 0;
  font-weight: bold;
  font-size: 32px;
  line-height: 45px;
  color: ${fontColor};
`;

export const Detail = styled.p`
  margin: 0 0 62px 0;
  font-weight: 500;
  font-size: 18px;
  line-height: 31px;
  color: ${fontColor};
`;
