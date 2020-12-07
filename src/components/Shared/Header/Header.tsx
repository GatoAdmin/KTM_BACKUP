import * as React from 'react';
import Link from 'next/link';
import {
  HeaderContainer,
  Logo,
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
    name: '회사 소개',
    link: '/',
  },
  {
    name: '대학 소개&추천',
    link: '/recommend',
  },
  {
    name: '입학 상담',
    link: '/',
  },
  {
    name: '원클릭 입학솔루션',
    link: '/',
  },
];

interface HeaderProps {
  position?: 'relative' | 'absolute';
  background: 'light' | 'dark';
}

const Header: React.VFC<HeaderProps> = ({ background, position = 'absolute' }) => {
  const [languageIndex, setLanguageIndex] = React.useState<number>(0);

  return (
    <HeaderContainer background={background} position={position}>
      <LogoContainer>
        <Logo />
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
          <LocalizationButton onClick={() => setLanguageIndex(0)}>KR</LocalizationButton>
          <LocalizationButton onClick={() => setLanguageIndex(1)}>EN</LocalizationButton>
          <LocalizationButton onClick={() => setLanguageIndex(2)}>VE</LocalizationButton>
          <LocalizationSelector selectedIndex={languageIndex} />
        </LocalizationButtonContainer>
        <Link href="/login" passHref>
          <LoginLink>로그인</LoginLink>
        </Link>
      </NavigationContainer>
    </HeaderContainer>
  );
};

export default Header;
