import React, {useState} from 'react';
import axios from 'axios';
import API from '@util/api';
import {Payment} from '@components/Shared/Iamport'
import useTranslate from '@util/hooks/useTranslate';
import { Loading, LoadingPopup } from '@views/UserPage/LoginPage/LoginPage.style';
import i18nResource from '@assets/i18n/solutionPage.json';
import usePromise from '@util/hooks/usePromise';
import { GetServerSideProps, NextPage } from 'next';
import Header from '@components/Shared/Header/Header';
import StepHeader, {getSelectUnivInfo, useSelecterEnter} from '@components/SolutionPage/StepHeader/StepHeader';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import RadioButton from '@components/SolutionPage/RadioButton/RadioButton';
import Input from '@components/SolutionPage/Input/Input';
import {STEP_STRING} from '@components/SolutionPage/StepString';

import {
  Block,
  FooterBlock,
  ReadyButton,
  Bold22,
  RadioButtonPaymentContainer,
} from '@components/SolutionPage/Common/Common.style';

import {
  Table,
  Row,
  Column,
  HeaderRow,
  HeaderColumn,
  TopBottomNonPaddingColumn
} from '@components/SolutionPage/Table/Table.style';
import Router,{withRouter} from 'next/router';

interface service {
  name: string;
  type: string;
  price : number;
  strPrice: string;
  index: number;
}

const getChosseUnivCode =()=>{
    let data = null;
    if(typeof window !=="undefined"){
      data = sessionStorage.getItem('chooseUnivCode');
    }
    return data;
}

