import styled, { css } from 'styled-components';
import { fontColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';


interface ReadyButtonProps {
    isReady : boolean;
}
interface TapItemProps {
    isViewTap : boolean;
}

export const BlockHeader = styled.p`
    font-weight: bold;
    font-size: 22px;
    line-height: 30px;
`; 

export const Block = styled.div`
    width: 1000px;
    padding: 37px 50px 20px;
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
  margin-right: 50px;
  width: 50%;
`;

export const TapItem = styled.div<TapItemProps>`
  text-decoration: none;
  font-weight: bold;
  padding: 21px 8px 18px 8px;
  ${(props)=>(props.isViewTap
    ?css`
    color: #DF4D3D;
    border-bottom: 3px solid #DF4D3D;
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
    border: 1px solid #DF4D3D;
    box-sizing: border-box;
    border-radius: 100px;

    ${(props)=>(props.isReady
        ?css`
            background:#DF4D3D;
            color: #FFFFFF;
        `
        :css`
            background:rgba(255, 114, 99, 0.08);
            color: #DF4D3D;
        `
    )};
`;