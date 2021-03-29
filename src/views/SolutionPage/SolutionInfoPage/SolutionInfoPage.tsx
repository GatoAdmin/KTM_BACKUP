import React, {useState, useReducer} from 'react';
import axios from 'axios';
import API from '@util/api';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '@assets/i18n/solutionPage.json';
import i18nArrayResource from '@assets/i18n/registerPage.json';
import usePromise from '@util/hooks/usePromise';
import { GetServerSideProps, NextPage } from 'next';
import { useSWRInfinite, responseInterface } from 'swr';
import Header from '@components/Shared/Header/Header';
import StepHeader, {useSelecterEnter} from '@components/SolutionPage/StepHeader/StepHeader';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import RadioCheckbox from '@components/SolutionPage/RadioCheckbox/RadioCheckbox';
import Input from '@components/SolutionPage/Input/Input';
import Select from '@components/SolutionPage/Select/Select';
import LineParser from '@components/SolutionPage/LineParser/LineParser';
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
  CheckedRadioIcon,
  SmallAccent
} from '@components/SolutionPage/Common/Common.style';
import {
  CauseReturnContainer
} from '@views/SolutionPage/SolutionInfoPage/SolutionInfoPage.style';
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
import Router,{ withRouter} from 'next/router';

const countryArray = (t: (s: string) => string) => Array.apply(null, Array(36)).map((val, index) => t(`country-${index}`));
const topikArray = (t: (s: string) => string) => Array.apply(null, Array(7)).map((val, index) => t(`topik-${index}`));

