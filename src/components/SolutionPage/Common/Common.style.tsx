import styled, { css } from 'styled-components';
import { fontColor,mainColor600, whiteColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';
import unchekedRadioSVG from '@assets/svg/uncheked_radio_icon.svg';
import chekedRadioSVG from '@assets/svg/cheked_radio_icon.svg';

interface ReadyButtonProps {
    isReady : boolean;
}
interface TapItemProps {
    isViewTap : boolean;
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
  justify-content: space-around;
  flex: 1 1 0;
  padding: 0 665px 0 0;
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

    ${(props)=>(props.isReady
        ?css`
            background:${mainColor600};
            color: #FFFFFF;
        `
        :css`
            background:rgba(255, 114, 99, 0.08);
            color: ${mainColor600};
        `
    )};
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
