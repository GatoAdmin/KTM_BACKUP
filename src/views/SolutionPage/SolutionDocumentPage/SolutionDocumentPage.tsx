import React, {useState, useReducer} from 'react';
import axios from 'axios';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '@assets/i18n/SolutionPage/solutionDocumentPage.json';
import i18nArrayResource from '@assets/i18n/registerPage.json';
import Dummy from '@components/SolutionPage/dummy.json';
import { GetServerSideProps, NextPage } from 'next';
import { useSWRInfinite, responseInterface } from 'swr';
import Header from '@components/Shared/Header/Header';
import StepHeader, {useSelecterEnter} from '@components/SolutionPage/StepHeader/StepHeader';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import RadioCheckbox from '@components/SolutionPage/RadioCheckbox/RadioCheckbox';
import Dropdown from '@components/SolutionPage/DocumentDropdown/Dropdown';
import ReadyRadioButton from '@components/SolutionPage/ReadyRadioButton/ReadyRadioButton';
import { Loading, LoadingPopup } from '@views/UserPage/LoginPage/LoginPage.style';
import {
  TopNonBlock,
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
  HelpImage
} from '@views/SolutionPage/SolutionDocumentPage/SolutionDocumentPage.style';
import {STEP_STRING} from '@components/SolutionPage/StepString';

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

const onClickNextStep=(isFinal:boolean, selectValue, t)=>{//, afterFuntion:void
  if(isFinal){
    if(window.confirm(t('completed-information-entry'))){
      // afterFuntion;
    }
  }else{
    return window.alert(t('all-document-status-should-be-ready'));
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
        sessionData = JSON.parse(sessionData);
        sessionData.univ_code = sessionStorage.getItem('chooseUniv');
        sessionData.univ_name = sessionStorage.getItem('chooseUnivName');
        sessionData.major = sessionStorage.getItem('chooseSubjectname');
        sessionData.plan = sessionStorage.getItem('choosePayRank');
      }else{
        sessionData = null;
      }
      if(univ_code &&sessionData&& univ_code===sessionData.univ_code){
        data = sessionData;
      }
    }
    return data;
  }

// const fetchPlayerDocumentInfo = (url: string) => axios.get(url,{withCredentials : true})
//   .then((res) => {
//   let {
//     userdocument
//   }: {
//     userdocument: Array<{
//       id: number;
//       user_id: number;
//       univ_code: string;
//       info_type: string;
//       subjecttitle: string;
//       status: string;
//       refund_type: string;
//       document_type: string;
//       document_id: string;
//       document:string;
//       url: string;
//       help_file: string;
//       reason: string;
//       status_id: string;
//       language_skill: string;
//       residence_no: string;
//       alarm:string;
//       }>
//     }  = res.data;
    
//     return {userdocument: userdocument};
//   });
const fetchPlayerDocumentInfo = () => {
  let {
    userdocument
  }: {
    userdocument: Array<{
      id: number;
      user_id: number;
      univ_code: string;
      info_type: string;
      subjecttitle: string;
      status: string;
      refund_type: string;
      document_type: string;
      document_id: string;
      document:string;
      url: string;
      help_file: string;
      reason: string;
      status_id: string;
      language_skill: string;
      residence_no: string;
      alarm:string;
      }>
    }  = Dummy;//res.data;
    
    return {userdocument: userdocument};
  }
const usePlayerDoucmentData = ()=>{
  let sid = ""; 
  if(typeof window !== "undefined"){
    sid = window.sessionStorage.getItem('sid');
  }
  const getKey = () => `/api/?action=get_user_info&params=${JSON.stringify({})}&sid=${sid}`;
  // let { data } = useSWRInfinite(
  //   getKey,
  //   (url) => fetchPlayerDocumentInfo(url)
  // );
  let data = fetchPlayerDocumentInfo();
  return Array.isArray(data)?data[0]:data;
}

const SolutionDocumentPage: NextPage = ({
  router: {
    query: { lang: queryLang },
  },
})  => {
  if(typeof window !== "undefined"){
    const ArrayT = useTranslate(i18nArrayResource);
    const { t, lang, changeLang } = useTranslate(i18nResource);
    
    const documentData = usePlayerDoucmentData().userdocument;
    console.log(documentData);
    // React.useEffect(() => {
    //   setLoading(true);
    //   if (typeof documentData === 'undefined') return;   
    //   // const tempData = Object.assign(formData, playerData.userinfo);
    //   // setFormData(tempData);
    //   setLoading(false);
    // }, [documentData]);
    
    React.useEffect(() => {
      let sid = ""; 
      if(typeof window !== "undefined"){
        sid = window.sessionStorage.getItem('sid');
      }
      const univcode = getChosseUnivCode();
      axios.get(`/api/?action=get_player_status&params=${JSON.stringify({})}&sid=${sid}`,{withCredentials:true})
      .then((res) => {
        const {
          data: { status, userstatus },
        } = res;
        if (status !== 'success') {
          setErrMsg((prev) => ({ ...prev, [status]: true }));
        } else {
          console.log(userstatus);
          const user = userstatus.find(us=>us.univ_code === univcode);
            if(user.step === STEP_STRING.STEP_THREE_PENDING){
              // setReadOnly(true);
            }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);
    
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
    const isFinal = () =>{
     //모든 서류의 서류 상태가 ‘준비 완료’ 상태가 되어야 버튼이 활성화 됨
      return false;
    }
      return (
        <DefaultLayout>
          {loading && (
            <LoadingPopup>
              <Loading />
            </LoadingPopup>
          )}          
          <Header background="light" position="relative" />
          <StepHeader step={4} major={selectValue?typeof selectValue.major==="string"?selectValue.major:null:null} plan={selectValue?typeof selectValue.plan==="string"?selectValue.plan:null:null}/>
          <HelpImage lang={queryLang}/>
          <TopNonBlock>
            <Table>
              <HeaderRow>
                <Column width={6}>{t('document-name')}</Column>
                <Column width={3}>{t('document-guide')}</Column>
                <Column width={3}>{t('last-progress-date')}</Column>
                <Column width={3}>{t('document-status')}</Column>
                <Column width={1}></Column>
              </HeaderRow>
              {/* 서류명칭 받아서 죽 생성시킬것 */}
              
              <Row>
                  <Column width={6}>테스트</Column>
                  <Column width={3}>{t('view')}</Column>
                  <Column width={3}>2020.01.10</Column>
                  <Column width={3}>{t('DOC_CHECK_REQUEST')}</Column>
                  <Column width={1}><Dropdown type={'번역 공증 영사'} status={'DOC_CHECK_REQUEST'}/></Column>
                </Row>
              {documentData?.map(data=>(
                <Row>
                  <Column width={6}>{data.document}</Column>
                  <Column width={3}>{t('view')}</Column>
                  <Column width={3}></Column>
                  <Column width={3}>{t(data.status)}</Column>
                  <Column width={1}><Dropdown type={data.document_type} status={data.status}/></Column>
                </Row>
              ))}
            </Table>
          </TopNonBlock>
          <FooterBlock>
            <ReadyButton type="button" isReady={isFinal()} onClick={(e)=>onClickNextStep(isFinal(),selectValue, t)}>{t('next-step')}</ReadyButton>
          </FooterBlock>
        </DefaultLayout>
      );
    }
  return <DefaultLayout></DefaultLayout>
};

export default withRouter(SolutionDocumentPage);