const convertPrice=(price:number)=>{
  return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const SolutionPaymentPage: NextPage = ({
  router: {
    query: { lang: queryLang },
  },
}) => {

  const { t, lang, changeLang } = useTranslate(i18nResource);

  let services: Array<service> = [
    {
      name: t('translation-notarization-service'),
      type: "trans",
      price : 20000,
      strPrice:'',
      index: 1
    },
    {
      name: t('enter-support-service'),
      type: "support",
      price : 25000,
      strPrice:'',
      index: 2
    },
    {
      name: t('enter-support-pro'),
      type: "pro",
      price : 30000,
      strPrice:'',
      index: 3
    }
  ];
  
  React.useEffect(() => {
    API.getPlayerStatus()
    .then((data)=>{
      if (data.status !== 'success') {
        console.log(data);
      } else { 
        const univ_code = getChosseUnivCode();
        const user = data.userstatus_list.find(us=>us.univ_code === univ_code);
        if(user!==null && typeof user!=="undefined"){
          if(typeof window !== "undefined"){
            sessionStorage.setItem('chooseUnivCode',user.univ_code);
            sessionStorage.setItem('chooseUnivName',user.univ_name);
            sessionStorage.setItem('chooseSubjectname',user.subjectname);
            sessionStorage.setItem('choosePayRank',user.pay_rank);
          }
          if(user.step === STEP_STRING.STEP_TWO){
            if(user.pay_rank===null||user.pay_status==="READY"){
              Router.push(`/solution${queryLang?`?lang=${queryLang}`:''}`)
            }
          }else {
            Router.push(`/solution${queryLang?`?lang=${queryLang}`:''}`)
          }
        }else {
          Router.push(`/solution${queryLang?`?lang=${queryLang}`:''}`)
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);  

  React.useEffect(() => {
    if (queryLang !== undefined) {
      changeLang(queryLang);
    }
  }, [queryLang]);
  
  const getSesstionData =()=>{
    let data = null;
    if(typeof window !=="undefined"){
      const univ_code = getChosseUnivCode();
      let sessionData = sessionStorage.getItem('select_enter_value');
      if(sessionData&&sessionData!==""){
        sessionData=JSON.parse(sessionData);
        sessionData.univ_code = sessionStorage.getItem('chooseUnivCode');
        sessionData.univ_name = sessionStorage.getItem('chooseUnivName');
        sessionData.major_str = sessionStorage.getItem('chooseSubjectname');
        if(sessionStorage.getItem('choosePayRank')!==null&&sessionStorage.getItem('choosePayRank')!==''){
          const payRank = JSON.parse(sessionStorage.getItem('choosePayRank'));
          sessionData.plan_str = services.find(service=>service.index === payRank)?.type;
        }       
      }else{
        sessionData = {
          univ_code:sessionStorage.getItem('chooseUnivCode'),
          univ_name:sessionStorage.getItem('chooseUnivName'),
          major_str:sessionStorage.getItem('chooseSubjectname')
        };    
        if(sessionStorage.getItem('choosePayRank')!==null){
          const payRank = JSON.parse(sessionStorage.getItem('choosePayRank'));
          sessionData.plan_str = services.find(service=>service.index === payRank)?.type;
        }
      }
      if(univ_code &&sessionData&& univ_code===sessionData.univ_code){
        data = sessionData;
      }
    }
    return data;
  }
  
  React.useEffect(() => {
    const scriptJquery = document.createElement('script');
    const scriptIamport = document.createElement('script');

    scriptJquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    scriptJquery.async = true;

    scriptIamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js";
    scriptIamport.async = true;

    document.body.appendChild(scriptJquery);
    document.body.appendChild(scriptIamport);

    return () => {
      document.body.removeChild(scriptIamport);
      document.body.removeChild(scriptJquery);
    }
  }, []);
  if(typeof window !== "undefined"){    
    const getPlayerData =async()=>{
      const data = await API.getPlayerStatus();
      return data;
    }
    let sessionData = getSesstionData();
    const [selectValue, handleSelectEnter]= useSelecterEnter(sessionData?sessionData:{univ_code:getChosseUnivCode(),enter_type:"new_enter"});
    const [accountTransferName, setAccountTransferName]= useState("");
    
    const isFinal = () =>{
      if(selectValue!==null&&typeof selectValue.pay_method==="string"){
        if(selectValue.pay_method==="card_paypal"){
          return true;
        }else if(selectValue.pay_method==="account_transfer"&&accountTransferName!==""){
          return true;
        }
      }
      return false;
    }

    const selectUnivName = sessionStorage.getItem("chooseUnivName"); 
    const plan = services.find(service=>service.type===selectValue.plan_str).name;
    const priceUnit = "KRW"; 
    const [loading, resolved, error] = usePromise(getPlayerData, []);
    if (loading) return <div></div>; 
    if (error) window.alert('API 오류');
    if (!resolved) return null;
    const {userstatus_list} = resolved;
    const univ_code =  getChosseUnivCode();
    const playerData = userstatus_list.find(us=>us.univ_code ===univ_code);

    const onClickNextStep=(isFinal:boolean, accountTransferName:string)=>{
      if(isFinal){
        if(selectValue.pay_method ==="account_transfer"){
          console.log(accountTransferName);
          sessionStorage.setItem("pay_payer_name",accountTransferName);
          API.sendAccountTransfer(playerData.id, accountTransferName)
          .then( data=>{
            if(data.status==="success"){
              Router.push(`/solution/2/paymentWaiting${queryLang?`?lang=${queryLang}`:''}`);
            }
          });
        }else if(selectValue.pay_method ==="card_paypal"){
          const data={pg:'paypal',amount:playerData.pay_cost}
           Payment(data, playerData, queryLang);
        }
      }else if(selectValue.pay_method ==="account_transfer"){
        window.alert(t('warn-4'));
      }
    }

    return (
      <DefaultLayout>
        {loading && (
          <LoadingPopup>
            <Loading />
          </LoadingPopup>
        )}
        <Header t={t} lang={lang} changeLang={changeLang} background="light" position="relative" />
        <StepHeader step={2} t={t} lang={queryLang} changeLang={changeLang}/>
        <Block>
          <Bold22>{t('payment-method')}</Bold22>
          <RadioButtonPaymentContainer>
              <RadioButton id="account_transfer" group="pay_method" value="account_transfer" checked={selectValue?.pay_method==="account_transfer"} onChange={handleSelectEnter}>{t('account-transfer')}</RadioButton>
              <RadioButton id="card_paypal" group="pay_method" value="card_paypal" checked={selectValue?.pay_method==="card_paypal"} onChange={handleSelectEnter}>{t('card-payment-paypal')}</RadioButton>
            </RadioButtonPaymentContainer>
          <Table>
            <Row>
              <HeaderColumn width={queryLang?queryLang==="vn"?5:4:4}>{t('select-university')}</HeaderColumn>
              <Column width={queryLang?queryLang==="vn"?11:12:12}>{selectUnivName}</Column>
            </Row>
            <Row>
              <HeaderColumn width={queryLang?queryLang==="vn"?5:4:4}>{t('select-service')}</HeaderColumn>
              <Column width={queryLang?queryLang==="vn"?11:12:12}>{plan}</Column>
            </Row>
            <Row>
              <HeaderColumn width={queryLang?queryLang==="vn"?5:4:4}>{t('service-fee')}</HeaderColumn>
              <Column width={queryLang?queryLang==="vn"?11:12:12}>{convertPrice(playerData.service_fee)} {priceUnit}</Column>
            </Row>
            {playerData.apply_fee!=="null"?
              <Row>
                <HeaderColumn width={queryLang?queryLang==="vn"?5:4:4}>{t('application-fee')}</HeaderColumn>
                <Column width={queryLang?queryLang==="vn"?11:12:12}>{convertPrice(playerData.apply_fee)} {priceUnit}</Column>
              </Row>
            :null}
            <Row>
              <HeaderColumn width={queryLang?queryLang==="vn"?5:4:4}>{t('payment-amount-including-VAT')}</HeaderColumn>
              <Column width={queryLang?queryLang==="vn"?11:12:12}>{convertPrice(playerData.pay_cost)} {priceUnit}</Column>
            </Row>
            {selectValue.pay_method==="account_transfer"?
              <Row>
                <HeaderColumn width={queryLang?queryLang==="vn"?5:4:4}>{t('account-transfer-name')}</HeaderColumn>
                <TopBottomNonPaddingColumn width={queryLang?queryLang==="vn"?11:12:12}><Input placeholder={t('please-input-account-transfer-name')} value={accountTransferName} onChange={(e)=>setAccountTransferName(e.target.value)}/></TopBottomNonPaddingColumn>
              </Row>
            :null}
          </Table>
        </Block>
        <FooterBlock>
          <ReadyButton isReady={isFinal()} onClick={(e)=>onClickNextStep(isFinal(),accountTransferName)}>{t('to-pay')}</ReadyButton>
        </FooterBlock>
      </DefaultLayout>
    );
  }
  return <DefaultLayout></DefaultLayout>
};

export default withRouter(SolutionPaymentPage);