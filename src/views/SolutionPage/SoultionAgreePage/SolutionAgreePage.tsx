import React from 'react';
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
import DocumentShortItem from '@components/SolutionPage/DocumentShortItem/DocumentShortItem';
import {
  Block,
  ReadyButton
} from '@components/SolutionPage/Common/Common.style';
// import {} from '@views/SolutionPage/SolutionAgreePage/SolutionAgreePage.style';
 
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
      <Block>
        
      </Block>
      <Block>
        <ReadyButton isReady={isFinial()} onClick={(e)=>onClickNextStep(isFinial())}>결제수단 선택</ReadyButton>
      </Block>
    </DefaultLayout>
  );
};

export default SolutionAgreePage;