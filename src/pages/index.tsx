import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Header from "src/components/Shared/Header/Header";

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
	}
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
