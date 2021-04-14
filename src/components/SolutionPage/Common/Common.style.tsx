import styled, { css } from 'styled-components';
import { fontColor,greyColor,mainColor600, whiteColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';
import unchekedRadioSVG from '@assets/svg/uncheked_radio_icon.svg';
import chekedRadioSVG from '@assets/svg/cheked_radio_icon.svg';

interface ReadyButtonProps {
    isReady ?: boolean;
    isCancle?: boolean;
}
interface TapItemProps {
    isViewTap : boolean;
}
interface TextProps {
  width?:string;
  textAlign?: string;
  margingLeft?:number;
}

export const UncheckedRadioIcon = styled(unchekedRadioSVG)``;
export const CheckedRadioIcon = styled(chekedRadioSVG)``;

export const BlockHeader = styled.p`
    font-weight: bold;
    font-size: 22px;
    line-height: 30px;
`; 

export const Block = styled.div`
    width: 1000px;
    padding: 37px 50px 20px;
`; 

export const TopNonBlock = styled.div`
    width: 1000px;
    padding: 0px 50px 20px;
`; 
export const FooterBlock = styled.div`
    width: 1000px;
    padding: 0px 50px 20px;
`; 

export const EmptyText = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;
    color: #9E9E9E;
    ${(props)=>(props.style
      ?css`
        ${props.style}
      `:null
    )}
`; 

export const SelectContainer = styled.header`
  display: flex;
  align-items: center;
  top: 0;
  justify-content: space-between;
  width: 1000px;
  border-bottom: 0.8px solid rgba(196, 196, 196, 0.8);
  margin: 0 0 25px 0;
`;

export const Tap = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1 1 0;
  color: ${fontColor};
`;

export const TapContainer = styled.div`
  display: flex;
  flex: 1 1 0;
  margin: 0 50px 0 0;
  width: 50%;
`;

export const TapItem = styled.div<TapItemProps>`
  text-decoration: none;
  font-weight: bold;
  margin-right:20px;
  padding: 21px 8px 18px 8px;
  cursor: pointer;
  
  ${(props)=>(props.isViewTap
    ?css`
    color: ${mainColor600};
    border-bottom: 3px solid ${mainColor600};
    `
    :css`
    color: ${(props.color||'#9E9E9E')};
    `
  )}
  :last-child{
    margin-right:0px;
  }
`;
export const ReadyButton = styled.button<ReadyButtonProps>`
    min-width: 52px;
    min-height: 19px;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    align-items: center;
    text-align: center;
    padding: 10px 22px; 
    border: 1px solid ${mainColor600};
    box-sizing: border-box;
    border-radius: 100px;
    cursor:pointer;
    ${(props)=>(props.isReady
        ?css`
            background:${mainColor600};
            color: ${whiteColor};
        `
        :props.isCancle
        ?css`
            background:${greyColor};
            border: 1px solid ${greyColor};
            color: ${whiteColor};
        `
        :css`
            background:rgba(255, 114, 99, 0.08);
            color: ${mainColor600};
        `
    )};
    &+&{
      margin-left: 14px;
    }
`;

export const RadioButtonContainer = styled.div`
  display: flex;    
  flex-wrap: wrap;
  width: 100%;
  `;
export const RadioButtonPaymentContainer = styled.div`
  display: flex;    
  flex-wrap: wrap;
  width: 100%;
  align-item : center;
  padding: 35px 0px 36px 0px;
  `;
export const DocumentContainer = styled.div`
  display: iniline-block;    
  flex-wrap: wrap;
  width: 100%;
  `;
export const DocumentShortContainer = styled.div`
  display: flex;    
  justify-content: space-between;
  flex-wrap: wrap;
  width: 95%;
  `;
  
export const Accent = styled.span`
    color: ${mainColor600};
`; 
export const DecoUnderLine = styled.span`
  text-decoration:underline;
`;

export const ColorBold = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: ${mainColor600};

  margin : 30px 0 15px 17px;
`;
export const GreyText = styled.span`
  color: rgba(35, 35, 35, 0.3);
`;
export const Bold22 = styled.div`
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
`;
export const Bold18 = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
`;
export const Bold16 = styled.div`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
`;

export const SmallNotice = styled.div`
  text-align : right;
  font-size: 12px;
  line-height: 16x;
  color: ${mainColor600};
`;

export const SmallAccent = styled.div`
  font-size: 12px;
  line-height: 16x;
  color: ${mainColor600};
`; 
export const Form = styled.form`

`;

export const FormAlert = styled.div`
  height: 24px;
  padding-left: 13px;
  font: normal 300 12px ${defaultFont};
  color: ${mainColor600};
  text-align: left;
`;

export const FooterNoticeContainer = styled.div`
  font-size: 22px;
  line-height: 30px;
  text-align: center;
`;

export const BoldText = styled.div`
  font-weight: bold;
`;
export const StringDot = styled.div`
  max-width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const TextContainer = styled.div<TextProps>`
    ${(props)=>props.width
      ?css`width:${props.width};`
      :css`max-width: max-content;`
    }
      
    ${(props)=>props.textAlign
      ?css`
        text-align:${props.textAlign};
      `:null
    }
    ${(props)=>props.margingLeft
      ?css`
        margin-left:${props.margingLeft}px;
      `:null
    }
`;