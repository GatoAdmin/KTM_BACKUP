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
import LabelClickCheckbox from '@components/SolutionPage/LabelClickCheckbox/LabelClickCheckbox';
import Agreement from '@components/SolutionPage/Agreement/Agreement';
import PriceInfoHeader from '@components/SolutionPage/PriceInfoHeader/PriceInfoHeader';
import ReadyRadioButton from '@components/SolutionPage/ReadyRadioButton/ReadyRadioButton';
import {
  Block,
  FooterBlock,
  ReadyButton,
  GreyText,
  Bold22,
  Bold18,
  Bold16,
  UncheckedRadioIcon,
  CheckedRadioIcon
} from '@components/SolutionPage/Common/Common.style';
import {
  PriceInfoContainer,
  PriceInfoTableRow,
  PriceInfoTableColumn,
  PriceInfoTableHeaderRow,
  PriceInfoTableHeaderColumn,
  PriceInfoHeaderRow,
  PriceInfoHeaderColumn,
  PriceInfoFooterRow,
  PriceInfoFooterColumn
} from '@views/SolutionPage/SolutionAgreePage/SolutionAgreePage.style';

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
}

let services: Array<service> = [
  {
    name: '번역 공증 서비스',
    type: "trans",
    price : 20000,
    strPrice:'',
  },
  {
    name: '입학지원 서비스',
    type: "support",
    price : 25000,
    strPrice:'',
  },
  {
    name: '입학지원 PRO',
    type: "pro",
    price : 30000,
    strPrice:'',
  }
];

