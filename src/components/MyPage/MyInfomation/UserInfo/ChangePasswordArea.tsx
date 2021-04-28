/* eslint-disable camelcase */
import React, { useState } from 'react';
import Button from '@components/Shared/Button/Button';
import API from '@util/api';
import {
  ChangeInfomationArea,
  Row,
  ColHeader,
  PasswordColumn,
  ButtonWrap,
  ErrorMessage,
} from '../MyInfomation.style';

interface MyInfomationProps {
  t: (s:string) => string;
}

const ChangePasswordArea: React.FC<MyInfomationProps> = ({ t }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPassword2Error, setNewPassword2Error] = useState(false);

  const handlingSubmit = async () => {
    const formData = new FormData();

    formData.append('old_password', oldPassword);
    formData.append('new_password1', newPassword);
    formData.append('new_password2', newPassword2);

    const response = await API.patchMyPassword(formData);
    switch (response.error_code) {
      case 6:
        setOldPasswordError(true);
        break;
      case 7:
        setNewPasswordError(true);
        break;
      case 8:
        setNewPassword2Error(true);
        break;
      case 0:
        sessionStorage.removeItem('sid');
        window.location.replace('/login');
        break;
      default:
        break;
    }
  };

  return (
    <ChangeInfomationArea>
      <Row>
        <ColHeader> 현재 비밀번호 </ColHeader>
        <PasswordColumn
          type="password"
          placeholder="현재 사용하고 있는 비밀번호를 입력하세요."
          value={oldPassword}
          onChange={(e:any) => {
            setOldPassword(e.target.value);
            setOldPasswordError(false);
          }}
        />
        {oldPasswordError
          ? <ErrorMessage> *현재 비밀번호가 일치하지 않습니다 </ErrorMessage> : null }
      </Row>
      <Row>
        <ColHeader> 신규 비밀번호 </ColHeader>
        <PasswordColumn
          type="password"
          placeholder="변경할 비밀번호를 입력하세요.(영문+숫자+특수기호 8자리 이상)"
          value={newPassword}
          onChange={(e:any) => {
            setNewPassword(e.target.value);
            setNewPasswordError(false);
          }}
        />
        {newPasswordError
          ? <ErrorMessage> *영문+숫자+특수기호 8자리 이상으로 구성하여야 합니다 </ErrorMessage> : null }
      </Row>
      <Row>
        <ColHeader> 비밀번호 확인 </ColHeader>
        <PasswordColumn
          type="password"
          placeholder="변경할 비밀번호를 한번 더 입력하세요."
          value={newPassword2}
          onChange={(e:any) => {
            setNewPassword2(e.target.value);
            setNewPassword2Error(false);
          }}
        />
        {newPassword2Error
          ? <ErrorMessage> *비밀번호가 일치하지 않습니다 </ErrorMessage> : null }
      </Row>
      <ButtonWrap>
        <Button type="button" onClick={handlingSubmit}> 변경하기 </Button>
      </ButtonWrap>
    </ChangeInfomationArea>
  );
};

export default ChangePasswordArea;
