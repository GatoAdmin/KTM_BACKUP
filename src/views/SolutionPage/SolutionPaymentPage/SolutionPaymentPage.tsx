import React, {useState} from 'react';
import axios from 'axios';
import API from '@util/api';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '@assets/i18n/solutionPage.json';
import usePromise from '@util/hooks/usePromise';
import { GetServerSideProps, NextPage } from 'next';
import { useSWRInfinite, responseInterface } from 'swr';
import { UpdateUrlQueryFunction } from '@views/RecommendPage/RecommendListPage/RecommendListPage';
import Header from '@components/Shared/Header/Header';
import StepHeader, {getSelectUnivInfo, useSelecterEnter} from '@components/SolutionPage/StepHeader/StepHeader';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import RadioButton from '@components/SolutionPage/RadioButton/RadioButton';
import Input from '@components/SolutionPage/Input/Input';
import {STEP_STRING} from '@components/SolutionPage/StepString';
import ReadyRadioButton from '@components/SolutionPage/ReadyRadioButton/ReadyRadioButton';
import {
  Block,
  FooterBlock,
  ReadyButton,
  GreyText,
  Bold22,
  Bold18,
  RadioButtonPaymentContainer,
  UncheckedRadioIcon,
  CheckedRadioIcon
} from '@components/SolutionPage/Common/Common.style';
// import {
// } from '@views/SolutionPage/SolutionPaymentPage/SolutionPaymentPage.style';

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

const fetchSendPlayerInfo = (url: string) => axios.get(url,{withCredentials : true})
  .then((res) => {const {
    userstatus
  }: {
    userstatus:{    
        id: number;
        user_id: number;
        univ_code: string;
        info_type: string;
        subjecttitle: string;
        subjectname: string;
        pay_rank: string;
        service_fee:string;
        apply_fee:string;
        pay_cost: string;
        doc_cost:number;
        pay_complete:boolean;
      }
    }  = res.data;

    window.sessionStorage.setItem("user_status",JSON.stringify({userstatus}));
    window.sessionStorage.setItem("user_status_id",String(userstatus.id));
    return {userstatus};
  });
  
const sendPlayerInfo = (plan:string) => {
  let sid = ""; 
  let statusId = "";
  if(typeof window !== "undefined"){
    sid = window.sessionStorage.getItem('sid');
    statusId = window.sessionStorage.getItem("user_status_id");
  }
  const rank = services.find(service=>service.type===plan)?.index;
  const parms = {
    status_id: statusId,
    rank: rank
  };
  const getKey = () => `/api/?action=set_player_payrank&params=${JSON.stringify(parms)}&sid=${sid}`;

  const data = fetchSendPlayerInfo(getKey());
  return true;
};
const getChosseUnivCode =()=>{
    let data = null;
    if(typeof window !=="undefined"){
      data = sessionStorage.getItem('chooseUnivCode');
    }
    return data;
}


const fetchPlayerStatusInfo = (url: string) => axios.get(url,{withCredentials : true})
  .then((res) => {const {
    userstatus
  }: {
    userstatus:{
        id: number;
        user_id: number;
        univ_code: string;
        info_type: string;
        subjecttitle: string;
        subjectname: string;
        pay_rank: string;
        service_fee:string;
        apply_fee:string;
        pay_cost: string;
        doc_cost:number;
        pay_complete:boolean;
      }
    }  = res.data;

    return {userstatus: userstatus};
  });
  
const usePlayerData = ()=>{
  let sid = ""; 
  if(typeof window !== "undefined"){
    sid = window.sessionStorage.getItem('sid');
  }

  const getKey = () => `/api/?action=get_player_status&params=${JSON.stringify({})}&sid=${sid}`;
  let { data } = useSWRInfinite(
    getKey,
    (url) => fetchPlayerStatusInfo(url)
  );
  return Array.isArray(data)?data[0]:data;
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
        if(typeof window !== "undefined"){
          sessionStorage.setItem('chooseUnivCode',user.univ_code);
          sessionStorage.setItem('chooseUnivName',user.univ_name);
          sessionStorage.setItem('chooseSubjectname',user.subjectname);
          sessionStorage.setItem('choosePayRank',user.pay_rank);
        }
        // TODO: 스테이터스 확인 후 url 변경
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
  
  if(typeof window !== "undefined"){    
    const getPlayerData =async()=>{
      const data = await API.getPlayerStatus();
      return data;
    }
    let sessionData = getSesstionData();
    const [selectValue, handleSelectEnter]= useSelecterEnter(sessionData?sessionData:{univ_code:getChosseUnivCode(),enter_type:"new_enter"});
    const [accountTransferName, setAccountTransferName]= useState("");
    
    // let playerData = usePlayerData();
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
    const univ_code =  getChosseUnivCode()
    const playerData = userstatus_list.find(us=>us.univ_code ===univ_code);
    console.log(playerData)

    const onClickNextStep=(isFinal:boolean, accountTransferName:string)=>{
      if(isFinal){
        if(selectValue.pay_method ==="account_transfer"){
          console.log(accountTransferName);
          sessionStorage.setItem("pay_payer_name",accountTransferName);
          //TODO:계좌이체 등 결제관련 API 붙이기
          Router.push(`/solution/2/paymentWaiting${queryLang?`?lang=${queryLang}`:''}`);
        }else if(selectValue.pay_method ==="card_paypal"){
          sendPlayerInfo(selectValue.plan_str);
        }
      }else if(selectValue.pay_method ==="account_transfer"){
        window.alert(t('warn-4'));
      }
    }


    if(playerData !== undefined){
      return (
        <DefaultLayout>
          <Header t={t} lang={lang} changeLang={changeLang} background="light" position="relative" />
          <StepHeader step={2} major_str={selectValue?selectValue.major_str:null} plan_str={selectValue?selectValue.plan_str:null} t={t} lang={lang} changeLang={changeLang}/>
  
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
  }
  return <DefaultLayout></DefaultLayout>
};

export default withRouter(SolutionPaymentPage);