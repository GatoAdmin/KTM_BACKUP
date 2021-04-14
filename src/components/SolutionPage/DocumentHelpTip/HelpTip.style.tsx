import styled, { css } from 'styled-components';
import { fontColor,mainColor600, whiteColor,greyColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';
import closeSVG from '@assets/svg/close_icon.svg'

export const CloseIcon = styled(closeSVG)``;
export const IconContainer = styled.div`
    position: fixed;
    z-index: 10;
    cursor: pointer;
`;
export const BlurScreen =  styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 99;
    background: rgba(196, 196, 196, 0.8);
`;

export const PanelContainer = styled.div`
    position: relative;
    width: max-content;
    max-width: 1100px;
    height: max-content;
    max-height: 90%;
    padding: 10px;
    top:50px;
    margin: auto;
    background: ${whiteColor};
    border-radius: 3px;
    z-index: 100;
    overflow-y: scroll;
    overflow-x: hidden;
`;

export const ImageContainer = styled.div`
    position: relative;
    width: max-content;
    max-width: 1080px;
    height: max-content;
    max-height: 100%;
    padding: 10px;
    margin: auto;
`;

export const ButtonContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
`;

export const HelpTipContainer = styled.div`
    display: absolute;
    width: max-content;
`;

export const Image = styled.img`
    width: 100%;
    height: auto;
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


interface TextProps{
    lang?:string;
}
export const HelpText = styled.div<TextProps>`
    color: ${mainColor600};
    ${props=>props.lang==="vn"
        ?css`margin-left : 29px;`
        :css`margin-left : 18px;`
    }
    cursor: pointer;
`;