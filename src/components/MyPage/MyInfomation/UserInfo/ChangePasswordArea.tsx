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
        <ColHeader>{t('now_password')}</ColHeader>
        <PasswordColumn
          type="password"
          placeholder={t('now_password_placeholder')}
          value={oldPassword}
          onChange={(e:any) => {
            setOldPassword(e.target.value);
            setOldPasswordError(false);
          }}
        />
        {oldPasswordError
          ? (
            <ErrorMessage>
              *
              {t('now_password_error_message')}
            </ErrorMessage>
          ) : null }
      </Row>
      <Row>
        <ColHeader>{t('new_password')}</ColHeader>
        <PasswordColumn
          type="password"
          placeholder={t('new_password_placeholder')}
          value={newPassword}
          onChange={(e:any) => {
            setNewPassword(e.target.value);
            setNewPasswordError(false);
          }}
        />
        {newPasswordError
          ? (
            <ErrorMessage>
              *
              {t('new_password_error_message')}
            </ErrorMessage>
          ) : null }
      </Row>
      <Row>
        <ColHeader>{t('check_new_password')}</ColHeader>
        <PasswordColumn
          type="password"
          placeholder={t('check_new_password_placeholder')}
          value={newPassword2}
          onChange={(e:any) => {
            setNewPassword2(e.target.value);
            setNewPassword2Error(false);
          }}
        />
        {newPassword2Error
          ? (
            <ErrorMessage>
              *
              {t('check_new_password_error_message')}
            </ErrorMessage>
          ) : null }
      </Row>
      <ButtonWrap>
        <Button type="button" onClick={handlingSubmit}>{t('change_button_text')}</Button>
      </ButtonWrap>
    </ChangeInfomationArea>
  );
};

export default ChangePasswordArea;
