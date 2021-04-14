import React, { useRef, useCallback, useEffect } from 'react';
import API from '@util/api';
import {
    BlurScreen,
    PanelContainer,
    UserFieldContainer,
    ButtonContainer,
    PanelTitle,
    TextArea
} from '@components/SolutionPage/DocumentPanel/Panel.style';
import {
    ReadyButton
}from '@components/SolutionPage/Common/Common.style';

import useVisible from '@util/hooks/useVisible';

interface PanelProps {
    document_id:number;
    t:any;
    onClose: (event: React.MouseEvent) => void;
}


const Panel: React.VFC<PanelProps> = ({//TODO:API 확인 필요
    document_id,
    onClose,
    t
}) => {
  const textareaRef= useRef<HTMLTextAreaElement|null>(null);

  const onSubmitReject = useCallback(
    (e:React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        e.stopPropagation();
      if(textareaRef.current!==null){
        let sid = ""; 
        if(typeof window !== "undefined"){
          sid = window.sessionStorage.getItem('sid');
        }
         const data = {
            document_id: document_id,
            reason:textareaRef.current.value
         };
         const key = `/?action=user_doc_tnc_reject_check&params=${JSON.stringify(data)}&sid=${sid}`;
         API.requestDocumentAction(key)
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
    },
    []
  );
    


  return (
        <BlurScreen>
          <PanelContainer>
              <PanelTitle>{t('review-reject-reason')}</PanelTitle>
            <UserFieldContainer>
                <TextArea placeholder={t('enter-reason-rejected-review')} ref={textareaRef}>

                </TextArea>
            </UserFieldContainer>
            <ButtonContainer>
                <ReadyButton isCancle={true} onClick={onClose}>{t('cancle')}</ReadyButton>
                <ReadyButton isReady={true} onClick={onSubmitReject}>{t('reject-completion')}</ReadyButton>
            </ButtonContainer>
          </PanelContainer>
        </BlurScreen>
        );
};

export default Panel;
