import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
	}
`;

const Header = styled.header`
	width: 100%;
	background-color: lightgrey;
`;

const Logo = styled.h2`
	margin: 0;
`;

const App: React.FC = () => {
	return (
		<>
			<GlobalStyle />
			<Header>
				<Logo>To Do List</Logo>
			</Header>
			<main>Hello World</main>
		</>
	);
};

export default App;
