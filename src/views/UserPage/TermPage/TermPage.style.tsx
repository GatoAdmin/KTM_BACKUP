import styled from 'styled-components';

export const TermContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 698px;
  padding: 25px 60px;
`;

export const Title = styled.span`
  font-size: 24px;
  line-height: 33px;
  font-weight: bold;
  color: #000;
`;

export const Bold = styled.span`
  font-weight: bold;
`;

export const Underline = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

export const NotificationWrapper = styled.div`
  width: 100%;
  margin-top: 39px;
`;

export const Notification = styled.span`
  display: block;
  text-align: center;
  line-height: 22px;
  font-size: 16px;
  color: #7f8a98;
`;

export const AgreeSection = styled.div`
  width: 100%;
  margin-top: 59px;
`;

export const AgreeLine = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 15px;
`;

export const AgreeCheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  cursor: pointer;
`;

export const Delimiter = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #c4c4c4;
  margin-bottom: 15px;
`;

export const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 292px;
`;

// const

export const Button = styled.input.attrs({
  type: 'button',
})`
  width: 125px;
  height: 39px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 3px;
  color: ${({ status }) => (status === 'activate' ? '#fff' : '#DF4D3D')};

  background: ${({ status }) => (status === 'activate' ? '#ff7263' : 'rgba(255, 114, 99, 0.08)')};
  border: 1px solid #df4d3d;
  box-sizing: border-box;
  border-radius: 100px;

  font-size: 14px;

  cursor: ${({ status }) => (status === 'activate' ? 'pointer' : 'default')};

  :hover {
    background: ${({ status }) => (status === 'activate' ? '#DF4D3D' : 'default')};
    color: ${({ status }) => (status === 'activate' ? '#fff' : 'default')};
  }
`;
