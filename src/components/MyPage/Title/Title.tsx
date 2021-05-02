import React from 'react';
import StyledTitle from './Title.style';

interface TitleProps {
  children: React.ReactChild;
}

const Title: React.FC<TitleProps> = ({ children }) => (
  <StyledTitle>
    {children}
  </StyledTitle>
);

export default Title;
