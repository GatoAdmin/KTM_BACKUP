import styled, { css } from 'styled-components';
import {
  fontColor,
  greyColor,
  lightGreyColor,
  mainBackgroundColor,
  mainColor,
  mainColor600,
  whiteColor,
} from '@util/style/color';
import { defaultFont } from '@util/style/font';
import DocumentSVG from '@assets/svg/document_icon.svg';

export const Main = styled.main`
  width: 100%;
`;

export const SectionContainer = styled.div`
  position: relative;
  width: 1100px;
  margin: auto;
`;

export const DetailContentContainer = styled.div`
  display: flex;
  padding: 0 60px 0 50px;
  margin-top: 60px;
`;

export const DetailContent = styled.div``;

export const InfoSection = styled.section`
  display: flex;
  padding: 0 60px;
  border-bottom: 1px solid ${mainBackgroundColor};
`;

export const LogoImage = styled.img`
  width: 75px;
  height: 75px;
  margin: 0 20px auto 0;
  border-radius: 50px;
  object-fit: contain;
`;

export const InfoTextContainer = styled.div`
  flex: 1 1 auto;
`;

export const TitleRow = styled.div`
  display: flex;
`;

export const Title = styled.h1`
  display: inline-block;
  margin: 0 11px 7px 0;
  font: normal bold 22px/30px ${defaultFont};
`;

interface IUnivTypeLink {
  active: boolean;
}

export const UnivTypeLink = styled.a<IUnivTypeLink>`
  margin-right: 8px;
  font: normal normal 12px/16px ${defaultFont};
  color: ${(props) => (props.active ? mainColor : lightGreyColor)};
  text-decoration: none;
  cursor: pointer;
`;

export const UnivAddressRow = styled.div`
  margin-bottom: 20px;
  font: normal normal 12px/16px ${defaultFont};
  color: ${greyColor};
`;

export const UnivLinkRow = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

export const HomePageLink = styled.a.attrs({
  target: '_blank',
})`
  display: inline-block;
  flex: 0 0 auto;
  margin-right: 6px;
  padding: 8px 18px;
  border-radius: 16px;
  background: ${mainColor};
  font: normal bold 12px/16px ${defaultFont};
  color: ${whiteColor};
  text-decoration: none;
  cursor: pointer;
`;

interface ILikeButton {
  pressed: boolean;
}

export const LikeButton = styled.button<ILikeButton>`
  width: 70px;
  height: 32px;
  margin: 0;
  padding: 0;
  border: 1px solid ${mainColor};
  border-radius: 16px;
  background: ${(props) => (props.pressed ? mainColor : whiteColor)};
  font: normal bold 12px/16px ${defaultFont};
  color: ${(props) => (props.pressed ? whiteColor : mainColor)};
  cursor: pointer;
  outline: none;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-left: 4px;
  }
`;

export const InfoCardContainer = styled.div`
  display: flex;
`;

export const InfoCard = styled.div`
  width: 120px;
  height: 90px;
  margin-left: 10px;
  padding: 10px;
  border: 1px solid ${lightGreyColor};
  border-radius: 9px;
`;

export const InfoCardImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 52px;
`;

export const InfoCardImage = styled.img`
  height: 40px;
`;

export const InfoCardDescription = styled.div`
  font: normal bold 14px/17px ${defaultFont};
  color: ${mainColor};
  text-align: center;
`;

export const NotifyDescription = styled.div`
  width: 100%;
  /* background-color: red; */
  box-sizing: border-box;
  padding: 0px 60px;
  text-align: right;
  font-size: 14px;
  color: #9e9e9e;
  margin-top: 8px;
`;

export const ContentSectionTitle = styled.h2`
  margin: 0 0 40px;
  font: normal normal bold 22px/30px ${defaultFont};
  color: ${fontColor};
`;

export const PrepareSection = styled.section`
  margin: 0 0 80px;
`;

export const PrepareStepItemContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding-left: 20px;
`;

export const QualificationTitle = styled.h4`
  margin: 45px auto 10px;
  font: normal bold 18px/25px ${defaultFont};
  color: ${fontColor};
  text-align: center;
`;

export const QualificationImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
`;

export const QualificationDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  padding: 0 20px;
  font: normal normal 18px/25px ${defaultFont};
  color: ${greyColor};
  text-align: center;
`;

