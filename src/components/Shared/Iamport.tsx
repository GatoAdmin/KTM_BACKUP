import React, { useState } from 'react';
/* 로딩 컴포넌트를 불러옵니다. */
import API from '@util/api';
import { Loading, LoadingPopup } from '@views/UserPage/LoginPage/LoginPage.style';

export function Payment({ data }) {
  
  React.useEffect(() => {
  const scriptJquery = document.createElement('script');
  const scriptIamport = document.createElement('script');

  scriptJquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
  scriptJquery.async = true;

  scriptIamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.5.js";
  scriptIamport.async = true;

  document.body.appendChild(scriptJquery);
  document.body.appendChild(scriptIamport);

  return () => {
    document.body.removeChild(scriptIamport);
    document.body.removeChild(scriptJquery);
  }
  }, []);

  /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  const userCode:string = process.env.IAMPORT_USER_CODE;
  function callback(res) {
    if(res.success){
      console.log("결제성공");
    }else{
      console.log("결제실패");
    }
    // navigation.replace('PaymentResult', response);
  }

  /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
  data = {
    ...data,
    pay_method: 'card',
    name: '아임포트 결제데이터 분석',
    merchant_uid: `mid_${new Date().getTime()}`, //TODO: 서버에 들어가는 아이디로 해두어야 한다
    buyer_name: process.env.IAMPROT_BUYER_NAME,
    buyer_tel: process.env.IAMPROT_BUYER_TEL,
    buyer_email: process.env.IAMPROT_BUYER_EMAIL,
    buyer_addr: process.env.IAMPROT_BUYER_ADDR,
    buyer_postcode: process.env.IAMPROT_BUYER_POSTCODE,
    app_scheme: process.env.IAMPROT_APP_SCHEME,
    // [Deprecated v1.0.3]: m_redirect_url
  };

  
  const { IMP } = window;
  IMP.init(userCode);
  IMP.request_pay(data, callback);
}

export default Payment;