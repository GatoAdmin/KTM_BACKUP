import React from 'react';
import {HelpText, HelpTipContainer} from './HelpTip.style';
import useVisible from '@util/hooks/useVisible';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '../../../assets/i18n/SolutionPage/solutionDocumentPage.json';
import Panel from '@components/SolutionPage/DocumentHelpTip/HelpTipPanel'

interface HelpTipProps {
    url: string;
}

const HelpTip: React.VFC<HelpTipProps> = ({
    url,
}) => {
    const { t, lang, changeLang } = useTranslate(i18nResource);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visible, toggleVisible] = useVisible(containerRef);
  
    return (
      <div>
        {visible?<Panel onClose={toggleVisible} url={url}/>:null}
      <HelpTipContainer ref={containerRef}>
         <HelpText  onClick={toggleVisible}>
            {t('view')}
        </HelpText>
      </HelpTipContainer>
      </div>
  );
};

export default HelpTip;