export const Item = styled.div`
  position: relative;
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  height: 62px;
  border-bottom: 2px solid #c4c4c4;
`;

export const DocumentGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  /* grid-template-rows: 62px 62px; */
  column-gap: 20px;

  ${Item}:nth-child(-n+2) {
    border-top: 2px solid #c4c4c4;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  width: 345px;
  height: 44px;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.4px;

  color: #232323;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #ff7263;
  margin: 0px 20px;

  svg {
    transform: scale(0.8);
  }
`;

export const Info = styled.div`
  display: none;
  height: 22px;
  border-radius: 20px;
  background-color: #df4d3d;
  font-size: 12px;
  line-height: 22px;
  padding: 0px 10px;
  color: #fff;
`;

export const ExclamationIcon = styled.div`
  position: absolute;
  left: calc(100% - 40px);
  height: 22px;
  z-index: 1;
  width: fit-content;
  display: flex;

  :hover > ${Info} {
    display: inline-block;
  }

  :hover > svg {
    display: none;
  }
`;

export const DocumentIconContainer = styled.div`
  position: relative;
  width: 90px;
  height: 92px;
  margin: 50px auto 38px;
`;

export const DocumentIcon = styled(DocumentSVG)`
  position: absolute;
  top: 0;
  left: 10px;
`;

export const DocumentTypeIconContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${mainColor600};
`;

export const DocumentEssentialDesc = styled.div`
  visibility: hidden;
`;

export const DocumentEssential = styled.div`
  position: absolute;
  top: -10px;
  left: 0;
  width: 4px;
  height: 18px;
  padding: 2px 9px;
  border-radius: 11px;
  background: ${mainColor};
  font: normal bold 12px/17px ${defaultFont};
  color: ${whiteColor};

  ::before {
    content: '!';
  }

  ::after {
    display: block;
    position: absolute;
    left: 7px;
    bottom: -4px;
    width: 8px;
    height: 8px;
    background: ${mainColor};
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    content: '';
  }
`;

export const DocumentDescription = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 55px;
  margin: 0 auto;
  font: normal normal 16px/23px ${defaultFont};
  text-align: center;
`;

interface IPrepareStepItem {
  size: 'lg' | 'sm';
}

export const PrepareStepItem = styled.li<IPrepareStepItem>`
  list-style: none;
  width: ${(props) => (props.size === 'lg' ? '307px' : '176px')};
  height: ${(props) => (props.size === 'lg' ? '336px' : '246px')};
  margin: 0 12px 10px 0;
  border: 2px solid ${mainBackgroundColor};
  border-radius: 9px;
  color: #232323;

  :hover {
    ${DocumentEssential} {
      width: 92px;

      ::before {
        display: none;
        transform: scaleX(${22 / 110});
      }
      ${DocumentEssentialDesc} {
        visibility: visible;
      }
    }
  }
`;

export const CalendarSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const SideNav = styled.ul`
  position: fixed;
  top: 103px;
  right: calc(50% - 550px - 95px);
  width: 130px;
  height: 363px;
  text-align: center;
`;

interface SideNavItemProps {
  background: 'light' | 'main';
}

export const SideNavItem = styled.li<SideNavItemProps>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  list-style: none;
  width: 104px;
  height: 150px;
  margin-bottom: 7px;
  padding: 15px 13px 13px;
  border-radius: 18px;
  font: normal normal bold 14px/17px ${defaultFont};
  color: ${(props) => (props.background === 'light' ? fontColor : whiteColor)};
  background: ${(props) => (props.background === 'light' ? whiteColor : mainColor600)};
  box-shadow: 0 0 5px #00000040;
`;

export const SideNavDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  span {
    font-size: 14px;
    line-height: 1.4;
  }
`;

export const SideNavLink = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 0;
  width: 104px;
  height: 55px;
  margin: 0;
  padding: 0;
  border-radius: 12px;
  background: ${whiteColor};
  font: normal normal bold 12px/14px ${defaultFont};
  color: ${mainColor600};
  text-decoration: none;
  box-sizing: content-box;
`;

export const SideNavImageLink = styled.a`
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 5px;
  :after {
    display: block;
    position: absolute;
    top: -5px;
    right: -5px;
    content: '';
  }
`;

export const SideNavImage = styled.img`
  width: 80px;
  height: 80px;
`;
