import styled, { css } from 'styled-components';
import { fontColor,greyColor,mainColor600, whiteColor,lightGreyColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';
import uploadSVG from '@assets/svg/upload_plus_icon.svg';
import closeSVG from '@assets/svg/close_icon.svg';

export const UploadIcon = styled(uploadSVG)``;
export const CloseIcon = styled(closeSVG)``;

export const IconContainer = styled.div``;

interface DragProps{
    isDragging:boolean;
};

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
    width: 842px;
    height: max-content;
    max-height: 90%;
    padding: 17px 24px;
    top:50px;
    margin: auto;
    background: ${whiteColor};
    border: 1px solid #DFE0EB;
    box-sizing: border-box;
    border-radius: 8px;
    cursor: default;
    z-index: 100;
`;

export const UserFieldContainer = styled.div`
    width: 794px;
    height: 248px;
    
    background: rgba(255, 114, 99, 0.08);
    box-sizing: border-box;
    border-radius: 8px;

    margin: 30px 0px 0px 0px;
`;
export const FileInput = styled.input`
    display: none;
`;
export const UserDragableFieldContainer = styled.label<DragProps>`
    display: block;
    width: 794px;
    height: 248px;

    background: rgba(255, 114, 99, 0.08);
    box-sizing: border-box;
    border-radius: 8px;

    margin: 30px 0px 0px 0px;
    color:${fontColor};

    cursor:default;
    ${(props)=>(props.isDragging
        ?css`
            background: ${lightGreyColor};
            outline: 2px dashed ${whiteColor};
            outline-offset:-10px;
            color: ${whiteColor};     
        `:null
    )}
`;

export const UserFileListContainer = styled.div`
    display:flex;
    margin: 12px 0 46px 0;
    flex-wrap: wrap;
`;

export const FileListItem = styled.div`
    display:flex;
    margin-right:8px;
    margin-bottom:8px;
    background: rgba(255, 114, 99, 0.08);
    box-sizing: border-box;
    border-radius: 8px;    
    padding: 15px 18px 15px 20px;
    font-weight: bold;
    font-size: 16px;
    line-height: 23px;
    color: ${fontColor};
    text-align: center;
    align-items: center;
`;

export const FileListItemName = styled.div`
`;
export const FileFilterIconContainer = styled.div`
    display: flex;
    margin-left: 10px;
    align-items: center;
    cursor: pointer;
`;

export const PanelTitle = styled.div`
    color: ${fontColor};
    font-weight: bold;
    font-size: 20px;
    line-height: 29px;
    letter-spacing: 0.4px;

    margin-top: 10px;
    margin-left: 1px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 0px;
    margin-top :23px;
`;

export const UploadTextContainer = styled.div`
    text-align: center;
    padding-top: 53px;
    vertical-align: middle;
    cursor: pointer;
    font-weight: bold;
    font-size: 20px;
    line-height: 29px;
`;

export const HereTextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
`;

export const Here = styled.div`
    margin:0px 2px;
    color: ${mainColor600};
    text-decoration-line: underline;
`;