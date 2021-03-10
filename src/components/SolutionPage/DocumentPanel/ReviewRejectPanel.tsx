import React, { useRef, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Loading, LoadingPopup } from '@views/UserPage/LoginPage/LoginPage.style';
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
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '../../../assets/i18n/SolutionPage/solutionDocumentPage.json';

interface PanelProps {
    document_id:string;
    onClose: (event: React.MouseEvent) => void;
}


const Panel: React.VFC<PanelProps> = ({//TODO:API 확인 필요
    document_id,
    onClose
}) => {
  const { t, lang, changeLang } = useTranslate(i18nResource);
  const textareaRef= useRef<HTMLTextAreaElement|null>(null);

  const [errMsg, setErrMsg] = React.useState({
    ERROR_NOT_EXIST_USERNAME: false,
    ERROR_NOT_EXIST_LAST_NAME: false,
    ERROR_LAST_NAME_ONLY_ENGLISH: false,
    ERROR_NOT_EXIST_FIRST_NAME: false,
    ERROR_FIRST_NAME_ONLY_ENGLISH: false,
    ERROR_NOT_EXIST_EMAIL: false,
    ERROR_EXIST_EMAIL: false,
    ERROR_NOT_EXIST_PASSWORD: false,
    ERROR_NOT_EXIST_PASSWORD_CONFIRM: false,
    ERROR_NOT_EXIST_NATIONALITY: false,
    ERROR_NOT_EXIST_BIRTH_DATE: false,
    ERROR_NOT_EXIST_TOPIK_LEVEL: false,
    ERROR_NOT_EXIST_IDENTITY: false,
    ERROR_NOT_PROPER_PASSWORD: false,
    ERROR_PASSWORD_CONFIRM_FAIL: false,
    ERROR_NOT_VALID_EMAIL: false,
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  useEffect(() => {
    if (loading) {
      const errObj = { ...errMsg };
      Object.entries(errObj).map(([key, val]) => (errObj[key] = false));
      setErrMsg(errObj);
    }
  }, [loading]);

  const onSubmitReject = useCallback(
    (e:React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        e.stopPropagation();
      if(textareaRef.current!==null){
        setLoading(true);
        let sid = ""; 
        if(typeof window !== "undefined"){
          sid = window.sessionStorage.getItem('sid');
        }
         const data = {
            document_id: document_id,
            reason:textareaRef.current.value
         };
         
         axios.get(`/api/?action=user_doc_tnc_reject_check&params=${JSON.stringify(data)}&sid=${sid}`)
         .then(res=>{
             if(res.data.status==="success"){
                alert(t('request-review-return-completed-successfully'));
                location.reload();
             }
            setLoading(false);
         })
        .catch(error => {
          console.log(error.response);//중간에 실패가 돌아올 경우, 에러를 패치해야함.
          setLoading(false);
        });
      }
    },
    []
  );
    


  return (
        <BlurScreen>
          <PanelContainer>
        {loading && (
          <LoadingPopup>
            <Loading />
          </LoadingPopup>
        )}       
              <PanelTitle>{t('review-reject-reason')}</PanelTitle>
            <UserFieldContainer>
                <TextArea placeholder={t('enter-reason-rejected-review')} ref={textareaRef}>

                </TextArea>
            </UserFieldContainer>
            <ButtonContainer>
                <ReadyButton isCancle={true} onClick={onClose}>{t('cancle')}</ReadyButton>
                <ReadyButton isReady={true} onClick={onSubmitReject}>{t('completion')}</ReadyButton>
            </ButtonContainer>
          </PanelContainer>
        </BlurScreen>
        );
};

export default Panel;
