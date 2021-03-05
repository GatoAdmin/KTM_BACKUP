import styled, { css } from 'styled-components';
import { fontColor,mainColor600, whiteColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';
import unchekedRadioSVG from '@assets/svg/uncheked_radio_icon.svg';
import chekedRadioSVG from '@assets/svg/cheked_radio_icon.svg';

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
`;

export const ImageContainer = styled.div`
    position: relative;
    width: max-content;
    max-width: 1080px;
    height: max-content;
    max-height: 100%;
    padding: 10px;
    margin: auto;
    border: 1px solid rgba(196, 196, 196, 0.8);
    border-radius: 3px;
    overflow-y: auto;
    overflow-x: hidden;
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
`;

export const HelpText = styled.div`
    color: ${mainColor600};
    margin-left : 18px;
    cursor: pointer;
`;