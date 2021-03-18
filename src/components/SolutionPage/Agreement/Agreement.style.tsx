import styled, { css } from 'styled-components';
import { fontColor,mainColor600, whiteColor,greyColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';
import unchekedRadioSVG from '@assets/svg/uncheked_radio_icon.svg';
import chekedRadioSVG from '@assets/svg/cheked_radio_icon.svg';

export const BlurScreen =  styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    z-index: 99;
    background: rgba(196, 196, 196, 0.8);
`;

export const PanelContainer = styled.div`
    position: relative;
    width: 1100px;
    height: 720px;
    top: 50px;
    margin: auto;
    background: ${whiteColor};
    border-radius: 3px;
    z-index: 100;
    padding: 10px;
`;

export const Title = styled.div`
    padding: 20px 50px 10px;
    margin: auto;
    font-weight: bold;
    font-size: 22px;
    line-height: 30px;
`;

export const AgreementContainer = styled.div`
    width: 970px;
    height: 560px;
    padding: 10px;
    margin: 10px auto 20px auto;
    border: 1px solid rgba(196, 196, 196, 0.8);
    border-radius: 3px;
    overflow-y: scroll;
`;
export const ButtonContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
`;
export const CloseButton = styled.button`
    margin: auto;
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
    background:${greyColor};
    border: 1px solid ${greyColor};
    color: ${whiteColor};
`;


export const FirstStep = styled.p`
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
`
export const TwoStep = styled.p`
    text-indent: 2em;
`

export const ThreeStep = styled.p`
    text-indent: 3em;
`