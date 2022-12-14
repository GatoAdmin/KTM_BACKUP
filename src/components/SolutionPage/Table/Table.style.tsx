import styled,{css}from 'styled-components';
import { fontColor, whiteColor,mainColor600,lightGreyColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';

interface ColumnProps{
    width?: number;
    textAlign?: string;
    fontSize?: number;
    oneLine?:boolean;
}

interface RowProps{
  accent?:boolean;
  readonly?:boolean;
  alarm?:boolean;
}
export const Table = styled.div`
  display: block;
  margin: 18px auto;
`;

export const Row = styled.div<RowProps>`
  display: flex;
  width: 990px;
  min-height: 62px;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;

  :first-child{
    border-top : 1px solid ${lightGreyColor};
  };
  border-bottom : 1px solid ${lightGreyColor};

  ${(props)=>(props.accent
    ?css`
      border-top : 2px solid ${lightGreyColor};
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

    ${(props)=>(props.alarm
      ?css`
        background: rgba(255, 114, 99, 0.08);
        color: ${mainColor600};
      `
      :null
      )};
  
      

`;
//min-width: 61px;
export const Column = styled.div<ColumnProps>`
    padding: 17px;
    
    align-items: center;
    align-self: center;
    
    ${(props)=>(props.width
        ?css`width:${props.width*61}px`
        :null
        )};

    ${(props)=>(props.textAlign
        ?css`text-align:${props.textAlign}`
        :null
        )};  
    ${(props)=>(props.fontSize
      ?css`
        font-size: ${props.fontSize}px;
        line-height: ${props.fontSize*1.4}px;
      `:null
      )}
    ${(props)=>(props.oneLine
      ?css` white-space: nowrap;  `
      :null
      )}
`;

export const WarningColumn = styled.div<ColumnProps>`
    min-width: 150px;
    padding: 12px 0px 12px 17px;
    height: auto;
    ${(props)=>(props.width
        ?css`width:${props.width*61}px`
        :null
        )};

    ${(props)=>(props.textAlign
        ?css`text-align:${props.textAlign}`
        :null
        )};  
    ${(props)=>(props.fontSize
      ?css`
        font-size: ${props.fontSize}px;
        line-height: ${props.fontSize*1.4}px;
      `:null
      )}
    ${(props)=>(props.oneLine
      ?css` white-space: nowrap;  `
      :null
      )}
`;

export const FlexColumn = styled.div<ColumnProps>`
    display: flex;
    min-width: 150px;
    padding: 17px;

    align-items: center;

    ${(props)=>(props.width
        ?css`width:${props.width*61}px`
        :null
        )};

    ${(props)=>(props.textAlign
        ?css`
          justify-content: ${props.textAlign};
        `
        :null
        )};  
    ${(props)=>(props.fontSize
      ?css`
        font-size: ${props.fontSize}px;
        line-height: ${props.fontSize*1.4}px;
      `:null
      )}
    ${(props)=>(props.oneLine
      ?css` white-space: nowrap;  `
      :null
      )}
`;
export const HeaderRow = styled.div`
  display: flex;
  width: 990px;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;

  border-bottom : 2px solid ${lightGreyColor};
`;


export const HeaderColumn = styled.div<ColumnProps>`
    font-weight: bold;
    min-width: 213px;
    padding: 17px;
    ${(props)=>(props.width
      ?css`width:${props.width*61}px`
      :null
      )};

    ${(props)=>(props.textAlign
        ?css`text-align:${props.textAlign}`
        :null
        )};      
    ${(props)=>(props.fontSize
      ?css`
        font-size: ${props.fontSize}px;
        line-height: ${props.fontSize*1.4}px;
      `:css`
        font-size: 16px;
        line-height: 22px;
      `
      )}
    ${(props)=>(props.oneLine
      ?css` white-space: nowrap;  `
      :null
      )}
`;

export const HeaderFlexColumn = styled.div<ColumnProps>`
    display:flex;
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

export const RequireIcon = styled.div`
      color: ${mainColor600};
      margin-left: 5px;
`;