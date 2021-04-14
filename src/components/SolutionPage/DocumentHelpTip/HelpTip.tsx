import React,{useState} from 'react';
import {HelpText, HelpTipContainer} from './HelpTip.style';
import useVisible from '@util/hooks/useVisible';
import Panel from '@components/SolutionPage/DocumentHelpTip/HelpTipPanel'

interface HelpTipProps {
    url: string;
    t:any;
    lang?: string;
}

const HelpTip: React.VFC<HelpTipProps> = ({
    url,
    t,
    lang
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  // const [visible, toggleVisible] = useVisible(containerRef);
  const [isOpen, setIsOpen]= useState(false);
  
    return (
      <div>
        {isOpen?<Panel onClose={()=>setIsOpen(false)} url={url}/>:null}
      <HelpTipContainer ref={containerRef}>
         <HelpText lang={lang}  onClick={()=>setIsOpen(true)}>
            {t('view')}
        </HelpText>
      </HelpTipContainer>
      </div>
  );
};

export default HelpTip;
