import { mainColor } from '@util/style/color';
import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: any;
  active?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 8px 20px;
  background: ${(props) => (props.active ? mainColor : 'rgba(255, 114, 99, 0.08);')};
  border: 1px solid ${mainColor};
  box-sizing: border-box;
  border-radius: 100px;
  color: ${(props) => (props.active ? 'white' : 'rgba(223, 77, 61, 1)')};
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  font-family: Noto Sans;
  outline: none;
  cursor: pointer;
  width: fit-content;

  &:hover {
    background-color: #FF7263;
  }
`;

const Button: React.FC<ButtonProps> = ({
  type, onClick, children, active = true,
}) => (
  <StyledButton type={type} onClick={onClick} active={active}>
    {children}
  </StyledButton>
);

export default Button;
