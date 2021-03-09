import React, { useState, useCallback, useRef, useEffect, ChangeEvent} from 'react';
import axios from 'axios';
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

import useVisible from '@util/hooks/useVisible';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '../../../assets/i18n/SolutionPage/solutionDocumentPage.json';

interface PanelProps {
    onClose: (event: React.MouseEvent) => void;
}
interface InputFileTypes {
    id: number;
    object: File;
  }

const onSubmitReject=(e)=>{
    e.preventDefault();
}
const Panel: React.VFC<PanelProps> = ({
    onClose
}) => {
  const { t, lang, changeLang } = useTranslate(i18nResource);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<InputFileTypes[]>([]);

  const dragRef = useRef<HTMLLabelElement | null>(null);
  const fileInput = React.createRef<HTMLInputElement | null>();//useRef<HTMLInputElement | null>(null);
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

  const onClickHere = useCallback(
    (e:React.MouseEvent<HTMLDivElement, MouseEvent>): void =>{
    e.preventDefault();
    // const fileInput = document.getElementById('fileUpload');
    if (fileInput.current !== null) {
        console.log("file")
        fileInput.current.click();
    }
    // if(fileInput!== null){
    //     fileInput.click();
    //     console.log("꾸에")
    // }
  },[]);

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
// 
  return (
        <BlurScreen>
          <PanelContainer>
                <PanelTitle>{t('to-add-file')}</PanelTitle>
                {/* <input type="file" id="fileUpload"/> */}
                <FileInput type="file" id="fileUpload" multiple={true} onChange={onChangeFiles}/>
                <UserDragableFieldContainer isDragging={isDragging} htmlFor="fileUpload" ref={dragRef}>
                    <UploadTextContainer>
                        <IconContainer><UploadIcon/></IconContainer>
                    {t('going-to-upload-file-here')}<br/>
                    {t('drag-it')}<br/>
                    <HereTextContainer>{t('or')}<Here onClick={(e)=>onClickHere(e)}>{t('here')}</Here>{t('click-to-upload')}</HereTextContainer>
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
                    <ReadyButton isReady={true}>{t('completion')}</ReadyButton>
                </ButtonContainer>
          </PanelContainer>
        </BlurScreen>
        );
};

export default Panel;
