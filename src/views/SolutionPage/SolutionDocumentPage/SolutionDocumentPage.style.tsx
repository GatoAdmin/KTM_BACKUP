import styled from 'styled-components';
import { mainColor600, whiteColor } from '@util/style/color';

export const SubTitleContainer = styled.div`
  display: inline;
`;

export const HelpImage = styled.img.attrs(props=>({
  src: props.lang?`/images/${props.lang}/solution_document.png`:'/images/kr/solution_document.png',
  alt: 'help_tip',
}))`
  width: 1100px;
  height: auto;
`;

export const ConsultImage = styled.img.attrs({
  src: '/images/landing_consult.png',
  alt: 'admission consult',
})`
  position: absolute;
  top: 147px;
  right: 97px;
  width: 448px;
  height: 448px;
`;

export const ClickImage = styled.img.attrs({
  src: '/images/landing_one_click.png',
  alt: 'button click image',
})`
  position: absolute;
  top: 177px;
  right: 87px;
  width: 437px;
  height: 437px;
`;

export const FontProvider = styled.div<{lang: string}>`
`;
