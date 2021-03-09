import React, { useState } from 'react';
import axios from 'axios';
import {
    DropdownItemContainer,
    DropdownContainer,
    DropdownMoreIconContainer,
    MoreViewOnIcon,
    MoreViewOffIcon,
    DropdownItem,
    IconContainer,
    ReviewRejectIcon,
    TransferCompletedIcon,
    ReviewCompletedIcon,
    UploadIcon,
    DownloadIcon
} from '@components/SolutionPage/DocumentDropdown/Dropdown.style';
import ReviewRejectPanel from '@components/SolutionPage/DocumentPanel/ReviewRejectPanel';
import UploadPanel from '@components/SolutionPage/DocumentPanel/UploadPanel';
import useVisible from '@util/hooks/useVisible';

import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '@assets/i18n/SolutionPage/solutionDocumentPage.json';

interface DropdownProps {
    url?: string;
    document?:string;
    type: string;
    status: string;
}

const dropdownIcon = {
    reviewReject: ReviewRejectIcon,
    transferCompleted: TransferCompletedIcon,
    reviewCompleted: ReviewCompletedIcon,
    upload: UploadIcon,
    download: DownloadIcon
  } as const;

  const arrayKeeper = {
    '번역 공증 영사': {//Translation and notarization[
        'DOC_POST_REQUEST': 
            ['download',
            'transferCompleted'],
        'DOC_CHECK_REQUEST': 
            ['download',
            'reviewCompleted',
            'reviewReject'],
        'DOC_CHECK_REJECT': 
            ['download'],
        'DOC_CONSUL_PROCESSING': 
            ['download'],
        'END': 
            ['download'],
    },
    '번역공증서류':{
        'DOC_POST_REQUEST': 
            ['download',
            'transferCompleted'],
        'DOC_CHECK_REQUEST': 
            ['download',
            'reviewCompleted',
            'reviewReject'],
        'DOC_CHECK_REJECT': 
            ['download'],
        'END': 
            ['download'],
    },
    '업로드 서류':{
        'DOC_UPLOAD_REQUEST': 
            ['download',
            'upload'],
        'DOC_CHECKING': 
            ['download'],
        'END': 
            ['download'],
    },
    '우편서류':{
        'DOC_POST_REQUEST': 
            ['download',
            'transferCompleted']
    },
    '원서 접수 서류':{
        'DOC_UPLOAD_REQUEST': 
            ['download',
            'upload'],
        'DOC_CHECKING': 
            ['download'],
        'END': 
            ['download'],
    }
  };

  const downloadFile=(urlString:string, name:string)=>{
    const blob = new Blob([urlString], {type: 'text/plain'});
    const fileName = urlString.split('/');
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}_${fileName[fileName.length-1]}`
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url);
}

const uploadFile=()=>{
    console.log("업로드");
}

const Dropdown: React.VFC<DropdownProps> = ({
    url="",
    document="",
    type,
    status
}) => {
//   const [inputValue, setInputValue] = React.useState<string | number>(placeholder);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visibleReject, toggleVisibleReject] = useVisible(containerRef);
//   const [visibleUpload, toggleVisibleUpload] = useVisible(containerRef);
  const [visibleUpload, setVisibleUpload] = useState<boolean>(false);
  const [visible, toggleVisible] = useVisible(containerRef);
//   const [visible, setVisible] =useState<boolean>(false);
  const { t, lang, changeLang } = useTranslate(i18nResource);
  
    const onClickDropdownItem=(e:MouseEvent, type:string, url:string, document:string)=>{
        e.preventDefault();
        if(type==="reviewReject"){
            toggleVisibleReject();
        }else if(type==="transferCompleted"){

        }else if(type==="reviewCompleted"){

        }else if(type==="upload"){
            if(visibleUpload===false){
                // toggleVisibleUpload();
                setVisibleUpload(true);
            }
            return false;
        }else if(type==="download"){
            downloadFile(url, document);
        }    
    }
    React.useEffect(() => {
        console.log(visible);
      }, [visible]);
    
    const options = arrayKeeper[type][status];
    return (
      <DropdownContainer ref={containerRef}>
         <DropdownMoreIconContainer  onClick={()=>{console.log("너냐"); toggleVisible()}}>
            <MoreViewOnIcon />
            <MoreViewOffIcon />
        </DropdownMoreIconContainer>
        {options!==undefined&&options.length>0 
        ?<DropdownItemContainer items={options.length} show={visible}>
            
        {options.map((value, index) =>{
            const Icon = dropdownIcon[value];
            return (  
                <DropdownItem key={value} onClick={e=>onClickDropdownItem(e,value,url,document)} >
                    {value==="reviewReject"&&visibleReject?<ReviewRejectPanel onClose={(e)=>toggleVisibleReject()}/>:null}
                    {value==="upload"&&visibleUpload?<UploadPanel onClose={()=>setVisibleUpload(false)}/>:null}
                    <IconContainer>
                       <Icon/>
                    </IconContainer> 
                    {t(value)} 
                </DropdownItem>
            );
        } )}
        </DropdownItemContainer>
        :null
        }
      </DropdownContainer>
  );
};

export default Dropdown;
