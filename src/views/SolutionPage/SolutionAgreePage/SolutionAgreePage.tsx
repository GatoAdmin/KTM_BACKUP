import React, {useState} from 'react';
import axios from 'axios';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '@assets/i18n/solutionPage.json';
import { NextPage } from 'next';
import Router,{withRouter} from 'next/router';
import Header from '@components/Shared/Header/Header';
import StepHeader, {getSelectUnivInfo, useSelecterEnter} from '@components/SolutionPage/StepHeader/StepHeader';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import LabelClickCheckbox from '@components/SolutionPage/LabelClickCheckbox/LabelClickCheckbox';
import Agreement from '@components/SolutionPage/Agreement/Agreement';
import LineParser from '@components/SolutionPage/LineParser/LineParser';
import PriceInfoHeader from '@components/SolutionPage/PriceInfoHeader/PriceInfoHeader';
import ReadyRadioButton from '@components/SolutionPage/ReadyRadioButton/ReadyRadioButton';
import { Loading, LoadingPopup } from '@views/UserPage/LoginPage/LoginPage.style';
import {STEP_STRING} from '@components/SolutionPage/StepString';
import {
  Block,
  FooterBlock,
  ReadyButton,
  GreyText,
  Bold22,
  Bold18,
  UncheckedRadioIcon,
  CheckedRadioIcon
} from '@components/SolutionPage/Common/Common.style';
import {
  PriceInfoContainer,
  PriceInfoTableRow,
  PriceInfoTableColumn,
  PriceInfoTableHeaderRow,
  PriceInfoTableHeaderColumn,
  PriceInfoHeaderRow,
  PriceInfoHeaderColumn,
  PriceInfoFooterRow,
  PriceInfoFooterColumn
} from '@views/SolutionPage/SolutionAgreePage/SolutionAgreePage.style';

import {
  Table,
  Row,
  Column,
  HeaderRow,
} from '@components/SolutionPage/Table/Table.style';

interface service {
  name: string;
  type: string;
  price : number;
  strPrice: string;
  index: number;
}

const getChosseUnivCode =()=>{
    let data = null;
    if(typeof window !=="undefined"){
      data = sessionStorage.getItem('chooseUnivCode');
    }
    return data;
}

