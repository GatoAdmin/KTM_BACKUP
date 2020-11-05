import styled from 'styled-components';
import { fontColor, mainColor } from '@util/style/color';

export const UnivItemContainer = styled.div`
	display: flex;
	position: relative;
	width: calc(100% - 32px);
	height: 154px;
	margin-bottom: 74px;
	padding: 24px 0 24px 32px;
	border-radius: 25px;
	background: white;
	box-shadow: 1px 1px 7px #00000029;

	:last-child {
		margin: 0;
	}
`;

export const UnivItemLinkContainer = styled.div`
	display: flex;
	position: absolute;
	right: 28px;
	bottom: 21px;
`;

export const UnivItemLink = styled.a`
	display: block;
	width: 164px;
	height: 39px;
	margin-right: 38px;
	border: 1px solid ${mainColor};
	border-radius: 11px;
	font: normal normal bold 14px/39px NEXON Lv1 Gothic;
	color: ${mainColor};
	text-decoration: none;
	text-align: center;
	cursor: pointer;
`;

export const UnivItemPreferButton = styled.button`
	display: block;
	width: 164px;
	height: 39px;
	padding: 0;
	border: 1px solid ${mainColor};
	border-radius: 11px;
	font: normal normal bold 14px/39px NEXON Lv1 Gothic;
	color: ${mainColor};
	background: transparent;
	cursor: pointer;
`;

export const UnivItemImage = styled.img`
	width: 202px;
	height: 153px;
	margin-right: 36px;
	border-radius: 25px;
	object-fit: contain;
`;

export const UnivItemNoImage = styled.div`
	width: 202px;
	height: 153px;
	margin-right: 36px;
	border-radius: 25px;
	background: gray;
	object-fit: contain;
`;

export const UnivItemLogo = styled.img`
	position: absolute;
	top: calc(50% - 80px);
	left: calc(50% - 80px);
	width: 160px;
	height: 160px;
	opacity: 0.3;
	object-fit: contain;
`;

export const UnivItemDescriptionContainer = styled.div`
	width: 350px;
`;

export const UnivItemTitle = styled.h2`
	margin: 0 0 23px;
	font: normal normal bold 20px/23px NEXON Lv1 Gothic;
`;

export const UnivItemAddress = styled.div`
	width: 100%;
	margin-bottom: 23px;
	font: normal normal bold 15px/18px NEXON Lv1 Gothic;
`;

export const UnivItemDescription = styled.div`
	display: inline-block;
	width: 146px;
	margin-bottom: 23px;
	font: normal normal bold 15px/18px NEXON Lv1 Gothic;
`;
