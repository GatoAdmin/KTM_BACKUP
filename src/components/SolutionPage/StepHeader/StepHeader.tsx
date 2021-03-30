import React from 'react';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';
import Router from 'next/router';
import PlanItem from '@components/SolutionPage/PlanItem/PlanItem';
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
import isLogin from '@util/auth/auth';

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

export const getSelectUnivInfo= async (lang:string)=>{
  try{
    if(isLogin()){
      if(typeof window !== "undefined"){
        const univ_code = sessionStorage.getItem('chooseUnivCode');
        if(typeof univ_code!=="undefined"&&univ_code!=="undefined"&&univ_code!==null){
          const univInfo = await API.getUnivData(univ_code,lang);
          return univInfo;
        }else{
          return {};
        }
      }
    }
    else{
      return {};
    }
  }catch(error){
    console.error(error);
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

interface service {
  name: string;
  type: string;
  index: number;
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

const StepHeader: React.VFC<StepProps> = ({ step = 1, t, lang, changeLang}) => {  
  const getUnivInfo=async()=>{
    const data = await getSelectUnivInfo(lang);
    return data;
  }
  const onClickSelectUniv=()=>{
    if(isLogin()){
      //TODO:나중에 url 옮겨줄것
      // Router.push('/login');
    }else{
      alert(t('warn-0'));
      Router.push('/login');
    }
  };
  
  let services: Array<service> = [
    {
      name: t('translation-notarization-service'),
      type: "trans",
      index: 1
    },
    {
      name: t('enter-support-service'),
      type: "support",
      index: 2
    },
    {
      name: t('enter-support-pro'),
      type: "pro",
      index: 3
    }
  ];
  
  const getSesstionData =()=>{
    let data = null;
    if(typeof window !=="undefined"){
      const univ_code = sessionStorage.getItem('chooseUnivCode');
      let sessionData = sessionStorage.getItem('select_enter_value');
      if(sessionData&&sessionData!==""){
        sessionData=JSON.parse(sessionData);
        sessionData.univ_code = sessionStorage.getItem('chooseUnivCode');
        sessionData.univ_name=sessionStorage.getItem('chooseUnivName');
        sessionData.major_str=sessionStorage.getItem('chooseSubjectname');
        const payRankStr =sessionStorage.getItem('choosePayRank');
        if(payRankStr!==null&&payRankStr!==''){
          const payRank = JSON.parse(payRankStr);
          sessionData.plan_str = services.find(service=>service.index === payRank)?.type;
        }
      }else{
        sessionData = {
          univ_code:sessionStorage.getItem('chooseUnivCode'),
          univ_name:sessionStorage.getItem('chooseUnivName'),
          major_str:sessionStorage.getItem('chooseSubjectname')
        };
        const payRankStr =sessionStorage.getItem('choosePayRank');
        if(payRankStr!==null&&payRankStr!==''){
          const payRank = JSON.parse(payRankStr);
          sessionData.plan_str = services.find(service=>service.index === payRank)?.type;
        }
      }
      if(univ_code &&sessionData&& univ_code===sessionData.univ_code){
        data = sessionData;
      }
    }
    return data;
  }
  const sesstionData = getSesstionData();
  let major_str = sesstionData?.major_str;
  let plan_str = sesstionData?.plan_str;

  const [loading, resolved, error] = usePromise(getUnivInfo, []);
  if (loading) return <div></div>; 
  if (error) location.reload();//window.alert('API 오류');
  if (!resolved) return null;
  let info = resolved;

  let univInfo = info?.univ_info;
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
                ?<PlanItem type={plan_str} t={t} lang={lang} changeLang={changeLang}/>
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
};

export default StepHeader;
