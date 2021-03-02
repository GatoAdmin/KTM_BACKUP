import React, {useState} from 'react';
import axios from 'axios';
import useTranslate from '@util/hooks/useTranslate';
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
import Router from 'next/router';

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

const onClickNextStep=(isFinal:boolean, selectValue,accountTransferName:string)=>{
  if(isFinal){
    if(selectValue.pay_method ==="account_transfer"){
      window.sessionStorage.setItem("pay_payer_name",accountTransferName);
      Router.push('/solution/2/paymentWaiting');
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

const SolutionPaymentPage: NextPage = () => {
  if(typeof window !== "undefined"){
    let sessionData = getSesstionData();
    const [selectValue, handleSelectEnter]= useSelecterEnter(sessionData?sessionData:{univ_code:getChosseUnivCode(),enter_type:null});
    const [accountTransferName, setAccountTransferName]= useState("");
    
    let playerData = usePlayerData();
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
    const selectUnivName = window.sessionStorage.getItem("chooseUnivName"); 
    const plan = services.find(service=>service.type===selectValue.plan).name;
    const priceUnit = "KRW"; 
    if(playerData !== undefined){
      const statusId = sessionStorage.getItem("user_status_id");
      playerData = playerData.userstatus.find(status=>status.id === Number.parseInt(statusId));

      return (
        <DefaultLayout>
          <Header background="light" position="relative" />
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
                  <TopBottomNonPaddingColumn width={12}><Input placeholder="입금자명을 입력해주세요." value={accountTransferName} onChange={(e)=>setAccountTransferName(e.target.value)}/></TopBottomNonPaddingColumn>
                </Row>
              :null}
            </Table>
          </Block>
          <FooterBlock>
            <ReadyButton isReady={isFinal()} onClick={(e)=>onClickNextStep(isFinal(),selectValue,accountTransferName)}>결제하기</ReadyButton>
          </FooterBlock>
        </DefaultLayout>
      );
    }
  }
  return <DefaultLayout></DefaultLayout>
};

export default SolutionPaymentPage;