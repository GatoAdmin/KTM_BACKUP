import React from 'react';
import Link from 'next/link';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useSWRInfinite, responseInterface } from 'swr';
import Router, { withRouter } from 'next/router';
import UnivTuitionTable, { SubjectType } from '@components/RecommendPage/UnivTutionTable/UnivScholarshipTable';
import UnivScholarshipTable, { ScholarshipType } from '@components/RecommendPage/UnivScholarshipTable/UnivTuitionTable';
import PlanItem from '@components/SolutionPage/PlanItem/PlanItem';
import DummyData from '@components/SolutionPage/dummy.json';
import {
    UnivLogo,
    UnivItem,
    SolutionHeader,
    StepContainer,
    Navigation,
    NavigationContainer,
    NavItem,
    UnivContainer,
    UnivSelectButton,
    ClickIcon,
    ChangeCircleIcon,
    UnivTextContainer,
    UnivNameContainer,
    UnivName,
    UnivCategory,
    UnivDetailText,
    UnivSelectMajor
} from './StepHeader.style';
import {
    EmptyText
} from '@components/SolutionPage/Common/Common.style';

interface step {
  name: string;
  index : number;
}

interface StepProps {
    step: number;
    major_str?: string;
    plan_str?: string;
    univ_info: object|null;
    t: (s: string) => string;
    changeLang: (s: string) => void;
}

export const getLoginCheck=()=>{
  if(typeof window !== "undefined"){
    const sid = window.sessionStorage.getItem('sid');
    if(sid === null){
      return false;
    }
    return true;
  }
  return false;
};

const onClickSelectUniv=()=>{
  if(getLoginCheck()){
  }else{
    alert("로그인이 필요합니다.");
    Router.push('/login');
  }
};

export const getSelectUnivInfo= async (lang:string)=>{
  try{
    if(getLoginCheck()){//
      if(typeof window !== "undefined"){
        const univ_code = sessionStorage.getItem('chooseUnivCode');
       // const univ_code = "SMU_UNI";//KMU_UNI
          console.log(univ_code)
        if(typeof univ_code!=="undefined"&&univ_code!=="undefined"&&univ_code!==null){
          const univInfo = await API.getUnivData(univ_code,lang);
          return univInfo;
        }else{
          return null;
        }
      }
    }
    else{
      return null;
    }
  }catch(error){
    console.log(error);
  }
};

interface initialSelectEnter{
  univ_code?:string;
  univ_name?:string;
  step?:number|null;
  enter_type?:string|null;
  major_str?:string|number;
  major_type?:string;
  plan_str?: string;
  pay_method?: string;
}

export const useSelecterEnter=(initialSelectEnter:initialSelectEnter|null)
: [initialSelectEnter | null, (event: React.ChangeEvent<HTMLInputElement>) => void] =>{//,updateUrlQuery: UpdateUrlQueryFunction
  const [selectValue, setSelectValue] = React.useState<initialSelectEnter| null>(() => initialSelectEnter);    
  const handleSelectEnter = (event: React.ChangeEvent<HTMLInputElement>|undefined) => {
    let newSelectValue: string | null;
    if(event !== undefined){
      const { target: { value, name, id } } = event;
          if (String(selectValue) === value) {
            newSelectValue = null;
          } else {
            newSelectValue = value;
          }
          console.log(newSelectValue)
          if(name ==="major_str"){
            let strIds = id.split('_');
            setSelectValue({
              ...selectValue,
              major_type:strIds[0],
              major_str:newSelectValue
            });
          }else{
            setSelectValue({
              ...selectValue,
              [name]:newSelectValue
            });
          }
    }else{
      setSelectValue({
        ...selectValue,
        enter_type:"new_enter",
        major_type:"인문",
        major_str:undefined,
        pay_method:undefined,
      });
    }
  };
  if(typeof window !=="undefined"){
    if(selectValue!==null){
      sessionStorage.setItem('select_enter_value', JSON.stringify(selectValue));
    }else{
      sessionStorage.setItem('select_enter_value',"");
    }
  }
  return [
    selectValue, handleSelectEnter
  ];
}

const StepHeader: React.VFC<StepProps> = ({ step = 1, major_str, plan_str, t, lang, changeLang}) => {  
  const getUnivInfo=async()=>{
    const data = await getSelectUnivInfo(lang);
    return data;
  }
  const [loading, resolved, error] = usePromise(getUnivInfo, []);
  if (loading) return <div></div>; 
  if (error) window.alert('API 오류');
  if (!resolved) return null;
  let {univ_info, major, document} = resolved;

  if(typeof window !== "undefined"){
  let univInfo = univ_info;
  const steps: Array<step> = [
    {
      name: `1. ${t('select-school')}`,
      index: 1,
    },
    {
      name: `2. ${t('agreement-and-payment')}`,
      index: 2,
    },
    {
      name: `3. ${t('create-person-information')}`,
      index: 3,
    },
    {
      name: `4. ${t('document-registration')}`,
      index: 4,
    },
    {
      name: `5. ${t('final-agreement')}`,
      index: 5,
    },
  ];
  return (
    <SolutionHeader>
      <StepContainer>
          <NavigationContainer>
          <Navigation>
              {steps.map(({ name, index }) =>  (
                <NavItem key={index} isStep={step === index}>
                    {name}
                </NavItem>
              ))}
          </Navigation>
          </NavigationContainer>
      </StepContainer>
      <UnivContainer>
        {univInfo?
        <UnivItem>
          <UnivLogo src={univInfo.logo}/>
          <UnivTextContainer>
            <UnivNameContainer>
              <UnivName>
                {univInfo.kor_name}
              </UnivName>
              <UnivCategory>
                {univInfo.category}
              </UnivCategory>
              {major_str
                ?<UnivSelectMajor>
                      {major_str}
                </UnivSelectMajor>
                :null
              }
              {plan_str
                ?<PlanItem type={plan_str}/>
                :null
              }
            </UnivNameContainer>
            <UnivDetailText>
                {univInfo.eng_name}
            </UnivDetailText>
            <UnivDetailText>
                {univInfo.address}
            </UnivDetailText>
          </UnivTextContainer>
        </UnivItem>
        :<EmptyText>
              {t('click-right-button-select-university')}
          </EmptyText>
        }
         {univInfo?
         <UnivSelectButton onClick={onClickSelectUniv}>
              <ChangeCircleIcon/>
              {t('university-change').split('<br>').map(line=>(
                <div>{line}</div>
                ))}
          </UnivSelectButton>
          :<UnivSelectButton onClick={onClickSelectUniv}>
              <ClickIcon/>
              {t('university-select').split('<br>').map(line=>(
                <div>{line}</div>
                ))}
          </UnivSelectButton>
          }
      </UnivContainer>
    </SolutionHeader>
);
  }
  return <SolutionHeader></SolutionHeader>
};

export default StepHeader;
