import styled,{css}from 'styled-components';
import { fontColor, whiteColor,mainColor600 } from '@util/style/color';
import { defaultFont } from '@util/style/font';

interface ColumnProps{
    width?: number;
    textAlign?: string;
}

interface RowProps{
  accent?:boolean;
  readonly?:boolean;
}
export const Table = styled.div`
  display: block;
  margin: 18px auto;
`;

export const Row = styled.div<RowProps>`
  display: flex;
  width: 990px;
  height: 62px;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;

  :first-child{
    border-top : 1px solid #C4C4C4;
  };
  border-bottom : 1px solid #C4C4C4;

  ${(props)=>(props.accent
    ?css`
      border-top : 2px solid #C4C4C4;
      background: rgba(255, 114, 99, 0.08);      
      font-weight: bold;
      font-size: 18px;
      line-height: 25px;
      color: ${mainColor600};
    `
    :null
    )};  

  ${(props)=>(props.readonly
    ?css`
      background: #F7F7F7;
      font-weight: bold;
      font-size: 16px;
      line-height: 22px; 
    `
    :null
    )};  
`;

export const Column = styled.div<ColumnProps>`
    min-width: 150px;
    padding: 17px;
    ${(props)=>(props.width
        ?css`width:${props.width*61}px`
        :null
        )};

    ${(props)=>(props.textAlign
        ?css`text-align:${props.textAlign}`
        :null
        )};  
`;

export const HeaderRow = styled.div`
  display: flex;
  width: 990px;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;

  border-bottom : 2px solid #C4C4C4;
`;


export const HeaderColumn = styled.div`
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    min-width: 213px;
    padding: 17px;
`;

export const TopBottomNonPaddingColumn = styled.div<ColumnProps>`
    min-width: 150px;
    padding: 0px 17px 0px 17px;
    ${(props)=>(props.width
        ?css`width:${props.width*61}px`
        :null
        )};

    ${(props)=>(props.textAlign
        ?css`text-align:${props.textAlign}`
        :null
        )};  
`;