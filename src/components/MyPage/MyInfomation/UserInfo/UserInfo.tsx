/* eslint-disable camelcase */
import React, { useState } from 'react';
import Button from '@components/Shared/Button/Button';
import API from '@util/api';
import {
  ChangeInfomationArea,
  Row,
  Col,
  ColHeader,
  InputColumn,
  EmailColumn,
  ComboColumn,
  Option,
  ButtonWrap,
} from '../MyInfomation.style';

interface UserInfoProps {
  email : string,
  first_name: string,
  identity: string,
  last_name: string,
  topik_level: string,
  username: string,
}

interface MyInfomationProps {
  t: (s:string) => string;
  userInfo: UserInfoProps;
}

const UserInfo: React.FC<MyInfomationProps> = ({ t, userInfo }) => {
  const { email } = userInfo;

  const [first_name, setFirstName] = useState(userInfo.first_name);
  const [identity, setIdentity] = useState(userInfo.identity);
  const [last_name, setLastName] = useState(userInfo.last_name);
  const [topik_level, setTopikLevel] = useState(userInfo.topik_level);
  const [username, setUsername] = useState(userInfo.username);

  const createIdentityOption = Array.from([1, 2, 3, 4]).map((val: number) => <Option key={`identity-${val}`} value={val}>{t(`identity-${val}`)}</Option>);
  const createTopikOption = Array.from([0, 1, 2, 3, 4, 5, 6]).map((val: number) => <Option key={`topik-${val}`} value={val}>{t(`topik-${val}`)}</Option>);

  const handlingSubmit = async () => {
    await API.patchMyInfomation({
      first_name, last_name, topik_level, identity, username,
    });
  };

  return (
    <ChangeInfomationArea onSubmit={handlingSubmit}>
      <Row>
        <ColHeader>{t('email')}</ColHeader>
        <EmailColumn>{email}</EmailColumn>
      </Row>
      <Row>
        <ColHeader>{t('first_name')}</ColHeader>
        <Col>
          <InputColumn
            value={first_name}
            onChange={(e:any) => { setFirstName(e.target.value); }}
          />
        </Col>
        <ColHeader>{t('last_name')}</ColHeader>
        <Col>
          <InputColumn
            value={last_name}
            onChange={(e:any) => { setLastName(e.target.value); }}
          />
        </Col>
      </Row>
      <Row>
        <ColHeader>{t('nick_name')}</ColHeader>
        <Col>
          <InputColumn
            value={username}
            onChange={(e:any) => { setUsername(e.target.value); }}
          />
        </Col>
      </Row>
      <Row>
        <ColHeader>{t('steps_to_study_abroad')}</ColHeader>
        <ComboColumn
          value={identity}
          onChange={(e:any) => { setIdentity(e.target.value); }}
        >
          {createIdentityOption}
        </ComboColumn>
      </Row>
      <Row>
        <ColHeader>{t('language_grade')}</ColHeader>
        <ComboColumn
          value={topik_level}
          onChange={(e:any) => { setTopikLevel(e.target.value); }}
        >
          {createTopikOption}
        </ComboColumn>
      </Row>
      <ButtonWrap>
        <Button type="submit">{t('change_button_text')}</Button>
      </ButtonWrap>
    </ChangeInfomationArea>
  );
};

export default UserInfo;
