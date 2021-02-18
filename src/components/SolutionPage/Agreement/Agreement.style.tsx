import styled, { css } from 'styled-components';
import { fontColor,mainColor600, whiteColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';
import unchekedRadioSVG from '@assets/svg/uncheked_radio_icon.svg';
import chekedRadioSVG from '@assets/svg/cheked_radio_icon.svg';

export const BlurScreen =  styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    z-index: 99;
    background: rgba(196, 196, 196, 0.8);
`;

export const PanelContainer = styled.div`
    position: absolute;
    width: 1100px;
    height: 700px;
    top: 50px;
    left: 400px;
    margin: auto;
    background: ${whiteColor};
    z-index: 100;
`;

export const Title = styled.div`
    padding: 10px 50px;
    margin: auto;
    font-weight: bold;
    font-size: 22px;
    line-height: 30px;
`;

export const AgreementContainer = styled.div`
    width: 990px;
    height: 580px;
    margin: auto;
    border: 1px solid rgba(196, 196, 196, 0.8);
    border-radius: 3px;
    overflow-y: scroll;
`;

export const CloseButton = styled.button`
    margin: auto;
`;