import React, {useState} from 'react';
import axios from 'axios';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '@assets/i18n/solutionPage.json';
import { GetServerSideProps, NextPage } from 'next';
import Router,{withRouter} from 'next/router';
import { useSWRInfinite, responseInterface } from 'swr';
import Header from '@components/Shared/Header/Header';
import UnivTuitionTable, { SubjectType } from '@components/RecommendPage/UnivTutionTable/UnivScholarshipTable';
import StepHeader, {getSelectUnivInfo, useSelecterEnter} from '@components/SolutionPage/StepHeader/StepHeader';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import RadioButton from '@components/SolutionPage/RadioButton/RadioButton';
import LabelClickCheckbox from '@components/SolutionPage/LabelClickCheckbox/LabelClickCheckbox';
import Agreement from '@components/SolutionPage/Agreement/Agreement';
import LineParser from '@components/SolutionPage/LineParser/LineParser';
import PriceInfoHeader from '@components/SolutionPage/PriceInfoHeader/PriceInfoHeader';
import ReadyRadioButton from '@components/SolutionPage/ReadyRadioButton/ReadyRadioButton';
import {
  Block,
  FooterBlock,
  ReadyButton,
  GreyText,
  Bold22,
  Bold18,
  Bold16,
  UncheckedRadioIcon,
  RadioButtonContainer,
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
  HeaderColumn
} from '@components/SolutionPage/Table/Table.style';

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

const fetchPlayerPayrankInfo = (url: string) => axios.get(url,{withCredentials : true})
  .then((res) => {const {
    userstatus,
    pay_rank_dict,
    apply_fee
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
      },
      pay_rank_dict:{
        "1":number;
        "2":number;
        "3":number;
      },
      apply_fee: number
    }  = res.data;

    services[0].price = pay_rank_dict[1];
    services[1].price = pay_rank_dict[2];
    services[2].price = pay_rank_dict[3];

    return {userstatus: userstatus, pay_rank_dict: pay_rank_dict, apply_fee: apply_fee};
  });
  
// const usePriceData = ()=>{
//   // getChosseUnivCode();
//   let sid = ""; 
//   let status_id = "";
//   if(typeof window !== "undefined"){
//     sid = window.sessionStorage.getItem('sid');
//     const sessionData = window.sessionStorage.getItem('user_status_id');
//     status_id = sessionData;
//   }
//   const getKey = () => `/api/?action=get_player_payrank&params=${JSON.stringify({ status_id: status_id })}&sid=${sid}`;
//   let { data } = useSWRInfinite(
//     getKey,
//     (url) => fetchPlayerPayrankInfo(url)
//   );
//   let modifyServices = services.map(service=>{
//     let price = String(service.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     service.strPrice = price;
//     return service;
//   });
//   if(Array.isArray(data)){
//     data = data[0]
//   }
//   let application = data?data.apply_fee?data.apply_fee:0:0;

//   return {services: modifyServices, application:application, unit:"KRW"};
// }

