import { mainColor } from '@util/style/color';
import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick: () => void;
}

const StyledButton = styled.button`
  padding: 8px 20px;
  background: ${mainColor};
  border: 1px solid ${mainColor};
  box-sizing: border-box;
  border-radius: 100px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  outline: none;
  cursor: pointer;
`;

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <StyledButton onClick={onClick}>
    {children}
  </StyledButton>
);

export default Button;
