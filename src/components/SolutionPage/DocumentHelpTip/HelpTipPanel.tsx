
import React from 'react';
import {BlurScreen, PanelContainer,Image,ImageContainer,IconContainer,CloseIcon} from './HelpTip.style';

interface PanelProps {
  onClose: (event: React.MouseEvent) => void;
  url: string;
}

const Panel: React.FC<PanelProps> = ({
  onClose,
  url,
  children
}) =>{    
    return (
        <BlurScreen >
          <PanelContainer>
            <IconContainer>
              <CloseIcon onClick={onClose}/>
            </IconContainer>
            <ImageContainer>
              <Image src={url}/>
            </ImageContainer>
          </PanelContainer>
        </BlurScreen>);
};

export default Panel;