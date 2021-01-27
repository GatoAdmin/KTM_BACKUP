import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import 'normalize.css';
import { fontColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';

const AppGlobalStyle = createGlobalStyle`
  body {
    font-family: ${defaultFont};
    color: ${fontColor};
  }
`;

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <AppGlobalStyle />
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