const getChosseUnivCode =()=>{
    let data = null;
    if(typeof window !=="undefined"){
      data = sessionStorage.getItem('chooseUnivCode');
    }
    return data;
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
  "have_residence_license",
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

const SolutionInfoPage: NextPage = ({
  router: {
    query: { lang: queryLang },
  },
})  => {
  const ArrayT = useTranslate(i18nArrayResource);
  const { t, lang, changeLang } = useTranslate(i18nResource);
  const [reject, setReject] = useState('');
  const [readOnly, setReadOnly] = useState(false);

  React.useEffect(() => {
    API.getPlayerStatus()
    .then((data)=>{
      if (data.status !== 'success') {
        console.log(data);
      } else { 
        const univ_code = getChosseUnivCode();
        const user = data.userstatus_list.find(us=>us.univ_code === univ_code);
        if(user!==null && typeof user!=="undefined"){
          if(typeof window !== "undefined"){
            sessionStorage.setItem('chooseUnivCode',user.univ_code);
            sessionStorage.setItem('chooseUnivName',user.univ_name);
            sessionStorage.setItem('chooseSubjectname',user.subjectname);
            sessionStorage.setItem('choosePayRank',user.pay_rank);
          }
          
          if(user.step === STEP_STRING.STEP_THREE_PENDING){
            setReadOnly(true);
          }else if(user.step !== STEP_STRING.STEP_THREE_INIT){
            Router.push(`/solution${queryLang?`?lang=${queryLang}`:''}`)
          }
          if(user.rejected_reason!==""){
            setReject(user.rejected_reason);
          }
          
        }else {
          Router.push(`/solution${queryLang?`?lang=${queryLang}`:''}`)
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  
  const handleSubmit = (type:"save"|"send") => {
    let sid = ""; 
    if(typeof window !== "undefined"){
      sid = window.sessionStorage.getItem('sid');
    }
    const univcode = getChosseUnivCode();
    
    let objectFormData = JSON.parse(JSON.stringify(formData));
    delete objectFormData.id;
    delete objectFormData.user_id;
    const tempYear = objectFormData.birth_date.substr(0,4);
    const tempMonth = objectFormData.birth_date.substr(4,2);
    const tempDay = objectFormData.birth_date.substr(6,2);
    objectFormData.birth_date = tempYear+"-"+tempMonth+"-"+tempDay;
    let jsonFormData = {};
    Object.keys(objectFormData).forEach((key) =>{
      if(objectFormData[key]==="undefined"){
        objectFormData[key]= "";
      }
      return Object.assign(jsonFormData,{[key]:objectFormData[key]});
    });
    jsonFormData.univ_code = univcode;
    if(type==="send"){
      jsonFormData.is_done = true;
    }else if(type==="save"){
      jsonFormData.is_done = false;
    }
    API.sendPlayerInfo(`/?action=set_user_info&params=${JSON.stringify(jsonFormData)}&sid=${sid}`)
    .then((data) => {
        console.log(data);
        const {status, update_userinfo}  = data;
        if (status !== 'success') {
          console.log(data);
        } else {
          let tempData = Object.assign(formData, update_userinfo);
          tempData.birth_date = update_userinfo.birth_date.replaceAll('-','');
          setFormData(tempData);
          
          if(type==="send"){
            setReadOnly(true);
          }else{
            alert(t('saved'));
          }
          // Router.push({
          //   pathname: '/login',
          //   query: { lang },
          // });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFormContent = (e?: React.ChangeEvent<HTMLInputElement>, t?: string, v?: string | number) => {
    if(!readOnly){
      if (e !== undefined) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      } else if (t !== undefined) {
        setFormData((prev) => ({ ...prev, [t]: v }));
      }
    }
  };

  React.useEffect(() => {
    if (queryLang !== undefined) {
      ArrayT.changeLang(queryLang);
      changeLang(queryLang);
    }
  }, [queryLang]);

  const getPlayerData =async()=>{
    const data = await API.getUserInfo();
    return data;
  }

  const [formData, setFormData] = useState({
    kor_first_name: undefined,
    kor_last_name: undefined,
    eng_first_name: undefined,
    eng_last_name: undefined,
    sex: undefined,
    email: undefined,
    passport_no: undefined,
    home_address: undefined,
    phone_no:undefined,
    nationality: undefined,
    birth_date: undefined,
    is_visited_korea: undefined,
    have_residence_license: undefined,
    language_skill: undefined,
    residence_no: undefined,
    father_name:undefined,
    father_nationality:undefined,
    father_phone_no:undefined,
    father_job:undefined,
    mother_name:undefined,
    mother_nationality:undefined,
    mother_phone_no:undefined,
    mother_job:undefined,
    high_school_name:undefined,
    high_school_address:undefined
  });

  let [playerData, setPlayerData] = useState(null);

  React.useEffect(() => {
    getPlayerData()
    .then(data=>{
      console.log(data);
      if(data.status!=='success'){
        console.log(data);
      }else{
        data.userinfo[0].birth_date = data.userinfo[0].birth_date.replace(/-/g,'');
        const tempData = Object.assign(formData, data.userinfo[0]);
        setFormData(tempData);
        setPlayerData(data.userinfo[0]);
      }
    })
    .catch(err=>console.log(err));
  }, []);
  
  if(typeof window !== "undefined"){
    
  const onClickNextStep=(isFinal:boolean, afterFuntion:void)=>{
    if(isFinal){
      if(window.confirm(t('completed-information-entry'))){
        afterFuntion;
      }
    }else{
      return window.alert(t('enter-all-required-items'));
    }
  }
    const isFinal = () =>{
      const isRequire = requireData.map(dataName =>{
        if(formData[dataName] === undefined||formData[dataName] === ""){
          return false;
        }
        return true;
      })
      if(isRequire.findIndex(value=>value===false)>-1){
        return false;
      }
      return true;
    }
    
      return (
        <DefaultLayout>  
          <Header t={t}  lang={lang} changeLang={changeLang} background="light" position="relative" />
          <StepHeader step={3} t={t} lang={lang} changeLang={changeLang}/>
          <Block>
            <Bold22>{t('create-person-information')}</Bold22>
            <SmallNotice>{t('display-items-must-be-entered')}</SmallNotice>
            <Form onSubmit={(e)=>handleSubmit(e)}>
              <Table>
                <Row>
                  <HeaderColumn>{t('name-korean')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={4}><Input placeholder={t('enter-the-name')} name="kor_first_name" onChange={handleFormContent} value={formData.kor_first_name} readonly={readOnly}/></TopBottomNonPaddingColumn>
                  <HeaderColumn>{t('last-name-korean')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={4}><Input placeholder={t('enter-last-name')} name="kor_last_name" onChange={handleFormContent} value={formData.kor_last_name} readonly={readOnly}/></TopBottomNonPaddingColumn>
                </Row>
                <Row>
                  <RequireHeaderColumn>{t('name-english')}</RequireHeaderColumn>
                  <TopBottomNonPaddingColumn width={4}><Input placeholder={t('enter-the-name')} name="eng_first_name" onChange={handleFormContent} value={formData.eng_first_name} readonly={readOnly}/></TopBottomNonPaddingColumn>
                  <RequireHeaderColumn>{t('last-name-english')}</RequireHeaderColumn>
                  <TopBottomNonPaddingColumn width={4}><Input placeholder={t('enter-last-name')} name="eng_last_name" onChange={handleFormContent} value={formData.eng_last_name} readonly={readOnly}/></TopBottomNonPaddingColumn>
                </Row>
                <Row>
                  <RequireHeaderColumn>{t('sex')}</RequireHeaderColumn>
                  <FlexColumn width={12} >
                    <RadioCheckbox id="sex_women" group="sex" value="FEMALE" onChange={handleFormContent} checked={formData.sex==="FEMALE"}>{t('women')}</RadioCheckbox>
                    <RadioCheckbox id="sex_men" group="sex" value="MALE" onChange={handleFormContent} checked={formData.sex==="MALE"}>{t('men')}</RadioCheckbox>
                  </FlexColumn>
                </Row>
                <Row>
                  <RequireHeaderColumn>{t('date-birth')}</RequireHeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input name="birth_date" type="number" placeholder={`${t('enter-date-birth')} (ex.20001010)`}  onChange={handleFormContent} value={formData.birth_date} min={8} max={8} readonly={readOnly}/></TopBottomNonPaddingColumn>
                </Row>
                <Row>
                  <RequireHeaderColumn>{t('passport-number')}</RequireHeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input name="passport_no" placeholder={t('enter-passpor-number')} onChange={handleFormContent} value={formData.passport_no} readonly={readOnly}/></TopBottomNonPaddingColumn>
                </Row>
                <Row>
                  <RequireHeaderColumn>{t('nationality')}</RequireHeaderColumn>
                  <Column width={6}>
                      <Select
                        placeholder={t('choice-nation')}
                        options={countryArray(ArrayT.t)}
                        name="nationality"
                        defaultValue={formData.nationality}
                        readOnly={readOnly}
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
                      defaultValue={formData.language_skill}
                      readOnly={readOnly}
                      handleFormContent={handleFormContent}
                    />
                  </Column>
                </Row>   
                <Row>
                  <RequireHeaderColumn><LineParser str={t('staying-in-korea')}/></RequireHeaderColumn>
                  <FlexColumn width={12} >
                    <RadioCheckbox id="stay_yes" group="is_visited_korea" value="true" onChange={handleFormContent} checked={formData.is_visited_korea===true||formData.is_visited_korea==="true"}>{t('yes')}</RadioCheckbox>
                    <RadioCheckbox id="stay_no" group="is_visited_korea" value="false" onChange={handleFormContent} checked={formData.is_visited_korea===false||formData.is_visited_korea==="false"}>{t('no')}</RadioCheckbox>
                  </FlexColumn>
                </Row>
                <Row>
                  <RequireHeaderColumn><LineParser str={t('certificate-residence-card-issued')}/></RequireHeaderColumn>
                  <FlexColumn width={queryLang?queryLang==="vn"?9:12:12} >
                    <RadioCheckbox id="issue_yes" group="have_residence_license" value="true" onChange={handleFormContent} checked={formData.have_residence_license===true||formData.have_residence_license==="true"}>{t('yes')}</RadioCheckbox>
                    <RadioCheckbox id="issue_no" group="have_residence_license" value="false" onChange={handleFormContent} checked={formData.have_residence_license===false||formData.have_residence_license==="false"}>{t('no')}</RadioCheckbox>
                  </FlexColumn>  
                  <FlexColumn width={queryLang?queryLang==="vn"?3:0:0} textAlign='flex-end' oneLine={true}><SmallAccent>{t('CMT-explanation')}</SmallAccent></FlexColumn>                  
                </Row>  
                <Row>
                  <HeaderColumn>{t('residence-card-number')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input name="residence_no" placeholder={t('enter-residence-card-number')} onChange={handleFormContent} value={formData.residence_no} readonly={readOnly}/></TopBottomNonPaddingColumn>
                 </Row>   
                <Row>
                  <HeaderColumn>{t('email')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input name="email" placeholder={t('enter-contactable-email')} onChange={handleFormContent} value={formData.email} readonly={readOnly}/></TopBottomNonPaddingColumn>
                </Row>  
                <Row>
                  <HeaderColumn>{t('home-address')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input name="home_address" placeholder={t('enter-home-address')} onChange={handleFormContent} value={formData.home_address} readonly={readOnly}/></TopBottomNonPaddingColumn>
                </Row>  
                <Row>
                  <HeaderColumn>{t('contact-phone-number')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input name="phone_no" placeholder={t('enter-contact-phone-number')} onChange={handleFormContent} value={formData.phone_no} readonly={readOnly}/></TopBottomNonPaddingColumn>
                </Row>     
                <Row readonly={true}>
                  <HeaderColumn>{t('family-relations')}</HeaderColumn>
                  <Column width={6}><Bold16>{t('father')}</Bold16></Column>
                  <Column width={6}><Bold16>{t('mother')}</Bold16></Column>
                </Row> 
                <Row>
                  <HeaderColumn>{t('full-name')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={6}><Input name="father_name" placeholder={t('enter-full-name')} onChange={handleFormContent} value={formData.father_name} readonly={readOnly}/></TopBottomNonPaddingColumn>
                  <TopBottomNonPaddingColumn width={6}><Input name="mother_name" placeholder={t('enter-full-name')} onChange={handleFormContent} value={formData.mother_name} readonly={readOnly}/></TopBottomNonPaddingColumn>
                </Row>
                <Row>
                  <HeaderColumn>{t('nationality')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={6}><Input name="father_nationality" placeholder={t('enter-nationality')} onChange={handleFormContent} value={formData.father_nationality} readonly={readOnly}/></TopBottomNonPaddingColumn>
                  <TopBottomNonPaddingColumn width={6}><Input name="mother_nationality" placeholder={t('enter-nationality')} onChange={handleFormContent} value={formData.mother_nationality} readonly={readOnly}/></TopBottomNonPaddingColumn>
                </Row>
                <Row>
                  <HeaderColumn>{t('cell-phone')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={6}><Input name="father_phone_no"  placeholder={t('enter-phone-number')} onChange={handleFormContent} value={formData.father_phone_no} readonly={readOnly}/></TopBottomNonPaddingColumn>
                  <TopBottomNonPaddingColumn width={6}><Input name="mother_phone_no"  placeholder={t('enter-phone-number')} onChange={handleFormContent} value={formData.mother_phone_no} readonly={readOnly}/></TopBottomNonPaddingColumn>
                </Row>
                <Row>
                  <HeaderColumn>{t('job')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={6}><Input name="father_job"  placeholder={t('enter-job')} onChange={handleFormContent} value={formData.father_job} readonly={readOnly}/></TopBottomNonPaddingColumn>
                  <TopBottomNonPaddingColumn width={6}><Input name="mother_job"  placeholder={t('enter-job')} onChange={handleFormContent} value={formData.mother_job} readonly={readOnly}/></TopBottomNonPaddingColumn>
                </Row>
                <Row readonly={true}>
                  <HeaderColumn>{t('final-educational-background')}</HeaderColumn>
                </Row> 
                <Row>
                  <RequireHeaderColumn>{t('high-school-name')}</RequireHeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input name="high_school_name" placeholder={t('enter-high-school-name')} onChange={handleFormContent} value={formData.high_school_name} readonly={readOnly}/></TopBottomNonPaddingColumn>
                </Row>   
                <Row>
                  <HeaderColumn>{t('high-school-address')}</HeaderColumn>
                  <TopBottomNonPaddingColumn width={12}><Input name="high_school_address" placeholder={t('enter-high-school-address')} onChange={handleFormContent} value={formData.high_school_address} readonly={readOnly}/></TopBottomNonPaddingColumn>
                </Row>   
              </Table>
            </Form>
          </Block>
          <FooterBlock>
          {readOnly?
            <FooterNoticeContainer>
              <LineParser str={t('checking-info-notice')} width="100%" textAlign="center"/>
            </FooterNoticeContainer>
          :<>
            <ReadyButton isReady={true} onClick={(e)=>handleSubmit("save")}>{t('save')}</ReadyButton>
            <ReadyButton type="button" isReady={isFinal()} onClick={(e)=>onClickNextStep(isFinal(),handleSubmit("send"))}>{t('next-step')}</ReadyButton>
          </>}
          </FooterBlock>
          {reject!==''?
          <Block>
            <Table>
              <Row>
                <HeaderColumn>{t('cause-return')}</HeaderColumn>
                <WarningColumn width={12}>
                  <CauseReturnContainer>
                    <LineParser str={reject}/>
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