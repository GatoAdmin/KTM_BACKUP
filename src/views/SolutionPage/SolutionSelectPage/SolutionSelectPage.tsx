import React from 'react';
import axios from 'axios';
import useTranslate from '@util/hooks/useTranslate';
import { GetServerSideProps, NextPage } from 'next';
import Router, { withRouter } from 'next/router';
import { useSWRInfinite, responseInterface } from 'swr';
import { UpdateUrlQueryFunction } from '@views/RecommendPage/RecommendListPage/RecommendListPage';
import Header from '@components/Shared/Header/Header';
import UnivTuitionTable, { SubjectType } from '@components/RecommendPage/UnivTutionTable/UnivScholarshipTable';
import StepHeader, {getSelectUnivInfo, useSelecterEnter} from '@components/SolutionPage/StepHeader/StepHeader';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import RadioButton from '@components/SolutionPage/RadioButton/RadioButton';
import DocumentShortItem from '@components/SolutionPage/DocumentShortItem/DocumentShortItem';
import {
  ColorBold,
  BlockHeader,
  Block,
  EmptyText,
  ReadyButton,
  SelectContainer,
  Tap,
  TapItem,
  TapContainer,
  RadioButtonContainer,
  DocumentShortContainer
} from '@components/SolutionPage/Common/Common.style';
import {
  ImageContainer,
  Accent,
  CoverImage
} from '@views/SolutionPage/SolutionSelectPage/SolutionSelectPage.style';

import FamilyIcon from '@assets/svg/family_icon.svg';
import EducationIcon from '@assets/svg/language_education_icon.svg';
import CertificateIcon from '@assets/svg/education_qualification_icon.svg';
import { isArray } from 'util';

const qualificationIcons = [
  { type: '국적요건', icon: FamilyIcon },
  { type: '어학요건', icon: EducationIcon },
  { type: '학력요건', icon: CertificateIcon },
] as const;

interface tap {
  name: string;
  type: string;
  index : number;
}

const taps: Array<tap> = [
  {
    name: '인문계열',
    type: 'liberal',
    index: 1,
  },
  {
    name: '자연계열',
    type: 'nature',
    index: 2,
  },
  {
    name: '예체능계열',
    type: 'arts',
    index: 3,
  }
];
const fetchDocumentInfo = (url: string) => axios.get(url)
  .then((res) => {
    console.log(res.data);
    // const {
    //   major,
    //   document,
    // }:
    
    //{
    //     major: {
    //       liberal : Array<{
    //         subjecttitle: SubjectType;
    //         subjectname: string;
    //         tuition: number;
    //       }>,
    //       nature : Array<{
    //         subjecttitle: SubjectType;
    //         subjectname: string;
    //         tuition: number;
    //       }>,
    //       arts : Array<{
    //         subjecttitle: SubjectType;
    //         subjectname: string;
    //         tuition: number;
    //       }>,
    //     },
    //     document: {
    //       essential : Array<{
    //         document: string;
    //         documenttype: string;
    //         pictogram: Pictogram;
    //         additionalinfo: string | null;
    //       }>;
    //       noessential : Array<{
    //           document: string;
    //           documenttype: string;
    //           pictogram: Pictogram;
    //           additionalinfo: string | null;
    //         }>;
    //     }
    //   } = res.data;
    // return {
    //   tuition: tuition.map((tuitionInfo) => ({
    //     name: tuitionInfo.subjectname,
    //     type: tuitionInfo.subjecttitle,
    //     tuition: formatKRW.format(tuitionInfo.tuition),
    //   })),
    //   document: supportdocument.map((documentInfo) => ({
    //     name: documentInfo.document,
    //     type: documentInfo.documenttype,
    //     pictogram: documentInfo.pictogram,
    //     info: documentInfo.additionalinfo,
    //   }))
    // };
  });
const useDocumentData = (univ_code:string) => {
  let sid = 0; 
  if(typeof window !== "undefined"){
    sid = window.sessionStorage.getItem('sid');
  }
  const getKey = () => `http://15.165.227.164/api/?action=oneclick_univ&params=${JSON.stringify({ univ_code: univ_code })}&sid=${sid}`;
  const { data } = useSWRInfinite(
    getKey,
    (url) => fetchDocumentInfo(url)
  );
  return isArray(data)?data[0]:data;
};

export const getSolutionInfo=()=>{
  try{
      const univ_code = "SMU_UNI";
      if(univ_code===null){
        return null;
      }else{
        const univInfo = useDocumentData(univ_code);
        console.log(univInfo)
        return univInfo;
      }
  }catch(error){
    console.log(error);
  }
};


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

