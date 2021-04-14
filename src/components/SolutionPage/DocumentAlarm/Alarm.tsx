import React from 'react';
import {
    AlarmContainer,
    AlarmIconContainer,
    AlarmTextContainer,
    AlarmIcon
} from '@components/SolutionPage/DocumentAlarm/Alarm.style';
import useVisible from '@util/hooks/useVisible';

interface AlarmProps {
    alarm: string;
}

const Alarm: React.VFC<AlarmProps> = ({
  alarm,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visible, toggleVisible] = useVisible(containerRef);
    return (
      <AlarmContainer ref={containerRef}>
         <AlarmIconContainer  onClick={toggleVisible}>
            <AlarmIcon/>
        </AlarmIconContainer>
        <AlarmTextContainer show={visible}>
        {alarm!==null?alarm.split('<br>').map((line, index) => {
                    return <div key={line+index}>{line}</div>;
                    })
                    :null}
        </AlarmTextContainer>
      </AlarmContainer>
  );
};

export default Alarm;
