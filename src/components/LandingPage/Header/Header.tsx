import React from 'react';
import Link from 'next/link';
import useIntersection from '@util/hooks/useInteraction';
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
  MyPageLink,
  LogoutLink,
  LinkButtonContainer,
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
    link: '/',
  },
  {
    name: 'one-click',
    link: '/soultion',
  },
];

// temp interface for temporary translation(delete if change to next.js 10
interface HeaderProps {
  t: (s: string) => string;
  lang: string;
  changeLang: (s: string) => void;
}

const showLoginOrLogout = (t: (s: string) => string, isLogged: boolean, lang: string) => {
  const term = isLogged ? 'logout' : 'login';
  return (
    <Link href={{ pathname: `/${term}`, query: { lang } }} passHref>
      <LoginLink>{t(`${term}`)}</LoginLink>
    </Link>
  );
};

const MyPageButton = React.forwardRef(({ onClick, href }, ref) => (
  <a href={href} onClick={onClick} ref={ref}>
    <MyPageLink />
  </a>
));

const Header: React.FC<HeaderProps> = ({ t, lang, changeLang }) => {
  const [isTop, setIsTop] = React.useState<boolean>(true);
  const [isLogged, setIsLogged] = React.useState<boolean>(false);
  const header = React.useRef<HTMLElement>(null);
  const visible = useIntersection(header);
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
    return () => {
      window.removeEventListener('scroll', makeScrollCallback());
    };
  }, []);

  React.useEffect(() => {
    if (sessionStorage.getItem('sid') !== null) {
      setIsLogged(true);
    }
  }, []);

  return (
    <HeaderContainer ref={header} show={visible} isTop={isTop}>
      <LogoContainer>
        <Logo />
        katumm
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
          <LocalizationButton>EN</LocalizationButton>
          <LocalizationButton onClick={() => changeLang('vn')}>VN</LocalizationButton>
          <LocalizationSelector selectedIndex={lang === 'ko' ? 0 : 2} />
        </LocalizationButtonContainer>
        <LinkButtonContainer>
          {isLogged && (
            <Link href="/mypage" passHref>
              <MyPageButton />
            </Link>
          )}
          {showLoginOrLogout(t, isLogged, lang)}
        </LinkButtonContainer>
      </NavigationContainer>
    </HeaderContainer>
  );
};

export default Header;
