import React, { useState, useCallback, useRef, useEffect, ChangeEvent} from 'react';
import API from '@util/api';
import S3 from 'react-aws-s3';
import {DOCUMENT_TYPE_STRING} from '@components/SolutionPage/StepString';
import {
    UploadIcon,
    CloseIcon,
    IconContainer,
    FileFilterIconContainer,
    BlurScreen,
    PanelContainer,
    UserDragableFieldContainer,
    UserFileListContainer,
    FileListItem,
    FileListItemName,
    FileInput,
    ButtonContainer,
    PanelTitle,
    UploadTextContainer,
    HereTextContainer,
    Here
} from '@components/SolutionPage/DocumentPanel/Panel.style';
import {
    ReadyButton
}from '@components/SolutionPage/Common/Common.style';

interface PanelProps {
    status_id:number;
    univ_code:string;
    document_id:number;
    document_type:string;
    t:any;
    onClose: (event: React.MouseEvent) => void;
}
interface InputFileTypes {
    id: number;
    object: File;
  }

const Panel: React.VFC<PanelProps> = ({
    status_id,
    univ_code,
    document_id,
    document_type,
    t,
    onClose
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<InputFileTypes[]>([]);

  const dragRef = useRef<HTMLLabelElement | null>(null);
  const fileId = useRef<number>(0);  

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];
      let tempFiles: InputFileTypes[] = files;

      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }

      for (const file of selectFiles) {
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++,
            object: file
          }
        ];
      }

      setFiles(tempFiles);
    },
    [files]
  );

  const handleFilterFile = useCallback(
    (e:React.MouseEvent<HTMLDivElement, MouseEvent>, id: number): void => {
        e.preventDefault();
        e.stopPropagation();
      setFiles(files.filter((file: InputFileTypes) => file.id !== id));
    },
    [files]
  );

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);  

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();
    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);
  
  
  const s3config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    dirName:`media/${status_id}/${univ_code}/${document_id}`,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    s3Url : process.env.REACT_APP_S3_URL
  };
  const ReactS3Client = new S3(s3config);

  const reactS3Upload = useCallback((file:File)=>{
    return new Promise(function(resolve, reject){
      ReactS3Client
          .uploadFile(file,file.name)
          .then(data=>{
            if(data.status===204){
              resolve({doc_url: `media/${status_id}/${univ_code}/${document_id}`, file_name:file.name})
            }else{
              console.error(data);
            }
          })
          .catch(error => {
            console.error(error);
            reject(error);
          });
    })
  },[files]);
  const s3Upload = useCallback(()=>{
    return new Promise(async function(resolve, reject){
      let doc_url_list:Array<string> = [];
      let file_name_list:Array<string> = [];
      await Promise.all(files.map(async (file:InputFileTypes)=>{
        const {doc_url, file_name} = await reactS3Upload(file.object);
        doc_url_list.push(doc_url);
        file_name_list.push(file_name);
      }));
      
      if(doc_url_list.length>0){
        resolve({doc_url_list:doc_url_list,file_name_list:file_name_list })
      }else{
        reject();
      }
    });
  },[files]);
  
 const onSubmitUpload = useCallback(
  async (e: ChangeEvent<HTMLInputElement> | any) => { 
      e.preventDefault();
      if(files.length>0){
        s3Upload().then(
          list =>{
            let sid = ""; 
            if(typeof window !== "undefined"){
              sid = window.sessionStorage.getItem('sid');
            }
            const data = {
              document_id:document_id,
              doc_url:list.doc_url_list,
              doc_file_name:list.file_name_list
            };
            let rurl = '';
            if(document_type===DOCUMENT_TYPE_STRING.UPLOAD){
              rurl = `/?action=user_doc_upload_request&params=${JSON.stringify(data)}&sid=${sid}`;
            }else{
              rurl = `/?action=user_doc_app_request&params=${JSON.stringify(data)}&sid=${sid}`;
            }
            API.requestDocumentAction(rurl)
            .then(data=>{
              if(data.status==='success'){
                location.reload();
              }else{
                console.error(data.status);
            }
            })
            .catch(error => {
              console.error(error);
            });

          }
        )
      }
     
    },
    [files]
  );
  return (
        <BlurScreen>
          <PanelContainer>
                <PanelTitle>{t('to-add-file')}</PanelTitle>
                <FileInput type="file" id="fileUpload" multiple={true} onChange={onChangeFiles}/>
                <UserDragableFieldContainer isDragging={isDragging} ref={dragRef}>
                    <UploadTextContainer>
                        <IconContainer><UploadIcon/></IconContainer>
                    {t('going-to-upload-file-here')}<br/>
                    {t('drag-it')}<br/>
                    <HereTextContainer>{t('or')}<Here htmlFor="fileUpload">{t('here')}</Here>{t('click-to-upload')}</HereTextContainer>
                    </UploadTextContainer>
                </UserDragableFieldContainer>
                <UserFileListContainer>
                    {files.length > 0 &&
                        files.map((file: InputFileTypes) => {
                            const {id, object: { name } } = file;
                            return (
                            <FileListItem key={id}>
                                <FileListItemName>{name}</FileListItemName>
                                <FileFilterIconContainer onClick={(e)=>handleFilterFile(e,id)}>
                                    <CloseIcon/>
                                </FileFilterIconContainer>
                            </FileListItem>
                            ); 
                    })}
                </UserFileListContainer>
                <ButtonContainer>
                    <ReadyButton isCancle={true} onClick={onClose}>{t('cancle')}</ReadyButton>
                    <ReadyButton isReady={true} onClick={(e)=>onSubmitUpload(e)}>{t('completion')}</ReadyButton>
                </ButtonContainer>
          </PanelContainer>
        </BlurScreen>
        );
};

export default Panel;
