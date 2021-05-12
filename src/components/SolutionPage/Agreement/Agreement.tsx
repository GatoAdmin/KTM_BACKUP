import React from 'react';
import {
  BlurScreen,
  PanelContainer,
  Title,
  AgreementContainer,
  ButtonContainer,
  CloseButton,
  FirstStep,
  TwoStep,
  ThreeStep,
} from './Agreement.style';

interface PanelProps {
  onClose: (event: React.MouseEvent) => void;
  onAgrre?: (event: React.MouseEvent) => void;
  t: any;
}

const Panel: React.FC<PanelProps> = ({ onClose, onAgrre, t, children }) => {
  return (
    <BlurScreen>
      <PanelContainer>
        <Title>{t('agreementTitle')}</Title>
        <AgreementContainer>
          {t('agreement')
            .split('/n')
            .map((line) => {
              const firstChar = line.charAt(0);
              if (firstChar === '제') {
                return <FirstStep>{line}</FirstStep>;
              } else if (Number.isInteger(parseInt(firstChar))) {
                return <ThreeStep>{line}</ThreeStep>;
              }
              return <TwoStep>{line}</TwoStep>;
            })}
        </AgreementContainer>
        <ButtonContainer>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ButtonContainer>
      </PanelContainer>
    </BlurScreen>
  );
};

export default Panel;
