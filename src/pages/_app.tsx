import React from "react";
import { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import "normalize.css";
import { fontColor } from "../util/style/color";

const AppGlobalStyle = createGlobalStyle`
  @font-face {
      font-family: Nunito;
      src: local(Nunito), url('https://fonts.googleapis.com/css2?family=Nunito:wght@900&display=swap');
      font-weight: 900;
  }
  
  @font-face {
      font-family: "NEXON Lv1 Gothic";
      src: local("NEXON Lv1 Gothic"), url("../font/NEXON Lv1 Gothic OTF.woff");
      font-weight: normal;
  }
  
  @font-face {
      font-family: "NEXON Lv1 Gothic";
      src: local("NEXON Lv1 Gothic"), url("../font/NEXON Lv1 Gothic OTF Bold.woff");
      font-weight: bold;
  }
  
  body {
    font-family: "NEXON Lv1 Gothic", -apple-system, -moz-fixed, sans-serif;
    color: ${fontColor};
  }
`

function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default App;
