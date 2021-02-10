import { mainColor } from '@util/style/color';
import styled, { css } from 'styled-components';

const putCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Layout = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1400px;
  height: 100vh;
  min-height: 800px;
  background: url('/images/user_layout_background.jpg');
  ${putCenter};
`;

interface ContentContainerProps {
  width: number;
  height: number;
}

export const ContentContainer = styled.div<ContentContainerProps>`
  position: relative;
  padding: 45px 0px;
  border-radius: 25px;
  background: white;
  box-shadow: 3px 3px 8px #00000029;

  ${({ width, height }) => css`
    /* top: calc(50% - ${height / 2}px);
    left: calc(50% - ${width / 2}px); */
    width: ${width}px;
  `}
  height: auto;

  input {
    outline: none;
    :focus {
      border: 1px solid ${mainColor};
    }
  }
`;
