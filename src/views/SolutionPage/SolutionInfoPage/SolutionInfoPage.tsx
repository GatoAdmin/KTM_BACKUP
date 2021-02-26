import React, {useState, useReducer} from 'react';
import axios from 'axios';
import Dummy from '@components/SolutionPage/dummy.json';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '@assets/i18n/SolutionPage/solutionInfoPage.json';
import i18nArrayResource from '@assets/i18n/registerPage.json';
import { GetServerSideProps, NextPage } from 'next';
import { useSWRInfinite, responseInterface } from 'swr';
import Header from '@components/Shared/Header/Header';
import StepHeader, {useSelecterEnter} from '@components/SolutionPage/StepHeader/StepHeader';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import RadioCheckbox from '@components/SolutionPage/RadioCheckbox/RadioCheckbox';
import Input from '@components/SolutionPage/Input/Input';
import Select from '@components/SolutionPage/Select/Select';
import ReadyRadioButton from '@components/SolutionPage/ReadyRadioButton/ReadyRadioButton';
import { Loading, LoadingPopup } from '@views/UserPage/LoginPage/LoginPage.style';
import {
  Block,
  FooterBlock,
  ReadyButton,
  Form,
  FormAlert,
  Bold16,
  Bold22,
  SmallNotice,
  FooterNoticeContainer,
  UncheckedRadioIcon,
  CheckedRadioIcon
} from '@components/SolutionPage/Common/Common.style';
import {
  CauseReturnContainer
} from '@views/SolutionPage/SolutionInfoPage/SolutionInfoPage.style';

import {
  Table,
  Row,
  Column,
  FlexColumn,
  HeaderRow,
  HeaderColumn,
  TopBottomNonPaddingColumn,
  WarningColumn
} from '@components/SolutionPage/Table/Table.style';
import RequireHeaderColumn from '@components/SolutionPage/Table/RequireHeaderColumn';
import { Router,withRouter} from 'next/router';

const countryArray = (t: (s: string) => string) => Array.apply(null, Array(36)).map((val, index) => t(`country-${index}`));
const topikArray = (t: (s: string) => string) => Array.apply(null, Array(7)).map((val, index) => t(`topik-${index}`));

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

const onClickNextStep=(isFinial:boolean, selectValue, t)=>{
  if(isFinial){
    if(window.confirm(t('completed-information-entry'))){
      console.log("OK");
    }
  }else{
    return window.alert(t('enter-all-required-items'));
  }
}

const onSave=(t)=>{
  return window.alert(t('saved'));
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
    userinfo
  }: {
    userinfo:{
      kor_first_name: string;
      kor_last_name: string;
      eng_first_name: string;
      eng_last_name: string;
      sex: string;
      email: string;
      passport_no: string;
      home_address: string;
      phone_no:string;
      nationality: string;
      birth_date: string;
      is_visited_korea: string;
      have_residence_license: string;
      language_skill: string;
      residence_no: string;
      father_name:string;
      father_nationality:string;
      father_phone_no:string;
      father_job:string;
      mother_name:string;
      mother_nationality:string;
      mother_phone_no:string;
      mother_job:string;
      high_school_name:string;
      high_school_address:string;
      }
    }  = Dummy;// res.data;

    return {userinfo: userinfo};
  });
const usePrevPlayerData = ()=>{
  let sid = ""; 
  if(typeof window !== "undefined"){
    sid = window.sessionStorage.getItem('sid');
  }

  const getKey = () => `/api/?action=get_prev_user_info&params=${JSON.stringify({})}&sid=${sid}`;
  let { data } = useSWRInfinite(
    getKey,
    (url) => fetchPlayerStatusInfo(url)
  );

  return Array.isArray(data)?data[0]:data;
}
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

const requireData: Array<string> = [
  "eng_first_name",
  "eng_last_name",
  "sex",
  "birth_date",
  "passport_no",
  "nationality",
  "language_skill",
  "is_visited_korea",
  "high_school_name"
];

