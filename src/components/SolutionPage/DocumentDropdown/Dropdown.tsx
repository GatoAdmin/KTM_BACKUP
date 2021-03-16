import React, { useState } from 'react';
import axios from 'axios';
import Aws from 'aws-sdk/dist/aws-sdk-react-native';
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
    userdocument:{
        id: number;
        user_id: number;
        univ_code: string;
        info_type: string;
        subjecttitle: string;
        status: string;
        refund_type: number;
        document_type: string;
        document_id: string;
        document: string;
        url: string;
        help_file: string;
        admin_reason: string;
        user_reason: string;
        status_id: number;
        alarm: string;
    };
}

const dropdownIcon = {
    reviewReject: ReviewRejectIcon,
    transferCompleted: TransferCompletedIcon,
    reviewCompleted: ReviewCompletedIcon,
    upload: UploadIcon,
    download: DownloadIcon
  } as const;

  const arrayKeeper = {
    '영사서류': {//Translation and notarization[
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
    '업로드서류':{
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
    '원서서류':{
        'DOC_UPLOAD_REQUEST': 
            ['download',
            'upload'],
        'DOC_CHECKING': 
            ['download'],
        'END': 
            ['download'],
    }
  };


const uploadFile=()=>{
    console.log("업로드");
}

const Dropdown: React.VFC<DropdownProps> = ({
    userdocument
}) => {
//   const [inputValue, setInputValue] = React.useState<string | number>(placeholder);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visibleReject, setVisibleReject] = useState<boolean>(false);
  const [visibleUpload, setVisibleUpload] = useState<boolean>(false);
  const [visible, toggleVisible] = useVisible(containerRef);
  const {status,document_type,url, univ_code, user_id, document_id } = userdocument;
  const document_name = userdocument.document;
//   const [visible, setVisible] =useState<boolean>(false);
  const { t, lang, changeLang } = useTranslate(i18nResource);
  const downloadFile=(urlString:string, name:string)=>{
  const s3config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY
    };
  const s3 = new Aws.S3({params:{Bucket: process.env.REACT_APP_BUCKET_NAME}});

  s3.config.update(s3config)
    const arrayUrl =  urlString.split('/');
    const arrayUrlLength = arrayUrl.length;
    //TODO:url 형식이 정해지면 그에 따라서 바꿀것
    const params = {Bucket: process.env.REACT_APP_BUCKET_NAME, Key: `${arrayUrl[arrayUrlLength-5]}/${arrayUrl[arrayUrlLength-4]}/${arrayUrl[arrayUrlLength-3]}/${arrayUrl[arrayUrlLength-2]}/${arrayUrl[arrayUrlLength-1]}`}
    s3.getObject(params, (err, data)=>{
        if (err){console.log(err)}
        if(data){
            const blob = new Blob([data.Body], {type: data.ContentType});
            const fileName = urlString.split('/');
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${fileName[fileName.length-1]}`//`${name}_${fileName[fileName.length-1]}`
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url);
        }
    })
    
}
  const onClickDropdownItem=(e:MouseEvent, menu_type:string)=>{
        e.preventDefault();
        if(menu_type==="reviewReject"){
            if(visibleReject===false){
                setVisibleReject(true);
            }
        }else if(menu_type==="transferCompleted"){
            if(confirm(t('did-complete-mail-transfer'))){
                let sid = ""; 
                if(typeof window !== "undefined"){
                  sid = window.sessionStorage.getItem('sid');
                }
                let rUrl:string = '';
                if(document_type === '우편서류'){
                    rUrl=`/api/?action=user_doc_post_request&params=${JSON.stringify({document_id:document_id})}&sid=${sid}`;
                }else{
                    rUrl=`/api/?action=user_doc_tnc_post_request&params=${JSON.stringify({document_id:document_id})}&sid=${sid}`;
                }
                axios.get(rUrl)
                .then(res=>{
                    if(res.data.status==="success"){
                        location.reload();
                    }
                })
                .catch(error => {
                    console.log(error.response);//중간에 실패가 돌아올 경우, 에러를 패치해야함
                });
            }
        }else if(menu_type==="reviewCompleted"){
            if(confirm(t('did-completed-document-review'))){
                let sid = ""; 
                if(typeof window !== "undefined"){
                  sid = window.sessionStorage.getItem('sid');
                }
                let rUrl:string = '';
                if(document_type === '번역공증서류'){
                    rUrl=`/api/?action=user_doc_tnc_end&params=${JSON.stringify({document_id:document_id})}&sid=${sid}`;
                }else{
                    rUrl=`/api/?action=user_doc_tnc_consul&params=${JSON.stringify({document_id:document_id})}&sid=${sid}`;
                }
                axios.get(rUrl)
                .then(res=>{
                    if(res.data.status==="success"){
                        location.reload();
                    }
                })
                .catch(error => {
                    console.log(error.response);//중간에 실패가 돌아올 경우, 에러를 패치해야함
                });
            }
        }else if(menu_type==="upload"){
            if(visibleUpload===false){
                setVisibleUpload(true);
            }
            return false;
        }else if(menu_type==="download"){
            downloadFile(url, document_name);
        }    
    }

    const options = arrayKeeper[document_type][status];
    return (
      <DropdownContainer ref={containerRef}>
         <DropdownMoreIconContainer  onClick={()=>{toggleVisible()}}>
            <MoreViewOnIcon />
            <MoreViewOffIcon />
        </DropdownMoreIconContainer>
        {options!==undefined&&options.length>0 
        ?<DropdownItemContainer items={options.length} show={visible}>
            
        {options.map((value, index) =>{
            const Icon = dropdownIcon[value];
            return (  
                <div key={index}>
                    {value==="reviewReject"&&visibleReject?<ReviewRejectPanel document_id={document_id} onClose={()=>setVisibleReject(false)}/>:null}
                    {value==="upload"&&visibleUpload?<UploadPanel onClose={()=>setVisibleUpload(false)} user_id={user_id} univ_code={univ_code} document_id={document_id} document_type={document_type}/>:null}
                
                    <DropdownItem key={value} onClick={e=>onClickDropdownItem(e,value)} >
                        <IconContainer>
                        <Icon/>
                        </IconContainer> 
                        {t(value)} 
                    </DropdownItem>
                </div>
            );
        } )}
        </DropdownItemContainer>
        :null
        }
      </DropdownContainer>
  );
};

export default Dropdown;
