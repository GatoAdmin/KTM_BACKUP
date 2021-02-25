
import React from 'react';
import {BlurScreen, PanelContainer,Title,AgreementContainer,CloseButton,FirstStep, TwoStep,ThreeStep} from './Agreement.style';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '../../../assets/i18n/SolutionPage/solutionAgreement.json';

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
        <BlurScreen onClick={onClose}>
          <PanelContainer>
              <Title> {t('agreementTitle')}</Title>
              <AgreementContainer>
                  {t('agreement').split('/n').map((line) => {
                    const firstChar = line.charAt(0);
                    if(firstChar === "제"){
                      return <FirstStep>{line}</FirstStep>;
                    }else if(Number.isInteger(parseInt(firstChar))){
                      return <ThreeStep>{line}</ThreeStep>;
                    }
                    return <TwoStep>{line}</TwoStep>;
                    })}
              </AgreementContainer>
              {/* <CloseButton onClick={onAgrre}>동의</CloseButton>
              <CloseButton onClick={onClose}>닫기</CloseButton> */}
          </PanelContainer>
        </BlurScreen>);
};

export default Panel;