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
import ReadyRadioButton from '@components/SolutionPage/ReadyRadioButton/ReadyRadioButton';
import {
  Block,
  FooterBlock,
  ReadyButton,
  GreyText,
  Bold22,
  Bold18,
  Bold16,
  RadioButtonContainer,
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
  HeaderColumn
} from '@components/SolutionPage/Table/Table.style';

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

const onClickNextStep=(isFinial:boolean, selectValue)=>{
  if(isFinial){
    sendPlayerInfo(selectValue.plan);
  }else{
    window.alert("결제등급과 약관 동의를 클릭해주세요.");
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

const getPriceList = (selectValue:object, priceData:object)=>{
  const plan = services.find(service=>(service.type === selectValue.plan));
  const univName = typeof window !== "undefined"?window.sessionStorage.getItem("chooseUnivName"):"선문대학교";
  let resultPrice = plan?.price+(plan.type !== "trans"?priceData.application:0);
  resultPrice = convertPrice(resultPrice);
  return (
    <>
      <Row>
        <Column width={14}>{plan?.name}-{univName}</Column>
        <Column width={2} textAlign="right">{plan.strPrice} {priceData.unit}</Column>
      </Row>
      {plan.type !== "trans"
        ?<Row>
            <Column width={14}>원서접수비-{univName}</Column>
            <Column width={2} textAlign="right">{convertPrice(priceData.application)} {priceData.unit}</Column>
          </Row>
        :null}
      <Row accent={true}>
        <Column width={14}>결제 금액 (VAT 포함)</Column>
        <Column width={2} textAlign="right">{resultPrice} {priceData.unit}</Column>
      </Row>
    </>
  ); 
}

const SolutionPaymentPage: NextPage = () => {
  if(typeof window !== "undefined"){
    let sessionData = getSesstionData();
    const [selectValue, handleSelectEnter]= useSelecterEnter(sessionData?sessionData:{univ_code:getChosseUnivCode(),enter_type:null});
    const [isAgree, setIsAgree]= useState(false);
    // const [isOpenAgree, setIsOpenAgree]= useState(false);
    const priceData = usePlayerData();

    const isFinial = () =>{
      if(selectValue!==null&&typeof selectValue.plan==="string"&&isAgree){
          return true;
      }
      return false;
    }
    const selectUnivName = window.sessionStorage.getItem("chooseUnivName"); 
    const plan = services.find(service=>service.type===selectValue.plan).name;
    return (
      <DefaultLayout>
        <Header background="light" position="relative" />
        <StepHeader step={2} major={selectValue?typeof selectValue.major==="string"?selectValue.major:null:null} plan={selectValue?typeof selectValue.plan==="string"?selectValue.plan:null:null}/>

        <Block>
          <Bold22>결제 수단</Bold22>
          <RadioButtonContainer>
              <RadioButton id="account_transfer" group="pay_method" value="account_transfer" checked={selectValue?.pay_method==="account_transfer"} onChange={handleSelectEnter}>계좌이체</RadioButton>
              <RadioButton id="card_paypal" group="pay_method" value="card_paypal" checked={selectValue?.pay_method==="card_paypal"} onChange={handleSelectEnter}>카드결제(페이팔)</RadioButton>
           </RadioButtonContainer>
          <Table>
            <Row>
              <HeaderColumn>선택 학교</HeaderColumn>
              <Column width={12} textAlign="right">{selectUnivName}</Column>
            </Row>
            <Row>
              <HeaderColumn>선택 상품</HeaderColumn>
              <Column width={12} textAlign="right">{plan}</Column>
            </Row>
            <Row>
              <HeaderColumn>서비스비</HeaderColumn>
              <Column width={12} textAlign="right">{playerData.service_fee}</Column>
            </Row>
            {playerData.apply_fee!=="null"?
              <Row>
                <HeaderColumn>원서접수비</HeaderColumn>
                <Column width={12} textAlign="right">{playerData.apply_fee}</Column>
              </Row>
            :null}
            {selectValue.pay_method==="account_transfer"?
              <Row>
                <HeaderColumn>입금자명</HeaderColumn>
                <Column width={12} textAlign="right"></Column>
              </Row>
            :null}
            <Row>
              <HeaderColumn>결제 금액 (VAT포함)</HeaderColumn>
              <Column width={12} textAlign="right">{playerData.pay_cost}</Column>
            </Row>
          </Table>
        </Block>
        <FooterBlock>
          <ReadyButton isReady={isFinial()} onClick={(e)=>onClickNextStep(isFinial(),selectValue)}>결제수단</ReadyButton>
        </FooterBlock>
      </DefaultLayout>
    );
  }
  return <DefaultLayout></DefaultLayout>
};

export default SolutionPaymentPage;