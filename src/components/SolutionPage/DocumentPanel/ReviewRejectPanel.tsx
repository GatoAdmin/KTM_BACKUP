import React, { Ref, RefObject } from 'react';
import axios from 'axios';
import {
    BlurScreen,
    PanelContainer,
    UserFieldContainer,
    ButtonContainer,
    PanelTitle
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


const onSubmitReject=(e)=>{
    e.preventDefault();
}
const Panel: React.VFC<PanelProps> = ({
    onClose
}) => {
  const { t, lang, changeLang } = useTranslate(i18nResource);

  return (
        <BlurScreen onClick={(e)=>onClose}>
          <PanelContainer>
              <PanelTitle>{t('review-reject-reason')}</PanelTitle>
            <UserFieldContainer>
                
            </UserFieldContainer>
            <ButtonContainer>
                <ReadyButton isCancle={true}>{t('cancle')}</ReadyButton>
                <ReadyButton isReady={true}>{t('completion')}</ReadyButton>
            </ButtonContainer>
          </PanelContainer>
        </BlurScreen>
        );
};

export default Panel;
