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
import Checkbox from '@components/Shared/Checkbox/Checkbox';
import PriceInfoHeader from '@components/SolutionPage/PriceInfoHeader/PriceInfoHeader';
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
  
const SolutionAgreePage: NextPage = () => {
  let sessionData = getSesstionData();
  const [selectValue, handleSelectEnter]= useSelecterEnter(sessionData?sessionData:{univ_code:getChosseUnivCode(),enter_type:null});
  const [isAgree, setIsAgree]= useState(false);

  const isFinial = () =>{
    if(selectValue!==null&&typeof selectValue.plan==="string"){
        return true;
    }
    return false;
  }

  return (
    <DefaultLayout>
      <Header background="light" position="relative" />
      <StepHeader step={2} major={selectValue?typeof selectValue.major==="string"?selectValue.major:null:null}/>
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
          <PriceInfoTableHeaderColumn>
          <Bold22>10,000<br/><GreyText>KRW</GreyText></Bold22>
          </PriceInfoTableHeaderColumn>
          <PriceInfoTableHeaderColumn>
          <Bold22>15,000<br/><GreyText>KRW</GreyText></Bold22>
          </PriceInfoTableHeaderColumn>
          <PriceInfoTableHeaderColumn>
          <Bold22>20,000<br/><GreyText>KRW</GreyText></Bold22>
          </PriceInfoTableHeaderColumn>
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
            <ReadyButton isReady={true}>선택</ReadyButton>
          </PriceInfoFooterColumn>
          <PriceInfoFooterColumn>
            <ReadyButton isReady={true}>선택</ReadyButton>
          </PriceInfoFooterColumn>
          <PriceInfoFooterColumn>
            <ReadyButton isReady={true}>선택</ReadyButton>
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
          <Row>
            <Column width={14}>-</Column>
            <Column width={2} textAlign="right">0 KRW</Column>
          </Row>
        </Table>
        <Checkbox id="is_agree" checked={isAgree} onChange={(e)=>setIsAgree(e.target.checked)}>입학솔루션 이용약관에 동의합니다.</Checkbox>
      </Block>
      <FooterBlock>
        <ReadyButton isReady={isFinial()} onClick={(e)=>onClickNextStep(isFinial())}>결제수단 선택</ReadyButton>
      </FooterBlock>
    </DefaultLayout>
  );
};

export default SolutionAgreePage;