const onClickNextStep=(isFinial:boolean)=>{
  if(isFinial){

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

  const fetchUnivDetailInfo = (url: string) => axios.get(url,{withCredentials : true})
  .then((res) => {const {
    userstatus,
    pay_rank_dict,
    apply_fee
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
      pay_rank_dict:{
        "1":number;
        "2":number;
        "3":number;
      },
      apply_fee: number
    }  = res.data;

    services[0].price = pay_rank_dict[1];
    services[1].price = pay_rank_dict[2];
    services[2].price = pay_rank_dict[3];

    return {userstatus: userstatus, pay_rank_dict: pay_rank_dict, apply_fee: apply_fee};
  });
  
const usePriceData = ()=>{
  // getChosseUnivCode();
  let sid = ""; 
  let status_id = "";
  if(typeof window !== "undefined"){
    sid = window.sessionStorage.getItem('sid');
    const sessionData = window.sessionStorage.getItem('user_status_id');
    status_id = sessionData;
  }
  const getKey = () => `/api/?action=get_player_payrank&params=${JSON.stringify({ status_id: status_id })}&sid=${sid}`;
  const { data } = useSWRInfinite(
    getKey,
    (url) => fetchUnivDetailInfo(url)
  );
  let modifyServices = services.map(service=>{
    let price = String(service.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    service.strPrice = price;
    return service;
  });
  let application = data?data.apply_fee?data.apply_fee:0:0;
  console.log(application);
  return {services: modifyServices, application:application, unit:"KRW"};
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

const SolutionAgreePage: NextPage = () => {
  if(typeof window !== "undefined"){
    let sessionData = getSesstionData();
    const [selectValue, handleSelectEnter]= useSelecterEnter(sessionData?sessionData:{univ_code:getChosseUnivCode(),enter_type:null});
    const [isAgree, setIsAgree]= useState(false);
    const [isOpenAgree, setIsOpenAgree]= useState(false);
    const priceData = usePriceData();
    const isFinial = () =>{
      if(selectValue!==null&&typeof selectValue.plan==="string"&&isAgree){
          return true;
      }
      return false;
    }
    console.log(priceData);
    return (
      <DefaultLayout>
        {isOpenAgree?<Agreement onClose={()=>setIsOpenAgree(false)}/>:null}
        <Header background="light" position="relative" />
        <StepHeader step={2} major={selectValue?typeof selectValue.major==="string"?selectValue.major:null:null} plan={selectValue?typeof selectValue.plan==="string"?selectValue.plan:null:null}/>
        <PriceInfoContainer>
          <PriceInfoHeaderRow>
            <PriceInfoHeaderColumn><Bold22>결제등급을<br/>선택해주세요</Bold22></PriceInfoHeaderColumn>
            <PriceInfoHeaderColumn>
              <PriceInfoHeader backgroundColor="#FF988C">
                번역 공증<br/>서비스
              </PriceInfoHeader>
            </PriceInfoHeaderColumn>
            <PriceInfoHeaderColumn>
              <PriceInfoHeader backgroundColor="#2EC5CE">
                입학지원<br/>서비스
              </PriceInfoHeader>
            </PriceInfoHeaderColumn>
            <PriceInfoHeaderColumn>
              <PriceInfoHeader backgroundColor="#8C30F5">
                입학지원<br/>PRO
              </PriceInfoHeader>
            </PriceInfoHeaderColumn>
          </PriceInfoHeaderRow>
          <PriceInfoTableHeaderRow>
            <PriceInfoTableHeaderColumn>
              <Bold22>PRICING<br/>TABLE</Bold22>
            </PriceInfoTableHeaderColumn>
              {priceData
                ?priceData.services.map((service)=>(
                  <PriceInfoTableHeaderColumn>
                    <Bold22>{service.strPrice}<br/><GreyText>{priceData.unit}</GreyText></Bold22>
                  </PriceInfoTableHeaderColumn>
                )):
                (<>
                <PriceInfoTableHeaderColumn>
                  <Bold22>10,000<br/><GreyText>KRW</GreyText></Bold22>
                </PriceInfoTableHeaderColumn>
                <PriceInfoTableHeaderColumn>
                  <Bold22>15,000<br/><GreyText>KRW</GreyText></Bold22>
                </PriceInfoTableHeaderColumn>
                <PriceInfoTableHeaderColumn>
                  <Bold22>20,000<br/><GreyText>KRW</GreyText></Bold22>
                </PriceInfoTableHeaderColumn>
                </>)}
          </PriceInfoTableHeaderRow>
          <PriceInfoTableRow>
            <PriceInfoTableColumn>
              <Bold18>1 대 1 담당 유학 컨설팅</Bold18>
            </PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
          </PriceInfoTableRow>
          <PriceInfoTableRow>
            <PriceInfoTableColumn>
              <Bold18>서류 번역 및 공증</Bold18>
            </PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
          </PriceInfoTableRow>
          <PriceInfoTableRow>
            <PriceInfoTableColumn>
              <Bold18>자기소개서 첨삭</Bold18>
            </PriceInfoTableColumn>
            <PriceInfoTableColumn><UncheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
          </PriceInfoTableRow>
          <PriceInfoTableRow>
            <PriceInfoTableColumn>
              <Bold18>서류 준비 및 원서접수</Bold18>
            </PriceInfoTableColumn>
            <PriceInfoTableColumn><UncheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
          </PriceInfoTableRow>
          <PriceInfoTableRow>
            <PriceInfoTableColumn>
              <Bold18>서류제출 대행</Bold18>
            </PriceInfoTableColumn>
            <PriceInfoTableColumn><UncheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
          </PriceInfoTableRow>
          <PriceInfoTableRow>
            <PriceInfoTableColumn>
              <Bold18>영사확인 대행</Bold18>
            </PriceInfoTableColumn>
            <PriceInfoTableColumn><UncheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><UncheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
          </PriceInfoTableRow>
          <PriceInfoFooterRow>
            <PriceInfoFooterColumn></PriceInfoFooterColumn>
            <PriceInfoFooterColumn>
              <ReadyRadioButton id="is_select_trans" value="trans" group="plan" checked={selectValue?.plan==="trans"} onChange={handleSelectEnter}>선택</ReadyRadioButton>
            </PriceInfoFooterColumn>
            <PriceInfoFooterColumn>
              <ReadyRadioButton id="is_select_support" value="support" group="plan" checked={selectValue?.plan==="support"} onChange={handleSelectEnter}>선택</ReadyRadioButton>
            </PriceInfoFooterColumn>
            <PriceInfoFooterColumn>
              <ReadyRadioButton id="is_select_pro" value="pro" group="plan" checked={selectValue?.plan==="pro"} onChange={handleSelectEnter}>선택</ReadyRadioButton>
            </PriceInfoFooterColumn>
          </PriceInfoFooterRow>
        </PriceInfoContainer>
        <Block>
          <Bold22>서비스 결제 내역</Bold22>
          <Table>
            <HeaderRow>
              <Column width={14}>
                결제 내용
              </Column>
              <Column width={2}>
                결제 비용
              </Column>
            </HeaderRow>
            {selectValue?.plan
            ?getPriceList(selectValue, priceData)
            :<Row>
              <Column width={14}>-</Column>
              <Column width={2} textAlign="right">0 {priceData.unit}</Column>
            </Row>
            }
          </Table>
          <LabelClickCheckbox id="is_agree" checked={isAgree} onClick={(e)=>setIsOpenAgree(true)} onChange={(e)=>setIsAgree(e.target.checked)}>입학솔루션 이용약관에 동의합니다.</LabelClickCheckbox>
        </Block>
        <FooterBlock>
          <ReadyButton isReady={isFinial()} onClick={(e)=>onClickNextStep(isFinial())}>결제수단 선택</ReadyButton>
        </FooterBlock>
      </DefaultLayout>
    );
  }
  return <DefaultLayout></DefaultLayout>
};

export default SolutionAgreePage;