const onClickNextStep=(isFinial:boolean)=>{
  if(isFinial){
    Router.push('/solution/2');
  }else{
    window.alert("학교와 학과를 먼저 선택해주세요.");
  }
}

const SolutionSelectPage: NextPage = () => {
  if(typeof window !== "undefined"){
    const univInfo = getSelectUnivInfo();
    let sessionData = getSesstionData();
    const [selectValue, handleSelectEnter]= useSelecterEnter(sessionData?sessionData:{univ_code:getChosseUnivCode(),enter_type:null});
    let viewType = selectValue?typeof selectValue.major_type==="string"?selectValue.major_type:"liberal":"liberal";

    const [viewTap,setViewTaps] = React.useState({type:viewType}); 
    console.log(selectValue);
    const changeViewTap =(type:string)=>{
      setViewTaps({type:type});
      handleSelectEnter();
    }
    const univInfo2 = getSolutionInfo();
    const isFinial = () =>{
      if(univInfo){
        if(selectValue!==null&&typeof selectValue.major==="string"){
          return true;
        }
      }
      return false;
    }
    return (
      <DefaultLayout>
        <Header background="light" position="relative" />
        <StepHeader step={1} major={ selectValue?typeof selectValue.major==="string"?selectValue.major:null:null}/>
        <Block>
          <BlockHeader>입학 계열 선택</BlockHeader>
          {univInfo
            ?<RadioButtonContainer>
              <RadioButton id="new_enter" group="enter_type" value="new_enter" checked={selectValue?.enter_type==="new_enter"} onChange={handleSelectEnter}>신입학</RadioButton>
              <RadioButton id="transfer_enter" group="enter_type" value="transfer_enter" checked={selectValue?.enter_type==="transfer_enter"} onChange={handleSelectEnter}>편입학</RadioButton>
            </RadioButtonContainer>
            :<EmptyText>
              먼저 대학 선택 버튼을 눌러 입학을 준비할 대학교를 선택해주세요
            </EmptyText>
          }
          
        </Block>
        <Block>
          <BlockHeader>학과 선택</BlockHeader>
          <SelectContainer>
          <TapContainer>
            <Tap>
                {taps.map(({ name, type, index }) => (
                    <TapItem key={index} isViewTap={viewTap.type===type} onClick={()=>changeViewTap(type)}>
                        {name}
                    </TapItem>
                ))}
            </Tap>
          </TapContainer>
          </SelectContainer>
          {univInfo
            ?selectValue!==null&&typeof selectValue.enter_type==="string"
              ?<RadioButtonContainer>
                  {univInfo.major[viewTap.type].map((name:string,index:number) => (
                    <RadioButton id={`${viewTap.type}_${index}`} key={index} group="major" value={name} checked={selectValue?.major===name} onChange={handleSelectEnter}>
                          {name}
                      </RadioButton>
                  ))}
              </RadioButtonContainer>
              :<EmptyText>
                  먼저 대학교와 입학 계열을 선택해주세요.
                </EmptyText>
            :<EmptyText>
              먼저 대학교와 입학 계열을 선택해주세요.
            </EmptyText>
          }
          
        </Block>
        <Block>
          <BlockHeader>제출서류 안내</BlockHeader>
          {univInfo
            ?selectValue!==null&&typeof selectValue.major==="string"
              ?<div>
                <ColorBold>필수 제출서류</ColorBold>
                <DocumentShortContainer>
                {univInfo.document.essential.map(({name, pictogram})=>(
                  <DocumentShortItem pictogram={pictogram}>
                    {name}
                  </DocumentShortItem>
                  ))
                }
                </DocumentShortContainer>
                
                <ColorBold>선택 제출서류</ColorBold>
                <DocumentShortContainer>
                {univInfo.document.noessential.map(({name, pictogram})=>(
                  <DocumentShortItem pictogram={pictogram}>
                    {name}
                  </DocumentShortItem>
                  ))
                }
                </DocumentShortContainer>
                </div>
              :<EmptyText>
                먼저 입학할 학과를 선택해 주세요.
              </EmptyText>
            :<EmptyText>
              먼저 입학할 학과를 선택해 주세요.
            </EmptyText>
          }
        </Block>
        <Block>
          <ReadyButton isReady={isFinial()} onClick={(e)=>onClickNextStep(isFinial())}>다음단계</ReadyButton>
        </Block>
        <ImageContainer>
          <CoverImage/>
          <div><Accent>katumm</Accent>의 유학 전문가와 함께<br/>
              성공적인 유학생활을 시작하세요.
          </div>
        </ImageContainer>
      </DefaultLayout>
    );  
  }
  return <DefaultLayout></DefaultLayout>
};

export default SolutionSelectPage;