const convertPrice=(price:number)=>{
  return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const SolutionAgreePage: NextPage = ({
  router: {
    query: { lang: queryLang },
  },
}) => {

  const { t, lang, changeLang } = useTranslate(i18nResource);

  let services: Array<service> = [
    {
      name: t('translation-notarization-service'),
      type: "trans",
      price : 20000,
      strPrice:'',
      index: 1
    },
    {
      name: t('enter-support-service'),
      type: "support",
      price : 25000,
      strPrice:'',
      index: 2
    },
    {
      name: t('enter-support-pro'),
      type: "pro",
      price : 30000,
      strPrice:'',
      index: 3
    }
  ];
  
  const getSesstionData =()=>{
    let data = null;
    if(typeof window !=="undefined"){
      const univ_code = getChosseUnivCode();
      let sessionData = sessionStorage.getItem('select_enter_value');
      if(sessionData&&sessionData!==""){
        sessionData=JSON.parse(sessionData);
        sessionData.univ_code = sessionStorage.getItem('chooseUnivCode');
        sessionData.univ_name = sessionStorage.getItem('chooseUnivName');
        sessionData.major_str = sessionStorage.getItem('chooseSubjectname');
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
  React.useEffect(() => {
    if (queryLang !== undefined) {
      changeLang(queryLang);
    }
  }, [queryLang]);

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
            user.pay_rank?sessionStorage.setItem('choosePayRank',user.pay_rank):null;
          }
          if(user.step === STEP_STRING.STEP_TWO){
            if(user.pay_rank!==null||user.pay_status==="READY"){
              Router.push(`/solution${queryLang?`?lang=${queryLang}`:''}`)
            }
          }else {
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

  if(typeof window !== "undefined"){
    let sessionData = getSesstionData();
    const [selectValue, handleSelectEnter]= useSelecterEnter(sessionData?sessionData:{univ_code:getChosseUnivCode(),enter_type:"new_enter"});
    const [isAgree, setIsAgree]= useState(false);
    const [isOpenAgree, setIsOpenAgree]= useState(false);

    const usePriceData =async()=>{
      let data = await API.getPlayerPayrank();
      let modifyServices = services.map(service=>{
        service.price = data.pay_rank_dict[service.index];
        let price = convertPrice(service.price);
        service.strPrice = price;
        return service;
      });

      let application = data?data.apply_fee?data.apply_fee:0:0;
      return {services: modifyServices, application:application, unit:"KRW"};
    }
    
    const [loading, resolved, error] = usePromise(usePriceData, []);
    if (loading) return <DefaultLayout><LoadingPopup><Loading /></LoadingPopup></DefaultLayout>; 
    if (error) location.reload();
    if (!resolved) return null;
    const priceData = resolved;
    
    const isFinial = () =>{
      if(selectValue!==null&&typeof selectValue.plan_str==="string"&&isAgree){
          return true;
      }
      return false;
    }

    const onClickNextStep=(isFinial:boolean)=>{
      if(isFinial){
        sendPlayerInfo(selectValue.plan_str);
      }else{
        window.alert(t('warn-3'));
      }
    }
    
  const sendPlayerInfo = (plan:string) => {
    let sid = ""; 
    let statusId = "";
    if(typeof window !== "undefined"){
      sid = sessionStorage.getItem('sid');
      statusId = sessionStorage.getItem("userStatusId");
    }
    const rank = priceData.services.find(service=>service.type===plan)?.index;
    const parms = {
      status_id: statusId,
      rank: rank
    };
    const key =  `/?action=set_player_payrank&params=${JSON.stringify(parms)}&sid=${sid}`;
    API.sendPlayerInfo(key).then(
      data=>{
        if(data.status!=="success"){
          console.error(data.status);
        }else{
          Router.push(`/solution/2/payment${queryLang?`?lang=${queryLang}`:''}`)
        }
      }
    );
    return false;
  };

  const getPriceList = ()=>{
    const plan = priceData.services.find(service=>(service.type === selectValue.plan_str));
    const univName = sessionStorage.getItem("chooseUnivName");
    let resultPrice = plan?.price+(plan.type !== "trans"?priceData.application:0);
    resultPrice = convertPrice(resultPrice);
    return (
      <>
        <Row>
          <Column width={14}>{plan?.name}-{univName}</Column>
          <Column width={2} textAlign="right" fontSize={18}  oneLine={true}>{plan.strPrice} {priceData.unit}</Column>
        </Row>
        {plan.type !== "trans"
          ?<Row>
              <Column width={14}>{t('application-fee')}-{univName}</Column>
              <Column width={2} textAlign="right" fontSize={18}  oneLine={true}>{convertPrice(priceData.application)} {priceData.unit}</Column>
            </Row>
          :null}
        <Row accent={true}>
          <Column width={14}>{t('payment-amount-including-VAT')}</Column>
          <Column width={2} textAlign="right" fontSize={18} oneLine={true}>{resultPrice} {priceData.unit}</Column>
        </Row>
      </>
    ); 
  }
  
    return (
      <DefaultLayout>
        {isOpenAgree?<Agreement onClose={()=>setIsOpenAgree(false)}/>:null}
        <Header t={t} lang={lang} changeLang={changeLang} background="light" position="relative" />
        <StepHeader step={2} t={t} lang={lang} changeLang={changeLang}/>
        <PriceInfoContainer>
          <PriceInfoHeaderRow>
            <PriceInfoHeaderColumn><Bold22><LineParser str={t('please-selection-payrank')}/></Bold22></PriceInfoHeaderColumn>
            <PriceInfoHeaderColumn>
              <PriceInfoHeader backgroundColor="#FF988C">
                <LineParser str={t('translation-notarization-service-title')}/>
              </PriceInfoHeader>
            </PriceInfoHeaderColumn>
            <PriceInfoHeaderColumn>
              <PriceInfoHeader backgroundColor="#2EC5CE">
                <LineParser str={t('enter-support-service-title')}/>
              </PriceInfoHeader>
            </PriceInfoHeaderColumn>
            <PriceInfoHeaderColumn>
              <PriceInfoHeader backgroundColor="#8C30F5">
                <LineParser str={t('enter-support-pro-title')}/>
              </PriceInfoHeader>
            </PriceInfoHeaderColumn>
          </PriceInfoHeaderRow>
          <PriceInfoTableHeaderRow>
            <PriceInfoTableHeaderColumn>
              <Bold22><LineParser str={t('pricing-table')}/></Bold22>
            </PriceInfoTableHeaderColumn>
              {priceData
                ?priceData.services.map((service)=>(
                  <PriceInfoTableHeaderColumn key={service.name}>
                    <Bold22>{service.strPrice}<br/><GreyText>{priceData.unit}</GreyText></Bold22>
                  </PriceInfoTableHeaderColumn>
                )):
                (<>
                <PriceInfoTableHeaderColumn>
                  <Bold22>10,000<br/><GreyText>KRW</GreyText></Bold22>
                </PriceInfoTableHeaderColumn>
                <PriceInfoTableHeaderColumn>
                  <Bold22>15,000<br/><GreyText>KRW</GreyText></Bold22>
                </PriceInfoTableHeaderColumn>
                <PriceInfoTableHeaderColumn>
                  <Bold22>20,000<br/><GreyText>KRW</GreyText></Bold22>
                </PriceInfoTableHeaderColumn>
                </>)}
          </PriceInfoTableHeaderRow>
          <PriceInfoTableRow>
            <PriceInfoTableColumn>
              <Bold18>{t('one-on-one-consulting')}</Bold18>
            </PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
          </PriceInfoTableRow>
          <PriceInfoTableRow>
            <PriceInfoTableColumn>
              <Bold18>{t('document-translation-and-notarization')}</Bold18>
            </PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
          </PriceInfoTableRow>
          <PriceInfoTableRow>
            <PriceInfoTableColumn>
              <Bold18>{t('self-introduction-correction')}</Bold18>
            </PriceInfoTableColumn>
            <PriceInfoTableColumn><UncheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
          </PriceInfoTableRow>
          <PriceInfoTableRow>
            <PriceInfoTableColumn>
              <Bold18>{t('preparing-documents-and-accepting-applications')}</Bold18>
            </PriceInfoTableColumn>
            <PriceInfoTableColumn><UncheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
          </PriceInfoTableRow>
          <PriceInfoTableRow>
            <PriceInfoTableColumn>
              <Bold18>{t('acting-submission-agent')}</Bold18>
            </PriceInfoTableColumn>
            <PriceInfoTableColumn><UncheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
          </PriceInfoTableRow>
          <PriceInfoTableRow>
            <PriceInfoTableColumn>
              <Bold18>{t('acting-consul-confirmation')}</Bold18>
            </PriceInfoTableColumn>
            <PriceInfoTableColumn><UncheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><UncheckedRadioIcon/></PriceInfoTableColumn>
            <PriceInfoTableColumn><CheckedRadioIcon/></PriceInfoTableColumn>
          </PriceInfoTableRow>
          <PriceInfoFooterRow>
            <PriceInfoFooterColumn></PriceInfoFooterColumn>
            <PriceInfoFooterColumn>
              <ReadyRadioButton id="is_select_trans" value="trans" group="plan_str" checked={selectValue?.plan_str==="trans"} onChange={handleSelectEnter}>{t('selection')}</ReadyRadioButton>
            </PriceInfoFooterColumn>
            <PriceInfoFooterColumn>
              <ReadyRadioButton id="is_select_support" value="support" group="plan_str" checked={selectValue?.plan_str==="support"} onChange={handleSelectEnter}>{t('selection')}</ReadyRadioButton>
            </PriceInfoFooterColumn>
            <PriceInfoFooterColumn>
              <ReadyRadioButton id="is_select_pro" value="pro" group="plan_str" checked={selectValue?.plan_str==="pro"} onChange={handleSelectEnter}>{t('selection')}</ReadyRadioButton>
            </PriceInfoFooterColumn>
          </PriceInfoFooterRow>
        </PriceInfoContainer>
        <Block>
          <Bold22>{t('service-payment-history')}</Bold22>
          <Table>
            <HeaderRow>
              <Column width={14}>
                {t('payment-content')}
              </Column>
              <Column width={2} oneLine={true}>
                {t('payment-costs')}
              </Column>
            </HeaderRow>
            {selectValue?.plan_str
            ?getPriceList()
            :<Row>
              <Column width={14}>-</Column>
              <Column width={2} textAlign="right">0 {priceData.unit}</Column>
            </Row>
            }
          </Table>
          <LabelClickCheckbox id="is_agree" checked={isAgree} onClick={(e)=>setIsOpenAgree(true)} onChange={(e)=>setIsAgree(e.target.checked)}>{t('agree-to-enter-solution-conditions')}</LabelClickCheckbox>
        </Block>
        <FooterBlock>
          <ReadyButton isReady={isFinial()} onClick={(e)=>onClickNextStep(isFinial())}>{t('select-payment-method')}</ReadyButton>
        </FooterBlock>
      </DefaultLayout>
    );
  }
  return <DefaultLayout></DefaultLayout>
};

export default withRouter(SolutionAgreePage);