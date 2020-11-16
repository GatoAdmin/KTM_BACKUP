import styled, { css } from 'styled-components';
import { fontColor, mainBackgroundColor, mainColor } from '@util/style/color';
import Family from "../../../assets/family.svg";
import Certificate from "../../../assets/guarantee.svg";
import Exam from "../../../assets/test.svg";

export const Main = styled.main`
	width: 100vw;
	min-width: 1400px;
`

export const SectionContainer = styled.div`
  width: 1400px;
  margin: auto;
`;

export const ImageSection = styled.section`
  display: grid;
  grid-template: 202px 202px / 284px auto 284px;
  grid-column-gap: 27px;
  grid-row-gap: 28px;
  margin: 82px auto 0;
  border-radius: 15px;
  overflow: hidden;
`;

export const SmallImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const LargeImage = styled(SmallImage)`
  grid-column: 2 / 3;
  grid-row: 1 / 3;
`;

export const DetailContentContainer = styled.div`
  display: flex;
  margin-top: 60px;
`;

export const DetailContent = styled.div`
  width: 905px;
`;

export const TitleSection = styled.section`
  display: flex;
  padding: 0 0 46px;
  border-bottom: 1px solid #70707042;
`;

export const Title = styled.h1`
  margin: 0;
  font: normal bold 40px/56px NEXON Lv1 Gothic;
`;

export const LogoImage = styled.img`
  width: 56px;
  height: 56px;
  object-fit: contain;
`;

export const HomePageLink = styled.a.attrs({
  target: '_blank'
})`
  display: block;
  width: 40px;
  height: 40px;
  margin-left: auto;
  text-decoration: none;
  cursor: pointer;
`;

export const ContentTypeRadio = styled.input.attrs({
  type: 'radio',
})`
  display: none;
`;

export const ContentTypeRadioLabel = styled.label`
  width: 139px;
  height: 37px;
  margin-left: 33px;
  border: 1px solid ${mainColor};
  border-radius: 11px;
  background: white;
  font: normal normal bold 14px/37px NEXON Lv1 Gothic;
  color: ${mainColor};
  text-align: center;
  cursor: pointer;
  
  ${ContentTypeRadio}:checked + & {
    color: white;
    background: ${mainColor};
  }
`

export const PriceSection = styled.section`
  margin-top: 47px;
`;

export const ContentSectionTitle = styled.h2`
  margin: 0;
  font: normal normal bold 30px/35px NEXON Lv1 Gothic;
  letter-spacing: 1.5px;
  color: ${fontColor};
`;

export const TableTitle = styled.h3`
  margin: 0 0 30px;
  font: normal normal normal 25px/29px NEXON Lv1 Gothic;
  letter-spacing: 1.25px;
  color: ${fontColor};
  text-align: center;
`;

export const PriceTable = styled.table`
  width: 100%;
  margin-bottom: 81px;
  border: 1px solid #70707042;
  border-radius: 15px;
  box-shadow: 0 0 5px #00000040;
`;

export const PriceTableHeadCol = styled.th`
  width: 50%;
  height: 67px;
  border-bottom: 1px solid #70707042;
  background: ${mainBackgroundColor};
  font: normal normal normal 18px/21px NEXON Lv1 Gothic;
`;

export const PriceTableRow = styled.tr`
  :nth-child(2n) {
    background: #F6F6F6;
  }
`;

export const PriceTableCol = styled.td`
  padding: 25px 60px;
  font: normal normal normal 16px/27px NEXON Lv1 Gothic;
  letter-spacing: 0.8px;
  color: ${fontColor};
  text-align: center;
  overflow-wrap: break-word;
`;

export const PrepareSection = styled.section`
  margin-top: -27px;
`;

export const PrepareStepContainer = styled.ul`
  margin: 0;
  padding: 64px 0 0 12px;
  
`;

export const PrepareStep = styled.li`
  display: flex;
  margin-bottom: 110px;
`;

export const PrepareStepTitle = styled.h3`
  height: 100px;
  margin: 0;
  font: normal normal bold 24px/100px NEXON Lv1 Gothic;
  letter-spacing: 0.6px;
`;

export const PrepareStepItemContainer = styled.ul`
  display: flex;
  margin: 0;
  padding-left: 20px;
`;

const PrepareStepItemIconStyle = css`
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
`;

export const FamilyIcon = styled(Family)`${PrepareStepItemIconStyle}`;
export const CertificateIcon = styled(Certificate)`${PrepareStepItemIconStyle}`;
export const ExamIcon = styled(Exam)`${PrepareStepItemIconStyle}`;

export const PrepareStepItem = styled.li`
  width: 180px;
  height: 100px;
  font: normal normal normal 13px/15px NEXON Lv1 Gothic;
  letter-spacing: 0.33px;
  text-align: center;
  list-style: none;
`;

export const SideNavContainer = styled.aside`
  position: relative;
  width: 495px;
  height: 100%;
  padding-top: 103px;
`;

export const SideNav = styled.div`
  position: sticky;
  top: 103px;
  width: 373px;
  height: 250px;
  margin: 0 auto;
  padding: 25px 21px 28px;
  border-radius: 25px;
  box-shadow: 0 0 5px #00000040;
  text-align: center;
`;

export const SideNavTitle = styled.h2`
  margin: 0 0 37px;
  font: normal normal bold 20px/23px NEXON Lv1 Gothic;
  letter-spacing: 1px;
  color: ${fontColor};
`;

export const SideNavItemContainer = styled.ul`
  margin: 0;
  padding: 0;
`

export const SideNavItem = styled.li`
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin-bottom: 32px;
  font: normal normal bold 12px/30px NEXON Lv1 Gothic;
  color: ${fontColor};
`;

const SideNavButtonStyle = css`
  width: 129px;
  height: 30px;
  margin: 0;
  padding: 0;
  border: 1px solid ${mainColor};
  border-radius: 11px;
  background: transparent;
  font: normal normal bold 12px/30px NEXON Lv1 Gothic;
  color: ${mainColor};
  text-decoration: none;
  box-sizing: content-box;
`;

export const SideNavButton = styled.button`
  ${SideNavButtonStyle};
`;

export const SideNavLink = styled.a`
  ${SideNavButtonStyle};
`;
