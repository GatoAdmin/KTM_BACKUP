import React, {useState, useReducer} from 'react';
import axios from 'axios';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '@assets/i18n/solutionPage.json';
import i18nArrayResource from '@assets/i18n/registerPage.json';
import LineParser from '@components/SolutionPage/LineParser/LineParser';
import { GetServerSideProps, NextPage } from 'next';
import Header from '@components/Shared/Header/Header';
import StepHeader, {useSelecterEnter} from '@components/SolutionPage/StepHeader/StepHeader';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import Alarm from '@components/SolutionPage/DocumentAlarm/Alarm';
import Dropdown from '@components/SolutionPage/DocumentDropdown/Dropdown';
import HelpTip from '@components/SolutionPage/DocumentHelpTip/HelpTip';
import {
  TopNonBlock,
  Block,
  FooterBlock,
  ReadyButton,
  StringDot,
  TextContainer
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
} from '@components/SolutionPage/Table/Table.style';
import RequireHeaderColumn from '@components/SolutionPage/Table/RequireHeaderColumn';
import  Router,{withRouter} from 'next/router';

const getChosseUnivCode =()=>{
    let data = null;
    if(typeof window !=="undefined"){
      data = sessionStorage.getItem('chooseUnivCode');
    }
    return data;
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
    API.getPlayerStatus()
    .then((data)=>{
      if (data.status !== 'success') {
        console.log(data);
      } else { 
          const univ_code = getChosseUnivCode();
          console.log(univ_code)
          if(data.userstatus_list.some(us=>us.univ_code === univ_code)){
            const user = data.userstatus_list.find(us=>us.univ_code === univ_code);
            if(typeof window !== "undefined"){
              sessionStorage.setItem('chooseUnivCode',user.univ_code);
              sessionStorage.setItem('chooseUnivName',user.univ_name);
              sessionStorage.setItem('chooseSubjectname',user.subjectname);
              sessionStorage.setItem('choosePayRank',user.pay_rank);
              sessionStorage.setItem('chooseUnivInfoType',user.info_type);
            }
            // if(user.step === STEP_STRING.STEP_TWO){
            //   if(user.pay_rank===null){
            //     Router.push(`/solution/2${queryLang?`?lang=${queryLang}`:''}`)
            //   }
            //   else if(user.pay_status==="READY"){
            //     Router.push(`/solution/2/paymentWating${queryLang?`?lang=${queryLang}`:''}`)
            //   }
            //   else{
            //     Router.push(`/solution/2/payment${queryLang?`?lang=${queryLang}`:''}`)
            //   }
            // }else if(user.step === STEP_STRING.STEP_TWO_PENDING){
            //   Router.push(`/solution/2/paymentWating${queryLang?`?lang=${queryLang}`:''}`)
            // }else if(user.step === STEP_STRING.STEP_THREE_INIT||user.step === STEP_STRING.STEP_THREE_PENDING){
            //   Router.push(`/solution/3${queryLang?`?lang=${queryLang}`:''}`)
            // }else if(user.step === STEP_STRING.STEP_FOUR){
            //   Router.push(`/solution/4${queryLang?`?lang=${queryLang}`:''}`)
            // }else if(user.step === STEP_STRING.STEP_FIVE||user.step === STEP_STRING.STEP_SIX){
            //   Router.push(`/solution/5${queryLang?`?lang=${queryLang}`:''}`)
            // }
          }else{
            sessionStorage.setItem('chooseUnivCode', univ_code);
          }
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

  const usePlayerDoucmentData = async ()=>{
    let data = await API.getPlayerDocument();
    return Array.isArray(data)?data[0]:data;
  }

  if(typeof window !== "undefined"){
    const [loading, resolved, error] = usePromise(usePlayerDoucmentData, []);
    if (loading) return <div></div>; 
    if (error) window.alert('API 오류');
    if (!resolved) return null;
    const documentData =resolved.userdocument; 
    console.log(resolved)
    
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

    const onClickNextStep=(isFinal:boolean)=>{
      if(isFinal){
        const sid = sessionStorage.getItem('sid');
        const key = `/?action=user_check_document_end&params={}&sid=${sid}`;
        API.sendPlayerInfo(key).then(
          data=>{
            console.log(data)
            if(data.status==='success'){
              Router.push(`/solution/5${queryLang?`?lang=${queryLang}`:''}`)
            }
          }
        )
        .catch(err=>console.log(err))
      }else{
        return window.alert(t('all-document-status-should-be-ready'));
      }
    }
    let testData = {
      admin_reason: "베트남어도 제대로 되는지 테스트입니다. <br> Tiếng Việt cũng Viết được. Xem được. ",
      alarm: null,
      document: "외국인 등록증",
      document_id: "115",
      document_type: "업로드서류",
      help_file: "https://katumm-bucket-seoul.s3.ap-northeast-2.amazonaws.com/media/32/SMU_UNI/115/helpfile.jpg",
      id: 334,
      info_type: "4년제",
      is_essential: false,
      refund_type: 1,
      status: "DOC_UPLOAD_REQUEST",
      status_id: 40,
      subjecttitle: "인문",
      univ_code: "SMU_UNI",
      update_datetime: "2021-03-03T15:52:17",
      url: "https://katumm-bucket-seoul.s3.ap-northeast-2.amazonaws.com/media/32/SMU_UNI/115/샘플 파일.docx",
      user_id: 32,
      user_reason: null
    };
    if(documentData!==undefined){
      return (
        <DefaultLayout>
          <Header t={t}  lang={lang} changeLang={changeLang} background="light" position="relative" />
          <StepHeader step={4} t={t} lang={lang} changeLang={changeLang}/>
          <HelpImage lang={queryLang}/>
          <TopNonBlock>
            <Table>
              <HeaderRow>
                <Column width={6}>{t('document-name')}</Column>
                <Column width={2}><LineParser str={t('document-guide')} textAlign='center'/></Column>
                <Column width={3}><LineParser str={t('last-progress-date')} textAlign='center'/></Column>
                <Column width={3.4}>{t('document-status')}</Column>
                <Column width={0.6}></Column>
              </HeaderRow>
              {/* 테스트 */}
                {/* <Row>
                  <FlexColumn width={6}><StringDot>{testData.document}</StringDot>{testData.admin_reason!==''?<Alarm alarm={testData.admin_reason}/>:null}</FlexColumn>
                  <Column width={2}><HelpTip url={testData.help_file} t={t} lang={queryLang}/></Column>
                  <Column width={3}><TextContainer margingLeft={queryLang==="vn"?20:0}>{getDateFormat(testData.update_datetime)}</TextContainer></Column>
                  <Column width={3.4} oneLine={true}><LineParser str={t(testData.status)}/></Column>
                  <Column width={0.6}><Dropdown userdocument={testData} t={t} lang={queryLang}/></Column>
                </Row> */}
              {documentData?.map((data, index)=>(
                <Row key={data.document_id+index} alarm={data.admin_reason!==''}>
                  <FlexColumn width={6}><StringDot>{data.document}</StringDot>{data.admin_reason!==''?<Alarm alarm={data.admin_reason}/>:null}</FlexColumn>
                  <Column width={2}><HelpTip url={data.help_file} t={t} lang={queryLang}/></Column>
                  <Column width={3}><TextContainer margingLeft={queryLang==="vn"?20:0}>{getDateFormat(data.update_datetime)}</TextContainer></Column>
                  <Column width={3.4} oneLine={true}><LineParser str={t(data.status)}/></Column>
                  <Column width={0.6}><Dropdown userdocument={data} t={t} lang={queryLang}/></Column>
                </Row>
              ))}
            </Table>
          </TopNonBlock>
          <FooterBlock>
            <ReadyButton type="button" isReady={isFinal()} onClick={(e)=>onClickNextStep(isFinal())}>{t('next-step')}</ReadyButton>
          </FooterBlock>
        </DefaultLayout>
      );
    }
    }
  return <DefaultLayout></DefaultLayout>
};

export default withRouter(SolutionDocumentPage);