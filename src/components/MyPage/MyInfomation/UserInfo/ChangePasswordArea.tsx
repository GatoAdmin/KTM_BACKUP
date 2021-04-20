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
} from '../MyInfomation.style';

interface MyInfomationProps {
  t: (s:string) => string;
}

const ChangePasswordArea: React.FC<MyInfomationProps> = ({ t }) => {
  const [nowPassword, setNowPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  const handlingSubmit = async () => {
    console.log('hi');
  };

  return (
    <ChangeInfomationArea onSubmit={handlingSubmit}>
      <Row>
        <ColHeader> 현재 비밀번호 </ColHeader>
        <PasswordColumn
          type="password"
          placeholder="현재 사용하고 있는 비밀번호를 입력하세요."
          value={nowPassword}
          onChange={(e:any) => { setNowPassword(e.target.value); }}
        />
      </Row>
      <Row>
        <ColHeader> 신규 비밀번호 </ColHeader>
        <PasswordColumn
          type="password"
          placeholder="변경할 비밀번호를 입력하세요.(영문+숫자+특수기호 8자리 이상)"
          value={newPassword}
          onChange={(e:any) => { setNewPassword(e.target.value); }}
        />
      </Row>
      <Row>
        <ColHeader> 비밀번호 확인 </ColHeader>
        <PasswordColumn
          type="password"
          placeholder="변경할 비밀번호를 한번 더 입력하세요."
          value={newPassword2}
          onChange={(e:any) => { setNewPassword2(e.target.value); }}
        />
      </Row>
      <ButtonWrap>
        <Button type="submit"> 변경하기 </Button>
      </ButtonWrap>
    </ChangeInfomationArea>
  );
};

export default ChangePasswordArea;
