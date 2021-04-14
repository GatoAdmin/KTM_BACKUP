import React, { useState } from 'react';
/* 로딩 컴포넌트를 불러옵니다. */
import API from '@util/api';
import {STEP_STRING} from '@components/SolutionPage/StepString';
import { Loading, LoadingPopup } from '@views/UserPage/LoginPage/LoginPage.style';
import Router from 'next/router';
export function Payment( data, playerData, lang?) {
  /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  const userCode:string = process.env.IAMPORT_USER_CODE;
  
  function callback(res) {
    if(res.success){
      API.sendSuccessPayment(playerData.id, res.imp_uid, res.merchant_uid)
      .then(data=>{
        if(data.status==="success"){
          if(data.userstatus.step ===STEP_STRING.STEP_THREE_INIT){
            Router.push(`/solution/3${lang?`?lang=${lang}`:''}`)
          }
        }
      });
    }else{
      window.alert(res.error_msg);
    }
  }

  /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
  data = {
    ...data,
    pay_method: 'card',
    popup : true,
    name: `${playerData.univ_code}_${playerData.subjectname}_${playerData.pay_rank}`,
    currency : 'USD',//통화 설정
    merchant_uid: `mid_${playerData.user_id}_${playerData.univ_code}_${playerData.subjectname}_${playerData.pay_rank}_${new Date().getTime()}`, //서버에 들어가는 아이디로 해두어야 한다
    buyer_email: playerData.email,
  };

  
  const { IMP } = window;
  IMP.init(userCode);
  IMP.request_pay(data, callback);
}

export default Payment;