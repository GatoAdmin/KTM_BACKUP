import styled, { css } from 'styled-components';
import { fontColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';

interface PlanProps{
  backgroundColor: string;
}
export const UnivSelectPlan = styled.div<PlanProps>`
  align-items: center;
  padding: 5.5px 14px;
  min-width: 40px;
  height: 19px;
  border-radius: 9px;
  color: #FFFFFF;
  font-weight: bold;
  background: ${(props)=>(props.backgroundColor)};
`;