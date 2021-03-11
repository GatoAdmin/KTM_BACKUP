import React from 'react';
import StyledSubtitle from './Subtitle.style';

interface SubtitleProps {
  children: React.ReactChild;
}

const Subtitle: React.FC<SubtitleProps> = ({ children }) => (
  <StyledSubtitle>
    {children}
  </StyledSubtitle>
);

export default Subtitle;
