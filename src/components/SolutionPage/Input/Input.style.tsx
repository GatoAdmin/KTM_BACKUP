import styled, { css } from 'styled-components';
import { fontColor, greyColor} from '@util/style/color';

export const InputArea = styled.div`
width: 100%;
height: 62px;
text-align: left;
background: #FFFFFF;
box-sizing: border-box;
border-radius: 5px;

>input{
  width: 100%;
  height: 60px;
  font-size: 15px;
  border : 0px;
  color: ${fontColor};
  float: right;
}
>input::placeholder {
    color: ${greyColor};
}
`;
