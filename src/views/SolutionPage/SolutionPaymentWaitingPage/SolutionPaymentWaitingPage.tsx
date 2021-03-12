import React, {useState} from 'react';
import axios from 'axios';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '@assets/i18n/solutionPage.json';
import { GetServerSideProps, NextPage } from 'next';
import { useSWRInfinite, responseInterface } from 'swr';
import { UpdateUrlQueryFunction } from '@views/RecommendPage/RecommendListPage/RecommendListPage';
import Header from '@components/Shared/Header/Header';
import UnivTuitionTable, { SubjectType } from '@components/RecommendPage/UnivTutionTable/UnivScholarshipTable';
import StepHeader, {getSelectUnivInfo, useSelecterEnter} from '@components/SolutionPage/StepHeader/StepHeader';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import RadioButton from '@components/SolutionPage/RadioButton/RadioButton';
import Input from '@components/SolutionPage/Input/Input';
import ReadyRadioButton from '@components/SolutionPage/ReadyRadioButton/ReadyRadioButton';
import {
  Block,
  FooterBlock,
  ReadyButton,
  GreyText,
  Bold22,
  Bold18,
  FooterNoticeContainer,
  RadioButtonPaymentContainer,
  UncheckedRadioIcon,
  CheckedRadioIcon
} from '@components/SolutionPage/Common/Common.style';
import {
  MessengerIcon,
  IconContainer
} from '@views/SolutionPage/SolutionPaymentWaitingPage/SolutionPaymentWaitingPage.style';

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

let services: Array<service> = [
  {
    name: '번역 공증 서비스',
    type: "trans",
    price : 20000,
    strPrice:'',
    index: 1
  },
  {
    name: '입학지원 서비스',
    type: "support",
    price : 25000,
    strPrice:'',
    index: 2
  },
  {
    name: '입학지원 PRO',
    type: "pro",
    price : 30000,
    strPrice:'',
    index: 3
  }
];

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

const onClickNextStep=(isFinal:boolean, selectValue)=>{
  if(isFinal){
    if(selectValue.pay_method ==="account_transfer"){

    }else if(selectValue.pay_method ==="card_paypal"){
      sendPlayerInfo(selectValue.plan);
    }
  }else if(selectValue.pay_method ==="account_transfer"){
    window.alert("입금자명을 입력하세요");
  }
}

const getChosseUnivCode =()=>{
    let data = null;
    if(typeof window !=="undefined"){
      data = "SMU_UNI";//window.sessionStorage.getItem('chooseUniv');
    }
    return data;
}

const getSesstionData =()=>{
    let data = null;
    if(typeof window !=="undefined"){
      const univ_code = getChosseUnivCode();
      let sessionData = sessionStorage.getItem('select_enter_value');
      if(sessionData&&sessionData!==""){
        sessionData=JSON.parse(sessionData);
        sessionData.univ_code = sessionStorage.getItem('chooseUniv');
        sessionData.univ_name = sessionStorage.getItem('chooseUnivName');
        sessionData.major = sessionStorage.getItem('chooseSubjectname');
        sessionData.plan = sessionStorage.getItem('choosePayRank');
      }else{
        sessionData = null;
      }
      if(univ_code &&sessionData&& univ_code===sessionData.univ_code){
        data = sessionData;
      }
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
  if(typeof window !== "undefined"){
    const { t, lang, changeLang } = useTranslate(i18nResource);
    let sessionData = getSesstionData();
    const [selectValue, handleSelectEnter]= useSelecterEnter(sessionData?sessionData:{univ_code:getChosseUnivCode(),enter_type:null});
    const accountTransferName = window.sessionStorage.getItem("pay_payer_name");
    
    let playerData = usePlayerData();
    
    const selectUnivName = window.sessionStorage.getItem("chooseUnivName"); 
    const plan = services.find(service=>service.type===selectValue.plan).name;
    const priceUnit = "KRW"; 

    if(playerData !== undefined){
      const statusId = sessionStorage.getItem("user_status_id");
      playerData = playerData.userstatus.find(status=>status.id === Number.parseInt(statusId));

      return (
        <DefaultLayout>
          <Header t={t} lang={lang} changeLang={changeLang} background="light" position="relative" />
          <StepHeader step={2} major={selectValue?typeof selectValue.major==="string"?selectValue.major:null:null} plan={selectValue?typeof selectValue.plan==="string"?selectValue.plan:null:null}/>
  
          <Block>
            <Bold22>결제 수단</Bold22>
            <RadioButtonPaymentContainer>
                <RadioButton id="account_transfer" group="pay_method" value="account_transfer" checked={selectValue?.pay_method==="account_transfer"} onChange={handleSelectEnter}>계좌이체</RadioButton>
                <RadioButton id="card_paypal" group="pay_method" value="card_paypal" checked={selectValue?.pay_method==="card_paypal"} onChange={handleSelectEnter}>카드결제(페이팔)</RadioButton>
             </RadioButtonPaymentContainer>
            <Table>
              <Row>
                <HeaderColumn>선택 학교</HeaderColumn>
                <Column width={12}>{selectUnivName}</Column>
              </Row>
              <Row>
                <HeaderColumn>선택 상품</HeaderColumn>
                <Column width={12} >{plan}</Column>
              </Row>
              <Row>
                <HeaderColumn>서비스비</HeaderColumn>
                <Column width={12} >{convertPrice(playerData.service_fee)} {priceUnit}</Column>
              </Row>
              {playerData.apply_fee!=="null"?
                <Row>
                  <HeaderColumn>원서접수비</HeaderColumn>
                  <Column width={12} >{convertPrice(playerData.apply_fee)} {priceUnit}</Column>
                </Row>
              :null}
              <Row>
                <HeaderColumn>결제 금액 (VAT포함)</HeaderColumn>
                <Column width={12}>{convertPrice(playerData.pay_cost)} {priceUnit}</Column>
              </Row>
              {selectValue.pay_method==="account_transfer"?
                <Row>
                  <HeaderColumn>입금자명</HeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input readonly={true} value={accountTransferName} onChange={(e)=>setAccountTransferName(e.target.value)}/></TopBottomNonPaddingColumn>
                </Row>
              :null}
            </Table>
          </Block>
          
          <Block>
            <Bold22>계좌이체 안내</Bold22>
            <Table>
              <Row>
                <HeaderColumn>입금 은행</HeaderColumn>
                <Column width={12}>국민은행 (KOOKMIN BANK)</Column>
              </Row>
              <Row>
                <HeaderColumn>은행 코드</HeaderColumn>
                <Column width={12} >CZNBKRSE (해외에서 송금 시, 사용하는 코드)</Column>
              </Row>
              <Row>
                <HeaderColumn>계좌번호</HeaderColumn>
                <Column width={12}>479401-04-381337</Column>
              </Row>
                <Row>
                  <HeaderColumn>예금주</HeaderColumn>
                  <Column width={12} >이기성 (카툼)</Column>
                </Row>
            </Table>
          </Block>
          <Block>
            <FooterNoticeContainer>
            입금 내역을 확인하고 있습니다.<br/>
            입금이 확인되어야 입학솔루션 진행이 가능합니다.<br/>
            입금 후,<IconContainer><MessengerIcon /></IconContainer>으로 입금 내역을 알려주시면 빠른 처리가 가능합니다. <br/>
            <Bold22>이용해 주셔서 감사합니다.</Bold22>
            </FooterNoticeContainer>
          </Block>
        </DefaultLayout>
      );
    }
  }
  return <DefaultLayout></DefaultLayout>
};

export default withRouter(SolutionPaymentPage);