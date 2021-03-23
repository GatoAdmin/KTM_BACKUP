import styled, { css } from 'styled-components';
import { fontColor,mainColor600, whiteColor, lightGreyColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';
import reviewRejectSVG from '@assets/svg/review_reject_icon.svg';
import transferCompletedSVG from '@assets/svg/transfer_completed_icon.svg';
import reviewCompletedSVG from '@assets/svg/review_completed_icon.svg';
import uploadSVG from '@assets/svg/upload_icon.svg';
import downloadSVG from '@assets/svg/download_icon.svg';
import moreViewOffSVG from '@assets/svg/more_view_icon_off.svg';
import moreViewOnSVG from '@assets/svg/more_view_icon_on.svg';

interface ContainerProps {
    items : number;
    show: boolean;
    lang?: string;
}
interface ItemProps {
    lang?: string;
}
interface IconProps{
    type?: string;
}
export const ReviewRejectIcon = styled(reviewRejectSVG).attrs({
    viewBox: '0 0 18 18'
})`
    width: 15px;
    height: 15px;`;
export const TransferCompletedIcon = styled(transferCompletedSVG).attrs({
    viewBox: '0 0 18 18'
})`
    width: 15px;
    height: 15px;`;
export const ReviewCompletedIcon = styled(reviewCompletedSVG).attrs({
    viewBox: '0 0 18 18'
})`
    width: 15px;
    height: 15px;`;
export const UploadIcon = styled(uploadSVG).attrs({
    viewBox: '0 0 17 17'
})`
    width: 15px;
    height: 15px;`;
export const DownloadIcon = styled(downloadSVG).attrs({
    viewBox: '0 0 17 17'
})`
    width: auto;
    height: 15px;
    `;
export const MoreViewOnIcon = styled(moreViewOnSVG)`
    display:none;
    width: 26px;
    height: 26px;
    `;
export const MoreViewOffIcon = styled(moreViewOffSVG)`
    display:block;
    width: 26px;
    height: 26px;
`;

export const DropdownMoreIconContainer = styled.div`
  width: 26px;
  height: 26px;
  cursor: pointer;
  :hover ${MoreViewOffIcon}{
      display:none;
  }
  :hover ${MoreViewOnIcon}{
      display:block;
  }
`;
export const DropdownContainer = styled.div`
    position: relative;
`; 

export const DropdownItemContainer = styled.div<ContainerProps>`
    position: absolute;
    z-index: 50;
    top: 30px;
    right: 36px;
    min-height: 40px;
    ${(props)=>(props.items
        ?css`height:${props.items*40}px`
        :null
        )};
    ${(props) => (props.show
        ? css`
                display: block;
            `
        : css`
                display: none;
            `)}
    ${(props)=>(props.lang==="vn"
        ?css`width: 152px;`
        :css`width: 120px;`
    )}
    background: ${whiteColor};
    border: 1px solid ${lightGreyColor};
    box-sizing: border-box;
    border-radius: 9px;
    color: ${fontColor}
`; 


export const DropdownItem = styled.div<ItemProps>`
    white-space: nowrap;
    height: 18px;
    display: flex;
    align-items: center;
    background: ${whiteColor};
    padding: 10px 15px;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    ${(props)=>(props.lang==="vn"
        ?css`width: 120px;`
        :css`width: 88px;`
        )}
    :first-child{
        border-radius: 9px 9px 0px 0px;
    };
    :last-child{
        border-radius: 0px 0px 9px 9px;
    };
    
    :only-child{
        border-radius: 9px 9px 9px 9px;
    };

    &+&{
        border-top: 1px solid ${lightGreyColor};
    };
    :hover{
        background: rgba(255, 114, 99, 0.08);
        color: ${mainColor600};
    }
`; 

export const IconContainer =  styled.div<IconProps>`
    width: 15px;
    height: 15px;
    ${(props)=>(props.type==="reviewCompleted"
    ?css` margin-right:7px; `
    :props.type==="reviewReject"
    ?css` margin-right:7px; `
    :props.type==="transferCompleted"
    ?css` margin-right:7.5px; `
    :css` margin-right:10px; `
    )}
`; 