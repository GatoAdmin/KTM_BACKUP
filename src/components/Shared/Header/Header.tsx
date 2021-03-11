import React from 'react';
import Link from 'next/link';
import {
  HeaderContainer,
  LogoContainer,
  LocalizationButton,
  LocalizationButtonContainer,
  LoginLink,
  Navigation,
  NavigationContainer,
  NavLink,
} from './Header.style';

interface headerLink {
  name: string;
  link: string;
}

interface HeaderProps {
  position?: 'relative' | 'absolute';
  background: 'light' | 'dark';
  t: (s: string) => string;
  changeLang: (s: string) => void;
}

const Header: React.VFC<HeaderProps> = ({
  background, position = 'absolute', t, changeLang,
}) => {
  const [languageIndex, setLanguageIndex] = React.useState<number>(0);

  const headerLinks: Array<headerLink> = [
    {
      name: t('introduce'),
      link: '/',
    },
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
      link: '/',
    },
  ];

  return (
    <HeaderContainer background={background} position={position}>
      <LogoContainer>
        katumm
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
          /
          <LocalizationButton onClick={() => changeLang('vn')}>VE</LocalizationButton>
        </LocalizationButtonContainer>
        <Link href="/login" passHref>
          <LoginLink>{t('login')}</LoginLink>
        </Link>
      </NavigationContainer>
    </HeaderContainer>
  );
};

export default Header;