type Gender = 'FEMAIL'|'MALE';
type FormData = {
  kor_first_name: string;
  kor_last_name: string;
  eng_first_name: string;
  eng_last_name: string;
  sex: Gender;
  email: string;
  passport_no: string;
  home_address: string;
  phone_no:string;
  nationality: string;
  birth_date: string;
  is_visited_korea: string;
  have_residence_license: string;
  language_skill: string;
  residence_no: string;
  father_name:string;
  father_nationality:string;
  father_phone_no:string;
  father_job:string;
  mother_name:string;
  mother_nationality:string;
  mother_phone_no:string;
  mother_job:string;
  high_school_name:string;
  high_school_address:string;
}
type Action = {type:'SET_DATA'; target:string; data:string;}
const reducer=(formData:FormData,action:Action):FormData=> {
  if(action.type === 'SET_DATA'){
    return {
      ...formData,
      [action.target]: action.data
    };
  }else{
    console.log("없는 액션입니다.");
  }

  return formData;
}

const SolutionInfoPage: NextPage = ({
  router: {
    query: { lang: queryLang },
  },
})  => {
  if(typeof window !== "undefined"){
    const ArrayT = useTranslate(i18nArrayResource);
    const { t, lang, changeLang } = useTranslate(i18nResource);
    
    const playerData = usePrevPlayerData();
    const [formData, setFormData] = useState({
      kor_first_name: null,
      kor_last_name: null,
      eng_first_name: null,
      eng_last_name: null,
      sex: null,
      email: null,
      passport_no: null,
      home_address: null,
      phone_no:null,
      nationality: null,
      birth_date: null,
      is_visited_korea: null,
      have_residence_license: null,
      language_skill: null,
      residence_no: null,
      father_name:null,
      father_nationality:null,
      father_phone_no:null,
      father_job:null,
      mother_name:null,
      mother_nationality:null,
      mother_phone_no:null,
      mother_job:null,
      high_school_name:null,
      high_school_address:null
    });
    const [errMsg, setErrMsg] = React.useState({
      ERROR_NOT_EXIST_USERNAME: false,
      ERROR_NOT_EXIST_LAST_NAME: false,
      ERROR_LAST_NAME_ONLY_ENGLISH: false,
      ERROR_NOT_EXIST_FIRST_NAME: false,
      ERROR_FIRST_NAME_ONLY_ENGLISH: false,
      ERROR_NOT_EXIST_EMAIL: false,
      ERROR_EXIST_EMAIL: false,
      ERROR_NOT_EXIST_PASSWORD: false,
      ERROR_NOT_EXIST_PASSWORD_CONFIRM: false,
      ERROR_NOT_EXIST_NATIONALITY: false,
      ERROR_NOT_EXIST_BIRTH_DATE: false,
      ERROR_NOT_EXIST_TOPIK_LEVEL: false,
      ERROR_NOT_EXIST_IDENTITY: false,
      ERROR_NOT_PROPER_PASSWORD: false,
      ERROR_PASSWORD_CONFIRM_FAIL: false,
      ERROR_NOT_VALID_EMAIL: false,
    });
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      setLoading(true);
  
      const axiosFormData = new FormData();
   //   Object.keys(changedFormData).forEach((key) => axiosFormData.append(key, changedFormData[key]));
  //추가 필요 : "is_done": false, "univ_code":"KMU_UNI",  
      axios({
        method: 'post',
        url: '/api/signup/',
        data: axiosFormData,
      })
        .then((res) => {
          const {
            data: { status },
          } = res;
          if (status !== 'success') {
            setErrMsg((prev) => ({ ...prev, [status]: true }));
          } else {
            alert(t('notify-email-certification'));
            setLoading(false);
            Router.push({
              pathname: '/login',
              query: { lang },
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    const handleFormContent = (e?: React.ChangeEvent<HTMLInputElement>, t?: string, v?: string | number) => {
      if (e !== undefined) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      } else if (t !== undefined) {
        setFormData((prev) => ({ ...prev, [t]: v }));
      }
    };
  
    React.useEffect(() => {
      if (queryLang !== undefined) {
        ArrayT.changeLang(queryLang);
        changeLang(queryLang);
      }
    }, [queryLang]);
  
    React.useEffect(() => {
      if (loading) {
        const errObj = { ...errMsg };
        Object.entries(errObj).map(([key, val]) => (errObj[key] = false));
        setErrMsg(errObj);
      }
    }, [loading]);
  
    let sessionData = getSesstionData();
    const [selectValue, handleSelectEnter]= useSelecterEnter(sessionData?sessionData:{univ_code:getChosseUnivCode(),enter_type:null});
    
    // let playerData = usePlayerData();
    const isFinial = () =>{
      requireData.map(dataName =>{

      })
      if(selectValue!==null&&typeof selectValue.pay_method==="string"){
      }
      return false;
    }

    const priceUnit = "KRW"; 
    // if(playerData !== undefined){
    //   const statusId = sessionStorage.getItem("user_status_id");
    //   playerData = playerData.userstatus.find(status=>status.id === Number.parseInt(statusId));

      return (
        <DefaultLayout>
          {loading && (
            <LoadingPopup>
              <Loading />
            </LoadingPopup>
          )}          
          <Header background="light" position="relative" />
          <StepHeader step={3} major={selectValue?typeof selectValue.major==="string"?selectValue.major:null:null} plan={selectValue?typeof selectValue.plan==="string"?selectValue.plan:null:null}/>
          <Block>
            <Bold22>{t('create-person-information')}</Bold22>
            <SmallNotice>*{t('display-items-must-be-entered')}</SmallNotice>
            <Form onSubmit={handleSubmit}>
              <Table>
                <Row>
                  <HeaderColumn>{t('name-korean')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={4}><Input placeholder={t('enter-the-name')} name="kor_first_name" onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                  <HeaderColumn>{t('last-name-korean')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={4}><Input placeholder={t('enter-last-name')} name="kor_last_name" onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                </Row>
                <Row>
                  <RequireHeaderColumn>{t('name-english')}</RequireHeaderColumn>
                  <TopBottomNonPaddingColumn width={4}><Input placeholder={t('enter-the-name')} name="eng_first_name" onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                  <RequireHeaderColumn>{t('last-name-english')}</RequireHeaderColumn>
                  <TopBottomNonPaddingColumn width={4}><Input placeholder={t('enter-last-name')} name="eng_last_name" onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                </Row>
                <Row>
                  <RequireHeaderColumn>{t('sex')}</RequireHeaderColumn>
                  <FlexColumn width={12} >
                    <RadioCheckbox id="sex_women" group="sex" value="FEMAIL" onChange={handleFormContent}>{t('women')}</RadioCheckbox>
                    <RadioCheckbox id="sex_men" group="sex" value="MAIL" onChange={handleFormContent}>{t('men')}</RadioCheckbox>
                  </FlexColumn>
                </Row>
                <Row>
                  <RequireHeaderColumn>{t('date-birth')}</RequireHeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input name="birth_date" type="number" placeholder={`${t('enter-date-birth')} (ex.20001010)`}  onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                </Row>
                <Row>
                  <RequireHeaderColumn>{t('passport-number')}</RequireHeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input name="passport_no" placeholder={t('enter-passpor-number')} onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                </Row>
                <Row>
                  <RequireHeaderColumn>{t('nationality')}</RequireHeaderColumn>
                  <Column width={6}>
                      <Select
                        placeholder={t('choice-nation')}
                        options={countryArray(ArrayT.t)}
                        name="nationality"
                        handleFormContent={handleFormContent}
                      />
                  </Column>
                </Row>    
                <Row>
                  <RequireHeaderColumn>{t('language-grade')}</RequireHeaderColumn>
                  <Column width={6}>
                    <Select
                      placeholder={t('choice-topik-level')}
                      options={topikArray(ArrayT.t)}
                      name="topik_level"
                      handleFormContent={handleFormContent}
                    />
                  </Column>
                </Row>   
                <Row>
                  <RequireHeaderColumn>{t('staying-in-korea')}</RequireHeaderColumn>
                  <FlexColumn width={12} >
                    <RadioCheckbox id="stay_yes" group="is_visited_korea" value="true" onChange={handleFormContent}>{t('yes')}</RadioCheckbox>
                    <RadioCheckbox id="stay_no" group="is_visited_korea" value="false" onChange={handleFormContent}>{t('no')}</RadioCheckbox>
                  </FlexColumn>
                </Row>
                <Row>
                  <RequireHeaderColumn>{t('certificate-residence-card-issued')}</RequireHeaderColumn>
                  <FlexColumn width={12} >
                    <RadioCheckbox id="issue_yes" group="have_residence_license" value="true" onChange={handleFormContent}>{t('yes')}</RadioCheckbox>
                    <RadioCheckbox id="issue_no" group="have_residence_license" value="false" onChange={handleFormContent}>{t('no')}</RadioCheckbox>
                  </FlexColumn>
                </Row>  
                <Row>
                  <HeaderColumn>{t('residence-card-number')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input name="residence_no" placeholder={t('enter-residence-card-number')} onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                </Row>   
                <Row>
                  <HeaderColumn>{t('email')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input name="email" placeholder={t('enter-contactable-email')} onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                </Row>  
                <Row>
                  <HeaderColumn>{t('home-address')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input name="home_address" placeholder={t('enter-home-address')} onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                </Row>  
                <Row>
                  <HeaderColumn>{t('contact-phone-number')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input name="phone_no" placeholder={t('enter-contact-phone-number')} onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                </Row>     
                <Row readonly={true}>
                  <HeaderColumn>{t('family-relations')}</HeaderColumn>
                  <Column width={6}><Bold16>{t('father')}</Bold16></Column>
                  <Column width={6}><Bold16>{t('mother')}</Bold16></Column>
                </Row> 
                <Row>
                  <HeaderColumn>{t('full-name')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={6}><Input name="father_name" placeholder={t('enter-full-name')} onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                  <TopBottomNonPaddingColumn width={6}><Input name="mother_name" placeholder={t('enter-full-name')} onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                </Row>
                <Row>
                  <HeaderColumn>{t('nationality')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={6}><Input name="father_nationality" placeholder={t('enter-nationality')} onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                  <TopBottomNonPaddingColumn width={6}><Input name="mother_nationality" placeholder={t('enter-nationality')} onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                </Row>
                <Row>
                  <HeaderColumn>{t('cell-phone')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={6}><Input name="father_phone_no"  placeholder={t('enter-phone-number')} onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                  <TopBottomNonPaddingColumn width={6}><Input name="mother_phone_no"  placeholder={t('enter-phone-number')} onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                </Row>
                <Row>
                  <HeaderColumn>{t('job')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={6}><Input name="father_job"  placeholder={t('enter-job')} onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                  <TopBottomNonPaddingColumn width={6}><Input name="mother_job"  placeholder={t('enter-job')} onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                </Row>
                <Row readonly={true}>
                  <HeaderColumn>{t('final-educational-background')}</HeaderColumn>
                </Row> 
                <Row>
                  <RequireHeaderColumn>{t('high-school-name')}</RequireHeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input name="high_school_name" placeholder={t('enter-high-school-name')} onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                </Row>   
                <Row>
                  <HeaderColumn>{t('high-school-address')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input name="high_school_address" placeholder={t('enter-high-school-address')} onChange={handleFormContent}/></TopBottomNonPaddingColumn>
                </Row>   
              </Table>
            </Form>
          </Block>
          <FooterBlock>
          {true?//playerData?
            <FooterNoticeContainer>
                입력하신 인적 정보를 확인하고 있습니다.<br/>
                확인이 끝난 후, 다음 단계 작성이 가능합니다.<br/>
            </FooterNoticeContainer>
          :<>
            <ReadyButton isReady={true} onClick={(e)=>onSave(t)}>{t('save')}</ReadyButton>
            <ReadyButton isReady={isFinial()} onClick={(e)=>onClickNextStep(isFinial(),selectValue, t)}>{t('next-step')}</ReadyButton>
          </>}
          </FooterBlock>
          {false?
          <Block>
            <Table>
              <Row>
                <HeaderColumn>{t('cause-return')}</HeaderColumn>
                <WarningColumn width={12}>
                  <CauseReturnContainer>
                    정확한 고등학교 이름을 입력해 주세요. 현재 입력하신 고등학교 이름은 유효하지 않습니다.<br/>
                     입력하신 외국인 등록 번호를 확인해주세요.<br/>
                    거주하고 계신 집주소를 자세하게 다시 입력해주세요.<br/>
                    </CauseReturnContainer>
                </WarningColumn>
              </Row>
            </Table>
          </Block>
          :null}
        </DefaultLayout>
      );
    }
//   }
  return <DefaultLayout></DefaultLayout>
};

export default withRouter(SolutionInfoPage);