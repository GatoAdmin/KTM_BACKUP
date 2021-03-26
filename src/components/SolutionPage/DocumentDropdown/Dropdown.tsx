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
    t;
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
  const {status,document_type,url, univ_code, user_id, id } = userdocument;
  const document_name = userdocument.document;
//   const [visible, setVisible] =useState<boolean>(false);
//   const { t, lang, chakngeLang } = useTranslate(i18nResource);
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
    //bucket: "katumm-bucket-seoul"
    //key: "media/32/SMU_UNI/334/ixjXwSYnxCbVDkZF6g2Cdr.jpeg"
    //location: "https://katumm-bucket-seoul.s3-ap-northeast-2.amazonaws.com/media/32/SMU_UNI/334/ixjXwSYnxCbVDkZF6g2Cdr.jpeg"
    //status: 204
    console.log(urlString)
    const params = {Bucket: process.env.REACT_APP_BUCKET_NAME, Key: `media/${arrayUrl[arrayUrlLength-4]}/${arrayUrl[arrayUrlLength-3]}/${arrayUrl[arrayUrlLength-2]}/${arrayUrl[arrayUrlLength-1]}`}
    // const params = {Bucket: process.env.REACT_APP_BUCKET_NAME, Key:'media/32/SMU_UNI/334/ixjXwSYnxCbVDkZF6g2Cdr.jpeg'}
    // const params ={Bucket: process.env.REACT_APP_BUCKET_NAME,Key:'media/32/SMU_UNI/334/download.jpg'}
    s3.getObject(params, (err, data)=>{
        if (err){console.log(err)}
        console.log(data);
        if(data){
            const blob = new Blob([data.Body], {type: data.ContentType});
            const fileName = arrayUrl[arrayUrlLength-1];//'ixjXwSYnxCbVDkZF6g2Cdr.jpeg'
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            // decodeURI(fileName[fileName.length-1]);
            a.download = decodeURI(fileName)//`${fileName[fileName.length-1]}`//`${name}_${fileName[fileName.length-1]}`
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
                    console.log(data)
                    if(data.status==="success"){
                        location.reload();
                    }
                })
                .catch(error => {
                    console.log(error);//중간에 실패가 돌아올 경우, 에러를 패치해야함
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
                    console.log(data)
                    if(data.status==="success"){
                        location.reload();
                    }
                })
                .catch(error => {
                    console.log(error);//중간에 실패가 돌아올 경우, 에러를 패치해야함
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
                    {value==="upload"&&visibleUpload?<UploadPanel onClose={()=>setVisibleUpload(false)} user_id={user_id} univ_code={univ_code} document_id={id} document_type={document_type} t={t}/>:null}
                
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
