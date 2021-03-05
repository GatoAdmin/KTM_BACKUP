
import React from 'react';
import {BlurScreen, PanelContainer,Image,ImageContainer,CloseButton} from './HelpTip.style';

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
        <BlurScreen onClick={onClose}>
          <PanelContainer>
            <ImageContainer>
              <Image src={url}/>
            </ImageContainer>
          </PanelContainer>
        </BlurScreen>);
};

export default Panel;