import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useIntersection from '@util/hooks/useInteraction';
import isLogin from '@util/auth/auth';
import {
  HeaderContainer,
  LogoContainer,
  LocalizationButton,
  LocalizationButtonContainer,
  LocalizationSelector,
  LoginLink,
  Navigation,
  NavigationContainer,
  NavLink,
} from './Header.style';

interface headerLink {
  name: string;
  link: string;
}

const headerLinks: Array<headerLink> = [
  {
    name: 'introduce',
    link: '/',
  },
  {
    name: 'university',
    link: '/recommend',
  },
  {
    name: 'consult',
    link: '/consult',
  },
  {
    name: 'one-click',
    link: '/',
  },
];

// temp interface for temporary translation(delete if change to next.js 10
interface HeaderProps {
  t: (s: string) => string;
  lang: string;
  changeLang: (s: string) => void;
}

const Header: React.FC<HeaderProps> = ({ t, lang, changeLang }) => {
  const [isTop, setIsTop] = React.useState<boolean>(true);
  const header = React.useRef<HTMLElement>(null);
  const visible = useIntersection(header);
  const [userButton, setUserButton] = useState(<></>);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) return;
    function makeScrollCallback() {
      let tick = false;
      return function onWheel() {
        if (tick) return undefined;
        tick = true;
        return requestAnimationFrame(() => {
          setIsTop(window.pageYOffset <= 150);
          tick = false;
        });
      };
    }
    setIsTop(window.pageYOffset <= 100);
    window.addEventListener('scroll', makeScrollCallback());
    if (window.sessionStorage.getItem('sid')) setIsLoggedIn(true);
    return () => {
      window.removeEventListener('scroll', makeScrollCallback());
    };
  }, []);

  useEffect(() => {
    if (isLogin()) {
      setUserButton(
        <Link href={{ pathname: '/mypage', query: { lang } }} passHref>
          <LoginLink>{t('mypage')}</LoginLink>
        </Link>,
      );
    } else {
      setUserButton(
        <Link href={{ pathname: '/login', query: { lang } }} passHref>
          <LoginLink>{t('login')}</LoginLink>
        </Link>,
      );
    }
  }, [t, lang]);

  React.useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <HeaderContainer ref={header} show={visible} isTop={isTop}>
      <LogoContainer>
        <Link href="/" key="introduce" passHref>
          <NavLink>katumm</NavLink>
        </Link>
      </LogoContainer>
      <NavigationContainer>
        <Navigation>
          {headerLinks.map(({ name, link }) => (
            <Link href={link} key={name} passHref>
              <NavLink>{t(name)}</NavLink>
            </Link>
          ))}
        </Navigation>
        <LocalizationButtonContainer>
          <LocalizationButton onClick={() => changeLang('ko')}>KR</LocalizationButton>
          <LocalizationButton onClick={() => changeLang('vn')}>VN</LocalizationButton>
          <LocalizationSelector selectedIndex={lang === 'ko' ? 0 : 1} />
          {userButton}
        </LocalizationButtonContainer>
      </NavigationContainer>
    </HeaderContainer>
  );
};

export default Header;
