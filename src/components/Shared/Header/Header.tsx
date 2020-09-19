import * as React from 'react';
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
  NavLink
} from "./Header.style";
import Link from "next/link";
import { useIntersection } from "@util/hooks/useInteraction";


interface headerLink {
  name: string;
  link: string;
}

const headerLinks: Array<headerLink> = [
  {
    name: '회사 소개',
    link: '/'
  },
  {
    name: '대학 소개&추천',
    link: '/'
  },
  {
    name: '입학 상담',
    link: '/'
  },
  {
    name: '원클릭 입학솔루션',
    link: '/'
  },
]

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
  const [languageIndex, setLanguageIndex] = React.useState<number>(0)
  const header = React.useRef<HTMLHeadingElement>(null);
  const visible = useIntersection(header);

  return (
    <HeaderContainer
      ref={header}
      show={visible}>
      <LogoContainer>
        {console.log(visible)}
        <Logo src="/images/logo.png" alt="KATUMM Logo" />
        katumm
      </LogoContainer>
      <NavigationContainer>
        <Navigation>
          {headerLinks.map(({name, link}) => (
            <Link
              href={link}
              key={name}
              passHref>
              <NavLink>
                { name }
              </NavLink>
            </Link>
          ))
          }
        </Navigation>
        <LocalizationButtonContainer>
          <LocalizationButton onClick={() => setLanguageIndex(0)}>
            KR
          </LocalizationButton>
          <LocalizationButton onClick={() => setLanguageIndex(1)}>
            EN
          </LocalizationButton>
          <LocalizationButton onClick={() => setLanguageIndex(2)}>
            VE
          </LocalizationButton>
          <LocalizationSelector selectedIndex={languageIndex} />
        </LocalizationButtonContainer>
        <Link
          href="/login"
          passHref>
          <LoginLink>
            로그인
          </LoginLink>
        </Link>
      </NavigationContainer>
    </HeaderContainer>
  )
}

export default Header