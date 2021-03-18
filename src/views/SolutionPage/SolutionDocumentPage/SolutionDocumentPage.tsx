import React, {useState, useReducer} from 'react';
import axios from 'axios';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '@assets/i18n/solutionPage.json';
import i18nArrayResource from '@assets/i18n/registerPage.json';
import Dummy from '@components/SolutionPage/dummy.json';
import { GetServerSideProps, NextPage } from 'next';
import { useSWRInfinite, responseInterface } from 'swr';
import Header from '@components/Shared/Header/Header';
import StepHeader, {useSelecterEnter} from '@components/SolutionPage/StepHeader/StepHeader';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import Alarm from '@components/SolutionPage/DocumentAlarm/Alarm';
import Dropdown from '@components/SolutionPage/DocumentDropdown/Dropdown';
import HelpTip from '@components/SolutionPage/DocumentHelpTip/HelpTip';
import { Loading, LoadingPopup } from '@views/UserPage/LoginPage/LoginPage.style';
import {
  TopNonBlock,
  Block,
  FooterBlock,
  ReadyButton,
  StringDot,
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
import  Router,{withRouter} from 'next/router';

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
    // if(window.confirm(t('completed-information-entry'))){
    //   // afterFuntion;
    // }
    Router.push('/solution/5');
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
//       admin_reason: string;
//       user_reason: string;
//       status_id: string;
//       language_skill: string;
//       residence_no: string;
//       alarm:string;
//       }>
//     }  = res.data;
    
//     console.log(res.data)
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

const usePlayerDoucmentData = async ()=>{
  // let sid = ""; 
  // if(typeof window !== "undefined"){
  //   sid = window.sessionStorage.getItem('sid');
  // }
  // const getKey = () => `/api/?action=get_player_document&params=${JSON.stringify({})}&sid=${sid}`;
  // let { data } = useSWRInfinite(
  //   getKey,
  //   (url) => fetchPlayerDocumentInfo(url)
  // );
  let data = await API.getPlayerDocument();//fetchPlayerDocumentInfo();
  return Array.isArray(data)?data[0]:data;
}

const zeroFill=(data:string|number, length:number)=>{
  const lenConvertString = (str:string, len:number)=>{
    var s = '', i = 0; 
    while (i++ < len) { s += str; } 
    return s; 
  }
  if(typeof data ==="string"){
    return lenConvertString("0",length - data.length) + data; 
  }else{
    return lenConvertString("0",length - data.toString().length) + data.toString(); 
  }
}

const getDateFormat=(dateString: string)=>{
  if(dateString!==undefined){
    const date = new Date(dateString);
    return date.getFullYear()+"."+zeroFill((date.getMonth()+1),2)+"."+zeroFill(date.getDate(),2);
  }
  return "";
}
const SolutionDocumentPage: NextPage = ({
  router: {
    query: { lang: queryLang },
  },
})  => {
  const ArrayT = useTranslate(i18nArrayResource);
  const { t, lang, changeLang } = useTranslate(i18nResource);
  
  React.useEffect(() => {
    const univcode = getChosseUnivCode();
    API.getPlayerStatus()
    .then((data)=>{
      if (data.status !== 'success') {
        console.log(data);
      } else { 
          console.log(data.userstatus);
          // const user = userstatus.find(status=>status.id);univcode
          // const user = userstatus.find(us=>us.univ_code === univcode);
          const user = data.userstatus.sort(function(a,b){
            const atime = convertTime(a.updated_at);
            const btime = convertTime(b.updated_at);
            atime>btime?1:atime<btime?-1:0;
          })[0];//TODO: id 혹은 univcode를 선택하여 새로 접속한 경우 추가 조치 필요

          if(typeof window !== "undefined"){
            sessionStorage.setItem('chooseUnivCode',user.univ_code);
            sessionStorage.setItem('chooseUnivName',user.univ_name);
            sessionStorage.setItem('chooseUnivInfoType',user.info_type);
            user.subjectname?sessionStorage.setItem('chooseSubjectname',user.subjectname):null;
            user.pay_rank?sessionStorage.setItem('choosePayRank',user.pay_rank):null;
          }
          // if(user.step === STEP_STRING.STEP_TWO){
          //   Router.push("/solution/2")
          // }else if(user.step === STEP_STRING.STEP_THREE_INIT||STEP_STRING.STEP_THREE_PENDING){
          //   Router.push("/solution/3")
          // }else if(user.step === STEP_STRING.STEP_FOUR){
          //   Router.push("/solution/4")
          // }else if(user.step === STEP_STRING.STEP_FIVE||STEP_STRING.STEP_SIX){
          //   Router.push("/solution/5")
          // }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  
  React.useEffect(() => {
    if (queryLang !== undefined) {
      ArrayT.changeLang(queryLang);
      changeLang(queryLang);
    }
  }, [queryLang]);

  if(typeof window !== "undefined"){
    // const documentData = usePlayerDoucmentData().userdocument; 
    // React.useEffect(() => {
    //   setLoading(true);
    //   if (typeof documentData === 'undefined') return;   
    //   // const tempData = Object.assign(formData, playerData.userinfo);
    //   // setFormData(tempData);
    //   setLoading(false);
    // }, [documentData]);
    let sessionData = getSesstionData();
    const [selectValue, handleSelectEnter]= useSelecterEnter(sessionData?sessionData:{univ_code:getChosseUnivCode(),enter_type:null});
    
    
    const [loading, resolved, error] = usePromise(usePlayerDoucmentData, []);
    if (loading) return <div></div>; 
    if (error) window.alert('API 오류');
    if (!resolved) return null;
    const documentData =resolved.userdocument; 
    console.log(resolved)
  
    // let playerData = usePlayerData();
    const isFinal = () =>{
     //모든 서류의 서류 상태가 ‘준비 완료’ 상태가 되어야 버튼이 활성화 됨
      let isFinal = true;
      if(documentData!==undefined&&documentData.length>0){
        documentData.map(document=>{
          if(document.status!=='END'){
            isFinal = false; 
          }
        })
      }else{
        isFinal = false;
      }
      
      return isFinal;
    }
    if(documentData!==undefined){
      return (
        <DefaultLayout>
          {loading && (
            <LoadingPopup>
              <Loading />
            </LoadingPopup>
          )}          
          <Header t={t}  lang={lang} changeLang={changeLang} background="light" position="relative" />
          <StepHeader step={4} major_str={selectValue?selectValue.major_str:null} plan_str={selectValue?selectValue.plan_str:null} t={t} lang={lang} changeLang={changeLang} />
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
              {documentData?.map((data, index)=>(
                <Row key={data.document_id+index} alarm={data.alarm!==null?true:false}>
                  <FlexColumn width={6}><StringDot>{data.document}</StringDot>{data.alarm!==null?<Alarm alarm={data.alarm}/>:null}</FlexColumn>
                  <Column width={3}><HelpTip url={data.help_file}/></Column>
                  <Column width={3}>{getDateFormat(data.update_datetime)}</Column>
                  <Column width={3}>{t(data.status)}</Column>
                  <Column width={1}><Dropdown userdocument={data}/></Column>
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
    }
  return <DefaultLayout></DefaultLayout>
};

export default withRouter(SolutionDocumentPage);