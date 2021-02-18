
import React from 'react';
import {BlurScreen, PanelContainer,Title,AgreementContainer,CloseButton} from './Agreement.style';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '../../../assets/i18n/solutionAgreement.json';

interface PanelProps {
  onClose: (event: React.MouseEvent) => void;
  onAgrre: (event: React.MouseEvent) => void;
}

const Panel: React.FC<PanelProps> = ({
  onClose,
  onAgrre,
  children
}) =>{
    const { t, lang, changeLang } = useTranslate(i18nResource);
    return (
        <BlurScreen>
        <PanelContainer>
            <Title> {t('agreementTitle')}</Title>
            <AgreementContainer>
                {t('agreement').split('/n').map(line => <p>{line}</p>)}
            </AgreementContainer>
            <CloseButton onClick={onAgrre}>동의</CloseButton>
            <CloseButton onClick={onClose}>닫기</CloseButton>
        </PanelContainer>
        </BlurScreen>);
};

export default Panel;
