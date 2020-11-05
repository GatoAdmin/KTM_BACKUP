import styled, { css } from 'styled-components';

export const Layout = styled.div`
	position: relative;
	top: 0;
	left: 0;
	width: 100vw;
	min-width: 1400px;
	height: 100vh;
	min-height: 800px;
	background: url('/images/user_layout_background.jpg');
`;

interface ContentContainerProps {
	width: number;
	height: number;
}

export const ContentContainer = styled.div<ContentContainerProps>`
	position: relative;
	padding-top: 45px;
	border-radius: 25px;
	background: white;
	box-shadow: 3px 3px 8px #00000029;

	${({ width, height }) => css`
		top: calc(50% - ${height / 2}px);
		left: calc(50% - ${width / 2}px);
		width: ${width}px;
		height: ${height}px;
	`}
`;
