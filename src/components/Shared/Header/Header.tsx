import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import isLogin from '@util/auth/auth';
import {
  HeaderContainer,
  LogoContainer,
  LocalizationButton,
  LocalizationButtonContainer,
  LoginLink,
  Navigation,
  NavigationContainer,
  NavLink,
  LocalizationSelector,
  Logo,
} from './Header.style';
import { useRouter } from 'next/router';

interface headerLink {
  name: string;
  link: string;
}

interface HeaderProps {
  position?: 'relative' | 'absolute';
  background: 'light' | 'dark';
  t: (s: string) => string;
  changeLang: (s: string) => void;
  lang: string;
}

const Header: React.VFC<HeaderProps> = ({ background, position = 'absolute', t, changeLang, lang }) => {
  const [userButton, setUserButton] = useState(<></>);
  const router = useRouter();

  useEffect(() => {
    if (isLogin()) {
      setUserButton(
        <>
          <Link href={{ pathname: '/mypage', query: { lang } }} passHref>
            <LoginLink style={{ marginRight: '20px' }}>{t('mypage')}</LoginLink>
          </Link>
          <LoginLink
            as="div"
            onClick={() => {
              router.push('/');
              window.sessionStorage.removeItem('sid');
            }}
          >
            {t('logout')}
          </LoginLink>
        </>,
      );
    } else {
      setUserButton(
        <Link href={{ pathname: '/login', query: { lang } }} passHref>
          <LoginLink>{t('login')}</LoginLink>
        </Link>,
      );
    }
  }, [t, lang]);

  const headerLinks: Array<headerLink> = [
    // {
    //   name: t('introduce'),
    //   link: '/',
    // },
    {
      name: t('university'),
      link: '/recommend',
    },
    {
      name: t('consult'),
      link: '/consult',
    },
    {
      name: t('one-click'),
      link: '/solution',
    },
  ];

  return (
    <HeaderContainer background={background} position={position}>
      <LogoContainer>
        <Link href="/" key="introduce" passHref>
          <Logo />
        </Link>
      </LogoContainer>
      <NavigationContainer>
        <Navigation>
          {headerLinks.map(({ name, link }) => (
            <Link href={link} key={name} passHref>
              <NavLink>{name}</NavLink>
            </Link>
          ))}
        </Navigation>
        <LocalizationButtonContainer>
          <LocalizationButton onClick={() => changeLang('ko')}>KR</LocalizationButton>
          <LocalizationButton onClick={() => changeLang('vn')}>VE</LocalizationButton>
          <LocalizationSelector selectedIndex={lang === 'ko' ? 0 : 1} />
        </LocalizationButtonContainer>
        {userButton}
      </NavigationContainer>
    </HeaderContainer>
  );
};

export default Header;
