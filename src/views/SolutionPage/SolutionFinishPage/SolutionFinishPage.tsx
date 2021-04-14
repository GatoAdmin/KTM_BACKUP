import React, {useState} from 'react';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '@assets/i18n/solutionPage.json';
import { Loading, LoadingPopup } from '@views/UserPage/LoginPage/LoginPage.style';
import { GetServerSideProps, NextPage } from 'next';
import Header from '@components/Shared/Header/Header';
import StepHeader from '@components/SolutionPage/StepHeader/StepHeader';
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
import {STEP_STRING} from '@components/SolutionPage/StepString';

import {
  Table,
  Row,
  Column,
  FlexColumn,
  HeaderRow
} from '@components/SolutionPage/Table/Table.style';
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
        console.error(data.status);
      } else { 
          const univ_code = getChosseUnivCode();
          const user = data.userstatus_list.find(us=>us.univ_code === univ_code);
          if(user!==null && typeof user!=="undefined"){
            if(typeof window !== "undefined"){
              sessionStorage.setItem('userStatusId',user.id);
              sessionStorage.setItem('chooseUnivCode',user.univ_code);
              sessionStorage.setItem('chooseUnivName',user.univ_name);
              sessionStorage.setItem('chooseSubjectname',user.subjectname);
              sessionStorage.setItem('choosePayRank',user.pay_rank);
              sessionStorage.setItem('chooseUnivInfoType',user.info_type);
            }
            if(user.step === STEP_STRING.STEP_FIVE_PENDING||user.step === STEP_STRING.STEP_SIX){
              setReadOnly(true);
              setConfirm(true);
            }else if(user.step !== STEP_STRING.STEP_FIVE){
              Router.push(`/solution${queryLang?`?lang=${queryLang}`:''}`)
            }
          }else {
            Router.push(`/solution${queryLang?`?lang=${queryLang}`:''}`)
          }
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);
  
  React.useEffect(() => {
    if (queryLang !== undefined) {
      changeLang(queryLang);
    }
  }, [queryLang]);

  const usePlayerDoucmentData = async ()=>{
    let data = await API.getPlayerDocument(lang);
    return Array.isArray(data)?data[0]:data;
  }

  const [loading, resolved, error] = usePromise(usePlayerDoucmentData, [lang]);
  if (loading) return <DefaultLayout><LoadingPopup><Loading /></LoadingPopup></DefaultLayout>; 
  if (error) location.reload();
  if (!resolved) return null;
  const documentData =resolved.userdocument; 

  if(typeof window !== "undefined"){    
    const isFinal = () =>{
      return isConfirm;
    }

    const onClickNextStep=(isFinal:boolean)=>{
      if(isFinal){
        if(window.confirm(t('do-you-complete-process'))){
          const sid = sessionStorage.getItem('sid');
          const status_id = sessionStorage.getItem('userStatusId');
          const key = `/?action=user_check_solution_end&params=${JSON.stringify({status_id:status_id})}&sid=${sid}`;
          API.sendPlayerInfo(key).then(
            data=>{
              if(data.status==='success'){
                location.reload();
              }else{
                console.error(data.status)
              }
            }
          )
          .catch(err=>console.error(err))
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
              {documentData?.map((data, index)=>(
                <Row key={data.document_id+index} alarm={data.admin_reason!==''}>
                <FlexColumn width={6}><StringDot>{data.document}</StringDot>{data.admin_reason!==''?<Alarm alarm={data.admin_reason}/>:null}</FlexColumn>
                <Column width={2}><HelpTip url={data.help_file} t={t} lang={lang}/></Column>
                <Column width={3}><TextContainer margingLeft={lang==="vn"?20:0}>{getDateFormat(data.update_datetime)}</TextContainer></Column>
                <Column width={3.4} oneLine={true}><LineParser str={t(data.status)}/></Column>
                <Column width={0.6}><Dropdown userdocument={data} t={t} lang={lang}/></Column>
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
              <ReadyButton type="button" isReady={isFinal()} onClick={(e)=>onClickNextStep(isFinal())}>{t('progress-completed')}</ReadyButton>
            </FooterBlock>}
          
        </DefaultLayout>
      );
    }
    }
  return <DefaultLayout></DefaultLayout>
};

export default withRouter(SolutionFinishPage);