import styled from "styled-components";

export const Layout = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  min-width: 1400px;
  height: 100vh;
  min-height: 800px;
  background: url("/images/user_layout_background.jpg");
`;

export const ContentContainer = styled.div`
  position: relative;
  top: calc(50% - 396px);
  left: calc(50% - 352px);
  width: 704px;
  height: 741px;
  padding-top: 45px;
  border-radius: 25px;
  background: white;
  box-shadow: 3px 3px 8px #00000029;
`;