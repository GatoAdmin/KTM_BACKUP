import styled, { css } from 'styled-components';
import { fontColor,mainColor600, whiteColor, lightGreyColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';
import alarmSVG from '@assets/svg/alarm_icon.svg';

interface ContainerProps {
    show: boolean;
}

export const AlarmIcon = styled(alarmSVG).attrs({
    viewBox: '0 0 22 22'
})`
    width: 22px;
    height: 22px;`;

export const AlarmTextContainer = styled.div<ContainerProps>`
    flex-direction: row;
    align-items: center;
    padding: 2px 9px;

    position: absolute;
    z-index: 50;
    top: -${(self)=>(self.children.length<2?10:self.children.length*10)}px;
    left: 0;
    min-width: 50px;
    width: max-content;
    min-height: 17px;
    background: ${mainColor600};
    border-radius: 100px;

    color:${whiteColor};
    font-weight: bold;
    font-size: 12px;
    line-height: 17px;
    
    ${(props) => (props.show
        ? css`
                display: block;
            `
        : css`
                display: none;
            `)}
    >div:only-child{
        margin-left:0px;
        margin-right:0px;
    }
    >div{
        margin-left:5px;
        margin-right:5px;
    }
`; 


export const AlarmIconContainer = styled.div`
  width: 22px;
  height: 22px;
  cursor: pointer;
`;
export const AlarmContainer = styled.div`
    position: relative;
    margin-left: 15px;

    :hover  ${AlarmIconContainer}{
        display:none;
    }
    :hover ${AlarmTextContainer}{
        display:block;
    }
`; 
