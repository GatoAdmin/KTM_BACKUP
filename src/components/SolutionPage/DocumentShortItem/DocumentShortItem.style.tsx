import styled, { css } from 'styled-components';
import { 
  fontColor,
  mainColor600 } from '@util/style/color';
import { defaultFont } from '@util/style/font';
import DocumentSVG from '@assets/svg/document_icon.svg';

// export const TapLabel = styled.label`  
//   display: flex;

//   font: normal bold 16px/22px ${defaultFont};

//   text-decoration: none;
//   padding: 21px 8px 18px 8px;
//   cursor: pointer;
//   color: ${(props)=>(props.color||'#9E9E9E')};
// `;

// export const TapInput = styled.input.attrs({
//   type: 'radio',
// })`
//   display: none; 
//   :checked + ${TapLabel} {
//     color: #DF4D3D;
//     border-bottom: 3px solid #DF4D3D;
//   }
// `;
export const DocumentIconContainer = styled.div`
  position: relative;
  width: 90px;
  height: 92px;
`;

export const DocumentTypeIconContainer = styled.div`
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: auto 25px auto 0;
  background: ${mainColor600};
`;
export const DocumentItem = styled.div`
  display: flex;
  font-weight: 600;
  text-decoration: none;
  font-size: 16px;
  line-height: 36px;
  letter-spacing: -0.4px;
  padding: 13px 17px 13px 17px;
  width: 416px;
  height: 36px;
  border-bottom: 1.5px solid #C4C4C4;

  :first-child{
    border-top: 1.5px solid #C4C4C4;
  }
  :nth-child(2){
    border-top: 1.5px solid #C4C4C4;
  }
`;