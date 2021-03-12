import styled from 'styled-components';

export const ConsultBannerContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 340px;
  margin-bottom: 50px;
`;

export const BackgroundImg = styled.img.attrs({
  src: '/images/consult_banner.jpg',
  alt: 'background image',
})`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 43%;
`;

export const Box = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 60px;
  width: 1000px;
  height: 220px;
`;

export const ConsultBannerText = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 22px;
  line-height: 32px;
  color: white;
`;
