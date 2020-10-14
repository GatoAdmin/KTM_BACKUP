import styled from 'styled-components';
import { mainColor } from '@util/style/color';

export const Content = styled.main`
	width: 100%;
	min-width: 1400px;
	overflow: hidden;
`;

export const EmphasisText = styled.span`
	color: ${mainColor};
`;

export const UnivImage = styled.img.attrs({
	src: '/images/landing_univ.png',
	alt: 'university',
})`
	position: absolute;
	top: 104px;
	right: 127px;
	width: 470px;
	height: 470px;
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
