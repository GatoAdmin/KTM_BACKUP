import React, { useState } from 'react';
import API from '@util/api';
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
import {DOCUMENT_TYPE_STRING} from '@components/SolutionPage/StepString';

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
        admin_reason: string|null;
        user_reason: string|null;
        status_id: number;
        alarm: boolean|null;
        is_essential: boolean;
        update_datetime: string,
    };
    lang?:string;
    t:any;
}

const dropdownIcon = {
    reviewReject: ReviewRejectIcon,
    transferCompleted: TransferCompletedIcon,
    reviewCompleted: ReviewCompletedIcon,
    upload: UploadIcon,
    download: DownloadIcon
  } as const;

  const arrayKeeper = {
    [DOCUMENT_TYPE_STRING.CONSULAR ]: {//Translation and notarization[
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
    [DOCUMENT_TYPE_STRING.TRANS_AND_NOTAR]:{
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
    [DOCUMENT_TYPE_STRING.UPLOAD]:{
        'DOC_UPLOAD_REQUEST': 
            ['download',
            'upload'],
        'DOC_CHECKING': 
            ['download'],
        'END': 
            ['download'],
    },
    [DOCUMENT_TYPE_STRING.POSTAL]:{
        'DOC_POST_REQUEST': 
            ['download',
            'transferCompleted']
    },
    [DOCUMENT_TYPE_STRING.APPLICATION]:{
        'DOC_UPLOAD_REQUEST': 
            ['download',
            'upload'],
        'DOC_CHECKING': 
            ['download'],
        'END': 
            ['download'],
    }
  };

const Dropdown: React.VFC<DropdownProps> = ({
    userdocument,
    lang,
    t
}) => {
//   const [inputValue, setInputValue] = React.useState<string | number>(placeholder);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visibleReject, setVisibleReject] = useState<boolean>(false);
  const [visibleUpload, setVisibleUpload] = useState<boolean>(false);
  const [visible, toggleVisible] = useVisible(containerRef);
  const {status,document_type,url, univ_code, status_id, id } = userdocument;
  const document_name = userdocument.document;

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
        
        const params = {Bucket: process.env.REACT_APP_BUCKET_NAME, Key: `media/${arrayUrl[arrayUrlLength-4]}/${arrayUrl[arrayUrlLength-3]}/${arrayUrl[arrayUrlLength-2]}/${arrayUrl[arrayUrlLength-1]}`}
        s3.getObject(params, (err, data)=>{
            if (err){console.error(err)}
            if(data){
                const blob = new Blob([data.Body], {type: data.ContentType});
                const fileName = arrayUrl[arrayUrlLength-1];
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = decodeURI(fileName);
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
                if(document_type === DOCUMENT_TYPE_STRING.POSTAL){
                    rUrl=`/?action=user_doc_post_request&params=${JSON.stringify({document_id:id})}&sid=${sid}`;
                }else{
                    rUrl=`/?action=user_doc_tnc_post_request&params=${JSON.stringify({document_id:id})}&sid=${sid}`;
                }
                API.requestDocumentAction(rUrl)
                .then(data=>{
                    if(data.status==="success"){
                        location.reload();
                    }else{
                        console.error(data.status);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            }
        }else if(menu_type==="reviewCompleted"){
            if(confirm(t('did-completed-document-review'))){
                let sid = ""; 
                if(typeof window !== "undefined"){
                  sid = window.sessionStorage.getItem('sid');
                }
                let rUrl:string = '';
                if(document_type === DOCUMENT_TYPE_STRING.TRANS_AND_NOTAR){
                    rUrl=`/?action=user_doc_tnc_end&params=${JSON.stringify({document_id:id})}&sid=${sid}`;
                }else{
                    rUrl=`/?action=user_doc_tnc_consul&params=${JSON.stringify({document_id:id})}&sid=${sid}`;
                }
                API.requestDocumentAction(rUrl)
                .then(data=>{
                    if(data.status==="success"){
                        location.reload();
                    }else{
                        console.error(data.status);
                    }
                })
                .catch(error => {
                    console.error(error);
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
        ?<DropdownItemContainer items={options.length} show={visible} lang={lang}>
            
        {options.map((value:string, index:number) =>{
            const Icon = dropdownIcon[value];
            return (  
                <>
                    {value==="reviewReject"&&visibleReject?<ReviewRejectPanel document_id={id} onClose={()=>setVisibleReject(false)} t={t}/>:null}
                    {value==="upload"&&visibleUpload?<UploadPanel onClose={()=>setVisibleUpload(false)} status_id={status_id} univ_code={univ_code} document_id={id} document_type={document_type} t={t}/>:null}
                
                    <DropdownItem key={value+index} onClick={e=>onClickDropdownItem(e,value)} lang={lang}>
                        <IconContainer type={value}>
                        <Icon/>
                        </IconContainer> 
                        {t(value)} 
                    </DropdownItem>
                </>
            );
        } )}
        </DropdownItemContainer>
        :null
        }
      </DropdownContainer>
  );
};

export default Dropdown;
