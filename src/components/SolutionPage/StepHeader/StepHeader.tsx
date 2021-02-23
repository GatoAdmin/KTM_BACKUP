import React from 'react';
import Link from 'next/link';
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
    EmptyText,
    ReadyButton
} from '@components/SolutionPage/Common/Common.style';

import FamilyIcon from '@assets/svg/family_icon.svg';
import EducationIcon from '@assets/svg/language_education_icon.svg';
import CertificateIcon from '@assets/svg/education_qualification_icon.svg';
import WritePictogram from '@assets/svg/write_pictogram.svg';
import SearchPictogram from '@assets/svg/search_pictogram.svg';
import StudyPictogram from '@assets/svg/study_pictogram.svg';
import FamilyPictogram from '@assets/svg/family_pictogram.svg';
import BalancePictogram from '@assets/svg/balance_pictogram.svg';
import { isArray } from 'util';

const qualificationIcons = [
  { type: '국적요건', icon: FamilyIcon },
  { type: '어학요건', icon: EducationIcon },
  { type: '학력요건', icon: CertificateIcon },
] as const;

const documentPictogram = {
  write: WritePictogram,
  check: SearchPictogram,
  study: StudyPictogram,
  family: FamilyPictogram,
  balance: BalancePictogram,
} as const;

interface step {
  name: string;
  index : number;
}

const steps: Array<step> = [
  {
    name: '1. 학교 선택',
    index: 1,
  },
  {
    name: '2. 동의 및 결제',
    index: 2,
  },
  {
    name: '3. 인적 정보 작성',
    index: 3,
  },
  {
    name: '4. 서류 등록',
    index: 4,
  },
  {
    name: '5. 진행 완료',
    index: 5,
  },
];

interface StepProps {
    step: number;
    major?: string;
    plan?: string;
}

type ConditionType = typeof qualificationIcons[number]['type'];
type Pictogram = keyof typeof documentPictogram;

const formatKRW = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' });

const fetchUnivDetailInfo = (url: string) => axios.get(url,{withCredentials : true})
  .then((res) => {const {
    univ_info,
    major,
    document
  }: {
      univ_info:{
        kor_name: string;
        eng_name: string;
        category: string;
        address: string;
        logo:string;
      },
      major: {
        "인문": Array<string>;
        "자연": Array<string>;
        "예체능": Array<string>;
      },
      document:{
        essential: Array<{
          name : string;
          pictogram :string;
        }>;
        noessential: Array<{
          name : string;
          pictogram :string;
        }>;
      }
    }  = res.data;

    window.sessionStorage.setItem('chooseUnivName',univ_info.kor_name);
    return {univ_info, major, document};
  });
  
const useUnivData = (univ_code:string) => {
  let sid = 0; 
  if(typeof window !== "undefined"){
    sid = window.sessionStorage.getItem('sid');
    window.sessionStorage.setItem('chooseUniv',univ_code);
  }
  const getKey = () => `/api/?action=oneclick_univ&params=${JSON.stringify({ univ_code: univ_code })}&sid=${sid}`;
  const { data } = useSWRInfinite(
    getKey,
    (url) => fetchUnivDetailInfo(url)
  );

  return isArray(data)?data[0]:data;
};

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

export const getSelectUnivInfo=()=>{
  try{
    if(getLoginCheck()){//
      // const univ_code = window.sessionStorage.getItem('chooseUniv');
      const univ_code = "SMU_UNI";
      if(univ_code===null){
        return null;
      }else{
        const univInfo = useUnivData(univ_code);
        return univInfo;
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
  major?:string|number;
  major_type?:string;
  plan?: string;
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
          if(name ==="major"){
            let strIds = id.split('_');
            setSelectValue({
              ...selectValue,
              major_type:strIds[0],
              major:newSelectValue
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
        major:undefined,
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

const StepHeader: React.VFC<StepProps> = ({ step = 1, major, plan}) => {  
  if(typeof window !== "undefined"){
  const univInfo = getSelectUnivInfo()?.univ_info;
  return (
      <SolutionHeader>
        <StepContainer>
            <NavigationContainer>
            <Navigation>
                {steps.map(({ name, index }) => (
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
                {major
                  ?<UnivSelectMajor>
                        {major}
                  </UnivSelectMajor>
                  :null
                }
                {plan
                  ?<PlanItem type={plan}/>
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
                우측의 버튼을 클릭하여 입학을 준비할 대학교를 선택하세요.
            </EmptyText>
          }
           {univInfo?
           <UnivSelectButton onClick={onClickSelectUniv}>
                <ChangeCircleIcon/>
                대학교<br/>변경하기
            </UnivSelectButton>
            :<UnivSelectButton onClick={onClickSelectUniv}>
                <ClickIcon/>
                대학교<br/>선택하기
            </UnivSelectButton>
            }
        </UnivContainer>
      </SolutionHeader>
  );
  }
  return <SolutionHeader></SolutionHeader>
};

export default StepHeader;
