import React, {useState, useReducer} from 'react';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '@assets/i18n/solutionPage.json';
import { GetServerSideProps, NextPage } from 'next';
import Header from '@components/Shared/Header/Header';
import StepHeader, {useSelecterEnter} from '@components/SolutionPage/StepHeader/StepHeader';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import Alarm from '@components/SolutionPage/DocumentAlarm/Alarm';
import Dropdown from '@components/SolutionPage/DocumentDropdown/Dropdown';
import HelpTip from '@components/SolutionPage/DocumentHelpTip/HelpTip';
import Checkbox from '@components/SolutionPage/BigCheckbox/BigCheckbox';
import LineParser from '@components/SolutionPage/LineParser/LineParser';

import {
  TopNonBlock,
  Block,
  FooterBlock,
  ReadyButton,
  StringDot,
  BoldText,
  FooterNoticeContainer,
  TextContainer
} from '@components/SolutionPage/Common/Common.style';
import {
  HelpImage
} from '@views/SolutionPage/SolutionFinishPage/SolutionFinishPage.style';
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

const SolutionFinishPage: NextPage = ({
  router: {
    query: { lang: queryLang },
  },
})  => {
  const { t, lang, changeLang } = useTranslate(i18nResource);
  const [readOnly, setReadOnly] =  React.useState<boolean>(false);
  const [isConfirm, setConfirm] = React.useState<boolean>(false);
  
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
            // }else 
            if(user.step === STEP_STRING.STEP_FIVE_PENDING||user.step === STEP_STRING.STEP_SIX){
              setReadOnly(true);
              setConfirm(true);
              // Router.push(`/solution/5${queryLang?`?lang=${queryLang}`:''}`)
            }
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
      changeLang(queryLang);
    }
  }, [queryLang]);

  const usePlayerDoucmentData = async ()=>{
    let data = await API.getPlayerDocument();
    return Array.isArray(data)?data[0]:data;
  }

  const [loading, resolved, error] = usePromise(usePlayerDoucmentData, []);
  if (loading) return <div></div>; 
  if (error) window.alert('API 오류');
  if (!resolved) return null;
  const documentData =resolved.userdocument; 
  console.log(resolved);

  if(typeof window !== "undefined"){    
    const isFinal = () =>{
      return isConfirm;
    }

    const onClickNextStep=(isFinal:boolean,t)=>{
      if(isFinal){
        if(window.confirm(t('do-you-complete-process'))){
          const sid = sessionStorage.getItem('sid');
          const key = `/?action=user_check_solution_end&params={}&sid=${sid}`;
          API.sendPlayerInfo(key).then(
            data=>{
              console.log(data)
              if(data.status==='success'){
                location.reload();
                // Router.push(`/solution/5${queryLang?`?lang=${queryLang}`:''}`)
              }
            }
          )
          .catch(err=>console.log(err))
        }
      }else{
        return window.alert(t('please-agree-submit-document'));
      }
    }

    if(documentData!==undefined){
      return (
        <DefaultLayout>
          <Header t={t} lang={lang} changeLang={changeLang} background="light" position="relative" />
          <StepHeader step={5} t={t} lang={lang} changeLang={changeLang}/>
          <TopNonBlock>
            <Table>
              <HeaderRow>
                <Column width={6}>{t('document-name')}</Column>
                <Column width={2}><LineParser str={t('document-guide')} textAlign='center'/></Column>
                <Column width={3}><LineParser str={t('last-progress-date')} textAlign='center'/></Column>
                <Column width={3.4}>{t('document-status')}</Column>
                <Column width={0.6}></Column>
              </HeaderRow>
              {/* 서류명칭 받아서 죽 생성시킬것 */}
              {documentData?.map((data, index)=>(
                <Row key={data.document_id+index} alarm={data.alarm!==null&&data.alarm}>
                  <FlexColumn width={6}><StringDot>{data.document}</StringDot>{data.alarm!==null&&data.alarm?<Alarm alarm={data.admin_reason}/>:null}</FlexColumn>
                  <Column width={2}><HelpTip url={data.help_file} t={t} lang={queryLang}/></Column>
                  <Column width={3}><TextContainer margingLeft={queryLang==="vn"?20:0}>{getDateFormat(data.update_datetime)}</TextContainer></Column>
                  <Column width={3.4} oneLine={true}><LineParser str={t(data.status)}/></Column>
                  <Column width={0.6}><Dropdown userdocument={data} t={t} lang={queryLang}/></Column>
                </Row>
              ))}
            </Table>
            <Checkbox id="isConfirm" checked={isConfirm} onChange={()=>setConfirm(true)}>{t('confirmed-all-documents')}</Checkbox>
          </TopNonBlock>
            {readOnly
            ?<Block>
              <FooterNoticeContainer>
                <BoldText>{t('completed-application-admission')}</BoldText>
                <BoldText>{t('after-schedules-carried-out')}</BoldText>
              </FooterNoticeContainer>
            </Block>
          
            :<FooterBlock>
              <ReadyButton type="button" isReady={isFinal()} onClick={(e)=>onClickNextStep(isFinal(),t)}>{t('progress-completed')}</ReadyButton>
            </FooterBlock>}
          
        </DefaultLayout>
      );
    }
    }
  return <DefaultLayout></DefaultLayout>
};

export default withRouter(SolutionFinishPage);