const convertPrice=(price:number)=>{
  return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const getPriceList = (selectValue:object, priceData:object)=>{
  const plan = services.find(service=>(service.type === selectValue.plan));
  const univName = typeof window !== "undefined"?window.sessionStorage.getItem("chooseUnivName"):"선문대학교";
  let resultPrice = plan?.price+(plan.type !== "trans"?priceData.application:0);
  resultPrice = convertPrice(resultPrice);
  return (
    <>
      <Row>
        <Column width={14}>{plan?.name}-{univName}</Column>
        <Column width={2} textAlign="right">{plan.strPrice} {priceData.unit}</Column>
      </Row>
      {plan.type !== "trans"
        ?<Row>
            <Column width={14}>원서접수비-{univName}</Column>
            <Column width={2} textAlign="right">{convertPrice(priceData.application)} {priceData.unit}</Column>
          </Row>
        :null}
      <Row accent={true}>
        <Column width={14}>결제 금액 (VAT 포함)</Column>
        <Column width={2} textAlign="right">{resultPrice} {priceData.unit}</Column>
      </Row>
    </>
  ); 
}

const SolutionAgreePage: NextPage = ({
  router: {
    query: { lang: queryLang },
  },
}) => {

  const { t, lang, changeLang } = useTranslate(i18nResource);

  React.useEffect(() => {
    if (queryLang !== undefined) {
      changeLang(queryLang);
    }
  }, [queryLang]);

  React.useEffect(() => {
    API.getPlayerStatus()
    .then((data)=>{
      console.log(data);
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

  if(typeof window !== "undefined"){
    let sessionData = getSesstionData();
    const [selectValue, handleSelectEnter]= useSelecterEnter(sessionData?sessionData:{univ_code:getChosseUnivCode(),enter_type:null});
    const [isAgree, setIsAgree]= useState(false);
    const [isOpenAgree, setIsOpenAgree]= useState(false);

    const usePriceData =async()=>{
      let data = await API.getPlayerPayrank();

      let modifyServices = services.map(service=>{
        let price = String(service.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        service.strPrice = price;
        return service;
      });

      if(Array.isArray(data)){
        data = data[0]
      }
      let application = data?data.apply_fee?data.apply_fee:0:0;
    
      return {services: modifyServices, application:application, unit:"KRW"};
    }
    
    // const [loading, resolved, error] = usePromise(usePriceData, []);
    // if (loading) return <div></div>; 
    // if (error) window.alert('API 오류');
    // if (!resolved) return null;
    // let {services, application, unit} = resolved;
    // const priceData = usePriceData();
    let modifyServices = services.map(service=>{
      let price = String(service.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      service.strPrice = price;
      return service;
    });
    const priceData = {
      services :modifyServices,
      application: 0,
      unit:"KRW"
    }

    const isFinial = () =>{
      if(selectValue!==null&&typeof selectValue.plan_str==="string"&&isAgree){
          return true;
      }
      return false;
    }

    const onClickNextStep=(isFinial:boolean)=>{
      if(isFinial){
        sendPlayerInfo(selectValue.plan_str);
        Router.push('/solution/2/payment');
      }else{
        window.alert(t('warn-3'));
      }
    }
    
    return (
      <DefaultLayout>
        {isOpenAgree?<Agreement onClose={()=>setIsOpenAgree(false)}/>:null}
        <Header t={t} lang={lang} changeLang={changeLang} background="light" position="relative" />
        <StepHeader step={2} major_str={selectValue?typeof selectValue.major_str==="string"?selectValue.major_str:null:null} plan_str={selectValue?typeof selectValue.plan_str==="string"?selectValue.plan_str:null:null} t={t} lang={lang} changeLang={changeLang}/>
        <PriceInfoContainer>
          <PriceInfoHeaderRow>
            <PriceInfoHeaderColumn><Bold22><LineParser str={t('please-selection-payrank')}/></Bold22></PriceInfoHeaderColumn>
            <PriceInfoHeaderColumn>
              <PriceInfoHeader backgroundColor="#FF988C">
                <LineParser str={t('translation-notarization-service')}/>
              </PriceInfoHeader>
            </PriceInfoHeaderColumn>
            <PriceInfoHeaderColumn>
              <PriceInfoHeader backgroundColor="#2EC5CE">
                <LineParser str={t('enter-support-service')}/>
              </PriceInfoHeader>
            </PriceInfoHeaderColumn>
            <PriceInfoHeaderColumn>
              <PriceInfoHeader backgroundColor="#8C30F5">
                <LineParser str={t('enter-support-pro')}/>
              </PriceInfoHeader>
            </PriceInfoHeaderColumn>
          </PriceInfoHeaderRow>
          <PriceInfoTableHeaderRow>
            <PriceInfoTableHeaderColumn>
              <Bold22><LineParser str={t('pricing-table')}/></Bold22>
            </PriceInfoTableHeaderColumn>
              {priceData
                ?priceData.services.map((service)=>(
                  <PriceInfoTableHeaderColumn>
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
              <ReadyRadioButton id="is_select_trans" value="trans" group="plan" checked={selectValue?.plan==="trans"} onChange={handleSelectEnter}>{t('selection')}</ReadyRadioButton>
            </PriceInfoFooterColumn>
            <PriceInfoFooterColumn>
              <ReadyRadioButton id="is_select_support" value="support" group="plan" checked={selectValue?.plan==="support"} onChange={handleSelectEnter}>{t('selection')}</ReadyRadioButton>
            </PriceInfoFooterColumn>
            <PriceInfoFooterColumn>
              <ReadyRadioButton id="is_select_pro" value="pro" group="plan" checked={selectValue?.plan==="pro"} onChange={handleSelectEnter}>{t('selection')}</ReadyRadioButton>
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
              <Column width={2}>
                {t('payment-costs')}
              </Column>
            </HeaderRow>
            {selectValue?.plan
            ?getPriceList(selectValue, priceData)
            :<Row>
              <Column width={14}>-</Column>
              <Column width={2} textAlign="right">0 {priceData.unit}</Column>
            </Row>
            }
          </Table>
          <LabelClickCheckbox id="is_agree" checked={isAgree} onClick={(e)=>setIsOpenAgree(true)} onChange={(e)=>setIsAgree(e.target.checked)}>{t('agree-to-enter-solution-conditions')}</LabelClickCheckbox>
        </Block>
        <FooterBlock>
          <ReadyButton isReady={isFinial()} onClick={(e)=>onClickNextStep(isFinial(),selectValue)}>{t('select-payment-method')}</ReadyButton>
        </FooterBlock>
      </DefaultLayout>
    );
  }
  return <DefaultLayout></DefaultLayout>
};

export default withRouter(SolutionAgreePage);