import styled, { css } from 'styled-components';
import { fontColor,whiteColor,mainColor600 } from '@util/style/color';
import { defaultFont } from '@util/style/font';

interface ColorProps{ 
    backgroundColor?:string;
    gradient?:string;
};
export const Union = styled.div<ColorProps>`
    position: relative;
    top: 11px;
    width: 190px;
    height: 101px;
    ${(props)=>(props.gradient?
        css`background: ${props.gradient}`
        :null
    )};
`;

export const Rectangle = styled.div<ColorProps>`
    position: absolute;
    display: flex;
    width: 190px;
    height: 90px;
    align-items: center;
    justify-content: center;

    background: ${(props)=>(props.backgroundColor)};
    border-radius: 27px 27px 0px 0px;
`;

export const RectangleText = styled.div`
    margin: auto;
    color: ${whiteColor};
    font-weight: bold;
    font-size: 20px;
    line-height: 26px;
    text-align: center;
`;

export const Polygon = styled.div<ColorProps>`
    position: absolute;
    width: 0px;
    height: 0px;
    left: 78px;
    top: 90px;
    border-top:17px solid none;
    border-bottom: 17px solid ${(props)=>(props.backgroundColor)};
    border-right: 17px solid transparent;
    border-left: 17px solid  transparent;
    transform: rotate(-180deg);
`;